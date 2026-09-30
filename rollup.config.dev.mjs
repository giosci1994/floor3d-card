import serve from 'rollup-plugin-serve';
import { plugins } from './rollup.config.mjs';

// npm start: rebuilds on every change and serves dist/ on port 5000 (not minified).
export default {
  input: 'src/floor3d-card.ts',
  // Home Assistant loads the card for its side effects (custom element): no exports needed,
  // so the card code stays in floor3d-card.js instead of a facade plus a chunk.
  preserveEntrySignatures: false,
  output: {
    dir: 'dist',
    format: 'es',
    entryFileNames: 'floor3d-card.js',
    // The editor becomes a separate file loaded only when the card is edited.
    chunkFileNames: 'floor3d-card-[name]-[hash].js',
  },
  plugins: [
    ...plugins,
    serve({
      contentBase: './dist',
      host: '0.0.0.0',
      port: 5000,
      allowCrossOrigin: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }),
  ],
};
