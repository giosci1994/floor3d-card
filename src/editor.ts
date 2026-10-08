/* eslint-disable @typescript-eslint/no-explicit-any */
// Card editor built on the components of Home Assistant (ha-form and its selectors, ha-sortable,
// ha-expansion-panel), like the editors of the built-in cards. When Home Assistant doesn't provide
// them, it shows the editor of version 2.1 (editor-classic.ts) instead.
//
// The config goes through normalizeConfig() when it comes in and cleanConfig() when it goes out
// (config.ts). Home Assistant passes back every config the editor sends; the editor keeps its own
// copy, which holds the rows still empty (left out of the YAML), and goes on from it.
//
// The editor talks to the card shown next to it (the preview) through window events: it asks for
// the names of the objects of the model and for the current view, and turns on picking objects with
// a tap and highlighting them (see _onPreview() and the "Editor" part of floor3d-card.ts).
import { LitElement, html, css, nothing, TemplateResult, CSSResultGroup } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { fireEvent, HomeAssistant, LovelaceCardEditor } from 'custom-card-helpers';
import {
  mdiArrowLeft,
  mdiCameraOutline,
  mdiCursorDefaultClickOutline,
  mdiDelete,
  mdiDragHorizontalVariant,
  mdiPause,
  mdiPencil,
  mdiPlay,
  mdiPlus,
  mdiRefresh,
} from '@mdi/js';
import { cleanConfig, matchObjects, normalizeConfig, objectPattern } from './config';
import { CARD_VERSION, EDITOR_EVENT, PREVIEW_EVENT } from './const';
import { previewState } from './preview';
import {
  ARRAY_VECTORS,
  BLOCK_SWITCHES,
  SECTIONS,
  SWITCHES,
  TYPES,
  Schema,
  VECTOR_HEADINGS,
  colorConditionSchema,
  entityActionsSchema,
  entitySchema,
  groupSchema,
  headingKey,
  helperFor,
  labelFor,
  localizeSchema,
  objectField,
  objectListField,
  MAP_KEYS,
  mapSchema,
  roomAlarmsSchema,
  roomSchema,
  roomSensorsSchema,
  typeSchema,
  vector,
  zoomObjectSchema,
  zoomSchema,
} from './editor-schema';
import { pickLanguage } from './localize/localize';
import { ROOM_KEYS } from './maps';
import { Translator, translator } from './localize/editor';

type ListKey = 'entities' | 'object_groups' | 'zoom_areas' | 'rooms' | 'maps';
type View = { list?: ListKey; index?: number };
// Where a picked object goes: a field of the config (path of keys), or the objects of a group.
type PickTarget = { path: (string | number)[]; add?: boolean };

// Home Assistant builds the preview again, model included, at every config it gets: the config goes
// to it this long after the last change, and at once when a field is left or something is clicked.
const CONFIG_DELAY_MS = 1000;


const isObject = (value: any): boolean => value !== null && typeof value === 'object' && !Array.isArray(value);
const copy = <T>(value: T): T => JSON.parse(JSON.stringify(value ?? null));

// Top-level switches: 'yes'/'no' in the config, true/false in the form.
function switchesToForm(object: any, switches: { [key: string]: 'yes' | 'no' }): any {
  const data = { ...object };
  Object.entries(switches).forEach(([key, fallback]) => {
    const value = data[key] ?? fallback;
    data[key] = value === true || value === 'yes';
  });
  return data;
}

function switchesFromForm(data: any, original: any, switches: { [key: string]: 'yes' | 'no' }): any {
  const object = { ...data };
  Object.entries(switches).forEach(([key, fallback]) => {
    if (typeof object[key] !== 'boolean') return;
    const value = object[key] ? 'yes' : 'no';
    // Left out while it is the default and wasn't written before.
    if (value === fallback && (original || {})[key] === undefined) delete object[key];
    else object[key] = value;
  });
  return object;
}

// The top-level options in the form: switches as toggles, and the language menu on "of your profile"
// while the card has none (cleanConfig leaves out language: auto).
function topToForm(config: any): any {
  return { ...switchesToForm(config, SWITCHES), language: config.language || 'auto' };
}

// Values cleared in a form: removed from the config.
function dropEmpty(object: any): any {
  Object.keys(object).forEach((key) => {
    if (object[key] === undefined || object[key] === '' || object[key] === null) delete object[key];
  });
  return object;
}

// An entity in the form: yes/no switches of its options block as toggles, [x, y, z] lists as vectors.
function entityToForm(entity: any): any {
  const data = { ...entity };
  Object.entries(BLOCK_SWITCHES).forEach(([block, switches]) => {
    if (isObject(data[block]) || data.type3d === block) data[block] = switchesToForm(data[block] || {}, switches);
  });
  // light_object alone also means one light for all the objects (as in floor3dx-card).
  if (isObject(entity.light) && entity.light.light_object && entity.light.single == null) data.light.single = true;
  Object.entries(ARRAY_VECTORS).forEach(([block, keys]) => {
    if (!isObject(data[block])) return;
    data[block] = { ...data[block] };
    keys.forEach((key) => {
      const value = data[block][key];
      if (Array.isArray(value)) data[block][key] = { x: value[0], y: value[1], z: value[2] };
    });
  });
  return data;
}

function entityFromForm(data: any, original: any): any {
  const entity = dropEmpty({ ...data });
  Object.entries(BLOCK_SWITCHES).forEach(([block, switches]) => {
    if (isObject(entity[block])) entity[block] = switchesFromForm(entity[block], (original || {})[block], switches);
  });
  const light = entity.light;
  const before = isObject((original || {}).light) ? original.light : {};
  if (isObject(light) && light.light_object) {
    if (light.single !== 'yes') delete light.light_object; // one light switched off: its object goes too
    else if (before.single == null) delete light.single; // light_object alone says it
  }
  Object.entries(ARRAY_VECTORS).forEach(([block, keys]) => {
    if (!isObject(entity[block])) return;
    keys.forEach((key) => {
      const value = entity[block][key];
      if (!isObject(value)) return;
      const list = [value.x, value.y, value.z];
      // Written as [x, y, z] once complete; while being typed it stays { x, y, z }.
      if (list.every((n) => typeof n === 'number' && isFinite(n))) entity[block][key] = list;
      else if (list.every((n) => n === undefined || n === null)) delete entity[block][key];
    });
  });
  Object.keys(entity).forEach((key) => {
    if (isObject(entity[key])) dropEmpty(entity[key]);
  });
  return entity;
}

// Components of Home Assistant used by the editor. They are defined once any built-in editor with
// forms has been loaded: in the card dialog they usually are; otherwise the editors of the entities
// and tile cards load them.
async function loadHaComponents(): Promise<boolean> {
  if (customElements.get('ha-form') && customElements.get('ha-expansion-panel')) return true;
  try {
    const helpers = await (window as any).loadCardHelpers();
    for (const config of [{ type: 'entities', entities: [] }, { type: 'tile', entity: 'sun.sun' }]) {
      const card = await helpers.createCardElement(config);
      await (card.constructor as any).getConfigElement?.();
    }
  } catch (e) {
    // Home Assistant without loadCardHelpers: the classic editor is used.
  }
  const defined = await Promise.race([
    customElements.whenDefined('ha-form').then(() => true),
    new Promise<boolean>((resolve) => setTimeout(() => resolve(false), 5000)),
  ]);
  return defined && !!customElements.get('ha-expansion-panel');
}

@customElement('floor3d-card-editor')
export class Floor3dCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: any;
  @state() private _view: View = {};
  @state() private _expanded: string[] = [];
  @state() private _mode: 'loading' | 'ready' | 'classic' = 'loading';
  @state() private _modelObjects: string[] = [];
  @state() private _listObjects: string[] = [];
  @state() private _picking?: PickTarget;
  @state() private _paused = false; // preview paused (see preview.ts)
  // Shadows of the preview: the limit of the GPU of this device, the lights with shadows, the
  // entities (by position) whose lights are left without, and the material of the model that takes
  // the most texture units (they lower the limit).
  @state() private _shadows?: {
    budget: number;
    lights: number;
    dropped: number[];
    extralightmode: boolean;
    textures?: number;
    material?: string;
  };
  private _held?: string;
  private _pending?: any; // config waiting to be sent to Home Assistant
  private _timer?: number;
  private _flushListener = (): void => {
    this._flush();
  };
  private _internal?: any;
  private _classic?: any;
  private _keys = new WeakMap<Record<string, unknown>, string>();
  private _objectlist?: string;
  private _previewListener = (ev: Event): void => this._onPreview((ev as CustomEvent).detail);
  private _translator?: Translator & { language: string };

  // The texts in the language of the card (its language option, else the one of the user).
  private get _tr(): Translator {
    const language = pickLanguage(this._config && this._config.language, this.hass && this.hass.locale && this.hass.locale.language, this.hass && this.hass.language);
    if (!this._translator || this._translator.language !== language) this._translator = { ...translator(language), language };
    return this._translator;
  }

  private _t(key: string, vars?: { [name: string]: string | number }): string {
    return this._tr.t(key, vars);
  }

  public connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener(PREVIEW_EVENT, this._previewListener);
    // Leaving a field, or a click anywhere (the Save button of the dialog included), sends the config
    // waiting: Home Assistant always has the last one.
    this.addEventListener('focusout', this._flushListener);
    window.addEventListener('pointerdown', this._flushListener, true);
    this._paused = previewState.paused;
    this._toPreview({ request: 'objects' });
    if (this._mode === 'loading') {
      loadHaComponents().then((ready) => {
        this._mode = ready ? 'ready' : 'classic';
        if (!ready) this._showClassic();
      });
    }
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener(PREVIEW_EVENT, this._previewListener);
    this.removeEventListener('focusout', this._flushListener);
    window.removeEventListener('pointerdown', this._flushListener, true);
    this._flush();
    // The next editor starts with a live preview; a preview still paused shows the model.
    const paused = previewState.paused;
    previewState.paused = false;
    this._toPreview({ pick: false, highlight: [], ...(paused ? { request: 'resume' } : {}) });
  }

  public setConfig(config: any): void {
    const json = JSON.stringify(config);
    const own = this._internal && json === this._held;
    this._held = json;
    if (!own) {
      // A config written elsewhere (the YAML editor): it wins over the one waiting to be sent.
      window.clearTimeout(this._timer);
      this._pending = undefined;
    }
    const normalized: any = normalizeConfig(own ? this._internal : config);
    if (!Array.isArray(normalized.entities)) normalized.entities = [];
    if (!this._config) this._expanded = normalized.entities.length ? ['entities'] : ['model'];
    this._config = normalized;
    if (this._classic) this._classic.setConfig(config);
    this._loadObjectList();
  }

  // --- Config changes -------------------------------------------------------------------------

  private _update(config: any): void {
    this._config = config;
    this._internal = normalizeConfig(config);
    this._pending = cleanConfig(config);
    window.clearTimeout(this._timer);
    this._timer = window.setTimeout(() => this._flush(), CONFIG_DELAY_MS);
  }

  // Sends the config waiting, if any: true when Home Assistant got a new one (and so builds the
  // preview again).
  private _flush(): boolean {
    window.clearTimeout(this._timer);
    this._timer = undefined;
    const clean = this._pending;
    this._pending = undefined;
    if (!clean) return false;
    const json = JSON.stringify(clean);
    if (json === this._held) return false; // same YAML (a row still empty was added): nothing to send
    this._held = json;
    fireEvent(this, 'config-changed', { config: clean });
    return true;
  }

  // Pause and reload of the preview, at the top of the editor and of each item.
  private _previewButtons(): TemplateResult {
    return html`
      <ha-icon-button
        .label=${this._t(this._paused ? 'ui.resume_preview' : 'ui.pause_preview')}
        .path=${this._paused ? mdiPlay : mdiPause}
        @click=${() => this._setPaused(!this._paused)}
      ></ha-icon-button>
      <ha-icon-button .label=${this._t('ui.reload_preview')} .path=${mdiRefresh} @click=${() => this._reloadPreview()}></ha-icon-button>
    `;
  }

  private _setPaused(paused: boolean): void {
    this._paused = paused;
    previewState.paused = paused;
    if (paused) {
      previewState.image = undefined;
      this._toPreview({ request: 'snapshot' });
    } else {
      this._reloadPreview();
    }
  }

  // The config waiting, if any, makes Home Assistant build the preview again; otherwise the preview
  // loads the model again.
  private _reloadPreview(): void {
    if (!this._flush()) this._toPreview({ request: 'reload' });
  }

  private _setTop(data: any): void {
    this._update(dropEmpty(switchesFromForm(data, this._config, SWITCHES)));
  }

  private _list(key: ListKey): any[] {
    return Array.isArray(this._config[key]) ? this._config[key] : [];
  }

  private _setList(key: ListKey, list: any[]): void {
    this._update({ ...this._config, [key]: list });
  }

  private _setItem(key: ListKey, index: number, item: any): void {
    const list = this._list(key).slice();
    list[index] = item;
    this._setList(key, list);
  }

  // A stable key for each row, so that dragging and editing keep the row elements.
  private _key(item: any): string {
    if (!isObject(item)) return String(item);
    if (!this._keys.has(item)) this._keys.set(item, Math.random().toString(36).slice(2));
    return this._keys.get(item) as string;
  }

  // --- Preview (the card next to the editor) ------------------------------------------------------

  private _toPreview(detail: any): void {
    window.dispatchEvent(new CustomEvent(EDITOR_EVENT, { detail }));
  }

  private _onPreview(detail: any): void {
    if (!detail) return;
    if (detail.objects) {
      this._modelObjects = detail.objects;
      // The preview is created again at every change of the config: it gets the state again.
      if (this._picking) this._toPreview({ pick: true });
      this._highlightCurrent();
    }
    if (detail.shadows) this._shadows = detail.shadows;
    // A new preview showing the picture of the pause, while objects are being picked: the model.
    if (detail.paused && this._picking) this._toPreview({ request: 'live' });
    if (detail.picked && this._picking) this._onPicked(detail.picked);
    if (detail.camera && this._cameraTarget) {
      const target = this._cameraTarget;
      this._cameraTarget = undefined;
      this._applyCamera(target, detail.camera);
    }
  }

  private _cameraTarget?: { list?: ListKey; index?: number };

  private _useCurrentView(list?: ListKey, index?: number): void {
    // A paused preview answers with the camera of the last live one: the pause stays.
    this._cameraTarget = { list, index };
    this._toPreview({ request: 'camera' });
  }

  private _applyCamera(target: { list?: ListKey; index?: number }, camera: any): void {
    const round = (v: any): any => ({ x: +v.x.toFixed(2), y: +v.y.toFixed(2), z: +v.z.toFixed(2) });
    const values = {
      camera_position: round(camera.camera_position),
      camera_target: round(camera.camera_target),
      camera_rotate: {
        x: +camera.camera_rotate.x.toFixed(4),
        y: +camera.camera_rotate.y.toFixed(4),
        z: +camera.camera_rotate.z.toFixed(4),
      },
    };
    if (target.list) {
      const item = { ...this._list(target.list)[target.index as number], ...values };
      this._setItem(target.list, target.index as number, item);
    } else {
      this._update({ ...this._config, ...values });
    }
  }

  private _startPick(target: PickTarget): void {
    const same = this._picking && JSON.stringify(this._picking) === JSON.stringify(target);
    this._picking = same ? undefined : target;
    // Objects are picked in the model: a paused preview showing its picture loads it, and the
    // pause stays (before, picking resumed the preview, which went back to the initial view).
    if (!same && this._paused) this._toPreview({ request: 'live' });
    this._toPreview({ pick: !same });
  }

  private _onPicked(name: string): void {
    const target = this._picking as PickTarget;
    if (target.add) {
      // Objects of a group: a tap adds the object, a second tap takes it out.
      const [list, index] = target.path as [ListKey, number];
      const group = { ...this._list(list)[index] };
      const objects = (group.objects || []).slice();
      const at = objects.findIndex((o) => (isObject(o) ? o.object_id : o) === name);
      if (at >= 0) objects.splice(at, 1);
      else objects.push({ object_id: name });
      this._setItem(list, index, { ...group, objects });
    } else {
      this._picking = undefined;
      this._toPreview({ pick: false });
      this._setPath(target.path, name);
    }
  }

  // Sets config[path[0]][path[1]]... = value.
  private _setPath(path: (string | number)[], value: any): void {
    const config = copy(this._config);
    let object = config;
    path.slice(0, -1).forEach((key) => {
      if (object[key] === undefined) object[key] = {};
      object = object[key];
    });
    object[path[path.length - 1]] = value;
    this._update(config);
  }

  // The objects shown in the preview while a row is under the mouse or an item is edited.
  private _highlight(ids: string[]): void {
    this._toPreview({ highlight: ids.filter((id) => typeof id === 'string' && id !== '') });
  }

  private _highlightCurrent(): void {
    const { list, index } = this._view;
    this._highlight(list && index !== undefined ? this._itemObjects(list, this._list(list)[index]) : []);
  }

  private _itemObjects(list: ListKey, item: any): string[] {
    if (!isObject(item) || list === 'maps') return [];
    if (list === 'object_groups') return (item.objects || []).map((o) => (isObject(o) ? o.object_id : o));
    return [item.object_id];
  }

  // Objects offered in the object menus: groups first, then the objects of the model.
  private _objectOptions(): string[] {
    const groups = this._list('object_groups')
      .filter((g) => isObject(g) && g.object_group)
      .map((g) => '<' + g.object_group + '>');
    const names = Array.from(new Set([...this._modelObjects, ...this._listObjects])).sort((a, b) =>
      a.toLowerCase().localeCompare(b.toLowerCase()),
    );
    return [...groups, ...names];
  }

  // objectlist: a JSON file next to the model whose keys are the names of the objects.
  private _loadObjectList(): void {
    const { path, objectlist } = this._config || {};
    const url = objectlist && path ? path.replace(/\/?$/, '/') + objectlist : undefined;
    if (url === this._objectlist) return;
    this._objectlist = url;
    this._listObjects = [];
    if (!url) return;
    fetch(url)
      .then((response) => (response.ok ? response.json() : {}))
      .then((json) => {
        if (this._objectlist === url) this._listObjects = Object.keys(json || {});
      })
      .catch(() => undefined);
  }

  // --- Classic editor ---------------------------------------------------------------------------

  private async _showClassic(): Promise<void> {
    await import('./editor-classic');
    const classic: any = document.createElement('floor3d-card-editor-classic');
    classic.hass = this.hass;
    if (this._config) classic.setConfig(this._config);
    this._classic = classic;
    this.requestUpdate();
  }

  protected updated(changed: Map<string, any>): void {
    if (changed.has('hass') && this._classic) this._classic.hass = this.hass;
    if (changed.has('_view')) this._highlightCurrent();
  }

  // --- Rendering ---------------------------------------------------------------------------------

  protected render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) return nothing;
    if (this._mode === 'classic') return html`${this._classic || nothing}`;
    if (this._mode === 'loading') return html`<div class="loading">${this._t('ui.loading')}</div>`;
    const { list, index } = this._view;
    if (list && index !== undefined && this._list(list)[index] !== undefined) {
      return this._renderItemEditor(list, index);
    }
    return html`
      <div class="version">
        floor3d-card ${CARD_VERSION} ${this._previewButtons()}
      </div>
      ${SECTIONS.map((section) => this._renderPanel(section.key, this._t('sections.' + section.key), section.icon, () =>
        this._renderContent(section.content(this._config), this._config, (data) => this._setTop(data), true),
      ))}
      ${this._renderPanel('entities', this._t('ui.entities', { count: this._list('entities').length }), 'mdi:format-list-bulleted', () =>
        this._renderList('entities', this._t('ui.add_entity'), { entity: '' }),
      )}
      ${this._renderPanel('object_groups', this._t('ui.object_groups', { count: this._list('object_groups').length }), 'mdi:group', () =>
        this._renderList('object_groups', this._t('ui.add_group'), { object_group: '', objects: [] }),
      )}
      ${this._renderPanel('zoom_areas', this._t('ui.views', { count: this._list('zoom_areas').length }), 'mdi:magnify-expand', () =>
        this._renderList('zoom_areas', this._t('ui.add_view'), { zoom: '' }),
      )}
    `;
  }

  private _renderPanel(key: string, title: string, icon: string, content: () => TemplateResult | TemplateResult[]): TemplateResult {
    const expanded = this._expanded.includes(key);
    return html`
      <ha-expansion-panel
        outlined
        .header=${title}
        .expanded=${expanded}
        @expanded-changed=${(ev: CustomEvent) => {
          const now = ev.detail.expanded;
          if (now !== this._expanded.includes(key)) {
            this._expanded = now ? [...this._expanded, key] : this._expanded.filter((k) => k !== key);
          }
        }}
      >
        <ha-icon slot="leading-icon" .icon=${icon}></ha-icon>
        <div class="panel">${expanded ? content() : nothing}</div>
      </ha-expansion-panel>
    `;
  }

  // Forms, headings and the parts that aren't plain fields, in the order of the schema.
  private _renderContent(
    items: (Schema[] | string)[],
    data: any,
    onChange: (data: any) => void,
    top = false,
    list?: ListKey,
    index?: number,
  ): TemplateResult[] {
    return items.map((item) => {
      if (typeof item !== 'string') {
        return this._form(item, top ? topToForm(data) : entityToForm(data), (value) =>
          onChange(top ? value : entityFromForm(value, data)),
        );
      }
      switch (item) {
        case 'sun_roof':
          return this._form(
            [objectListField('sun_roof', this._objectOptions())],
            { sun_roof: Array.isArray(data.sun_roof) ? data.sun_roof : [] },
            (value) => onChange({ ...topToForm(data), sun_roof: value.sun_roof?.length ? value.sun_roof : undefined }),
            this._t('headings.sun_roof'),
          );
        case 'rooms':
          return html`
            <div class="heading">${this._t('headings.rooms')}</div>
            ${this._renderList('rooms', this._t('ui.add_room'), { name: '' })}
          `;
        case 'maps':
          return html`
            <div class="heading">${this._t('headings.maps')}</div>
            <div class="hint">${this._t('ui.maps_hint')}</div>
            ${this._renderList('maps', this._t('ui.add_map'), { key: '' })}
          `;
        case 'colorcondition':
          return this._renderColorConditions(list as ListKey, index as number, data);
        case 'shadow_status':
          return this._renderShadowStatus();
        default:
          if (VECTOR_HEADINGS.includes(item)) {
            // A vector inside the options block: block.key
            const [block, key] = item.split('.');
            return this._form(
              [{ name: block, type: 'grid', schema: [vector(key)] }],
              entityToForm(data),
              (value) => onChange(entityFromForm(value, data)),
              this._t(headingKey(item)),
            );
          }
          return html`<div class="heading">${this._t('headings.' + item)}</div>`;
      }
    });
  }

  private _form(schema: Schema[], data: any, onChange: (data: any) => void, heading?: string): TemplateResult {
    // A vector alone gets its name above it (ha-form shows no label for a grid).
    const vectorAlone = schema.length === 1 && VECTOR_HEADINGS.includes(schema[0].name);
    const title = heading ?? (vectorAlone ? this._t(headingKey(schema[0].name)) : undefined);
    const { lookup } = this._tr;
    return html`
      ${title ? html`<div class="heading">${title}</div>` : nothing}
      <ha-form
        .hass=${this.hass}
        .data=${data}
        .schema=${localizeSchema(schema, lookup)}
        .computeLabel=${labelFor(lookup)}
        .computeHelper=${helperFor(lookup)}
        @value-changed=${(ev: CustomEvent) => {
          ev.stopPropagation();
          onChange(ev.detail.value);
        }}
      ></ha-form>
    `;
  }

  // --- Lists ---------------------------------------------------------------------------------------

  // An object id that the model doesn't have (a group: that the card doesn't define).
  private _missing(id: string): boolean {
    if (!id) return false;
    const group = /^<(.*)>$/.exec(id);
    if (group) return !this._list('object_groups').some((g) => isObject(g) && g.object_group === group[1]);
    const known = [...this._modelObjects, ...this._listObjects];
    if (objectPattern(id)) return known.length > 0 && matchObjects(id, known).length === 0;
    return known.length > 0 && !known.includes(id);
  }

  // The objects of an entity: those of its group, or those its name with * matches.
  private _entityParts(id: string): string[] {
    if (!id) return [];
    const group = /^<(.*)>$/.exec(id);
    if (group) {
      const found = this._list('object_groups').find((g) => isObject(g) && g.object_group === group[1]);
      return found ? (found.objects || []).map((o) => (isObject(o) ? o.object_id : o)).filter((o) => o) : [];
    }
    if (objectPattern(id)) return matchObjects(id, Array.from(new Set([...this._modelObjects, ...this._listObjects])));
    return [id];
  }

  // The object of an entity in its line: a name with * says how many objects it matches.
  private _objectText(id: string): string {
    if (!id) return this._t('ui.no_object');
    if (this._missing(id)) return this._t('ui.not_in_model', { id });
    const known = Array.from(new Set([...this._modelObjects, ...this._listObjects]));
    if (!objectPattern(id) || known.length === 0) return id;
    const count = matchObjects(id, known).length;
    return this._t(count === 1 ? 'ui.matches_one' : 'ui.matches_other', { id, count });
  }

  private _describe(list: ListKey, item: any, index: number): { icon: string; primary: string; secondary: string; warning?: boolean } {
    if (list === 'entities') {
      const entity = isObject(item) ? item : { entity: item };
      const type = TYPES.find(([value]) => value === entity.type3d);
      const state = entity.entity && this.hass?.states[entity.entity];
      const missing = this._missing(entity.object_id);
      const parts = [type ? this._t('types.' + type[0]) : this._t('ui.no_type'), this._objectText(entity.object_id)];
      if (entity.entity && !state) parts.unshift(this._t('ui.entity_not_found'));
      const noShadow = this._noShadow(index);
      if (noShadow) parts.push(this._t('ui.no_shadow'));
      return {
        icon: type ? type[1] : 'mdi:help-circle-outline',
        primary: this._entityName(entity),
        secondary: parts.join(' · '),
        warning: !state || !type || !entity.object_id || missing || noShadow,
      };
    }
    if (list === 'object_groups') {
      const count = (item.objects || []).length;
      return {
        icon: 'mdi:group',
        primary: item.object_group || this._t('ui.no_name'),
        secondary: this._t(count === 1 ? 'ui.objects_one' : 'ui.objects_other', { count }),
        warning: !item.object_group,
      };
    }
    if (list === 'maps') {
      const preset = MAP_KEYS.includes(item.key);
      const range = [item.min, item.max].every((v) => v !== undefined && v !== '') ? `${item.min}–${item.max}${item.unit ? ' ' + item.unit : ''}` : '';
      return {
        icon: preset ? 'mdi:map-legend' : 'mdi:map-plus',
        primary: item.name || (preset ? this._t('options.map_key.' + item.key) : item.key) || this._t('ui.no_name'),
        secondary: [preset ? this._t('ui.map_preset') : this._t('ui.map_custom'), range].filter((p) => p).join(' · '),
        warning: !item.key,
      };
    }
    if (list === 'zoom_areas') {
      const kind = item.object_id
        ? this._t('ui.around', { id: item.object_id })
        : this._t(item.camera_position ? 'ui.camera_position' : 'ui.not_set');
      return { icon: 'mdi:magnify-expand', primary: item.zoom || this._t('ui.no_name'), secondary: kind, warning: !item.zoom };
    }
    const missing = this._missing(item.object_id);
    return {
      icon: 'mdi:floor-plan',
      primary: item.name || this._t('ui.no_name'),
      secondary: item.object_id ? (missing ? this._t('ui.not_in_model', { id: item.object_id }) : item.object_id) : this._t('ui.no_object'),
      warning: !item.object_id || missing,
    };
  }

  private _entityName(entity: any): string {
    const state = entity.entity && this.hass?.states[entity.entity];
    return state ? state.attributes.friendly_name || entity.entity : entity.entity || this._t('ui.no_entity');
  }

  // The lights of the entity at this position are drawn without shadow: the GPU of this device draws
  // no more (see _shadowBudget in floor3d-card.ts).
  private _noShadow(index: number): boolean {
    const shadow = this._config.shadow === 'yes' || this._config.shadow === true;
    return shadow && !!this._shadows && this._shadows.dropped.includes(index);
  }

  // How many shadows the preview draws, against the limit of the GPU of this device. Past it, the
  // last lights get none and their light goes through the walls.
  private _renderShadowStatus(): TemplateResult {
    const s = this._shadows;
    if (!s) return html``;
    const counts = { lights: s.lights, budget: s.budget };
    if (s.lights <= s.budget) return html`<div class="hint">${this._t('ui.shadows_ok', counts)}</div>`;
    if (s.extralightmode) return html`<ha-alert alert-type="info">${this._t('ui.shadows_extra', counts)}</ha-alert>`;
    const entities = this._list('entities');
    const names = s.dropped.map((i) =>
      entities[i] !== undefined ? this._entityName(isObject(entities[i]) ? entities[i] : { entity: entities[i] }) : this._t('ui.other_lights'),
    );
    // A material of the model with many textures takes units the shadows could have.
    const material = s.textures && s.textures > 2 ? ' ' + this._t('ui.shadows_material', { material: s.material || '', textures: s.textures }) : '';
    return html`<ha-alert alert-type="warning">${this._t('ui.shadows_over', { ...counts, names: names.join(', ') }) + material}</ha-alert>`;
  }

  private _renderList(list: ListKey, addLabel: string, newItem: any): TemplateResult {
    const items = this._list(list);
    return html`
      <ha-sortable handle-selector=".handle" @item-moved=${(ev: CustomEvent) => this._moveItem(list, ev.detail.oldIndex, ev.detail.newIndex)}>
        <div class="rows">
          ${repeat(
            items,
            (item) => this._key(item),
            (item, index) => {
              const d = this._describe(list, item, index);
              return html`
                <div
                  class="row"
                  @mouseenter=${() => this._highlight(this._itemObjects(list, item))}
                  @mouseleave=${() => this._highlight([])}
                >
                  <div class="handle"><ha-svg-icon .path=${mdiDragHorizontalVariant}></ha-svg-icon></div>
                  <ha-icon class="type" .icon=${d.icon}></ha-icon>
                  <div class="info" @click=${() => this._edit(list, index)}>
                    <span class="primary">${d.primary}</span>
                    <span class="secondary ${d.warning ? 'warning' : ''}">${d.secondary}</span>
                  </div>
                  <ha-icon-button .label=${this._t('ui.edit')} .path=${mdiPencil} @click=${() => this._edit(list, index)}></ha-icon-button>
                  <ha-icon-button .label=${this._t('ui.remove')} .path=${mdiDelete} @click=${() => this._removeItem(list, index)}></ha-icon-button>
                </div>
              `;
            },
          )}
        </div>
      </ha-sortable>
      <ha-button class="add" @click=${() => this._addItem(list, newItem)}>
        <ha-svg-icon slot="start" .path=${mdiPlus}></ha-svg-icon>${addLabel}
      </ha-button>
    `;
  }

  private _moveItem(list: ListKey, from: number, to: number): void {
    const items = this._list(list).slice();
    items.splice(to, 0, items.splice(from, 1)[0]);
    this._setList(list, items);
  }

  private _removeItem(list: ListKey, index: number): void {
    const items = this._list(list).slice();
    items.splice(index, 1);
    this._highlight([]);
    this._setList(list, items);
  }

  private _addItem(list: ListKey, item: any): void {
    const items = [...this._list(list), copy(item)];
    this._setList(list, items);
    this._edit(list, items.length - 1);
  }

  private _edit(list: ListKey, index: number): void {
    this._view = { list, index };
  }

  private _back(): void {
    if (this._picking) this._startPick(this._picking);
    this._view = {};
    this._highlight([]);
  }

  // --- Item editors --------------------------------------------------------------------------------

  private _renderItemEditor(list: ListKey, index: number): TemplateResult {
    const item = this._list(list)[index];
    const set = (value: any): void => this._setItem(list, index, value);
    let content: TemplateResult | TemplateResult[];
    if (list === 'entities') content = this._renderEntity(index, isObject(item) ? item : { entity: item }, set);
    else if (list === 'object_groups') content = this._renderGroup(index, item, set);
    else if (list === 'zoom_areas') content = this._renderZoom(index, item, set);
    else if (list === 'maps') content = this._renderMap(item, set);
    else content = this._renderRoom(index, item, set);
    return html`
      <div class="subheader">
        <ha-icon-button .label=${this._t('ui.back')} .path=${mdiArrowLeft} @click=${() => this._back()}></ha-icon-button>
        <span class="title">${this._t('ui.title_' + list)}</span>
        ${this._previewButtons()}
      </div>
      ${content}
    `;
  }

  // Object field with the button that picks the object in the preview.
  private _objectRow(path: (string | number)[], schema: Schema[], data: any, onChange: (data: any) => void): TemplateResult {
    const active = this._picking && JSON.stringify(this._picking.path) === JSON.stringify(path);
    return html`
      <div class="object-row">
        ${this._form(schema, data, onChange)}
        <ha-icon-button
          class=${active ? 'picking' : ''}
          .label=${this._t('ui.pick')}
          .path=${mdiCursorDefaultClickOutline}
          @click=${() => this._startPick({ path })}
        ></ha-icon-button>
      </div>
      ${active ? html`<div class="hint">${this._t('ui.tap_object')}</div>` : nothing}
    `;
  }

  private _renderEntity(index: number, entity: any, set: (value: any) => void): TemplateResult[] {
    const onChange = (value: any): void => {
      // A new type: the options block of the previous one goes away.
      if (value.type3d !== entity.type3d && entity.type3d && value[entity.type3d] !== undefined) {
        delete value[entity.type3d];
      }
      set(value);
    };
    const objects = this._objectOptions();
    return [
      this._form(entitySchema(), entityToForm(entity), (value) => onChange(entityFromForm(value, entity))),
      this._objectRow(['entities', index, 'object_id'], [{ ...objectField('object_id', objects), helper_key: 'object_id_entity' }], entity, (value) =>
        onChange(dropEmpty({ ...entity, object_id: value.object_id })),
      ),
      ...(entity.type3d
        ? [
            html`<div class="heading">${this._t('headings.type_options', { type: this._t('types.' + entity.type3d) })}</div>`,
            ...this._renderContent(typeSchema(entity.type3d, objects, entity, this._entityParts(entity.object_id)), entity, onChange, false, 'entities', index),
          ]
        : []),
      html`
        <ha-expansion-panel outlined .header=${this._t('ui.actions_panel')}>
          <div class="panel">
            ${this._form(entityActionsSchema(), entity, (value) => onChange(dropEmpty({ ...value })))}
          </div>
        </ha-expansion-panel>
      `,
    ];
  }

  private _renderColorConditions(list: ListKey, index: number, entity: any): TemplateResult {
    const conditions: any[] = Array.isArray(entity.colorcondition) ? entity.colorcondition : [];
    const set = (next: any[]): void => this._setItem(list, index, { ...entity, colorcondition: next });
    return html`
      <div class="heading">${this._t('headings.colorcondition')}</div>
      <ha-sortable
        handle-selector=".handle"
        @item-moved=${(ev: CustomEvent) => {
          const next = conditions.slice();
          next.splice(ev.detail.newIndex, 0, next.splice(ev.detail.oldIndex, 1)[0]);
          set(next);
        }}
      >
        <div class="rows">
          ${repeat(
            conditions,
            (c) => this._key(c),
            (c, i) => html`
              <div class="row condition">
                <div class="handle"><ha-svg-icon .path=${mdiDragHorizontalVariant}></ha-svg-icon></div>
                ${this._form(colorConditionSchema(), c, (value) => {
                  const next = conditions.slice();
                  next[i] = dropEmpty({ ...value });
                  set(next);
                })}
                <ha-icon-button
                  .label=${this._t('ui.remove')}
                  .path=${mdiDelete}
                  @click=${() => set(conditions.filter((_, j) => j !== i))}
                ></ha-icon-button>
              </div>
            `,
          )}
        </div>
      </ha-sortable>
      <ha-button class="add" @click=${() => set([...conditions, { state: '', color: '' }])}>
        <ha-svg-icon slot="start" .path=${mdiPlus}></ha-svg-icon>${this._t('ui.add_colour')}
      </ha-button>
    `;
  }

  private _renderGroup(index: number, group: any, set: (value: any) => void): TemplateResult[] {
    const objects: any[] = group.objects || [];
    const idOf = (o: any): string => (isObject(o) ? o.object_id : o);
    const path = ['object_groups', index, 'objects'];
    const active = this._picking && JSON.stringify(this._picking.path) === JSON.stringify(path);
    const setObjects = (next: any[]): void => set({ ...group, objects: next });
    return [
      this._form(groupSchema(), group, (value) => set(dropEmpty({ ...value }))),
      html`
        <div class="heading">${this._t('headings.objects')}</div>
        <ha-sortable
          handle-selector=".handle"
          @item-moved=${(ev: CustomEvent) => {
            const next = objects.slice();
            next.splice(ev.detail.newIndex, 0, next.splice(ev.detail.oldIndex, 1)[0]);
            setObjects(next);
          }}
        >
          <div class="rows">
            ${repeat(
              objects,
              (o) => this._key(o),
              (o, i) => html`
                <div class="row" @mouseenter=${() => this._highlight([idOf(o)])} @mouseleave=${() => this._highlightCurrent()}>
                  <div class="handle"><ha-svg-icon .path=${mdiDragHorizontalVariant}></ha-svg-icon></div>
                  <div class="info"><span class="primary">${idOf(o) || this._t('ui.no_object_title')}</span></div>
                  <ha-icon-button
                    .label=${this._t('ui.remove')}
                    .path=${mdiDelete}
                    @click=${() => setObjects(objects.filter((_, j) => j !== i))}
                  ></ha-icon-button>
                </div>
              `,
            )}
          </div>
        </ha-sortable>
        <div class="object-row">
          ${this._form([objectField('add', this._objectOptions().filter((o) => !o.startsWith('<')))], {}, (value) => {
            if (value.add) setObjects([...objects, { object_id: value.add }]);
          }, '')}
          <ha-icon-button
            class=${active ? 'picking' : ''}
            .label=${this._t('ui.pick')}
            .path=${mdiCursorDefaultClickOutline}
            @click=${() => this._startPick({ path, add: true })}
          ></ha-icon-button>
        </div>
        ${active ? html`<div class="hint">${this._t('ui.tap_objects')}</div>` : nothing}
      `,
    ];
  }

  private _renderZoom(index: number, zoom: any, set: (value: any) => void): TemplateResult[] {
    const onChange = (value: any): void => set(entityFromForm(value, zoom));
    return [
      this._form(zoomSchema(), zoom, onChange),
      html`
        <div class="heading-row">
          <div class="heading">${this._t('headings.camera')}</div>
          <ha-button appearance="plain" size="s" @click=${() => this._useCurrentView('zoom_areas', index)}>
            <ha-svg-icon slot="start" .path=${mdiCameraOutline}></ha-svg-icon>${this._t('ui.use_current_view')}
          </ha-button>
        </div>
      `,
      this._form([vector('camera_position')], zoom, onChange),
      this._form([vector('camera_target')], zoom, onChange),
      this._form([vector('camera_rotate')], zoom, onChange),
      html`<div class="heading">${this._t('headings.around_object')}</div>
        <div class="hint">${this._t('ui.around_object_hint')}</div>`,
      this._objectRow(['zoom_areas', index, 'object_id'], zoomObjectSchema(this._objectOptions()), zoom, onChange),
      this._form([vector('direction')], zoom, onChange, this._t('headings.direction')),
      this._form([vector('rotation')], zoom, onChange, this._t('headings.rotation')),
    ];
  }

  private _renderRoom(index: number, room: any, set: (value: any) => void): TemplateResult[] {
    // presence, alarms and power: one entity or a list. The picker of several entities works on a
    // list (given a single entity, it would change it into a list at once); one entity is written
    // back as it was.
    const multiple = ['presence', 'alarms', 'power'];
    const data = { ...room };
    multiple.forEach((key) => (data[key] = room[key] ? (Array.isArray(room[key]) ? room[key] : [room[key]]) : []));
    const onChange = (value: any): void => {
      const next = dropEmpty({ ...value });
      multiple.forEach((key) => {
        if (!Array.isArray(next[key])) return;
        if (next[key].length === 0) delete next[key];
        else if (next[key].length === 1) next[key] = next[key][0];
      });
      set(next);
    };
    // The maps of the configuration that aren't ready ones: a sensor field each.
    const custom = this._list('maps').filter((m) => isObject(m) && m.key && !MAP_KEYS.includes(m.key) && !ROOM_KEYS.includes(m.key));
    return [
      this._objectRow(['rooms', index, 'object_id'], roomSchema(this._objectOptions()), data, onChange),
      this._form(roomSensorsSchema(custom), data, onChange, this._t('headings.map_sensors')),
      this._form(roomAlarmsSchema(), data, onChange, this._t('headings.alarms_climate')),
    ];
  }

  private _renderMap(map: any, set: (value: any) => void): TemplateResult[] {
    return [
      this._form(mapSchema(), map, (value) => {
        const next = dropEmpty({ ...value });
        if (Array.isArray(next.colors)) {
          next.colors = next.colors.filter((c: any) => typeof c === 'string' && c.trim() !== '');
          if (next.colors.length === 0) delete next.colors;
        }
        set(next);
      }),
      html`<div class="hint">${this._t('ui.map_hint')}</div>`,
    ];
  }

  static get styles(): CSSResultGroup {
    return css`
      :host {
        display: block;
      }
      .version {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        font-size: 12px;
        color: var(--secondary-text-color);
        margin-bottom: 4px;
      }
      .loading {
        padding: 16px;
        color: var(--secondary-text-color);
      }
      ha-expansion-panel {
        display: block;
        margin-bottom: 8px;
        --expansion-panel-content-padding: 0;
        border-radius: 6px;
      }
      ha-expansion-panel ha-icon[slot='leading-icon'] {
        color: var(--secondary-text-color);
      }
      .panel {
        padding: 12px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .heading {
        font-weight: 500;
        margin-top: 8px;
        color: var(--primary-text-color);
      }
      .heading-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 8px;
      }
      .heading-row .heading {
        margin-top: 0;
      }
      .hint {
        font-size: 12px;
        color: var(--secondary-text-color);
      }
      ha-alert {
        display: block;
        margin: 8px 0;
      }
      .rows {
        display: flex;
        flex-direction: column;
      }
      .row {
        display: flex;
        align-items: center;
        gap: 4px;
        border-bottom: 1px solid var(--divider-color);
        min-height: 52px;
      }
      .row.condition ha-form {
        flex: 1;
      }
      .row:hover {
        background: var(--secondary-background-color);
      }
      .handle {
        cursor: grab;
        padding: 0 8px;
        color: var(--secondary-text-color);
        display: flex;
      }
      .row ha-icon.type {
        color: var(--secondary-text-color);
        margin-right: 8px;
      }
      .info {
        flex: 1;
        display: flex;
        flex-direction: column;
        cursor: pointer;
        overflow: hidden;
        padding: 6px 0;
      }
      .info span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .secondary {
        font-size: 12px;
        color: var(--secondary-text-color);
      }
      .secondary.warning {
        color: var(--warning-color);
      }
      .add {
        align-self: flex-start;
        margin-top: 8px;
      }
      .subheader {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 18px;
        margin-bottom: 8px;
      }
      .subheader .title {
        flex: 1;
      }
      .object-row {
        display: flex;
        align-items: flex-start;
        gap: 4px;
      }
      .object-row ha-form {
        flex: 1;
      }
      .object-row ha-icon-button {
        margin-top: 4px;
      }
      ha-icon-button.picking {
        color: var(--primary-color);
        background: rgba(var(--rgb-primary-color), 0.15);
        border-radius: 50%;
      }
    `;
  }
}
