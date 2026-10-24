// walls: the walls in the way of the view. With fade, the walls between the camera and the rooms
// fade as the view turns, and the others stay; with low, every wall is cut at a height, as a doll's
// house. The walls are the objects of walls_objects: wall_* by default, the walls of a model of
// Sweet Home 3D (wall_9_64), which names them so in every language. The card is reached only through
// WallsHost.
import * as THREE from 'three';
import type { Floor3dCardConfig } from './types';

const FADE_TIME = 0.4; // seconds from solid to faded, and back
const FACING = 0.3; // a wall fades when its face turns to the camera more than this (a cosine)

interface WallView {
  mesh: THREE.Mesh;
  materials: THREE.Material[]; // its own copies
  base: { opacity: number; transparent: boolean; depthWrite: boolean }[]; // as they were
  normal?: THREE.Vector3; // horizontal, away from the middle of the walls (fade)
  level: number;
  opacity: number; // now, 0..1
  goal: number;
}

export interface WallsHost {
  readonly config: Floor3dCardConfig;
  readonly scene: THREE.Scene;
  readonly model: THREE.Object3D; // the box of the model: the cut follows it when it moves
  readonly camera: THREE.Camera;
  readonly target: THREE.Vector3; // the point the camera looks at
  objectNamesFor(ids: string[]): string[];
  num(value: unknown, fallback: number): number;
  scheduleRender(): void;
  animate(): void;
}

// The horizontal direction a piece of wall faces and its middle: the direction in which its points
// spread the least (a wall is long and thin), also for a wall at an angle. None for a piece about as
// deep as it is wide (a pillar): it has no side that faces the camera.
function facing(mesh: THREE.Mesh): { normal: THREE.Vector3; middle: THREE.Vector2 } | undefined {
  const position = mesh.geometry && mesh.geometry.attributes.position;
  if (!position || position.count < 3) return undefined;
  mesh.updateWorldMatrix(true, false);
  const v = new THREE.Vector3();
  let sx = 0;
  let sz = 0;
  let sxx = 0;
  let szz = 0;
  let sxz = 0;
  for (let i = 0; i < position.count; i++) {
    v.fromBufferAttribute(position, i).applyMatrix4(mesh.matrixWorld);
    sx += v.x;
    sz += v.z;
    sxx += v.x * v.x;
    szz += v.z * v.z;
    sxz += v.x * v.z;
  }
  const n = position.count;
  const mx = sx / n;
  const mz = sz / n;
  const cxx = sxx / n - mx * mx;
  const czz = szz / n - mz * mz;
  const cxz = sxz / n - mx * mz;
  const half = (cxx + czz) / 2;
  const root = Math.sqrt(Math.max(half * half - (cxx * czz - cxz * cxz), 0));
  const least = half - root;
  const most = half + root;
  if (most <= 0 || least / most > 0.25) return undefined;
  const normal =
    Math.abs(cxz) > 1e-9
      ? new THREE.Vector3(cxz, 0, least - cxx)
      : cxx < czz
        ? new THREE.Vector3(1, 0, 0)
        : new THREE.Vector3(0, 0, 1);
  return { normal: normal.normalize(), middle: new THREE.Vector2(mx, mz) };
}

export class Walls {
  private _walls: WallView[] = [];
  private _mode = 'none';
  private _planes: { plane: THREE.Plane; bottom: number }[] = []; // low: the cut of each level, its floor in the model

  constructor(private host: WallsHost) {}

  // The mode of the walls: none (the default), fade or low.
  public get mode(): string {
    return this._mode;
  }

  // A wall is fading in or out: the animation loop runs.
  public get fading(): boolean {
    return this._walls.some((w) => w.opacity !== w.goal);
  }

  // The model is set up (and centred): its walls get materials of their own, as a GLB often shares
  // one material among the walls and other objects. With low they are cut; with fade the walls in
  // the way of the view start faded.
  public init(): void {
    this._walls = [];
    this._planes = [];
    const mode = String(this.host.config.walls || 'none');
    this._mode = mode == 'fade' || mode == 'low' ? mode : 'none';
    if (this._mode == 'none') return;
    const meshes: THREE.Mesh[] = [];
    this.host.objectNamesFor([String(this.host.config.walls_objects || 'wall_*')]).forEach((name) => {
      const object = this.host.scene.getObjectByName(name);
      if (object)
        object.traverse((o) => {
          const mesh = o as THREE.Mesh;
          if (mesh.isMesh && mesh.material && !meshes.includes(mesh)) meshes.push(mesh);
        });
    });
    if (!meshes.length) {
      console.warn(
        'floor3d-card: walls: no object of the model matches ' + (this.host.config.walls_objects || 'wall_*'),
      );
      return;
    }
    this._walls = meshes.map((mesh) => {
      const own = (Array.isArray(mesh.material) ? mesh.material : [mesh.material]).map((m) => m.clone());
      mesh.material = Array.isArray(mesh.material) ? own : own[0];
      return {
        mesh,
        materials: own,
        base: own.map((m) => ({ opacity: m.opacity, transparent: m.transparent, depthWrite: m.depthWrite })),
        level: mesh.userData.level !== undefined ? mesh.userData.level : levelOf(mesh),
        opacity: 1,
        goal: 1,
      };
    });
    if (this._mode == 'low') this._cut();
    else this._face();
  }

  // low: each level cut at walls_height (100 cm by default) above its floor, the floor of its walls.
  // The inside of a cut wall shows, so that it looks solid from above; its shadow stays whole.
  private _cut(): void {
    const height = this.host.num(this.host.config.walls_height, 100);
    const floors = new Map<number, number>();
    this._walls.forEach((w) => {
      const bottom = new THREE.Box3().setFromObject(w.mesh).min.y - this.host.model.position.y;
      if (!floors.has(w.level) || bottom < floors.get(w.level)) floors.set(w.level, bottom);
    });
    const planes = new Map<number, THREE.Plane>();
    floors.forEach((bottom, level) => {
      const plane = new THREE.Plane(new THREE.Vector3(0, -1, 0), 0);
      planes.set(level, plane);
      this._planes.push({ plane, bottom: bottom + height });
    });
    this._walls.forEach((w) =>
      w.materials.forEach((m) => {
        m.clippingPlanes = [planes.get(w.level)];
        m.clipShadows = false;
        m.side = THREE.DoubleSide;
        m.needsUpdate = true;
      }),
    );
    this.place();
  }

  // The cut follows the model when it is centred again (the initial view).
  public place(): void {
    const y = this.host.model ? this.host.model.position.y : 0;
    this._planes.forEach((p) => (p.plane.constant = y + p.bottom));
  }

  // fade: the side each wall faces, away from the middle of all the walls. The walls in the way of the
  // view at the start are faded at once.
  private _face(): void {
    const faces = this._walls.map((w) => facing(w.mesh));
    const middles = faces.filter((f) => f).map((f) => f.middle);
    if (!middles.length) return;
    const middle = middles.reduce((sum, m) => sum.add(m), new THREE.Vector2()).divideScalar(middles.length);
    this._walls.forEach((w, i) => {
      const face = faces[i];
      if (!face) return;
      const away = face.middle.clone().sub(middle);
      if (face.normal.x * away.x + face.normal.z * away.y < 0) face.normal.negate();
      w.normal = face.normal;
    });
    this.update();
    this._walls.forEach((w) => {
      w.opacity = w.goal;
      this._apply(w);
    });
  }

  // The camera moved: the walls whose face turns to it fade, the others come back. Seen straight from
  // above no wall is in the way.
  public update(): void {
    if (this._mode != 'fade' || !this._walls.length) return;
    const side = this.host.camera.position.clone().sub(this.host.target).setY(0);
    const level = side.lengthSq() > 1e-6;
    side.normalize();
    const faded = THREE.MathUtils.clamp(this.host.num(this.host.config.walls_opacity, 0.15), 0, 1);
    let changed = false;
    this._walls.forEach((w) => {
      const goal = level && w.normal && w.normal.dot(side) > FACING ? faded : 1;
      if (goal !== w.goal) {
        w.goal = goal;
        changed = true;
      }
    });
    if (changed) this.host.animate();
  }

  // A frame of the animation, dt seconds after the previous one: the walls go toward their opacity.
  public step(dt: number): void {
    const delta = dt / FADE_TIME;
    this._walls.forEach((w) => {
      if (w.opacity === w.goal) return;
      w.opacity = w.goal > w.opacity ? Math.min(w.goal, w.opacity + delta) : Math.max(w.goal, w.opacity - delta);
      this._apply(w);
    });
  }

  // A faded wall is see-through and lets the taps through (to the lamp behind it); solid again, its
  // materials are as they were.
  private _apply(w: WallView): void {
    const solid = w.opacity >= 1;
    w.materials.forEach((m, i) => {
      const base = w.base[i];
      const transparent = solid ? base.transparent : true;
      if (m.transparent !== transparent) m.needsUpdate = true;
      m.transparent = transparent;
      m.opacity = base.opacity * w.opacity;
      m.depthWrite = solid ? base.depthWrite : false;
    });
    w.mesh.userData.f3dFaded = w.opacity < 0.5;
    this.host.scheduleRender();
  }
}

// The level of an object: the first of its ancestors that has one.
function levelOf(object: THREE.Object3D): number {
  for (let o = object; o; o = o.parent) if (o.userData && o.userData.level !== undefined) return o.userData.level;
  return 0;
}
