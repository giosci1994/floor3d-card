// Web server of the browser tests: the test page (test/index.html), the build (dist/), the generated
// test house at /local/floor3d/, the picture of a camera, and the configurations and states each test
// puts in files.
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { glbFile, mtlFile, objFile } from './model.mjs';

const root = new URL('../../', import.meta.url).pathname;
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.glb': 'model/gltf-binary' };
// The picture of a camera (a pixel), as the camera proxy of Home Assistant gives it.
const GIF = Buffer.from('R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=', 'base64');

export async function start() {
  const files = new Map([
    ['/local/floor3d/home.obj', objFile()],
    ['/local/floor3d/levels.obj', objFile({ level1: ['floor_bed', 'bed', 'wardrobe'] })], // the bedroom on level 1
    ['/local/floor3d/covers.obj', objFile({ covers: true })],
    ['/local/floor3d/home.mtl', mtlFile()],
    ['/local/floor3d/home.glb', glbFile()],
    ['/local/floor3d/rich.glb', glbFile(true)],
    ['/api/camera_proxy/camera.door', GIF],
  ]);
  const hits = new Map();
  const server = http.createServer((req, res) => {
    const url = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    hits.set(url, (hits.get(url) || 0) + 1);
    let body = files.get(url);
    if (body === undefined) {
      // The test page, and the card: /floor3d-card.js and its chunks come from dist/.
      const file = url === '/test/index.html' ? path.join(root, 'test/index.html') : /^\/floor3d-card[\w.-]*\.js$/.test(url) ? path.join(root, 'dist', url) : null;
      if (file && fs.existsSync(file)) body = fs.readFileSync(file);
    }
    if (body === undefined) {
      res.writeHead(404).end();
      return;
    }
    const type = url.startsWith('/api/camera_proxy/') ? 'image/gif' : TYPES[path.extname(url)] || 'text/plain';
    res.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'no-store' });
    res.end(body);
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  return {
    url: `http://127.0.0.1:${server.address().port}`,
    // A file of the test page: /test/<name>.
    put: (name, value) => files.set('/test/' + name, typeof value === 'string' ? value : JSON.stringify(value)),
    // How many times a file was asked for.
    hits: (url) => hits.get(url) || 0,
    close: () => new Promise((resolve) => server.close(resolve)),
  };
}
