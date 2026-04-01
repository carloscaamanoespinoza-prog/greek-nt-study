#!/usr/bin/env node
/**
 * Generate sample Greek NT data for testing
 * Creates real text from John 3:16 and surrounding passages
 * Useful for rapid development without full data download
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { decodeRMAC } from './utils/rmac-decoder.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.join(__dirname, '..');
const DATA_DIR = path.join(PROJECT_ROOT, 'public', 'data');

console.log('🔧 Generating sample Greek NT data for testing...\n');

// Sample data from John 3:14-21 (real Greek text)
const sampleData = {
  john: {
    3: {
      book: 'john',
      chapter: 3,
      verses: [
        {
          verse: 14,
          words: [
            {
              id: '64003014001',
              text: 'καὶ',
              punct: '',
              lemma: 'καί',
              strongs: 2532,
              rmac: 'CONJ',
              morph: { posCode: 'CONJ', pos: 'conjunction' },
              gloss: 'and',
              freq: 9154,
            },
            {
              id: '64003014002',
              text: 'καθὼς',
              punct: '',
              lemma: 'καθώς',
              strongs: 2531,
              rmac: 'ADV',
              morph: { posCode: 'ADV', pos: 'adverb' },
              gloss: 'just as',
              freq: 182,
            },
            {
              id: '64003014003',
              text: 'Μωϋσῆς',
              punct: '',
              lemma: 'Μωϋσῆς',
              strongs: 3475,
              rmac: 'N-NSM',
              morph: {
                posCode: 'N-NSM',
                pos: 'noun',
                case: 'nominative',
                number: 'singular',
                gender: 'masculine',
              },
              gloss: 'Moses',
              freq: 80,
            },
            {
              id: '64003014004',
              text: 'ὕψωσεν',
              punct: '',
              lemma: 'ὑψόω',
              strongs: 5312,
              rmac: 'V-AAI-3S',
              morph: {
                posCode: 'V-AAI-3S',
                pos: 'verb',
                tense: 'aorist',
                voice: 'active',
                mood: 'indicative',
                person: 'third',
                number: 'singular',
              },
              gloss: 'lifted up',
              freq: 20,
            },
          ],
        },
        {
          verse: 15,
          words: [
            {
              id: '64003015001',
              text: 'ἵνα',
              punct: '',
              lemma: 'ἵνα',
              strongs: 2443,
              rmac: 'CONJ',
              morph: { posCode: 'CONJ', pos: 'conjunction' },
              gloss: 'in order that',
              freq: 663,
            },
            {
              id: '64003015002',
              text: 'πᾶς',
              punct: '',
              lemma: 'πᾶς',
              strongs: 3956,
              rmac: 'A-NSM',
              morph: {
                posCode: 'A-NSM',
                pos: 'adjective',
                case: 'nominative',
                number: 'singular',
                gender: 'masculine',
              },
              gloss: 'everyone',
              freq: 1243,
            },
            {
              id: '64003015003',
              text: 'ὁ',
              punct: '',
              lemma: 'ὁ',
              strongs: 3588,
              rmac: 'D-NSM',
              morph: {
                posCode: 'D-NSM',
                pos: 'definite-article',
                case: 'nominative',
                number: 'singular',
                gender: 'masculine',
              },
              gloss: 'the',
              freq: 19783,
            },
            {
              id: '64003015004',
              text: 'πιστεύων',
              punct: '',
              lemma: 'πιστεύω',
              strongs: 4100,
              rmac: 'V-PAP-NSM',
              morph: {
                posCode: 'V-PAP-NSM',
                pos: 'verb',
                tense: 'present',
                voice: 'active',
                mood: 'participle',
                case: 'nominative',
                number: 'singular',
                gender: 'masculine',
              },
              gloss: 'believing',
              freq: 248,
            },
          ],
        },
        {
          verse: 16,
          words: [
            {
              id: '64003016001',
              text: 'Οὕτως',
              punct: '',
              lemma: 'οὕτως',
              strongs: 3779,
              rmac: 'ADV',
              morph: { posCode: 'ADV', pos: 'adverb' },
              gloss: 'thus, so',
              freq: 208,
            },
            {
              id: '64003016002',
              text: 'γὰρ',
              punct: '',
              lemma: 'γάρ',
              strongs: 1063,
              rmac: 'CONJ',
              morph: { posCode: 'CONJ', pos: 'conjunction' },
              gloss: 'for',
              freq: 1041,
            },
            {
              id: '64003016003',
              text: 'ἠγάπησεν',
              punct: '',
              lemma: 'ἀγαπάω',
              strongs: 25,
              rmac: 'V-AAI-3S',
              morph: {
                posCode: 'V-AAI-3S',
                pos: 'verb',
                tense: 'aorist',
                voice: 'active',
                mood: 'indicative',
                person: 'third',
                number: 'singular',
              },
              gloss: 'he loved',
              freq: 143,
            },
            {
              id: '64003016004',
              text: 'ὁ',
              punct: '',
              lemma: 'ὁ',
              strongs: 3588,
              rmac: 'D-NSM',
              morph: {
                posCode: 'D-NSM',
                pos: 'definite-article',
                case: 'nominative',
                number: 'singular',
                gender: 'masculine',
              },
              gloss: 'the',
              freq: 19783,
            },
            {
              id: '64003016005',
              text: 'Θεὸς',
              punct: '',
              lemma: 'θεός',
              strongs: 2316,
              rmac: 'N-NSM',
              morph: {
                posCode: 'N-NSM',
                pos: 'noun',
                case: 'nominative',
                number: 'singular',
                gender: 'masculine',
              },
              gloss: 'God',
              freq: 1320,
            },
          ],
        },
        {
          verse: 17,
          words: [
            {
              id: '64003017001',
              text: 'ὥστε',
              punct: '',
              lemma: 'ὥστε',
              strongs: 5620,
              rmac: 'CONJ',
              morph: { posCode: 'CONJ', pos: 'conjunction' },
              gloss: 'so that',
              freq: 83,
            },
            {
              id: '64003017002',
              text: 'τὸν',
              punct: '',
              lemma: 'ὁ',
              strongs: 3588,
              rmac: 'D-ASM',
              morph: {
                posCode: 'D-ASM',
                pos: 'definite-article',
                case: 'accusative',
                number: 'singular',
                gender: 'masculine',
              },
              gloss: 'the',
              freq: 19783,
            },
            {
              id: '64003017003',
              text: 'υἱὸν',
              punct: '',
              lemma: 'υἱός',
              strongs: 5207,
              rmac: 'N-ASM',
              morph: {
                posCode: 'N-ASM',
                pos: 'noun',
                case: 'accusative',
                number: 'singular',
                gender: 'masculine',
              },
              gloss: 'son',
              freq: 377,
            },
          ],
        },
      ],
    },
  },
};

// Write sample data
const textDir = path.join(DATA_DIR, 'text');
fs.mkdirSync(textDir, { recursive: true });

const johnDir = path.join(textDir, 'john');
fs.mkdirSync(johnDir, { recursive: true });

const chapterFile = path.join(johnDir, '3.json');
fs.writeFileSync(chapterFile, JSON.stringify(sampleData.john[3], null, 2));

console.log('✅ Sample data generated:');
console.log(`   John 3:14-17 (4 verses, 20 words)`);
console.log(`   Location: ${chapterFile}\n`);

// Also generate a sample lexicon entry
const lexiconDir = path.join(DATA_DIR, 'lexicon');
fs.mkdirSync(lexiconDir, { recursive: true });

const strongsIndex = {
  25: {
    strongs: 25,
    greek: 'ἀγαπάω',
    translit: 'agapaō',
    pronunciation: 'ag-ap-ah'-o',
    gloss: 'to love',
    definition:
      'To love, to be fond of, to love dearly. Used of the highest kind of love, divine love.',
    kjvTranslations: ['love', 'beloved'],
    etymology: {
      roots: [],
      cognates: [26, 27],
      derivedWords: [26],
      historicalNote:
        'Common in Koine Greek for divine and Christian love (agape). Appears 143 times in the NT.',
    },
    frequency: 143,
  },
  2316: {
    strongs: 2316,
    greek: 'θεός',
    translit: 'theos',
    pronunciation: 'theh'-os',
    gloss: 'God',
    definition: 'God. The divine being, the supreme ruler and creator.',
    kjvTranslations: ['God', 'god'],
    etymology: {
      roots: [],
      cognates: [],
      derivedWords: [2317, 2318],
      historicalNote: 'The Greek word for the divine being. Central to NT theology.',
    },
    frequency: 1320,
  },
  4100: {
    strongs: 4100,
    greek: 'πιστεύω',
    translit: 'pisteuō',
    pronunciation: 'pis-tyoo'-o',
    gloss: 'to believe, trust',
    definition:
      'To believe, to trust, to have confidence in. Often followed by εἰς (into) with accusative.',
    kjvTranslations: ['believe', 'trust', 'commit'],
    etymology: {
      roots: [4102],
      cognates: [],
      derivedWords: [4101, 4103],
      historicalNote:
        'Key concept in NT soteriology. Represents faith and trust in God/Christ.',
    },
    frequency: 248,
  },
};

const strongsIndexPath = path.join(lexiconDir, 'strongs-index.json');
fs.writeFileSync(strongsIndexPath, JSON.stringify(strongsIndex, null, 2));

console.log('✅ Sample lexicon generated:');
console.log(`   3 entries (agapaō, theos, pisteuō)`);
console.log(`   Location: ${strongsIndexPath}\n`);

// Generate concordance index sample
const concordanceDir = path.join(DATA_DIR, 'concordance');
fs.mkdirSync(concordanceDir, { recursive: true });

const concordanceIndex = {
  'ἀγαπάω': ['John 3:16', 'John 3:19', 'John 5:20'],
  θεός: ['John 1:1', 'John 1:2', 'John 3:16'],
  πιστεύω: ['John 1:12', 'John 3:15', 'John 3:16'],
};

const concordancePath = path.join(concordanceDir, 'index.json');
fs.writeFileSync(concordancePath, JSON.stringify(concordanceIndex, null, 2));

console.log('✅ Sample concordance generated');
console.log(`   Location: ${concordancePath}\n`);

console.log('🎉 Sample data ready for testing!');
console.log('\nYou can now run: npm run dev');
console.log('And test the app with John 3:14-17\n');
