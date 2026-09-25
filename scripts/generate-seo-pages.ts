import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { treks } from '../server/data/treks.js';
import { DEFAULT_SOCIAL_IMAGE, SITE_NAME, SITE_URL, homeSchema, homeSeo, policySeo, trekSeo } from '../shared/seo.js';
import type { SeoMetadata } from '../shared/seo.js';

const outputDirectory = join(process.cwd(), 'dist');
const template = await readFile(join(outputDirectory, 'index.html'), 'utf8');

function escapeHtml(value: string) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function withSeoMetadata(html: string, metadata: SeoMetadata) {
  const canonical = `${SITE_URL}${metadata.path}`;
  const description = escapeHtml(metadata.description);
  const title = escapeHtml(metadata.title);
  const image = escapeHtml(metadata.image ?? DEFAULT_SOCIAL_IMAGE);
  const tags = [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    metadata.noindex
      ? '<meta name="robots" content="noindex, nofollow" />'
      : `<link rel="canonical" href="${escapeHtml(canonical)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:locale" content="en_IN" />`,
    `<meta property="og:url" content="${escapeHtml(canonical)}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:alt" content="${SITE_NAME} trekking and travel" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    ...(metadata.schema ? [`<script type="application/ld+json">${JSON.stringify(metadata.schema).replace(/</g, '\\u003c')}</script>`] : []),
  ].join('\n    ');

  const cleaned = html
    .replace(/<title>[\s\S]*?<\/title>/i, '')
    .replace(/<meta\s+(?:name|property)="(?:description|keywords|author|robots|og:[^"]+|twitter:[^"]+)"[^>]*\/?>/gi, '')
    .replace(/<link\s+rel="canonical"[^>]*\/?>/gi, '')
    .replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi, '');
  return cleaned.replace('</head>', `    ${tags}\n  </head>`);
}

const seoPages: Array<{ url: string; file: string; metadata: SeoMetadata }> = [
  { url: '/', file: 'seo/index.html', metadata: { ...homeSeo, schema: homeSchema } },
  { url: '/terms', file: 'seo/terms.html', metadata: policySeo.terms },
  { url: '/refund-policy', file: 'seo/refund-policy.html', metadata: policySeo.refund },
  { url: '/safety-code', file: 'seo/safety-code.html', metadata: policySeo.safety },
  {
    url: '/auth',
    file: 'seo/auth.html',
    metadata: { title: 'Sign In or Create an Account | Adventure Chaarana', description: 'Sign in or create your Adventure Chaarana account to manage your trekking and travel bookings.', path: '/auth', noindex: true },
  },
  {
    url: '/admin',
    file: 'seo/admin.html',
    metadata: { title: 'Admin Sign In | Adventure Chaarana', description: 'Sign in to manage Adventure Chaarana treks and departures.', path: '/admin', noindex: true },
  },
];

const trekSlugs = new Set<string>();
for (const trek of treks) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(trek.slug) || trekSlugs.has(trek.slug)) {
    throw new Error(`Cannot generate SEO output for invalid or duplicate trek slug: ${trek.slug}`);
  }
  trekSlugs.add(trek.slug);
  seoPages.push({ url: `/trek/${trek.slug}`, file: `seo/trek/${trek.slug}.html`, metadata: trekSeo(trek) });
}

for (const page of seoPages) {
  const filePath = join(outputDirectory, page.file);
  await mkdir(dirname(filePath), { recursive: true });
  await writeFile(filePath, withSeoMetadata(template, page.metadata));
}

const sitemapUrls = [...seoPages]
  .filter(({ metadata }) => !metadata.noindex)
  .map(({ url }) => url)
  .map((url) => `${SITE_URL}${url}`);
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...sitemapUrls.map((url) => `  <url><loc>${url}</loc></url>`),
  '</urlset>',
  '',
].join('\n');
await writeFile(join(outputDirectory, 'sitemap.xml'), sitemap);
console.log(`Generated SEO metadata pages for ${seoPages.length} routes and sitemap.xml for ${sitemapUrls.length} indexable URLs.`);
