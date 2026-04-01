import { h } from 'preact';
import { useState } from 'preact/hooks';
import type { QuizQuestion } from '../../types/grammar';

interface Props {
  questions: QuizQuestion[];
  lessonTitle: string;
}

interface QuizState {
  currentQuestion: number;
  mode: 'select' | 'quiz' | 'complete';
  answers: { questionId: string; userAnswer: string; correct: boolean }[];
  score: number;
  selectedMode: 'identify' | 'produce' | 'translate' | null;
}

export default function MorphologyQuiz({ questions, lessonTitle }: Props) {
  const [state, setState] = useState<QuizState>({
    currentQuestion: 0,
    mode: 'select',
    answers: [],
    score: 0,
    selectedMode: null,
  });

  const startQuiz = (mode: 'identify' | 'produce' | 'translate') => {
    // Filter questions by mode
    const modeQuestions = questions.filter((q) => q.type === mode).slice(0, 5);
    if (modeQuestions.length === 0) {
      alert(`No ${mode} questions available for this lesson.`);
      return;
    }
    setState({
      currentQuestion: 0,
      mode: 'quiz',
      answers: [],
      score: 0,
      selectedMode: mode,
    });
  };

  const handleAnswer = (answer: string) => {
    const currentQ = filteredQuestions[state.currentQuestion];
    const isCorrect = answer === currentQ.answer;
    const newAnswers = [
      ...state.answers,
      { questionId: currentQ.id, userAnswer: answer, correct: isCorrect },
    ];
    const newScore = isCorrect ? state.score + 1 : state.score;

    if (state.currentQuestion < filteredQuestions.length - 1) {
      setState({
        ...state,
        currentQuestion: state.currentQuestion + 1,
        answers: newAnswers,
        score: newScore,
      });
    } else {
      setState({
        ...state,
        mode: 'complete',
        answers: newAnswers,
        score: newScore,
      });
    }
  };

  const resetQuiz = () => {
    setState({
      currentQuestion: 0,
      mode: 'select',
      answers: [],
      score: 0,
      selectedMode: null,
    });
  };

  const filteredQuestions =
    state.selectedMode ? questions.filter((q) => q.type === state.selectedMode).slice(0, 5) : [];
  const currentQuestion = filteredQuestions[state.currentQuestion];

  // Mode selection screen
  if (state.mode === 'select') {
    return (
      <div class="mb-6 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Grammar Quiz
        </h3>
        <p class="text-slate-600 dark:text-slate-400 mb-6">
          Choose a quiz mode to test your knowledge of {lessonTitle}
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Identify Mode */}
          <button
            onClick={() => startQuiz('identify')}
            class="p-4 bg-white dark:bg-slate-800 rounded-lg border-2 border-blue-300 dark:border-blue-700 hover:border-blue-500 hover:shadow-md transition-all text-left"
          >
            <div class="font-bold text-slate-900 dark:text-white mb-2">Mode 1: Identify</div>
            <div class="text-sm text-slate-600 dark:text-slate-400">
              See a Greek form → select its parsing
            </div>
            <div class="text-xs text-blue-600 dark:text-blue-400 mt-3 font-semibold">
              Easy
            </div>
          </button>

          {/* Produce Mode */}
          <button
            onClick={() => startQuiz('produce')}
            class="p-4 bg-white dark:bg-slate-800 rounded-lg border-2 border-amber-300 dark:border-amber-700 hover:border-amber-500 hover:shadow-md transition-all text-left"
          >
            <div class="font-bold text-slate-900 dark:text-white mb-2">Mode 2: Produce</div>
            <div class="text-sm text-slate-600 dark:text-slate-400">
              See parsing → select the Greek form
            </div>
            <div class="text-xs text-amber-600 dark:text-amber-400 mt-3 font-semibold">
              Medium
            </div>
          </button>

          {/* Translate Mode */}
          <button
            onClick={() => startQuiz('translate')}
            class="p-4 bg-white dark:bg-slate-800 rounded-lg border-2 border-red-300 dark:border-red-700 hover:border-red-500 hover:shadow-md transition-all text-left"
          >
            <div class="font-bold text-slate-900 dark:text-white mb-2">Mode 3: Translate</div>
            <div class="text-sm text-slate-600 dark:text-slate-400">
              See context → translate the phrase
            </div>
            <div class="text-xs text-red-600 dark:text-red-400 mt-3 font-semibold">
              Hard
            </div>
          </button>
        </div>
      </div>
    );
  }

  // Quiz in progress
  if (state.mode === 'quiz' && currentQuestion) {
    const modeLabel =
      state.selectedMode === 'identify'
        ? 'Identify'
        : state.selectedMode === 'produce'
          ? 'Produce'
          : 'Translate';

    return (
      <div class="mb-6 p-6 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
        {/* Progress bar */}
        <div class="mb-6">
          <div class="flex items-center justify-between mb-2">
            <h3 class="font-bold text-slate-900 dark:text-white">
              {modeLabel} Mode • Question {state.currentQuestion + 1} of {filteredQuestions.length}
            </h3>
            <div class="text-sm font-semibold text-blue-600 dark:text-blue-400">
              Score: {state.score}/{state.currentQuestion}
            </div>
          </div>
          <div class="h-2 bg-slate-200 dark:bg-slate-700 rounded overflow-hidden">
            <div
              class="h-full bg-blue-600 transition-all"
              style={{ width: `${((state.currentQuestion + 1) / filteredQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question content */}
        {state.selectedMode === 'identify' && (
          <div class="space-y-4">
            <div>
              <label class="text-sm font-semibold text-slate-600 dark:text-slate-400 block mb-3">
                What is the parsing of this form?
              </label>
              <div class="p-6 bg-slate-100 dark:bg-slate-900 rounded-lg border-2 border-blue-300 dark:border-blue-700 text-center">
                <div class="font-greek text-4xl font-bold text-slate-900 dark:text-white">
                  {currentQuestion.greekForm}
                </div>
              </div>
            </div>

            <div class="space-y-2">
              {currentQuestion.options?.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option)}
                  class="w-full p-3 text-left bg-slate-100 dark:bg-slate-700 hover:bg-blue-100 dark:hover:bg-blue-900/30 border border-slate-300 dark:border-slate-600 rounded transition-colors font-medium text-slate-900 dark:text-white"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {state.selectedMode === 'produce' && (
          <div class="space-y-4">
            <div>
              <label class="text-sm font-semibold text-slate-600 dark:text-slate-400 block mb-3">
                Which form matches this parsing?
              </label>
              <div class="p-4 bg-slate-100 dark:bg-slate-900 rounded-lg border-2 border-amber-300 dark:border-amber-700">
                <div class="font-bold text-slate-900 dark:text-white">
                  {currentQuestion.parsing}
                </div>
              </div>
            </div>

            <div class="space-y-2">
              {currentQuestion.options?.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option)}
                  class="w-full p-3 text-left bg-slate-100 dark:bg-slate-700 hover:bg-amber-100 dark:hover:bg-amber-900/30 border border-slate-300 dark:border-slate-600 rounded transition-colors font-medium text-slate-900 dark:text-white font-greek text-lg"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {state.selectedMode === 'translate' && (
          <div class="space-y-4">
            <div>
              <label class="text-sm font-semibold text-slate-600 dark:text-slate-400 block mb-3">
                Translate this phrase:
              </label>
              <div class="p-4 bg-slate-100 dark:bg-slate-900 rounded-lg border-2 border-red-300 dark:border-red-700 font-greek text-lg leading-relaxed text-slate-900 dark:text-white">
                {currentQuestion.context}
              </div>
            </div>

            <div class="space-y-2">
              {currentQuestion.options?.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option)}
                  class="w-full p-3 text-left bg-slate-100 dark:bg-slate-700 hover:bg-red-100 dark:hover:bg-red-900/30 border border-slate-300 dark:border-slate-600 rounded transition-colors font-medium text-slate-900 dark:text-white"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Quiz complete screen
  if (state.mode === 'complete') {
    const percentage = Math.round((state.score / filteredQuestions.length) * 100);
    const performanceMessage =
      percentage === 100
        ? '🎉 Perfect score!'
        : percentage >= 80
          ? '👏 Excellent work!'
          : percentage >= 60
            ? '✓ Good job!'
            : '📚 Keep practicing!';

    return (
      <div class="mb-6 p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-800">
        <div class="text-center">
          <h3 class="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Quiz Complete!
          </h3>
          <div class="text-5xl font-bold text-green-600 dark:text-green-400 mb-2">
            {state.score}/{filteredQuestions.length}
          </div>
          <div class="text-2xl font-semibold text-slate-700 dark:text-slate-300 mb-6">
            {performanceMessage}
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div class="p-3 bg-white dark:bg-slate-800 rounded">
              <div class="text-sm text-slate-600 dark:text-slate-400">Correct</div>
              <div class="text-2xl font-bold text-green-600 dark:text-green-400">
                {state.score}
              </div>
            </div>
            <div class="p-3 bg-white dark:bg-slate-800 rounded">
              <div class="text-sm text-slate-600 dark:text-slate-400">Incorrect</div>
              <div class="text-2xl font-bold text-red-600 dark:text-red-400">
                {filteredQuestions.length - state.score}
              </div>
            </div>
            <div class="p-3 bg-white dark:bg-slate-800 rounded">
              <div class="text-sm text-slate-600 dark:text-slate-400">Percentage</div>
              <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {percentage}%
              </div>
            </div>
          </div>

          {/* Review answers */}
          <div class="mb-6 max-h-64 overflow-y-auto p-4 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
            <h4 class="font-bold text-slate-900 dark:text-white mb-3 text-left">
              Review Your Answers
            </h4>
            <div class="space-y-2 text-left text-sm">
              {state.answers.map((answer, idx) => (
                <div
                  key={idx}
                  class={`p-2 rounded ${
                    answer.correct
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-900 dark:text-green-200'
                      : 'bg-red-100 dark:bg-red-900/30 text-red-900 dark:text-red-200'
                  }`}
                >
                  <div class="font-semibold">
                    Q{idx + 1}: {answer.correct ? '✓' : '✗'}
                  </div>
                  <div class="text-xs">Your answer: {answer.userAnswer}</div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={resetQuiz}
            class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            Try Another Mode
          </button>
        </div>
      </div>
    );
  }

  return null;
}
