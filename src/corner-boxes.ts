// The boxes in the corners of the card: weather, what is on or open (status), energy, people, alarm
// panel and chips (their contents in boxes.ts), and the corners themselves, where the picture of the
// cameras pops up too. Each box is drawn again only when what it shows changes. The card is reached
// only through BoxesHost: what the boxes read of it, and what a tap on them asks of the model (fly
// to objects or to a room).
import { html, nothing, render, TemplateResult } from 'lit';
import { fireEvent, HomeAssistant } from './ha';
import { switchOn } from './config';
import { climateAction } from './maps';
import { forecastLabel, forecastType, ForecastType, formatDegrees, weatherIcon } from './weather';
import {
  BOX_KINDS,
  batteryIcon,
  chipList,
  Corner,
  corner,
  formatPower,
  initials,
  panelLook,
  peopleList,
  personPlace,
  STATUS_COLORS,
  STATUS_ICONS,
  StatusKind,
  statusGroups,
  topConsumers,
  watts,
} from './boxes';

// A room of the card, as the energy and people boxes see it.
export interface BoxRoom {
  name: string;
  sensors: { [map: string]: string[] };
}

export interface BoxesHost {
  readonly element: HTMLElement; // the card: the events for Home Assistant (hass-more-info) leave from it
  readonly config: any;
  readonly hass: HomeAssistant;
  readonly connected: boolean;
  readonly card: HTMLElement; // where the corners are
  readonly content?: HTMLElement; // the block of the canvas, whose size the corners follow
  // What the card already shows in the corners: the bar of the levels, the menus, the bars of the
  // views and of selectionMode.
  readonly levelbar?: HTMLElement;
  readonly zoommenu?: HTMLElement;
  readonly zoombar?: HTMLElement;
  readonly selectionbar?: HTMLElement;
  readonly rooms: BoxRoom[];
  readonly shownStatus?: StatusKind; // the kind of the status box outlined in the model
  t(key: string, vars?: { [name: string]: string | number }): string;
  language(): string;
  num(value: unknown, fallback: number): number;
  toggleStatus(kind: StatusKind, indices: number[]): void; // a tap on a kind of the status box
  showRoom(room: BoxRoom | undefined, ids: string[]): void; // the camera goes to a room
  roomView(name: string): BoxRoom | undefined;
  renderBoxes(force: boolean): void; // all of them, the picture of the cameras included
  beforePlace(): void; // before the corners are placed (the size of the picture of the cameras)
}

export class CornerBoxes {
  // The container of each corner, the element of each box and what it showed last.
  private _corners = new Map<Corner, HTMLElement>();
  private _boxEls = new Map<string, HTMLElement>();
  private _boxDeps = new Map<string, unknown[]>();
  private _cornerObserver?: ResizeObserver; // the card changes width (a phone turned): placed again
  private _boxesChanged = false; // a box was drawn, added or removed: the corners are placed again
  private _collapsed?: Set<string>; // the boxes folded on this device (weather, people), read once
  // The forecast box (weather): the forecast and its subscription.
  private _forecast: any[] | null = null;
  private _forecastType?: ForecastType;
  private _weatherKey?: string;
  private _weatherUnsub?: Promise<unknown>;

  constructor(private host: BoxesHost) {}

  // Weather, what is on or open, energy, people, alarm panel and chips; the card draws the picture of
  // the cameras after them (box, changed), then calls placeIfChanged.
  public renderAll(force: boolean): void {
    this._boxesChanged = false;
    this._renderAlarmPanel(force);
    this.renderStatus(force);
    this._renderPeople(force);
    this._renderEnergy(force);
    this._renderWeather(force);
    this._renderChips(force);
  }

  // Measuring the boxes makes the browser lay out the page: only when one of them changed.
  public placeIfChanged(force: boolean): void {
    if (force || this._boxesChanged) this.place();
  }

  // The element of a box, if it is shown.
  public element(kind: string): HTMLElement | undefined {
    return this._boxEls.get(kind);
  }

  // The card is shown again (its size is followed again) or goes away (no forecast, no observer).
  public connect(): void {
    if (this._cornerObserver && (this.host.content || this.host.card))
      this._cornerObserver.observe(this.host.content || this.host.card);
  }

  public disconnect(): void {
    this.unsubscribeWeather();
    if (this._cornerObserver) this._cornerObserver.disconnect();
  }

  private shown(key: string, fallback: boolean): boolean {
    return switchOn(this.host.config, key, fallback);
  }

  // weather: a box in a corner with the weather now and the next forecasts. Home Assistant sends the
  // forecast to who asks for it (weather/subscribe_forecast); versions before 2024.3 also had it in
  // the forecast attribute.
  public subscribeWeather(): void {
    const entityId = this.host.config.weather;
    const stateObj = entityId && this.host.hass ? this.host.hass.states[entityId] : undefined;
    const type = stateObj
      ? forecastType(this.host.config.weather_forecast, stateObj.attributes.supported_features)
      : undefined;
    const key = stateObj && this.host.connected && this.shown('weather_show', true) ? entityId + '|' + type : undefined;
    if (key === this._weatherKey) return;
    this.unsubscribeWeather();
    this._weatherKey = key;
    this._forecastType = type;
    this._forecast = null;
    if (!key || Array.isArray(stateObj.attributes.forecast)) return;
    const connection: any = this.host.hass.connection;
    if (!connection || typeof connection.subscribeMessage !== 'function') return;
    const failed = (e: any) =>
      console.warn('floor3d-card: no forecast from ' + entityId + ': ' + ((e && e.message) || e));
    try {
      this._weatherUnsub = Promise.resolve(
        connection.subscribeMessage(
          (event: any) => {
            if (this._weatherKey !== key) return;
            this._forecast = event && Array.isArray(event.forecast) ? event.forecast : [];
            this._renderWeather();
            this.place(); // the box grew
          },
          { type: 'weather/subscribe_forecast', forecast_type: type, entity_id: entityId },
        ),
      );
      this._weatherUnsub.catch(failed);
    } catch (e) {
      failed(e);
    }
  }

  public unsubscribeWeather(): void {
    const unsubscribe = this._weatherUnsub;
    this._weatherUnsub = undefined;
    this._weatherKey = undefined;
    if (unsubscribe) unsubscribe.then((stop) => typeof stop === 'function' && stop()).catch(() => undefined);
  }

  // The element of a box in its corner (null: the box goes away), after the boxes before it in
  // BOX_KINDS: from the corner, they stack in that order.
  public box(kind: string, where: Corner | null): HTMLElement | null {
    let box = this._boxEls.get(kind);
    if (!where) {
      if (box) {
        box.remove();
        this._boxesChanged = true;
      }
      this._boxEls.delete(kind);
      this._boxDeps.delete(kind);
      return null;
    }
    if (!box) {
      box = document.createElement('div');
      box.className = 'f3d-box f3d-' + kind;
      this._boxEls.set(kind, box);
    }
    const container = this._cornerEl(where);
    if (box.parentElement !== container) {
      const order = BOX_KINDS.indexOf(kind);
      const next = Array.from(container.children).find(
        (child) => BOX_KINDS.indexOf((child as HTMLElement).dataset.kind || '') > order,
      );
      box.dataset.kind = kind;
      container.insertBefore(box, next || null);
      this._boxDeps.delete(kind);
    }
    return box;
  }

  private _cornerEl(where: Corner): HTMLElement {
    let el = this._corners.get(where);
    if (!el) {
      el = document.createElement('div');
      el.className = 'f3d-corner f3d-corner-' + where;
      this.host.card.appendChild(el);
      this._corners.set(where, el);
      if (!this._cornerObserver && typeof ResizeObserver !== 'undefined') {
        // The block of the canvas: the card itself can be an inline element.
        this._cornerObserver = new ResizeObserver(() => this.place());
        this._cornerObserver.observe(this.host.content || this.host.card);
      }
    }
    return el;
  }

  // The corners start after what the card already shows there: the menus at the top right, the
  // levels at the top left, and the old buttons of the views and of selectionMode at the bottom.
  public place(): void {
    if (!this._corners.size) return;
    this.host.beforePlace();
    const height = (el?: HTMLElement): number => {
      const child = el && (el.firstElementChild as HTMLElement | null);
      return child ? child.getBoundingClientRect().height : 0;
    };
    const taken: { [where in Corner]: number } = {
      'top-left': height(this.host.levelbar),
      'top-right': this.host.zoommenu ? this.host.zoommenu.getBoundingClientRect().height : 0,
      'bottom-left': height(this.host.zoombar),
      'bottom-right': height(this.host.selectionbar),
    };
    this._corners.forEach((el, where) => {
      const offset = taken[where] ? Math.round(taken[where]) + 16 : 10;
      el.style.top = where.startsWith('top') ? offset + 'px' : '';
      el.style.bottom = where.startsWith('bottom') ? offset + 'px' : '';
    });
    // On a narrow card the two corners of a side meet. At the top, a box on the left that would meet
    // the menus or a box on the right goes under them, and the boxes after it with it; the ones
    // before it stay at the top, beside the menus. At the bottom, the boxes on the right go above the
    // ones on the left.
    const card = this.host.card.getBoundingClientRect();
    const box = (el?: HTMLElement): DOMRect | null => {
      const r = el && el.childElementCount ? el.getBoundingClientRect() : null;
      return r && r.height > 0 ? r : null;
    };
    const across = (a: DOMRect, b: DOMRect): boolean => a.left < b.right && b.left < a.right;
    const topLeft = this._corners.get('top-left');
    if (topLeft) {
      const lefts = Array.from(topLeft.children) as HTMLElement[];
      lefts.forEach((el) => (el.style.marginTop = ''));
      const topRight = this._corners.get('top-right');
      const obstacles = [
        box(this.host.zoommenu),
        ...(topRight ? (Array.from(topRight.children) as HTMLElement[]) : []).map((el) => el.getBoundingClientRect()),
      ].filter((r) => r && r.height > 0);
      lefts.forEach((el) => {
        const r = el.getBoundingClientRect();
        const met = obstacles.filter((o) => across(r, o) && r.top < o.bottom && o.top < r.bottom);
        if (met.length) el.style.marginTop = Math.round(Math.max(...met.map((o) => o.bottom)) - r.top + 6) + 'px';
      });
    }
    const bottomRight = this._corners.get('bottom-right');
    const below = box(this._corners.get('bottom-left'));
    const beside = box(bottomRight);
    if (below && beside && across(below, beside))
      bottomRight.style.bottom = Math.round(card.bottom - below.top + 6) + 'px';
  }

  public changed(kind: string, deps: unknown[], force: boolean): boolean {
    const last = this._boxDeps.get(kind);
    this._boxDeps.set(kind, deps);
    const changed = force || !last || last.length !== deps.length || deps.some((d, i) => d !== last[i]);
    if (changed) this._boxesChanged = true;
    return changed;
  }

  public moreInfo(entityId?: string): void {
    if (entityId) fireEvent(this.host.element, 'hass-more-info', { entityId });
  }

  // A box that opens its entity wherever it is tapped (weather, alarm panel).
  private _wholeBox(box: HTMLElement, entityId: string, label: string): void {
    box.setAttribute('role', 'button');
    box.tabIndex = 0;
    box.setAttribute('aria-label', label);
    box.onclick = (ev) => {
      ev.stopPropagation();
      this.moreInfo(entityId);
    };
    box.onkeydown = (ev) => {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        this.moreInfo(entityId);
      }
    };
  }

  // A text of the card, or the value itself when the card has no text for it.
  private _tOr(key: string, fallback: string): string {
    const text = this.host.t(key);
    return text === 'common.' + key ? fallback : text;
  }

  // status_show: yes. What is on or open among the entities of the card: lamps on, doors and windows
  // open, locks open, heaters working. A tap on a kind outlines its objects in the model and frames
  // them; a second tap, or ten seconds, ends it.
  public renderStatus(force: boolean): void {
    const box = this.box(
      'status',
      this.shown('status_show', false) ? corner(this.host.config.status_position, 'top-left') : null,
    );
    if (!box) return;
    const entities: any[] = (this.host.config.entities || []).map((e: any) =>
      typeof e === 'string' ? { entity: e } : e,
    );
    const deps: unknown[] = entities.map((e) => e && this.host.hass.states[e.entity]);
    deps.push(this.host.shownStatus, this.host.language());
    if (!this.changed('status', deps, force)) return;
    const groups = statusGroups(entities, this.host.hass.states, climateAction);
    box.setAttribute('aria-label', this.host.t('status'));
    render(
      groups.length
        ? html`${groups.map(
            (g) => html`
              <button
                class="chip ${this.host.shownStatus === g.kind ? 'active' : ''}"
                title=${this.host.t('status_' + g.kind, { count: g.entities.length })}
                @click=${(ev: Event) => {
                  ev.stopPropagation();
                  this.host.toggleStatus(g.kind, g.indices);
                }}
              >
                <ha-icon icon=${STATUS_ICONS[g.kind]} style=${'color: ' + STATUS_COLORS[g.kind]}></ha-icon
                ><span>${g.entities.length}</span>
              </button>
            `,
          )}`
        : html`<span class="chip clear" title=${this.host.t('status_clear')}
            ><ha-icon icon="mdi:check-circle-outline"></ha-icon><span>${this.host.t('status_ok')}</span></span
          >`,
      box,
    );
  }

  // energy_power (the house), energy_solar, energy_grid (positive from the grid, negative to it),
  // energy_battery (%), and the plugs that use the most now (energy_plugs, or the power sensors of
  // the rooms): a tap on one of them goes to its room.
  private _renderEnergy(force: boolean): void {
    const c = this.host.config;
    const plugsSet = Array.isArray(c.energy_plugs) ? c.energy_plugs.filter((p: any) => typeof p === 'string' && p) : [];
    const on =
      !!(c.energy_power || c.energy_solar || c.energy_grid || c.energy_battery || plugsSet.length) &&
      this.shown('energy_show', true);
    const box = this.box('energy', on ? corner(c.energy_position, 'bottom-left') : null);
    if (!box) return;
    const plugs: string[] = plugsSet.length ? plugsSet : this.host.rooms.flatMap((room) => room.sensors.power || []);
    const states = this.host.hass.states;
    const ids = [c.energy_power, c.energy_solar, c.energy_grid, c.energy_battery, ...plugs];
    if (!this.changed('energy', [...ids.map((id) => id && states[id]), this.host.language()], force)) return;
    const language = this.host.language();
    const top = topConsumers(states, plugs, Math.round(this.host.num(c.energy_top, 3)));
    const value = (id: string | undefined, icon: string, text: string, title: string) =>
      id && states[id]
        ? html`<button
            class="value"
            title=${title}
            @click=${(ev: Event) => {
              ev.stopPropagation();
              this.moreInfo(id);
            }}
          >
            <ha-icon icon=${icon}></ha-icon><span>${text}</span>
          </button>`
        : nothing;
    const grid = watts(c.energy_grid ? states[c.energy_grid] : undefined);
    const battery = c.energy_battery && states[c.energy_battery] ? Number(states[c.energy_battery].state) : NaN;
    box.setAttribute('aria-label', this.host.t('energy'));
    render(
      html`
        <div class="values">
          ${value(c.energy_power, 'mdi:home-lightning-bolt', formatPower(watts(states[c.energy_power]), language), this.host.t('energy_power'))}
          ${value(c.energy_solar, 'mdi:solar-power', formatPower(watts(states[c.energy_solar]), language), this.host.t('energy_solar'))}
          ${value(
            c.energy_grid,
            grid < 0 ? 'mdi:transmission-tower-export' : 'mdi:transmission-tower-import',
            formatPower(Math.abs(grid), language),
            this.host.t(grid < 0 ? 'energy_export' : 'energy_import'),
          )}
          ${value(c.energy_battery, batteryIcon(battery), isNaN(battery) ? '' : Math.round(battery) + '%', this.host.t('energy_battery'))}
        </div>
        ${
          top.length
            ? html`<div class="consumers">
                ${top.map((t) => {
                  const room = this.host.rooms.find((r) => (r.sensors.power || []).includes(t.entity));
                  const name = String((states[t.entity] && states[t.entity].attributes.friendly_name) || t.entity);
                  return html`<button
                    class="consumer"
                    title=${room ? name + ' · ' + room.name : name}
                    @click=${(ev: Event) => {
                      ev.stopPropagation();
                      if (room) this.host.showRoom(room, []);
                      else this.moreInfo(t.entity);
                    }}
                  >
                    <span class="name">${name}</span><span>${formatPower(t.watts, language)}</span>
                  </button>`;
                })}
              </div>`
            : nothing
        }
      `,
      box,
    );
  }

  // people: the people of the house, with their picture; at home, away, or in a zone. With a room
  // entity (the area of Bermuda or ESPresense, for example) whose state names a room of the card,
  // the room: a tap on it goes there.
  private _renderPeople(force: boolean): void {
    const people = peopleList(this.host.config.people);
    const where = corner(this.host.config.people_position, 'top-left');
    const box = this.box('people', people.length && this.shown('people_show', true) ? where : null);
    if (!box) return;
    const states = this.host.hass.states;
    const collapsed = this.isCollapsed('people');
    const deps: unknown[] = people.flatMap((p) => [states[p.entity], p.room ? states[p.room] : undefined]);
    deps.push(this.host.language(), collapsed, where);
    if (!this.changed('people', deps, force)) return;
    const rooms: any[] = Array.isArray(this.host.config.rooms) ? this.host.config.rooms : [];
    this._foldable(box, 'people', where, collapsed, this.host.t('people'));
    if (collapsed) {
      // Folded: only the faces, grey for who is away.
      render(
        html`${people.map((p) => {
          const person = states[p.entity];
          if (!person) return nothing;
          const name = String(person.attributes.friendly_name || p.entity);
          const picture = person.attributes.entity_picture as string | undefined;
          return html`<span class="avatar ${person.state === 'home' ? '' : 'away'}" title=${name}
            >${picture ? html`<img src=${picture} alt="" />` : html`<span>${initials(name)}</span>`}</span
          >`;
        })}${this._foldMark('people', where, true)}`,
        box,
      );
      return;
    }
    render(
      html`${people.map((p) => {
        const person = states[p.entity];
        if (!person) return nothing;
        const name = String(person.attributes.friendly_name || p.entity);
        const place = personPlace(person.state, p.room && states[p.room] ? states[p.room].state : undefined, rooms);
        const picture = person.attributes.entity_picture as string | undefined;
        const room = place.room >= 0 ? rooms[place.room] : undefined;
        return html`
          <div class="person ${place.home ? 'home' : 'away'}">
            <button
              class="avatar"
              title=${name}
              @click=${(ev: Event) => {
                ev.stopPropagation();
                this.moreInfo(p.entity);
              }}
            >
              ${picture ? html`<img src=${picture} alt="" />` : html`<span>${initials(name)}</span>`}
            </button>
            <span class="name">${name.split(' ')[0]}</span>
            ${
              room
                ? html`<button
                    class="place link"
                    @click=${(ev: Event) => {
                      ev.stopPropagation();
                      this.host.showRoom(this.host.roomView(room.name), room.object_id ? [room.object_id] : []);
                    }}
                  >
                    ${room.name}
                  </button>`
                : html`<span class="place"
                    >${place.home ? this.host.t('people_home') : place.zone || this.host.t('people_away')}</span
                  >`
            }
          </div>
        `;
      })}${this._foldMark('people', where, false)}`,
      box,
    );
  }

  // Folded, a box shows only what matters most (the weather now, the faces of the people) and a tap
  // anywhere on it opens it again; open, its chevron folds it. Remembered on this device, for this
  // model (the browser storage; without it, until the page is loaded again).
  private _collapseKey(): string {
    return 'floor3d-card-collapsed:' + (this.host.config.path || '') + (this.host.config.objfile || '');
  }

  public isCollapsed(kind: string): boolean {
    if (!this._collapsed) {
      this._collapsed = new Set();
      try {
        const saved = JSON.parse(window.localStorage.getItem(this._collapseKey()) || '[]');
        if (Array.isArray(saved)) saved.forEach((k) => typeof k === 'string' && this._collapsed.add(k));
      } catch {
        // No storage (a private window): nothing folded yet.
      }
    }
    return this._collapsed.has(kind);
  }

  public setCollapsed(kind: string, collapsed: boolean): void {
    this.isCollapsed(kind);
    if (collapsed) this._collapsed.add(kind);
    else this._collapsed.delete(kind);
    try {
      window.localStorage.setItem(this._collapseKey(), JSON.stringify(Array.from(this._collapsed)));
    } catch {
      // As above.
    }
    this.host.renderBoxes(true);
  }

  // A box that folds: folded, the whole box opens it; open, the taps go to its parts.
  private _foldable(box: HTMLElement, kind: string, where: Corner, collapsed: boolean, label: string): void {
    box.classList.toggle('collapsed', collapsed);
    box.classList.toggle('end', !where.endsWith('left')); // the chevron away from the corner
    box.setAttribute('aria-label', label);
    if (!collapsed) {
      box.removeAttribute('aria-expanded');
      if (box.getAttribute('role') === 'button' && kind !== 'weather') {
        box.removeAttribute('role');
        box.removeAttribute('tabindex');
        box.onclick = null;
        box.onkeydown = null;
      }
      return;
    }
    const open = (): void => this.setCollapsed(kind, false);
    box.setAttribute('role', 'button');
    box.setAttribute('aria-expanded', 'false');
    box.tabIndex = 0;
    box.onclick = (ev) => {
      ev.stopPropagation();
      open();
    };
    box.onkeydown = (ev) => {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        open();
      }
    };
  }

  // The chevron of a box that folds, on its side away from the corner: a button that folds the open
  // box, or the mark of a folded one (the whole box opens it).
  private _foldMark(kind: string, where: Corner, collapsed: boolean): TemplateResult {
    const towardCorner = where.endsWith('left') ? 'mdi:chevron-left' : 'mdi:chevron-right';
    const awayFromCorner = where.endsWith('left') ? 'mdi:chevron-right' : 'mdi:chevron-left';
    if (collapsed) return html`<ha-icon class="fold" icon=${awayFromCorner}></ha-icon>`;
    return html`<button
      class="fold"
      title=${this.host.t('box_collapse')}
      aria-label=${this.host.t('box_collapse')}
      aria-expanded="true"
      @click=${(ev: Event) => {
        ev.stopPropagation();
        this.setCollapsed(kind, true);
      }}
    >
      <ha-icon icon=${towardCorner}></ha-icon>
    </button>`;
  }

  // alarm_panel: the state of an alarm_control_panel, green while armed, orange while it changes,
  // red and blinking when triggered. A tap opens it, to arm or disarm.
  private _renderAlarmPanel(force: boolean): void {
    const entityId = this.host.config.alarm_panel;
    const stateObj = entityId ? this.host.hass.states[entityId] : undefined;
    const box = this.box(
      'alarm_panel',
      stateObj && this.shown('alarm_panel_show', true)
        ? corner(this.host.config.alarm_panel_position, 'top-right')
        : null,
    );
    if (!box || !this.changed('alarm_panel', [stateObj, this.host.language()], force)) return;
    const look = panelLook(stateObj.state);
    const text = this._tOr('panel_' + stateObj.state, stateObj.state);
    this._wholeBox(box, entityId, text);
    box.classList.toggle('pulse', !!look.pulse);
    box.style.setProperty('--f3d-panel', look.color);
    render(html`<ha-icon icon=${look.icon}></ha-icon><span>${text}</span>`, box);
  }

  // chips: any entity as a chip, its icon and its state; a tap opens it.
  private _renderChips(force: boolean): void {
    const chips = chipList(this.host.config.chips);
    const box = this.box(
      'chips',
      chips.length && this.shown('chips_show', true) ? corner(this.host.config.chips_position, 'bottom-right') : null,
    );
    if (!box) return;
    const states = this.host.hass.states;
    if (!this.changed('chips', [...chips.map((c) => states[c.entity]), this.host.language()], force)) return;
    const hass: any = this.host.hass;
    box.setAttribute('aria-label', this.host.t('chips'));
    render(
      html`${chips.map((c) => {
        const stateObj = states[c.entity];
        if (!stateObj) return nothing;
        const unit = stateObj.attributes.unit_of_measurement;
        const value =
          typeof hass.formatEntityState === 'function'
            ? hass.formatEntityState(stateObj)
            : stateObj.state + (unit ? ' ' + unit : '');
        const icon = c.icon || (stateObj.attributes.icon as string | undefined);
        const name = c.name || String(stateObj.attributes.friendly_name || c.entity);
        return html`<button
          class="chip"
          title=${name}
          @click=${(ev: Event) => {
            ev.stopPropagation();
            this.moreInfo(c.entity);
          }}
        >
          ${icon ? html`<ha-icon icon=${icon}></ha-icon>` : html`<ha-state-icon .hass=${this.host.hass} .stateObj=${stateObj}></ha-state-icon>`}
          <span>${c.name ? html`<span class="label">${c.name}</span> ` : nothing}${value}</span>
        </button>`;
      })}`,
      box,
    );
  }

  private _renderWeather(force = false): void {
    const entityId = this.host.config.weather;
    const stateObj = entityId ? this.host.hass.states[entityId] : undefined;
    const where = corner(this.host.config.weather_position, 'bottom-left');
    const box = this.box('weather', stateObj && this.shown('weather_show', true) ? where : null);
    const collapsed = this.isCollapsed('weather');
    if (
      !box ||
      !this.changed(
        'weather',
        [stateObj, this._forecast, this._forecastType, this.host.language(), collapsed, where],
        force,
      )
    )
      return;
    // Open, a tap opens the entity; folded, it opens the box.
    if (!collapsed) this._wholeBox(box, entityId, this.host.t('weather'));
    this._foldable(box, 'weather', where, collapsed, this.host.t('weather'));
    if (collapsed) {
      render(
        html`<div class="now">
            <ha-icon icon=${weatherIcon(stateObj.state)}></ha-icon>
            <span>${formatDegrees(stateObj.attributes.temperature)}</span>
          </div>
          ${this._foldMark('weather', where, true)}`,
        box,
      );
      return;
    }
    const forecast: any[] =
      (Array.isArray(stateObj.attributes.forecast) ? stateObj.attributes.forecast : this._forecast) || [];
    const count = Math.min(12, Math.max(0, Math.round(this.host.num(this.host.config.weather_count, 4))));
    const type = this._forecastType || 'daily';
    const language = this.host.language();
    const locale: any = this.host.hass.locale;
    const timeZone = locale && locale.time_zone === 'server' ? (this.host.hass.config as any).time_zone : undefined;
    render(
      html`
        <div class="now">
          <ha-icon icon=${weatherIcon(stateObj.state)}></ha-icon>
          <span>${formatDegrees(stateObj.attributes.temperature)}</span>
        </div>
        ${forecast.slice(0, count).map(
          (f) => html`
            <div class="item">
              <span class="when">${forecastLabel(f.datetime, type, language, timeZone)}</span>
              <ha-icon icon=${weatherIcon(f.condition, f.is_daytime)}></ha-icon>
              <span class="temp"
                >${formatDegrees(f.temperature)}${f.templow != null ? html` <span class="low">${formatDegrees(f.templow)}</span>` : nothing}</span
              >
              ${Number(f.precipitation_probability) >= 10 ? html`<span class="rain">${Math.round(Number(f.precipitation_probability))}%</span>` : nothing}
            </div>
          `,
        )}
        ${this._foldMark('weather', where, false)}
      `,
      box,
    );
  }
}
