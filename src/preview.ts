// The preview of the card editor. Shared by the editor and the card: both import it from the core
// chunk.
// - paused: Home Assistant creates the card of the preview again at every change of the config,
//   and each one loaded the model again; a card created while the preview is paused shows image,
//   the last picture of the preview, instead, until the editor asks for the model.
// - camera: where the camera of the preview was (and the initial view and model it was for): the
//   next preview goes back there instead of the initial view, while those are the same.
export interface PreviewCamera {
  key: string;
  view: { camera_position: Vector; camera_target: Vector; camera_rotate: Vector };
}
interface Vector {
  x: number;
  y: number;
  z: number;
}
export const previewState: { paused: boolean; image?: string; camera?: PreviewCamera } = { paused: false };
