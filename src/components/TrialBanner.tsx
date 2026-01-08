'use client';

import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import clsx from 'clsx';

/**
 * Trial Banner Component
 * Shows trial days remaining across the entire platform
 * Self-manages visibility - only shows for users with active trial
 */
export function TrialBanner() {
  const { user, loading, daysRemaining } = useAuth();

  // Don't render during loading or if no user
  if (loading || !user) return null;

  // Only show for trialing users with days remaining
  if (user.subscription?.status !== 'trialing') return null;
  if (daysRemaining === null || daysRemaining <= 0) return null;

  const isUrgent = daysRemaining <= 3;

  return (
    <div
      className={clsx(
        'fixed top-0 left-0 right-0 px-4 py-2.5 text-center text-sm font-medium z-50',
        isUrgent ? 'bg-orange-500 text-white' : 'bg-primary/10 text-primary'
      )}
    >
      <span>
        {daysRemaining === 1
          ? 'Your free trial ends tomorrow!'
          : `${daysRemaining} days left in your free trial.`}
      </span>
      <Link
        href="/pricing"
        className={clsx(
          'ml-2 underline font-semibold',
          isUrgent ? 'text-white hover:text-white/90' : 'text-primary hover:text-primary-dark'
        )}
      >
        Subscribe now
      </Link>
    </div>
  );
}
