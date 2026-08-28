'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils/cn';
import {
  ConsentPreferences,
  DEFAULT_CONSENT,
  OPEN_PREFERENCES_EVENT,
  getStoredConsent,
  saveConsent,
} from '@/lib/consent';

type Category = {
  key: keyof ConsentPreferences;
  label: string;
  description: string;
};

const CATEGORIES: Category[] = [
  {
    key: 'analytics',
    label: 'Analytics',
    description:
      'Helps us understand how the platform is used (PostHog) so we can improve lessons and navigation.',
  },
  {
    key: 'marketing',
    label: 'Marketing',
    description: 'Lets us measure ad performance (Meta Pixel). No ads are shown to you directly on this site.',
  },
];

// Simple on/off switch, styled to match the site's rounded/primary-text look.
function ToggleRow({
  label,
  description,
  checked,
  disabled,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (next: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b border-gray-100 last:border-b-0">
      <div className="min-w-0">
        <p className="font-semibold text-sm text-gray-900">
          {label}
          {disabled && <span className="ml-2 font-normal text-xs text-gray-400">(always on)</span>}
        </p>
        <p className="text-xs text-gray-500 mt-0.5">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={`${label} cookies`}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={cn(
          'relative shrink-0 inline-flex items-center w-11 h-6 min-h-[24px] rounded-full transition-colors duration-200',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-text',
          disabled ? 'bg-primary-text/40 cursor-not-allowed' : checked ? 'bg-primary-text' : 'bg-gray-300'
        )}
      >
        <span
          className={cn(
            'inline-block w-4 h-4 transform rounded-full bg-white shadow transition-transform duration-200',
            checked ? 'translate-x-6' : 'translate-x-1'
          )}
        />
      </button>
    </div>
  );
}

export function CookieConsentBanner() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [hasDecision, setHasDecision] = useState(false);
  const [draft, setDraft] = useState<ConsentPreferences>(DEFAULT_CONSENT);

  useEffect(() => {
    // Hydration guard + localStorage read: both are only available client-side
    // after mount, so a lazy initializer isn't an option here.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const stored = getStoredConsent();
    if (stored) {
      setDraft({ analytics: stored.analytics, marketing: stored.marketing });
      setHasDecision(true);
    } else {
      // No decision recorded yet - block-by-default until the visitor chooses.
      setVisible(true);
    }
  }, []);

  // Let other parts of the site (e.g. the /cookies policy page) reopen the
  // preferences panel without needing shared React state.
  useEffect(() => {
    const reopen = () => {
      const stored = getStoredConsent();
      setDraft(stored ? { analytics: stored.analytics, marketing: stored.marketing } : DEFAULT_CONSENT);
      setExpanded(true);
      setVisible(true);
    };
    window.addEventListener(OPEN_PREFERENCES_EVENT, reopen);
    return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, reopen);
  }, []);

  if (!mounted) return null;

  const commit = (preferences: ConsentPreferences) => {
    saveConsent(preferences);
    setDraft(preferences);
    setHasDecision(true);
    setVisible(false);
    setExpanded(false);
  };

  const acceptAll = () => commit({ analytics: true, marketing: true });
  const rejectAll = () => commit({ analytics: false, marketing: false });
  const savePreferences = () => commit(draft);

  if (!visible) {
    if (!hasDecision) return null;
    // Small, unobtrusive re-open control - bottom-left, below the bug-report
    // FAB (which stacks above it at bottom-24, see BugReportButton.tsx) so
    // they don't overlap, and clear of the AI chatbot launcher (bottom-right,
    // see GlobalChatbot.tsx).
    return (
      <button
        type="button"
        onClick={() => {
          setExpanded(true);
          setVisible(true);
        }}
        className="fixed bottom-6 left-6 z-40 min-h-[44px] px-4 rounded-full bg-white text-gray-700 text-sm font-medium shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
        aria-label="Manage cookie preferences"
      >
        Cookie settings
      </button>
    );
  }

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[100] px-4 pb-4 sm:px-6 sm:pb-6"
    >
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-200 p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          <div className="flex-1">
            <p className="font-semibold text-gray-900 mb-1">We use cookies</p>
            <p className="text-sm text-gray-600 leading-relaxed">
              We use essential cookies to run Infoverse Digital-Ed, and - only with your permission -
              analytics and marketing cookies to help us improve the platform. See our{' '}
              <Link href="/cookies" className="text-primary-text hover:underline font-medium">
                Cookie Policy
              </Link>{' '}
              for details.
            </p>
          </div>
        </div>

        {expanded && (
          <div className="mt-4 border-t border-gray-100 pt-2">
            <ToggleRow
              label="Necessary"
              description="Required for login, security, and core site functionality. Cannot be turned off."
              checked
              disabled
            />
            {CATEGORIES.map((category) => (
              <ToggleRow
                key={category.key}
                label={category.label}
                description={category.description}
                checked={draft[category.key]}
                onChange={(next) => setDraft((prev) => ({ ...prev, [category.key]: next }))}
              />
            ))}
          </div>
        )}

        <div className="mt-4 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2 sm:gap-3">
          {!expanded && (
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="min-h-[44px] px-2 text-sm font-medium text-primary-text hover:underline self-start sm:self-auto sm:mr-auto"
            >
              Manage preferences
            </button>
          )}
          <Button variant="ghost" size="sm" onClick={rejectAll} className="min-h-[44px]">
            Reject all
          </Button>
          {expanded ? (
            <Button variant="primary" size="sm" onClick={savePreferences} className="min-h-[44px]">
              Save preferences
            </Button>
          ) : (
            <Button variant="primary" size="sm" onClick={acceptAll} className="min-h-[44px]">
              Accept all
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CookieConsentBanner;
