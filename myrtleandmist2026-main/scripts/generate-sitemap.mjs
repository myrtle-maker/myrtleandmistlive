/**
 * generate-sitemap.mjs
 *
 * Reads content/ markdown directories and produces public/sitemap.xml.
 * Run via:  node scripts/generate-sitemap.mjs
 * Or automatically before every build via the "build" npm script.
 *
 * Frontmatter recognised:
 *   draft: true   → page is excluded from sitemap
 *   priority: 0.6 → overrides the default priority for that content type
 */

import { readdirSync, existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, basename } from 'path';

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const BASE_URL    = 'https://myrtleandmist.com';
const PUBLIC_DIR  = './public';
const CONTENT_DIR = './content';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Minimal YAML-ish frontmatter parser.
 * Handles string, boolean, and numeric values between --- delimiters.
 */
function parseFrontmatter(fileContent) {
  const match = fileContent.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};

  const fm = {};
  match[1].split(/\r?\n/).forEach(line => {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) return;
    const key   = line.slice(0, colonIdx).trim();
    const raw   = line.slice(colonIdx + 1).trim().replace(/^['"]|['"]$/g, '');
    fm[key] = raw === 'true'  ? true
            : raw === 'false' ? false
            : isNaN(Number(raw)) ? raw
            : Number(raw);
  });
  return fm;
}

/**
 * Returns an array of { slug, frontmatter } objects from a content directory.
 * Files with `draft: true` in their frontmatter are silently excluded.
 */
function getSlugs(dir) {
  if (!existsSync(dir)) {
    console.warn(`  ⚠  content dir not found, skipping: ${dir}`);
    return [];
  }

  return readdirSync(dir)
    .filter(f => f.endsWith('.md'))
    .map(f => {
      const slug = basename(f, '.md');
      const fm   = parseFrontmatter(readFileSync(join(dir, f), 'utf-8'));
      return fm.draft === true ? null : { slug, fm };
    })
    .filter(Boolean);
}

/**
 * Builds a single <url> XML block.
 */
function urlEntry(loc, priority, changefreq = 'monthly') {
  return [
    '  <url>',
    `    <loc>${loc}</loc>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${Number(priority).toFixed(1)}</priority>`,
    '  </url>',
  ].join('\n');
}

// ---------------------------------------------------------------------------
// Build entry list
// ---------------------------------------------------------------------------

const entries = [];

// 1. Homepage
entries.push(urlEntry(`${BASE_URL}/`, 1.0, 'weekly'));

// 2. Pillar pages (priority 0.9)
for (const slug of ['plant-care', 'plant-energy', 'apothecary']) {
  entries.push(urlEntry(`${BASE_URL}/${slug}/`, 0.9, 'weekly'));
}

// 3. Core trust pages (priority 0.5)
for (const slug of ['about', 'contact', 'privacy-policy', 'terms-of-service', 'how-we-review']) {
  entries.push(urlEntry(`${BASE_URL}/${slug}/`, 0.5, 'yearly'));
}

// 4. Plant hub — every slug generates TWO URLs (care + energy)
const plants = getSlugs(join(CONTENT_DIR, 'plants'));
console.log(`  ✓ Plants found: ${plants.length}`);
for (const { slug, fm } of plants) {
  const p = fm.priority ?? 0.8;
  entries.push(urlEntry(`${BASE_URL}/plants/${slug}/`,         p));
  entries.push(urlEntry(`${BASE_URL}/plants/${slug}/energy/`,  p));
}

// 5. Spoke guides — myrtle + mist share the same URL namespace /guides/[slug]/
//    Slugs from both sub-dirs are merged and de-duplicated.
const myrtleGuides = getSlugs(join(CONTENT_DIR, 'guides/myrtle'));
const mistGuides   = getSlugs(join(CONTENT_DIR, 'guides/mist'));

const guideMap = new Map();
for (const item of [...myrtleGuides, ...mistGuides]) {
  if (!guideMap.has(item.slug)) guideMap.set(item.slug, item.fm);
}
console.log(`  ✓ Guides found: ${guideMap.size} (${myrtleGuides.length} myrtle + ${mistGuides.length} mist, deduped)`);
for (const [slug, fm] of guideMap) {
  entries.push(urlEntry(`${BASE_URL}/guides/${slug}/`, fm.priority ?? 0.7));
}

// 6. Reviews
const reviews = getSlugs(join(CONTENT_DIR, 'reviews'));
console.log(`  ✓ Reviews found: ${reviews.length}`);
for (const { slug, fm } of reviews) {
  entries.push(urlEntry(`${BASE_URL}/reviews/${slug}/`, fm.priority ?? 0.7));
}

// ---------------------------------------------------------------------------
// Write sitemap
// ---------------------------------------------------------------------------

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>
`;

if (!existsSync(PUBLIC_DIR)) mkdirSync(PUBLIC_DIR, { recursive: true });
writeFileSync(join(PUBLIC_DIR, 'sitemap.xml'), xml, 'utf-8');

console.log(`\n✓ Sitemap written: ${entries.length} URLs → ${PUBLIC_DIR}/sitemap.xml\n`);
