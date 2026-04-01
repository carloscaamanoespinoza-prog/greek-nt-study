import { h } from 'preact';
import { useState } from 'preact/hooks';

interface Props {
  onInsert?: (char: string) => void;
  targetId?: string;
}

const greekLetters = [
  ['Α', 'α'],
  ['Β', 'β'],
  ['Γ', 'γ'],
  ['Δ', 'δ'],
  ['Ε', 'ε'],
  ['Ζ', 'ζ'],
  ['Η', 'η'],
  ['Θ', 'θ'],
  ['Ι', 'ι'],
  ['Κ', 'κ'],
  ['Λ', 'λ'],
  ['Μ', 'μ'],
  ['Ν', 'ν'],
  ['Ξ', 'ξ'],
  ['Ο', 'ο'],
  ['Π', 'π'],
  ['Ρ', 'ρ'],
  ['Σ', 'σ'],
  ['Τ', 'τ'],
  ['Υ', 'υ'],
  ['Φ', 'φ'],
  ['Χ', 'χ'],
  ['Ψ', 'ψ'],
  ['Ω', 'ω'],
];

const accents = [
  { char: 'ά', name: 'acute-alpha' },
  { char: 'έ', name: 'acute-epsilon' },
  { char: 'ή', name: 'acute-eta' },
  { char: 'ί', name: 'acute-iota' },
  { char: 'ό', name: 'acute-omicron' },
  { char: 'ύ', name: 'acute-upsilon' },
  { char: 'ώ', name: 'acute-omega' },
];

const punctuation = [
  { char: '·', name: 'middle-dot' },
  { char: ';', name: 'question-mark' },
  { char: ',', name: 'comma' },
  { char: '.', name: 'period' },
  { char: '·', name: 'dot' },
];

export default function GreekKeyboard({ onInsert, targetId }: Props) {
  const [showAccents, setShowAccents] = useState(false);

  const handleClick = (char: string) => {
    if (onInsert) {
      onInsert(char);
    } else if (targetId) {
      const input = document.getElementById(targetId) as HTMLInputElement;
      if (input) {
        const start = input.selectionStart || 0;
        const end = input.selectionEnd || 0;
        const text = input.value;
        input.value = text.slice(0, start) + char + text.slice(end);
        input.focus();
        input.setSelectionRange(start + 1, start + 1);
      }
    }
  };

  const handleCopy = (char: string) => {
    navigator.clipboard.writeText(char);
  };

  return (
    <div class="bg-slate-100 dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
      <div class="flex items-center justify-between mb-3">
        <h3 class="font-bold text-slate-900 dark:text-white text-sm">Greek Keyboard</h3>
        <button
          onClick={() => setShowAccents(!showAccents)}
          class="px-2 py-1 text-xs bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 rounded transition-colors"
          title={showAccents ? 'Hide accents' : 'Show accents'}
        >
          {showAccents ? 'Letters' : 'Accents'}
        </button>
      </div>

      {/* Main Greek Letters */}
      {!showAccents && (
        <div>
          <div class="grid grid-cols-12 gap-1 mb-2">
            {greekLetters.map(([upper, lower]) => (
              <button
                key={upper}
                onClick={() => handleClick(lower)}
                onContextMenu={(e) => {
                  e.preventDefault();
                  handleClick(upper);
                }}
                title={`Click: ${lower} | Right-click: ${upper}`}
                class="p-2 text-sm font-greek font-bold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded transition-colors cursor-pointer"
              >
                {lower}
              </button>
            ))}
          </div>

          {/* Punctuation */}
          <div class="flex gap-1 mb-2">
            {punctuation.map(({ char, name }) => (
              <button
                key={name}
                onClick={() => handleClick(char)}
                title={`Insert: ${name}`}
                class="flex-1 p-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 hover:bg-green-100 dark:hover:bg-green-900/30 rounded transition-colors"
              >
                {char}
              </button>
            ))}
          </div>

          <div class="text-xs text-slate-600 dark:text-slate-400">
            💡 Left-click for lowercase, right-click for uppercase
          </div>
        </div>
      )}

      {/* Accented Vowels */}
      {showAccents && (
        <div>
          <div class="grid grid-cols-4 gap-1">
            {accents.map(({ char, name }) => (
              <button
                key={name}
                onClick={() => handleClick(char)}
                title={`Insert: ${char}`}
                class="p-2 font-greek text-lg font-bold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 hover:bg-amber-100 dark:hover:bg-amber-900/30 rounded transition-colors"
              >
                {char}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Copy to Clipboard */}
      <div class="mt-3 text-xs text-slate-600 dark:text-slate-400">
        📋 Double-click any character above to copy to clipboard
      </div>
    </div>
  );
}
