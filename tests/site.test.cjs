const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const routes = ['index.html', 'about.html', 'join.html', 'history.html'];
const joinUrl = 'https://linktr.ee/sfhsoperationsmile';

// A small tokenizer is sufficient for this project's static, quoted HTML attributes.
// Browser behavior and layout are verified separately; these checks guard edit errors.
function parse(source) {
  const tags = [];
  for (const match of source.replace(/<!--[\s\S]*?-->/g, '').matchAll(/<([a-z][\w-]*)\b([^<>]*)>/gi)) {
    const attrs = {};
    for (const attr of match[2].matchAll(/([\w:-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g)) {
      attrs[attr[1].toLowerCase()] = attr[2] ?? attr[3] ?? attr[4] ?? '';
    }
    tags.push({ tag: match[1].toLowerCase(), attrs, index: match.index });
  }
  return tags;
}

const pages = new Map(routes.map(route => {
  const source = fs.readFileSync(path.join(root, route), 'utf8');
  return [route, { source, tags: parse(source) }];
}));
const hasClass = (element, name) => (element.attrs.class || '').split(/\s+/).includes(name);

test('Every route has an English document, one main landmark, and one top heading', () => {
  for (const [route, { tags }] of pages) {
    assert.equal(tags.find(t => t.tag === 'html')?.attrs.lang, 'en', route);
    assert.equal(tags.filter(t => t.tag === 'main').length, 1, route);
    assert.equal(tags.filter(t => t.tag === 'h1').length, 1, route);
    assert(tags.some(t => t.tag === 'meta' && t.attrs.charset?.toLowerCase() === 'utf-8'), route);
    assert(tags.some(t => t.tag === 'meta' && t.attrs.name === 'viewport'), route);
    const headings = tags.filter(t => /^h[1-6]$/.test(t.tag));
    for (let i = 1; i < headings.length; i++) {
      assert(Number(headings[i].tag[1]) <= Number(headings[i - 1].tag[1]) + 1,
        `${route}: heading skips a level before ${headings[i].attrs.id || headings[i].tag}`);
    }
  }
});

test('IDs are unique and ARIA relationships resolve on every page', () => {
  for (const [route, { tags }] of pages) {
    const ids = tags.filter(t => t.attrs.id).map(t => t.attrs.id);
    assert.equal(new Set(ids).size, ids.length, `${route}: duplicate IDs`);
    for (const { attrs } of tags) {
      for (const key of ['aria-controls', 'aria-labelledby', 'aria-describedby']) {
        for (const id of (attrs[key] || '').split(/\s+/).filter(Boolean)) {
          assert(ids.includes(id), `${route}: unresolved ${key}="${id}"`);
        }
      }
    }
  }
});

test('Local navigation, fragments, images, scripts, stylesheets, and CSS assets exist', () => {
  for (const [route, { tags }] of pages) {
    for (const { attrs } of tags) {
      for (const key of ['href', 'src']) {
        const value = attrs[key];
        if (!value || /^(?:[a-z][\w+.-]*:|\/\/)/i.test(value)) continue;
        const target = new URL(value, `https://local.invalid/${route}`);
        const relative = decodeURIComponent(target.pathname).slice(1);
        assert(fs.existsSync(path.join(root, relative)), `${route}: missing ${value}`);
        if (target.hash && pages.has(relative)) {
          const id = decodeURIComponent(target.hash.slice(1));
          assert(pages.get(relative).tags.some(t => t.attrs.id === id), `${route}: missing fragment ${value}`);
        }
      }
    }
  }
  for (const filename of fs.readdirSync(path.join(root, 'css')).filter(n => n.endsWith('.css'))) {
    const source = fs.readFileSync(path.join(root, 'css', filename), 'utf8');
    for (const match of source.matchAll(/url\(\s*["']?([^\s)'"\n]+)/g)) {
      if (/^(?:[a-z][\w+.-]*:|\/\/|#)/i.test(match[1])) continue;
      assert(fs.existsSync(path.resolve(root, 'css', match[1])), `${filename}: missing ${match[1]}`);
    }
  }
});

test('Primary navigation connects the four distinct pages and identifies the current page', () => {
  for (const [route, { source }] of pages) {
    const nav = source.match(/<nav\b[^>]*id="primary-navigation"[^>]*>([\s\S]*?)<\/nav>/i);
    assert(nav, route);
    const links = parse(nav[1]).filter(t => t.tag === 'a');
    for (const target of routes) assert(links.some(t => t.attrs.href === target), `${route}: missing ${target}`);
    const current = links.filter(t => t.attrs['aria-current'] === 'page');
    assert.equal(current.length, 1, route);
    assert.equal(current[0].attrs.href, route, route);
  }
});

test('Join links use the supplied chapter URL, a new tab, and safe rel attributes', () => {
  for (const [route, { source, tags }] of pages) {
    const joins = tags.filter(t => t.tag === 'a' && t.attrs.href === joinUrl);
    assert(joins.length >= 3, `${route}: missing shared Join calls to action`);
    for (const { attrs } of tags.filter(t => t.tag === 'a' && t.attrs.target === '_blank')) {
      const rel = new Set((attrs.rel || '').split(/\s+/));
      assert(rel.has('noopener') && rel.has('noreferrer'), `${route}: unsafe external link ${attrs.href}`);
    }
    for (const { attrs } of joins) assert.equal(attrs.target, '_blank', route);
    for (const match of source.matchAll(/<a\b([^>]+)>([\s\S]*?)<\/a>/gi)) {
      const label = match[2].replace(/<[^>]+>/g, ' ').trim();
      if (/^Join (?:Now|Our Chapter)\b/i.test(label)) {
        assert.equal(parse(`<a ${match[1]}>`)[0].attrs.href, joinUrl, `${route}: incorrect Join destination`);
      }
    }
  }
});

test('Required chapter content remains available in static HTML', () => {
  const home = pages.get('index.html');
  const about = pages.get('about.html');
  const history = pages.get('history.html');
  assert.equal(home.tags.filter(t => hasClass(t, 'highlight-slide')).length, 3);
  assert.equal(about.tags.filter(t => hasClass(t, 'officer-profile')).length, 5);
  assert.equal(history.tags.filter(t => hasClass(t, 'milestone')).length, 10);
  assert(home.source.includes('40K+'));
  assert.equal((home.source.match(/200\+/g) || []).length, 2);
  for (const profile of about.source.matchAll(/<article\b[^>]*class="officer-profile[^"]*"[^>]*>([\s\S]*?)<\/article>/g)) {
    assert(profile[1].indexOf('<h3') < profile[1].indexOf('<img'), 'Officer name must precede portrait');
  }
  for (const [route, { tags }] of pages) {
    for (const { attrs } of tags.filter(t => t.tag === 'img')) {
      assert('alt' in attrs, `${route}: image has no alt attribute`);
      assert(Number(attrs.width) > 0 && Number(attrs.height) > 0, `${route}: image dimensions missing`);
    }
  }
});

test('Local font assets are WOFF2 binaries with their redistribution licenses', () => {
  for (const family of ['Inter', 'Nunito']) {
    const font = fs.readFileSync(path.join(root, 'assets/fonts', `${family.toLowerCase()}-latin-variable.woff2`));
    assert.equal(font.subarray(0, 4).toString('ascii'), 'wOF2', family);
    const license = fs.readFileSync(path.join(root, 'assets/fonts', `${family}-OFL.txt`), 'utf8');
    assert(license.includes('SIL Open Font License'), family);
  }
});
