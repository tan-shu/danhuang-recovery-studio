import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
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
];

await rm(dist, { recursive: true, force: true });
await mkdir(join(dist, 'server'), { recursive: true });

await Promise.all(staticFiles.map((file) => cp(join(root, file), join(dist, file))));
await cp(join(root, 'public'), join(dist, 'public'), { recursive: true });

await writeFile(join(dist, 'server', 'index.js'), `export default {\n  async fetch(request, env) {\n    if (env.ASSETS?.fetch) return env.ASSETS.fetch(request);\n    return new Response('Static assets binding is unavailable.', { status: 503 });\n  },\n};\n`);
