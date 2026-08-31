'use client';

import clsx from 'clsx';

interface MoneyLadderProps {
  moneyLadder: number[];
  currentStep: number;
}

// Mirrors backend/src/config/game.ts SAFE_HAVEN_STEPS - purely visual here, the backend is the
// source of truth for actual scoring on loss.
const SAFE_HAVEN_STEPS = [4, 9, 14];

export function MoneyLadder({ moneyLadder, currentStep }: MoneyLadderProps) {
  return (
    <div className="bg-black/40 rounded-xl p-3 border border-amber-500/20 shadow-inner">
      <div className="flex flex-col-reverse gap-1">
        {moneyLadder.map((amount, index) => {
          const isActive = index === currentStep;
          const isPassed = index < currentStep;
          const isSafeHaven = SAFE_HAVEN_STEPS.includes(index);

          return (
            <div
              key={amount}
              className={clsx(
                'flex items-center justify-between px-3 py-2 rounded-lg text-right font-mono text-sm transition-all duration-300',
                isActive &&
                  'bg-gradient-to-r from-amber-500 to-yellow-300 text-black font-extrabold shadow-lg shadow-amber-500/40 ring-2 ring-yellow-200 scale-[1.03]',
                !isActive &&
                  isSafeHaven &&
                  'border-l-4 border-emerald-400 text-emerald-300 bg-emerald-400/5 font-semibold',
                !isActive &&
                  !isSafeHaven &&
                  isPassed &&
                  'text-white/35 line-through decoration-white/20',
                !isActive && !isSafeHaven && !isPassed && 'text-white/80',
              )}
            >
              <span className="font-sans text-xs opacity-70">{index + 1}</span>
              <span>₦{amount.toLocaleString()}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
