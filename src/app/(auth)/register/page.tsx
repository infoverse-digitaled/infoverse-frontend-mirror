'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input, Button, Card } from '@/components/ui';
import { useAuth } from '@/contexts/AuthContext';

type RegistrationMode = 'standard' | 'school';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [mode, setMode] = useState<RegistrationMode>('standard');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    licenseCode: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');

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

    if (mode === 'school' && !formData.licenseCode.trim()) {
      newErrors.licenseCode = 'School license code is required';
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
      const licenseKey = mode === 'school' ? formData.licenseCode : undefined;
      await register(formData.name, formData.email, formData.password, licenseKey);

      // Go directly to dashboard after successful registration
      // User is automatically logged in via AuthContext
      router.push('/dashboard');
    } catch (error: any) {
      setGeneralError(
        error.response?.data?.error?.message ||
          'Registration failed. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center w-full">
      <Card className="w-full max-w-md shadow-xl bg-white p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Join Infoverse</h1>
          <p className="text-gray-500">Create an account to start your learning journey.</p>
        </div>

        {/* Registration Mode Toggle */}
        <div className="flex mb-6 bg-gray-100 rounded-xl p-1">
          <button
            type="button"
            onClick={() => setMode('standard')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
              mode === 'standard'
                ? 'bg-white text-primary shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Standard
          </button>
          <button
            type="button"
            onClick={() => setMode('school')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
              mode === 'school'
                ? 'bg-white text-primary shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            School Code
          </button>
        </div>

        {mode === 'school' && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-xl text-blue-700 text-sm">
            <p className="font-medium mb-1">Registering with a school code?</p>
            <p className="text-blue-600">Enter the license code provided by your school to get instant access.</p>
          </div>
        )}

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
            label="Full Name"
            name="name"
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            disabled={isLoading}
          />

          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
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

          {mode === 'school' && (
            <Input
              label="School License Code"
              name="licenseCode"
              type="text"
              placeholder="e.g., SCHOOL-XXXX-XXXX"
              value={formData.licenseCode}
              onChange={handleChange}
              error={errors.licenseCode}
              disabled={isLoading}
            />
          )}

          <Button type="submit" fullWidth isLoading={isLoading} size="lg">
            {mode === 'school' ? 'Register with School Code' : 'Sign Up'}
          </Button>
        </form>

        <div className="mt-8 text-center text-gray-500">
          <p>
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-semibold text-secondary hover:text-secondary-dark transition-colors"
            >
              Log in
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
