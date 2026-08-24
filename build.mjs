import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { extname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url));
const dist = join(root, 'dist');
const webRoot = join(root, 'uniapp', 'dist', 'build', 'h5');
const serverRoot = join(dist, 'server');

await rm(dist, { recursive: true, force: true });
await mkdir(serverRoot, { recursive: true });

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
};

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const paths = await Promise.all(entries.map((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  }));
  return paths.flat();
}

const textExtensions = new Set(['.html', '.js', '.css', '.json', '.svg', '.txt', '.map']);
const assetEntries = await Promise.all((await walk(webRoot)).map(async (path) => {
  const extension = extname(path).toLowerCase();
  const route = `/${relative(webRoot, path).split(sep).join('/')}`;
  const isText = textExtensions.has(extension);
  const data = await readFile(path);
  return [route, {
    body: isText ? data.toString('utf8') : data.toString('base64'),
    contentType: contentTypes[extension] || 'application/octet-stream',
    encoding: isText ? 'text' : 'base64',
  }];
}));

const assetManifest = JSON.stringify(Object.fromEntries(assetEntries));
await writeFile(join(serverRoot, 'index.js'), `const assets = ${assetManifest};\n\nfunction decodeBase64(value) {\n  const binary = atob(value);\n  const bytes = new Uint8Array(binary.length);\n  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);\n  return bytes;\n}\n\nexport default {\n  async fetch(request) {\n    if (!['GET', 'HEAD'].includes(request.method)) {\n      return new Response('Method not allowed', { status: 405, headers: { allow: 'GET, HEAD' } });\n    }\n\n    const url = new URL(request.url);\n    const path = url.pathname === '/' ? '/index.html' : url.pathname;\n    const asset = assets[path] || assets['/index.html'];\n    const body = request.method === 'HEAD' ? null : asset.encoding === 'base64' ? decodeBase64(asset.body) : asset.body;\n    return new Response(body, {\n      status: 200,\n      headers: {\n        'content-type': asset.contentType,\n        'cache-control': path === '/index.html' ? 'no-cache' : 'public, max-age=3600',\n        'x-content-type-options': 'nosniff',\n      },\n    });\n  },\n};\n`);
