import { h } from 'preact';
import { useState } from 'preact/hooks';

interface TextualVariant {
  id: string;
  passage: string;
  verse: string;
  topic: string;
  significance: string;
  alexandrian: {
    reading: string;
    witnesses: string[];
    support: string;
  };
  byzantine: {
    reading: string;
    witnesses: string[];
    support: string;
  };
  commentary: string;
}

const variants: TextualVariant[] = [
  {
    id: '1',
    passage: 'John 1:18',
    verse: '1:18',
    topic: 'The Nature of the Son',
    significance: 'High — theological implication about Christ\'s nature',
    alexandrian: {
      reading: 'μονογενὴς θεός (monogenēs theos)',
      witnesses: ['P66', 'P75', 'א*', 'B', 'C'],
      support: 'Early and high-quality MSS. Greek "only-begotten God".',
    },
    byzantine: {
      reading: 'μονογενὴς υἱός (monogenēs huios)',
      witnesses: ['𝔐', 'K', 'W', 'Γ', 'M'],
      support: 'Later MSS. Greek "only-begotten Son".',
    },
    commentary:
      'The Alexandrian reading emphasizes Jesus as God himself. The Byzantine reading shifts to "Son," which is theologically safer. Modern scholarship favors "God" as the harder reading.',
  },
  {
    id: '2',
    passage: 'John 3:15',
    verse: '3:15',
    topic: 'Belief and Salvation',
    significance: 'Medium — affects understanding of faith\'s object',
    alexandrian: {
      reading: 'εἰς αὐτόν (eis auton)',
      witnesses: ['P66', 'P75', 'א', 'B', 'L'],
      support: 'Strong early support. Preposition "into."',
    },
    byzantine: {
      reading: 'ἐν αὐτῷ (en autō)',
      witnesses: ['𝔐', 'K', 'W'],
      support: 'Later MSS. Preposition "in."',
    },
    commentary:
      '"Into" emphasizes movement toward faith (directional), while "in" emphasizes the state of faith (locative). The change may reflect evolving Greek usage or later scribal standardization.',
  },
  {
    id: '3',
    passage: 'Mark 1:1',
    verse: '1:1',
    topic: 'Gospel Opening',
    significance: 'Low — affects title interpretation',
    alexandrian: {
      reading: 'Ἀρχὴ τοῦ εὐαγγελίου Ἰησοῦ Χριστοῦ',
      witnesses: ['𝔓45', 'א', 'B', 'D', 'L'],
      support: 'Omits "υἱοῦ θεοῦ" (Son of God).',
    },
    byzantine: {
      reading: 'Ἀρχὴ τοῦ εὐαγγελίου Ἰησοῦ Χριστοῦ υἱοῦ θεοῦ',
      witnesses: ['𝔐', 'K', 'W', 'A'],
      support: 'Includes "Son of God" as christological title.',
    },
    commentary:
      'Mark\'s opening likely did not originally include "Son of God." Later scribes added it to emphasize Mark\'s Christology. The shorter form appears in our oldest manuscripts.',
  },
  {
    id: '4',
    passage: '1 John 5:7-8',
    verse: '5:7-8',
    topic: 'The Johannine Comma — Trinitarian witness',
    significance: 'High — theological claim about the Trinity',
    alexandrian: {
      reading: 'τρεῖς εἰσίν οἱ μαρτυροῦντες, τὸ πνεῦμα καὶ τὸ ὕδωρ καὶ τὸ αἷμα',
      witnesses: ['𝔓74', 'א', 'A', 'B', 'C'],
      support: 'Three witnesses: Spirit, water, and blood.',
    },
    byzantine: {
      reading:
        'ὅτι τρεῖς εἰσίν οἱ μαρτυροῦντες ἐν τῷ οὐρανῷ, ὁ πατήρ, ὁ λόγος, καὶ τὸ ἅγιον πνεῦμα· καὶ οἱ τρεῖς εἰσιν εἷς.',
      witnesses: ['𝔐 (late)', 'KJV tradition'],
      support: 'Adds explicit Trinitarian statement: Father, Word, Holy Spirit (not in early MSS).',
    },
    commentary:
      'The heavenly witnesses (Father, Son, Spirit) passage appears nowhere in Greek MSS before the 15th century. It was added by Western Latin scribes to strengthen Trinity doctrine. Not authentic.',
  },
  {
    id: '5',
    passage: 'John 7:53-8:11',
    verse: '7:53-8:11',
    topic: 'The Pericope Adulterae — woman caught in adultery',
    significance: 'High — authenticity of entire passage disputed',
    alexandrian: {
      reading: 'Omitted entirely',
      witnesses: ['𝔓66', '𝔓75', 'א', 'B', 'L', 'W'],
      support: 'Not present in earliest Greek MSS or early versions.',
    },
    byzantine: {
      reading: 'Full pericope (7:53-8:11) included in text',
      witnesses: ['𝔐', 'K', 'later MSS'],
      support: 'Added in Byzantine period, likely from oral tradition or separate document.',
    },
    commentary:
      'This beautiful story is absent from all early Greek manuscripts and early church fathers. It was added later, likely from an authentic tradition but not part of the original Gospel of John.',
  },
];

export default function TextualNotes() {
  const [expandedVariant, setExpandedVariant] = useState<string | null>('1');

  return (
    <div class="space-y-6">
      {/* Introduction */}
      <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h3 class="font-bold text-slate-900 dark:text-white mb-2">Textual Criticism & Variants</h3>
        <p class="text-sm text-slate-700 dark:text-slate-300 mb-2">
          Since we have no original autographs, scholars compare thousands of ancient Greek manuscripts to determine the
          most likely original reading. Below are 5 key textual variants from the NT where manuscript evidence differs
          significantly.
        </p>
        <p class="text-sm text-slate-700 dark:text-slate-300">
          <strong>Two main textual traditions:</strong> The <strong>Alexandrian</strong> tradition (Egypt, early &amp;
          reliable) and the <strong>Byzantine</strong> tradition (later, more common in church use).
        </p>
      </div>

      {/* Variant List */}
      <div class="space-y-3">
        {variants.map((variant) => (
          <div
            key={variant.id}
            class="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-slate-800"
          >
            {/* Header / Clickable */}
            <button
              onClick={() => setExpandedVariant(expandedVariant === variant.id ? null : variant.id)}
              class="w-full text-left px-4 py-3 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 hover:from-slate-100 hover:to-slate-200 dark:hover:from-slate-700 dark:hover:to-slate-600 transition-colors flex items-center justify-between"
            >
              <div>
                <div class="font-bold text-slate-900 dark:text-white">{variant.passage}</div>
                <div class="text-sm text-slate-600 dark:text-slate-400 mt-1">{variant.topic}</div>
              </div>
              <div class="text-2xl text-slate-400 dark:text-slate-500">{expandedVariant === variant.id ? '−' : '+'}</div>
            </button>

            {/* Expanded Content */}
            {expandedVariant === variant.id && (
              <div class="px-4 py-4 space-y-4">
                {/* Significance Badge */}
                <div class="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 dark:bg-yellow-900/40 text-yellow-900 dark:text-yellow-200 border border-yellow-300 dark:border-yellow-700">
                  {variant.significance}
                </div>

                {/* Two-Column Comparison */}
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Alexandrian */}
                  <div class="border border-blue-200 dark:border-blue-800 rounded-lg p-3 bg-blue-50 dark:bg-blue-900/20">
                    <h4 class="font-bold text-blue-900 dark:text-blue-100 text-sm mb-2">Alexandrian Reading</h4>

                    <div class="mb-3">
                      <label class="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">Greek</label>
                      <div class="font-greek font-semibold text-slate-900 dark:text-white bg-white dark:bg-slate-800 p-2 rounded text-sm leading-relaxed">
                        {variant.alexandrian.reading}
                      </div>
                    </div>

                    <div class="mb-3">
                      <label class="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">Support</label>
                      <div class="text-xs text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 p-2 rounded">
                        <div class="font-semibold mb-1">Witnesses: {variant.alexandrian.witnesses.join(', ')}</div>
                        <div>{variant.alexandrian.support}</div>
                      </div>
                    </div>
                  </div>

                  {/* Byzantine */}
                  <div class="border border-amber-200 dark:border-amber-800 rounded-lg p-3 bg-amber-50 dark:bg-amber-900/20">
                    <h4 class="font-bold text-amber-900 dark:text-amber-100 text-sm mb-2">Byzantine Reading</h4>

                    <div class="mb-3">
                      <label class="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">Greek</label>
                      <div class="font-greek font-semibold text-slate-900 dark:text-white bg-white dark:bg-slate-800 p-2 rounded text-sm leading-relaxed">
                        {variant.byzantine.reading}
                      </div>
                    </div>

                    <div class="mb-3">
                      <label class="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">Support</label>
                      <div class="text-xs text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 p-2 rounded">
                        <div class="font-semibold mb-1">Witnesses: {variant.byzantine.witnesses.join(', ')}</div>
                        <div>{variant.byzantine.support}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Commentary */}
                <div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                  <h5 class="font-bold text-green-900 dark:text-green-100 text-sm mb-1">Commentary</h5>
                  <p class="text-sm text-slate-700 dark:text-slate-300">{variant.commentary}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Reference Section */}
      <div class="bg-slate-100 dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
        <h3 class="font-bold text-slate-900 dark:text-white mb-2 text-sm">Manuscript Abbreviations</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-700 dark:text-slate-300">
          <div>
            <strong class="text-slate-900 dark:text-white">𝔓</strong> = Papyrus fragment (very early, often 2nd-3rd century)
          </div>
          <div>
            <strong class="text-slate-900 dark:text-white">א</strong> = Codex Sinaiticus (4th century, very important)
          </div>
          <div>
            <strong class="text-slate-900 dark:text-white">B</strong> = Codex Vaticanus (4th century, excellent quality)
          </div>
          <div>
            <strong class="text-slate-900 dark:text-white">𝔐</strong> = Majority text (Byzantine tradition, later)
          </div>
          <div>
            <strong class="text-slate-900 dark:text-white">KJV</strong> = King James Version tradition
          </div>
          <div>
            <strong class="text-slate-900 dark:text-white">*</strong> = Original hand (later corrections marked differently)
          </div>
        </div>
      </div>

      {/* Study Notes */}
      <div class="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
        <h4 class="font-bold text-slate-900 dark:text-white mb-2 text-sm">Why Textual Criticism Matters</h4>
        <ul class="text-sm text-slate-700 dark:text-slate-300 space-y-2">
          <li class="flex gap-2">
            <span>✓</span> <span>Helps us understand what the original authors likely wrote</span>
          </li>
          <li class="flex gap-2">
            <span>✓</span>
            <span>Shows how Scripture was copied and transmitted over centuries</span>
          </li>
          <li class="flex gap-2">
            <span>✓</span> <span>Identifies where later scribes harmonized, expanded, or "corrected" texts</span>
          </li>
          <li class="flex gap-2">
            <span>✓</span>
            <span>Demonstrates that variations are usually minor and don\'t affect major doctrine</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
