'use client';

import { useState, useEffect } from 'react';

const STORAGE_KEY = 'lastFeedbackPrompt';
const PROMPT_INTERVAL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export function useFeedbackTimer() {
  const [shouldShowFeedback, setShouldShowFeedback] = useState(false);

  useEffect(() => {
    const lastPrompt = localStorage.getItem(STORAGE_KEY);
    if (!lastPrompt) {
      // First time visiting: don't bombard them with a popup.
      // Silently set the baseline timestamp so they are asked later.
      localStorage.setItem(STORAGE_KEY, Date.now().toString());
      return;
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
