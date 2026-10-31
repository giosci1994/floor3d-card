// kiosk: yes, for a tablet on a wall: the card without its header, menus and buttons (the card
// does that), and here the tour of the views and the way back after a touch. kiosk_tour: every so
// many seconds the camera flies to the next view (the initial view, then each zoom area, then the
// initial view again). Touching the card stops the tour; kiosk_idle seconds after the last touch
// (60 when missing, 0 never) the tour goes on from the initial view, or without a tour the camera
// goes back to it. While the camera must stay (hold: an alarm that alarm_view shows) the tour
// waits. This module reads nothing else of the card, for the unit tests.

export const KIOSK_IDLE = 60; // seconds after the last touch, when kiosk_idle is missing

export interface KioskHost {
  readonly config: any;
  views(): number[]; // the zoom areas there are, by their index (the initial view is -1)
  show(index: number): void; // flies to a view: -1 the initial view, 0.. a zoom area
  hold?(): boolean; // true while the camera must stay where it is
}

const seconds = (value: unknown, fallback: number): number => {
  if (value === undefined || value === null || value === '') return fallback;
  const n = Number(value);
  return isNaN(n) || n < 0 ? fallback : n;
};

export class Kiosk {
  private _timer?: ReturnType<typeof setTimeout>;
  private _step = 0; // the view the tour shows: 0 the initial view, 1.. the zoom areas (see _next)
  private _active = false; // between start and stop: a touch counts
  private host: KioskHost;

  constructor(host: KioskHost) {
    this.host = host;
  }

  private get _on(): boolean {
    const kiosk = this.host.config && this.host.config.kiosk;
    return kiosk === 'yes' || kiosk === true;
  }

  // Seconds of each view of the tour; 0 without a tour (or with no zoom area to go to).
  private get _tour(): number {
    if (!this._on || this.host.views().length < 1) return 0;
    return seconds(this.host.config.kiosk_tour, 0);
  }

  private get _idle(): number {
    return this._on ? seconds(this.host.config.kiosk_idle, KIOSK_IDLE) : 0;
  }

  // The model is shown, at its initial view: the tour starts from there.
  public start(): void {
    this._clear();
    this._active = true;
    this._step = 0;
    this._next();
  }

  // The model was touched (the camera moved by hand): no tour until kiosk_idle seconds after the
  // last touch.
  public touched(): void {
    if (!this._active) return;
    this._clear();
    const idle = this._idle;
    if (!this._on || idle <= 0) return;
    this._later(idle, () => {
      this._step = 0;
      this.host.show(-1);
      this._next();
    });
  }

  // The card goes away, or is in the editor: no tour, and the touches don't count.
  public stop(): void {
    this._active = false;
    this._clear();
  }

  private _clear(): void {
    if (this._timer !== undefined) clearTimeout(this._timer);
    this._timer = undefined;
  }

  // fn in so many seconds, or as many seconds later again while the camera must stay.
  private _later(seconds: number, fn: () => void): void {
    this._timer = setTimeout(() => {
      this._timer = undefined;
      if (this.host.hold && this.host.hold()) this._later(seconds, fn);
      else fn();
    }, seconds * 1000);
  }

  // The next view of the tour, in kiosk_tour seconds.
  private _next(): void {
    const tour = this._tour;
    if (tour <= 0) return;
    this._later(tour, () => {
      const views = [-1, ...this.host.views()];
      this._step = (this._step + 1) % views.length;
      this.host.show(views[this._step]);
      this._next();
    });
  }
}
