'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import { MoneyLadder } from './MoneyLadder';
import { GamePicker } from './GamePicker';
import { useAuth } from '@/contexts/AuthContext';
import { useGame } from '@/lib/hooks/useGame';
import { useSound } from '@/lib/hooks/useSound';
import type {
  Difficulty,
  GameQuestion,
  KeyStage,
  SubmitAnswerResponse,
} from '@/lib/api/game-service';

type GameStatus = 'picking' | 'playing' | 'won' | 'lost';
type AnswerPhase = 'idle' | 'locked' | 'revealed';

const AUTO_RESTART_SECONDS = 10;
const LOCK_IN_DELAY_MS = 1600;
const REVEAL_HOLD_MS = 1300;

function BackToGamesButton({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/games"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/70 hover:text-white transition-colors"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
      Games
    </Link>
  );
}

function MuteButton({ muted, onToggle }: { muted: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      aria-label={muted ? 'Unmute sound' : 'Mute sound'}
      className="text-white/60 hover:text-white transition-colors p-1.5"
    >
      {muted ? (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M9.5 8.5l-4 3H3v1h2.5l4 3v-7z" />
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M9.5 8.5l-4 3H3v1h2.5l4 3v-7z" />
        </svg>
      )}
    </button>
  );
}

// Game-show style backdrop: dark radial "stage lights" plus a faint Infoverse logo watermark.
function GameBackdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 0%, rgba(139,92,246,0.35), transparent 55%), radial-gradient(circle at 15% 100%, rgba(74,159,199,0.25), transparent 50%), radial-gradient(circle at 85% 100%, rgba(232,123,92,0.2), transparent 50%), var(--background-dark)',
        }}
      />
      <Image
        src="/Transparent logo.png"
        alt=""
        width={480}
        height={480}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.05] select-none"
      />
    </div>
  );
}

export function MillionaireView() {
  const { user } = useAuth();
  const { startGame, submitAnswer, isLoading } = useGame();
  const sound = useSound();
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    setIsMuted(sound.isMuted());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleToggleMuted = () => {
    setIsMuted(sound.toggleMuted());
  };

  const [status, setStatus] = useState<GameStatus>('picking');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [moneyLadder, setMoneyLadder] = useState<number[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<GameQuestion | null>(null);
  const [score, setScore] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Answer confirmation + delayed reveal
  const [pendingIndex, setPendingIndex] = useState<number | null>(null);
  const [answerPhase, setAnswerPhase] = useState<AnswerPhase>('idle');
  const [lastResult, setLastResult] = useState<SubmitAnswerResponse | null>(null);
  const [explanation, setExplanation] = useState<string | null>(null);

  // Remembered so a loss/replay can restart at the same level without going back to picking
  const lastPlayed = useRef<{ keyStage: KeyStage; difficulty: Difficulty } | null>(null);

  // Auto-restart countdown after a loss
  const [autoRestartIn, setAutoRestartIn] = useState<number | null>(null);

  useEffect(() => {
    if (status !== 'lost') {
      setAutoRestartIn(null);
      return undefined;
    }
    setAutoRestartIn(AUTO_RESTART_SECONDS);
    const interval = setInterval(() => {
      setAutoRestartIn((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
    }, 1000);
    return () => clearInterval(interval);
  }, [status]);

  useEffect(() => {
    if (status === 'lost' && autoRestartIn === 0 && lastPlayed.current) {
      handleStart(lastPlayed.current.keyStage, lastPlayed.current.difficulty);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoRestartIn, status]);

  const resetRoundState = () => {
    setPendingIndex(null);
    setAnswerPhase('idle');
    setLastResult(null);
    setExplanation(null);
  };

  const handleStart = async (keyStage: KeyStage, difficulty: Difficulty) => {
    sound.playMusic();
    setErrorMessage(null);
    try {
      const result = await startGame(keyStage, difficulty);
      lastPlayed.current = { keyStage, difficulty };
      setSessionId(result.sessionId);
      setMoneyLadder(result.moneyLadder);
      setCurrentStep(result.currentStep);
      setCurrentQuestion(result.question);
      setScore(0);
      setXpEarned(0);
      resetRoundState();
      setStatus('playing');
    } catch {
      setErrorMessage('Could not start the game. Please try again.');
    }
  };

  const handleChangeLevel = () => {
    sound.play('navClick');
    sound.stopMusic();
    setStatus('picking');
    setSessionId(null);
    setCurrentQuestion(null);
    resetRoundState();
  };

  const handleSelectOption = (index: number) => {
    if (answerPhase !== 'idle') return;
    sound.play('select');
    setPendingIndex(index);
  };

  const handleConfirmAnswer = async () => {
    if (pendingIndex === null || !sessionId) return;
    setAnswerPhase('locked');
    sound.play('lockIn');
    sound.stopMusic();

    try {
      const [result] = await Promise.all([
        submitAnswer(sessionId, pendingIndex),
        new Promise((resolve) => {
          setTimeout(resolve, LOCK_IN_DELAY_MS);
        }),
      ]);

      setLastResult(result);
      setScore(result.score);
      setAnswerPhase('revealed');
      setExplanation(result.explanation ?? null);
      sound.play(result.isCorrect ? 'correct' : 'wrong');

      await new Promise((resolve) => {
        setTimeout(resolve, REVEAL_HOLD_MS);
      });

      if (!result.isCorrect) {
        sound.stopMusic();
        sound.play('fail');
        setStatus('lost');
        return;
      }

      setXpEarned(result.xpEarned ?? xpEarned);

      if (result.status === 'won') {
        sound.play('win');
        setStatus('won');
        return;
      }

      setCurrentStep(result.currentStep ?? currentStep + 1);
      setCurrentQuestion(result.nextQuestion ?? null);
      resetRoundState();
      sound.playMusic();
    } catch {
      setErrorMessage('Could not submit your answer. Please try again.');
      resetRoundState();
      sound.playMusic();
    }
  };

  if (status === 'picking') {
    return (
      <div className="relative rounded-2xl overflow-hidden bg-[var(--background-dark)]">
        <GameBackdrop />
        <div className="relative z-10 px-4 sm:px-6 pt-3 sm:pt-4 flex items-center justify-between">
          <BackToGamesButton onClick={() => { sound.play('navClick'); sound.stopMusic(); }} />
          <MuteButton muted={isMuted} onToggle={handleToggleMuted} />
        </div>
        <div className="relative z-10">
          <GamePicker
            defaultKeyStage={user?.keyStage}
            onStart={(keyStage, difficulty) => {
              sound.play('navClick');
              handleStart(keyStage, difficulty);
            }}
            isStarting={isLoading}
          />
        </div>
      </div>
    );
  }

  const hasLost = status === 'lost';
  const isGameWon = status === 'won';
  const isLockedOrRevealed = answerPhase !== 'idle';

  return (
    <div className="relative rounded-2xl overflow-hidden bg-[var(--background-dark)]">
      <GameBackdrop />

      <div className="relative z-10 flex flex-col lg:flex-row max-w-6xl mx-auto">
        <div className="flex-1 min-w-0 flex flex-col p-4 sm:p-6">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <BackToGamesButton onClick={() => { sound.play('navClick'); sound.stopMusic(); }} />
            <div className="flex items-center gap-3">
              {!hasLost && !isGameWon && (
                <div className="bg-white/5 border border-green-400/40 text-green-400 font-bold px-3 py-1.5 rounded-lg text-sm">
                  ⭐ {xpEarned} XP
                </div>
              )}
              <MuteButton muted={isMuted} onToggle={handleToggleMuted} />
            </div>
          </div>

          <div className="flex flex-col gap-4 justify-center">
            {errorMessage && <div className="text-red-400 text-center text-sm">{errorMessage}</div>}

            {hasLost && (
              <div className="flex flex-col items-center gap-3 py-6">
                <div className="text-red-400 text-xl sm:text-2xl text-center font-bold">Game Over!</div>
                {explanation && (
                  <div className="text-gray-400 text-center max-w-lg italic text-sm">
                    &ldquo;{explanation}&rdquo;
                  </div>
                )}
                <div className="text-white text-base sm:text-lg">Final score: ₦{score.toLocaleString()}</div>

                <div className="flex flex-col items-center gap-2 mt-2">
                  <p className="text-white/60 text-xs sm:text-sm">
                    {autoRestartIn !== null && autoRestartIn > 0
                      ? `Restarting at the same level in ${autoRestartIn}...`
                      : 'Restarting...'}
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        sound.play('navClick');
                        if (lastPlayed.current) handleStart(lastPlayed.current.keyStage, lastPlayed.current.difficulty);
                      }}
                      className="bg-[var(--accent-purple)] text-white px-6 py-2.5 rounded-lg font-bold shadow-lg text-sm sm:text-base"
                    >
                      Play Now
                    </button>
                    <button
                      onClick={handleChangeLevel}
                      className="bg-white/10 text-white border border-white/20 px-6 py-2.5 rounded-lg font-bold text-sm sm:text-base hover:bg-white/20 transition-colors"
                    >
                      Change Level
                    </button>
                  </div>
                </div>
              </div>
            )}

            {isGameWon && (
              <div className="flex flex-col items-center gap-3 py-6">
                <div className="text-green-400 text-xl sm:text-2xl text-center font-bold">
                  Congratulations! You are a Virtual Millionaire!
                </div>
                <div className="text-white text-base sm:text-lg">Final score: ₦{score.toLocaleString()}</div>
                <div className="flex gap-3 mt-2">
                  <button
                    onClick={() => {
                      sound.play('navClick');
                      if (lastPlayed.current) handleStart(lastPlayed.current.keyStage, lastPlayed.current.difficulty);
                    }}
                    className="bg-green-500 text-white px-6 py-2.5 rounded-lg font-bold shadow-lg text-sm sm:text-base"
                  >
                    Play Again
                  </button>
                  <button
                    onClick={handleChangeLevel}
                    className="bg-white/10 text-white border border-white/20 px-6 py-2.5 rounded-lg font-bold text-sm sm:text-base hover:bg-white/20 transition-colors"
                  >
                    Change Level
                  </button>
                </div>
              </div>
            )}

            {!hasLost && !isGameWon && currentQuestion && (
              <div className="flex flex-col gap-5 sm:gap-6 py-4 sm:py-8 min-h-[50vh] justify-center">
                <div className="bg-white/5 p-6 sm:p-8 rounded-xl border border-white/10 text-white text-lg sm:text-2xl font-medium text-center leading-snug">
                  {currentQuestion.question}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentQuestion.options.map((option, index) => {
                    const isSelected = pendingIndex === index;
                    const isRevealedCorrect =
                      answerPhase === 'revealed' &&
                      lastResult &&
                      (lastResult.isCorrect
                        ? isSelected
                        : lastResult.correctAnswerIndex === index);
                    const isRevealedWrong =
                      answerPhase === 'revealed' && lastResult && !lastResult.isCorrect && isSelected;

                    return (
                      <button
                        key={option}
                        onClick={() => handleSelectOption(index)}
                        disabled={isLockedOrRevealed}
                        className={clsx(
                          'p-4 sm:p-5 rounded-xl text-left text-sm sm:text-base border transition-all duration-300',
                          isRevealedCorrect && 'bg-green-500/20 border-green-400 text-green-300',
                          isRevealedWrong && 'bg-red-500/20 border-red-400 text-red-300',
                          !isRevealedCorrect &&
                            !isRevealedWrong &&
                            isSelected &&
                            answerPhase === 'locked' &&
                            'bg-[var(--accent-purple)]/20 border-[var(--accent-purple)] text-white animate-pulse',
                          !isRevealedCorrect &&
                            !isRevealedWrong &&
                            !(isSelected && answerPhase === 'locked') &&
                            'bg-white/5 border-white/10 text-gray-300 hover:border-[var(--accent-purple)] hover:text-[var(--accent-purple)]',
                          isLockedOrRevealed && !isSelected && 'opacity-40',
                        )}
                      >
                        <span className="text-[var(--accent-purple)] font-bold mr-2">
                          {String.fromCharCode(65 + index)}:
                        </span>
                        {option}
                      </button>
                    );
                  })}
                </div>

                {pendingIndex !== null && answerPhase === 'idle' && (
                  <div className="bg-black/30 border border-[var(--accent-purple)]/40 rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-white text-sm text-center sm:text-left">
                      Lock in <strong>{String.fromCharCode(65 + pendingIndex)}</strong>? Are you
                      sure? Final answer?
                    </p>
                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => setPendingIndex(null)}
                        className="px-4 py-2 rounded-lg text-sm font-semibold text-white/70 hover:text-white transition-colors"
                      >
                        Change Answer
                      </button>
                      <button
                        onClick={handleConfirmAnswer}
                        className="bg-[var(--accent-purple)] text-white px-5 py-2 rounded-lg text-sm font-bold shadow-lg"
                      >
                        Final Answer
                      </button>
                    </div>
                  </div>
                )}

                {answerPhase === 'locked' && (
                  <div className="text-white text-base sm:text-lg text-center font-bold italic">
                    Locking in your final answer&hellip;
                  </div>
                )}

                {answerPhase === 'revealed' && lastResult && (
                  <div
                    className={clsx(
                      'text-base sm:text-lg text-center font-bold',
                      lastResult.isCorrect ? 'text-green-400' : 'text-red-400',
                    )}
                  >
                    {lastResult.isCorrect ? 'Correct!' : 'Incorrect!'}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4 p-4 sm:p-6 w-full lg:w-60 shrink-0 border-t lg:border-t-0 lg:border-l border-white/10">
          <MoneyLadder
            moneyLadder={moneyLadder}
            currentStep={hasLost ? Math.max(0, currentStep - 1) : currentStep}
          />
        </div>
      </div>
    </div>
  );
}
