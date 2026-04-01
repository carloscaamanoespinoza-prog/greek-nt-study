# 🚀 Quick Start - Test the Greek NT Reader

## Installation & Testing (5 minutes)

### 1. Install Dependencies
```bash
cd greek-nt-study
npm install
```

### 2. Generate Sample Data
```bash
npm run sample-data
```

This creates test data from **John 3:14-17** with real Greek text:
- Text with complete morphological analysis
- Lexicon entries for key words
- Sample concordance index

### 3. Start Development Server
```bash
npm run dev
```

Open your browser to `http://localhost:3000`

---

## What You Can Test Right Now

### Homepage
- Overview of app features
- Quick start guide
- Links to all major sections

### Reader (Click "Start Reading")
1. **Book Selection** → Choose "John"
2. **Read Chapter 3** → See verses 14-17 in Greek
3. **Click Words** → Interactive analysis popup
   - Word form (text)
   - Lemma (dictionary form)
   - Strong's number
   - Morphology (case, tense, voice, mood, etc.)
   - English meaning
   - Frequency in NT

### Word Analysis Popup
Click any word to see:
- **Morphology**: `V-AAI-3S` → decoded as verb, aorist, active, indicative, 3rd person, singular
- **Meaning**: English gloss
- **Frequency**: How many times it appears in the NT
- Close popup with X button

---

## Sample Data Content

The test data includes Greek text from **John 3:14-21** with real words:
- καί (kai) - "and" - 9,154 occurrences
- ἀγαπάω (agapaō) - "to love" - 143 occurrences
- θεός (theos) - "God" - 1,320 occurrences
- πιστεύω (pisteuō) - "believe" - 248 occurrences

---

## Full Data Processing (Optional)

To process the complete OpenGNT dataset:

```bash
# 1. Download data sources (~500MB)
npm run download-sources

# 2. Parse Greek text
npm run parse-opengnt

# 3. Parse lexicon
npm run parse-strongs

# 4. Parse definitions
npm run parse-stepbible

# 5. Build concordance
npm run build-concordance

# 6. Build SQLite database
npm run build-sqlite

# 7. Split chapters for lazy loading
npm run split-chapters

# 8. Build grammar paradigms
npm run build-paradigms

# Or run full pipeline:
npm run build
```

This processes all 27 books and ~138,000 words from the Greek NT.

---

## Project Structure

```
greek-nt-study/
├── public/data/              # Generated data
│   ├── text/john/3.json     # Sample chapter data
│   ├── lexicon/             # Dictionary entries
│   └── concordance/         # Word index
├── src/
│   ├── pages/               # Routes
│   │   ├── index.astro      # Homepage
│   │   └── reader/          # Reader pages
│   ├── components/          # UI components
│   │   └── reader/          # GreekText component
│   └── layouts/             # Page layouts
├── scripts/                 # Data processing
│   └── utils/              # Helper modules
└── README.md, QUICKSTART.md
```

---

## What's Working

✅ **Reader UI**: Display Greek text with word-level interactivity
✅ **Word Analysis**: Click words to see morphology
✅ **Navigation**: Book selection, chapter navigation
✅ **Sample Data**: John 3:14-17 with real morphological data
✅ **Responsive Design**: Works on desktop, tablet, mobile
✅ **Dark Mode**: Full dark mode support
✅ **TypeScript**: Type-safe Preact components

---

## What's Next (Other Phases)

### Fase 2: Word Analysis Expansion
- Full concordance (all occurrences)
- Etymology section
- Related words
- Better styling

### Fase 3: Global Search
- Search by Greek word
- Search by Strong's number
- Search by definition
- Filter by book/morphology

### Fase 4: Grammar (30 Lessons)
- Interactive tables
- Paradigm viewer
- Morphology quiz
- Interactive exercises

### Fase 5: Advanced Tools
- Verbal aspect analysis
- Sentence diagramming
- LXX comparison
- Progressive reader
- Vocabulary frequency map

### Fase 6: Production
- PWA support
- Offline mode
- Deploy to Netlify
- SEO optimization
- Performance tuning

---

## Keyboard Shortcuts (Implemented)

- `Cmd/Ctrl + K` - Global search (coming in Fase 3)
- `←/→` - Previous/Next chapter (working)
- `Escape` - Close word popup (working)

---

## Troubleshooting

### Port 3000 Already in Use
```bash
npm run dev -- --port 3001
```

### Missing Data Files
```bash
npm run sample-data
```

### Build Errors
```bash
rm -rf node_modules dist
npm install
npm run dev
```

---

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari 14+, Chrome Mobile)

---

## Development Notes

- **Framework**: Astro 4.x (Static Site Generation)
- **UI Library**: Preact 10.x (lightweight React)
- **Styling**: Tailwind CSS 4.x
- **Language**: TypeScript
- **Typography**: Cardo, GFS Didot (Greek fonts from Google Fonts)

---

## Next Steps

1. **Test the reader** with sample data
2. **Explore word analysis** - Click on words
3. **Browse navigation** - Try different books
4. **Review code** - Look at components in `src/`
5. **Plan Fase 2** - Enhanced word analysis

---

**Enjoy exploring the Greek New Testament! 🏛️📚**

Questions? See README.md for more information.
