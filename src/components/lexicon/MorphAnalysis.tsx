import { h } from 'preact';

interface MorphData {
  posCode: string;
  pos: string;
  case?: string;
  number?: string;
  gender?: string;
  tense?: string;
  voice?: string;
  mood?: string;
  person?: string;
}

interface Props {
  morph: MorphData;
  rmac: string;
}

export default function MorphAnalysis({ morph, rmac }: Props) {
  if (!morph) return null;

  const features: { label: string; value: string }[] = [];

  // Build features list
  if (morph.pos) features.push({ label: 'Part of Speech', value: morph.pos });
  if (morph.case) features.push({ label: 'Case', value: morph.case });
  if (morph.number) features.push({ label: 'Number', value: morph.number });
  if (morph.gender) features.push({ label: 'Gender', value: morph.gender });
  if (morph.tense) features.push({ label: 'Tense', value: morph.tense });
  if (morph.voice) features.push({ label: 'Voice', value: morph.voice });
  if (morph.mood) features.push({ label: 'Mood', value: morph.mood });
  if (morph.person) features.push({ label: 'Person', value: morph.person });

  return (
    <div class="space-y-3">
      <h3 class="font-bold text-slate-700 dark:text-slate-300">
        Morphological Analysis
      </h3>

      {/* RMAC Code */}
      <div class="bg-slate-100 dark:bg-slate-700 p-3 rounded">
        <p class="text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
          RMAC Code
        </p>
        <p class="font-mono text-lg font-bold text-slate-900 dark:text-slate-100">
          {rmac}
        </p>
        <p class="text-xs text-slate-600 dark:text-slate-400 mt-1">
          Robinson Morphological Analysis Code
        </p>
      </div>

      {/* Features Grid */}
      <div class="grid grid-cols-2 gap-2">
        {features.map(({ label, value }) => (
          <div
            key={label}
            class="bg-slate-50 dark:bg-slate-800 p-3 rounded border border-slate-200 dark:border-slate-700"
          >
            <p class="text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
              {label}
            </p>
            <p class="text-sm font-semibold text-slate-900 dark:text-slate-100 capitalize">
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Explanation */}
      <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded p-3 text-xs text-blue-900 dark:text-blue-200">
        <p>
          <span class="font-bold">Example:</span> A verb in the{' '}
          {morph.tense && <em>{morph.tense}</em>} tense with{' '}
          {morph.voice && <em>{morph.voice}</em>} voice indicates the manner and
          type of action.
        </p>
      </div>
    </div>
  );
}
