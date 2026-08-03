'use client';

import { createContext, useContext, useState, useCallback } from 'react';

interface AIContextValue {
  lessonContext: string | null;
  lessonTitle: string | null;
  setLessonContext: (context: string | null, title: string | null) => void;
  clearLessonContext: () => void;
}

const AIContext = createContext<AIContextValue | null>(null);

export function AIProvider({ children }: { children: React.ReactNode }) {
  const [lessonContext, setLessonContextState] = useState<string | null>(null);
  const [lessonTitle, setLessonTitleState] = useState<string | null>(null);

  const setLessonContext = useCallback((context: string | null, title: string | null) => {
    setLessonContextState(context);
    setLessonTitleState(title);
  }, []);

  const clearLessonContext = useCallback(() => {
    setLessonContextState(null);
    setLessonTitleState(null);
  }, []);

  return (
    <AIContext.Provider value={{ lessonContext, lessonTitle, setLessonContext, clearLessonContext }}>
      {children}
    </AIContext.Provider>
  );
}

export function useAIContext() {
  const ctx = useContext(AIContext);
  if (!ctx) throw new Error('useAIContext must be used within an AIProvider');
  return ctx;
}
