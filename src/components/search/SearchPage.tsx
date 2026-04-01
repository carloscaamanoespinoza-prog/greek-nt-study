import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import Fuse from 'fuse.js';
import GlobalSearch from './GlobalSearch';
import SearchFilters from './SearchFilters';
import SearchResults from './SearchResults';
import type { SearchFilters as SearchFiltersType } from './SearchFilters';

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
  searchIndex: SearchResult[];
}

export default function SearchPage({ searchIndex }: Props) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<SearchFiltersType>({
    minFrequency: 0,
    maxFrequency: Infinity,
  });

  // Initialize Fuse.js
  const fuse = new Fuse(searchIndex, {
    keys: ['searchText', 'greek', 'translit', 'gloss', 'definition'],
    threshold: 0.3,
    ignoreLocation: true,
    minMatchCharLength: 1,
  });

  // Perform search when query or filters change
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);

    // Search with Fuse.js
    let searchResults = fuse.search(query).map((result) => ({
      ...result.item,
      score: result.score,
    }));

    // Apply frequency filters
    searchResults = searchResults.filter(
      (r) =>
        r.frequency >= filters.minFrequency &&
        r.frequency <= filters.maxFrequency
    );

    // Sort by relevance (lower Fuse score is better)
    searchResults.sort((a, b) => (a.score || 0) - (b.score || 0));

    setResults(searchResults);
    setLoading(false);
  }, [query, filters]);

  return (
    <div class="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-slate-900 dark:text-white mb-2">
          Greek NT Search
        </h1>
        <p class="text-lg text-slate-600 dark:text-slate-400">
          Search by Greek word, transliteration, Strong's number, or English
          definition
        </p>
      </div>

      {/* Main search area */}
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left sidebar - Filters */}
        <div class="lg:col-span-1">
          <SearchFilters
            onFilterChange={(newFilters: SearchFiltersType) => {
              setFilters(newFilters);
            }}
          />
        </div>

        {/* Right side - Search and Results */}
        <div class="lg:col-span-3">
          <div class="mb-6">
            <GlobalSearch
              placeholder="Search Greek words, definitions, Strong's numbers..."
              autoFocus={true}
              onSearch={(searchQuery: string) => {
                setQuery(searchQuery);
              }}
              onSubmit={(searchQuery: string) => {
                setQuery(searchQuery);
              }}
            />
          </div>

          {/* Results */}
          <SearchResults
            results={results}
            query={query}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}
