import { readdir, readFile, access } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { join } from 'node:path';
async function walk(dir) {
  return (await Promise.all((await readdir(dir, {withFileTypes:true})).map(e => e.isDirectory() ? walk(join(dir,e.name)) : join(dir,e.name)))).flat();
}
const files = await walk('dist');
for (const file of files.filter(f => /\.(html|xml|txt|js|css)$/.test(f))) {
  const text = await readFile(file,'utf8');
  assert.ok(!text.includes('style-preview') && !text.includes('demo-reading-') && !text.includes('Layout placeholder only'), `Draft leaked: ${file}`);
  assert.ok(!/\bG-[A-Z0-9]{10}\b|googletagmanager|linkedin\.com/i.test(text), `Unexpected tracking/profile metadata: ${file}`);
  if (!file.endsWith('.html')) continue;
  assert.match(text, /name="author" content="Kay"/);
  assert.match(text, /property="og:site_name" content="sicklyscientist"/);
  const canonical = text.match(/rel="canonical" href="([^"]+)"/)[1];
  assert.equal(new URL(canonical).origin,'https://sicklyscientist.github.io');
  for (const match of text.matchAll(/(?:href|src|content)="([^"#]+)"/g)) {
    if (!match[1].startsWith("/") && !match[1].startsWith("https://sicklyscientist.github.io/")) continue;
    const url = new URL(match[1], canonical);
    if (url.origin !== 'https://sicklyscientist.github.io') continue;
    const path = decodeURIComponent(url.pathname);
    if (path === canonical.replace(url.origin,'' ) && match[0].startsWith('content')) continue;
    if (file === 'dist/404.html' && path === '/404/') continue;
    await access(join('dist',path.endsWith('/') ? path+'index.html' : path));
  }
}
for (const path of ['index.html','about/index.html','contact/index.html','blog/index.html','rss.xml','sitemap-index.xml','social-default.png','favicon.svg']) await access(join('dist',path));
assert.ok(!(await readFile('dist/rss.xml','utf8')).includes('<item>'), 'Starter feed should contain no draft posts');
console.log('Verified pages, local assets, canonical metadata, empty RSS, and production draft exclusion.');
