import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siteUrl = 'https://greek-nt-study.netlify.app';

// NT Books and chapters
const books = {
  matthew: 28,
  mark: 16,
  luke: 24,
  john: 21,
  acts: 28,
  romans: 16,
  '1-corinthians': 16,
  '2-corinthians': 13,
  galatians: 6,
  ephesians: 6,
  philippians: 4,
  colossians: 4,
  '1-thessalonians': 5,
  '2-thessalonians': 3,
  '1-timothy': 6,
  '2-timothy': 4,
  titus: 3,
  philemon: 1,
  hebrews: 13,
  james: 5,
  '1-peter': 5,
  '2-peter': 3,
  '1-john': 5,
  '2-john': 1,
  '3-john': 1,
  jude: 1,
  revelation: 22,
};

// Core pages
const corePages = [
  '',
  'reader',
  'reader/matthew/1',
  'grammar',
  'grammar/lessons/01-alphabet',
  'grammar/lessons/04-first-declension',
  'grammar/lessons/30-textual-criticism',
  'search',
  'tools',
  'tools/progressive-reader',
  'tools/verbal-aspect',
  'tools/frequency-map',
  'tools/sentence-analyzer',
  'tools/lxx-comparison',
  'tools/textual-notes',
];

// Generate all reader pages
const readerPages = [];
Object.entries(books).forEach(([book, chapters]) => {
  for (let ch = 1; ch <= chapters; ch++) {
    readerPages.push(`reader/${book}/${ch}`);
  }
});

// Generate all grammar lesson pages
const grammarPages = [];
for (let i = 1; i <= 30; i++) {
  const lesson = String(i).padStart(2, '0');
  grammarPages.push(`grammar/lessons/${lesson}-*`); // Placeholder
}

// Combine and create URL entries
const allPages = [...corePages, ...readerPages];
const urls = allPages
  .filter((page) => !page.includes('*'))
  .map((page) => ({
    url: page ? `${siteUrl}/${page}` : siteUrl,
    priority: page === '' ? '1.0' : page.startsWith('reader/') ? '0.8' : page.startsWith('grammar/') ? '0.7' : '0.6',
    changefreq: page.startsWith('reader/') || page.startsWith('grammar/') ? 'weekly' : 'monthly',
  }));

// Generate XML
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (entry) => `  <url>
    <loc>${entry.url}</loc>
    <priority>${entry.priority}</priority>
    <changefreq>${entry.changefreq}</changefreq>
  </url>`
  )
  .join('\n')}
</urlset>`;

// Write sitemap
const distDir = path.join(__dirname, '../dist');
await fs.writeFile(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf-8');

console.log(`✓ Generated sitemap.xml with ${urls.length} URLs`);
