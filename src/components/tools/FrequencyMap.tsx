import { h } from 'preact';
import { useState, useMemo } from 'preact/hooks';

interface FrequencyWord {
  id: string;
  greek: string;
  translit: string;
  gloss: string;
  frequency: number;
  pos: string;
  strongs?: number;
}

const topWords: FrequencyWord[] = [
  { id: '1', greek: 'καί', translit: 'kaí', gloss: 'and, also', frequency: 9161, pos: 'conj', strongs: 2532 },
  { id: '2', greek: 'ὁ', translit: 'hó', gloss: 'the (definite article)', frequency: 19897, pos: 'art', strongs: 3588 },
  { id: '3', greek: 'ἐν', translit: 'en', gloss: 'in, on, at', frequency: 2752, pos: 'prep', strongs: 1722 },
  { id: '4', greek: 'αὐτός', translit: 'autós', gloss: 'he, she, it, self', frequency: 5597, pos: 'pron', strongs: 846 },
  { id: '5', greek: 'τό', translit: 'tó', gloss: 'the (neuter article)', frequency: 19897, pos: 'art', strongs: 3588 },
  { id: '6', greek: 'δέ', translit: 'dé', gloss: 'but, and', frequency: 2792, pos: 'conj', strongs: 1161 },
  { id: '7', greek: 'εἰς', translit: 'eis', gloss: 'into, toward', frequency: 1768, pos: 'prep', strongs: 1519 },
  { id: '8', greek: 'λέγω', translit: 'légō', gloss: 'say, speak', frequency: 2255, pos: 'v', strongs: 3004 },
  { id: '9', greek: 'πρός', translit: 'prós', gloss: 'toward, to, with', frequency: 700, pos: 'prep', strongs: 4314 },
  { id: '10', greek: 'ἐπί', translit: 'epí', gloss: 'upon, on, at', frequency: 890, pos: 'prep', strongs: 1909 },
  { id: '11', greek: 'εἰμί', translit: 'eimí', gloss: 'be, exist', frequency: 2457, pos: 'v', strongs: 1510 },
  { id: '12', greek: 'ὅς', translit: 'hós', gloss: 'who, which, that', frequency: 1365, pos: 'pron', strongs: 3739 },
  { id: '13', greek: 'αὐτοῦ', translit: 'autoû', gloss: 'his, of him', frequency: 5597, pos: 'pron', strongs: 846 },
  { id: '14', greek: 'ἀπό', translit: 'apó', gloss: 'from, away from', frequency: 646, pos: 'prep', strongs: 575 },
  { id: '15', greek: 'ἵνα', translit: 'hína', gloss: 'in order that, so that', frequency: 663, pos: 'conj', strongs: 2443 },
  { id: '16', greek: 'θεός', translit: 'theós', gloss: 'God', frequency: 1320, pos: 'n', strongs: 2316 },
  { id: '17', greek: 'μέν', translit: 'mén', gloss: 'indeed, on the one hand', frequency: 179, pos: 'conj', strongs: 3303 },
  { id: '18', greek: 'πάντα', translit: 'pánta', gloss: 'all, every', frequency: 926, pos: 'adj', strongs: 3956 },
  { id: '19', greek: 'ἐγώ', translit: 'egṓ', gloss: 'I, me', frequency: 2567, pos: 'pron', strongs: 1473 },
  { id: '20', greek: 'γάρ', translit: 'gár', gloss: 'for, because', frequency: 1041, pos: 'conj', strongs: 1063 },
  { id: '21', greek: 'ἔχω', translit: 'échō', gloss: 'have, hold', frequency: 708, pos: 'v', strongs: 2192 },
  { id: '22', greek: 'οἱ', translit: 'hoi', gloss: 'the (masc. plural article)', frequency: 19897, pos: 'art', strongs: 3588 },
  { id: '23', greek: 'μόνος', translit: 'mónos', gloss: 'alone, only', frequency: 114, pos: 'adj', strongs: 3441 },
  { id: '24', greek: 'ἀρχή', translit: 'arkhé', gloss: 'beginning, origin', frequency: 55, pos: 'n', strongs: 746 },
  { id: '25', greek: 'ἐκεῖνος', translit: 'ekeînos', gloss: 'that, that one', frequency: 265, pos: 'pron', strongs: 1565 },
];

export default function FrequencyMap() {
  const [posFilter, setPostFilter] = useState<'all' | 'n' | 'v' | 'adj' | 'conj' | 'prep' | 'art' | 'pron'>('all');
  const [hoveredWord, setHoveredWord] = useState<string | null>(null);

  const filteredWords = useMemo(() => {
    return topWords.filter((word) => posFilter === 'all' || word.pos === posFilter);
  }, [posFilter]);

  const getFrequencyColor = (freq: number) => {
    if (freq > 5000) return 'bg-red-600 dark:bg-red-700 text-white';
    if (freq > 1000) return 'bg-orange-500 dark:bg-orange-600 text-white';
    if (freq > 500) return 'bg-amber-500 dark:bg-amber-600 text-white';
    if (freq > 100) return 'bg-green-500 dark:bg-green-600 text-white';
    return 'bg-slate-400 dark:bg-slate-600 text-white';
  };

  const getFrequencyLabel = (freq: number) => {
    if (freq > 5000) return 'Very Common (>5000x)';
    if (freq > 1000) return 'Common (1000-5000x)';
    if (freq > 500) return 'Moderate (500-1000x)';
    if (freq > 100) return 'Uncommon (100-500x)';
    return 'Rare (<100x)';
  };

  const getPosLabel = (pos: string) => {
    const labels: Record<string, string> = {
      n: 'Noun',
      v: 'Verb',
      adj: 'Adjective',
      conj: 'Conjunction',
      prep: 'Preposition',
      art: 'Article',
      pron: 'Pronoun',
    };
    return labels[pos] || pos;
  };

  return (
    <div class="space-y-6">
      {/* Introduction */}
      <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h3 class="font-bold text-slate-900 dark:text-white mb-2">Word Frequency in the Greek NT</h3>
        <p class="text-sm text-slate-700 dark:text-slate-300">
          This tool shows the most frequently occurring words in the New Testament. Color coding indicates how common each
          word is — red words appear over 5,000 times, while lighter colors are less frequent.
        </p>
      </div>

      {/* Filters */}
      <div class="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
        <label class="block text-sm font-bold text-slate-900 dark:text-white mb-3">Filter by Part of Speech</label>
        <div class="flex flex-wrap gap-2">
          {(['all', 'n', 'v', 'adj', 'conj', 'prep', 'art', 'pron'] as const).map((pos) => (
            <button
              key={pos}
              onClick={() => setPostFilter(pos)}
              class={`px-3 py-1.5 rounded text-sm font-medium transition-all ${
                posFilter === pos
                  ? 'bg-blue-600 text-white ring-2 ring-offset-2 dark:ring-offset-slate-900 ring-blue-400'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-600'
              }`}
            >
              {pos === 'all' ? 'All Words' : getPosLabel(pos)}
            </button>
          ))}
        </div>
      </div>

      {/* Word Grid */}
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {filteredWords.map((word) => (
          <div
            key={word.id}
            onMouseEnter={() => setHoveredWord(word.id)}
            onMouseLeave={() => setHoveredWord(null)}
            class={`relative p-4 rounded-lg border-2 border-slate-200 dark:border-slate-700 transition-all cursor-pointer ${
              hoveredWord === word.id ? 'ring-2 ring-blue-500 scale-105' : ''
            } ${getFrequencyColor(word.frequency)}`}
          >
            <div class="font-greek text-xl font-bold mb-2">{word.greek}</div>
            <div class="text-xs opacity-90 italic mb-2">{word.translit}</div>
            <div class="text-xs opacity-90 font-semibold">{word.frequency}x</div>

            {/* Hover Tooltip */}
            {hoveredWord === word.id && (
              <div class="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-slate-900 dark:bg-slate-950 text-white rounded-lg shadow-lg p-3 whitespace-nowrap z-10 text-xs">
                <div class="font-semibold mb-1">{word.gloss}</div>
                <div class="opacity-75">{getPosLabel(word.pos)}</div>
                {word.strongs && <div class="opacity-75">Strong's #{word.strongs}</div>}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div class="bg-slate-100 dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
        <h3 class="font-bold text-slate-900 dark:text-white mb-3 text-sm">Frequency Legend</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {[
            { color: 'bg-red-600 dark:bg-red-700', label: 'Very Common (>5000x)' },
            { color: 'bg-orange-500 dark:bg-orange-600', label: 'Common (1000-5000x)' },
            { color: 'bg-amber-500 dark:bg-amber-600', label: 'Moderate (500-1000x)' },
            { color: 'bg-green-500 dark:bg-green-600', label: 'Uncommon (100-500x)' },
            { color: 'bg-slate-400 dark:bg-slate-600', label: 'Rare (<100x)' },
          ].map(({ color, label }) => (
            <div key={label} class="flex items-center gap-2">
              <div class={`w-4 h-4 rounded ${color}`}></div>
              <span class="text-xs text-slate-700 dark:text-slate-300">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div class="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
        <h4 class="font-bold text-slate-900 dark:text-white mb-2 text-sm">Study Tip</h4>
        <p class="text-xs text-slate-700 dark:text-slate-300">
          The most frequently occurring 100 words account for the vast majority of the Greek New Testament. Mastering
          these words will give you a solid foundation for reading Greek texts with confidence. Start with the red words
          (very common) and work your way down.
        </p>
      </div>
    </div>
  );
}
