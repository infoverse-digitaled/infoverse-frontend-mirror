'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, Container } from '@/components/ui';
import { useAuth } from '@/contexts/AuthContext';
import authApiClient from '@/lib/api/auth-client';
import { getApiErrorMessage } from '@/lib/api/errors';

export default function OnboardingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [role, setRole] = useState('student');
  const [keyStage, setKeyStage] = useState('ks1');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleCompleteOnboarding = async () => {
    setIsSaving(true);
    setError('');

    try {
      // Map frontend role values to backend values
      const backendRole = role === 'teacher' || role === 'parent' ? 'instructor' : 'student';

      await authApiClient.patch('/auth/onboarding', {
        role: backendRole,
        keyStage,
      });

      router.push('/dashboard');
    } catch (err) {
      console.error('Failed to save onboarding data:', err);
      setError(getApiErrorMessage(err, 'Failed to save preferences. Please try again.'));
    } finally {
      setIsSaving(false);
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <Container>
        <Card className="max-w-2xl mx-auto p-8 md:p-12 text-center shadow-xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Hey {user.name}, welcome to Infoverse!
            </h1>
            <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-800 font-medium mb-8">
              You have free access for 14 days. No credit card required now.
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm">
              {error}
            </div>
          )}

          <div className="text-left space-y-6 mb-10">
            <h2 className="text-xl font-semibold text-gray-900">
              Tell us more about you
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  I am a...
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  disabled={isSaving}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="parent">Parent</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Key Stage
                </label>
                <select
                  value={keyStage}
                  onChange={(e) => setKeyStage(e.target.value)}
                  disabled={isSaving}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="ks1">Key Stage 1 (Years 1-2)</option>
                  <option value="ks2">Key Stage 2 (Years 3-6)</option>
                  <option value="ks3">Key Stage 3 (Years 7-9)</option>
                  <option value="ks4">Key Stage 4 (Years 10-11)</option>
                </select>
              </div>
            </div>
          </div>

          <Button
            size="lg"
            fullWidth
            onClick={handleCompleteOnboarding}
            isLoading={isSaving}
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Go to Dashboard'}
          </Button>
        </Card>
      </Container>
    </div>
  );
}
