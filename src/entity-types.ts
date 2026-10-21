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
  readonly levels: THREE.Object3D[]; // the objects of each level
  render(): void;
  // The lights take part in the shadow budget of the card (the texture units of the GPU).
  enableShadow(light: THREE.PointLight | THREE.SpotLight, bias: number): void;
  refreshLightShadow(light: THREE.Light): void; // its shadow map is redrawn if it is out of date
  manageLightShadows(light: THREE.Light): void; // extralightmode: only the lights that are on cast shadows
  invalidateShadows(): void; // something moved: the shadows are drawn again
  objectNamesFor(ids: string[]): string[]; // the objects of the model that ids name (names with *, <groups>)
}

// An object that turns or slides (rotate, door, cover) turns around pivot, a point of the scene: its
// geometry moves so that the pivot is its origin, and the object moves to the pivot, so that it stays
// where it is. In the frame
// of the object: a mesh of a GLB has a position (and a rotation) of its own, and the pivot is worked
// out on the object as it is in the scene; before, the object jumped away and turned around a corner.
// A copy of the geometry: identical objects may share it, and they moved with it. An object of
// several meshes (a group) moves its children. Once per object: a second entity on it turns it around
// the same pivot (before, it jumped again). Doors and covers since 2.12.0, rotate since 2.11.4.
export function pivotObject(object: THREE.Object3D, pivot: THREE.Vector3): void {
  if (object.userData.f3dPivoted) return;
  object.userData.f3dPivoted = true;
  object.updateWorldMatrix(true, false);
  const local = object.worldToLocal(pivot.clone());
  const mesh = object as THREE.Mesh;
  if (mesh.geometry) {
    mesh.geometry = mesh.geometry.clone();
    mesh.geometry.translate(-local.x, -local.y, -local.z);
  } else {
    object.children.forEach((child) => child.position.sub(local));
  }
  object.position.copy(local.applyMatrix4(object.matrix));
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
