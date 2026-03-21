'use client';

import { useState, useEffect } from 'react';
import authApiClient from '@/lib/api/auth-client';

interface Plan {
  id: string;
  name: string;
  price: string;
  description: string;
  planCode: string;
  recommended?: boolean;
}

interface TrialExpiredModalProps {
  daysOverdue?: number;
}

export function TrialExpiredModal({ daysOverdue = 0 }: TrialExpiredModalProps) {
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);

  // Fetch plans from API on mount
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await authApiClient.get('/payment/plans');
        if (response.data?.plans) {
          setPlans(response.data.plans);
        }
      } catch (err) {
        console.error('Failed to fetch plans:', err);
        // Fallback plans if API fails
        setPlans([
          {
            id: 'annual',
            name: 'Annual Plan',
            price: '₦25,000',
            description: 'Best value - save 30%',
            planCode: '',
            recommended: true,
          },
          {
            id: 'monthly',
            name: 'Monthly Plan',
            price: '₦3,000',
            description: 'Billed monthly',
            planCode: '',
          },
        ]);
      }
    };
    fetchPlans();
  }, []);

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

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-5 bg-orange-100 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Your Free Trial Has Ended
          </h2>
          <p className="text-gray-600">
            {daysOverdue > 0
              ? `Your trial expired ${daysOverdue} day${daysOverdue > 1 ? 's' : ''} ago.`
              : 'Your 7-day free trial has ended.'
            }
          </p>
          <p className="text-gray-900 font-medium mt-2">
            Subscribe now to continue learning!
          </p>
        </div>

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
