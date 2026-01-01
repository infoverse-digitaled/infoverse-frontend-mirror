'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import authApiClient from '@/lib/api/auth-client';

interface Subscription {
  plan: 'free' | 'premium';
  status: 'free' | 'active' | 'inactive' | 'cancelled' | 'trialing' | 'past_due';
  expiresAt?: string;
  trialEndsAt?: string;
}

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  keyStage?: number;
  subscription?: Subscription;
  createdAt?: string;
}

interface RegisterResult {
  skipPayment: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, licenseKey?: string) => Promise<RegisterResult>;
  logout: () => Promise<void>;
  setTokenAndFetchUser: (token: string) => Promise<void>;
  loading: boolean;
  isTrialExpired: boolean;
  daysRemaining: number | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper function to check if trial is expired
const checkTrialExpired = (user: User | null): boolean => {
  if (!user?.subscription) return false;
  const { status, trialEndsAt } = user.subscription;

  if (status === 'active') return false; // Paid user
  if (status === 'trialing' && trialEndsAt) {
    return new Date(trialEndsAt) <= new Date();
  }
  // Free, cancelled, past_due, inactive - all considered expired
  if (['free', 'cancelled', 'past_due', 'inactive'].includes(status)) {
    return true;
  }
  return false;
};

// Helper function to calculate days remaining in trial
const calculateDaysRemaining = (user: User | null): number | null => {
  if (!user?.subscription) return null;
  const { status, trialEndsAt } = user.subscription;

  if (status === 'active') return null; // Paid user - no trial
  if (status === 'trialing' && trialEndsAt) {
    const now = new Date();
    const trialEnd = new Date(trialEndsAt);
    const diffTime = trialEnd.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  }
  return 0;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Computed trial status
  const isTrialExpired = checkTrialExpired(user);
  const daysRemaining = calculateDaysRemaining(user);

  useEffect(() => {
    // Check if user is logged in on mount
    const token = localStorage.getItem('token');
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const res = await authApiClient.get('/auth/me');
      setUser(res.data.data);
    } catch (error) {
      console.error('Failed to fetch user:', error);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const res = await authApiClient.post('/auth/login', { email, password });
    const { token, user: userData } = res.data.data;
    localStorage.setItem('token', token);
    setUser(userData);
  };

  const register = async (name: string, email: string, password: string, licenseKey?: string): Promise<RegisterResult> => {
    const payload: { name: string; email: string; password: string; licenseKey?: string } = {
      name,
      email,
      password,
    };

    if (licenseKey) {
      payload.licenseKey = licenseKey;
    }

    const res = await authApiClient.post('/auth/register', payload);
    const { token, user: userData, skipPayment } = res.data.data;
    localStorage.setItem('token', token);
    setUser(userData);

    return { skipPayment: !!skipPayment };
  };

  const logout = async () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const setTokenAndFetchUser = async (token: string) => {
    localStorage.setItem('token', token);
    await fetchUser();
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, setTokenAndFetchUser, loading, isTrialExpired, daysRemaining }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
