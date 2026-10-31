// The markers of the card on screen (their settings in markers.ts): a chip with the icon and the
// state of an entity over a point of the model or over an object, placed again at every frame; a tap
// opens the entity. The card is reached only through CamerasHost, as the icons of the cameras.
import { html, nothing, render } from 'lit';
import * as THREE from 'three';
import { switchOn } from './config';
import { CamerasHost, placeOver } from './camera-overlay';
import { CornerBoxes } from './corner-boxes';
import { MarkerItem, markerActive, markerList } from './markers';

export class MarkerOverlay {
  // The layer of the markers, each marker with its element, and what they showed last.
  private _layer?: HTMLElement;
  private _marks: { el: HTMLElement; marker: MarkerItem }[] = [];
  private _key?: string;

  constructor(
    private host: CamerasHost,
    private boxes: CornerBoxes,
  ) {}

  // The markers let the taps through to the model while the editor picks a point.
  public setPicking(picking: boolean): void {
    if (this._layer) this._layer.classList.toggle('picking', picking);
  }

  // markers_show: each marker with its icon and, unless state: no, its state as Home Assistant writes
  // it (in the language of the user, with its unit); in the colour of the theme while the entity is on
  // or open, faded while it is unavailable.
  public render(force: boolean): void {
    const markers = switchOn(this.host.config, 'markers_show', true) ? markerList(this.host.config.markers) : [];
    const hass: any = this.host.hass;
    const states = hass.states;
    const key = JSON.stringify([markers, markers.map((m) => states[m.entity] || null), hass.language]);
    if (!force && key === this._key) return;
    this._key = key;
    if (!markers.length) {
      if (this._layer) this._layer.remove();
      this._layer = undefined;
      this._marks = [];
      return;
    }
    if (!this._layer) {
      this._layer = document.createElement('div');
      this._layer.className = 'f3d-pins f3d-markers';
      this._layer.classList.toggle('picking', !!this.host.picking);
      // A tap on a marker is for the marker: not a tap on the model behind it.
      ['pointerdown', 'dblclick', 'keydown'].forEach((type) =>
        this._layer.addEventListener(type, (ev) => ev.stopPropagation()),
      );
    }
    // In the box of the model, as the icons of the cameras (camera-overlay.ts).
    const parent = this.host.content || this.host.card;
    if (this._layer.parentNode !== parent) parent.insertBefore(this._layer, parent.firstChild);
    render(
      html`${markers.map((m) => {
        const stateObj = states[m.entity];
        const name = m.name || String((stateObj && stateObj.attributes.friendly_name) || m.entity);
        const unit = stateObj ? stateObj.attributes.unit_of_measurement : undefined;
        const value = !stateObj
          ? ''
          : typeof hass.formatEntityState === 'function'
            ? hass.formatEntityState(stateObj)
            : stateObj.state + (unit ? ' ' + unit : '');
        const icon = m.icon || (stateObj && (stateObj.attributes.icon as string | undefined));
        const off = !stateObj || stateObj.state === 'unavailable';
        return html`<button
          class="f3d-marker ${markerActive(stateObj && stateObj.state) ? 'on' : ''} ${off ? 'off' : ''}"
          title=${value ? name + ': ' + value : name}
          aria-label=${value ? name + ': ' + value : name}
          @click=${(ev: Event) => {
            ev.stopPropagation();
            this.boxes.moreInfo(m.entity);
          }}
        >
          ${
            icon || !stateObj
              ? html`<ha-icon icon=${icon || 'mdi:map-marker'}></ha-icon>`
              : html`<ha-state-icon .hass=${hass} .stateObj=${stateObj}></ha-state-icon>`
          }
          ${m.state && value ? html`<span>${value}</span>` : nothing}
        </button>`;
      })}`,
      this._layer,
    );
    const elements = Array.from(this._layer.querySelectorAll('.f3d-marker')) as HTMLElement[];
    this._marks = elements.map((el, i) => ({ el, marker: markers[i] }));
    this.place();
  }

  // After every frame: each marker over its point of the model, or over the middle of the top of its
  // object, hidden with the level of the object (or its own level) and while the object is hidden.
  public place(): void {
    if (!this._layer || !this._marks.length || !this.host.model) return;
    const matrix = this.host.model.matrixWorld;
    placeOver(
      this._layer,
      this._marks.map(({ el, marker }) => {
        if (marker.position) {
          return { el, level: marker.level, point: new THREE.Vector3(...marker.position).applyMatrix4(matrix) };
        }
        const object = this.host.object(marker.object_id);
        if (!object || !seen(object)) return { el };
        const box = new THREE.Box3().setFromObject(object);
        if (box.isEmpty()) return { el };
        return {
          el,
          level: marker.level !== undefined ? marker.level : levelOf(object),
          point: new THREE.Vector3((box.min.x + box.max.x) / 2, box.max.y, (box.min.z + box.max.z) / 2),
        };
      }),
      this.host,
    );
  }
}

// An object is seen when it and all the objects it is in are visible (a hidden level hides it).
function seen(object: THREE.Object3D): boolean {
  for (let o = object; o; o = o.parent) if (!o.visible) return false;
  return true;
}

// The level of an object: the first of its ancestors that has one.
function levelOf(object: THREE.Object3D): number | undefined {
  for (let o = object; o; o = o.parent) if (o.userData && o.userData.level !== undefined) return o.userData.level;
  return undefined;
}
