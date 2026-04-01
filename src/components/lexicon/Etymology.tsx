import { h } from 'preact';

interface StrongsRef {
  strongs: number;
  greek: string;
  relationship: 'root' | 'prefix' | 'suffix' | 'cognate';
}

interface EtymologyData {
  roots: StrongsRef[];
  cognates: StrongsRef[];
  derivedWords: StrongsRef[];
  historicalNote?: string;
}

interface Props {
  etymology: EtymologyData;
}

export default function Etymology({ etymology }: Props) {
  if (!etymology) return null;

  const relationshipLabel = {
    root: 'Root Word',
    prefix: 'Prefix',
    suffix: 'Suffix',
    cognate: 'Cognate',
  };

  return (
    <div class="space-y-4">
      <h3 class="font-bold text-slate-700 dark:text-slate-300">Etymology</h3>

      {/* Roots */}
      {etymology.roots && etymology.roots.length > 0 && (
        <div>
          <p class="text-xs font-bold text-slate-600 dark:text-slate-400 mb-2">
            ROOT WORDS
          </p>
          <div class="space-y-2">
            {etymology.roots.map((root) => (
              <div
                key={root.strongs}
                class="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-800 rounded text-sm"
              >
                <span class="font-greek font-bold text-slate-700 dark:text-slate-300">
                  {root.greek}
                </span>
                <span class="text-xs text-slate-500">
                  G{root.strongs}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cognates */}
      {etymology.cognates && etymology.cognates.length > 0 && (
        <div>
          <p class="text-xs font-bold text-slate-600 dark:text-slate-400 mb-2">
            COGNATE WORDS
          </p>
          <div class="space-y-2">
            {etymology.cognates.map((cognate) => (
              <div
                key={cognate.strongs}
                class="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-800 rounded text-sm"
              >
                <span class="font-greek font-bold text-slate-700 dark:text-slate-300">
                  {cognate.greek}
                </span>
                <span class="text-xs text-slate-500">
                  G{cognate.strongs}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Derived Words */}
      {etymology.derivedWords && etymology.derivedWords.length > 0 && (
        <div>
          <p class="text-xs font-bold text-slate-600 dark:text-slate-400 mb-2">
            DERIVED WORDS
          </p>
          <div class="space-y-2">
            {etymology.derivedWords.map((word) => (
              <div
                key={word.strongs}
                class="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-800 rounded text-sm"
              >
                <span class="font-greek font-bold text-slate-700 dark:text-slate-300">
                  {word.greek}
                </span>
                <span class="text-xs text-slate-500">
                  G{word.strongs}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Historical Note */}
      {etymology.historicalNote && (
        <div class="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded p-3 text-sm">
          <p class="text-amber-900 dark:text-amber-200">
            {etymology.historicalNote}
          </p>
        </div>
      )}
    </div>
  );
}
