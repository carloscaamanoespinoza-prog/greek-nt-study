#!/usr/bin/env node
/**
 * Create lesson markdown files for grammar modules
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.join(__dirname, '..');
const CONTENT_DIR = path.join(PROJECT_ROOT, 'src', 'content', 'grammar');

const lessons = [
  { num: 9, mod: 2, title: 'Present Tense Active Indicative', desc: 'Understanding the most basic Greek verb tense' },
  { num: 10, mod: 2, title: 'Imperfect Tense', desc: 'Express ongoing or repeated action in the past' },
  { num: 11, mod: 2, title: 'Future Tense', desc: 'Predict future events and intentions' },
  { num: 12, mod: 2, title: 'Aorist Tense', desc: 'Master the simple past, a cornerstone of NT meaning' },
  { num: 13, mod: 2, title: 'Perfect Tense', desc: 'Express completed action with lasting effects' },
  { num: 14, mod: 2, title: 'Pluperfect Tense', desc: 'Express action completed before another past event' },
  { num: 15, mod: 2, title: 'Subjunctive Mood', desc: 'Navigate purpose, condition, and exhortation clauses' },
  { num: 16, mod: 2, title: 'Optative Mood', desc: 'Rare but important, expressing wishes and conditions' },
  { num: 17, mod: 2, title: 'Imperative Mood', desc: 'Commands and direct exhortation in the NT' },
  { num: 18, mod: 2, title: 'The Middle Voice', desc: 'When the subject acts upon themselves' },
  { num: 19, mod: 3, title: 'Participles: Form and Function', desc: 'Master the most versatile verb form' },
  { num: 20, mod: 3, title: 'Infinitives and Their Uses', desc: 'Verbal nouns in Greek sentences' },
  { num: 21, mod: 3, title: 'The Passive Voice', desc: 'When someone or something is acted upon' },
  { num: 22, mod: 3, title: 'Irregular Verbs', desc: 'Handle common irregular verbs like echō' },
  { num: 23, mod: 3, title: 'Contract Verbs and mi-Verbs', desc: 'Deal with vowel contractions and stem variations' },
  { num: 24, mod: 3, title: 'Comparatives and Superlatives', desc: 'Express quality and degree of adjectives' },
  { num: 25, mod: 4, title: 'The Genitive Case', desc: 'Possession, description, and source' },
  { num: 26, mod: 4, title: 'The Dative Case', desc: 'Indirect object, location, and instrument' },
  { num: 27, mod: 4, title: 'The Accusative Case', desc: 'Direct object and extent of action' },
  { num: 28, mod: 4, title: 'Conditional Sentences', desc: 'If-then constructions and Greek logic' },
  { num: 29, mod: 4, title: 'Verbal Aspect and Aktionsart', desc: 'The deeper meaning of tense choice' },
  { num: 30, mod: 4, title: 'Textual Criticism Basics', desc: 'Understanding manuscript variations in the NT' },
];

console.log('📝 Creating lesson files...\n');

lessons.forEach(lesson => {
  const slug = `${String(lesson.num).padStart(2, '0')}-${lesson.title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/-$/, '')}`;
  const filename = path.join(CONTENT_DIR, `${slug}.md`);

  const content = `---
title: "${lesson.title}"
module: ${lesson.mod}
lesson: ${lesson.num}
description: "${lesson.desc}"
difficulty: intermediate
tags: ["grammar", "syntax"]
paradigms: []
---

## Overview

This lesson covers the **${lesson.title}** concept as part of Module ${lesson.mod} of the Greek New Testament grammar course.

### Key Concepts

This concept is essential for understanding Greek New Testament. This lesson explores:

- Core principles and definitions
- Real examples from the NT
- Common patterns and exceptions
- Practical application to your reading

### From the Scriptures

Examples from authentic NT passages demonstrate how these grammatical concepts appear in context. The Greek New Testament provides the best laboratory for learning living language.

### Practice

Work through the examples provided and attempt to apply these concepts to your own Greek reading. Grammar is not an end in itself but a tool for deeper understanding of the sacred text.

---

**Note:** This lesson is part of the comprehensive Greek grammar curriculum. As you progress through the modules, you'll build a complete understanding of Greek NT morphology and syntax.
`;

  fs.writeFileSync(filename, content);
  console.log(`✅ ${slug}.md`);
});

console.log(`\n✅ Created ${lessons.length} lesson files`);
console.log(`   Location: ${CONTENT_DIR}`);
