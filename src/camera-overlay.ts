// The cameras of the card on screen (their settings in cameras.ts): their icons over the model,
// placed again at every frame, the picture that pops up in a corner when a sensor goes off, and the
// button by the menus that hides the icons. The card is reached only through CamerasHost; the
// corners and the folded state are those of the boxes (corner-boxes.ts).
import { html, nothing, render, TemplateResult } from 'lit';
import * as THREE from 'three';
import { HomeAssistant } from './ha';
import { switchOn } from './config';
import { corner } from './boxes';
import { CameraItem, cameraList, cameraName, newPopupMemory, popupStep, snapshotUrl } from './cameras';
import { CornerBoxes } from './corner-boxes';

export interface CamerasHost {
  readonly config: any;
  readonly hass: HomeAssistant;
  readonly connected: boolean;
  readonly card: HTMLElement;
  readonly content?: HTMLElement; // the block of the canvas: the icons are in it, the picture follows its width
  readonly canvas?: HTMLCanvasElement;
  readonly camera?: THREE.Camera;
  readonly model?: THREE.Object3D; // the positions of the cameras are in its space
  readonly picking: boolean; // the editor picks a point of the model: the taps go through the icons
  t(key: string, vars?: { [name: string]: string | number }): string;
  language(): string;
  num(value: unknown, fallback: number): number;
  levelShown(level: number | undefined): boolean;
  renderBoxes(force: boolean): void;
  object(name: string): THREE.Object3D | undefined; // an object of the model: the markers over it
}

// Places marks of a layer over points of the scene (world coordinates): the icons of the cameras and
// the markers, after every frame. A mark is hidden behind the camera, out of the view, or while its
// level is hidden; it is placed from the top left corner of its layer, wherever the canvas is in the
// card.
export function placeOver(
  layer: HTMLElement,
  marks: { el: HTMLElement; point?: THREE.Vector3; level?: number }[],
  host: Pick<CamerasHost, 'canvas' | 'camera' | 'levelShown'>,
): void {
  if (!marks.length || !host.canvas || !host.camera) return;
  const canvas = host.canvas.getBoundingClientRect();
  const box = layer.getBoundingClientRect();
  const width = canvas.width;
  const height = canvas.height;
  const left = canvas.left - box.left;
  const top = canvas.top - box.top;
  const screen = new THREE.Vector3();
  const view = new THREE.Vector3();
  marks.forEach(({ el, point, level }) => {
    let shown = !!point && width > 0 && height > 0 && host.levelShown(level);
    if (shown) {
      view.copy(point).applyMatrix4(host.camera.matrixWorldInverse);
      screen.copy(point).project(host.camera);
      shown = view.z < 0 && Math.abs(screen.x) <= 1 && Math.abs(screen.y) <= 1;
    }
    if (shown) {
      const x = left + ((screen.x + 1) / 2) * width;
      const y = top + ((1 - screen.y) / 2) * height;
      el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) translate(-50%, -50%)`;
    }
    el.style.visibility = shown ? 'visible' : 'hidden';
  });
}

export class CameraOverlay {
  // The icons over the model, and the pictures that pop up: what the sensors did, the timer of the
  // first picture to go away, the camera shown and the timer of its next picture.
  private _pinsEl?: HTMLElement;
  private _pins: { el: HTMLElement; camera: CameraItem }[] = [];
  private _pinsKey?: string;
  private _popupMemory = newPopupMemory();
  private _popupShowing: { entity: string; trigger?: string }[] = [];
  private _popupTimer?: number;
  private _popupEntity?: string;
  private _popupRefresh?: number;

  constructor(
    private host: CamerasHost,
    private boxes: CornerBoxes,
  ) {}

  // The card goes away: no more pictures.
  public disconnect(): void {
    window.clearTimeout(this._popupTimer);
    this._stopPopupRefresh();
  }

  // The icons let the taps through to the model while the editor picks a point.
  public setPicking(picking: boolean): void {
    if (this._pinsEl) this._pinsEl.classList.toggle('picking', picking);
  }

  private shown(key: string, fallback: boolean): boolean {
    return switchOn(this.host.config, key, fallback);
  }

  // Their icons on the map, and the picture that pops up when their sensors go off.
  public render(force: boolean): void {
    const cameras = cameraList(this.host.config.cameras);
    this._stepPopup(cameras);
    this._renderPins(cameras, force);
    this._renderCameraPopup(cameras, force);
  }

  // What the sensors of the cameras did since the last update: the pictures to show, and a timer for
  // the first of them to go away.
  private _stepPopup(cameras: CameraItem[]): void {
    const now = Date.now();
    const duration = Math.max(1, this.host.num(this.host.config.camera_popup_duration, 20)) * 1000;
    const { showing, next } = popupStep(this._popupMemory, cameras, this.host.hass.states, now, duration);
    this._popupShowing = showing;
    window.clearTimeout(this._popupTimer);
    this._popupTimer =
      next !== undefined && this.host.connected
        ? window.setTimeout(() => this.host.renderBoxes(false), next - now + 50)
        : undefined;
  }

  // cameras_show: the icon of each camera with a position, over its point of the model; a tap opens
  // the camera. It blinks while its picture pops up.
  private _renderPins(cameras: CameraItem[], force: boolean): void {
    // Hidden on this device with the button by the menus (cameras_button).
    const placed =
      this.shown('cameras_show', true) && !this.boxes.isCollapsed('cameras') ? cameras.filter((c) => c.position) : [];
    const states = this.host.hass.states;
    const alert = new Set(this._popupShowing.map((s) => s.entity));
    const key = JSON.stringify(
      placed.map((c) => [
        c.entity,
        c.position,
        c.level,
        c.icon,
        cameraName(c, states[c.entity]),
        states[c.entity] ? states[c.entity].state : '',
        alert.has(c.entity),
      ]),
    );
    if (!force && key === this._pinsKey) return;
    this._pinsKey = key;
    if (!placed.length) {
      if (this._pinsEl) this._pinsEl.remove();
      this._pinsEl = undefined;
      this._pins = [];
      return;
    }
    if (!this._pinsEl) {
      this._pinsEl = document.createElement('div');
      this._pinsEl.className = 'f3d-pins';
      this._pinsEl.classList.toggle('picking', !!this.host.picking);
      // A tap on an icon is for the icon: not a tap on the model behind it (the box listens to them).
      ['pointerdown', 'dblclick', 'keydown'].forEach((type) =>
        this._pinsEl.addEventListener(type, (ev) => ev.stopPropagation()),
      );
    }
    // First in the box of the model: over the model, also when the box is positioned (overlay: yes
    // makes it so: in the card, before it, the model covered the icons), under the menus and the bars
    // of the levels and of the views that come after. Again after a reload, which empties the box.
    const parent = this.host.content || this.host.card;
    if (this._pinsEl.parentNode !== parent) parent.insertBefore(this._pinsEl, parent.firstChild);
    render(
      html`${placed.map((c) => {
        const stateObj = states[c.entity];
        const name = cameraName(c, stateObj);
        const off = !stateObj || stateObj.state === 'unavailable';
        return html`<button
          class="f3d-pin ${off ? 'off' : ''} ${alert.has(c.entity) ? 'alert' : ''}"
          title=${name}
          aria-label=${name}
          @click=${(ev: Event) => {
            ev.stopPropagation();
            this.boxes.moreInfo(c.entity);
          }}
        >
          <ha-icon icon=${c.icon || 'mdi:cctv'}></ha-icon>
        </button>`;
      })}`,
      this._pinsEl,
    );
    const elements = Array.from(this._pinsEl.querySelectorAll('.f3d-pin')) as HTMLElement[];
    this._pins = elements.map((el, i) => ({ el, camera: placed[i] }));
    this.placePins();
  }

  // The icons follow the camera of the card: placed again after every frame over their point of the
  // model (placeOver).
  public placePins(): void {
    if (!this._pins.length || !this._pinsEl || !this.host.model) return;
    const matrix = this.host.model.matrixWorld;
    placeOver(
      this._pinsEl,
      this._pins.map(({ el, camera }) => ({
        el,
        level: camera.level,
        point: camera.position ? new THREE.Vector3(...camera.position).applyMatrix4(matrix) : undefined,
      })),
      this.host,
    );
  }

  // camera_popup_show: the picture of the camera whose sensor went off last, in its corner, a new one
  // every second; a tap opens the camera (live), the cross closes it until a sensor goes off again.
  private _renderCameraPopup(cameras: CameraItem[], force: boolean): void {
    const states = this.host.hass.states;
    const shown = this.shown('camera_popup_show', true) ? this._popupShowing.find((s) => states[s.entity]) : undefined;
    const box = this.boxes.box(
      'camera_popup',
      shown ? corner(this.host.config.camera_popup_position, 'bottom-right') : null,
    );
    if (!box || !shown) {
      this._stopPopupRefresh();
      return;
    }
    const camera = cameras.find((c) => c.entity === shown.entity) as CameraItem;
    const stateObj = states[shown.entity];
    const trigger = shown.trigger ? states[shown.trigger] : undefined;
    const deps = [
      shown.entity,
      shown.trigger,
      camera.name,
      camera.icon,
      stateObj.attributes.friendly_name,
      trigger && trigger.attributes.friendly_name,
      this.host.language(),
    ];
    this.sizePopup();
    if (this.boxes.changed('camera_popup', deps, force)) {
      const name = cameraName(camera, stateObj);
      const triggerName = trigger ? String(trigger.attributes.friendly_name || shown.trigger) : '';
      const open = (ev: Event): void => {
        ev.stopPropagation();
        this.boxes.moreInfo(shown.entity);
      };
      box.setAttribute('aria-label', this.host.t('camera_popup'));
      render(
        html`
          <div
            class="picture"
            role="button"
            tabindex="0"
            title=${name}
            aria-label=${name}
            @click=${open}
            @keydown=${(ev: KeyboardEvent) => {
              if (ev.key === 'Enter' || ev.key === ' ') {
                ev.preventDefault();
                open(ev);
              }
            }}
          >
            <ha-icon class="placeholder" icon=${camera.icon || 'mdi:cctv'}></ha-icon>
            <img alt="" />
          </div>
          <div class="caption">
            <span class="name">${name}</span>
            ${triggerName ? html`<span class="trigger">${triggerName}</span>` : nothing}
          </div>
          <button
            class="close"
            title=${this.host.t('camera_close')}
            aria-label=${this.host.t('camera_close')}
            @click=${(ev: Event) => {
              ev.stopPropagation();
              this._closePopup();
            }}
          >
            <ha-icon icon="mdi:close"></ha-icon>
          </button>
        `,
        box,
      );
    }
    if (this._popupEntity !== shown.entity) {
      // Another camera: its pictures from now on.
      this._stopPopupRefresh();
      box.classList.remove('loaded');
      this._popupEntity = shown.entity;
      this._refreshPopup();
    }
  }

  // The width of the picture: 45% of the card, between 160 and 320 pixels.
  public sizePopup(): void {
    const box = this.boxes.element('camera_popup');
    const content = this.host.content || this.host.card;
    if (!box || !content) return;
    const width = content.getBoundingClientRect().width;
    box.style.width = Math.round(Math.max(160, Math.min(320, width * 0.45))) + 'px';
  }

  // The next picture of the camera shown, a second after the last one arrived (or could not). The old
  // picture stays until the new one is there.
  private _refreshPopup(): void {
    window.clearTimeout(this._popupRefresh);
    this._popupRefresh = undefined;
    const box = this.boxes.element('camera_popup');
    const img = box ? box.querySelector('img') : null;
    const entity = this._popupEntity;
    if (!box || !img || !entity || !this.host.connected || !this.host.hass) return;
    const next = (): void => {
      if (this._popupEntity !== entity || !img.isConnected) return; // closed, or another camera
      window.clearTimeout(this._popupRefresh);
      this._popupRefresh = window.setTimeout(() => this._refreshPopup(), 1000);
    };
    const url = snapshotUrl(this.host.hass.states[entity], Date.now());
    if (!url) {
      next();
      return;
    }
    img.onload = () => {
      box.classList.add('loaded');
      next();
    };
    img.onerror = next;
    img.src = url;
  }

  private _stopPopupRefresh(): void {
    window.clearTimeout(this._popupRefresh);
    this._popupRefresh = undefined;
    this._popupEntity = undefined;
  }

  // The cross: the pictures showing go away until a sensor goes off again.
  private _closePopup(): void {
    this._popupMemory.dismissed = Date.now();
    this.host.renderBoxes(false);
  }

  // cameras_button: next to the menus, a button that hides the icons of the cameras and shows them
  // again, on this device (remembered as the folded boxes are). Only with icons to show.
  public button(onChange: () => void): TemplateResult {
    const placed = cameraList(this.host.config.cameras).some((c) => c.position);
    if (!placed || !this.shown('cameras_show', true) || !this.shown('cameras_button', true)) return html``;
    const hidden = this.boxes.isCollapsed('cameras');
    return html`<button
      class="f3d-menu-button ${hidden ? 'off' : ''}"
      aria-label=${this.host.t('camera_icons')}
      aria-pressed=${hidden ? 'false' : 'true'}
      title=${this.host.t('camera_icons')}
      @click=${(ev: Event) => {
        ev.stopPropagation();
        this.boxes.setCollapsed('cameras', !hidden);
        onChange();
      }}
    >
      <ha-icon icon=${hidden ? 'mdi:cctv-off' : 'mdi:cctv'}></ha-icon>
    </button>`;
  }
}
