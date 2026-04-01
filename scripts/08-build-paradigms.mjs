#!/usr/bin/env node
/**
 * Build paradigm tables for Greek grammar
 * Creates declension and conjugation tables with real NT examples
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.join(__dirname, '..');
const DATA_DIR = path.join(PROJECT_ROOT, 'public', 'data');
const PARADIGMS_DIR = path.join(DATA_DIR, 'paradigms');

// Create paradigms directory if it doesn't exist
fs.mkdirSync(PARADIGMS_DIR, { recursive: true });

console.log('🔨 Building Greek paradigm tables...\n');

// 1. First Declension - ἀγάπη (feminine)
const firstDeclensionFeminine = {
  name: 'First Declension - ἀγάπη (Feminine)',
  description: 'First declension nouns ending in -ή. Common feminine ending.',
  rows: ['Singular', 'Plural'],
  cols: ['Nominative', 'Genitive', 'Dative', 'Accusative', 'Vocative'],
  cells: {
    '0:0': {
      form: 'ἀγάπη',
      parsing: 'nom. sg. fem.',
      example: 'ἡ ἀγάπη (the love)',
      reference: 'John 3:16',
    },
    '0:1': {
      form: 'ἀγάπης',
      parsing: 'gen. sg. fem.',
      example: 'διὰ τῆς ἀγάπης (through love)',
      reference: '1 John 4:7',
    },
    '0:2': {
      form: 'ἀγάπῃ',
      parsing: 'dat. sg. fem.',
      example: 'τῇ ἀγάπῃ (by love)',
      reference: '1 Peter 1:22',
    },
    '0:3': {
      form: 'ἀγάπην',
      parsing: 'acc. sg. fem.',
      example: 'τὴν ἀγάπην (love - object)',
      reference: '1 John 3:16',
    },
    '0:4': {
      form: 'ἀγάπη',
      parsing: 'voc. sg. fem.',
      example: 'ἀγάπη (O love)',
    },
    '1:0': {
      form: 'ἀγάπαι',
      parsing: 'nom. pl. fem.',
      example: 'αἱ ἀγάπαι (the loves)',
    },
    '1:1': {
      form: 'ἀγαπῶν',
      parsing: 'gen. pl. fem.',
      example: 'πολλῶν ἀγαπῶν (of many loves)',
    },
    '1:2': {
      form: 'ἀγάπαις',
      parsing: 'dat. pl. fem.',
      example: 'ταῖς ἀγάπαις (by loves)',
    },
    '1:3': {
      form: 'ἀγάπας',
      parsing: 'acc. pl. fem.',
      example: 'τὰς ἀγάπας (loves - object)',
    },
    '1:4': {
      form: 'ἀγάπαι',
      parsing: 'voc. pl. fem.',
      example: 'ἀγάπαι (O loves)',
    },
  },
  footer: 'Note: Many first declension words end in -α or -η. Genitive plural for -η nouns ends in -ῶν.',
};

// 2. Second Declension - λόγος (masculine)
const secondDeclensionMasculine = {
  name: 'Second Declension - λόγος (Masculine)',
  description: 'Second declension nouns ending in -ος (masculine) or -ον (neuter).',
  rows: ['Singular', 'Plural'],
  cols: ['Nominative', 'Genitive', 'Dative', 'Accusative', 'Vocative'],
  cells: {
    '0:0': {
      form: 'λόγος',
      parsing: 'nom. sg. masc.',
      example: 'ὁ λόγος (the word)',
      reference: 'John 1:1',
    },
    '0:1': {
      form: 'λόγου',
      parsing: 'gen. sg. masc.',
      example: 'τοῦ λόγου (of the word)',
      reference: 'John 1:3',
    },
    '0:2': {
      form: 'λόγῳ',
      parsing: 'dat. sg. masc.',
      example: 'τῷ λόγῳ (by/to the word)',
      reference: '1 John 2:7',
    },
    '0:3': {
      form: 'λόγον',
      parsing: 'acc. sg. masc.',
      example: 'τὸν λόγον (the word - object)',
      reference: 'John 1:14',
    },
    '0:4': {
      form: 'λόγε',
      parsing: 'voc. sg. masc.',
      example: 'ὦ λόγε (O word)',
    },
    '1:0': {
      form: 'λόγοι',
      parsing: 'nom. pl. masc.',
      example: 'οἱ λόγοι (the words)',
      reference: 'John 7:36',
    },
    '1:1': {
      form: 'λόγων',
      parsing: 'gen. pl. masc.',
      example: 'τῶν λόγων (of the words)',
      reference: 'John 2:22',
    },
    '1:2': {
      form: 'λόγοις',
      parsing: 'dat. pl. masc.',
      example: 'τοῖς λόγοις (by/to the words)',
    },
    '1:3': {
      form: 'λόγους',
      parsing: 'acc. pl. masc.',
      example: 'τοὺς λόγους (the words - object)',
      reference: 'John 7:40',
    },
    '1:4': {
      form: 'λόγοι',
      parsing: 'voc. pl. masc.',
      example: 'ὦ λόγοι (O words)',
    },
  },
  footer: 'Most frequent masculine noun ending in the NT. Notice the accent shift in oblique cases.',
};

// 3. Second Declension - ἔργον (neuter)
const secondDeclensionNeuter = {
  name: 'Second Declension - ἔργον (Neuter)',
  description: 'Second declension neuter nouns ending in -ον. Nom/Acc same in all numbers.',
  rows: ['Singular', 'Plural'],
  cols: ['Nominative', 'Genitive', 'Dative', 'Accusative', 'Vocative'],
  cells: {
    '0:0': {
      form: 'ἔργον',
      parsing: 'nom./acc. sg. neut.',
      example: 'τὸ ἔργον (the work)',
      reference: 'John 4:34',
    },
    '0:1': {
      form: 'ἔργου',
      parsing: 'gen. sg. neut.',
      example: 'τοῦ ἔργου (of the work)',
      reference: 'John 17:4',
    },
    '0:2': {
      form: 'ἔργῳ',
      parsing: 'dat. sg. neut.',
      example: 'ἐν τῷ ἔργῳ (in the work)',
    },
    '0:3': {
      form: 'ἔργον',
      parsing: 'acc. sg. neut.',
      example: 'τὸ ἔργον (the work - object)',
      reference: 'John 3:21',
    },
    '0:4': {
      form: 'ἔργον',
      parsing: 'voc. sg. neut.',
    },
    '1:0': {
      form: 'ἔργα',
      parsing: 'nom./acc. pl. neut.',
      example: 'τὰ ἔργα (the works)',
      reference: 'John 7:3',
    },
    '1:1': {
      form: 'ἔργων',
      parsing: 'gen. pl. neut.',
      example: 'τῶν ἔργων (of the works)',
      reference: 'John 3:20',
    },
    '1:2': {
      form: 'ἔργοις',
      parsing: 'dat. pl. neut.',
      example: 'τοῖς ἔργοις (by/to the works)',
    },
    '1:3': {
      form: 'ἔργα',
      parsing: 'acc. pl. neut.',
      example: 'τὰ ἔργα (the works - object)',
      reference: 'John 6:30',
    },
    '1:4': {
      form: 'ἔργα',
      parsing: 'voc. pl. neut.',
    },
  },
  footer: 'Neuter rule: Nominative and accusative always identical. Includes nominative neuter plural -α ending.',
};

// 4. Third Declension - σάρξ (feminine)
const thirdDeclensionFeminine = {
  name: 'Third Declension - σάρξ (Feminine)',
  description: 'Third declension consonant-stem nouns. More complex with stem modifications.',
  rows: ['Singular', 'Plural'],
  cols: ['Nominative', 'Genitive', 'Dative', 'Accusative', 'Vocative'],
  cells: {
    '0:0': {
      form: 'σάρξ',
      parsing: 'nom. sg. fem.',
      example: 'ἡ σάρξ (the flesh)',
      reference: 'John 1:14',
    },
    '0:1': {
      form: 'σαρκός',
      parsing: 'gen. sg. fem.',
      example: 'τῆς σαρκός (of the flesh)',
      reference: 'Romans 1:3',
    },
    '0:2': {
      form: 'σαρκί',
      parsing: 'dat. sg. fem.',
      example: 'ἐν τῇ σαρκί (in the flesh)',
    },
    '0:3': {
      form: 'σάρκα',
      parsing: 'acc. sg. fem.',
      example: 'τὴν σάρκα (the flesh - object)',
      reference: 'Romans 8:13',
    },
    '0:4': {
      form: 'σάρξ',
      parsing: 'voc. sg. fem.',
    },
    '1:0': {
      form: 'σάρκες',
      parsing: 'nom. pl. fem.',
      example: 'αἱ σάρκες (the fleshes)',
    },
    '1:1': {
      form: 'σαρκῶν',
      parsing: 'gen. pl. fem.',
      example: 'τῶν σαρκῶν (of the fleshes)',
    },
    '1:2': {
      form: 'σαρξί(ν)',
      parsing: 'dat. pl. fem.',
      example: 'ταῖς σαρξί(ν) (by/to the fleshes)',
    },
    '1:3': {
      form: 'σάρκας',
      parsing: 'acc. pl. fem.',
      example: 'τὰς σάρκας (the fleshes - object)',
    },
    '1:4': {
      form: 'σάρκες',
      parsing: 'voc. pl. fem.',
    },
  },
  footer: 'The nominative stem σάρκ- becomes σάρξ. Notice stem changes in oblique cases.',
};

// 5. Present Active Indicative - λύω (I loose)
const presentActiveIndicative = {
  name: 'Present Active Indicative - λύω',
  description: 'Primary active indicative form. Shows person and number distinctions.',
  rows: ['Singular', 'Plural'],
  cols: ['1st Person', '2nd Person', '3rd Person'],
  cells: {
    '0:0': {
      form: 'λύω',
      parsing: '1st sg. pres. act. ind.',
      example: 'λύω (I loose)',
      reference: 'John 11:44',
    },
    '0:1': {
      form: 'λύεις',
      parsing: '2nd sg. pres. act. ind.',
      example: 'λύεις (you loose)',
    },
    '0:2': {
      form: 'λύει',
      parsing: '3rd sg. pres. act. ind.',
      example: 'λύει (he/she/it looses)',
      reference: 'Mark 11:2',
    },
    '1:0': {
      form: 'λύομεν',
      parsing: '1st pl. pres. act. ind.',
      example: 'λύομεν (we loose)',
      reference: 'Romans 7:2',
    },
    '1:1': {
      form: 'λύετε',
      parsing: '2nd pl. pres. act. ind.',
      example: 'λύετε (you [pl.] loose)',
    },
    '1:2': {
      form: 'λύουσι(ν)',
      parsing: '3rd pl. pres. act. ind.',
      example: 'λύουσι(ν) (they loose)',
      reference: 'John 11:44',
    },
  },
  footer: 'Regular ω-verb. Add personal endings to the present stem λύ-. Notice -ο- before most endings.',
};

// 6. Articles - ὁ, ἡ, τό
const articles = {
  name: 'Definite Article - ὁ, ἡ, τό',
  description: 'The only definite article in Greek. Must match gender, number, and case of noun.',
  rows: ['Singular - Masculine', 'Singular - Feminine', 'Singular - Neuter', 'Plural - Masculine', 'Plural - Feminine', 'Plural - Neuter'],
  cols: ['Nominative', 'Genitive', 'Dative', 'Accusative'],
  cells: {
    '0:0': { form: 'ὁ', parsing: 'nom. sg. masc.' },
    '0:1': { form: 'τοῦ', parsing: 'gen. sg. masc.' },
    '0:2': { form: 'τῷ', parsing: 'dat. sg. masc.' },
    '0:3': { form: 'τόν', parsing: 'acc. sg. masc.' },
    '1:0': { form: 'ἡ', parsing: 'nom. sg. fem.' },
    '1:1': { form: 'τῆς', parsing: 'gen. sg. fem.' },
    '1:2': { form: 'τῇ', parsing: 'dat. sg. fem.' },
    '1:3': { form: 'τήν', parsing: 'acc. sg. fem.' },
    '2:0': { form: 'τό', parsing: 'nom./acc. sg. neut.' },
    '2:1': { form: 'τοῦ', parsing: 'gen. sg. neut.' },
    '2:2': { form: 'τῷ', parsing: 'dat. sg. neut.' },
    '2:3': { form: 'τό', parsing: 'acc. sg. neut.' },
    '3:0': { form: 'οἱ', parsing: 'nom. pl. masc.' },
    '3:1': { form: 'τῶν', parsing: 'gen. pl. masc.' },
    '3:2': { form: 'τοῖς', parsing: 'dat. pl. masc.' },
    '3:3': { form: 'τούς', parsing: 'acc. pl. masc.' },
    '4:0': { form: 'αἱ', parsing: 'nom. pl. fem.' },
    '4:1': { form: 'τῶν', parsing: 'gen. pl. fem.' },
    '4:2': { form: 'ταῖς', parsing: 'dat. pl. fem.' },
    '4:3': { form: 'τάς', parsing: 'acc. pl. fem.' },
    '5:0': { form: 'τά', parsing: 'nom./acc. pl. neut.' },
    '5:1': { form: 'τῶν', parsing: 'gen. pl. neut.' },
    '5:2': { form: 'τοῖς', parsing: 'dat. pl. neut.' },
    '5:3': { form: 'τά', parsing: 'acc. pl. neut.' },
  },
  footer: 'Most frequent word in the NT. Genitive and dative plural identical across all genders.',
};

// Write all paradigms to JSON files
const paradigms = [
  { filename: 'first-declension-feminine.json', data: firstDeclensionFeminine },
  { filename: 'second-declension-masculine.json', data: secondDeclensionMasculine },
  { filename: 'second-declension-neuter.json', data: secondDeclensionNeuter },
  { filename: 'third-declension-feminine.json', data: thirdDeclensionFeminine },
  { filename: 'present-active-indicative.json', data: presentActiveIndicative },
  { filename: 'articles.json', data: articles },
];

paradigms.forEach(({ filename, data }) => {
  const filePath = path.join(PARADIGMS_DIR, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`✅ ${filename}`);
});

console.log(`\n✅ Generated ${paradigms.length} paradigm tables`);
console.log(`   Location: ${PARADIGMS_DIR}\n`);

// Also generate an index file listing all paradigms
const paradigmIndex = {
  totalParadigms: paradigms.length,
  categories: {
    declensions: [
      'first-declension-feminine.json',
      'second-declension-masculine.json',
      'second-declension-neuter.json',
      'third-declension-feminine.json',
    ],
    articles: ['articles.json'],
    verbs: ['present-active-indicative.json'],
  },
  description: 'Complete paradigm tables for Greek NT grammar with real NT examples',
};

const indexPath = path.join(PARADIGMS_DIR, 'index.json');
fs.writeFileSync(indexPath, JSON.stringify(paradigmIndex, null, 2));

console.log('✅ Generated paradigm index');
console.log(`   Location: ${indexPath}\n`);
console.log('Ready for grammar lessons!');
