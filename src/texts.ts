// type3d: text, info and room: what the card writes in the model. A text is written on a copy of its
// object (a screen, a picture frame), an info box floats over its object or at a point of its own,
// and a room (the type of the first floor3d-card) is a translucent box over a floor with its label.
// The text is the state (with entity_template), an attribute or a text of the configuration.
import * as THREE from 'three';
import { EntityHandler, EntityHost, onNewState } from './entity-types';
import { point } from './cameras';
import { fitText, textLayout } from './textmap';
import type { EntityConfig } from './types';

// The pictures of several texts in one, one under the other, each in the middle of the line.
function stackCanvases(canvases: HTMLCanvasElement[], background?: string): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, ...canvases.map((c) => c.width));
  canvas.height = Math.max(
    1,
    canvases.reduce((h, c) => h + c.height, 0),
  );
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = background || 'transparent';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  let y = 0;
  canvases.forEach((c) => {
    if (c.width > 0 && c.height > 0) ctx.drawImage(c, (canvas.width - c.width) / 2, y);
    y += c.height;
  });
  return canvas;
}

// The look of a text on its canvas: the text, info or room block of the entity.
interface TextStyle {
  font?: string;
  span?: string; // the share of the canvas the text takes, in %
  textbgcolor?: string;
  textfgcolor?: string;
}

export class Texts {
  // By entity, in the order of the configuration: the canvas of its text, its unit, the text of a text
  // entity, the label of a room, the names of the box and sprite of a room (or of the sprite of an info
  // box), and the text of an info box.
  private _canvas: HTMLCanvasElement[] = [];
  private _unit_of_measurement: string[] = [];
  private _text: string[] = [];
  private _spritetext: string[] = [];
  private _rooms: string[] = [];
  private _sprites: string[] = [];
  private _info: string[] = [];

  constructor(private host: EntityHost) {}

  public readonly text: EntityHandler = {
    setup: (_, i) => this._setupText(i),
    show: (entity, i) => {
      this._canvas[i] = this._createTextCanvas(entity.text, this._text[i], this._unit_of_measurement[i]);
      this._updatetext(entity, this._text[i], this._canvas[i], this._unit_of_measurement[i]);
    },
    refresh: (entity, i) => this._refreshText(entity, i),
  };

  public readonly room: EntityHandler = {
    show: (entity, i) => {
      this._createroom(entity, i);
      this._updateroom(entity, this._spritetext[i], this._unit_of_measurement[i], i);
    },
    refresh: onNewState(this.host, (entity, i) => this._refreshRoom(entity, i)),
  };

  public readonly info: EntityHandler = {
    setup: (entity, i) => this._setupInfo(entity, i),
    show: (entity, i) => this._updateinfo(entity, this._info[i], this._unit_of_measurement[i], i),
    refresh: (entity, i, state) => this._refreshInfo(entity, i, state),
  };

  // The states are read again: the texts, labels and units as they are now. An entity that is
  // missing has none yet; every array is read by the position of the entity in the config.
  public prepare(): void {
    this._canvas = [];
    this._unit_of_measurement = [];
    this._text = [];
    this._spritetext = [];
    this._rooms = [];
    this._sprites = [];
    this._info = [];
    this.host.config.entities.forEach((entity, i) => {
      this._canvas[i] = null;
      this._unit_of_measurement[i] = '';
      this._text[i] = '';
      this._spritetext[i] = '';
      this._rooms[i] = '';
      this._sprites[i] = '';
      this._info[i] = '';
      const stateObj = this.host.hass.states[entity.entity];
      if (!stateObj) return;
      const attributes = stateObj.attributes;
      if (attributes['unit_of_measurement']) this._unit_of_measurement[i] = attributes['unit_of_measurement'];
      if (entity.type3d == 'text') {
        // An attribute of the entity, else its state.
        const own = entity.text.attribute && attributes[entity.text.attribute];
        this._text[i] = own ? own : this.host.stateWithTemplate(entity);
      } else if (entity.type3d == 'room') {
        this._rooms[i] = entity.object_id + '_room';
        this._sprites[i] = entity.object_id + '_sprites';
        if (entity.room.attribute) {
          const own = attributes[entity.room.attribute];
          this._spritetext[i] = own ? own : this.host.stateWithTemplate(entity);
        } else if (entity.room.label_text == 'template') {
          // The template writes the unit, if it wants one.
          this._spritetext[i] = this.host.stateWithTemplate(entity);
          this._unit_of_measurement[i] = '';
        } else if (entity.room.label_text) {
          this._spritetext[i] = stateObj.state;
        }
      } else if (entity.type3d == 'info') {
        this._info[i] = this._infoText(entity);
        // A text of its own (info.text) has its unit in it, if it wants one.
        if (entity.info && entity.info.text) this._unit_of_measurement[i] = '';
      }
    });
  }

  // The info boxes hide with the level of their object.
  public showLevels(): void {
    (this._sprites || []).forEach((name, i) => {
      const sprite =
        name && this.host.config.entities[i] && this.host.config.entities[i].type3d == 'info'
          ? this.host.object(name)
          : undefined;
      if (sprite) sprite.visible = this.host.levelShown(sprite.userData.level);
    });
  }

  // text: a copy of each object, to write on.
  private _setupText(i: number): void {
    // Clone object to print the text
    this.host.objectIds[i].objects.forEach((element) => {
      let _foundobject: any = this.host.scene.getObjectByName(element.object_id);

      let box: THREE.Box3 = new THREE.Box3();
      box.setFromObject(_foundobject);

      let _newobject = _foundobject.clone();

      //(_newobject as Mesh).scale.set(1.005, 1.005, 1.005);
      _newobject.name = 'f3dobj_' + _foundobject.name;
      this.host.levels[_foundobject.userData.level].add(_newobject);
    });
  }

  // A new text, from the state (with entity_template) or from an attribute.
  private _refreshText(entity: EntityConfig, i: number): boolean {
    let toupdate = false;
    if (entity.text.attribute) {
      if (this.host.hass.states[entity.entity].attributes[entity.text.attribute]) {
        if (this._text[i] != this.host.hass.states[entity.entity].attributes[entity.text.attribute]) {
          this._text[i] = this.host.hass.states[entity.entity].attributes[entity.text.attribute];
          toupdate = true;
        }
      } else if (this._text[i] !== '') {
        // Only once: Home Assistant calls this at every change of any entity.
        this._text[i] = '';
        toupdate = true;
      }
    } else {
      if (this._text[i] != this.host.stateWithTemplate(entity)) {
        this._text[i] = this.host.stateWithTemplate(entity);
        toupdate = true;
      }
    }
    if (!this._canvas[i] || !toupdate) return false;
    this._updatetext(entity, this._text[i], this._canvas[i], this._unit_of_measurement[i]);
    return true;
  }

  // info: the sprite with the text of the box, over its object or at its own position.
  private _setupInfo(entity: EntityConfig, i: number): void {
    const sprite = new THREE.Sprite();
    sprite.name = entity.object_id + '_info';
    this._sprites[i] = sprite.name;
    // The font and the colours are in the info block, as in _updateinfo.
    const info = entity.info || {};
    this._canvas[i] = this._createTextCanvas(info, this._info[i], this._unit_of_measurement[i]);
    const size = info.size ? info.size : 100;
    const aspect = this._canvas[i].width / this._canvas[i].height;
    sprite.scale.set(size * aspect, size, 1);
    // The box hides with the level of its object, also when it has a position of its own.
    const object = entity.object_id ? this.host.scene.getObjectByName(entity.object_id) : undefined;
    if (object && object.userData.level !== undefined) sprite.userData.level = object.userData.level;
    const position = point(info.position);
    if (position) {
      // A point of the scene, as the camera_position.
      sprite.position.set(...position);
    } else if (object) {
      // Over its object once the model is centred (_placeInfoSprites): the model isn't yet.
      sprite.userData.above = object.name;
    }
    this.host.scene.add(sprite);
  }

  // A new text or unit of an info box.
  private _refreshInfo(entity: EntityConfig, i: number, state: string): boolean {
    // The box follows the state (before 2.11.4 it kept the one of the opening of the card).
    this.host.states[i] = state;
    const text = this._infoText(entity);
    const own = entity.info && entity.info.text;
    const uom = own ? '' : String(this.host.hass.states[entity.entity].attributes['unit_of_measurement'] || '');
    if (text === this._info[i] && uom === this._unit_of_measurement[i]) return false;
    this._info[i] = text;
    this._unit_of_measurement[i] = uom;
    this._updateinfo(entity, text, uom, i);
    return true;
  }

  // A new label of a room (type3d: room), from the state or an attribute.
  private _refreshRoom(entity: EntityConfig, i: number): boolean {
    let toupdate = false;
    if (entity.room.attribute) {
      if (this.host.hass.states[entity.entity].attributes[entity.room.attribute]) {
        if (this._spritetext[i] != this.host.hass.states[entity.entity].attributes[entity.room.attribute]) {
          this._spritetext[i] = this.host.hass.states[entity.entity].attributes[entity.room.attribute];
          toupdate = true;
        }
      } else {
        this._spritetext[i] = '';
        toupdate = true;
      }
    } else {
      if (entity.room.label_text) {
        if (entity.room.label_text == 'template') {
          if (this._spritetext[i] != this.host.stateWithTemplate(entity)) {
            this._spritetext[i] = this.host.stateWithTemplate(entity);
            toupdate = true;
          }
        } else {
          if (this._spritetext[i] != this.host.states[i]) {
            this._spritetext[i] = this.host.states[i];
            toupdate = true;
          }
        }
      }
    }

    if (!this._canvas[i] || !toupdate) return false;
    this._updateroom(entity, this._spritetext[i], this._unit_of_measurement[i], i);
    this._updateroomcolor(entity, i);
    return true;
  }

  private _createroom(entity: EntityConfig, i: number): void {
    // createroom

    const elevation: number = entity.room.elevation ? entity.room.elevation : 250;
    const transparency: number = entity.room.transparency ? entity.room.transparency : 50;
    const color: string = entity.room.color ? entity.room.color : '#ffffff';

    const _foundroom: THREE.Object3D = this.host.scene.getObjectByName(entity.object_id);

    if (_foundroom) {
      if (_foundroom.name.includes('room') && _foundroom instanceof THREE.Mesh) {
        const _roomMesh: THREE.Mesh = _foundroom as THREE.Mesh;

        if (_roomMesh.geometry instanceof THREE.BufferGeometry) {
          let oldRoomBox = new THREE.Box3().setFromObject(_roomMesh);
          this._centerobjecttopivot(_roomMesh, oldRoomBox.min);
          _roomMesh.geometry.applyMatrix4(
            new THREE.Matrix4().makeTranslation(-oldRoomBox.min.x, -oldRoomBox.min.y, -oldRoomBox.min.z),
          );

          let newRoomBox: THREE.Box3 = new THREE.Box3().setFromObject(_roomMesh);

          const expansion: THREE.Vector3 = new THREE.Vector3(0, elevation / 2, 0);
          newRoomBox.expandByVector(expansion);

          const dimensions = new THREE.Vector3().subVectors(newRoomBox.max, newRoomBox.min);
          const newRoomGeometry: THREE.BoxGeometry = new THREE.BoxGeometry(
            dimensions.x - 4,
            dimensions.y - 4,
            dimensions.z - 4,
          );

          const meshPosition = oldRoomBox.min.clone();
          // move new mesh center so it's aligned with the original object
          meshPosition.y += 2;
          meshPosition.x += 2;
          meshPosition.z += 2;

          const newRoomMaterial: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial({
            color: 0xff0000,
            opacity: 0,
            transparent: true,
          });

          newRoomMaterial.depthWrite = false;
          newRoomMaterial.color.set(new THREE.Color(color));
          newRoomMaterial.emissive.set(new THREE.Color(color));
          newRoomMaterial.opacity = (100 - transparency) / 100;

          newRoomMaterial.needsUpdate = true;

          const newRoomMesh: THREE.Mesh = new THREE.Mesh(newRoomGeometry, newRoomMaterial);

          newRoomMesh.name = this._rooms[i];

          const newSprite: THREE.Sprite = new THREE.Sprite();

          newSprite.name = this._sprites[i];

          this._canvas[i] = this._createTextCanvas(entity.room, this._spritetext[i], this._unit_of_measurement[i]);

          const sprite_width: number = entity.room.width ? entity.room.width : 150;
          const sprite_height: number = entity.room.height ? entity.room.height : 75;
          newSprite.scale.set(sprite_width, sprite_height, 5);

          const spritePosition = new THREE.Vector3(
            meshPosition.x + dimensions.x / 2,
            newRoomBox.max.y + elevation / 2 + sprite_height / 2,
            meshPosition.z + dimensions.z / 2,
          );
          newSprite.visible = false;

          if (entity.room.label) {
            if (entity.room.label == 'yes') {
              newSprite.visible = true;
            }
          }

          this.host.levels[_roomMesh.userData.level].add(newSprite);
          this.host.levels[_roomMesh.userData.level].add(newRoomMesh);

          newRoomBox = new THREE.Box3().setFromObject(newRoomMesh);
          this._centerobjecttopivot(newRoomMesh, newRoomBox.min);
          newRoomMesh.geometry.applyMatrix4(
            new THREE.Matrix4().makeTranslation(-newRoomBox.min.x, -newRoomBox.min.y, -newRoomBox.min.z),
          );

          newRoomMesh.position.set(meshPosition.x, meshPosition.y, meshPosition.z);
          newSprite.position.set(spritePosition.x, spritePosition.y, spritePosition.z);

          this._updateroomcolor(entity, i);
        }
      }
    }

    return;
  }

  private _updateroom(entity: EntityConfig, text: string, uom: string, i: number): void {
    //update sprite text and other change conditions

    const _roomMesh: THREE.Object3D = this.host.object(this._rooms[i]);
    const _roomSprite: THREE.Object3D = this.host.object(this._sprites[i]);
    const _roomCanvas: HTMLCanvasElement = this._canvas[i];

    if (_roomMesh && entity) {
      let roomsprite: THREE.Sprite = _roomSprite as THREE.Sprite;

      this._updateTextCanvas(entity.room, _roomCanvas, text + uom);

      this._applyTextCanvasSprite(_roomCanvas, roomsprite);
    }
  }

  private _updateinfo(item: EntityConfig, text: string, uom: string, index: number): void {
    const sprite: any = this.host.object(this._sprites[index]);
    const canvas = this._canvas[index];
    if (sprite && canvas) {
      const info = item.info || {};
      this._updateTextCanvas(info, canvas, text + uom);
      this._applyTextCanvasSprite(canvas, sprite);
      const size = item.info && item.info.size ? item.info.size : 100;
      const aspect = canvas.width / canvas.height;
      sprite.scale.set(size * aspect, size, 1);
      sprite.visible = this.host.levelShown(sprite.userData.level);
    }
  }

  private _updatetext(entity: EntityConfig, state: string, canvas: HTMLCanvasElement, uom: string): void {
    const _foundobject: any = this.host.object(entity.object_id);

    if (_foundobject) {
      this._updateTextCanvas(entity.text, canvas, state + uom);
      // Several text entities on one object: their texts one under the other, in the order of the
      // configuration, laid as the first of them says (before, only the last one updated showed).
      const same = this.host.config.entities
        .map((e, k) => (e.type3d == 'text' && e.object_id == entity.object_id && this._canvas[k] ? k : -1))
        .filter((k) => k >= 0);
      if (same.length > 1) {
        const first = this.host.config.entities[same[0]].text || {};
        this._applyTextCanvas(
          stackCanvases(
            same.map((k) => this._canvas[k]),
            first.textbgcolor,
          ),
          _foundobject,
          first,
        );
      } else {
        this._applyTextCanvas(canvas, _foundobject, entity.text);
      }
    }
  }

  private _createTextCanvas(style: TextStyle, text: string, uom: string): HTMLCanvasElement {
    const canvas = document.createElement('canvas');

    this._updateTextCanvas(style, canvas, text + uom);

    return canvas;
  }

  private _updateTextCanvas(style: TextStyle, canvas: HTMLCanvasElement, text: string): void {
    //Manages the update of the text entities according to their configuration and the new text of the entity state

    const ctx = canvas.getContext('2d');

    // Prepare the font to be able to measure
    let fontSize = 56;
    ctx.font = `${fontSize}px ${style.font ? style.font : 'monospace'}`;

    const textMetrics = ctx.measureText(text);

    let width = textMetrics.width;
    let height = fontSize;

    let perct = 1.0;
    if (style.span) {
      perct = parseFloat(style.span) / 100.0;
    }
    // Resize canvas to match text size

    width = width / perct;
    height = height / perct;
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    // Re-apply font since canvas is resized.
    ctx.font = `${fontSize}px ${style.font ? style.font : 'monospace'}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillStyle = style.textbgcolor ? style.textbgcolor : 'transparent';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.fillStyle = style.textfgcolor ? style.textfgcolor : 'white';

    ctx.fillText(text, width / 2, height / 2);
  }

  // The text on its object. mapping: flat (the default) lays it on the largest face of the object and
  // on the one opposite, readable from both sides, in the middle of the face with its proportions,
  // also on an object of several meshes; the rest of the object in the colour of the background (see
  // textmap.ts). mapping: model uses the mapping (UV) of the model, as before 2.11.3: often mirrored,
  // stretched, or nowhere.
  private _applyTextCanvas(canvas: HTMLCanvasElement, object: THREE.Object3D, style: any = {}) {
    if (style.mapping == 'model') {
      if (object instanceof THREE.Mesh) {
        const texture = new THREE.CanvasTexture(canvas);
        if (this.host.config.objfile.split('?')[0].split('.').pop() == 'glb') texture.flipY = false;
        this._setTextTexture(object, texture);
      }
      return;
    }
    const meshes: THREE.Mesh[] = [];
    object.traverse((o) => {
      if (o instanceof THREE.Mesh) meshes.push(o);
    });
    if (!meshes.length) return;
    if (object.userData.f3dTextAspect === undefined) {
      // Once: the mapping of the text, from the triangles of all its meshes in the scene.
      object.updateWorldMatrix(true, true);
      const v = new THREE.Vector3();
      const parts = meshes.map((mesh) => {
        const geometry = mesh.geometry.index ? mesh.geometry.toNonIndexed() : mesh.geometry.clone();
        const position = geometry.getAttribute('position');
        const world = new Float32Array(position.count * 3);
        for (let k = 0; k < position.count; k++) {
          v.fromBufferAttribute(position, k).applyMatrix4(mesh.matrixWorld);
          world.set([v.x, v.y, v.z], k * 3);
        }
        return { mesh, geometry, world };
      });
      const all = new Float32Array(parts.reduce((n, p) => n + p.world.length, 0));
      let at = 0;
      parts.forEach((p) => {
        all.set(p.world, at);
        at += p.world.length;
      });
      const layout = textLayout(all);
      object.userData.f3dTextAspect = layout ? layout.width / layout.height : null;
      if (layout) {
        at = 0;
        parts.forEach(({ mesh, geometry, world }) => {
          // A copy of the geometry: another object may share it.
          geometry.setAttribute(
            'uv',
            new THREE.BufferAttribute(layout.uv.slice((at / 3) * 2, ((at + world.length) / 3) * 2), 2),
          );
          at += world.length;
          mesh.geometry = geometry;
        });
      }
    }
    const aspect = object.userData.f3dTextAspect;
    const fit = fitText(canvas.width, canvas.height, aspect || canvas.width / Math.max(canvas.height, 1));
    const picture = document.createElement('canvas');
    picture.width = fit.width;
    picture.height = fit.height;
    const ctx = picture.getContext('2d');
    ctx.fillStyle = style.textbgcolor ? style.textbgcolor : 'transparent';
    ctx.fillRect(0, 0, fit.width, fit.height);
    if (canvas.width > 0 && canvas.height > 0)
      ctx.drawImage(canvas, fit.x, fit.y, canvas.width * fit.scale, canvas.height * fit.scale);
    const texture = new THREE.CanvasTexture(picture);
    meshes.forEach((mesh) => this._setTextTexture(mesh, texture));
  }

  // The picture of a text as the material of a mesh: a material of the card (f3dmat), made once.
  private _setTextTexture(mesh: THREE.Mesh, texture: THREE.Texture): void {
    texture.colorSpace = THREE.SRGBColorSpace; // canvas colours are sRGB
    const material = mesh.material as THREE.MeshBasicMaterial;
    if (!Array.isArray(material) && material.name.startsWith('f3dmat')) {
      // The texture of the previous text stays on the GPU until it is disposed: one per update.
      if (material.map && material.map !== texture) material.map.dispose();
      material.map = texture;
    } else {
      const own = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
      own.name = 'f3dmat' + mesh.name;
      mesh.material = own;
    }
  }

  private _applyTextCanvasSprite(canvas: HTMLCanvasElement, object: THREE.Sprite) {
    // put the canvas texture with the text on top of the Sprite object: consider merge with the applyTextCanvas

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace; // canvas colours are sRGB
    texture.repeat.set(1, 1);

    if (object.material.name.startsWith('f3dmat')) {
      const material = object.material as THREE.SpriteMaterial;
      if (material.map) material.map.dispose(); // see _applyTextCanvas
      material.map = texture;
    } else {
      const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
      });
      material.name = 'f3dmat' + object.name;

      object.material = material;
    }
  }

  // The boxes of the info type without a position of their own: over the middle of their object, now
  // that the model is centred (_setCamera), at size / 2 + 10 above its top.
  public placeInfoSprites(): void {
    this.host.model.updateMatrixWorld(true);
    (this._sprites || []).forEach((name, i) => {
      const sprite =
        name && this.host.config.entities[i] && this.host.config.entities[i].type3d == 'info'
          ? this.host.scene.getObjectByName(name)
          : undefined;
      const object =
        sprite && sprite.userData.above ? this.host.scene.getObjectByName(sprite.userData.above) : undefined;
      if (!object) return;
      const box = new THREE.Box3().setFromObject(object);
      if (box.isEmpty()) return;
      box.getCenter(sprite.position);
      sprite.position.y = box.max.y + sprite.scale.y / 2 + 10;
    });
  }

  private _updateroomcolor(item: any, index: number): void {
    // Change the color of the room when, for the bound entity, when the state matches the condition

    let _room: any = this.host.object(this._rooms[index]);

    const color: string = item.room.color ? item.room.color : '#ffffff';

    if (_room && _room instanceof THREE.Mesh) {
      let i: any;
      let defaultcolor = true;

      const _object: any = _room;

      for (i in item.colorcondition) {
        if (this.host.states[index] == item.colorcondition[i].state) {
          const colorcond: THREE.Color = new THREE.Color(item.colorcondition[i].color);
          _object.material.color.set(colorcond);
          _object.material.emissive.set(colorcond);
          defaultcolor = false;
          break;
        }
      }
      if (defaultcolor) {
        _object.material.color.set(color);
        _object.material.emissive.set(color);
      }
    }
  }

  // The text of an info box: the state (with entity_template), or info.text, a template [[[ ]]] as
  // entity_template or a text where $entity is the state.
  private _infoText(entity: EntityConfig): string {
    const own = entity.info && entity.info.text ? String(entity.info.text).trim() : '';
    if (!own) return this.host.stateWithTemplate(entity);
    if (own.startsWith('[[[') && own.endsWith(']]]'))
      return this.host.stateWithTemplate({ ...entity, entity_template: own });
    const stateObj = this.host.hass.states[entity.entity];
    return own.replace(/\$entity/g, stateObj ? stateObj.state : '');
  }

  private _centerobjecttopivot(object: THREE.Mesh, pivot: THREE.Vector3) {
    //Center a Mesh  along is defined pivot point

    object.applyMatrix4(new THREE.Matrix4().makeTranslation(-pivot.x, -pivot.y, -pivot.z));
    object.position.copy(pivot);
  }
}
