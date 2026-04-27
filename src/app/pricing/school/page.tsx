'use client';

import React, { useState,useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Button } from '@/components/ui';
import { useAuth } from '@/contexts/AuthContext';
import authApiClient from '@/lib/api/auth-client';

// Returns true when the visitor is authenticated (user object OR token in localStorage)
const isAuthenticated = (user: unknown) =>
  !!user || (typeof window !== 'undefined' && !!localStorage.getItem('token'));

type BillingCycle = 'term' | 'year';

interface SchoolPlan {
  id: string;
  tier: string;
  students: string;
  termPrice: string;
  yearPrice: string;
  yearSaving: string;
  planCodeTerm: string;
  planCodeYear: string;
  color: string;         // badge/accent colour
  recommended?: boolean;
  custom?: boolean;
  features: string[];
}

const SCHOOL_PLANS: SchoolPlan[] = [
  {
    id: 'tier-1',
    tier: 'Tier 1',
    students: 'Up to 100 Students',
    termPrice: '₦250,000',
    yearPrice: '₦600,000',
    yearSaving: 'save 20%',
    planCodeTerm: '',
    planCodeYear: '',
    color: 'bg-primary/5 text-primary border-primary/10',
    features: [
      'Up to 100 student licences',
      'School Admin Dashboard',
      'Progress & activity tracking',
      'Teacher resources',
    ],
  },
  {
    id: 'tier-2',
    tier: 'Tier 2',
    students: '101 – 250 Students',
    termPrice: '₦350,000',
    yearPrice: '₦800,000',
    yearSaving: 'save 24%',
    planCodeTerm: '',
    planCodeYear: '',
    color: 'bg-primary/10 text-primary border-primary/20',
    recommended: true,
    features: [
      'Up to 250 student licences',
      'School Admin Dashboard',
      'Advanced reporting',
      'Priority email support',
    ],
  },
  {
    id: 'tier-3',
    tier: 'Tier 3',
    students: '251 – 500 Students',
    termPrice: '₦450,000',
    yearPrice: '₦1,000,000',
    yearSaving: 'save 26%',
    planCodeTerm: '',
    planCodeYear: '',
    color: 'bg-primary/20 text-primary border-primary/30',
    features: [
      'Up to 500 student licences',
      'School Admin Dashboard',
      'Advanced reporting',
      'Dedicated support manager',
    ],
  },
  {
    id: 'tier-4',
    tier: 'Tier 4',
    students: '500 – 1,000 Students',
    termPrice: '₦550,000',
    yearPrice: '₦1,200,000',
    yearSaving: 'save 28%',
    planCodeTerm: '',
    planCodeYear: '',
    color: 'bg-primary/30 text-primary border-primary/40',
    features: [
      'Up to 1,000 student licences',
      'School Admin Dashboard',
      'Custom integrations',
      'Dedicated account manager',
    ],
  },
  {
    id: 'tier-5',
    tier: 'Tier 5',
    students: '1,000+ Students',
    termPrice: 'Custom',
    yearPrice: 'Custom',
    yearSaving: '',
    planCodeTerm: '',
    planCodeYear: '',
    color: 'bg-gray-100 text-gray-600 border-gray-200',
    custom: true,
    features: [
      'Unlimited student licences',
      'Bespoke onboarding & training',
      'API access',
      'SLA & dedicated support',
    ],
  },
];

export default function SchoolPricingPage() {
  const [billing, setBilling] = useState<BillingCycle>('term');
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [trialSuccess, setTrialSuccess] = useState<string | null>(null);
  const [displayPlans, setDisplayPlans] = useState<SchoolPlan[]>(SCHOOL_PLANS);
  const { user, loading: authLoading, fetchUser } = useAuth();
  const router = useRouter();

  // ─── Role Guard ──────────────────────────────────────────────────────────────
  // Only schooladmin may access this page.
  // School-enrolled students (have schoolCode but not schooladmin) → contact admin page.
  // Regular users (individual subscribers) → individual pricing page.
  useEffect(() => {
    if (authLoading) return; // wait for auth to resolve
    if (!user) return; // unauthenticated — let the page's own unauth handling deal with it
    if (user.role !== 'schooladmin') {
      const isSchoolStudent = !!(user as any).schoolCode;
      router.replace(isSchoolStudent ? '/subscription-expired' : '/pricing');
    }
  }, [user, authLoading, router]);

  // ─── Fetch Dynamic Plans ──────────────────────────────────────────────────
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await authApiClient.get('/payment/plans');
        if (response.data && response.data.plans) {
          const backendPlans = response.data.plans;

          // Merge backend pricing/codes into our local UI skeleton
          const mergedPlans = SCHOOL_PLANS.map((localPlan) => {
            // Find term and year info from backend.
            // Note: backend tier keys are uppercase: SCHOOL_TIER1_TERM
            const tierNum = localPlan.id.split('-')[1];
            const termId = `school_tier${tierNum}_term`;
            const yearId = `school_tier${tierNum}_year`;

            const termMatch = backendPlans.find((p: any) => p.id === termId);
            const yearMatch = backendPlans.find((p: any) => p.id === yearId);

            return {
              ...localPlan,
              termPrice: termMatch?.price || localPlan.termPrice,
              yearPrice: yearMatch?.price || localPlan.yearPrice,
              // For Term payments, planCode may be null/empty, we'll use tierId in handlePurchase
              planCodeTerm: termMatch?.planCode || '',
              planCodeYear: yearMatch?.planCode || '',
            };
          });

          setDisplayPlans(mergedPlans);
        }
      } catch (err) {
        console.error('Failed to fetch school pricing plans:', err);
      }
    };

    fetchPlans();
  }, []);

  // Derived subscription states
  const subStatus = user?.subscription?.status;
  const trialEndsAt = user?.subscription?.trialEndsAt
    ? new Date(user.subscription.trialEndsAt)
    : null;
  const isTrialing = subStatus === 'trialing' && trialEndsAt && trialEndsAt > new Date();
  const trialExpired = subStatus === 'trialing' && trialEndsAt && trialEndsAt <= new Date();
  const isActive = subStatus === 'active';
  // Grey out Free Trial if already trialing (active trial) OR already a paid subscriber
  const trialDisabled = !!(isTrialing || isActive || trialExpired);
  // Days remaining in trial
  const trialDaysLeft = trialEndsAt && trialEndsAt > new Date()
    ? Math.ceil((trialEndsAt.getTime() - Date.now()) / 86_400_000)
    : 0;

  const getPlanCode = (plan: SchoolPlan) =>
    billing === 'year' ? plan.planCodeYear : plan.planCodeTerm;

  const handleStartTrial = async (plan: SchoolPlan) => {
    if (!isAuthenticated(user)) { router.push('/school-register'); return; }
    if (plan.custom) { router.push('/dashboard/schooladmin'); return; }

    const planCode = getPlanCode(plan);
    setLoadingPlan('trial_' + plan.id);
    setError(null);
    setTrialSuccess(null);
    try {
      await authApiClient.post('/payment/start-trial', { planCode });
      // Refresh user so subscription status is up-to-date
      await fetchUser();
      setTrialSuccess(`Your 30-day free trial for ${plan.tier} has started! Redirecting to your dashboard…`);
      setTimeout(() => router.push('/dashboard/schooladmin'), 1500);
    } catch (err: unknown) {
      const serverMsg = (err as any)?.response?.data?.error;
      if (serverMsg === 'You already have an active trial' || serverMsg?.includes('active trial')) {
        setTrialSuccess(`You already have an active trial! Redirecting to your dashboard…`);
        setTimeout(() => router.push('/dashboard/schooladmin'), 1500);
      } else {
        setError(typeof serverMsg === 'string' ? serverMsg : 'Failed to start trial. Please try again.');
      }
    } finally {
      setLoadingPlan(null);
    }
  };

  const handlePurchase = async (plan: SchoolPlan) => {
    if (!isAuthenticated(user)) { router.push('/school-register'); return; }
    if (plan.custom) { router.push('/dashboard/schooladmin'); return; }

    const isYearly = billing === 'year';
    const planCode = isYearly ? plan.planCodeYear : null; // Only Year has a recurring Plan Code
    const tierId = !isYearly ? `SCHOOL_TIER${plan.id.split('-')[1]}_TERM` : null; // For one-time handle

    try {
      setLoadingPlan('buy_' + plan.id);
      setError(null);

      // Pass either planCode (recurring) or tierId (one-time)
      const response = await authApiClient.post<{ authorization_url: string }>(
        '/payment/initialize',
        {
          ...(planCode ? { planCode } : { tierId }),
        }
      );

      if (response.data?.authorization_url) {
        window.location.href = response.data.authorization_url;
      } else {
        throw new Error('Invalid payment response');
      }
    } catch (err: unknown) {
      const msg = (err as any)?.response?.data?.error;
      setError(typeof msg === 'string' ? msg : 'Failed to initiate payment. Please try again.');
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <section className="px-4 md:px-12 py-14 md:py-24">
        <Container size="xl" className="px-0">
          <div className="flex flex-col gap-10 md:gap-16">

            {/* Header */}
            <div className="max-w-3xl mx-auto text-center relative">
              <div className="flex justify-start mb-8 md:absolute md:top-0 md:-left-20 lg:-left-32">
                <button
                  onClick={() => router.push('/dashboard/schooladmin')}
                  className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-all font-bold text-xs uppercase tracking-wide"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Dashboard
                </button>
              </div>

              <p className="font-semibold text-sm text-primary mb-3 uppercase tracking-widest">
                School Packages
              </p>
              <h1 className="font-serif font-bold text-3xl md:text-5xl leading-tight tracking-tight text-gray-900 mb-4">
                Choose your school package
              </h1>
              <p className="text-base md:text-lg text-gray-500 leading-relaxed">
                Select a tier based on the number of students. All packages include a{' '}
                <strong className="text-gray-700">1-month free trial</strong>.
              </p>
            </div>

            {/* Billing toggle */}
            <div className="flex justify-center">
              <div className="inline-flex bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
                <button
                  onClick={() => setBilling('term')}
                  className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                    billing === 'term'
                      ? 'bg-primary text-white shadow'
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  Per Term
                </button>
                <button
                  onClick={() => setBilling('year')}
                  className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                    billing === 'year'
                      ? 'bg-primary text-white shadow'
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  Per Year
                  <span className="ml-1.5 text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-bold">
                    Save more
                  </span>
                </button>
              </div>
            </div>
            {/* Trial status banner - shows when user is mid-trial */}
            {isTrialing && (
              <div className="max-w-2xl mx-auto p-4 bg-orange-50 border border-orange-200 rounded-xl text-sm text-orange-800 text-center">
                <span className="font-semibold">🕒 Free trial active</span> — {trialDaysLeft} day{trialDaysLeft !== 1 ? 's' : ''} remaining
                (expires {trialEndsAt!.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}).
                You can still purchase a plan below to upgrade before it expires.
              </div>
            )}

            {trialExpired && (
              <div className="max-w-2xl mx-auto p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 text-center">
                <span className="font-semibold">⚠️ Your free trial has expired.</span> Please purchase a plan to continue.
              </div>
            )}

            {isActive && (
              <div className="max-w-2xl mx-auto p-4 bg-green-50 border border-green-200 rounded-xl text-sm text-green-800 text-center">
                <span className="font-semibold">✅ You have an active subscription</span> ({user?.subscription?.plan}).
                You can upgrade your plan below.
              </div>
            )}

            {trialSuccess && (
              <div className="max-w-2xl mx-auto p-4 bg-green-50 border border-green-200 rounded-xl text-sm text-green-800 text-center">
                {trialSuccess}
              </div>
            )}

            {/* Pricing table header */}
            <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-100 bg-white">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="bg-primary text-white text-sm">
                    <th className="text-left px-6 py-4 font-bold rounded-tl-2xl">Tiers</th>
                    <th className="text-center px-6 py-4 font-semibold">Number of Students</th>
                    <th className="text-center px-6 py-4 font-semibold">
                      Price Per {billing === 'term' ? 'Term' : 'Year'}
                    </th>
                    <th className="text-center px-6 py-4 font-semibold rounded-tr-2xl"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {displayPlans.map((plan) => {
                    const price = billing === 'term' ? plan.termPrice : plan.yearPrice;
                    const isLoadingTrial = loadingPlan === 'trial_' + plan.id;
                    const isLoadingBuy   = loadingPlan === 'buy_'   + plan.id;
                    const anyLoading     = !!loadingPlan;

                    return (
                      <tr
                        key={plan.id}
                        className={`transition-colors ${
                          plan.recommended
                            ? 'bg-primary/5 hover:bg-primary/10 border-l-4 border-l-primary'
                            : 'hover:bg-gray-50/60 border-l-4 border-l-transparent'
                        }`}
                      >
                        {/* Tier badge */}
                        <td className="px-6 py-5">
                          <span
                            className={`inline-flex items-center gap-2 ${plan.color} border text-xs font-bold px-4 py-1.5 rounded-full shadow-sm uppercase tracking-wide`}
                          >
                            {plan.tier}
                          </span>
                          {plan.recommended && (
                            <span className="ml-2 text-xs text-primary-dark font-bold">
                              Most popular
                            </span>
                          )}
                        </td>

                        {/* Students */}
                        <td className="px-6 py-5 text-center text-gray-700 font-medium">
                          {plan.students}
                        </td>

                        {/* Price */}
                        <td className="px-6 py-5 text-center">
                          {plan.custom ? (
                            <span className="text-gray-500 font-medium">Custom</span>
                          ) : (
                            <div className="flex flex-col items-center gap-0.5">
                              <span className="text-xl font-extrabold text-gray-900">
                                {price}
                              </span>
                              {billing === 'year' && plan.yearSaving && (
                                <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                                  {plan.yearSaving}
                                </span>
                              )}
                            </div>
                          )}
                        </td>

                        {/* CTA buttons */}
                        <td className="px-6 py-5">
                          <div className="flex flex-col sm:flex-row items-center gap-2">
                            {plan.custom ? (
                              <Button
                                onClick={() => router.push('/contact')}
                                className="rounded-xl text-sm whitespace-nowrap"
                                fullWidth
                              >
                                Custom Pricing
                              </Button>
                            ) : (
                              <>
                                {/* Free Trial / Dashboard button */}
                                <Button
                                  onClick={() => {
                                    if (isTrialing) {
                                      router.push('/dashboard/schooladmin');
                                    } else {
                                      handleStartTrial(plan);
                                    }
                                  }}
                                  isLoading={isLoadingTrial}
                                  disabled={authLoading || isActive || trialExpired || (anyLoading && !isLoadingTrial)}
                                  className={`rounded-xl text-sm whitespace-nowrap`}
                                  fullWidth
                                >
                                  {authLoading ? 'Loading…' : isTrialing ? 'Go to Dashboard' : trialExpired ? 'Trial Expired' : isActive ? 'Subscribed' : 'Free Trial'}
                                </Button>
                                <Button
                                  onClick={() => handlePurchase(plan)}
                                  isLoading={isLoadingBuy}
                                  disabled={authLoading || (anyLoading && !isLoadingBuy)}
                                  variant="outline"
                                  className="rounded-xl text-sm whitespace-nowrap"
                                  fullWidth
                                >
                                  {isActive ? 'Upgrade' : 'Buy Now'}
                                </Button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Footer note */}
            <p className="text-center text-sm text-gray-400">
              All prices are exclusive of VAT. Switching between terms is available at any time.
              Need help choosing?{' '}
              <a href="/contact" className="text-primary font-medium hover:underline">
                Contact our team
              </a>.
            </p>

          </div>
        </Container>
      </section>
    </div>
  );
}
