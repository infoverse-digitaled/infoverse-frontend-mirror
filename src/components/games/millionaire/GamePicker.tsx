'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { Button } from '@/components/ui';
import type { Difficulty, KeyStage } from '@/lib/api/game-service';

// Mirrors KeyStageSelector.tsx's per-stage color + year-range convention
const KEY_STAGE_COLORS = [
  {
    active: 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-blue-200',
    inactive: 'bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-100',
  },
  {
    active: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-green-200',
    inactive: 'bg-green-50 text-green-600 hover:bg-green-100 border border-green-100',
  },
  {
    active: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-purple-200',
    inactive: 'bg-purple-50 text-purple-600 hover:bg-purple-100 border border-purple-100',
  },
  {
    active: 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-orange-200',
    inactive: 'bg-orange-50 text-orange-600 hover:bg-orange-100 border border-orange-100',
  },
];

const KEY_STAGES: { value: KeyStage; label: string; years: string }[] = [
  { value: 'ks1', label: 'Key Stage 1', years: 'Years 1-2 (Ages 5-7)' },
  { value: 'ks2', label: 'Key Stage 2', years: 'Years 3-6 (Ages 7-11)' },
  { value: 'ks3', label: 'Key Stage 3', years: 'Years 7-9 (Ages 11-14)' },
  { value: 'ks4', label: 'Key Stage 4', years: 'Years 10-11 (Ages 14-16)' },
];

const DIFFICULTIES: { value: Difficulty; label: string }[] = [
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
];

interface GamePickerProps {
  defaultKeyStage?: KeyStage;
  onStart: (keyStage: KeyStage, difficulty: Difficulty) => void;
  isStarting: boolean;
}

export function GamePicker({ defaultKeyStage, onStart, isStarting }: GamePickerProps) {
  const [keyStage, setKeyStage] = useState<KeyStage>(defaultKeyStage ?? 'ks2');
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');

  return (
    <div className="flex flex-col gap-8 max-w-2xl mx-auto text-center py-16">
      <div>
        <h1 className="font-serif font-bold text-3xl text-gray-900 mb-2">
          Who Wants to Be a Millionaire?
        </h1>
        <p className="text-gray-600">Pick your key stage and difficulty to begin.</p>
      </div>

      <div>
        <p className="text-sm font-semibold text-gray-700 mb-3">Key Stage</p>
        <div className="flex flex-wrap gap-3 justify-center">
          {KEY_STAGES.map((stage, index) => {
            const colors = KEY_STAGE_COLORS[index];
            const isActive = keyStage === stage.value;
            return (
              <button
                key={stage.value}
                onClick={() => setKeyStage(stage.value)}
                className={clsx(
                  'px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 shadow-sm flex flex-col items-center leading-tight',
                  isActive ? `${colors.active} shadow-md` : colors.inactive,
                )}
              >
                <span>{stage.label}</span>
                <span className={clsx('text-[11px] font-normal', isActive ? 'text-white/80' : 'opacity-70')}>
                  {stage.years}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold text-gray-700 mb-3">Difficulty</p>
        <div className="flex gap-3 justify-center">
          {DIFFICULTIES.map((band) => {
            const isActive = difficulty === band.value;
            return (
              <button
                key={band.value}
                onClick={() => setDifficulty(band.value)}
                className={clsx(
                  'px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 shadow-sm',
                  isActive
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-100',
                )}
              >
                {band.label}
              </button>
            );
          })}
        </div>
      </div>

      <Button
        size="lg"
        className="mx-auto rounded-xl px-10"
        isLoading={isStarting}
        onClick={() => onStart(keyStage, difficulty)}
      >
        Start Game
      </Button>
    </div>
  );
}
