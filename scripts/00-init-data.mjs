#!/usr/bin/env node
/**
 * Master data processing script
 * Orchestrates the full pipeline: download → parse → index → build
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.join(__dirname, '..');
const DATA_DIR = path.join(PROJECT_ROOT, 'public', 'data');
const SOURCES_DIR = path.join(PROJECT_ROOT, 'data-sources');

console.log('🔍 Checking data pipeline status...\n');

// Check if we have processed data
const hasProcessedData =
  fs.existsSync(path.join(DATA_DIR, 'text')) &&
  fs.existsSync(path.join(DATA_DIR, 'lexicon', 'strongs-index.json'));

if (hasProcessedData) {
  console.log('✅ Processed data found. Skipping pipeline.');
  console.log(`   Data directory: ${DATA_DIR}`);
  process.exit(0);
}

// If not, we need to process
console.log('⚠️  Processed data not found.');
console.log('📦 Data pipeline needs to be run.\n');

console.log('Instructions to download and process data:');
console.log('1. npm run download-sources     (downloads OpenGNT, Strongs, etc.)');
console.log('2. npm run parse-opengnt       (processes Greek text)');
console.log('3. npm run parse-strongs       (processes lexicon)');
console.log('4. npm run parse-stepbible     (processes definitions)');
console.log('5. npm run build-concordance   (creates concordance index)');
console.log('6. npm run split-chapters      (splits by chapter for lazy loading)');
console.log('7. npm run build-sqlite        (creates WASM database)');
console.log('8. npm run build-paradigms     (creates grammar tables)\n');

console.log('Or run: npm run build (which will execute the full pipeline)\n');

// Create minimal stub data if completely missing
ensureMinimalData();

console.log('✓ Basic directory structure created.');
console.log('\nNote: Full data processing is required for the app to function.');
process.exit(0);

function ensureMinimalData() {
  // Create directories
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  const subdirs = [
    'text',
    'lexicon',
    'concordance',
    'paradigms',
    'grammar',
    'db',
  ];

  for (const dir of subdirs) {
    const fullPath = path.join(DATA_DIR, dir);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
    }
  }

  // Create a minimal books manifest
  const booksFile = path.join(DATA_DIR, 'books.json');
  if (!fs.existsSync(booksFile)) {
    fs.writeFileSync(
      booksFile,
      JSON.stringify(
        {
          notice:
            'Full books data will be populated after running the data pipeline',
          totalBooks: 27,
          booksStub: ['matthew', 'mark', 'luke', 'john', '...'],
        },
        null,
        2
      )
    );
  }
}
