import authApiClient from './auth-client';
import { API_ENDPOINTS } from '@/config/api.config';

export type KeyStage = 'ks1' | 'ks2' | 'ks3' | 'ks4';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface GameQuestion {
  id: string;
  question: string;
  options: string[];
}

export interface StartGameResponse {
  sessionId: string;
  currentStep: number;
  moneyLadder: number[];
  question: GameQuestion;
}

export interface SubmitAnswerResponse {
  isCorrect: boolean;
  explanation?: string;
  correctAnswerIndex?: number;
  status: 'in_progress' | 'won' | 'lost' | 'abandoned';
  currentStep?: number;
  score: number;
  xpEarned?: number;
  nextQuestion?: GameQuestion;
}

export interface CashOutResponse {
  status: 'abandoned';
  score: number;
  xpEarned: number;
}

export interface LeaderboardEntry {
  userId: string;
  name: string;
  weeklyXp: number;
  bestScore: number;
}

interface BackendResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export const gameService = {
  async startGame(keyStage: KeyStage, difficulty: Difficulty, subject = 'mixed') {
    const response = await authApiClient.post<BackendResponse<StartGameResponse>>(
      API_ENDPOINTS.gameStart,
      { keyStage, difficulty, subject },
    );
    return response.data.data;
  },

  async submitAnswer(sessionId: string, selectedOptionIndex: number) {
    const response = await authApiClient.post<BackendResponse<SubmitAnswerResponse>>(
      API_ENDPOINTS.gameAnswer(sessionId),
      { selectedOptionIndex },
    );
    return response.data.data;
  },

  async cashOut(sessionId: string) {
    const response = await authApiClient.post<BackendResponse<CashOutResponse>>(
      API_ENDPOINTS.gameCashout(sessionId),
    );
    return response.data.data;
  },

  async getLeaderboard() {
    const response = await authApiClient.get<BackendResponse<{ leaderboard: LeaderboardEntry[] }>>(
      API_ENDPOINTS.gameLeaderboard,
    );
    return response.data.data.leaderboard;
  },
};

export default gameService;
