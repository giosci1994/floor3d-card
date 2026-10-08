// Version of this build, shown at the top of the card editor and in the browser console.
// Keep it equal to "version" in package.json and to the tag of the GitHub release (HACS shows the
// tag): 2.0.0 -> v2.0.0. Test builds between releases get a suffix (v2.0.1-dev.1).
export const CARD_VERSION = 'v2.7.1';

// Events between the card editor and the card shown next to it (the preview): see editor.ts.
export const EDITOR_EVENT = 'floor3d-card-editor';
export const PREVIEW_EVENT = 'floor3d-card-preview';
