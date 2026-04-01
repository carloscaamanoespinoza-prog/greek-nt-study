import { h } from 'preact';

interface Props {
  onFilterChange?: (filters: SearchFilters) => void;
}

export interface SearchFilters {
  minFrequency: number;
  maxFrequency: number;
  partOfSpeech?: string[];
  book?: string;
}

export default function SearchFilters({ onFilterChange }: Props) {
  const handleFrequencyChange = (min: number, max: number) => {
    onFilterChange?.({
      minFrequency: min,
      maxFrequency: max,
    });
  };

  return (
    <div class="space-y-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
      <h3 class="font-bold text-slate-900 dark:text-white">Filters</h3>

      {/* Frequency Filter */}
      <div>
        <label class="text-sm font-bold text-slate-700 dark:text-slate-300 block mb-2">
          Frequency in NT
        </label>
        <div class="space-y-2">
          <button
            onClick={() => handleFrequencyChange(0, Infinity)}
            class="w-full text-left px-3 py-2 text-sm rounded hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
          >
            Any frequency
          </button>
          <button
            onClick={() => handleFrequencyChange(0, 10)}
            class="w-full text-left px-3 py-2 text-sm rounded hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
          >
            Rare (1-10 times)
          </button>
          <button
            onClick={() => handleFrequencyChange(10, 100)}
            class="w-full text-left px-3 py-2 text-sm rounded hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
          >
            Moderate (11-100 times)
          </button>
          <button
            onClick={() => handleFrequencyChange(100, Infinity)}
            class="w-full text-left px-3 py-2 text-sm rounded hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
          >
            Common (100+ times)
          </button>
        </div>
      </div>

      {/* Quick Search Tips */}
      <div class="border-t border-slate-200 dark:border-slate-700 pt-4">
        <p class="text-xs font-bold text-slate-600 dark:text-slate-400 mb-2">
          Search by:
        </p>
        <ul class="text-xs space-y-1 text-slate-600 dark:text-slate-400">
          <li>📖 Greek word: αγαπη</li>
          <li>🔤 Transliteration: agape</li>
          <li>🔢 Strong's: G25, 3779</li>
          <li>💬 English: love, god</li>
        </ul>
      </div>
    </div>
  );
}
