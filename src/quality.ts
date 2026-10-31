// quality: how much the card asks of the device. high (the default) is the card as it always was;
// low is for a weak tablet on a wall: the canvas at one pixel per pixel of the screen, at most
// LOW_SHADOWS lamps casting a shadow at once, and a smaller shadow map for the sun; auto is low on a
// device that looks weak (see weakDevice). max_pixel_ratio and max_shadows, when set, win over the
// profile. This module reads nothing else of the card, for the unit tests.

export const LOW_SHADOWS = 4; // lamps casting a shadow at once with quality: low
export const SUN_MAP = 2048; // size of the shadow map of the sun
export const LOW_SUN_MAP = 1024; // the same with quality: low: a quarter of the memory

export interface Device {
  memory?: number; // navigator.deviceMemory, in GB (Chromium only, rounded to a power of 2)
  cores?: number; // navigator.hardwareConcurrency
  touch?: boolean; // a touch screen and no mouse (pointer: coarse)
}

// A device that looks weak: 2 GB of memory or less, 2 cores or fewer, or a touch screen with 4
// cores or fewer (an older tablet). What a browser doesn't tell doesn't count.
export function weakDevice(device: Device): boolean {
  const memory = Number(device.memory);
  const cores = Number(device.cores);
  if (memory > 0 && memory <= 2) return true;
  if (cores > 0 && cores <= 2) return true;
  return !!device.touch && cores > 0 && cores <= 4;
}

// The device of this browser, as weakDevice reads it.
export function thisDevice(): Device {
  const nav: any = typeof navigator !== 'undefined' ? navigator : {};
  const coarse =
    typeof matchMedia === 'function' &&
    matchMedia('(pointer: coarse)').matches &&
    !matchMedia('(any-pointer: fine)').matches;
  return { memory: nav.deviceMemory, cores: nav.hardwareConcurrency, touch: coarse };
}

// quality: low, or auto on a weak device.
export function lowQuality(config: any, device: Device): boolean {
  const quality = String((config && config.quality) || 'high').trim();
  return quality === 'low' || (quality === 'auto' && weakDevice(device));
}

const setNumber = (value: unknown): number | undefined => {
  if (value === undefined || value === null || value === '') return undefined;
  const n = Number(value);
  return isNaN(n) ? undefined : n;
};

// The highest pixel ratio of the canvas: max_pixel_ratio, else 1 with low quality and 2 without.
export function pixelRatioLimit(config: any, low: boolean): number {
  const set = setNumber(config && config.max_pixel_ratio);
  return set !== undefined && set > 0 ? set : low ? 1 : 2;
}

// How many lamps may cast a shadow at once: max_shadows, else LOW_SHADOWS with low quality,
// undefined (as many as the GPU takes) without. The sun doesn't count.
export function shadowLimit(config: any, low: boolean): number | undefined {
  const set = setNumber(config && config.max_shadows);
  if (set !== undefined && set >= 0) return Math.floor(set);
  return low ? LOW_SHADOWS : undefined;
}
