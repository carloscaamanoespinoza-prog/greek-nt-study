import { h } from 'preact';
import { useState, useMemo } from 'preact/hooks';

interface AspectVerb {
  id: string;
  greek: string;
  translit: string;
  meaning: string;
  aspect: 'perfectivo' | 'imperfectivo' | 'estativo';
  example: string;
  exampleVerse: string;
  exampleText: string;
  frequency: number;
}

const verbs: AspectVerb[] = [
  {
    id: '1',
    greek: 'ἀγαπάω',
    translit: 'agapáō',
    meaning: 'love, cherish',
    aspect: 'imperfectivo',
    example: 'ἀγαπᾷ τὸν κόσμον',
    exampleVerse: 'John 3:16',
    exampleText: 'loves the world',
    frequency: 143,
  },
  {
    id: '2',
    greek: 'ἀπέρχομαι',
    translit: 'apérchomai',
    meaning: 'go away, depart',
    aspect: 'perfectivo',
    example: 'ἀπῆλθεν ἀπ\' αὐτοῦ',
    exampleVerse: 'Matt 13:25',
    exampleText: 'went away from him',
    frequency: 117,
  },
  {
    id: '3',
    greek: 'πιστεύω',
    translit: 'pisteúō',
    meaning: 'believe, trust',
    aspect: 'imperfectivo',
    example: 'πιστεύει εἰς τὸν υἱόν',
    exampleVerse: 'John 3:36',
    exampleText: 'believes in the Son',
    frequency: 248,
  },
  {
    id: '4',
    greek: 'εὑρίσκω',
    translit: 'heurískō',
    meaning: 'find, discover',
    aspect: 'perfectivo',
    example: 'εὗρον τὸν ἀδελφόν',
    exampleVerse: 'John 1:41',
    exampleText: 'found his brother',
    frequency: 176,
  },
  {
    id: '5',
    greek: 'οἶδα',
    translit: 'oída',
    meaning: 'know',
    aspect: 'estativo',
    example: 'οἴδατε ὅτι ἀληθής ἐστιν',
    exampleVerse: 'John 7:26',
    exampleText: 'you know that it is true',
    frequency: 321,
  },
  {
    id: '6',
    greek: 'γινώσκω',
    translit: 'ginṓskō',
    meaning: 'know, come to know',
    aspect: 'imperfectivo',
    example: 'ἵνα γινώσκητε τὸν ἀληθινόν',
    exampleVerse: '1 John 5:20',
    exampleText: 'that you know the true one',
    frequency: 221,
  },
  {
    id: '7',
    greek: 'ἔχω',
    translit: 'échō',
    meaning: 'have, hold',
    aspect: 'estativo',
    example: 'ἔχει ζωὴν αἰώνιον',
    exampleVerse: 'John 3:36',
    exampleText: 'has eternal life',
    frequency: 708,
  },
  {
    id: '8',
    greek: 'δίδωμι',
    translit: 'dídōmi',
    meaning: 'give',
    aspect: 'perfectivo',
    example: 'ἔδωκεν τὸν υἱόν',
    exampleVerse: 'John 3:16',
    exampleText: 'gave the Son',
    frequency: 415,
  },
];

export default function VerbalAspectChart() {
  const [selectedAspect, setSelectedAspect] = useState<'all' | 'perfectivo' | 'imperfectivo' | 'estativo'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVerbs = useMemo(() => {
    return verbs.filter((verb) => {
      const matchesAspect = selectedAspect === 'all' || verb.aspect === selectedAspect;
      const matchesSearch =
        searchTerm === '' ||
        verb.greek.toLowerCase().includes(searchTerm.toLowerCase()) ||
        verb.translit.toLowerCase().includes(searchTerm.toLowerCase()) ||
        verb.meaning.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesAspect && matchesSearch;
    });
  }, [selectedAspect, searchTerm]);

  const aspectBadgeColor = (aspect: string) => {
    switch (aspect) {
      case 'perfectivo':
        return 'bg-blue-100 dark:bg-blue-900/40 text-blue-900 dark:text-blue-200 border border-blue-300 dark:border-blue-700';
      case 'imperfectivo':
        return 'bg-amber-100 dark:bg-amber-900/40 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-700';
      case 'estativo':
        return 'bg-green-100 dark:bg-green-900/40 text-green-900 dark:text-green-200 border border-green-300 dark:border-green-700';
      default:
        return 'bg-slate-100 dark:bg-slate-800';
    }
  };

  return (
    <div class="space-y-6">
      {/* Introduction */}
      <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h3 class="font-bold text-slate-900 dark:text-white mb-2">Porter's Aspect Theory</h3>
        <p class="text-sm text-slate-700 dark:text-slate-300 mb-3">
          Greek verbs express aspect (how the action is viewed) rather than time:
        </p>
        <ul class="text-xs text-slate-700 dark:text-slate-300 space-y-1">
          <li>
            <strong class="text-blue-900 dark:text-blue-200">Perfectivo:</strong> Presents action as a completed whole
            (aorist tense most common)
          </li>
          <li>
            <strong class="text-amber-900 dark:text-amber-200">Imperfectivo:</strong> Presents action in progress or
            as a process (present tense most common)
          </li>
          <li>
            <strong class="text-green-900 dark:text-green-200">Estativo:</strong> Presents a state of being or
            completed state (perfect tense most common)
          </li>
        </ul>
      </div>

      {/* Controls */}
      <div class="space-y-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
        <div>
          <label class="block text-sm font-bold text-slate-900 dark:text-white mb-2">Filter by Aspect</label>
          <div class="flex flex-wrap gap-2">
            {(['all', 'perfectivo', 'imperfectivo', 'estativo'] as const).map((aspect) => (
              <button
                key={aspect}
                onClick={() => setSelectedAspect(aspect)}
                class={`px-3 py-1.5 rounded text-sm font-medium transition-all ${
                  selectedAspect === aspect
                    ? 'ring-2 ring-offset-2 dark:ring-offset-slate-900'
                    : 'opacity-70 hover:opacity-100'
                } ${
                  aspect === 'all'
                    ? 'bg-slate-300 dark:bg-slate-700 text-slate-900 dark:text-white ring-slate-400 dark:ring-slate-600'
                    : aspect === 'perfectivo'
                      ? `${aspectBadgeColor('perfectivo')} ${selectedAspect === aspect ? 'ring-blue-400 dark:ring-blue-600' : ''}`
                      : aspect === 'imperfectivo'
                        ? `${aspectBadgeColor('imperfectivo')} ${selectedAspect === aspect ? 'ring-amber-400 dark:ring-amber-600' : ''}`
                        : `${aspectBadgeColor('estativo')} ${selectedAspect === aspect ? 'ring-green-400 dark:ring-green-600' : ''}`
                }`}
              >
                {aspect === 'all' ? 'All Aspects' : aspect.charAt(0).toUpperCase() + aspect.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label class="block text-sm font-bold text-slate-900 dark:text-white mb-2">Search</label>
          <input
            type="text"
            placeholder="Search by Greek, transliteration, or meaning..."
            value={searchTerm}
            onInput={(e) => setSearchTerm((e.target as HTMLInputElement).value)}
            class="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Verb Table */}
      <div class="overflow-x-auto">
        <table class="w-full text-sm border-collapse">
          <thead>
            <tr class="bg-slate-100 dark:bg-slate-800 border-b-2 border-slate-300 dark:border-slate-600">
              <th class="px-4 py-2 text-left text-slate-900 dark:text-white font-bold">Greek</th>
              <th class="px-4 py-2 text-left text-slate-900 dark:text-white font-bold">Transliteration</th>
              <th class="px-4 py-2 text-left text-slate-900 dark:text-white font-bold">Meaning</th>
              <th class="px-4 py-2 text-center text-slate-900 dark:text-white font-bold">Aspect</th>
              <th class="px-4 py-2 text-left text-slate-900 dark:text-white font-bold">Example</th>
              <th class="px-4 py-2 text-center text-slate-900 dark:text-white font-bold">Freq</th>
            </tr>
          </thead>
          <tbody>
            {filteredVerbs.map((verb) => (
              <tr
                key={verb.id}
                class="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
              >
                <td class="px-4 py-3 font-greek font-bold text-slate-900 dark:text-white text-lg">{verb.greek}</td>
                <td class="px-4 py-3 text-slate-700 dark:text-slate-300 italic">{verb.translit}</td>
                <td class="px-4 py-3 text-slate-700 dark:text-slate-300">{verb.meaning}</td>
                <td class="px-4 py-3 text-center">
                  <span class={`inline-block px-2 py-1 rounded text-xs font-semibold ${aspectBadgeColor(verb.aspect)}`}>
                    {verb.aspect}
                  </span>
                </td>
                <td class="px-4 py-3">
                  <div class="text-slate-900 dark:text-white font-greek font-semibold">{verb.example}</div>
                  <div class="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    {verb.exampleText} ({verb.exampleVerse})
                  </div>
                </td>
                <td class="px-4 py-3 text-center text-slate-600 dark:text-slate-400">{verb.frequency}x</td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredVerbs.length === 0 && (
          <div class="text-center py-8 text-slate-600 dark:text-slate-400">
            No verbs match your search criteria.
          </div>
        )}
      </div>

      {/* Stats */}
      <div class="bg-slate-100 dark:bg-slate-900 rounded-lg p-4 text-center">
        <div class="text-sm text-slate-600 dark:text-slate-400">
          Showing {filteredVerbs.length} of {verbs.length} verbs
        </div>
      </div>

      {/* Notes */}
      <div class="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
        <h4 class="font-bold text-slate-900 dark:text-white mb-2 text-sm">About Porter's Theory</h4>
        <p class="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
          Stanley Porter's Aspect Theory has been influential in modern Greek linguistics. Rather than viewing tense as
          expressing time, Porter argues that the Greek tense-form system is primarily about aspect. While Greek
          conjugations can indicate time (especially in the indicative mood), their primary function is to mark the
          speaker's presentation of the action: as a whole (perfectivo), in process (imperfectivo), or as a state
          (estativo).
        </p>
      </div>
    </div>
  );
}
