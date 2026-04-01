import { h } from 'preact';
import { useState } from 'preact/hooks';

interface ConcordanceEntry {
  ref: string;
  bookId: string;
  chapter: number;
  verse: number;
  context: string;
  rmac: string;
}

interface Props {
  entries: ConcordanceEntry[] | string[];
  lemma: string;
  total: number;
}

export default function Concordance({ entries, lemma, total }: Props) {
  const [expanded, setExpanded] = useState(false);

  // Limit to first 5 by default, show up to 50 when expanded
  const displayLimit = expanded ? 50 : 5;
  const entriesToShow = (entries || []).slice(0, displayLimit);
  const hasMore = (entries || []).length > displayLimit;

  if (!entries || entries.length === 0) {
    return (
      <div class="text-center py-4 text-slate-500 dark:text-slate-400">
        <p>No concordance data available</p>
      </div>
    );
  }

  return (
    <div class="space-y-3">
      <div class="flex justify-between items-center">
        <h3 class="font-bold text-slate-700 dark:text-slate-300">Concordance</h3>
        <span class="text-xs font-bold bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-300 px-2 py-1 rounded">
          {total} occurrences
        </span>
      </div>

      <div class="space-y-2 max-h-64 overflow-y-auto">
        {entriesToShow.map((entry, idx) => {
          const ref =
            typeof entry === 'string' ? entry : `${entry.bookId} ${entry.chapter}:${entry.verse}`;

          return (
            <div
              key={`${ref}-${idx}`}
              class="p-2 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 text-sm"
            >
              <a
                href={`/reader/${typeof entry !== 'string' ? entry.bookId : ref.split(' ')[0].toLowerCase()}/${typeof entry !== 'string' ? entry.chapter : ref.split(':')[0]}`}
                class="font-bold text-blue-600 dark:text-blue-400 hover:underline block mb-1"
              >
                {ref}
              </a>
              {typeof entry !== 'string' && entry.context && (
                <p class="text-xs text-slate-600 dark:text-slate-400 font-greek leading-relaxed">
                  {entry.context}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Expand Button */}
      {hasMore && (
        <button
          onClick={() => setExpanded(!expanded)}
          class="w-full py-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
        >
          {expanded
            ? '← Show Less'
            : `Show All ${total} Occurrences →`}
        </button>
      )}

      {/* Statistics */}
      <div class="text-xs text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-700">
        <p>
          {typeof entries[0] === 'string'
            ? `${entries.length} references found`
            : `Showing ${entriesToShow.length} of ${entries.length} occurrences`}
        </p>
      </div>
    </div>
  );
}
