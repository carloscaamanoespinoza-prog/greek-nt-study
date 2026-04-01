import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import WordDefinition from './WordDefinition';
import Etymology from './Etymology';
import MorphAnalysis from './MorphAnalysis';
import Concordance from './Concordance';

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

interface LexiconEntry {
  strongs: number;
  greek: string;
  translit: string;
  pronunciation: string;
  gloss: string;
  definition: string;
  kjvTranslations: string[];
  etymology: any;
  frequency: number;
}

interface Props {
  word: Word;
  onClose: () => void;
}

export default function WordPopup({ word, onClose }: Props) {
  const [lexiconData, setLexiconData] = useState<LexiconEntry | null>(null);
  const [concordanceData, setConcordanceData] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'definition' | 'morphology' | 'etymology' | 'concordance'>('definition');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load lexicon data
    if (word.strongs) {
      setLoading(true);
      // Try to load from data/lexicon/strongs-index.json
      fetch('/data/lexicon/strongs-index.json')
        .then((res) => res.json())
        .then((data) => {
          if (data[word.strongs!]) {
            setLexiconData(data[word.strongs!]);
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }

    // Load concordance data
    if (word.lemma) {
      fetch('/data/concordance/index.json')
        .then((res) => res.json())
        .then((data) => {
          if (data[word.lemma]) {
            setConcordanceData(data[word.lemma]);
          }
        })
        .catch(() => {});
    }
  }, [word]);

  const tabClasses =
    'flex-1 px-3 py-2 text-sm font-semibold border-b-2 transition-colors';
  const activeTabClass = 'border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400';
  const inactiveTabClass =
    'border-transparent text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700';

  return (
    <div class="fixed inset-0 z-50" onClick={onClose}>
      <div
        class="fixed bottom-8 right-8 max-w-2xl w-96 bg-white dark:bg-slate-800 rounded-lg shadow-2xl border border-slate-200 dark:border-slate-700 max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div class="flex justify-between items-start p-6 border-b border-slate-200 dark:border-slate-700">
          <div>
            <h2 class="font-greek text-3xl font-bold text-slate-900 dark:text-white">
              {word.text}
            </h2>
            <p class="text-sm text-slate-600 dark:text-slate-400 mt-1">
              {word.gloss}
            </p>
          </div>
          <button
            onClick={onClose}
            class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 font-bold text-2xl leading-none"
          >
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div class="flex border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
          <button
            onClick={() => setActiveTab('definition')}
            class={`${tabClasses} ${
              activeTab === 'definition' ? activeTabClass : inactiveTabClass
            }`}
          >
            Definition
          </button>
          <button
            onClick={() => setActiveTab('morphology')}
            class={`${tabClasses} ${
              activeTab === 'morphology' ? activeTabClass : inactiveTabClass
            }`}
          >
            Grammar
          </button>
          <button
            onClick={() => setActiveTab('etymology')}
            class={`${tabClasses} ${
              activeTab === 'etymology' ? activeTabClass : inactiveTabClass
            }`}
          >
            Etymology
          </button>
          <button
            onClick={() => setActiveTab('concordance')}
            class={`${tabClasses} ${
              activeTab === 'concordance' ? activeTabClass : inactiveTabClass
            }`}
          >
            Usage
          </button>
        </div>

        {/* Content */}
        <div class="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div class="text-center py-4 text-slate-500">Loading...</div>
          ) : (
            <>
              {activeTab === 'definition' && lexiconData ? (
                <WordDefinition entry={lexiconData} />
              ) : activeTab === 'definition' ? (
                <div class="text-slate-600 dark:text-slate-400">
                  <p class="mb-2">
                    <span class="font-bold">Lemma:</span> {word.lemma}
                  </p>
                  <p class="mb-2">
                    <span class="font-bold">Meaning:</span> {word.gloss}
                  </p>
                  {word.strongs && (
                    <p>
                      <span class="font-bold">Strong's:</span> G{word.strongs}
                    </p>
                  )}
                </div>
              ) : null}

              {activeTab === 'morphology' && (
                <MorphAnalysis morph={word.morph} rmac={word.rmac} />
              )}

              {activeTab === 'etymology' && lexiconData?.etymology ? (
                <Etymology etymology={lexiconData.etymology} />
              ) : activeTab === 'etymology' ? (
                <div class="text-slate-600 dark:text-slate-400 text-sm">
                  <p>
                    {lexiconData?.etymology?.historicalNote ||
                      'Etymology data not available'}
                  </p>
                </div>
              ) : null}

              {activeTab === 'concordance' && (
                <Concordance
                  entries={concordanceData}
                  lemma={word.lemma}
                  total={word.freq}
                />
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div class="border-t border-slate-200 dark:border-slate-700 p-4 bg-slate-50 dark:bg-slate-900/50 text-xs text-slate-600 dark:text-slate-400">
          <div class="flex justify-between items-center">
            <span>
              <strong>Lemma:</strong> {word.lemma} | <strong>Freq:</strong>{' '}
              {word.freq}
            </span>
            {word.strongs && (
              <span class="font-mono bg-white dark:bg-slate-800 px-2 py-1 rounded">
                G{word.strongs}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
