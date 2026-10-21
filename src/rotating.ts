// type3d: rotate: objects that turn around the middle of their hinge (a fan, a wind vane): at the
// speed of the entity (on, off, percentage, direction, or a speed sensor), spinning up and coasting
// down, or to the angle of a sensor (angle_entity). The angles and speeds are worked out in rotate.ts.
import * as THREE from 'three';
import { EntityHandler, EntityHost, pivotObject } from './entity-types';
import { rotationAngle, sensorNumber, turnToward } from './rotate';
import type { Floor3dCardConfig } from './types';

const ROTATE_RAMP = 1.5; // seconds for a fan to reach full speed or to stop, when rotate.ramp is missing

export class Rotating {
  // By rotate entity, in the order of the configuration (_rotation_index: its position there).
  private _axis_to_rotate: string[] = [];
  private _round_per_seconds: number[] = [];
  private _rotation_state: number[] = []; // target speed: 1 full, a fraction with percentage, negative in reverse
  private _rotation_speed: number[] = []; // speed now, on its way to the target (rotate.ramp)
  private _rotation_ramp: number[] = []; // seconds from stopped to full speed
  private _rotation_index: number[] = [];
  // angle_entity (rotate.ts): the angle to turn to, the angle turned to now (radians, null: none yet),
  // and whether the range is a whole turn.
  private _rotation_angle: (number | null)[] = [];
  private _rotation_turned: (number | null)[] = [];
  private _rotation_wrap: boolean[] = [];
  // The objects each rotate entity turns, found once (a search of the scene at every frame was slow
  // on a large model).
  private _rotation_objects: THREE.Object3D[][] = [];

  constructor(private host: EntityHost) {}

  public readonly handler: EntityHandler = {
    setup: (entity, i) => this._setup(entity, i),
    show: (entity, i) => this._calc(entity, i),
    refresh: (entity, i, state) => this._refresh(entity, i, state),
  };

  // The model is set up again: its rotating objects are found again.
  public reset(): void {
    this._round_per_seconds = [];
    this._axis_to_rotate = [];
    this._rotation_state = [];
    this._rotation_speed = [];
    this._rotation_ramp = [];
    this._rotation_index = [];
    this._rotation_angle = [];
    this._rotation_turned = [];
    this._rotation_wrap = [];
    this._rotation_objects = [];
  }

  // A frame of the animation, clockDelta seconds after the previous one: the objects turn.
  public turn(clockDelta: number): void {
    const rotateBy = clockDelta * Math.PI * 2;
    (this._rotation_state || []).forEach((target, index) => {
      // Spin up and coast down at a constant rate: full speed in rotate.ramp seconds (0: at once).
      const ramp = this._rotation_ramp[index] || 0;
      const current = this._rotation_speed[index] || 0;
      const step = ramp > 0 ? clockDelta / ramp : Infinity;
      const speed = Math.abs(target - current) <= step ? target : current + Math.sign(target - current) * step;
      this._rotation_speed[index] = speed;
      if (speed == 0) return;

      const axis = this._axis_to_rotate[index];
      if (axis != 'x' && axis != 'y' && axis != 'z') return;
      (this._rotation_objects[index] || []).forEach((_obj) => {
        _obj.rotation[axis] += this._round_per_seconds[index] * speed * rotateBy;
      });
    });

    // angle_entity: towards the angle at round_per_second (1 by default), at once the first time.
    this._rotation_angle.forEach((target, index) => {
      const current = this._rotation_turned[index];
      if (target === null || current === target) return;
      const step = Math.abs(this.host.num(this._round_per_seconds[index], 0.5)) * rotateBy;
      const turned =
        current === null ? target : turnToward(current, target, step || Infinity, this._rotation_wrap[index]);
      this._rotation_turned[index] = turned;
      const axis = this._axis_to_rotate[index];
      if (axis != 'x' && axis != 'y' && axis != 'z') return;
      (this._rotation_objects[index] || []).forEach((_obj) => {
        // Clockwise seen from the positive end of the axis (from above for y), as a compass.
        _obj.rotation[axis] = (_obj.userData.f3dRotationBase || 0) - turned;
      });
    });
  }

  // rotate: the speed of each rotating entity, and the objects turned around the middle of the hinge.
  private _setup(entity: Floor3dCardConfig, i: number): void {
    // Empty (only a sensor sets the speed): 1, as NaN made the object vanish.
    this._round_per_seconds.push(this.host.num(entity.rotate.round_per_second, 1));
    this._axis_to_rotate.push(entity.rotate.axis);
    this._rotation_state.push(0);
    this._rotation_speed.push(0);
    this._rotation_ramp.push(Math.max(0, this.host.num(entity.rotate.ramp, ROTATE_RAMP)));
    this._rotation_index.push(i);
    this._rotation_angle.push(null);
    this._rotation_turned.push(null);
    this._rotation_wrap.push(false);
    this._rotation_objects.push([]);
    let bbox: THREE.Box3;
    let hinge: any;
    if (entity.rotate.hinge) {
      hinge = this.host.scene.getObjectByName(entity.rotate.hinge);
    } else {
      hinge = this.host.scene.getObjectByName(this.host.objectIds[i].objects[0].object_id);
    }
    bbox = new THREE.Box3().setFromObject(hinge);
    const pivot = new THREE.Vector3();
    pivot.subVectors(bbox.max, bbox.min).multiplyScalar(0.5);
    pivot.add(bbox.min);

    this.host.objectIds[i].objects.forEach((element) => {
      const _obj: any = this.host.scene.getObjectByName(element.object_id);
      if (!_obj) return;
      pivotObject(_obj, pivot);
      _obj.userData.f3dRotationBase = _obj.rotation[entity.rotate.axis] || 0; // the angle 0 of angle_entity
      this._rotation_objects[this._rotation_objects.length - 1].push(_obj);
    });
  }

  // The speed or the angle of a rotating object.
  private _refresh(entity: Floor3dCardConfig, i: number, state: string): boolean {
    this.host.states[i] = state;
    this._calc(entity, i);
    return false;
  }

  private _calc(entity: Floor3dCardConfig, i: number) {
    let j = this._rotation_index.indexOf(i);

    // angle_entity: turns to the angle of the sensor, and stays there while it has none.
    if (entity.rotate.angle_entity) {
      const stateObj = this.host.hass.states[entity.rotate.angle_entity];
      const turn = rotationAngle(
        stateObj && stateObj.state,
        entity.rotate.angle_min,
        entity.rotate.angle_max,
        entity.rotate.angle_offset,
      );
      if (turn) {
        this._rotation_angle[j] = turn.angle;
        this._rotation_wrap[j] = turn.wrap;
      }
      this._rotation_state[j] = 0;
      this.host.animate();
      return;
    }

    // speed_entity: a sensor from 0 to 100 (times speed_multiplier) is the fraction of round_per_second;
    // without one, the entity itself when its state is a number (a sensor, an input_number), not on
    // or off. Negative: the other way.
    const speedState = this.host.hass.states[entity.rotate.speed_entity || entity.entity];
    const speed = speedState ? sensorNumber(speedState.state) : null;
    if (speed !== null) {
      const multiplier = this.host.num(entity.rotate.speed_multiplier, 1) || 1;
      this._rotation_state[j] = (speed * multiplier) / 100;
      this.host.animate();
      return;
    }
    if (entity.rotate.speed_entity) {
      // Its sensor has no number (unavailable): stopped.
      this._rotation_state[j] = 0;
      this.host.animate();
      return;
    }

    //1 if the entity is on, 0 if the entity is off
    this._rotation_state[j] = this.host.states[i] == 'on' ? 1 : 0;

    //If the entity is on and it has the 'percentage' attribute, convert the percentage integer
    //into a decimal and store it as the rotation state
    if (this._rotation_state[j] != 0 && this.host.hass.states[entity.entity].attributes['percentage']) {
      this._rotation_state[j] = this.host.hass.states[entity.entity].attributes['percentage'] / 100;
    }

    //If the entity is on and it is reversed, set the rotation state to the negative value of itself
    if (
      this._rotation_state[j] != 0 &&
      this.host.hass.states[entity.entity].attributes['direction'] &&
      this.host.hass.states[entity.entity].attributes['direction'] == 'reverse'
    ) {
      this._rotation_state[j] = 0 - this._rotation_state[j];
    }

    this.host.animate();
  }

  // A fan turning, or still speeding up or slowing down; an object still turning to its angle.
  public get moving(): boolean {
    return (
      !!(this._rotation_state && this._rotation_state.some((s) => s !== 0)) ||
      this._rotation_speed.some((s) => s !== 0) ||
      this._rotation_angle.some((angle, index) => angle !== null && this._rotation_turned[index] !== angle)
    );
  }
}
