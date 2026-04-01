#!/usr/bin/env node
/**
 * Parse OpenGNT CSV and convert to JSON by chapter
 * OpenGNT provides Greek NT with complete morphological analysis
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Papa from 'papaparse';
import { decodeRMAC } from './utils/rmac-decoder.mjs';
import { NT_BOOKS, getBook } from './utils/book-info.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.join(__dirname, '..');
const DATA_DIR = path.join(PROJECT_ROOT, 'public', 'data');
const SOURCES_DIR = path.join(PROJECT_ROOT, 'data-sources');
const OPENGNT_DIR = path.join(SOURCES_DIR, 'OpenGNT');

console.log('📖 Parsing OpenGNT CSV to JSON...\n');

// Find the OpenGNT data file
const csvPath = path.join(
  OPENGNT_DIR,
  'OpenGNT_keyedFeatures.csv'
);

if (!fs.existsSync(csvPath)) {
  console.error('❌ OpenGNT CSV not found at:', csvPath);
  console.error('   Run: npm run download-sources');
  process.exit(1);
}

console.log(`📂 Reading: ${csvPath}`);

try {
  // Read and parse CSV
  const csvContent = fs.readFileSync(csvPath, 'utf-8');

  // Parse CSV with headers
  const parseResult = Papa.parse(csvContent, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: false,
  });

  const rows = parseResult.data;
  console.log(`   Found ${rows.length} word entries\n`);

  // Group by book/chapter
  const bookChapters = {};

  for (const row of rows) {
    // Extract fields (column names from OpenGNT)
    const bookNum = parseInt(row.BOOK, 10);
    const chapter = parseInt(row.CHAPTER, 10);
    const verse = parseInt(row.VERSE, 10);
    const position = parseInt(row.OGNTsort, 10) % 100; // Position in verse

    // Find book by number
    const book = NT_BOOKS.find((b) => b.order === bookNum);
    if (!book) {
      console.warn(`⚠️  Unknown book number: ${bookNum}`);
      continue;
    }

    const bookId = book.id;

    // Initialize book structure
    if (!bookChapters[bookId]) {
      bookChapters[bookId] = {};
    }

    if (!bookChapters[bookId][chapter]) {
      bookChapters[bookId][chapter] = {
        book: bookId,
        chapter: chapter,
        verses: {},
      };
    }

    if (!bookChapters[bookId][chapter].verses[verse]) {
      bookChapters[bookId][chapter].verses[verse] = {
        verse: verse,
        words: [],
      };
    }

    // Parse morphology
    const rmac = row.rmac || 'X';
    const morph = decodeRMAC(rmac);

    // Create word token
    const wordToken = {
      id: `${bookNum}${String(chapter).padStart(3, '0')}${String(verse).padStart(3, '0')}${String(position).padStart(3, '0')}`,
      text: row.OGNTk || '', // Greek text with diacritics
      punct: row.OGNTb || '', // Punctuation
      lemma: row.lexeme || '', // Lemma
      strongs: parseInt(row.sn, 10) || null, // Strong's number
      rmac: rmac, // RMAC code
      morph: morph, // Parsed morphology
      gloss: row.MounceGlosses || row.GlossEnglish || '', // English gloss
      freq: parseInt(row.FreqN, 10) || 0, // Frequency
    };

    bookChapters[bookId][chapter].verses[verse].words.push(wordToken);
  }

  // Convert verses object to array for each chapter
  for (const bookId in bookChapters) {
    for (const chapter in bookChapters[bookId]) {
      const verseObj = bookChapters[bookId][chapter].verses;
      bookChapters[bookId][chapter].verses = Object.values(verseObj).sort(
        (a, b) => a.verse - b.verse
      );
    }
  }

  // Write JSON files by chapter
  const textDir = path.join(DATA_DIR, 'text');
  fs.mkdirSync(textDir, { recursive: true });

  let totalWords = 0;
  const stats = {};

  for (const bookId in bookChapters) {
    const bookDir = path.join(textDir, bookId);
    fs.mkdirSync(bookDir, { recursive: true });

    stats[bookId] = { chapters: 0, words: 0 };

    for (const chapter in bookChapters[bookId]) {
      const chapterData = bookChapters[bookId][chapter];
      let chapterWords = 0;

      // Count words
      for (const verse of chapterData.verses) {
        chapterWords += verse.words.length;
      }

      stats[bookId].chapters++;
      stats[bookId].words += chapterWords;
      totalWords += chapterWords;

      const chapterFile = path.join(bookDir, `${chapter}.json`);
      fs.writeFileSync(chapterFile, JSON.stringify(chapterData, null, 2));
    }

    console.log(
      `✅ ${bookId.padEnd(20)} ${stats[bookId].chapters} chapters, ${stats[bookId].words.toLocaleString()} words`
    );
  }

  // Write summary
  const summaryPath = path.join(DATA_DIR, 'summary.json');
  fs.writeFileSync(
    summaryPath,
    JSON.stringify(
      {
        totalBooks: Object.keys(bookChapters).length,
        totalWords: totalWords,
        byBook: stats,
        processedAt: new Date().toISOString(),
      },
      null,
      2
    )
  );

  console.log(`\n✅ OpenGNT parsing complete!`);
  console.log(`   Total: ${Object.keys(bookChapters).length} books, ${totalWords.toLocaleString()} words`);
  console.log(`   Output: ${textDir}\n`);
} catch (error) {
  console.error('❌ Error parsing OpenGNT:', error.message);
  process.exit(1);
}
