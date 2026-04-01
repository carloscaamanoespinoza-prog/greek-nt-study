import { h } from 'preact';
import { useState } from 'preact/hooks';

interface Passage {
  id: string;
  ntRef: string;
  lxxRef: string;
  title: string;
  ntGreek: string;
  ntTranslit: string;
  ntEnglish: string;
  lxxGreek: string;
  lxxTranslit: string;
  lxxEnglish: string;
  notes: string;
}

const passages: Passage[] = [
  {
    id: '1',
    ntRef: 'Matthew 4:10',
    lxxRef: 'Deuteronomy 6:13',
    title: 'Worship the Lord Your God',
    ntGreek: 'κύριον τὸν θεόν σου προσκυνήσεις καὶ αὐτῷ μόνῳ λατρεύσεις',
    ntTranslit: 'Kýrion ton theón sou proskyněseís kaí autō̂i mónoii latreuseís',
    ntEnglish: 'The Lord your God you shall worship and serve him alone',
    lxxGreek: 'κύριον τὸν θεόν σου προσκυνήσεις καὶ αὐτῷ μόνῳ λατρεύσεις',
    lxxTranslit: 'Kýrion ton theón sou proskyněseís kaí autō̂i mónoii latreuseís',
    lxxEnglish: 'The Lord your God you shall worship and serve him alone',
    notes: 'Exact citation. Jesus quotes the LXX verbatim when tempted by Satan.',
  },
  {
    id: '2',
    ntRef: 'John 1:23',
    lxxRef: 'Isaiah 40:3',
    title: 'Voice Crying in the Wilderness',
    ntGreek: 'φωνὴ βοῶντος ἐν τῇ ἐρήμῳ',
    ntTranslit: 'Phōnḗ boôntos en tēi erḗmoii',
    ntEnglish: 'A voice of one crying out in the wilderness',
    lxxGreek: 'φωνὴ βοῶντος ἐν τῇ ἐρήμῳ',
    lxxTranslit: 'Phōnḗ boôntos en tēi erḗmoii',
    lxxEnglish: 'A voice of one crying in the wilderness',
    notes: 'John applies the Isaiah prophecy to John the Baptist. Minor variations in case endings.',
  },
  {
    id: '3',
    ntRef: 'Romans 15:9',
    lxxRef: 'Psalm 18:49 (LXX 17:49)',
    title: 'Praise Among the Gentiles',
    ntGreek: 'διὰ τοῦτο ἐξομολογήσομαί σοι ἐν τοῖς ἔθνεσιν',
    ntTranslit: 'Dià toûto exomologḗsomai soi en toîs éthnesi',
    ntEnglish: 'For this reason I will praise you among the Gentiles',
    lxxGreek: 'διὰ τοῦτο ἐξομολογήσομαί σοι ἐν τοῖς ἔθνεσιν',
    lxxTranslit: 'Dià toûto exomologḗsomai soi en toîs éthnesi',
    lxxEnglish: 'For this reason I will give praise to you among the Gentiles',
    notes: 'Paul quotes the Psalm to show Christ receives praise from Gentiles. Same Greek formula.',
  },
];

export default function LxxComparison() {
  const [activePassage, setActivePassage] = useState('1');

  const current = passages.find((p) => p.id === activePassage);

  return (
    <div class="space-y-6">
      {/* Introduction */}
      <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h3 class="font-bold text-slate-900 dark:text-white mb-2">The NT and the LXX</h3>
        <p class="text-sm text-slate-700 dark:text-slate-300 mb-2">
          The Septuagint (LXX) is the ancient Greek translation of the Hebrew scriptures, completed around the 2nd
          century BCE. Many early Christians read from the LXX, and New Testament writers often cite it directly.
        </p>
        <p class="text-sm text-slate-700 dark:text-slate-300">
          Below are three key passages where the NT quotes or alludes to the LXX. Compare the Greek texts side-by-side
          to see how closely the NT adheres to the LXX wording.
        </p>
      </div>

      {/* Passage Selector */}
      <div class="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
        <label class="block text-sm font-bold text-slate-900 dark:text-white mb-3">Select Passage</label>
        <div class="space-y-2">
          {passages.map((passage) => (
            <button
              key={passage.id}
              onClick={() => setActivePassage(passage.id)}
              class={`w-full text-left px-4 py-3 rounded transition-all ${
                activePassage === passage.id
                  ? 'bg-blue-600 text-white ring-2 ring-blue-400 dark:ring-blue-600'
                  : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-400'
              }`}
            >
              <div class="font-bold">{passage.title}</div>
              <div class="text-xs opacity-75">
                {passage.ntRef} / {passage.lxxRef}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Passage Display */}
      {current && (
        <div class="space-y-4">
          {/* Header */}
          <div class="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-1">{current.title}</h3>
            <div class="text-sm text-slate-700 dark:text-slate-300 space-y-1">
              <div>
                <strong>NT:</strong> {current.ntRef}
              </div>
              <div>
                <strong>LXX:</strong> {current.lxxRef}
              </div>
            </div>
          </div>

          {/* Two-Column Comparison */}
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* NT Column */}
            <div class="border-2 border-blue-200 dark:border-blue-800 rounded-lg p-4 bg-blue-50 dark:bg-blue-900/20">
              <h4 class="font-bold text-blue-900 dark:text-blue-100 mb-3 text-sm">New Testament</h4>

              <div class="mb-4">
                <label class="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">Greek Text</label>
                <div class="font-greek text-base font-semibold text-slate-900 dark:text-white bg-white dark:bg-slate-800 p-3 rounded border border-blue-200 dark:border-blue-700 leading-relaxed">
                  {current.ntGreek}
                </div>
              </div>

              <div class="mb-4">
                <label class="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">Transliteration</label>
                <div class="text-xs italic text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-800 p-3 rounded border border-blue-200 dark:border-blue-700">
                  {current.ntTranslit}
                </div>
              </div>

              <div>
                <label class="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">English</label>
                <div class="text-sm text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 p-3 rounded border border-blue-200 dark:border-blue-700">
                  {current.ntEnglish}
                </div>
              </div>
            </div>

            {/* LXX Column */}
            <div class="border-2 border-amber-200 dark:border-amber-800 rounded-lg p-4 bg-amber-50 dark:bg-amber-900/20">
              <h4 class="font-bold text-amber-900 dark:text-amber-100 mb-3 text-sm">Septuagint (LXX)</h4>

              <div class="mb-4">
                <label class="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">Greek Text</label>
                <div class="font-greek text-base font-semibold text-slate-900 dark:text-white bg-white dark:bg-slate-800 p-3 rounded border border-amber-200 dark:border-amber-700 leading-relaxed">
                  {current.lxxGreek}
                </div>
              </div>

              <div class="mb-4">
                <label class="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">Transliteration</label>
                <div class="text-xs italic text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-800 p-3 rounded border border-amber-200 dark:border-amber-700">
                  {current.lxxTranslit}
                </div>
              </div>

              <div>
                <label class="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">English</label>
                <div class="text-sm text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 p-3 rounded border border-amber-200 dark:border-amber-700">
                  {current.lxxEnglish}
                </div>
              </div>
            </div>
          </div>

          {/* Analysis */}
          <div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <h4 class="font-bold text-green-900 dark:text-green-100 mb-2 text-sm">Analysis</h4>
            <p class="text-sm text-slate-700 dark:text-slate-300">{current.notes}</p>
          </div>
        </div>
      )}

      {/* Context */}
      <div class="bg-slate-100 dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
        <h3 class="font-bold text-slate-900 dark:text-white mb-2 text-sm">About the LXX</h3>
        <ul class="text-sm text-slate-700 dark:text-slate-300 space-y-2">
          <li>
            <strong>Translation Date:</strong> The Septuagint was translated by Greek-speaking Jews between the 3rd and
            1st centuries BCE
          </li>
          <li>
            <strong>Scope:</strong> It includes the Hebrew Bible (Torah, Prophets, Writings) plus deuterocanonical books
          </li>
          <li>
            <strong>Importance:</strong> Early NT writers often cited the LXX rather than the Hebrew text, making it an
            essential witness to OT theology
          </li>
          <li>
            <strong>Variations:</strong> Comparing NT citations with LXX texts reveals how early Christians interpreted
            Scripture
          </li>
        </ul>
      </div>
    </div>
  );
}
