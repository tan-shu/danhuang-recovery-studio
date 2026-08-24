import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url));
const dist = join(root, 'dist');
const staticFiles = [
  'index.html',
  'app.js',
  'styles.css',
  'workspace.css',
  'auth.css',
  'plan.css',
  'admin.css',
  'compliance.css',
  'preview.css',
];

await rm(dist, { recursive: true, force: true });
await mkdir(join(dist, 'server'), { recursive: true });

await Promise.all(staticFiles.map((file) => cp(join(root, file), join(dist, file))));
await cp(join(root, 'public'), join(dist, 'public'), { recursive: true });

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
};
const assetEntries = await Promise.all(staticFiles.map(async (file) => {
  const extension = file.slice(file.lastIndexOf('.'));
  return [`/${file}`, { body: await readFile(join(root, file), 'utf8'), contentType: contentTypes[extension], encoding: 'text' }];
}));
const heroPath = 'public/assets/rehab-consultation-hero.png';
assetEntries.push([`/${heroPath}`, { body: (await readFile(join(root, heroPath))).toString('base64'), contentType: 'image/png', encoding: 'base64' }]);

const assetManifest = JSON.stringify(Object.fromEntries(assetEntries));
await writeFile(join(dist, 'server', 'index.js'), `const assets = ${assetManifest};\n\nfunction decodeBase64(value) {\n  const binary = atob(value);\n  const bytes = new Uint8Array(binary.length);\n  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);\n  return bytes;\n}\n\nexport default {\n  async fetch(request) {\n    if (!['GET', 'HEAD'].includes(request.method)) {\n      return new Response('Method not allowed', { status: 405, headers: { allow: 'GET, HEAD' } });\n    }\n\n    const url = new URL(request.url);\n    const path = url.pathname === '/' ? '/index.html' : url.pathname;\n    const asset = assets[path] || assets['/index.html'];\n    const body = request.method === 'HEAD' ? null : asset.encoding === 'base64' ? decodeBase64(asset.body) : asset.body;\n    return new Response(body, {\n      status: 200,\n      headers: {\n        'content-type': asset.contentType,\n        'cache-control': path === '/index.html' ? 'no-cache' : 'public, max-age=3600',\n        'x-content-type-options': 'nosniff',\n      },\n    });\n  },\n};\n`);
