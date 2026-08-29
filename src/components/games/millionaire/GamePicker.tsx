'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { Button, Card } from '@/components/ui';
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

interface GamePickerProps {
  defaultKeyStage?: KeyStage;
  onStart: (keyStage: KeyStage, difficulty: Difficulty) => void;
  isStarting: boolean;
}

export function GamePicker({ defaultKeyStage, onStart, isStarting }: GamePickerProps) {
  const [keyStage, setKeyStage] = useState<KeyStage>(defaultKeyStage ?? 'ks2');
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');

  return (
    <div className="max-w-2xl mx-auto py-12 sm:py-16">
      <div className="text-center mb-10">
        <h1 className="font-serif font-bold text-3xl text-gray-900 mb-2">
          Who Wants to Be a Millionaire?
        </h1>
        <p className="text-gray-500">Pick your key stage and difficulty to begin.</p>
      </div>

      <Card className="p-6 sm:p-8 space-y-8">
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
      </Card>
    </div>
  );
}
