#!/usr/bin/env node
/**
 * Build search index for Fuse.js
 * Creates searchable index of all lexicon entries
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.join(__dirname, '..');
const DATA_DIR = path.join(PROJECT_ROOT, 'public', 'data');

console.log('🔍 Building search index for Fuse.js...\n');

// Load lexicon data
const lexiconPath = path.join(DATA_DIR, 'lexicon', 'strongs-index.json');

if (!fs.existsSync(lexiconPath)) {
  console.error('❌ Lexicon file not found. Run: npm run sample-data');
  process.exit(1);
}

const lexiconData = JSON.parse(fs.readFileSync(lexiconPath, 'utf-8'));

// Build search index
const searchIndex = [];

for (const strongsNum in lexiconData) {
  const entry = lexiconData[strongsNum];

  const indexEntry = {
    id: entry.strongs,
    strongs: entry.strongs,
    greek: entry.greek,
    translit: entry.translit,
    gloss: entry.gloss,
    definition: entry.definition,
    kjvTranslations: (entry.kjvTranslations || []).join(' | '),
    frequency: entry.frequency,
    // Search keywords (combined searchable text)
    searchText: [
      entry.greek,
      entry.translit,
      entry.gloss,
      entry.definition,
      (entry.kjvTranslations || []).join(' '),
      `G${entry.strongs}`,
    ]
      .join(' ')
      .toLowerCase(),
  };

  searchIndex.push(indexEntry);
}

// Write index to file
const indexPath = path.join(DATA_DIR, 'search-index.json');
fs.writeFileSync(indexPath, JSON.stringify(searchIndex, null, 2));

console.log(`✅ Search index built`);
console.log(`   Entries: ${searchIndex.length}`);
console.log(`   Location: ${indexPath}\n`);

// Also create a minimal index for quick stats
const statsPath = path.join(DATA_DIR, 'search-stats.json');
const stats = {
  totalEntries: searchIndex.length,
  buildDate: new Date().toISOString(),
  sources: ['OpenGNT', 'Strong\'s Dictionary', 'STEPBible'],
  fields: ['greek', 'translit', 'gloss', 'definition', 'kjvTranslations', 'strongs'],
};

fs.writeFileSync(statsPath, JSON.stringify(stats, null, 2));

console.log('✅ Search statistics written');
console.log(`   Location: ${statsPath}\n`);

console.log('Ready to search! The search index is optimized for Fuse.js.');
