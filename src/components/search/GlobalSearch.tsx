import { h } from 'preact';
import { useState, useRef, useEffect } from 'preact/hooks';

interface Props {
  onSearch?: (query: string) => void;
  onSubmit?: (query: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
}

export default function GlobalSearch({
  onSearch,
  onSubmit,
  placeholder = 'Search Greek words, definitions, Strong\'s numbers...',
  autoFocus = true,
}: Props) {
  const [query, setQuery] = useState('');
  const [isActive, setIsActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleChange = (e: Event) => {
    const value = (e.target as HTMLInputElement).value;
    setQuery(value);
    onSearch?.(value);
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    onSubmit?.(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch?.('');
    inputRef.current?.focus();
  };

  return (
    <form onSubmit={handleSubmit} class="w-full">
      <div class="relative">
        {/* Search Icon */}
        <div class="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none">
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onInput={handleChange}
          onFocus={() => setIsActive(true)}
          onBlur={() => setIsActive(false)}
          placeholder={placeholder}
          class={`
            w-full pl-10 pr-10 py-3 rounded-lg font-sans text-sm
            border-2 transition-colors
            ${
              isActive
                ? 'border-blue-500 bg-white dark:bg-slate-800 shadow-lg'
                : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900'
            }
            text-slate-900 dark:text-white
            placeholder-slate-500 dark:placeholder-slate-400
            focus:outline-none
          `}
        />

        {/* Clear Button */}
        {query && (
          <button
            type="button"
            onClick={handleClear}
            class="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 font-bold"
          >
            ✕
          </button>
        )}
      </div>

      {/* Help Text */}
      {!query && isActive && (
        <div class="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 p-4 text-sm text-slate-600 dark:text-slate-300 z-10">
          <p class="font-bold mb-2">Search Tips:</p>
          <ul class="space-y-1 text-xs">
            <li>• Type Greek letters: αβγδ</li>
            <li>• Type transliteration: agape</li>
            <li>• Type Strong's: G25, 3779</li>
            <li>• Search definitions: love, God</li>
            <li>• Partial words work: "lov", "god"</li>
          </ul>
        </div>
      )}
    </form>
  );
}
