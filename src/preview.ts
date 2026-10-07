// The preview of the card editor can be paused. Home Assistant creates the card of the preview again
// at every change of the config, and each one loaded the model again; a card created while the
// preview is paused shows the last picture of the preview instead, until the editor asks for a
// reload. Shared by the editor and the card: both import it from the core chunk.
export const previewState: { paused: boolean; image?: string } = { paused: false };
