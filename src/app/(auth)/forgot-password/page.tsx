'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Input, Button, Card } from '@/components/ui';
import { useAuth } from '@/contexts/AuthContext';

export default function ForgotPasswordPage() {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generalError, setGeneralError] = useState('');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError('');

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      await forgotPassword(email);
      setIsSubmitted(true);
    } catch (error: any) {
      setGeneralError(
        error.response?.data?.error?.message ||
          'Failed to send reset email. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex justify-center items-center w-full">
        <Card className="w-full max-w-md shadow-xl bg-white p-8 text-center">
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-500">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Check your email</h1>
          <p className="text-gray-600 mb-8">
            We&apos;ve sent a password reset link to <span className="font-semibold text-gray-900">{email}</span>.
          </p>
          <div className="space-y-4">
            <Link href="/login" className="block w-full">
              <Button fullWidth variant="primary">
                Return to Login
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center w-full">
      <Card className="w-full max-w-md shadow-xl bg-white p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Forgot Password</h1>
          <p className="text-gray-500">Enter your email and we&apos;ll send you a link to reset your password.</p>
        </div>

        {generalError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm flex items-start gap-2">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{generalError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors({});
            }}
            error={errors.email}
            disabled={isLoading}
          />

          <Button type="submit" fullWidth isLoading={isLoading} size="lg">
            Send Reset Link
          </Button>
        </form>

        <div className="mt-8 text-center text-gray-500">
          <p>
            Remember your password?{' '}
            <Link
              href="/login"
              className="font-semibold text-primary hover:text-primary-dark transition-colors"
            >
              Log in
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
