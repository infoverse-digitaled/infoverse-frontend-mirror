'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { Button, Card } from '@/components/ui';
import { Leaderboard } from './Leaderboard';
import type { Difficulty, KeyStage } from '@/lib/api/game-service';

const KEY_STAGES: { value: KeyStage; label: string; years: string }[] = [
  { value: 'ks1', label: 'Key Stage 1', years: 'Years 1-2 (Ages 5-7)' },
  { value: 'ks2', label: 'Key Stage 2', years: 'Years 3-6 (Ages 7-11)' },
  { value: 'ks3', label: 'Key Stage 3', years: 'Years 7-9 (Ages 11-14)' },
  { value: 'ks4', label: 'Key Stage 4', years: 'Years 10-11 (Ages 14-16)' },
];

const DIFFICULTIES: { value: Difficulty; label: string; description: string }[] = [
  { value: 'easy', label: 'Easy', description: 'Gentler questions throughout' },
  { value: 'medium', label: 'Medium', description: 'Standard progression' },
  { value: 'hard', label: 'Hard', description: 'Tougher questions throughout' },
];

// Single shared pill style so key stage and difficulty read as one design language,
// not two competing color schemes.
const pillClasses = (isActive: boolean) =>
  clsx(
    'w-full text-left px-4 py-3 rounded-xl border-2 transition-all duration-150',
    isActive
      ? 'border-primary bg-primary/5 shadow-sm'
      : 'border-gray-100 bg-white hover:border-gray-200',
  );

type Tab = 'play' | 'leaderboard' | 'how-it-works';

const TABS: { value: Tab; label: string }[] = [
  { value: 'play', label: 'Play' },
  { value: 'leaderboard', label: 'Leaderboard' },
  { value: 'how-it-works', label: 'How It Works' },
];

interface GamePickerProps {
  defaultKeyStage?: KeyStage;
  onStart: (keyStage: KeyStage, difficulty: Difficulty) => void;
  isStarting: boolean;
}

export function GamePicker({ defaultKeyStage, onStart, isStarting }: GamePickerProps) {
  const [tab, setTab] = useState<Tab>('play');
  const [keyStage, setKeyStage] = useState<KeyStage>(defaultKeyStage ?? 'ks2');
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 pb-8 sm:pb-12 pt-2 max-h-[calc(100vh-7rem)] overflow-y-auto">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="font-serif font-bold text-2xl sm:text-3xl text-white mb-2">
          Who Wants to Be a Millionaire?
        </h1>
        <p className="text-white/70 text-sm sm:text-base">
          Pick your key stage and difficulty to begin.
        </p>
      </div>

      <Card className="p-5 sm:p-8 space-y-6">
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
          {TABS.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => setTab(t.value)}
              className={clsx(
                'flex-1 py-2 px-2 rounded-lg text-sm font-semibold transition-all',
                tab === t.value ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700',
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'play' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-sm font-semibold text-gray-700 mb-3">Key Stage</h2>
              <div className="grid grid-cols-2 gap-3">
                {KEY_STAGES.map((stage) => {
                  const isActive = keyStage === stage.value;
                  return (
                    <button
                      key={stage.value}
                      type="button"
                      onClick={() => setKeyStage(stage.value)}
                      className={pillClasses(isActive)}
                    >
                      <span
                        className={clsx(
                          'block font-semibold text-sm',
                          isActive ? 'text-primary' : 'text-gray-900',
                        )}
                      >
                        {stage.label}
                      </span>
                      <span className="block text-xs text-gray-500 mt-0.5">{stage.years}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-gray-700 mb-3">Difficulty</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {DIFFICULTIES.map((band) => {
                  const isActive = difficulty === band.value;
                  return (
                    <button
                      key={band.value}
                      type="button"
                      onClick={() => setDifficulty(band.value)}
                      className={pillClasses(isActive)}
                    >
                      <span
                        className={clsx(
                          'block font-semibold text-sm',
                          isActive ? 'text-primary' : 'text-gray-900',
                        )}
                      >
                        {band.label}
                      </span>
                      <span className="block text-xs text-gray-500 mt-0.5">{band.description}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <Button
              size="lg"
              fullWidth
              className="rounded-xl"
              isLoading={isStarting}
              onClick={() => onStart(keyStage, difficulty)}
            >
              Start Game
            </Button>
          </div>
        )}

        {tab === 'leaderboard' && <Leaderboard variant="light" />}

        {tab === 'how-it-works' && (
          <div className="space-y-4 text-sm text-gray-700">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Climb the money ladder</h3>
              <p>
                Answer 15 multiple-choice questions correctly in a row to climb from ₦100 all the
                way to ₦1,000,000. Every correct answer moves you up one rung and gets harder.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">One wrong answer ends the game</h3>
              <p>
                There are no second chances on an answer once it&apos;s locked in - a wrong answer
                ends the session immediately, dropping your score to your last safe haven.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Safe havens</h3>
              <p>
                Rungs 5, 10, and 15 are safe havens. Reach one and your score can never drop below
                it, even if you get a later question wrong.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Final answer</h3>
              <p>
                Selecting an option doesn&apos;t submit it right away - you&apos;ll be asked to
                confirm before it&apos;s locked in, just like the real show.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Key stage &amp; difficulty</h3>
              <p>
                Key stage sets the curriculum level of the questions. Difficulty shifts how hard
                questions are at every rung, independent of your key stage - Hard stays tougher
                throughout, Easy stays gentler throughout.
              </p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
