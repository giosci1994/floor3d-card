import serve from 'rollup-plugin-serve';
import { output, plugins } from './rollup.config.mjs';

// npm start: rebuilds on every change and serves dist/ on port 5000 (not minified).
export default {
  input: 'src/floor3d-card.ts',
  // Home Assistant loads the card for its side effects (custom element): no exports needed.
  preserveEntrySignatures: false,
  // Same files as the production build: card, core chunk and editor chunk.
  output,
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
