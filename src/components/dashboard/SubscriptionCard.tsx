'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import authApiClient from '@/lib/api/auth-client';

// Map internal plan keys to friendly display info
const PLAN_DISPLAY: Record<string, { label: string; price: string; billing: string; color: string }> = {
  individual_daily:   { label: 'Daily',   price: '₦100',    billing: 'Billed daily',          color: 'text-blue-600 bg-blue-50 border-blue-200' },
  individual_weekly:  { label: 'Weekly',  price: '₦600',    billing: 'Billed weekly',         color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
  individual_monthly: { label: 'Monthly', price: '₦2,000',  billing: 'Billed monthly',        color: 'text-purple-600 bg-purple-50 border-purple-200' },
  individual_annual:  { label: 'Annual',  price: '₦20,000', billing: 'Best value — save 30%', color: 'text-primary bg-primary/5 border-primary/20' },
  premium:            { label: 'Premium', price: '—',        billing: 'Active subscription',   color: 'text-primary bg-primary/5 border-primary/20' },
  free:               { label: 'Free',    price: '₦0',       billing: 'No active plan',        color: 'text-gray-600 bg-gray-50 border-gray-200' },
};

export default function SubscriptionCard() {
  const { user, isTrialExpired, daysRemaining, fetchUser } = useAuth();
  const router = useRouter();

  const [confirmingCancel, setConfirmingCancel] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [cancelError, setCancelError] = useState<string | null>(null);

  const sub = user?.subscription;
  const status = sub?.status ?? 'free';
  const planKey = (sub?.plan ?? 'free').toLowerCase();
  const planInfo = PLAN_DISPLAY[planKey] ?? PLAN_DISPLAY['free'];

  const isActive    = status === 'active';
  const isTrialing  = status === 'trialing' && !isTrialExpired;
  const isExpired   = isTrialExpired;
  const isCancelled = status === 'cancelled' || status === 'past_due' || status === 'inactive';

  // ─── Status badge ────────────────────────────────────────────────────────────
  let badgeText  = 'Free';
  let badgeClass = 'bg-gray-100 text-gray-600';
  let statusIcon = '○';

  if (isActive) {
    badgeText  = 'Active';
    badgeClass = 'bg-green-100 text-green-700';
    statusIcon = '●';
  } else if (isTrialing) {
    badgeText  = `Trial — ${daysRemaining ?? 0}d left`;
    badgeClass = 'bg-orange-100 text-orange-700';
    statusIcon = '◑';
  } else if (isExpired) {
    badgeText  = 'Trial Expired';
    badgeClass = 'bg-red-100 text-red-700';
    statusIcon = '○';
  } else if (isCancelled) {
    badgeText  = 'Cancelled';
    badgeClass = 'bg-gray-100 text-gray-500';
    statusIcon = '○';
  }

  // ─── Primary CTA ─────────────────────────────────────────────────────────────
  let ctaLabel   = 'Choose a Plan';
  let ctaStyle   = 'bg-primary text-white hover:bg-primary-dark';
  let ctaSubtext = '';

  if (isActive) {
    ctaLabel   = 'Change Plan';
    ctaStyle   = 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50';
    ctaSubtext = 'Upgrade or switch billing cycle';
  } else if (isTrialing) {
    ctaLabel   = 'Upgrade Now';
    ctaStyle   = 'bg-primary text-white hover:bg-primary-dark';
    ctaSubtext = 'Keep your access — upgrade before your trial ends';
  } else if (isExpired || isCancelled) {
    ctaLabel   = 'Subscribe Now';
    ctaStyle   = 'bg-primary text-white hover:bg-primary-dark';
    ctaSubtext = 'Choose a plan to restore access';
  } else {
    ctaLabel   = 'View Plans';
    ctaStyle   = 'bg-primary text-white hover:bg-primary-dark';
    ctaSubtext = 'Start with a 7-day free trial';
  }

  const isShortTermPlan = planKey === 'individual_daily' || planKey === 'individual_weekly';

  // ─── Cancel handler ──────────────────────────────────────────────────────────
  const handleCancelConfirm = async () => {
    setCancelling(true);
    setCancelError(null);
    try {
      await authApiClient.post('/payment/cancel');
      // Refresh user in context so the UI reflects the downgrade immediately
      await fetchUser();
      setConfirmingCancel(false);
    } catch (err: any) {
      setCancelError(
        err?.response?.data?.error || 'Failed to cancel subscription. Please try again.'
      );
    } finally {
      setCancelling(false);
    }
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 shadow-sm mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        {/* ── Left: plan info ─────────────────────────────────────────────── */}
        <div className="flex items-start gap-4">
          {/* Plan icon */}
          <div className={`w-12 h-12 rounded-xl border flex items-center justify-center flex-shrink-0 ${planInfo.color}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">My Plan</p>
              <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${badgeClass}`}>
                <span className="text-[10px]">{statusIcon}</span>
                {badgeText}
              </span>
            </div>

            <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-0.5">
              {planInfo.label}
              {(isActive || isTrialing) && planInfo.price !== '—' && (
                <span className="text-base font-medium text-gray-400 ml-2">{planInfo.price}</span>
              )}
            </p>

            <p className="text-sm text-gray-500 mt-0.5">{planInfo.billing}</p>

            {/* Trial progress bar */}
            {isTrialing && typeof daysRemaining === 'number' && (
              <div className="mt-3 max-w-[220px]">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Trial progress</span>
                  <span>{daysRemaining}d remaining</span>
                </div>
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full transition-all duration-700"
                    style={{ width: `${Math.max(5, Math.min(100, ((7 - (daysRemaining ?? 7)) / 7) * 100))}%` }}
                  />
                </div>
              </div>
            )}

            {/* Short-term plan nudge */}
            {isActive && isShortTermPlan && (
              <p className="text-xs text-primary font-medium mt-2">
                💡 Save more with Monthly (₦2,000) or Annual (₦20,000)
              </p>
            )}
          </div>
        </div>

        {/* ── Right: actions ──────────────────────────────────────────────── */}
        <div className="flex flex-col items-start sm:items-end gap-2 sm:min-w-[160px]">
          {/* Primary CTA */}
          <button
            id="subscription-change-plan-btn"
            onClick={() => router.push('/pricing')}
            className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md ${ctaStyle}`}
          >
            {ctaLabel}
          </button>
          {ctaSubtext && (
            <p className="text-xs text-gray-400 text-left sm:text-right max-w-[180px]">{ctaSubtext}</p>
          )}

          {/* Cancel button — only for active subscribers */}
          {isActive && !confirmingCancel && (
            <button
              id="subscription-cancel-btn"
              onClick={() => { setConfirmingCancel(true); setCancelError(null); }}
              className="w-full sm:w-auto text-xs text-gray-400 hover:text-red-500 transition-colors duration-200 underline underline-offset-2 mt-1"
            >
              Cancel subscription
            </button>
          )}
        </div>
      </div>

      {/* ── Inline confirmation dialog ───────────────────────────────────────── */}
      {confirmingCancel && (
        <div className="mt-4 pt-4 border-t border-red-100 animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="flex items-start gap-3 mb-3">
            {/* Warning icon */}
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Cancel your subscription?</p>
              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                Your access to premium content will be removed immediately. You can re-subscribe at any time.
              </p>
            </div>
          </div>

          {/* Error message */}
          {cancelError && (
            <p className="text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2 mb-3">{cancelError}</p>
          )}

          <div className="flex items-center gap-2">
            <button
              id="subscription-cancel-confirm-btn"
              onClick={handleCancelConfirm}
              disabled={cancelling}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white text-xs font-semibold hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
            >
              {cancelling && (
                <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
              )}
              {cancelling ? 'Cancelling…' : 'Yes, cancel subscription'}
            </button>
            <button
              id="subscription-cancel-dismiss-btn"
              onClick={() => { setConfirmingCancel(false); setCancelError(null); }}
              disabled={cancelling}
              className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 text-xs font-semibold hover:bg-gray-50 disabled:opacity-60 transition-all duration-200"
            >
              Keep subscription
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

