// type3d: shower: drops of water falling under the objects of the entity while it is on.
import * as THREE from 'three';
import { EntityHandler, EntityHost, onNewState } from './entity-types';
import type { EntityConfig } from './types';

export class Showers {
  private _groups: THREE.Group[] = []; // the drops of each shower entity

  constructor(private host: EntityHost) {}

  public readonly handler: EntityHandler = {
    setup: (entity, i) => this._setup(entity, i),
    show: (entity, i) => this._update(entity, i),
    refresh: onNewState(this.host, (entity, i) => this._update(entity, i)),
  };

  // The states of the entities are read again: so are the showers, when the model is set up.
  public reset(): void {
    this._groups = [];
  }

  // A shower is on: the drops fall.
  public get running(): boolean {
    return this._groups.some((shower) => shower && shower.visible);
  }

  // shower: the drops of water under each object, hidden until the shower is on.
  private _setup(entity: EntityConfig, i: number): void {
    const group = new THREE.Group();
    group.name = entity.object_id + '_shower_group';
    this.host.model.add(group);
    this._groups[i] = group;
    group.visible = false;
    this.host.objectIds[i].objects.forEach((element) => {
      const _foundobject = this.host.scene.getObjectByName(element.object_id);
      if (_foundobject) {
        const count = entity.shower && entity.shower.count ? entity.shower.count : 200;
        const geometry = new THREE.BufferGeometry();
        const vertices = [];
        const width = entity.shower && entity.shower.width ? entity.shower.width : 20;
        for (let p = 0; p < count; p++) {
          vertices.push((Math.random() - 0.5) * width, Math.random() * 5, (Math.random() - 0.5) * width);
        }
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        const material = new THREE.PointsMaterial({
          color: entity.shower && entity.shower.color ? new THREE.Color(entity.shower.color) : 0xaaaaaa,
          size: entity.shower && entity.shower.size ? entity.shower.size : 1,
          transparent: true,
          opacity: 0.8,
        });
        const points = new THREE.Points(geometry, material);
        points.name = element.object_id + '_shower_points';
        const box = new THREE.Box3().setFromObject(_foundobject);
        const center = new THREE.Vector3();
        box.getCenter(center);
        points.position.copy(center);
        points.position.y = box.min.y;
        group.add(points);
      } else {
        console.warn('F3D: Shower target NOT matched:', element.object_id);
      }
    });
    this._update(entity, i);
  }

  private _update(_item: EntityConfig, index: number) {
    if (this._groups[index]) {
      const state = this.host.states[index] ? String(this.host.states[index]).toLowerCase() : '';
      if (['on', 'active', 'true', '1'].includes(state)) {
        this._groups[index].visible = true;
      } else {
        this._groups[index].visible = false;
      }
      this.host.animate();
    } else {
      console.warn('F3D: Shower object not found for index:', index);
    }
  }

  public animate(step?: number) {
    step = step > 0 ? Math.min(step, 4) : 1;
    if (this._groups) {
      this._groups.forEach((shower, index) => {
        if (shower && shower.visible) {
          shower.children.forEach((child) => {
            const points = child as THREE.Points;
            const positions = points.geometry.attributes.position.array as Float32Array;
            const velocity =
              this.host.config.entities[index].shower && this.host.config.entities[index].shower.velocity
                ? this.host.config.entities[index].shower.velocity
                : 5;
            const height =
              this.host.config.entities[index].shower && this.host.config.entities[index].shower.height
                ? this.host.config.entities[index].shower.height
                : 100;
            for (let i = 1; i < positions.length; i += 3) {
              positions[i] -= velocity * step;
              if (positions[i] < -height) {
                positions[i] = 0;
              }
            }
            points.geometry.attributes.position.needsUpdate = true;
          });
        }
      });
    }
  }
}
