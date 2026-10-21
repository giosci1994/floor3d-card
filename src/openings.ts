// type3d: door and cover. A door swings around its hinge or slides; a cover (a roller shade, a
// shutter, a blind) slides into its box, shrinks toward its side or only turns its slats, following
// the state, the position and the tilt of the entity.
import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';
import type { HassEntity } from 'home-assistant-js-websocket';
import { EntityHandler, EntityHost, onNewState, pivotObject } from './entity-types';
import { findSlats, slatAngle, Slat, tiltSlats } from './slats';
import type { EntityConfig } from './types';

// A mesh with slats (cover.slats): its own geometry, its slats, and its positions and normals as
// in the model.
interface SlatSet {
  geometry: THREE.BufferGeometry;
  slats: Slat[];
  positions: Float32Array;
  normals?: Float32Array;
}

// current_position of a cover, null when the cover doesn't report it.
export function coverPosition(stateObj: HassEntity): number | null {
  const position = stateObj.attributes['current_position'];
  if (position === undefined || position === null || position === '') return null;
  const n = Number(position);
  return isNaN(n) ? null : n;
}

// An opening is open (also while it opens): its door turns or slides, its tint is the open colour.
export function isOpen(state: string): boolean {
  return state == 'on' || state == 'open' || state == 'opening';
}

export class Openings {
  // Swing doors: the hinge, the axis and the angle they open by. Sliding doors and covers: where each
  // object is when closed. The position of each cover (null when it doesn't report one).
  private _pivot: THREE.Vector3[] = [];
  private _axis_for_door: THREE.Vector3[] = [];
  private _degrees: number[] = [];
  private _slidingdoorposition: THREE.Vector3[][] = [];
  private _position: number[] = [];
  // Covers: the size of each pane before it moves (motion: shrink), the meshes with slats
  // (cover.slats), the angle they show, their tilt and their running tween, by entity.
  private _paneSizes = new Map<number, THREE.Vector3>();
  private _slatSets = new Map<number, SlatSet[]>();
  private _slatAngles = new Map<number, number>();
  private _slatTweens = new Map<number, TWEEN.Tween<{ angle: number }>>();
  private _tilts = new Map<number, number | null>();
  // Clipping planes of the sliding covers: in the space of the model, and in the space of the scene
  // for the materials, placed again when the model moves.
  private _coverPlanes: { local: THREE.Plane; world: THREE.Plane }[] = [];

  constructor(private host: EntityHost) {}

  public readonly door: EntityHandler = {
    setup: (entity, i) => this._setupDoor(entity, i),
    show: (entity, i) => this._updatedoor(entity, i),
    refresh: onNewState(this.host, (entity, i) => this._updatedoor(entity, i)),
  };

  public readonly cover: EntityHandler = {
    setup: (entity, i) => this._setupCover(entity, i),
    refresh: (entity, i, state) => this._refreshCover(entity, i, state),
  };

  // The states are read again: the position each cover reports now.
  public prepare(): void {
    this._position = this.host.config.entities.map((entity) => {
      const stateObj = this.host.hass.states[entity.entity];
      return stateObj && entity.type3d == 'cover' ? coverPosition(stateObj) : null;
    });
  }

  // The model is set up again: nothing is left of the doors and covers of the previous one.
  public reset(): void {
    this._pivot = [];
    this._axis_for_door = [];
    this._degrees = [];
    this._slidingdoorposition = [];
    this.host.config.entities.forEach(() => {
      this._pivot.push(null);
      this._axis_for_door.push(null);
      this._degrees.push(0);
      this._slidingdoorposition.push([]);
    });
    this._coverPlanes = [];
    this._slatTweens.forEach((tween) => tween.stop());
    this._slatTweens.clear();
    this._slatSets.clear();
    this._slatAngles.clear();
    this._tilts.clear();
    this._paneSizes.clear();
  }

  // door: the hinge of a swing door, the axis and the angle it opens by; a sliding door slides from the
  // corner of its box.
  private _setupDoor(entity: EntityConfig, i: number): void {
    if (entity.door.doortype != 'swing' && entity.door.doortype != 'slide') {
      throw new Error('Invalid door type: ' + entity.door.doortype + '. Valid types are: swing, slide');
    }

    if (entity.door.doortype == 'swing') {
      let position = new THREE.Vector3();
      if (entity.door.hinge) {
        let hinge: THREE.Mesh = this.host.scene.getObjectByName(entity.door.hinge) as THREE.Mesh;
        hinge.geometry.computeBoundingBox();
        let boundingBox = hinge.geometry.boundingBox;
        position.subVectors(boundingBox.max, boundingBox.min);
        switch (Math.max(position.x, position.y, position.z)) {
          case position.x:
            this._axis_for_door[i] = new THREE.Vector3(1, 0, 0);
            break;
          case position.z:
            this._axis_for_door[i] = new THREE.Vector3(0, 0, 1);
            break;
          case position.y:
          default:
            this._axis_for_door[i] = new THREE.Vector3(0, 1, 0);
        }
        position.multiplyScalar(0.5);
        position.add(boundingBox.min);
        position.applyMatrix4(hinge.matrixWorld);
      } else {
        let pane: THREE.Mesh;

        if (entity.door.pane) {
          pane = this.host.scene.getObjectByName(entity.door.pane) as THREE.Mesh;
        } else {
          pane = this.host.scene.getObjectByName(this.host.objectIds[i].objects[0].object_id) as THREE.Mesh;
        }

        pane.geometry.computeBoundingBox();
        let boundingBox = pane.geometry.boundingBox;
        position.subVectors(boundingBox.max, boundingBox.min);
        const side = entity.door.swing_side || entity.door.side;

        if (side) {
          switch (side) {
            case 'up':
              position.x = position.x / 2;
              position.z = position.z / 2;
              position.y = position.y;
              if (position.x > position.z) {
                this._axis_for_door[i] = new THREE.Vector3(1, 0, 0);
              } else {
                this._axis_for_door[i] = new THREE.Vector3(0, 0, 1);
              }
              break;
            case 'down':
              position.x = position.x / 2;
              position.z = position.z / 2;
              position.y = 0;
              if (position.x > position.z) {
                this._axis_for_door[i] = new THREE.Vector3(1, 0, 0);
              } else {
                this._axis_for_door[i] = new THREE.Vector3(0, 0, 1);
              }
              break;
            case 'left':
              if (position.x > position.z) {
                position.x = 0;
                position.z = position.z / 2;
              } else {
                position.z = 0;
                position.x = position.x / 2;
              }
              this._axis_for_door[i] = new THREE.Vector3(0, 1, 0);
              position.y = 0;
              break;
            case 'right':
              if (position.x > position.z) {
                position.z = position.z / 2;
              } else {
                position.x = position.x / 2;
              }
              this._axis_for_door[i] = new THREE.Vector3(0, 1, 0);
              position.y = 0;
              break;
            default:
              throw new Error('Invalid side: ' + side + '. Valid sides are: up, down, left, right');
          }
        }
        position.add(boundingBox.min);
        position.applyMatrix4(pane.matrixWorld);
      }

      this._pivot[i] = position;
      if (typeof entity.door.swing_degrees !== 'undefined') {
        this._degrees[i] = entity.door.swing_degrees;
      } else if (typeof entity.door.degrees !== 'undefined') {
        this._degrees[i] = entity.door.degrees;
      } else {
        this._degrees[i] = 90;
      }

      // Around the hinge, in the frame of each object (see _pivotObject).
      this.host.objectIds[i].objects.forEach((element) => {
        const _obj = this.host.scene.getObjectByName(element.object_id);
        if (_obj) pivotObject(_obj, this._pivot[i]);
      });
    }
    if (entity.door.doortype == 'slide') {
      this.host.objectIds[i].objects.forEach((element) => {
        const _obj = this.host.scene.getObjectByName(element.object_id);
        if (!_obj) return;
        // From the corner of its box, where it is when closed (see _pivotObject).
        pivotObject(_obj, new THREE.Box3().setFromObject(_obj).min);
        this._slidingdoorposition[i].push(_obj.position.clone());
      });
    }
  }

  // cover: the panes slide or shrink from the corner of their box, cut by a plane at the edge they go to;
  // then the slats, and the position of the cover now.
  private _setupCover(entity: EntityConfig, i: number): void {
    // Without pane the first object is the pane, as in _updatecover. Before, such a cover
    // was not set up and its first update stopped every other update of the card.
    const pane: THREE.Mesh = (this.host.scene.getObjectByName(entity.cover.pane) ||
      this.host.scene.getObjectByName(this.host.objectIds[i].objects[0]?.object_id)) as THREE.Mesh;

    if (pane) {
      this.host.objectIds[i].objects.forEach((element) => {
        const _obj = this.host.scene.getObjectByName(element.object_id);
        if (!_obj) return;
        // From the corner of its box: a roller shade shortens toward it (see _pivotObject).
        pivotObject(_obj, new THREE.Box3().setFromObject(_obj).min);
        this._slidingdoorposition[i].push(_obj.position.clone());
      });

      const boxpane: THREE.Box3 = new THREE.Box3().setFromObject(pane);
      this._paneSizes.set(i, boxpane.getSize(new THREE.Vector3()));

      // motion: slide (the pane slides into its box, hidden past the edge of the side it
      // goes to), shrink (it gets shorter toward that side) or none (only the slats turn).
      if ((entity.cover.motion || 'slide') == 'slide') {
        // The plane is kept in the space of the model too: the model is centred after
        // this, and the plane moves with it (_placeCoverPlanes).
        const coverplane = this._coverPlane(boxpane, entity.cover.side);
        const clipPlanes = coverplane ? [coverplane] : [];
        if (coverplane) {
          this.host.model.updateMatrixWorld(true);
          const local = coverplane.clone().applyMatrix4(this.host.model.matrixWorld.clone().invert());
          this._coverPlanes.push({ local, world: coverplane });
        }
        // The materials of a cover are its own: a GLB model can share them with other
        // objects, which the plane would cut too. The shadows are cut the same way.
        this.host.objectIds[i].objects.forEach((element) => {
          const _obj = this.host.scene.getObjectByName(element.object_id) as THREE.Mesh;
          if (!_obj || !_obj.material) return;
          const own = (m: THREE.Material) => {
            const copy = m.clone();
            copy.clippingPlanes = clipPlanes;
            copy.clipShadows = this.host.config.shadow == 'yes';
            return copy;
          };
          _obj.material = Array.isArray(_obj.material) ? _obj.material.map(own) : own(_obj.material);
        });
      }

      this._initSlats(entity, i);
      this._updatecover(entity, this.host.states[i], i);
      this._updateSlats(entity, i, false);
    }
  }

  // A new state or position of a cover, a new tilt of its slats.
  private _refreshCover(entity: EntityConfig, i: number, state: string): boolean {
    let changed = false;
    // Both can change: the position while the cover moves, the state when it starts or stops.
    const position = coverPosition(this.host.hass.states[entity.entity]);
    if (state != this.host.states[i] || position !== this._position[i]) {
      this.host.states[i] = state;
      this._position[i] = position;
      this._updatecover(entity, state, i);
      changed = true;
    }
    if (this._slatSets.has(i) && this._coverTilt(this.host.hass.states[entity.entity]) !== this._tilts.get(i)) {
      this._updateSlats(entity, i);
      changed = true;
    }
    return changed;
  }

  private _updatedoor(entity: EntityConfig, i: number): void {
    // perform action on door objects

    const _obj: any = this.host.scene.getObjectByName(this.host.objectIds[i].objects[0].object_id);

    let door: THREE.Mesh;

    door = _obj;

    if (door) {
      if (entity.door.doortype) {
        if (entity.door.doortype != 'swing' && entity.door.doortype != 'slide') {
          throw new Error('Invalid door type: ' + entity.door.doortype + '. Valid types are: swing, slide');
        }

        if (entity.door.doortype == 'swing') {
          this._rotatedoorpivot(entity, i);
        }
        if (entity.door.doortype == 'slide') {
          let pane = this.host.scene.getObjectByName(entity.door.pane);
          if (!pane) {
            pane = this.host.scene.getObjectByName(this.host.objectIds[i].objects[0].object_id);
          }
          let percentage: number;
          if (typeof entity.door.slide_percentage !== 'undefined') {
            percentage = entity.door.slide_percentage;
          } else {
            percentage = entity.door.percentage;
          }
          this._translatedoor(
            pane,
            percentage != null ? percentage : 100,
            entity.door.slide_side || entity.door.side,
            i,
            this.host.states[i],
          );
        }
      }
    }
    // The door moves with a tween: the animation loop redraws the shadows while it moves.
  }

  private _rotatedoorpivot(entity: EntityConfig, index: number) {
    //For a swing door, rotate the objects along the configured axis and the degrees of opening
    this.host.objectIds[index].objects.forEach((element) => {
      let _obj: any = this.host.scene.getObjectByName(element.object_id);

      const targetRotation: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
      const direction = entity.door.swing_direction || entity.door.direction;

      if (this.host.states[index] == 'on') {
        if (direction == 'inner') {
          if (this._axis_for_door[index].y == 1) {
            targetRotation.y = (-Math.PI * this._degrees[index]) / 180;
          } else if (this._axis_for_door[index].x == 1) {
            targetRotation.x = (-Math.PI * this._degrees[index]) / 180;
          } else if (this._axis_for_door[index].z == 1) {
            targetRotation.z = (-Math.PI * this._degrees[index]) / 180;
          }
        } else if (direction == 'outer') {
          if (this._axis_for_door[index].y == 1) {
            targetRotation.y = (Math.PI * this._degrees[index]) / 180;
          } else if (this._axis_for_door[index].x == 1) {
            targetRotation.x = (Math.PI * this._degrees[index]) / 180;
          } else if (this._axis_for_door[index].z == 1) {
            targetRotation.z = (Math.PI * this._degrees[index]) / 180;
          }
        } else {
          throw new Error('Invalid swing direction: ' + direction + '. Valid directions are: inner, outer');
        }
      }

      if (targetRotation.equals(_obj.rotation)) return;

      new TWEEN.Tween(_obj.rotation)
        .to(targetRotation, 1200)
        .easing(TWEEN.Easing.Cubic.InOut)
        .onComplete(() => {
          // Stop animation loop if all tweens finished
          this.host.animate();
        })
        .start();
      this.host.animate();
    });
  }

  private _translatedoor(pane: THREE.Object3D, percentage: number, side: string, index: number, doorstate: string) {
    //For a slide door, translate the objects according to the configured directions and percentage of opening

    let translate: THREE.Vector3 = new THREE.Vector3(0, 0, 0);

    let size: THREE.Vector3 = new THREE.Vector3();

    let bbox = new THREE.Box3().setFromObject(pane);

    size.subVectors(bbox.max, bbox.min);

    if (doorstate == 'on' || doorstate == 'open') {
      if (side == 'left') {
        if (size.x > size.z) {
          translate.z += 0;
          translate.x += (-size.x * percentage) / 100;
          translate.y = 0;
        } else {
          translate.z += (-size.z * percentage) / 100;
          translate.x += 0;
          translate.y += 0;
        }
      } else if (side == 'right') {
        if (size.x > size.z) {
          translate.z += 0;
          translate.x += (+size.x * percentage) / 100;
          translate.y += 0;
        } else {
          translate.z += (+size.z * percentage) / 100;
          translate.x += 0;
          translate.y += 0;
        }
      } else if (side == 'down') {
        translate.y += (-size.y * percentage) / 100;
        translate.x += 0;
        translate.z += 0;
      } else if (side == 'up') {
        translate.y += (+size.y * percentage) / 100;
        translate.x += 0;
        translate.z += 0;
      } else {
        throw new Error('Invalid side: ' + side + '. Valid sides are: up, down, left, right');
      }
    }

    this.host.objectIds[index].objects.forEach((element, i) => {
      let _obj: any = this.host.scene.getObjectByName(element.object_id);
      const originalPosition = this._slidingdoorposition[index][i];
      if (!_obj || !originalPosition) return; // an object missing from the model

      let targetPosition: THREE.Vector3 = new THREE.Vector3(
        originalPosition.x + translate.x,
        originalPosition.y + translate.y,
        originalPosition.z + translate.z,
      );

      if (targetPosition.equals(_obj.position)) return;

      new TWEEN.Tween(_obj.position)
        .to(targetPosition, 1200)
        .easing(TWEEN.Easing.Cubic.InOut)
        .onComplete(() => {
          // Stop animation loop if all tweens finished
          this.host.animate();
        })
        .start();
    });

    this.host.animate();
  }

  private _updatecover(item: EntityConfig, state: string, i: number): void {
    let pane = this.host.scene.getObjectByName(item.cover.pane);

    if (!pane) {
      pane = this.host.scene.getObjectByName(this.host.objectIds[i].objects[0].object_id);
    }
    // A cover that reports current_position is drawn there, also while it is opening or closing
    // (0 is closed); the others are fully open or fully closed.
    const percentage = this._position[i] != null ? this._position[i] : isOpen(state) ? 100 : 0;
    const motion = item.cover.motion || 'slide';
    if (motion == 'none') return;
    if (motion == 'shrink') this._shrinkcover(pane, percentage, item.cover.side, i);
    else this._translatedoor(pane, percentage, item.cover.side, i, percentage > 0 ? 'open' : 'closed');
    // Shadows follow the tween in the animation loop.
  }

  // motion: shrink. The pane gets shorter toward its side (a roller shade toward its roller, a
  // curtain toward its side), without sliding: no plane cuts it. The other objects of the cover
  // (a bottom bar, for example) follow its edge.
  private _shrinkcover(pane: THREE.Object3D, percentage: number, side: string, index: number): void {
    const size = this._paneSizes.get(index);
    const objects = this.host.objectIds[index].objects;
    const paneIndex = objects.findIndex((o) => o.object_id === pane.name);
    if (!size || paneIndex < 0) {
      this._translatedoor(pane, percentage, side, index, percentage > 0 ? 'open' : 'closed');
      return;
    }
    const share = Math.min(100, Math.max(0, percentage)) / 100;
    const scale = Math.max(1 - share, 0.001);
    const axis: 'x' | 'y' | 'z' = side == 'up' || side == 'down' ? 'y' : size.x > size.z ? 'x' : 'z';
    const sign = side == 'up' || side == 'right' ? 1 : -1;
    const shift = sign * size[axis] * share; // where the free edge goes
    objects.forEach((element, k) => {
      const object = this.host.scene.getObjectByName(element.object_id);
      const original = this._slidingdoorposition[index][k];
      if (!object || !original) return;
      const position = original.clone();
      if (k === paneIndex) {
        // Scaled from the edge on its side: the far one for up and right, its origin otherwise.
        if (sign > 0) position[axis] += size[axis] * (1 - scale);
        const targetScale = { x: 1, y: 1, z: 1 };
        targetScale[axis] = scale;
        new TWEEN.Tween(object.scale)
          .to(targetScale, 1200)
          .easing(TWEEN.Easing.Cubic.InOut)
          .onComplete(() => this.host.animate())
          .start();
      } else position[axis] += shift;
      if (position.equals(object.position)) return;
      new TWEEN.Tween(object.position)
        .to({ x: position.x, y: position.y, z: position.z }, 1200)
        .easing(TWEEN.Easing.Cubic.InOut)
        .onComplete(() => this.host.animate())
        .start();
    });
    this.host.animate();
  }

  // The model moved (it is centred once loaded): the planes of the sliding covers go with it.
  // Before, they stayed where the model was before, which cut the covers in the wrong place.
  public placeCoverPlanes(): void {
    if (!this.host.model || !this._coverPlanes.length) return;
    this.host.model.updateMatrixWorld(true);
    this._coverPlanes.forEach(({ local, world }) => world.copy(local).applyMatrix4(this.host.model.matrixWorld));
  }

  // The plane that hides a sliding cover past the edge of its side: what is beyond is cut.
  private _coverPlane(box: THREE.Box3, side: string): THREE.Plane | null {
    const alongX = box.max.x - box.min.x > box.max.z - box.min.z;
    switch (side) {
      case 'up':
        return new THREE.Plane(new THREE.Vector3(0, -1, 0), box.max.y);
      case 'down':
        return new THREE.Plane(new THREE.Vector3(0, 1, 0), -box.min.y);
      case 'left':
        return alongX
          ? new THREE.Plane(new THREE.Vector3(1, 0, 0), -box.min.x)
          : new THREE.Plane(new THREE.Vector3(0, 0, 1), -box.min.z);
      case 'right':
        return alongX
          ? new THREE.Plane(new THREE.Vector3(-1, 0, 0), box.max.x)
          : new THREE.Plane(new THREE.Vector3(0, 0, -1), box.max.z);
    }
    return null;
  }

  // cover.slats: the slats of the objects named there (a blind exported as one object included,
  // see slats.ts), each mesh with a geometry of its own and its first positions.
  private _initSlats(item: EntityConfig, i: number): void {
    const ids = item.cover && item.cover.slats;
    if (!ids) return;
    const sets: SlatSet[] = [];
    this.host.objectNamesFor(Array.isArray(ids) ? ids : [ids]).forEach((name) => {
      const object = this.host.scene.getObjectByName(name);
      if (!object) return;
      object.traverse((child) => {
        const mesh = child as THREE.Mesh;
        if (!mesh.isMesh) return;
        const source = mesh.geometry as THREE.BufferGeometry;
        const position = source.getAttribute('position');
        if (!position || position.count > 500000) return;
        // Plain float copies (a GLB can interleave or quantize them, and share them with other objects).
        const plain = (attribute: THREE.BufferAttribute | THREE.InterleavedBufferAttribute): Float32Array => {
          const array = new Float32Array(attribute.count * 3);
          for (let v = 0; v < attribute.count; v++) {
            array[3 * v] = attribute.getX(v);
            array[3 * v + 1] = attribute.getY(v);
            array[3 * v + 2] = attribute.getZ(v);
          }
          return array;
        };
        const positions = plain(position);
        const slats = findSlats(positions, source.index ? source.index.array : null);
        if (!slats.length) return;
        const geometry = source.clone();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions.slice(), 3));
        const normal = source.getAttribute('normal');
        const normals = normal ? plain(normal) : undefined;
        if (normals) geometry.setAttribute('normal', new THREE.BufferAttribute(normals.slice(), 3));
        mesh.geometry = geometry;
        sets.push({ geometry, slats, positions, normals });
      });
    });
    if (sets.length) this._slatSets.set(i, sets);
    else
      console.warn(
        'floor3d-card: no slats found in <' + ids + '> (' + item.entity + '): each slat must be a separate piece',
      );
  }

  // The slats turn with current_tilt_position: tilt_closed degrees at 0, tilt_open at 100 (from
  // the model, 80 and 0 by default). Without the attribute they stay as in the model.
  private _updateSlats(item: EntityConfig, i: number, animate = true): void {
    const sets = this._slatSets.get(i);
    const stateObj = this.host.hass && this.host.hass.states[item.entity];
    if (!sets || !stateObj) return;
    const tilt = this._coverTilt(stateObj);
    this._tilts.set(i, tilt);
    if (tilt === null) return;
    const target = slatAngle(tilt, this.host.num(item.cover.tilt_closed, 80), this.host.num(item.cover.tilt_open, 0));
    const from = this._slatAngles.get(i) || 0;
    const running = this._slatTweens.get(i);
    if (running) running.stop();
    this._slatTweens.delete(i);
    if (target === from) return;
    const apply = (degrees: number) => {
      this._slatAngles.set(i, degrees);
      const angle = THREE.MathUtils.degToRad(degrees);
      sets.forEach(({ geometry, slats, positions, normals }) => {
        const position = geometry.getAttribute('position') as THREE.BufferAttribute;
        tiltSlats(slats, angle, positions, position.array as Float32Array);
        position.needsUpdate = true;
        const normal = geometry.getAttribute('normal') as THREE.BufferAttribute;
        if (normals && normal) {
          tiltSlats(slats, angle, normals, normal.array as Float32Array, true);
          normal.needsUpdate = true;
        }
        geometry.computeBoundingSphere();
        geometry.boundingBox = null;
      });
    };
    if (!animate) {
      apply(target);
      this.host.invalidateShadows();
      return;
    }
    const value = { angle: from };
    const tween = new TWEEN.Tween(value)
      .to({ angle: target }, 1200)
      .easing(TWEEN.Easing.Cubic.InOut)
      .onUpdate(() => apply(value.angle))
      .onComplete(() => {
        this._slatTweens.delete(i);
        this.host.animate();
      })
      .start();
    this._slatTweens.set(i, tween);
    this.host.animate();
  }

  // current_tilt_position of a cover, null when the cover doesn't report it.
  private _coverTilt(stateObj: HassEntity): number | null {
    const tilt = stateObj.attributes['current_tilt_position'];
    if (tilt === undefined || tilt === null || tilt === '') return null;
    const n = Number(tilt);
    return isNaN(n) ? null : n;
  }
}
