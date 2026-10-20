// Modules made by the build (rollup.config.mjs).

// The addresses of the Draco decoder that comes with the card, for setDecoderPath() of DRACOLoader.
declare module 'virtual:draco-decoder' {
  const decoder: { js: string; wasm: string };
  export default decoder;
}
