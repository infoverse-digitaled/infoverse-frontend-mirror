'use client';

// Cookie consent state (PECR/GDPR).
//
// Scope decisions (audit: "No cookie-consent banner… nothing gates the
// trackers on consent"), made without a human available to confirm them —
// flagged here so they're easy to find and override:
//   1. Granular categories: Necessary (always on) / Analytics / Marketing,
//      matching the categories already documented on /cookies.
//   2. Google Identity Services (@react-oauth/google, used only for the
//      "Sign in with Google" button) is treated as strictly necessary and
//      is NOT gated here — it's a login mechanism the user explicitly
//      invokes, not a passive tracker, and blocking it would break
//      authentication. See src/app/layout.tsx.
//   3. True opt-in: analytics/marketing default to false and stay false
//      until the user actively accepts. Nothing in the analytics or
//      marketing categories loads before that decision is recorded.
//
// Consumers read live state via `useConsent(category)` (subscribes to
// CONSENT_EVENT) so accepting/rejecting takes effect immediately, without
// a page reload.

export type ConsentCategory = 'analytics' | 'marketing';

export interface ConsentPreferences {
  analytics: boolean;
  marketing: boolean;
}

interface StoredConsent extends ConsentPreferences {
  version: number;
  decidedAt: string;
}

const STORAGE_KEY = 'infoverse_cookie_consent';
// Bump this if the categories/policy change in a way that should force
// everyone to be asked again.
const CONSENT_VERSION = 1;

export const CONSENT_EVENT = 'infoverse:consent-change';
export const OPEN_PREFERENCES_EVENT = 'infoverse:open-cookie-preferences';

export const DEFAULT_CONSENT: ConsentPreferences = {
  analytics: false,
  marketing: false,
};

export function getStoredConsent(): StoredConsent | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredConsent;
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function hasConsentDecision(): boolean {
  return getStoredConsent() !== null;
}

/** Current preferences, defaulting to "everything off" until a decision exists. */
export function getConsentPreferences(): ConsentPreferences {
  const stored = getStoredConsent();
  return stored ? { analytics: stored.analytics, marketing: stored.marketing } : DEFAULT_CONSENT;
}

export function saveConsent(preferences: ConsentPreferences): void {
  if (typeof window === 'undefined') return;
  const record: StoredConsent = {
    ...preferences,
    version: CONSENT_VERSION,
    decidedAt: new Date().toISOString(),
  };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  } catch {
    // localStorage unavailable (private mode, disabled, quota). The
    // decision won't persist and the banner will re-appear next load -
    // the safe failure mode (trackers stay off until it can be saved).
  }
  window.dispatchEvent(new CustomEvent<ConsentPreferences>(CONSENT_EVENT, { detail: preferences }));
}

/** Ask the banner (rendered in the root layout) to reopen, e.g. from the /cookies page. */
export function openCookiePreferences(): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT));
}
