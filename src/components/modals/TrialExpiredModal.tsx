'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import authApiClient from '@/lib/api/auth-client';

interface Plan {
  id: string;
  name: string;
  price: string;
  description: string;
  planCode: string;
  recommended?: boolean;
}

export function TrialExpiredModal() {
  const { user, isTrialExpired } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const pathname = usePathname();

  // Use static plans to guarantee pricing consistency across the app
  useEffect(() => {
    setPlans([
      {
        id: 'annual',
        name: 'Annual Plan',
        price: '₦25,000',
        description: 'Best value - save 30%',
        planCode: 'PLN_t56h44wx8f2vcw7',
        recommended: true,
      },
      {
        id: 'monthly',
        name: 'Monthly Plan',
        price: '₦3,000',
        description: 'Billed monthly',
        planCode: 'PLN_vnfkw3ejctr7fe4',
      },
    ]);
  }, []);

  useEffect(() => {
    // Show modal if user is logged in and trial is expired
    if (!user || !isTrialExpired) {
      setIsOpen(false);
      return;
    }

    // INDUSTRY STANDARD: Never block auth, pricing, landing, or legal pages
    const publicExemptions = [
      '/',
      '/login',
      '/register',
      '/forgot-password',
      '/reset-password',
      '/pricing',
      '/payment',
      '/about',
      '/contact',
      '/privacy',
      '/terms',
      '/cookies',
      '/auth/callback'
    ];

    const isExempt = publicExemptions.some(path => pathname === path || pathname?.startsWith(path + '/'));
    
    // We only want to block strict product pages that require an active sub
    const isProductPage = 
      pathname?.startsWith('/dashboard') || 
      pathname?.startsWith('/lessons');

    if (isProductPage && !isExempt) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [user, isTrialExpired, pathname]);

  // Allow other components to programmatically trigger the paywall
  useEffect(() => {
    const handleShowPaywall = () => {
      if (isTrialExpired) {
        setIsOpen(true);
      }
    };
    
    window.addEventListener('show-paywall', handleShowPaywall);
    return () => window.removeEventListener('show-paywall', handleShowPaywall);
  }, [isTrialExpired]);

  const handleProceedToPayment = async (planCode: string) => {
    try {
      setLoading(planCode);
      setError(null);

      const response = await authApiClient.post('/payment/initialize', { planCode });

      if (response.data.authorization_url) {
        window.location.href = response.data.authorization_url;
      } else {
        setError('Failed to get payment URL. Please try again.');
      }
    } catch (err: any) {
      console.error('Failed to initialize payment:', err);
      setError(err.response?.data?.error || 'Failed to initialize payment. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 sm:p-8">
        {/* Dismiss button */}
        <button
          onClick={() => setIsOpen(false)}
          aria-label="Close"
          className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {/* Warning Icon */}
        <div className="w-20 h-20 mx-auto mb-5 bg-orange-100 rounded-full flex items-center justify-center">
          <svg className="w-10 h-10 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">
          Your Free Trial Has Ended
        </h2>

        <p className="text-gray-600 text-center mb-2">
          Your 7-day free trial has expired.
        </p>
        <p className="text-gray-900 font-medium text-center mb-6">
          Subscribe now to continue learning!
        </p>

        {/* Error message */}
        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-center">
            {error}
          </div>
        )}

        {/* Plan options with Proceed to Payment buttons */}
        <div className="space-y-4">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`p-5 rounded-xl border-2 ${
                plan.recommended
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              {plan.recommended && (
                <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-semibold rounded-full mb-3">
                  Recommended
                </span>
              )}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="font-bold text-lg text-gray-900">{plan.name}</p>
                  <p className="text-sm text-gray-500">{plan.description}</p>
                </div>
                <p className="text-2xl font-bold text-gray-900">{plan.price}</p>
              </div>
              <button
                onClick={() => handleProceedToPayment(plan.planCode)}
                disabled={!!loading}
                className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2 ${
                  plan.recommended
                    ? 'bg-primary hover:bg-primary-dark'
                    : 'bg-gray-800 hover:bg-gray-900'
                } ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading === plan.planCode ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Redirecting to payment...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    Proceed to Payment
                  </>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Features reminder */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center mb-3">What you&apos;ll unlock:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {['100+ lessons', 'AI tutor', 'Progress tracking'].map((feature, i) => (
              <span key={i} className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
