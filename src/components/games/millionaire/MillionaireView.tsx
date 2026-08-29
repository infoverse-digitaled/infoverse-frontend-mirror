'use client';

import { useEffect, useRef, useState } from 'react';
import { MillionaireGame } from './millionaireGame';
import { MoneyLadder } from './MoneyLadder';
import { Leaderboard } from './Leaderboard';
import { GamePicker } from './GamePicker';
import { useAuth } from '@/contexts/AuthContext';
import { useGame } from '@/lib/hooks/useGame';
import type { Difficulty, GameQuestion, KeyStage } from '@/lib/api/game-service';

type GameStatus = 'picking' | 'playing' | 'won' | 'lost';

export function MillionaireView() {
  const { user } = useAuth();
  const { startGame, submitAnswer, isLoading } = useGame();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<MillionaireGame | null>(null);

  const [status, setStatus] = useState<GameStatus>('picking');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [moneyLadder, setMoneyLadder] = useState<number[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<GameQuestion | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'playing' && canvasRef.current && !gameRef.current) {
      const game = new MillionaireGame(canvasRef.current, () => {});
      gameRef.current = game;
      return () => {
        game.destroy();
        gameRef.current = null;
      };
    }
    return undefined;
  }, [status]);

  const handleStart = async (keyStage: KeyStage, difficulty: Difficulty) => {
    setErrorMessage(null);
    try {
      const result = await startGame(keyStage, difficulty);
      setSessionId(result.sessionId);
      setMoneyLadder(result.moneyLadder);
      setCurrentStep(result.currentStep);
      setCurrentQuestion(result.question);
      setExplanation(null);
      setScore(0);
      setXpEarned(0);
      setStatus('playing');
    } catch {
      setErrorMessage('Could not start the game. Please try again.');
    }
  };

  const handleOptionClick = async (index: number) => {
    if (!sessionId || isValidating || isLoading) return;
    setIsValidating(true);
    setExplanation(null);

    try {
      const result = await submitAnswer(sessionId, index);
      setExplanation(result.explanation ?? null);
      setScore(result.score);

      if (!result.isCorrect) {
        gameRef.current?.submitAnswer(false);
        setStatus('lost');
        setIsValidating(false);
        return;
      }

      setXpEarned(result.xpEarned ?? xpEarned);

      if (result.status === 'won') {
        gameRef.current?.submitAnswer(true);
        setStatus('won');
        setIsValidating(false);
        return;
      }

      setTimeout(() => {
        gameRef.current?.submitAnswer(true);
        setCurrentStep(result.currentStep ?? currentStep + 1);
        setCurrentQuestion(result.nextQuestion ?? null);
        setIsValidating(false);
      }, 1200);
    } catch {
      setErrorMessage('Could not submit your answer. Please try again.');
      setIsValidating(false);
    }
  };

  const handlePlayAgain = () => {
    gameRef.current?.destroy();
    gameRef.current = null;
    setStatus('picking');
    setSessionId(null);
    setCurrentQuestion(null);
    setExplanation(null);
  };

  if (status === 'picking') {
    return <GamePicker defaultKeyStage={user?.keyStage} onStart={handleStart} isStarting={isLoading} />;
  }

  const hasLost = status === 'lost';
  const isGameWon = status === 'won';

  return (
    <div className="flex flex-col lg:flex-row w-full bg-[var(--background-dark)] rounded-2xl overflow-hidden">
      <div className="flex-1 min-w-0 flex flex-col p-4 sm:p-6 lg:p-8 relative">
        {!hasLost && !isGameWon && (
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-white/5 border border-green-400/40 text-green-400 font-bold px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg z-20 text-sm sm:text-base">
            ⭐ {xpEarned} XP
          </div>
        )}

        <div className="rounded-lg overflow-hidden border border-white/10 aspect-[8/3] w-full">
          <canvas ref={canvasRef} className="w-full h-full" />
        </div>

        <div className="mt-4 sm:mt-6 flex flex-col gap-4 sm:gap-6 justify-center">
          {errorMessage && <div className="text-red-400 text-center">{errorMessage}</div>}

          {hasLost && (
            <div className="flex flex-col items-center gap-3 sm:gap-4">
              <div className="text-red-400 text-xl sm:text-2xl text-center font-bold">Game Over!</div>
              {explanation && (
                <div className="text-gray-400 text-center max-w-lg italic text-sm sm:text-base">
                  &ldquo;{explanation}&rdquo;
                </div>
              )}
              <div className="text-white text-lg">Final score: ₦{score.toLocaleString()}</div>
              <button
                onClick={handlePlayAgain}
                className="bg-[var(--accent-purple)] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-bold shadow-lg"
              >
                Try Again
              </button>
            </div>
          )}

          {isGameWon && (
            <div className="flex flex-col items-center gap-3 sm:gap-4">
              <div className="text-green-400 text-xl sm:text-2xl text-center font-bold">
                Congratulations! You are a Virtual Millionaire!
              </div>
              <div className="text-white text-lg">Final score: ₦{score.toLocaleString()}</div>
              <button
                onClick={handlePlayAgain}
                className="bg-green-500 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-bold shadow-lg"
              >
                Play Again
              </button>
            </div>
          )}

          {(isLoading || isValidating) && !hasLost && !isGameWon && (
            <div className="text-[var(--accent-purple)] text-lg sm:text-xl text-center font-bold italic">
              {isValidating ? 'Validating answer...' : 'Loading next question...'}
            </div>
          )}

          {!isLoading && !isValidating && !hasLost && !isGameWon && currentQuestion && (
            <>
              <div className="bg-white/5 p-4 sm:p-6 rounded-lg border border-white/10 text-white text-base sm:text-lg text-center">
                {currentQuestion.question}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={option}
                    onClick={() => handleOptionClick(index)}
                    className="bg-white/5 text-gray-300 border border-white/10 p-3 sm:p-4 rounded-lg text-left text-sm sm:text-base hover:border-[var(--accent-purple)] hover:text-[var(--accent-purple)] transition-colors"
                  >
                    <span className="text-[var(--accent-purple)] font-bold mr-2">
                      {String.fromCharCode(65 + index)}:
                    </span>
                    {option}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:gap-6 p-4 sm:p-6 lg:p-8 w-full lg:w-80 shrink-0 border-t lg:border-t-0 lg:border-l border-white/10">
        <Leaderboard />
        <div className="max-h-64 lg:max-h-none overflow-y-auto">
          <MoneyLadder
            moneyLadder={moneyLadder}
            currentStep={hasLost ? Math.max(0, currentStep - 1) : currentStep}
          />
        </div>
      </div>
    </div>
  );
}
