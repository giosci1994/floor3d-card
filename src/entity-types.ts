// The entity types of the card (type3d). What each type does is an EntityHandler: when the model is
// loaded, once all the entities are set up, and when Home Assistant sends new states; the card lists
// them in _entityTypes. The modules of the types (trackers.ts, showers.ts...) reach the card only
// through EntityHost.
import * as THREE from 'three';
import { HomeAssistant } from './ha';
import type { Floor3dCardConfig } from './types';

export interface EntityHandler {
  // The model is loaded: the objects of the entity are set up (an entity whose state is missing is not).
  setup?(entity: Floor3dCardConfig, i: number): void;
  // Every entity is set up: its objects show its state.
  show?(entity: Floor3dCardConfig, i: number): void;
  // Home Assistant sent new states (state: with entity_template): true when the card must render again.
  refresh?(entity: Floor3dCardConfig, i: number, state: string): boolean;
}

// What the entity types read of the card. Entities are known by their position in the configuration.
export interface EntityHost {
  readonly config: Floor3dCardConfig;
  readonly hass: HomeAssistant;
  readonly scene: THREE.Scene;
  readonly model: THREE.Object3D; // the box of the model, centred
  readonly objectIds: Floor3dCardConfig[]; // the objects of each entity
  readonly states: string[]; // the state of each entity, with entity_template
  num(value: unknown, fallback: number): number;
  scheduleRender(): void;
  animate(): void; // the animation loop starts, or stops once nothing moves
}

// The refresh of a type whose objects follow only the state: apply when the state changes.
export function onNewState(
  host: EntityHost,
  apply: (entity: Floor3dCardConfig, i: number) => boolean | void,
): EntityHandler['refresh'] {
  return (entity, i, state) => {
    if (host.states[i] === state) return false;
    host.states[i] = state;
    return apply(entity, i) !== false;
  };
}
