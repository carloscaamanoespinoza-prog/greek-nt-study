import { h } from 'preact';

interface LexiconEntry {
  strongs: number;
  greek: string;
  translit: string;
  pronunciation: string;
  gloss: string;
  definition: string;
  kjvTranslations: string[];
  frequency: number;
}

interface Props {
  entry: LexiconEntry;
}

export default function WordDefinition({ entry }: Props) {
  if (!entry) return null;

  return (
    <div class="space-y-4">
      {/* Header */}
      <div class="border-b border-slate-200 dark:border-slate-700 pb-3">
        <div class="font-greek text-2xl font-bold mb-1">{entry.greek}</div>
        <div class="text-sm text-slate-600 dark:text-slate-400">
          {entry.translit}
        </div>
        {entry.pronunciation && (
          <div class="text-xs text-slate-500 italic">{entry.pronunciation}</div>
        )}
      </div>

      {/* Quick Definition */}
      <div>
        <p class="font-bold text-slate-700 dark:text-slate-300 mb-1">
          {entry.gloss}
        </p>
      </div>

      {/* Full Definition */}
      <div>
        <p class="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          {entry.definition}
        </p>
      </div>

      {/* KJV Translations */}
      {entry.kjvTranslations && entry.kjvTranslations.length > 0 && (
        <div>
          <p class="text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
            KJV Translations
          </p>
          <div class="flex flex-wrap gap-2">
            {entry.kjvTranslations.map((trans) => (
              <span
                key={trans}
                class="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded text-xs"
              >
                {trans}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Strong's Number */}
      <div class="bg-slate-50 dark:bg-slate-800 p-2 rounded text-xs">
        <span class="font-bold text-slate-600 dark:text-slate-400">
          Strong's:
        </span>
        <span class="ml-2 font-mono text-slate-700 dark:text-slate-300">
          G{entry.strongs}
        </span>
      </div>

      {/* Frequency */}
      <div class="text-xs text-slate-600 dark:text-slate-400">
        <p>
          <span class="font-bold">Frequency:</span> {entry.frequency.toLocaleString()}{' '}
          times in NT
        </p>
        <div class="mt-2 w-full bg-slate-200 dark:bg-slate-700 rounded h-2 overflow-hidden">
          <div
            class="bg-blue-600 h-full"
            style={{
              width: `${Math.min((entry.frequency / 20) * 100, 100)}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
