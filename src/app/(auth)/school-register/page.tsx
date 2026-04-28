'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input, Button, Card } from '@/components/ui';
import { useAuth } from '@/contexts/AuthContext';

export default function SchoolRegisterPage() {
  const router = useRouter();
  const { registerSchoolAdmin, user, loading } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    schoolName: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');

  // Redirect if already logged in and not currently registering
  useEffect(() => {
    if (user && !loading && !isLoading) {
      if (user.role === 'schooladmin') {
        router.push('/dashboard/schooladmin');
      } else {
        router.push('/dashboard');
      }
    }
  }, [user, loading, isLoading, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.schoolName.trim()) {
      newErrors.schoolName = 'School name is required';
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
      await registerSchoolAdmin(formData.name, formData.email, formData.password, formData.schoolName);

      // Go to welcome page after successful registration
      // Note: we intentionally DO NOT set isLoading(false) here,
      // because the component is about to unmount. Setting it to false
      // would trigger the safety useEffect and redirect to dashboard.
      router.push('/welcome');
    } catch (error: any) {
      setGeneralError(
        error.response?.data?.error?.message ||
          'Registration failed. Please try again.'
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center w-full">
      <Card className="w-full max-w-md shadow-xl bg-white p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Register Your School</h1>
          <p className="text-gray-500">Create an admin account to manage your school's Infoverse access.</p>
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
            label="Admin Full Name"
            name="name"
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            disabled={isLoading}
          />

          <Input
            label="Admin Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            disabled={isLoading}
          />

          <Input
            label="School Name"
            name="schoolName"
            type="text"
            placeholder="e.g., Springwood High School"
            value={formData.schoolName}
            onChange={handleChange}
            error={errors.schoolName}
            disabled={isLoading}
          />

          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            disabled={isLoading}
          />

          <Button type="submit" fullWidth isLoading={isLoading} size="lg">
            Register Your School
          </Button>
        </form>

        <div className="mt-8 text-center text-gray-500">
          <p>
            Already registered your school?{' '}
            <Link
              href="/login"
              className="font-semibold text-secondary hover:text-secondary-dark transition-colors"
            >
              Log in
            </Link>
          </p>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm">
              Are you a student or individual?{' '}
              <Link
                href="/register"
                className="font-semibold text-primary hover:underline transition-colors"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
