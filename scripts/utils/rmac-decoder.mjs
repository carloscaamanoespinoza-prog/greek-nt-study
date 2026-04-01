/**
 * RMAC (Robinson Morphological Analysis Code) Decoder
 * Converts codes like "N-NSF", "V-PAI-3S" into readable morphological objects
 */

const POS_MAP = {
  'N': 'noun',
  'V': 'verb',
  'A': 'adjective',
  'ADV': 'adverb',
  'P': 'preposition',
  'CONJ': 'conjunction',
  'PRT': 'particle',
  'PRON': 'pronoun',
  'D': 'definite-article',
  'INJ': 'interjection',
  'ARAM': 'aramaic',
  'HEB': 'hebrew'
};

const CASE_MAP = {
  'N': 'nominative',
  'G': 'genitive',
  'D': 'dative',
  'A': 'accusative',
  'V': 'vocative'
};

const NUMBER_MAP = {
  'S': 'singular',
  'P': 'plural'
};

const GENDER_MAP = {
  'M': 'masculine',
  'F': 'feminine',
  'N': 'neuter'
};

const TENSE_MAP = {
  'P': 'present',
  'I': 'imperfect',
  'F': 'future',
  'A': 'aorist',
  'R': 'perfect',
  'L': 'pluperfect',
  'X': 'no-tense'
};

const VOICE_MAP = {
  'A': 'active',
  'M': 'middle',
  'P': 'passive',
  'E': 'middle-or-passive',
  'D': 'middle-deponent',
  'O': 'passive-deponent'
};

const MOOD_MAP = {
  'I': 'indicative',
  'S': 'subjunctive',
  'O': 'optative',
  'M': 'imperative',
  'N': 'infinitive',
  'P': 'participle'
};

const PERSON_MAP = {
  '1': 'first',
  '2': 'second',
  '3': 'third'
};

/**
 * Parse RMAC code into structured morphological data
 * @param {string} code - RMAC code like "N-NSF" or "V-PAI-3S"
 * @returns {Object} Morphological data object
 */
export function decodeRMAC(code) {
  const result = {
    posCode: code,
    pos: null,
    case: null,
    number: null,
    gender: null,
    tense: null,
    voice: null,
    mood: null,
    person: null,
  };

  if (!code || code === 'X') {
    result.pos = 'unknown';
    return result;
  }

  const parts = code.split('-');
  if (parts.length === 0) return result;

  // Parse part of speech
  const posCode = parts[0];
  result.pos = POS_MAP[posCode] || posCode.toLowerCase();

  // For simple particles/indeclinables
  if (parts.length === 1) {
    return result;
  }

  // Parse remaining codes based on part of speech
  if (posCode === 'N' || posCode === 'A' || posCode === 'D' || posCode === 'PRON') {
    // Nominal: Case-Number-Gender
    parseNominal(result, parts[1]);
  } else if (posCode === 'V') {
    // Verbal: Tense-Voice-Mood[-Person-Number]
    parseVerbal(result, parts.slice(1));
  } else if (posCode === 'ADV' || posCode === 'P' || posCode === 'CONJ' || posCode === 'PRT') {
    // Indeclinables: usually just one element
    // No morphological features to parse
  }

  return result;
}

/**
 * Parse nominal (noun, adjective, article) morphology
 * Format: C-NG where C=case, N=number, G=gender
 */
function parseNominal(result, features) {
  if (!features || features.length < 3) return;

  const chars = features.split('');

  // Case (position 0)
  if (chars[0]) result.case = CASE_MAP[chars[0]];

  // Number (position 1)
  if (chars[1]) result.number = NUMBER_MAP[chars[1]];

  // Gender (position 2)
  if (chars[2]) result.gender = GENDER_MAP[chars[2]];
}

/**
 * Parse verbal morphology
 * Format: T-V-M or T-V-M-PP where T=tense, V=voice, M=mood, P=person+number
 */
function parseVerbal(result, parts) {
  if (parts.length < 3) return;

  // Tense
  if (parts[0]) result.tense = TENSE_MAP[parts[0]];

  // Voice
  if (parts[1]) result.voice = VOICE_MAP[parts[1]];

  // Mood
  if (parts[2]) result.mood = MOOD_MAP[parts[2]];

  // Person and Number (optional, for finite verbs)
  if (parts[3]) {
    const ppCode = parts[3];
    if (ppCode.length >= 2) {
      result.person = PERSON_MAP[ppCode[0]];
      result.number = NUMBER_MAP[ppCode[1]];
    }
  }

  // For participles, also parse case/gender/number from parts[3] and [4]
  if (result.mood === 'participle' && parts[3]) {
    // Participles have: C-NG after mood
    // Format becomes: T-V-M-CNG or T-V-M-CNG-PN (rare)
    const feats = parts[3];
    if (feats.length >= 3) {
      result.case = CASE_MAP[feats[0]];
      result.number = NUMBER_MAP[feats[1]];
      result.gender = GENDER_MAP[feats[2]];
    }
  }
}

/**
 * Get human-readable morphological description
 * @param {Object} morph - Morphological data object from decodeRMAC
 * @returns {string} Human-readable description
 */
export function getMorphDescription(morph) {
  const parts = [];

  if (morph.pos) parts.push(morph.pos);
  if (morph.case) parts.push(morph.case);
  if (morph.gender) parts.push(morph.gender);
  if (morph.number) parts.push(morph.number);
  if (morph.tense) parts.push(morph.tense);
  if (morph.voice) parts.push(morph.voice);
  if (morph.mood) parts.push(morph.mood);
  if (morph.person) parts.push(morph.person);

  return parts.filter(Boolean).join(', ');
}

export default { decodeRMAC, getMorphDescription };
