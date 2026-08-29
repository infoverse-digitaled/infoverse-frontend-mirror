import { useState, useCallback } from 'react';
import useSWR from 'swr';
import gameService, {
  Difficulty,
  KeyStage,
  StartGameResponse,
  SubmitAnswerResponse,
  CashOutResponse,
} from '@/lib/api/game-service';
import { getApiErrorMessage } from '@/lib/api/errors';

interface UseGameReturn {
  startGame: (keyStage: KeyStage, difficulty: Difficulty) => Promise<StartGameResponse>;
  submitAnswer: (sessionId: string, selectedOptionIndex: number) => Promise<SubmitAnswerResponse>;
  cashOut: (sessionId: string) => Promise<CashOutResponse>;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
}

/**
 * Mutation-style hook for driving a Millionaire game session. Each call is a one-off POST,
 * so this mirrors useAI.ts rather than the SWR read-hook pattern used for cacheable GET data.
 */
export function useGame(): UseGameReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => setError(null), []);

  const startGame = useCallback(async (keyStage: KeyStage, difficulty: Difficulty) => {
    setIsLoading(true);
    setError(null);
    try {
      return await gameService.startGame(keyStage, difficulty);
    } catch (err) {
      const message = getApiErrorMessage(err, 'Failed to start the game. Please try again.');
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const submitAnswer = useCallback(async (sessionId: string, selectedOptionIndex: number) => {
    setIsLoading(true);
    setError(null);
    try {
      return await gameService.submitAnswer(sessionId, selectedOptionIndex);
    } catch (err) {
      const message = getApiErrorMessage(err, 'Failed to submit your answer. Please try again.');
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const cashOut = useCallback(async (sessionId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      return await gameService.cashOut(sessionId);
    } catch (err) {
      const message = getApiErrorMessage(err, 'Failed to cash out. Please try again.');
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { startGame, submitAnswer, cashOut, isLoading, error, clearError };
}

/**
 * Leaderboard is cacheable GET data, so it follows the SWR read-hook pattern from useOakData.ts.
 */
export function useLeaderboard() {
  return useSWR('game-leaderboard', () => gameService.getLeaderboard(), {
    dedupingInterval: 30000,
    revalidateOnFocus: false,
  });
}

export default useGame;
