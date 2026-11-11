import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { resolve, sep } from 'node:path';
import { pathToFileURL } from 'node:url';

const origin = 'https://pegah.no';
const decode = (value) => value.replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"');

export async function verifyBuild({ baseUrl } = {}) {
  const dist = resolve('dist');
  const readOutput = async (pathname) => {
    if (!baseUrl) return readFile(resolve(dist, pathname), 'utf8');
    const response = await fetch(new URL(pathname === 'index.html' ? './' : pathname, baseUrl), { headers: { 'User-Agent': 'OAI-SearchBot' } });
    assert.equal(response.status, 200, `HTTP failure: ${pathname}`);
    return response.text();
  };
  const html = await readOutput('index.html');
  // This simulates an HTML-only crawler: scripts, styles, and SVGs supply no portfolio text.
  const body = html.match(/<body>([\s\S]*)<\/body>/)?.[1] ?? '';
  const text = decode(body.replace(/<(script|style|svg)\b[^>]*>[\s\S]*?<\/\1>/g, '').replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ');
  for (const term of [
    'Pegah Salehi', 'Applied AI Engineer', 'I build applied AI systems',
    'Python', 'PyTorch', 'Technologies I Work With',
    'Education', 'PhD', 'UiT The Arctic University of Norway',
    'Min Sone AS', 'Simula Metropolitan', 'Truviz',
    'Projects', 'Publications', 'SinGAN-Seg', 'Comparative Analysis of Audio Feature Extraction',
  ]) {
    assert.ok(text.includes(term), `Missing crawler-readable content: ${term}`);
  }
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1, 'Expected one primary heading');
  assert.ok(!html.includes('<!--app-html-->'), 'Unrendered HTML shell');
  assert.ok(!html.includes('LoadingScreen'), 'Blocking loading screen');
  assert.match(html, /<noscript>[\s\S]*opacity:\s*1\s*!important/, 'Missing visible no-JavaScript animation fallback');

  for (const [attribute, value] of [
    ['name', 'description'], ['property', 'og:title'], ['property', 'og:description'],
    ['property', 'og:url'], ['property', 'og:image'], ['name', 'twitter:card'],
    ['name', 'twitter:title'], ['name', 'twitter:description'], ['name', 'twitter:image'],
  ]) {
    assert.equal((html.match(new RegExp(`<meta ${attribute}="${value}"`, 'g')) ?? []).length, 1, `Duplicate/missing ${value}`);
  }
  assert.equal((html.match(/<title>/g) ?? []).length, 1);
  assert.equal((html.match(/rel="canonical"/g) ?? []).length, 1);
  assert.match(html, /rel="canonical" href="https:\/\/pegah.no\/"/);
  assert.match(html, /property="og:url" content="https:\/\/pegah.no\/"/);
  const jsonScripts = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  assert.equal(jsonScripts.length, 1);
  const schema = JSON.parse(jsonScripts[0][1]);
  assert.equal(schema['@context'], 'https://schema.org');
  const person = schema['@graph'].find((entry) => entry['@type'] === 'Person');
  const website = schema['@graph'].find((entry) => entry['@type'] === 'WebSite');
  assert.equal(person.name, 'Pegah Salehi');
  assert.equal(person.jobTitle, 'Applied AI Engineer');
  assert.equal(website.url, `${origin}/`);
  assert.equal(website.about['@id'], person['@id']);

  const ids = new Set([...body.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]));
  const targets = new Set([...html.matchAll(/\b(?:href|src)="([^"]+)"/g)].map((match) => decode(match[1])));
  for (const target of targets) {
    const url = new URL(target, origin);
    if (url.origin !== origin) continue;
    if (url.hash) assert.ok(ids.has(decodeURIComponent(url.hash.slice(1))), `Broken section link: ${target}`);
    if (url.pathname === '/') continue;
    const file = resolve(dist, `.${decodeURIComponent(url.pathname)}`);
    assert.ok(file.startsWith(`${dist}${sep}`), `Asset escapes dist: ${target}`);
    await access(file).catch(() => assert.fail(`Missing local asset/link: ${target}`));
    if (baseUrl) {
      const response = await fetch(new URL(`${url.pathname}${url.search}`, baseUrl), { method: 'HEAD' });
      assert.equal(response.status, 200, `HTTP asset/link failure: ${target}`);
    }
  }
  for (const profile of person.sameAs) assert.ok(targets.has(profile), `Profile not linked in HTML: ${profile}`);
  for (const file of ['/cv/PegahResume_En.pdf', '/cv/PegahResume_No.pdf', '/Pegah_PhD_Thesis.pdf']) {
    assert.ok(targets.has(file), `Missing document link: ${file}`);
  }
  assert.match(html, /href="\/cv\/PegahResume_En.pdf" download=""/, 'CV download missing');

  const robots = await readOutput('robots.txt');
  assert.match(robots, /^Sitemap: https:\/\/pegah.no\/sitemap.xml$/m);
  const groups = robots.split(/\r?\n\s*\r?\n/).map((group) => group.toLowerCase());
  for (const bot of ['Googlebot', 'Bingbot', 'OAI-SearchBot', 'GPTBot', 'PerplexityBot']) {
    const group = groups.find((item) => new RegExp(`user-agent: ${bot.toLowerCase()}\\r?\\n`).test(item))
      ?? groups.find((item) => /user-agent: \*\r?\n/.test(item));
    assert.ok(group, `No robots rules for ${bot}`);
    assert.match(group, /allow: \/(?:\r?\n|$)/);
    assert.ok(!/disallow:\s*\S/.test(group), `Unexpected crawler restriction for ${bot}`);
  }
  const sitemap = await readOutput('sitemap.xml');
  assert.match(sitemap, /<urlset xmlns="http:\/\/www.sitemaps.org\/schemas\/sitemap\/0.9">/);
  assert.deepEqual([...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]), [`${origin}/`]);
  const llms = await readOutput('llms.txt');
  assert.ok(llms.includes(`${origin}/#projects`) && llms.includes(`${origin}/cv/PegahResume_En.pdf`));
  const notFound = await readOutput('404.html');
  assert.match(notFound, /<h1[^>]*>404<\/h1>/);
  assert.match(notFound, /name="robots" content="noindex, follow"/);
  assert.ok(!notFound.includes('rel="canonical"'));
  const config = await readFile('netlify.toml', 'utf8');
  assert.match(config, /command = "npm run build"/);
  assert.match(config, /publish = "dist"/);
  assert.match(config, /functions = "netlify\/functions"/);
  if (baseUrl) {
    for (const bot of ['Googlebot', 'Bingbot', 'OAI-SearchBot', 'GPTBot', 'PerplexityBot']) {
      const response = await fetch(baseUrl, { headers: { 'User-Agent': bot } });
      assert.equal(response.status, 200, `HTTP crawler failure: ${bot}`);
      assert.ok((await response.text()).includes('I build applied AI systems'), `Missing initial HTML for ${bot}`);
    }
  }
  console.log(`Verified static portfolio: ${text.length.toLocaleString()} readable characters, metadata, JSON-LD, ${targets.size} link/asset targets, robots, sitemap, CVs, and 404.`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const urlIndex = process.argv.indexOf('--url');
  if (urlIndex !== -1 && !process.argv[urlIndex + 1]) throw new Error('--url requires a base URL');
  await verifyBuild({ baseUrl: urlIndex === -1 ? undefined : process.argv[urlIndex + 1] });
}
