// What is around the model: the light that follows the camera (torch), the light of the sky
// (sky_power), the sun (sun: yes) with its roof for the shadows, the sky behind the canvas
// (backgroundColor: sky) and the ground under the house (ground). The card is reached only through
// EnvironmentHost: its config and states, the scene, and its shadow budget for the sun.
import * as THREE from 'three';
import { HomeAssistant } from './ha';
import { switchOn } from './config';
import { moonPhase, skyBackground, weatherClouds } from './sky';
import { grassTexture, groundAlpha, groundStyle } from './ground';

// three.js >= 0.155 always uses physical light units, and the model is in centimetres: see the
// lamps in lamps.ts. globalLightPower, sun_power and sky_power in the config adjust these.
const TORCH_SCALE = 0.66; // camera-following light: globalLightPower x this
const SUN_INTENSITY = 2.4; // full daylight, multiplied by sun_power
const SKY_INTENSITY = 1; // light of the sky on a floor, multiplied by sky_power
const SKY_COLOR = '#e6eeff'; // light of the sky from above, when sky_color is missing
const GROUND_COLOR = '#706458'; // light from below (reflected by the ground), when ground_color is missing

// Share of daylight for an elevation of the sun, in degrees: night below -3, full light from 8.
function daylight(elevation: number): number {
  return THREE.MathUtils.smoothstep(elevation, -3, 8);
}

export interface EnvironmentHost {
  readonly config: any;
  readonly hass?: HomeAssistant;
  readonly scene: THREE.Scene;
  readonly camera: THREE.Camera;
  readonly renderer: THREE.WebGLRenderer;
  readonly model: THREE.Object3D; // the box of the model, centred
  readonly modelCenter?: THREE.Vector3;
  readonly modelRadius?: number;
  num(value: unknown, fallback: number): number;
  levelMiddles(): number[]; // the middle of the height of each level
  scheduleRender(): void;
  // The sun takes part in the shadow budget of the card (the texture units of the GPU).
  enableShadow(light: THREE.DirectionalLight, bias: number): void;
  refreshLightShadow(light: THREE.DirectionalLight): void;
}

export class Environment {
  private _torch?: THREE.DirectionalLight;
  private _torchTarget?: THREE.Object3D;
  private _skyLight?: THREE.HemisphereLight; // sky_power: light of the sky, without shadows
  private _sun?: THREE.DirectionalLight;
  private _sunTarget?: THREE.Object3D;
  private _sunRoof: THREE.Mesh[] = []; // invisible roof: shadow for the sun only
  private _sunKey?: string;
  private _skyKey?: string; // the gradient behind the canvas (backgroundColor: sky)
  private _ground?: THREE.Mesh; // ground: the surface under the house
  private _missingLogged?: { [entity: string]: boolean }; // power sensors not found, warned once

  constructor(private host: EnvironmentHost) {}

  // The sun, first in the shadow budget of the card.
  public get sun(): THREE.DirectionalLight | undefined {
    return this._sun;
  }

  // Once the model is centred: the torch, the sky light, the ground, then the sun (whose shadow
  // reaches farther with a ground).
  public init(): void {
    this._initTorch();
    this._initSky();
    this._initGround();
    this._initSun();
  }

  // At every update of the states: the powers can be sensors, and the sun moves.
  public update(): void {
    this._updateTorch();
    this._updateSky();
    this._updateSun();
    this.updateSkyBackground();
  }

  // The model is loaded again: the next init makes a new sun.
  public reset(): void {
    this._sun = undefined;
  }

  // The ground follows the levels shown: it opens over the levels under it when only those are
  // shown (a basement under ground_floor_level), so that they can be seen with the ground around the
  // house (until 2.12.1 all of it hid). A level is under the ground when the middle of its height
  // is: in 2.11.3 its top had to be, and the stairs or the walls of a basement that reach a little
  // above the ground kept the ground over it.
  public followLevels(levels: THREE.Object3D[], levelShown: (level: number) => boolean): void {
    if (!this._ground) return;
    const middles: number[] = this._ground.userData.levelMiddles || [];
    const y = this._ground.position.y;
    const above = !middles.length || middles.some((middle, level) => middle > y && levelShown(level));
    const under = above
      ? []
      : levels.filter((level, i) => level && middles[i] > -Infinity && middles[i] <= y && levelShown(i));
    this._ground.visible = above || under.length > 0;
    this._setGroundHole(under);
  }

  private shown(key: string, fallback: boolean): boolean {
    return switchOn(this.host.config, key, fallback);
  }

  // The torch lights what the camera looks at: its target is a point in front of the camera.
  // (getWorldDirection alone gives a unit vector, i.e. a point next to the centre of the model,
  // so the light always went from the camera towards the centre, whatever the view.)
  public aimTorch(): void {
    if (!this._torch) return;
    this._torch.position.copy(this.host.camera.position);
    this.host.camera.getWorldDirection(this._torch.target.position);
    this._torch.target.position.add(this.host.camera.position);
  }

  private _initTorch(): void {
    this._torch = new THREE.DirectionalLight(0xffffff, 0.2 * TORCH_SCALE);
    this._torchTarget = new THREE.Object3D();
    this._torchTarget.name = 'Torch Target';
    this._torch.target = this._torchTarget;
    this._torch.matrixAutoUpdate = true;
    this.host.scene.add(this._torch);
    this.host.scene.add(this._torchTarget);

    this._torch.castShadow = false;

    this.aimTorch();
    this._updateTorch();
  }

  // globalLightPower can be a numeric sensor: read at every update (before, only at startup).
  private _updateTorch(): void {
    if (!this._torch) return;
    const intensity = this._power('globalLightPower', 0.2) * TORCH_SCALE;
    if (intensity === this._torch.intensity) return;
    this._torch.intensity = intensity;
    this.host.scheduleRender();
  }

  // Light of the sky (sky_power): a hemisphere light without shadows, sky_color from above and
  // ground_color from below, that fills the shade the sun leaves. There is no ambient light on
  // purpose: with sky_power missing or 0 there is no sky light either, and the render is the same.
  private _initSky(): void {
    this._skyLight?.removeFromParent();
    this._skyLight = undefined;
    const power = this.host.config.sky_power;
    if (power === undefined || power === null || Number(power) === 0) return;
    this._skyLight = new THREE.HemisphereLight(SKY_COLOR, GROUND_COLOR, 0);
    this._skyLight.name = 'f3d_sky';
    if (this.host.config.sky_color) this._skyLight.color.set(this.host.config.sky_color);
    if (this.host.config.ground_color) this._skyLight.groundColor.set(this.host.config.ground_color);
    this.host.scene.add(this._skyLight);
    this._updateSky();
  }

  // sky_power can be a numeric sensor (from the diffuse radiation, for example): read at every
  // update. With the sun (sun: yes) the sky follows the day like the sun: no sky light at night.
  private _updateSky(): void {
    if (!this._skyLight) return;
    let intensity = SKY_INTENSITY * this._power('sky_power', 0);
    if (this.host.config.sun == 'yes') {
      const elevation = this._sunAngles()[1];
      if (!isNaN(elevation)) intensity *= daylight(elevation);
    }
    if (intensity === this._skyLight.intensity) return;
    this._skyLight.intensity = intensity;
    this.host.scheduleRender();
  }

  // A light power of the config: a number, or the id of a numeric sensor whose state is read at
  // every update. An unavailable sensor (or a state that isn't a number) gives the default, and a
  // negative value counts as 0.
  private _power(option: 'globalLightPower' | 'sun_power' | 'sky_power', fallback: number): number {
    const value = this.host.config[option];
    const entity = typeof value === 'string' && this.host.hass ? this.host.hass.states[value] : undefined;
    if (!entity && typeof value === 'string' && value.trim() !== '' && isNaN(Number(value))) {
      if (!this._missingLogged) this._missingLogged = {};
      if (!this._missingLogged[value]) {
        this._missingLogged[value] = true;
        console.warn(
          'floor3d-card: ' + option + ': entity not found: ' + value + ', the default ' + fallback + ' is used',
        );
      }
    }
    return Math.max(0, this.host.num(entity ? entity.state : value, fallback));
  }

  // ground: grass or a colour. A disc under the model, two and a half times as wide, that fades at its
  // edge into the background, so that the sky still shows around the house. It takes the shadows (shadow: yes), casts none, and isn't part of the
  // model: taps go through it, and the camera, the views and the sun are fitted to the house
  // without it. The lawn is a texture made by the card (one texture unit, as a plain material:
  // the shadows of the lamps keep their limit); the fade is in the colours of the vertices.
  private _initGround(): void {
    this._ground?.removeFromParent();
    this._ground = undefined;
    const style = groundStyle(this.host.config.ground);
    if (!style || !this.host.modelCenter) return;
    const R = Math.max(this.host.modelRadius * 2.5, 1500);
    const geometry = new THREE.RingGeometry(0.01, R, 96, 8);
    geometry.rotateX(-Math.PI / 2);
    const position = geometry.getAttribute('position');
    const colors = new Float32Array(position.count * 4);
    for (let i = 0; i < position.count; i++) {
      colors.set([1, 1, 1, groundAlpha(Math.hypot(position.getX(i), position.getZ(i)), R)], i * 4);
    }
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 4));
    // It writes its depth (what is under it stays under it, the glass of a basement too), except where
    // it has faded away.
    const material = new THREE.MeshLambertMaterial({ vertexColors: true, transparent: true, alphaTest: 0.01 });
    material.name = 'f3d_ground';
    if (style.kind === 'grass') {
      const size = 256;
      const texture = new THREE.DataTexture(grassTexture(size), size, size);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.magFilter = THREE.LinearFilter;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.generateMipmaps = true;
      texture.anisotropy = this.host.renderer.capabilities.getMaxAnisotropy();
      texture.repeat.set((2 * R) / 300, (2 * R) / 300); // a tile every 3 m
      texture.needsUpdate = true;
      material.map = texture;
    } else {
      material.color.set(style.color); // three.js warns about a name it doesn't know
    }
    const ground = new THREE.Mesh(geometry, material);
    ground.name = 'f3d_ground';
    // Under the model, or ground_floor_level higher (in the units of the model): at the floor of the
    // ground floor of a house with a basement. The middle of the height of each level, to hide it with
    // the levels under it (see _showWithLevels).
    const bottom = new THREE.Box3().setFromObject(this.host.model).min.y;
    ground.position.set(
      this.host.modelCenter.x,
      bottom - 0.5 + this.host.num(this.host.config.ground_floor_level, 0),
      this.host.modelCenter.z,
    );
    ground.userData.levelMiddles = this.host.levelMiddles();
    ground.receiveShadow = this.host.config.shadow == 'yes';
    ground.castShadow = false;
    ground.renderOrder = -1; // before the glass of the windows, which shows it through
    this.host.scene.add(ground);
    this._ground = ground;
  }

  // Sun (sun: yes): a directional light placed like sun.sun (azimuth and elevation), using the north
  // of the config. Its shadow covers the whole model and is redrawn when the sun moves.
  private _initSun(): void {
    if (this.host.config.sun != 'yes' || !this.host.modelCenter) return;
    this._sun = new THREE.DirectionalLight(0xffffff, 0);
    this._sun.name = 'f3d_sun';
    this._sunTarget = new THREE.Object3D();
    this._sun.target = this._sunTarget;
    this.host.scene.add(this._sun);
    this.host.scene.add(this._sunTarget);
    if (this.host.config.sun_shadow != 'no') {
      // With a ground the shadow reaches farther: at sunset the shadow of the house falls on it.
      const r = this.host.modelRadius * (this._ground ? 1.5 : 1);
      const camera = this._sun.shadow.camera;
      camera.left = -r;
      camera.right = r;
      camera.top = r;
      camera.bottom = -r;
      camera.near = r * 0.5;
      camera.far = r * 3.5;
      camera.updateProjectionMatrix();
      this._sun.shadow.mapSize.set(2048, 2048);
      this._sun.shadow.normalBias = 1.5;
      this.host.enableShadow(this._sun, -0.0003);
      this._buildSunRoof();
    }
    this._sunKey = undefined;
    this._updateSun();
  }

  // The model has no ceilings, so that the rooms can be seen from above, and the sun would light
  // every floor as if there were no roof. sun_roof lists the indoor floors: copies of them at the
  // top of the walls form a roof that only the sun sees (not the camera, not the lamps: a lamp at
  // ceiling height would be switched off by it). Light then comes in through windows and doors.
  private _buildSunRoof(): void {
    this._sunRoof = [];
    const ids: string[] = Array.isArray(this.host.config.sun_roof) ? this.host.config.sun_roof : [];
    if (ids.length == 0) return;
    const top = new THREE.Box3().setFromObject(this.host.model).max.y;
    const material = new THREE.MeshBasicMaterial({ colorWrite: false, depthWrite: false, side: THREE.DoubleSide });
    material.shadowSide = THREE.DoubleSide;
    ids.forEach((id) => {
      const floor = this.host.scene.getObjectByName(id) as THREE.Mesh;
      if (!floor || !floor.geometry) {
        console.warn('floor3d-card: sun_roof: object not found: ' + id);
        return;
      }
      floor.updateWorldMatrix(true, false);
      const geometry = floor.geometry.clone().applyMatrix4(floor.matrixWorld);
      geometry.computeBoundingBox();
      const box = geometry.boundingBox;
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      // A few centimetres wider on each side, so that no light slips in along the walls.
      geometry.translate(-center.x, -box.min.y, -center.z);
      geometry.scale((size.x + 8) / Math.max(size.x, 1), 1, (size.z + 8) / Math.max(size.z, 1));
      geometry.translate(center.x, top - 1, center.z);
      const roof = new THREE.Mesh(geometry, material);
      roof.name = id + '_sun_roof';
      roof.castShadow = true;
      roof.receiveShadow = false;
      roof.visible = false; // shown only while the sun's shadow map is drawn
      this.host.scene.add(roof);
      this._sunRoof.push(roof);
    });
    if (this._sunRoof.length == 0) return;

    // Shadow maps are drawn in one call for all the lights: the sun gets its own, with the roof.
    const shadowMap = this.host.renderer.shadowMap;
    const renderShadows = shadowMap.render.bind(shadowMap);
    shadowMap.render = (lights, scene, camera) => {
      if (!lights.includes(this._sun)) return renderShadows(lights, scene, camera);
      const needsUpdate = shadowMap.needsUpdate;
      this._sunRoof.forEach((roof) => (roof.visible = true));
      renderShadows([this._sun], scene, camera);
      this._sunRoof.forEach((roof) => (roof.visible = false));
      shadowMap.needsUpdate = needsUpdate; // the call above resets it
      renderShadows(
        lights.filter((light) => light !== this._sun),
        scene,
        camera,
      );
    };
  }

  // backgroundColor: sky. The colours of the sky for the elevation of the sun entity (the one of the
  // day without it), greyer with the clouds of the weather entity of the forecast, if any (unless
  // sky_clouds: no); at night the stars and the moon (stars_show, moon_show, moon_size), the moon as
  // it is seen from the hemisphere of the house.
  public skyBackground(): string {
    const weather =
      this.host.config.weather && this.host.hass ? this.host.hass.states[this.host.config.weather] : undefined;
    const latitude = this.host.hass && this.host.hass.config ? Number((this.host.hass.config as any).latitude) : NaN;
    return skyBackground(this._sunAngles()[1], this.shown('sky_clouds', true) ? weatherClouds(weather) : 0, {
      stars: this.shown('stars_show', true),
      moon: this.shown('moon_show', true),
      phase: moonPhase(new Date()),
      southern: latitude < 0,
      moonSize: Math.min(300, Math.max(8, this.host.num(this.host.config.moon_size, 30))),
    });
  }

  public updateSkyBackground(force = false): void {
    if (force) this._skyKey = undefined;
    if (this.host.config.backgroundColor != 'sky' || !this.host.renderer) return;
    const background = this.skyBackground();
    if (background === this._skyKey) return;
    this._skyKey = background;
    this.host.renderer.domElement.style.background = background;
  }

  // Azimuth and elevation of the sun entity, in degrees: NaN without it.
  private _sunAngles(): [number, number] {
    const sun = this.host.hass && this.host.hass.states[this.host.config.sun_entity || 'sun.sun'];
    return sun ? [Number(sun.attributes.azimuth), Number(sun.attributes.elevation)] : [NaN, NaN];
  }

  private _updateSun(): void {
    if (!this._sun || !this.host.hass) return;
    const [azimuth, elevation] = this._sunAngles();
    const known = !isNaN(azimuth) && !isNaN(elevation);
    const key = azimuth + '|' + elevation;
    const moved = key !== this._sunKey;
    this._sunKey = key;
    if (moved && known) {
      const north = new THREE.Vector3(
        this.host.num(this.host.config.north && this.host.config.north.x, 0),
        0,
        this.host.num(this.host.config.north && this.host.config.north.z, -1),
      ).normalize();
      const east = new THREE.Vector3().crossVectors(north, new THREE.Vector3(0, 1, 0));
      const az = THREE.MathUtils.degToRad(azimuth);
      const el = THREE.MathUtils.degToRad(elevation);
      const direction = north
        .multiplyScalar(Math.cos(az))
        .addScaledVector(east, Math.sin(az))
        .multiplyScalar(Math.cos(el));
      direction.y = Math.sin(el);
      direction.normalize();
      this._sunTarget.position.copy(this.host.modelCenter);
      this._sun.position.copy(this.host.modelCenter).addScaledVector(direction, this.host.modelRadius * 2);
      this._sunTarget.updateMatrixWorld();
      this._sun.updateMatrixWorld();
      // Warmer near the horizon.
      const warm = 1 - THREE.MathUtils.smoothstep(elevation, 2, 25);
      this._sun.color.setRGB(1, 1 - 0.25 * warm, 1 - 0.5 * warm, THREE.SRGBColorSpace);
    }
    // sun_power can be a numeric sensor (from the direct radiation, for example): read at every
    // update, so that clouds dim the sun and its shadows.
    const intensity = known ? SUN_INTENSITY * this._power('sun_power', 1) * daylight(elevation) : 0;
    if (!moved && intensity === this._sun.intensity) return;
    this._sun.intensity = intensity;
    // The brightness doesn't change the shadow map, the position does: redrawn now if the sun
    // shines, otherwise as soon as it does (it can move behind the clouds, with sun_power at 0).
    if (moved) this._sun.userData.shadowStale = true;
    this.host.refreshLightShadow(this._sun);
    this.host.scheduleRender();
  }

  // A rectangular hole in the ground over levels (the basement, its walls included): four vertical
  // planes, and what is inside all four of them (clipIntersection) isn't drawn. Its sides are earth,
  // down to the bottom of the levels: the walls of a basement end under the ground (by the thickness
  // of the floor above them, in Sweet Home 3D), and the background showed between them and the
  // ground. No levels: no hole.
  private _setGroundHole(levels: THREE.Object3D[]): void {
    const material = this._ground.material as THREE.MeshLambertMaterial;
    const box = new THREE.Box3();
    levels.forEach((level) => box.union(new THREE.Box3().setFromObject(level)));
    const planes = box.isEmpty()
      ? null
      : [
          new THREE.Plane(new THREE.Vector3(-1, 0, 0), box.min.x),
          new THREE.Plane(new THREE.Vector3(1, 0, 0), -box.max.x),
          new THREE.Plane(new THREE.Vector3(0, 0, -1), box.min.z),
          new THREE.Plane(new THREE.Vector3(0, 0, 1), -box.max.z),
        ];
    // The number of planes is part of the shader: it is built again only when it changes.
    if (!!planes !== !!material.clippingPlanes) material.needsUpdate = true;
    material.clippingPlanes = planes;
    material.clipIntersection = true;
    this._ground.userData.hole = planes ? [box.min.x, box.max.x, box.min.z, box.max.z] : null;
    let earth = this._ground.getObjectByName('f3d_ground_earth') as THREE.Mesh | undefined;
    if (!planes) {
      if (earth) earth.visible = false;
      return;
    }
    if (!earth) {
      // The inside of a box, without the top that faces the camera (BackSide).
      earth = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshLambertMaterial({ color: 0x3b2a1d, side: THREE.BackSide }),
      );
      earth.name = 'f3d_ground_earth';
      this._ground.add(earth);
    }
    const ground = this._ground.position;
    const depth = Math.max(ground.y - box.min.y + 1, 1);
    earth.scale.set(box.max.x - box.min.x, depth, box.max.z - box.min.z);
    earth.position.set((box.min.x + box.max.x) / 2 - ground.x, -depth / 2, (box.min.z + box.max.z) / 2 - ground.z);
    earth.visible = true;
  }
}
