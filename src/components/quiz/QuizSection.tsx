'use client';

import { useState, useMemo } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
} from '@/components/ui';
import type { QuizQuestion } from '@/types/oak-api.types';
import { ContentRenderer } from './ContentRenderer';

interface QuizSectionProps {
  title: string;
  questions: QuizQuestion[];
  variant?: 'starter' | 'exit';
}

// Helper to shuffle an array (for randomizing match options)
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function QuizSection({
  title,
  questions,
  variant = 'starter',
}: QuizSectionProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>(
    {}
  );
  const [showResults, setShowResults] = useState(false);

  // Track match question state: { questionIndex: { leftIndex: rightIndex } }
  const [matchSelections, setMatchSelections] = useState<Record<number, Record<number, number>>>({});
  // Track which left item is currently selected for matching
  const [activeMatchItem, setActiveMatchItem] = useState<{ qIndex: number; leftIndex: number } | null>(null);
  // Track short-answer inputs: { questionIndex: userAnswer }
  const [shortAnswers, setShortAnswers] = useState<Record<number, string>>({});

  // Memoize shuffled right-side options for match questions
  const shuffledMatchOptions = useMemo(() => {
    const shuffled: Record<number, number[]> = {};
    questions.forEach((q, qIndex) => {
      if (q.questionType === 'match') {
        // Create array of indices and shuffle them
        const indices = q.answers.map((_, i) => i);
        shuffled[qIndex] = shuffleArray(indices);
      }
    });
    return shuffled;
  }, [questions]);

  const borderColor =
    variant === 'starter' ? 'border-primary' : 'border-secondary';
  const accentColor =
    variant === 'starter' ? 'text-primary' : 'text-secondary';
  const bgColor = variant === 'starter' ? 'bg-primary' : 'bg-secondary';

  const handleSelectAnswer = (questionIndex: number, answerIndex: number) => {
    if (showResults) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: answerIndex,
    }));
  };

  const handleCheckAnswers = () => {
    setShowResults(true);
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setMatchSelections({});
    setActiveMatchItem(null);
    setShortAnswers({});
    setShowResults(false);
  };

  // Handle short answer input change
  const handleShortAnswerChange = (qIndex: number, value: string) => {
    if (showResults) return;
    setShortAnswers((prev) => ({
      ...prev,
      [qIndex]: value,
    }));
  };

  // Check if a short answer is correct (case-insensitive)
  const isShortAnswerCorrect = (qIndex: number): boolean => {
    const question = questions[qIndex];
    const userAnswer = (shortAnswers[qIndex] || '').trim().toLowerCase();
    if (!userAnswer) return false;

    // Check against all accepted answers
    return question.answers.some(
      (a) => a.content?.toLowerCase().trim() === userAnswer
    );
  };

  // Handle clicking a left-side match item
  const handleMatchLeftClick = (qIndex: number, leftIndex: number) => {
    if (showResults) return;
    setActiveMatchItem({ qIndex, leftIndex });
  };

  // Handle clicking a right-side match item
  const handleMatchRightClick = (qIndex: number, rightIndex: number) => {
    if (showResults) return;
    if (!activeMatchItem || activeMatchItem.qIndex !== qIndex) return;

    // Set the match
    setMatchSelections((prev) => ({
      ...prev,
      [qIndex]: {
        ...(prev[qIndex] || {}),
        [activeMatchItem.leftIndex]: rightIndex,
      },
    }));
    setActiveMatchItem(null);
  };

  // Clear a specific match
  const handleClearMatch = (qIndex: number, leftIndex: number) => {
    if (showResults) return;
    setMatchSelections((prev) => {
      const updated = { ...prev };
      if (updated[qIndex]) {
        const { [leftIndex]: _, ...rest } = updated[qIndex];
        updated[qIndex] = rest;
      }
      return updated;
    });
  };

  // Check if a right option is already matched to something
  const isRightOptionMatched = (qIndex: number, rightIndex: number): boolean => {
    const matches = matchSelections[qIndex] || {};
    return Object.values(matches).includes(rightIndex);
  };

  // Get match score for a question
  const getMatchScore = (qIndex: number): { correct: number; total: number } => {
    const question = questions[qIndex];
    const matches = matchSelections[qIndex] || {};
    let correct = 0;
    const total = question.answers.length;

    question.answers.forEach((_, leftIndex) => {
      // Correct if left item is matched to the same index on the right
      // (since the correct answer for index 0 is answer.correctChoice at index 0)
      if (matches[leftIndex] === leftIndex) {
        correct++;
      }
    });

    return { correct, total };
  };

  const getScore = () => {
    let correct = 0;
    let total = 0;

    questions.forEach((q, index) => {
      if (q.questionType === 'multiple-choice') {
        total++;
        const selectedIdx = selectedAnswers[index];
        if (
          selectedIdx !== undefined &&
          q.answers[selectedIdx] &&
          !q.answers[selectedIdx].distractor
        ) {
          correct++;
        }
      } else if (q.questionType === 'match') {
        const matchScore = getMatchScore(index);
        correct += matchScore.correct;
        total += matchScore.total;
      } else if (q.questionType === 'short-answer') {
        total++;
        if (isShortAnswerCorrect(index)) {
          correct++;
        }
      }
    });
    return { correct, total };
  };

  if (!questions || questions.length === 0) return null;

  // Filter out explanatory-text questions as they're not answerable
  const answerableQuestions = questions.filter(
    (q) => q.questionType !== 'explanatory-text'
  );

  if (answerableQuestions.length === 0) return null;

  return (
    <Card className="mb-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <span
            className={`w-8 h-8 rounded-full ${bgColor} text-white flex items-center justify-center text-sm font-bold`}
          >
            {answerableQuestions.length}
          </span>
          {title}
        </CardTitle>
        {showResults && (
          <div className={`text-lg font-semibold ${accentColor}`}>
            Score: {getScore().correct}/{getScore().total}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {answerableQuestions.map((question, qIndex) => {
            const selectedIdx = selectedAnswers[qIndex];

            return (
              <div key={qIndex} className={`border-l-4 ${borderColor} pl-4`}>
                <div className="font-semibold text-gray-900 mb-3 flex items-start gap-2">
                  <span>{qIndex + 1}.</span>
                  <ContentRenderer content={question.question || 'Question'} />
                </div>

                {question.questionType === 'multiple-choice' && (
                  <div className="space-y-2">
                    {question.answers.map((answer, aIndex) => {
                      const isSelected = selectedIdx === aIndex;
                      const isCorrect = !answer.distractor;

                      let answerClasses =
                        'p-3 rounded-lg border cursor-pointer transition-all flex items-start gap-2';

                      if (showResults) {
                        if (isCorrect) {
                          answerClasses +=
                            ' bg-green-50 border-green-500 text-green-800';
                        } else if (isSelected && !isCorrect) {
                          answerClasses +=
                            ' bg-red-50 border-red-500 text-red-800';
                        } else {
                          answerClasses +=
                            ' bg-gray-50 border-gray-200 text-gray-600';
                        }
                      } else {
                        if (isSelected) {
                          answerClasses += ` bg-primary/10 border-primary ${accentColor} font-medium`;
                        } else {
                          answerClasses +=
                            ' bg-white border-gray-200 hover:border-gray-400 hover:bg-gray-50';
                        }
                      }

                      return (
                        <div
                          key={aIndex}
                          className={answerClasses}
                          onClick={() => handleSelectAnswer(qIndex, aIndex)}
                        >
                          <span className="font-medium">
                            {String.fromCharCode(65 + aIndex)}.
                          </span>
                          <ContentRenderer content={answer.content || ''} />
                          {showResults && isCorrect && (
                            <span className="ml-auto text-green-600">
                              &#10003;
                            </span>
                          )}
                          {showResults && isSelected && !isCorrect && (
                            <span className="ml-auto text-red-600">
                              &#10007;
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {question.questionType === 'order' && (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500 mb-2">
                      Put these in the correct order:
                    </p>
                    {question.answers
                      .slice()
                      .sort((a, b) => (a.order || 0) - (b.order || 0))
                      .map((answer, aIndex) => (
                        <div
                          key={aIndex}
                          className="p-3 rounded-lg border bg-gray-50 border-gray-200 flex items-start gap-2"
                        >
                          <span className="font-medium mr-2">
                            {aIndex + 1}.
                          </span>
                          <ContentRenderer content={answer.content || ''} />
                        </div>
                      ))}
                  </div>
                )}

                {question.questionType === 'match' && (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-500 mb-2">
                      Click an item on the left, then click the matching item on the right:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Left side - items to match */}
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Items</p>
                        {question.answers.map((answer, leftIndex) => {
                          const isActive = activeMatchItem?.qIndex === qIndex && activeMatchItem?.leftIndex === leftIndex;
                          const hasMatch = matchSelections[qIndex]?.[leftIndex] !== undefined;
                          const matchedRightIndex = matchSelections[qIndex]?.[leftIndex];
                          const isCorrect = showResults && matchedRightIndex === leftIndex;
                          const isWrong = showResults && hasMatch && matchedRightIndex !== leftIndex;

                          let leftClasses = 'p-3 rounded-lg border cursor-pointer transition-all';

                          if (showResults) {
                            if (isCorrect) {
                              leftClasses += ' bg-green-50 border-green-500 text-green-800';
                            } else if (isWrong) {
                              leftClasses += ' bg-red-50 border-red-500 text-red-800';
                            } else if (!hasMatch) {
                              leftClasses += ' bg-yellow-50 border-yellow-500 text-yellow-800';
                            } else {
                              leftClasses += ' bg-gray-50 border-gray-200';
                            }
                          } else {
                            if (isActive) {
                              leftClasses += ' bg-primary/20 border-primary ring-2 ring-primary/50';
                            } else if (hasMatch) {
                              leftClasses += ' bg-blue-50 border-blue-300';
                            } else {
                              leftClasses += ' bg-white border-gray-200 hover:border-gray-400 hover:bg-gray-50';
                            }
                          }

                          return (
                            <div
                              key={leftIndex}
                              className={leftClasses}
                              onClick={() => hasMatch && !showResults
                                ? handleClearMatch(qIndex, leftIndex)
                                : handleMatchLeftClick(qIndex, leftIndex)
                              }
                            >
                              <div className="flex items-center justify-between gap-2">
                                <span className="font-medium">
                                  <ContentRenderer content={answer.matchOption?.content || ''} />
                                </span>
                                {hasMatch && !showResults && (
                                  <span className="text-xs text-blue-600 flex items-center gap-1">
                                    → {question.answers[matchedRightIndex]?.correctChoice?.content}
                                    <button
                                      onClick={(e) => { e.stopPropagation(); handleClearMatch(qIndex, leftIndex); }}
                                      className="ml-1 text-gray-400 hover:text-red-500"
                                    >
                                      ✕
                                    </button>
                                  </span>
                                )}
                                {showResults && isCorrect && <span className="text-green-600">✓</span>}
                                {showResults && isWrong && <span className="text-red-600">✗</span>}
                                {showResults && !hasMatch && <span className="text-yellow-600">?</span>}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Right side - choices to match to */}
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Matches</p>
                        {(shuffledMatchOptions[qIndex] || []).map((originalIndex) => {
                          const answer = question.answers[originalIndex];
                          const isMatched = isRightOptionMatched(qIndex, originalIndex);
                          const isSelectable = activeMatchItem?.qIndex === qIndex && !isMatched;

                          let rightClasses = 'p-3 rounded-lg border transition-all';

                          if (showResults) {
                            rightClasses += ' bg-gray-50 border-gray-200';
                          } else if (isMatched) {
                            rightClasses += ' bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed';
                          } else if (isSelectable) {
                            rightClasses += ' bg-white border-primary cursor-pointer hover:bg-primary/10 ring-1 ring-primary/30';
                          } else {
                            rightClasses += ' bg-white border-gray-200';
                          }

                          return (
                            <div
                              key={originalIndex}
                              className={rightClasses}
                              onClick={() => isSelectable && handleMatchRightClick(qIndex, originalIndex)}
                            >
                              <ContentRenderer content={answer.correctChoice?.content || ''} />
                              {isMatched && !showResults && (
                                <span className="text-xs text-gray-400 ml-2">(matched)</span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {showResults && (
                      <div className="mt-2 p-2 rounded bg-gray-50 text-sm">
                        Match score: {getMatchScore(qIndex).correct}/{getMatchScore(qIndex).total} correct
                      </div>
                    )}
                  </div>
                )}

                {question.questionType === 'short-answer' && (
                  <div className="space-y-3">
                    {/* Input field for user's answer */}
                    <div className="flex flex-col gap-2">
                      <input
                        type="text"
                        placeholder="Type your answer here..."
                        value={shortAnswers[qIndex] || ''}
                        onChange={(e) => handleShortAnswerChange(qIndex, e.target.value)}
                        disabled={showResults}
                        className={`w-full p-3 rounded-lg border transition-all ${
                          showResults
                            ? isShortAnswerCorrect(qIndex)
                              ? 'bg-green-50 border-green-500 text-green-800'
                              : 'bg-red-50 border-red-500 text-red-800'
                            : 'bg-white border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20'
                        }`}
                      />
                      {showResults && (
                        <div className="flex items-center gap-2">
                          {isShortAnswerCorrect(qIndex) ? (
                            <span className="text-green-600 font-medium">✓ Correct!</span>
                          ) : (
                            <span className="text-red-600 font-medium">✗ Incorrect</span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Show expected answers only AFTER submission */}
                    {showResults && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-500 mb-1">Accepted answer(s):</p>
                        <div className="flex flex-wrap gap-2">
                          {question.answers.map((answer, aIndex) => (
                            <span
                              key={aIndex}
                              className="px-3 py-1 rounded-full bg-green-100 border border-green-300 text-green-800 text-sm"
                            >
                              <ContentRenderer content={answer.content || ''} />
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {answerableQuestions.some(
          (q) => q.questionType === 'multiple-choice' || q.questionType === 'match' || q.questionType === 'short-answer'
        ) && (
          <div className="mt-6 flex gap-4">
            {!showResults ? (
              <Button
                onClick={handleCheckAnswers}
                disabled={(() => {
                  // Check if all multiple-choice questions are answered
                  const mcQuestions = answerableQuestions.filter(q => q.questionType === 'multiple-choice');
                  const mcAnswered = Object.keys(selectedAnswers).length >= mcQuestions.length;

                  // Check if all match questions are fully matched
                  const matchQuestions = answerableQuestions
                    .map((q, idx) => ({ q, idx }))
                    .filter(({ q }) => q.questionType === 'match');
                  const matchesComplete = matchQuestions.every(({ q, idx }) => {
                    const matches = matchSelections[idx] || {};
                    return Object.keys(matches).length === q.answers.length;
                  });

                  // Check if all short-answer questions have input
                  const shortAnswerQuestions = answerableQuestions
                    .map((q, idx) => ({ q, idx }))
                    .filter(({ q }) => q.questionType === 'short-answer');
                  const shortAnswersComplete = shortAnswerQuestions.every(({ idx }) => {
                    return (shortAnswers[idx] || '').trim().length > 0;
                  });

                  return !mcAnswered || !matchesComplete || !shortAnswersComplete;
                })()}
                className="w-full sm:w-auto"
              >
                Check Answers
              </Button>
            ) : (
              <Button
                onClick={handleReset}
                variant="outline"
                className="w-full sm:w-auto"
              >
                Try Again
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
