import { h } from 'preact';
import { useState } from 'preact/hooks';

interface Word {
  id: string;
  text: string;
  punct: string;
  lemma: string;
  pos: string;
  gloss: string;
}

interface Verse {
  verse: number;
  words: Word[];
}

const sampleVerses: Verse[] = [
  {
    verse: 14,
    words: [
      { id: '1', text: 'καί', punct: '', lemma: 'καί', pos: 'conj', gloss: 'and' },
      { id: '2', text: 'καθὼς', punct: '', lemma: 'καθώς', pos: 'adv', gloss: 'just as' },
      { id: '3', text: 'Μωϋσῆς', punct: '', lemma: 'Μωϋσῆς', pos: 'n', gloss: 'Moses' },
      { id: '4', text: 'ὕψωσεν', punct: '', lemma: 'ὑψόω', pos: 'v', gloss: 'lifted up' },
      { id: '5', text: 'τὸν', punct: '', lemma: 'ὁ', pos: 'art', gloss: 'the' },
      { id: '6', text: 'ὄφιν', punct: '', lemma: 'ὄφις', pos: 'n', gloss: 'serpent' },
      { id: '7', text: 'ἐν', punct: '', lemma: 'ἐν', pos: 'prep', gloss: 'in' },
      { id: '8', text: 'τῇ', punct: '', lemma: 'ὁ', pos: 'art', gloss: 'the' },
      { id: '9', text: 'ἐρήμῳ', punct: '', lemma: 'ἔρημος', pos: 'adj', gloss: 'wilderness' },
      { id: '10', text: 'οὕτως', punct: ',', lemma: 'οὕτως', pos: 'adv', gloss: 'so' },
      { id: '11', text: 'καί', punct: '', lemma: 'καί', pos: 'conj', gloss: 'and' },
      { id: '12', text: 'δεῖ', punct: '', lemma: 'δέω', pos: 'v', gloss: 'it is necessary' },
      { id: '13', text: 'ὑψωθῆναι', punct: '', lemma: 'ὑψόω', pos: 'v', gloss: 'to be lifted up' },
      { id: '14', text: 'τὸν', punct: '', lemma: 'ὁ', pos: 'art', gloss: 'the' },
      { id: '15', text: 'υἱὸν', punct: '', lemma: 'υἱός', pos: 'n', gloss: 'Son' },
      { id: '16', text: 'τοῦ', punct: '', lemma: 'ὁ', pos: 'art', gloss: 'of the' },
      { id: '17', text: 'ἀνθρώπου', punct: '·', lemma: 'ἄνθρωπος', pos: 'n', gloss: 'man' },
    ],
  },
];

const getPosColor = (pos: string) => {
  switch (pos) {
    case 'n':
      return 'text-blue-600 dark:text-blue-400'; // Noun - blue
    case 'v':
      return 'text-red-600 dark:text-red-400'; // Verb - red
    case 'adj':
      return 'text-green-600 dark:text-green-400'; // Adjective - green
    case 'art':
      return 'text-slate-500 dark:text-slate-400'; // Article - slate
    case 'prep':
      return 'text-purple-600 dark:text-purple-400'; // Preposition - purple
    case 'conj':
      return 'text-orange-600 dark:text-orange-400'; // Conjunction - orange
    case 'adv':
      return 'text-amber-600 dark:text-amber-400'; // Adverb - amber
    case 'pron':
      return 'text-cyan-600 dark:text-cyan-400'; // Pronoun - cyan
    default:
      return 'text-slate-900 dark:text-white';
  }
};

const getPosLabel = (pos: string) => {
  const labels: Record<string, string> = {
    n: 'Noun',
    v: 'Verb',
    adj: 'Adjective',
    art: 'Article',
    prep: 'Preposition',
    conj: 'Conjunction',
    adv: 'Adverb',
    pron: 'Pronoun',
  };
  return labels[pos] || pos;
};

export default function SentenceAnalyzer() {
  const [hoveredWord, setHoveredWord] = useState<string | null>(null);

  return (
    <div class="space-y-6">
      {/* Introduction */}
      <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h3 class="font-bold text-slate-900 dark:text-white mb-2">Color-Coded Grammatical Analysis</h3>
        <p class="text-sm text-slate-700 dark:text-slate-300">
          Each word in the verse below is colored by its part of speech. Hover over a word to see its detailed
          grammatical information.
        </p>
      </div>

      {/* Text Display */}
      <div class="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
        {sampleVerses.map((verse) => (
          <div key={verse.verse} class="mb-6">
            <div class="flex gap-4">
              <div class="verse-number min-w-fit font-bold text-slate-400 dark:text-slate-600 text-lg">
                {verse.verse}
              </div>
              <div class="verse-text flex flex-wrap gap-1">
                {verse.words.map((word) => (
                  <span
                    key={word.id}
                    onMouseEnter={() => setHoveredWord(word.id)}
                    onMouseLeave={() => setHoveredWord(null)}
                    class="relative inline-group"
                  >
                    <span
                      class={`inline-block font-greek font-semibold cursor-help group ${getPosColor(word.pos)} ${
                        hoveredWord === word.id ? 'underline underline-offset-2' : ''
                      }`}
                      title={`${getPosLabel(word.pos)}: ${word.gloss}`}
                    >
                      {word.text}

                      {/* Hover Tooltip */}
                      {hoveredWord === word.id && (
                        <span class="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-2 bg-slate-900 dark:bg-slate-950 text-white rounded shadow-lg text-xs z-10">
                          <div class="font-semibold">{getPosLabel(word.pos)}</div>
                          <div class="opacity-90">{word.gloss}</div>
                          <div class="opacity-75">Lemma: {word.lemma}</div>
                        </span>
                      )}
                    </span>
                    {word.punct && <span class="inline text-slate-900 dark:text-white">{word.punct}</span>}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Translation */}
      <div class="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
        <h4 class="font-bold text-slate-900 dark:text-white mb-2 text-sm">Translation (John 3:14)</h4>
        <p class="text-slate-700 dark:text-slate-300 italic">
          "And just as Moses lifted up the serpent in the wilderness, so also it is necessary that the Son of Man be
          lifted up..."
        </p>
      </div>

      {/* Legend */}
      <div class="bg-slate-100 dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
        <h3 class="font-bold text-slate-900 dark:text-white mb-3 text-sm">Part of Speech Legend</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { pos: 'n', label: 'Noun', color: 'text-blue-600 dark:text-blue-400' },
            { pos: 'v', label: 'Verb', color: 'text-red-600 dark:text-red-400' },
            { pos: 'adj', label: 'Adjective', color: 'text-green-600 dark:text-green-400' },
            { pos: 'art', label: 'Article', color: 'text-slate-500 dark:text-slate-400' },
            { pos: 'prep', label: 'Preposition', color: 'text-purple-600 dark:text-purple-400' },
            { pos: 'conj', label: 'Conjunction', color: 'text-orange-600 dark:text-orange-400' },
            { pos: 'adv', label: 'Adverb', color: 'text-amber-600 dark:text-amber-400' },
            { pos: 'pron', label: 'Pronoun', color: 'text-cyan-600 dark:text-cyan-400' },
          ].map(({ label, color }) => (
            <div key={label} class="flex items-center gap-2">
              <span class={`font-bold text-lg ${color}`}>●</span>
              <span class="text-xs text-slate-700 dark:text-slate-300">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Analysis Tips */}
      <div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
        <h4 class="font-bold text-slate-900 dark:text-white mb-2 text-sm">Analysis Tip</h4>
        <p class="text-xs text-slate-700 dark:text-slate-300">
          In John 3:14, notice the repeated verb ὑψόω (lifted up) in different forms. The aorist ὕψωσεν describes
          Moses' completed action in the past. The infinitive ὑψωθῆναι describes what must happen with the Son of Man.
          The same root word carries the metaphor forward!
        </p>
      </div>
    </div>
  );
}
