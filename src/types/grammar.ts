/**
 * Grammar module types
 */

export interface LessonMeta {
  title: string;
  module: number;           // 1-4
  lesson: number;           // 1-30
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  paradigms?: string[];     // References to paradigm files
  quiz?: QuizQuestion[];
}

export interface ParadigmCell {
  form: string;             // e.g., "ἀγάπη"
  parsing: string;          // e.g., "nom. sg. fem."
  example?: string;         // Greek form + reference
  reference?: string;       // e.g., "John 3:16"
}

export interface ParadigmTable {
  name: string;             // e.g., "First Declension - ἀγάπη"
  description?: string;
  rows: string[];           // e.g., ["Singular", "Plural"]
  cols: string[];           // e.g., ["Nominative", "Genitive", ...]
  cells: Record<string, ParadigmCell>; // key: "row:col", e.g., "0:0"
  footer?: string;          // Optional note about the paradigm
}

export interface QuizQuestion {
  id: string;
  type: 'identify' | 'produce' | 'translate';
  greekForm?: string;       // Show this for identify/translate modes
  context?: string;         // Full sentence context for translate mode
  parsing?: string;         // Show this for produce mode
  options?: string[];       // Multiple choice options
  answer: string;           // Correct answer
  explanation?: string;     // Why this answer is correct
}

export interface LessonContent {
  meta: LessonMeta;
  body: string;             // HTML content from markdown
}

/**
 * Quiz state and progress tracking
 */
export interface QuizState {
  mode: 'identify' | 'produce' | 'translate';
  currentQuestion: number;
  answers: { questionId: string; userAnswer: string; correct: boolean }[];
  score: number;
  isComplete: boolean;
}

export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  viewCount: number;
  quizAttempts: { date: string; score: number; total: number }[];
}
