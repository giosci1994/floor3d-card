// What the card and the editor use of Home Assistant, in place of custom-card-helpers: the object hass
// (only the parts read here), the card and editor elements, and the events the frontend listens to.
import type { Connection, HassConfig, HassEntities, HassEntity } from 'home-assistant-js-websocket';

export interface HomeAssistant {
  states: HassEntities;
  config: HassConfig;
  connection: Connection;
  language: string;
  locale?: { language: string; time_zone?: string; [key: string]: unknown };
  callService(
    domain: string,
    service: string,
    serviceData?: Record<string, unknown>,
    target?: Record<string, unknown>,
  ): Promise<unknown>;
  formatEntityState?(stateObj: HassEntity, state?: string): string;
}

export interface LovelaceCardConfig {
  type: string;
  [key: string]: any;
}

export interface LovelaceCard extends HTMLElement {
  hass?: HomeAssistant;
  isPanel?: boolean;
  editMode?: boolean;
  getCardSize(): number | Promise<number>;
  setConfig(config: LovelaceCardConfig): void;
}

export interface LovelaceCardEditor extends HTMLElement {
  hass?: HomeAssistant;
  setConfig(config: LovelaceCardConfig): void;
}

// An event for the frontend (hass-more-info, config-changed, haptic): it leaves the shadow roots
// (composed) and bubbles up to Home Assistant, which reads its detail.
export function fireEvent(node: HTMLElement | Window, type: string, detail?: unknown): Event {
  const event = new Event(type, { bubbles: true, composed: true }) as Event & { detail: unknown };
  event.detail = detail === null || detail === undefined ? {} : detail;
  node.dispatchEvent(event);
  return event;
}

// A vibration of the phone, in the companion app.
export type HapticType = 'success' | 'warning' | 'failure' | 'light' | 'medium' | 'heavy' | 'selection';
export function forwardHaptic(type: HapticType): void {
  fireEvent(window, 'haptic', type);
}
