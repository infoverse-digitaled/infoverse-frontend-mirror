'use client';

import { useState, useEffect } from 'react';

const STORAGE_KEY = 'lastFeedbackPrompt';
const PROMPT_INTERVAL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export function useFeedbackTimer() {
  const [shouldShowFeedback, setShouldShowFeedback] = useState(false);

  useEffect(() => {
    const lastPrompt = localStorage.getItem(STORAGE_KEY);
    if (!lastPrompt) {
      // Never prompted before — show after a short delay so it doesn't flash on first load
      const timer = setTimeout(() => setShouldShowFeedback(true), 5000);
      return () => clearTimeout(timer);
    }

    const elapsed = Date.now() - parseInt(lastPrompt, 10);
    if (elapsed >= PROMPT_INTERVAL_MS) {
      setShouldShowFeedback(true);
    }
  }, []);

  const dismissFeedback = () => {
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
    setShouldShowFeedback(false);
  };

  return { shouldShowFeedback, dismissFeedback };
}
