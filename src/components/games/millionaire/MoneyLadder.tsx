'use client';

interface MoneyLadderProps {
  moneyLadder: number[];
  currentStep: number;
}

export function MoneyLadder({ moneyLadder, currentStep }: MoneyLadderProps) {
  return (
    <div className="p-4 border-l-2 border-white/10 flex flex-col-reverse gap-1">
      {moneyLadder.map((amount, index) => {
        const isActive = index === currentStep;
        return (
          <div
            key={amount}
            className={`px-3 py-2 rounded text-right font-mono text-sm ${
              isActive
                ? 'bg-[var(--accent-purple)]/20 border border-[var(--accent-purple)] text-[var(--accent-purple)] font-bold'
                : 'border border-transparent text-gray-300'
            }`}
          >
            ₦{amount.toLocaleString()}
          </div>
        );
      })}
    </div>
  );
}
