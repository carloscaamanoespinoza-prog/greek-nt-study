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

export default function GreekText({ data }: Props) {
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);

  if (!data || !data.verses) {
    return <div class="text-center py-8">Loading...</div>;
  }

  return (
    <div class="greek-text">
      <div class="mb-4">
        <h1 class="font-greek text-3xl font-bold mb-2">
          {data.book.charAt(0).toUpperCase() + data.book.slice(1)} {data.chapter}
        </h1>
        <p class="text-sm text-slate-600">
          {data.verses.length} verses
        </p>
      </div>

      <div class="space-y-6">
        {data.verses.map((verse) => (
          <div key={verse.verse} class="verse-container">
            <div class="flex gap-4">
              <div class="verse-number min-w-fit font-bold text-slate-400">
                {verse.verse}
              </div>
              <div class="verse-text flex flex-wrap gap-1">
                {verse.words.map((word, idx) => (
                  <span key={word.id} class="word-group inline">
                    <span
                      class="greek-word inline-block"
                      onClick={() => setSelectedWord(word)}
                      title={word.gloss}
                    >
                      {word.text}
                    </span>
                    {word.punct && <span class="inline">{word.punct}</span>}
                    {idx < verse.words.length - 1 && !word.punct && (
                      <span class="inline" />
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Word Info Popup */}
      {selectedWord && (
        <WordInfo word={selectedWord} onClose={() => setSelectedWord(null)} />
      )}
    </div>
  );
}

interface WordInfoProps {
  word: Word;
  onClose: () => void;
}

function WordInfo({ word, onClose }: WordInfoProps) {
  const getMorphDescription = (morph: any): string => {
    const parts = [];
    if (morph.pos) parts.push(morph.pos);
    if (morph.case) parts.push(morph.case);
    if (morph.gender) parts.push(morph.gender);
    if (morph.number) parts.push(morph.number);
    if (morph.tense) parts.push(morph.tense);
    if (morph.voice) parts.push(morph.voice);
    if (morph.mood) parts.push(morph.mood);
    if (morph.person) parts.push(morph.person);
    return parts.join(', ');
  };

  return (
    <div class="fixed inset-0 z-50" onClick={onClose}>
      <div
        class="fixed bottom-8 right-8 max-w-sm bg-white dark:bg-slate-800 rounded-lg shadow-2xl border border-slate-200 dark:border-slate-700 p-6 max-h-96 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div class="flex justify-between items-start mb-4">
          <h3 class="font-greek text-2xl font-bold">{word.text}</h3>
          <button
            onClick={onClose}
            class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 font-bold text-xl"
          >
            ✕
          </button>
        </div>

        <div class="space-y-3 text-sm">
          {/* Lemma and Strong's */}
          <div>
            <p class="font-bold text-slate-600 dark:text-slate-400">Lemma</p>
            <p class="font-greek text-lg">{word.lemma}</p>
            {word.strongs && (
              <p class="text-slate-600 dark:text-slate-400">
                Strong's: {word.strongs}
              </p>
            )}
          </div>

          {/* Definition */}
          <div>
            <p class="font-bold text-slate-600 dark:text-slate-400">Meaning</p>
            <p>{word.gloss}</p>
          </div>

          {/* Morphology */}
          <div>
            <p class="font-bold text-slate-600 dark:text-slate-400">
              Morphology
            </p>
            <p class="font-mono text-xs bg-slate-100 dark:bg-slate-700 p-2 rounded">
              {word.rmac}
            </p>
            <p class="text-slate-700 dark:text-slate-300">
              {getMorphDescription(word.morph)}
            </p>
          </div>

          {/* Frequency */}
          <div>
            <p class="font-bold text-slate-600 dark:text-slate-400">
              Frequency
            </p>
            <p>{word.freq} times in the NT</p>
          </div>
        </div>
      </div>
    </div>
  );
}
