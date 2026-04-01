import { h } from 'preact';
import { useState } from 'preact/hooks';

interface Word {
  id: string;
  text: string;
  punct: string;
  lemma: string;
  strongs: number | null;
  rmac: string;
  morph: any;
  gloss: string;
  freq: number;
}

interface Verse {
  verse: number;
  words: Word[];
}

interface ChapterData {
  book: string;
  chapter: number;
  verses: Verse[];
}

interface Props {
  data: ChapterData;
}

const frequencyThresholds = [
  { label: 'Ultra Rare', value: 10 },
  { label: 'Very Rare', value: 50 },
  { label: 'Rare', value: 100 },
  { label: 'Uncommon', value: 200 },
  { label: 'Moderate', value: 500 },
  { label: 'Show All', value: 10000 },
];

export default function ProgressiveReader({ data }: Props) {
  const [threshold, setThreshold] = useState(100);
  const [showAllGlosses, setShowAllGlosses] = useState(false);

  if (!data || !data.verses) {
    return <div class="text-center py-8">Loading...</div>;
  }

  const shouldShowGloss = (freq: number) => {
    return showAllGlosses || freq <= threshold;
  };

  return (
    <div class="space-y-6">
      {/* Controls */}
      <div class="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-bold text-slate-900 dark:text-white mb-2">
              Help Level: Words appearing ≤ {threshold} times in NT
            </label>
            <input
              type="range"
              min="10"
              max="10000"
              step="50"
              value={threshold}
              onInput={(e) => setThreshold(parseInt((e.target as HTMLInputElement).value))}
              class="w-full"
            />
            <div class="flex justify-between text-xs text-slate-600 dark:text-slate-400 mt-2">
              {frequencyThresholds.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setThreshold(t.value)}
                  class={`px-2 py-1 rounded transition-colors ${
                    threshold === t.value
                      ? 'bg-blue-600 text-white font-bold'
                      : 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div class="flex items-center gap-4">
            <label class="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showAllGlosses}
                onChange={(e) => setShowAllGlosses((e.target as HTMLInputElement).checked)}
                class="w-4 h-4"
              />
              <span class="text-sm font-medium text-slate-900 dark:text-white">
                Show all glosses
              </span>
            </label>
            <div class="text-xs text-slate-600 dark:text-slate-400">
              Words shown: {data.verses.flatMap(v => v.words).filter(w => shouldShowGloss(w.freq)).length} of{' '}
              {data.verses.flatMap(v => v.words).length}
            </div>
          </div>
        </div>
      </div>

      {/* Greek Text with Progressive Help */}
      <div class="greek-text">
        <h2 class="font-greek text-3xl font-bold mb-4">
          {data.book.charAt(0).toUpperCase() + data.book.slice(1)} {data.chapter}
        </h2>

        <div class="space-y-6">
          {data.verses.map((verse) => (
            <div key={verse.verse} class="verse-container">
              <div class="flex gap-4">
                <div class="verse-number min-w-fit font-bold text-slate-400 dark:text-slate-600">
                  {verse.verse}
                </div>
                <div class="verse-text flex flex-wrap gap-1">
                  {verse.words.map((word) => {
                    const showGloss = shouldShowGloss(word.freq);
                    const frequencyColor =
                      word.freq > 500
                        ? 'text-red-600 dark:text-red-400'
                        : word.freq > 100
                          ? 'text-amber-600 dark:text-amber-400'
                          : word.freq > 50
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-blue-600 dark:text-blue-400';

                    return (
                      <span key={word.id} class="inline-group relative">
                        <span class="greek-word inline-block group/word" title={word.gloss}>
                          <span class={`inline ${showGloss ? frequencyColor : 'text-slate-900 dark:text-white'}`}>
                            {word.text}
                          </span>

                          {/* Gloss Tooltip */}
                          {showGloss && (
                            <span class="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-200 text-xs rounded pointer-events-none opacity-0 group-hover/word:opacity-100 transition-opacity z-10 border border-amber-200 dark:border-amber-700">
                              {word.gloss}
                              <span class="text-slate-600 dark:text-slate-400 ml-1">({word.freq}x)</span>
                            </span>
                          )}
                        </span>
                        {word.punct && <span class="inline text-slate-900 dark:text-white">{word.punct}</span>}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div class="p-4 bg-slate-100 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
        <h3 class="font-bold text-slate-900 dark:text-white mb-3 text-sm">Frequency Guide</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div class="flex items-center gap-2">
            <span class="inline-block w-3 h-3 rounded-full bg-blue-600"></span>
            <span class="text-slate-700 dark:text-slate-300">&lt;50x — Very rare</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="inline-block w-3 h-3 rounded-full bg-green-600"></span>
            <span class="text-slate-700 dark:text-slate-300">50–100x — Rare</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="inline-block w-3 h-3 rounded-full bg-amber-600"></span>
            <span class="text-slate-700 dark:text-slate-300">100–500x — Uncommon</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="inline-block w-3 h-3 rounded-full bg-red-600"></span>
            <span class="text-slate-700 dark:text-slate-300">&gt;500x — Common</span>
          </div>
        </div>
      </div>
    </div>
  );
}
