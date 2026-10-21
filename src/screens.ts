// type3d: image: the picture of an entity (a TV, a camera) on a screen of the model, that glows with
// image.lumens, and a light in front of it in the colour of the picture (lighting_lumens).
import * as THREE from 'three';
import { EntityHandler, EntityHost } from './entity-types';
import { Lamps } from './lamps';
import type { Floor3dCardConfig } from './types';

const SCREEN_EMISSIVE_SCALE = 0.25; // TV screen glow: image.lumens x this

export class Screens {
  // The picture being loaded for each entity (a newer one, or the TV switched off, drops it), the
  // entities whose picture failed to load (logged once), and the picture and state on show.
  private _requests: object[] = [];
  private _errors = new Set<string>();
  private _keys: string[] = [];

  constructor(
    private host: EntityHost,
    private lamps: Lamps,
  ) {}

  public readonly handler: EntityHandler = {
    setup: (entity, i) => this._setup(entity, i),
    refresh: (entity, i) => this._refresh(entity, i),
  };

  // The states are read again: every screen shows its picture again.
  public reset(): void {
    this._keys = [];
  }

  // image: a light in front of the screen, tinted by the picture (lighting_lumens).
  private _setup(entity: Floor3dCardConfig, i: number): void {
    this.host.objectIds[i].objects.forEach((element) => {
      if (entity.image && entity.image.lighting_lumens && Number(entity.image.lighting_lumens) > 0) {
        const _foundobject: any = this.host.scene.getObjectByName(element.object_id);
        if (_foundobject) {
          // One point light in front of the screen, tinted with the picture. The first
          // version also added a spot light with the same name: only this light was
          // ever found by name, so the spot stayed at 0 while still drawing shadows.
          const screenBox = new THREE.Box3();
          screenBox.setFromObject(_foundobject);
          const center = new THREE.Vector3();
          screenBox.getCenter(center);
          const local = _foundobject.worldToLocal(center.clone());
          const lightingDirection = entity.image.lighting_direction || 'positive_z';
          const offset = 20;
          let lx = local.x;
          let ly = local.y;
          let lz = local.z;
          switch (lightingDirection) {
            case 'positive_z':
              lz += offset;
              break;
            case 'negative_z':
              lz -= offset;
              break;
            case 'positive_x':
              lx += offset;
              break;
            case 'negative_x':
              lx -= offset;
              break;
            case 'positive_y':
              ly += offset;
              break;
            case 'negative_y':
              ly -= offset;
              break;
          }
          const ambient = new THREE.PointLight(
            new THREE.Color('#ffffff'),
            0,
            this.host.num(entity.image.lighting_distance, 800),
            2,
          );
          ambient.name = element.object_id + '_light';
          ambient.userData.entityIndex = i;
          if (entity.image.lighting_shadow == 'no') {
            ambient.castShadow = false;
          } else {
            this.host.enableShadow(ambient, -0.0001);
          }
          _foundobject.add(ambient);
          ambient.position.set(lx, ly, lz);
        }
      }
    });
  }

  // A new picture, or the screen switched on or off.
  private _refresh(entity: Floor3dCardConfig, i: number): boolean {
    const stateObj = this.host.hass.states[entity.entity];
    const key = stateObj.attributes['entity_picture'] + '|' + stateObj.state;
    if (key === this._keys[i]) return false;
    this._keys[i] = key;
    this._update(entity, i);
    return true;
  }

  private _update(item: Floor3dCardConfig, index: number): void {
    let _foundobject: any;
    if (this.host.objectIds[index].objects.length > 0) {
      _foundobject = this.host.scene.getObjectByName(this.host.objectIds[index].objects[0].object_id);
    }
    if (_foundobject) {
      const picture = this.host.hass.states[item.entity].attributes['entity_picture'];
      if (picture && !['off', 'standby', 'unavailable', 'unknown'].includes(this.host.hass.states[item.entity].state)) {
        // The picture goes on the screen once it has loaded, and the card redraws then. Before, the
        // empty texture went on at once: the screen, transparent, disappeared, and nothing redrew
        // it when the picture arrived (a screen capture of Android TV changes every few seconds).
        const request = {};
        this._requests[index] = request;
        const texture = new THREE.TextureLoader().load(
          picture,
          (loaded) => {
            // A newer picture was asked for meanwhile, or the TV was switched off.
            if (this._requests[index] !== request) {
              loaded.dispose();
              return;
            }
            this._showPicture(item, index, _foundobject, loaded);
            this.host.scheduleRender();
          },
          undefined,
          () => {
            if (this._errors.has(item.entity)) return;
            this._errors.add(item.entity);
            console.warn('floor3d-card: the picture of ' + item.entity + ' did not load: ' + picture);
          },
        );
        texture.flipY = false;
        texture.colorSpace = THREE.SRGBColorSpace;
        if ((item.image && item.image.rotate) || (item.image && item.image.mirror)) {
          texture.center.set(0.5, 0.5);
        }
        if (item.image && item.image.rotate) {
          texture.rotation = (item.image.rotate * Math.PI) / 180;
        }
        if (item.image && item.image.mirror) {
          texture.wrapS = THREE.RepeatWrapping;
          texture.repeat.x = -1;
        }
      } else {
        this._requests[index] = null;
        const state = this.host.hass.states[item.entity].state;
        const offState = item.image && item.image.lighting_off_state ? item.image.lighting_off_state : 'unavailable';
        const light: any = this.host.scene.getObjectByName(this.host.objectIds[index].objects[0].object_id + '_light');
        if (state === offState || ['off', 'standby', 'unavailable', 'unknown'].includes(state)) {
          if (light) {
            light.intensity = 0;
          }
          if (_foundobject instanceof THREE.Mesh) {
            const material: any = _foundobject.material;
            if (material && material.name && material.name.startsWith('f3dmat')) {
              if (material.map) material.map.dispose();
              material.map = null;
              material.color.setHex(0x000000);
              if (material.emissive) material.emissive.setHex(0x000000);
              material.needsUpdate = true;
            }
          }
          this.host.render();
        } else if (light && item.image && item.image.lighting_lumens) {
          light.intensity = this.lamps.intensity(item.image.lighting_lumens);
          this.host.refreshLightShadow(light);
        }
      }
    }
  }

  // A picture of a TV screen, once loaded: it replaces the previous one (or the material of the
  // model, the first time), glows with image.lumens and tints the light of the room with its
  // average colour (image.lighting_lumens).
  private _showPicture(
    item: Floor3dCardConfig,
    index: number,
    object: any,
    texture: THREE.Texture<HTMLImageElement>,
  ): void {
    if (!(object instanceof THREE.Mesh)) {
      texture.dispose();
      return;
    }
    const lumens = item.image && Number(item.image.lumens) > 0;
    let material: any = object.material;
    if (material.name.startsWith('f3dmat')) {
      if (material.map && material.map !== texture) material.map.dispose();
    } else {
      // The screen gets a material of its own whose only texture is the picture. Every texture of a
      // material takes one of the texture units the shadows leave (see _shadowBudget): with the
      // picture, its glow and the textures of the model, the shader of the screen went past the
      // limit of the GPU and the screen vanished. A screen that glows (image.lumens) is drawn
      // without lights and shadows, as the light it gives off would be; otherwise the room lights
      // the picture like a printed one.
      if (lumens) {
        material = new THREE.MeshBasicMaterial({ side: material.side });
      } else {
        material = material.clone();
        Object.keys(material).forEach((key) => {
          if (key !== 'map' && material[key] && material[key].isTexture) material[key] = null;
        });
        if (material.emissive) material.emissive.setHex(0x000000);
      }
      material.name = 'f3dmat' + object.name;
      material.transparent = true;
      object.material = material;
    }
    material.map = texture;
    // The colour multiplies the picture: its glow with image.lumens, white without (before, a dark
    // screen of the model showed nothing, and a screen switched off and on again stayed black).
    material.color.setScalar(lumens ? Number(item.image.lumens) * SCREEN_EMISSIVE_SCALE : 1);
    material.needsUpdate = true;
    const light: any = this.host.scene.getObjectByName(this.host.objectIds[index].objects[0].object_id + '_light');
    if (light && lumens && item.image.lighting_lumens) {
      light.intensity = this.lamps.intensity(item.image.lighting_lumens);
      // From the picture already loaded: before, it was downloaded a second time, and the light
      // could get the colour of the previous picture.
      light.color.copy(this._averageColor(texture.image));
      this.host.refreshLightShadow(light);
    } else if (light) {
      light.intensity = 0;
    }
  }

  // Average colour of a picture, white when it can't be read (a picture from another site without
  // CORS headers).
  private _averageColor(image: CanvasImageSource): THREE.Color {
    const color = new THREE.Color(1, 1, 1);
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 16;
      canvas.height = 16;
      const ctx = canvas.getContext('2d');
      if (!ctx) return color;
      ctx.drawImage(image, 0, 0, 16, 16);
      const data = ctx.getImageData(0, 0, 16, 16).data;
      let r = 0;
      let g = 0;
      let b = 0;
      const count = data.length / 4;
      for (let i = 0; i < data.length; i += 4) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
      }
      // Picture bytes are sRGB: converted to the linear working space.
      color.setRGB(r / count / 255, g / count / 255, b / count / 255, THREE.SRGBColorSpace);
    } catch (e) {
      console.warn('floor3d-card: the colour of the picture could not be read (CORS?): white light');
    }
    return color;
  }
}
