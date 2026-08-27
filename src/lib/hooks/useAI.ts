import { useState, useCallback } from 'react';
import authApiClient from '@/lib/api/auth-client';
import { getApiErrorMessage } from '@/lib/api/errors';

interface AskTutorResponse {
  answer: string;
}

interface UseAIReturn {
  askTutor: (context: string, question: string) => Promise<string>;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
}

/**
 * Hook for interacting with the AI Tutor
 */
export function useAI(): UseAIReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const askTutor = useCallback(async (context: string, question: string): Promise<string> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authApiClient.post<{ success: boolean; data: AskTutorResponse }>('/ai/tutor', {
        context,
        question,
      });

      return response.data.data.answer;
    } catch (err) {
      const errorMessage = getApiErrorMessage(err, 'Failed to get AI response. Please try again.');
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    askTutor,
    isLoading,
    error,
    clearError,
  };
}

export default useAI;
