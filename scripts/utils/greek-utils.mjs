/**
 * Greek language utilities
 * Unicode normalization, diacritical handling, etc.
 */

/**
 * Normalize Greek text to NFC (Canonical Composition)
 * @param {string} text - Greek text
 * @returns {string} Normalized text
 */
export function normalizeGreek(text) {
  if (!text) return '';
  // NFC normalization (combining characters → precomposed)
  return text.normalize('NFC');
}

/**
 * Decompose Greek text to NFD (Canonical Decomposition)
 * Useful for case-insensitive comparison and accent-insensitive matching
 * @param {string} text - Greek text
 * @returns {string} Decomposed text
 */
export function decomposeGreek(text) {
  if (!text) return '';
  return text.normalize('NFD');
}

/**
 * Remove all diacritical marks from Greek text
 * @param {string} text - Greek text with diacritics
 * @returns {string} Text without diacritics
 */
export function stripDiacritics(text) {
  if (!text) return '';
  // Decompose to NFD, then remove combining marks (Unicode range 0300-036F)
  return decomposeGreek(text).replace(/[\u0300-\u036f]/g, '');
}

/**
 * Convert Greek to lowercase
 * @param {string} text - Greek text
 * @returns {string} Lowercase text
 */
export function greekLower(text) {
  if (!text) return '';
  return text.toLowerCase();
}

/**
 * Convert Greek to uppercase
 * @param {string} text - Greek text
 * @returns {string} Uppercase text
 */
export function greekUpper(text) {
  if (!text) return '';
  return text.toUpperCase();
}

/**
 * Normalize for comparison (decompose + lowercase + strip diacritics)
 * @param {string} text - Greek text
 * @returns {string} Normalized for comparison
 */
export function compareNormalize(text) {
  if (!text) return '';
  return stripDiacritics(greekLower(decomposeGreek(text)));
}

/**
 * Check if two Greek words are equivalent (ignoring case and diacritics)
 * @param {string} a - First word
 * @param {string} b - Second word
 * @returns {boolean} True if equivalent
 */
export function greekEquivalent(a, b) {
  return compareNormalize(a) === compareNormalize(b);
}

/**
 * Basic transliteration from Greek to Latin
 * This is a simplified SBL-style transliteration
 */
const TRANSLITERATION_MAP = {
  'Α': 'A',
  'α': 'a',
  'Β': 'B',
  'β': 'b',
  'Γ': 'G',
  'γ': 'g',
  'Δ': 'D',
  'δ': 'd',
  'Ε': 'E',
  'ε': 'e',
  'Ζ': 'Z',
  'ζ': 'z',
  'Η': 'Ē',
  'η': 'ē',
  'Θ': 'Th',
  'θ': 'th',
  'Ι': 'I',
  'ι': 'i',
  'Κ': 'K',
  'κ': 'k',
  'Λ': 'L',
  'λ': 'l',
  'Μ': 'M',
  'μ': 'm',
  'Ν': 'N',
  'ν': 'n',
  'Ξ': 'X',
  'ξ': 'x',
  'Ο': 'O',
  'ο': 'o',
  'Π': 'P',
  'π': 'p',
  'Ρ': 'R',
  'ρ': 'r',
  'Σ': 'S',
  'σ': 's',
  'ς': 's',
  'Τ': 'T',
  'τ': 't',
  'Υ': 'Y',
  'υ': 'y',
  'Φ': 'Ph',
  'φ': 'ph',
  'Χ': 'Ch',
  'χ': 'ch',
  'Ψ': 'Ps',
  'ψ': 'ps',
  'Ω': 'Ō',
  'ω': 'ō',
};

/**
 * Simple Greek to Latin transliteration
 * @param {string} greek - Greek text
 * @returns {string} Transliterated text
 */
export function transliterate(greek) {
  if (!greek) return '';
  let result = '';
  let stripped = stripDiacritics(greek);

  for (const char of stripped) {
    result += TRANSLITERATION_MAP[char] || char;
  }
  return result;
}

export default {
  normalizeGreek,
  decomposeGreek,
  stripDiacritics,
  greekLower,
  greekUpper,
  compareNormalize,
  greekEquivalent,
  transliterate,
};
