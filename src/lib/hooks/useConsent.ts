'use client';

import { useEffect, useState } from 'react';
import {
  CONSENT_EVENT,
  ConsentCategory,
  ConsentPreferences,
  getConsentPreferences,
} from '@/lib/consent';

/**
 * Live consent flag for one category. Starts `false` (matches the
 * pre-decision default and avoids an SSR/client hydration mismatch), then
 * syncs from localStorage on mount and stays in sync with any later
 * accept/reject/save via the CONSENT_EVENT the banner dispatches.
 */
export function useConsent(category: ConsentCategory): boolean {
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    // localStorage is only readable client-side after mount, so a lazy
    // initializer isn't an option here - mirrors TrialBanner.tsx's guard.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setGranted(getConsentPreferences()[category]);

    const handleChange = (event: Event) => {
      const detail = (event as CustomEvent<ConsentPreferences>).detail;
      setGranted(detail[category]);
    };

    window.addEventListener(CONSENT_EVENT, handleChange);
    return () => window.removeEventListener(CONSENT_EVENT, handleChange);
  }, [category]);

  return granted;
}
