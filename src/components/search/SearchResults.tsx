import { h } from 'preact';

interface SearchResult {
  id: number;
  strongs: number;
  greek: string;
  translit: string;
  gloss: string;
  definition: string;
  kjvTranslations: string;
  frequency: number;
  score?: number;
}

interface Props {
  results: SearchResult[];
  query: string;
  loading?: boolean;
  onResultClick?: (result: SearchResult) => void;
}

export default function SearchResults({
  results,
  query,
  loading = false,
  onResultClick,
}: Props) {
  if (loading) {
    return (
      <div class="text-center py-8">
        <div class="inline-block animate-spin">
          <svg
            class="w-6 h-6 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </div>
      </div>
    );
  }

  if (!results || results.length === 0) {
    return (
      <div class="text-center py-12">
        <p class="text-slate-500 dark:text-slate-400 mb-2">
          {query ? `No results found for "${query}"` : 'Enter a search term'}
        </p>
        {query && (
          <p class="text-xs text-slate-400 dark:text-slate-500">
            Try different keywords or transliteration
          </p>
        )}
      </div>
    );
  }

  return (
    <div class="space-y-3">
      <p class="text-sm font-bold text-slate-600 dark:text-slate-400 px-1">
        Found {results.length} result{results.length !== 1 ? 's' : ''}
      </p>

      <div class="space-y-2">
        {results.map((result) => (
          <a
            key={result.id}
            href={`/reader/john/3`}
            onClick={() => onResultClick?.(result)}
            class="block p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600 transition-all cursor-pointer group"
          >
            {/* Header Row */}
            <div class="flex items-start justify-between gap-4 mb-2">
              <div class="flex-1">
                <h3 class="font-greek text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {result.greek}
                </h3>
                <p class="text-sm text-slate-600 dark:text-slate-400">
                  {result.translit}
                </p>
              </div>
              <div class="text-right flex-shrink-0">
                <p class="font-mono text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded">
                  G{result.strongs}
                </p>
              </div>
            </div>

            {/* Gloss */}
            <p class="font-semibold text-slate-700 dark:text-slate-300 mb-2">
              {result.gloss}
            </p>

            {/* Definition (truncated) */}
            <p class="text-sm text-slate-600 dark:text-slate-400 mb-2 line-clamp-2">
              {result.definition}
            </p>

            {/* Footer Row */}
            <div class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-500">
              <div class="space-x-2">
                {result.kjvTranslations && (
                  <span class="inline-block bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded">
                    {result.kjvTranslations.split('|')[0]}
                  </span>
                )}
              </div>
              <span>
                <strong>{result.frequency}</strong> times in NT
              </span>
            </div>

            {/* Relevance Score (if available) */}
            {result.score !== undefined && (
              <div class="mt-2 h-1 bg-slate-100 dark:bg-slate-700 rounded overflow-hidden">
                <div
                  class="h-full bg-blue-600"
                  style={{
                    width: `${Math.min(result.score * 100, 100)}%`,
                  }}
                />
              </div>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}
