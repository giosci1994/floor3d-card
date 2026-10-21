// The tweens of the card (doors, covers, slats, flights of the camera), in one group for all the
// cards of the page as the global group of tween.js 18 was. tween.js 25 adds a tween to a group only
// when it is made with one, and keeps it there after it ends or is stopped: only the tweens that play
// count, and the others leave the group at the next update.
import { Easing, Group, Tween } from '@tweenjs/tween.js';

export { Easing, Tween };

const group = new Group();

export function tween<T extends Record<string, any>>(object: T): Tween<T> {
  return new Tween(object, group);
}

// The tweens that play (an ending tween still plays during its onComplete).
export function playing(): Tween[] {
  return group.getAll().filter((t) => t.isPlaying());
}

export function updateTweens(): void {
  group.update();
  group.getAll().forEach((t) => {
    if (!t.isPlaying()) group.remove(t);
  });
}
