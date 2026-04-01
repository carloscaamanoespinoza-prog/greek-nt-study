import { h } from 'preact';
import { useState } from 'preact/hooks';
import WordPopup from '../lexicon/WordPopup';

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
        <p class="text-sm text-slate-600 dark:text-slate-400">
          {data.verses.length} verses • Click any word for analysis
        </p>
      </div>

      <div class="space-y-6">
        {data.verses.map((verse) => (
          <div key={verse.verse} class="verse-container">
            <div class="flex gap-4">
              <div class="verse-number min-w-fit font-bold text-slate-400 dark:text-slate-600">
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

      {/* Word Analysis Popup */}
      {selectedWord && (
        <WordPopup word={selectedWord} onClose={() => setSelectedWord(null)} />
      )}
    </div>
  );
}
