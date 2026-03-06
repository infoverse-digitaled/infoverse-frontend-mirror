'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import clsx from 'clsx';

// Which urgency tier the banner is in, based on days remaining
type UrgencyTier = 'calm' | 'amber' | 'red';

const STORAGE_KEY = 'trial_banner_dismissed_tier';

function getTier(daysRemaining: number): UrgencyTier {
  if (daysRemaining <= 1) return 'red';
  if (daysRemaining <= 3) return 'amber';
  return 'calm';
}

export function TrialBanner() {
  const { user, loading, daysRemaining } = useAuth();
  const [dismissedTier, setDismissedTier] = useState<UrgencyTier | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(STORAGE_KEY) as UrgencyTier | null;
    setDismissedTier(stored);
  }, []);

  if (!mounted || loading || !user) return null;
  if (user.subscription?.status !== 'trialing') return null;
  if (daysRemaining === null || daysRemaining <= 0) return null;

  const currentTier = getTier(daysRemaining);

  // Re-show if the current tier is MORE urgent than the one the user dismissed
  const tierPriority: Record<UrgencyTier, number> = { calm: 0, amber: 1, red: 2 };
  const isVisible = dismissedTier === null || tierPriority[currentTier] > tierPriority[dismissedTier];

  if (!isVisible) return null;

  const handleDismiss = () => {
    setDismissedTier(currentTier);
    localStorage.setItem(STORAGE_KEY, currentTier);
  };

  const message =
    daysRemaining === 1
      ? 'Your free trial ends tomorrow!'
      : `${daysRemaining} days left in your free trial.`;

  return (
    <div
      className={clsx(
        'flex items-center justify-between gap-4 px-5 py-3 rounded-xl text-sm font-medium mb-6',
        currentTier === 'red'   && 'bg-red-50 border border-red-200 text-red-800',
        currentTier === 'amber' && 'bg-amber-50 border border-amber-200 text-amber-800',
        currentTier === 'calm'  && 'bg-primary/5 border border-primary/20 text-primary'
      )}
    >
      <div className="flex items-center gap-3">
        {/* Pulsing urgency dot */}
        <span
          className={clsx(
            'w-2 h-2 rounded-full shrink-0 animate-pulse',
            currentTier === 'red'   && 'bg-red-500',
            currentTier === 'amber' && 'bg-amber-500',
            currentTier === 'calm'  && 'bg-primary'
          )}
        />
        <span>{message}</span>
        <Link
          href="/pricing"
          className={clsx(
            'underline underline-offset-2 font-semibold whitespace-nowrap',
            currentTier === 'red'   && 'text-red-700 hover:text-red-900',
            currentTier === 'amber' && 'text-amber-700 hover:text-amber-900',
            currentTier === 'calm'  && 'text-primary hover:text-primary-dark'
          )}
        >
          Upgrade now →
        </Link>
      </div>

      {/* Dismiss — only hides until next urgency tier kicks in */}
      <button
        onClick={handleDismiss}
        aria-label="Dismiss trial banner"
        className={clsx(
          'shrink-0 rounded-lg p-1 transition-colors',
          currentTier === 'red'   && 'hover:bg-red-100 text-red-400 hover:text-red-600',
          currentTier === 'amber' && 'hover:bg-amber-100 text-amber-400 hover:text-amber-600',
          currentTier === 'calm'  && 'hover:bg-primary/10 text-primary/50 hover:text-primary'
        )}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
