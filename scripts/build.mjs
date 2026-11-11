import { build } from 'vite';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { resolve, sep } from 'node:path';
import { pathToFileURL } from 'node:url';
import { verifyBuild } from './verify-build.mjs';

const modeIndex = process.argv.indexOf('--mode');
const mode = modeIndex === -1 ? 'production' : process.argv[modeIndex + 1];
if (!mode) throw new Error('--mode requires a value');

// Share time-dependent markup between the client and server bundles.
const define = { 'import.meta.env.BUILD_YEAR': JSON.stringify(new Date().getFullYear()) };
await build({ mode, define });

// Keep the temporary server bundle outside dist, with access to installed dependencies.
const serverDirectory = await mkdtemp(resolve('node_modules/.portfolio-prerender-'));
try {
  await build({
    mode,
    define,
    build: {
      ssr: 'src/entry-server.tsx',
      outDir: serverDirectory,
      copyPublicDir: false,
      rollupOptions: { output: { entryFileNames: 'entry-server.mjs' } },
    },
  });
  const { render, structuredData } = await import(pathToFileURL(resolve(serverDirectory, 'entry-server.mjs')).href);
  const template = await readFile('dist/index.html', 'utf8');
  if (!template.includes('<!--app-html-->') || !template.includes('<!--structured-data-->')) {
    throw new Error('Missing prerender placeholders in the Vite HTML template');
  }

  const json = JSON.stringify(structuredData).replace(/</g, '\\u003c');
  const home = template
    .replace('<!--app-html-->', () => render('/'))
    .replace('<!--structured-data-->', () => `<script type="application/ld+json">${json}</script>`);
  await writeFile('dist/index.html', home);

  // A real static 404 avoids treating unknown URLs as duplicate portfolio pages.
  const notFound = template
    .replace('<!--app-html-->', () => render('/404.html'))
    .replace('<!--structured-data-->', '<meta name="robots" content="noindex, follow" />')
    .replace(/<title>.*?<\/title>/, '<title>Page not found - Pegah Salehi</title>')
    .replace(/<link rel="canonical"[^>]*>/, '')
    .replace(/<meta (?:property="og:[^"]+"|name="twitter:[^"]+")[^>]*>/g, '')
    .replace(/(<meta name="description" content=")[^"]*/, '$1Page not found. Return to Pegah Salehi’s portfolio.');
  await writeFile('dist/404.html', notFound);
  await verifyBuild();
} finally {
  if (!serverDirectory.startsWith(`${resolve('node_modules')}${sep}.portfolio-prerender-`)) {
    throw new Error('Refusing to remove a directory outside the prerender cache');
  }
  await rm(serverDirectory, { recursive: true, force: true });
}
