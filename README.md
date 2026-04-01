# Greek New Testament Study App
## Κοινή Γραμματική - Advanced Study Platform for Biblical Greek

A comprehensive web application for studying the Greek New Testament with morphological analysis, lexicon lookup, and grammatical instruction. Built with Astro, Preact, and deployed on Netlify.

### Features

- **Full NT Text**: All 27 books in Greek with interactive word analysis
- **Morphological Analysis**: Complete parsing of every word (case, gender, number, tense, voice, mood, person)
- **Concordance**: Search all occurrences of any Greek word in the NT
- **Lexicon**: Definitions with etymology, usage frequency, and related words
- **Grammar Lessons**: 30 progressive lessons from basics to advanced syntax
- **Interactive Tools**:
  - Progressive Reader (vocabulary-guided reading)
  - Verbal Aspect Chart (Porter's system)
  - Sentence Analyzer (syntactic dependencies)
  - Vocabulary Frequency Map
  - LXX Comparison (for direct quotes)

### Technology Stack

- **Framework**: Astro 4.x (Static Site Generation)
- **UI**: Preact 10.x (interactive components)
- **Styling**: Tailwind CSS 4.x
- **Search**: Fuse.js (client-side full-text search)
- **Database**: SQLite WASM (for complex queries)
- **Typography**: Cardo, GFS Didot (academic Greek fonts)

### Development Setup

#### 1. Install Dependencies

```bash
npm install
```

#### 2. Download Data Sources

The app requires Greek NT data from OpenGNT, lexicons, and Strong's dictionary:

```bash
npm run download-sources
```

This downloads (one-time):
- OpenGNT (Greek NT with morphology)
- Strong's Dictionary
- STEPBible Lexicons (LSJ, Abbott-Smith)

#### 3. Process Data Pipeline

After downloading, process the data:

```bash
npm run build
```

This automatically runs the full pipeline:
1. Parse OpenGNT CSV → JSON by chapter
2. Parse Strong's XML → Lexicon index
3. Build concordance (word occurrence index)
4. Split chapters for lazy loading
5. Create SQLite database for complex queries
6. Generate paradigms (declension/conjugation tables)

### Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

### Build for Production

```bash
npm run build
```

This generates a fully static site ready for Netlify.

### File Structure

```
greek-nt-study/
├── scripts/              # Data processing pipeline
├── public/data/          # Processed data (generated)
├── src/
│   ├── pages/            # Astro pages (one per book/chapter)
│   ├── components/       # Preact components
│   ├── lib/              # Utilities (RMAC decoder, etc.)
│   ├── stores/           # Preact Signals (state)
│   └── types/            # TypeScript definitions
└── netlify/              # Netlify functions (optional backend)
```

### Data Sources

- **OpenGNT**: https://github.com/eliranwong/OpenGNT
  - Greek NT with Robinson morphology (RMAC)
  - Strong's numbers and glosses
  - Licensed: CC0 (public domain)

- **Strong's Dictionary**: https://github.com/morphgnt/strongs-dictionary-xml
  - Definitions and etymologies
  - Licensed: Public domain (Strong died 1894)

- **STEPBible Lexicons**: https://github.com/STEPBible/STEPBible-Data
  - Liddell-Scott-Jones (LSJ) complete
  - Translators' Lexicon
  - Licensed: CC BY 4.0

### Key Components

#### GreekText Component
Renders the Greek NT with clickable words.
```tsx
<GreekText book="john" chapter={3} />
```

#### WordPopup Component
Shows morphology, definition, and concordance on click.
- Morphological parsing (RMAC decoded)
- Full lexicon entry
- Etymology and related words
- All NT occurrences

#### Grammar Lessons
30 lessons covering:
- Alphabet and phonology
- Declinational system
- Verbal system
- Syntax and interpretation

### Deployment

The app deploys to Netlify:

1. Push to GitHub
2. GitHub Actions triggers build
3. Data processed (cached by hash)
4. Astro generates static HTML
5. Deployed to Netlify CDN

### Performance Notes

- **First Load**: ~500ms (all data loaded)
- **Chapter Load**: ~50ms (JSON lazy loading)
- **Word Lookup**: <5ms (in-memory index)
- **Offline**: Full PWA support (service worker + Cache API)

### Keyboard Shortcuts

- `Cmd/Ctrl + K`: Global search
- `Cmd/Ctrl + F`: Find in chapter
- `←/→`: Previous/next chapter
- `?`: Help

### Future Enhancements

- [ ] Audio pronunciation (Erasmian)
- [ ] Theological commentary integration
- [ ] Custom study lists and notes
- [ ] Print-friendly mode
- [ ] Greek input method support

### Contributing

This is a research/educational project. Contributions welcome:
- New grammar lessons
- Lexicon improvements
- UI/UX enhancements
- Performance optimizations

### License

- **Code**: MIT
- **Data**: Multiple (see sources above)
  - OpenGNT: CC0
  - Strong's: Public Domain
  - STEPBible: CC BY 4.0

### Academic References

The grammatical analysis uses:
- **A.T. Robertson**: *Grammar of the Greek New Testament in the Light of Historical Research* (1914)
- **F. Blass & A. Debrunner**: *A Greek Grammar of the New Testament* (BDF)
- **H.E. Dana & J.R. Mantey**: *A Manual Grammar of the Greek New Testament*
- **Maximilian Zerwick**: *Biblical Greek* (grammatical analysis)
- **Stanley Porter**: *Verbal Aspect and the Indicative Mood in New Testament Greek*
- **Fredrick T. Gideon**: *New Testament Lexical Semantics*

### Support

- Documentation: See `/docs`
- Issues: GitHub Issues
- Discussions: GitHub Discussions

---

**Building the definitive interactive platform for Koine Greek study.** 📚🏛️
