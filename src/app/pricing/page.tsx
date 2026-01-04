'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Container, Button } from '@/components/ui';
import { useAuth } from '@/contexts/AuthContext';
import authApiClient from '@/lib/api/auth-client';

interface Plan {
  id: string;
  name: string;
  price: string;
  description: string;
  planCode: string;
  features: string[];
}

const plans: Plan[] = [
  {
    id: 'monthly',
    name: 'Monthly',
    price: '₦7,500',
    description: 'Per month, billed monthly',
    planCode: 'PLN_vnfkw3ejctr7fe4',
    features: [
      '5,000+ curriculum lessons',
      'AI-powered learning support',
      'Progress tracking dashboard',
    ],
  },
  {
    id: 'annual',
    name: 'Annual',
    price: '₦65,000',
    description: 'Per year, save 28%',
    planCode: 'PLN_t56h44wx8f2vcw7',
    features: [
      '5,000+ curriculum lessons',
      'AI-powered learning support',
      'Progress tracking dashboard',
      'Priority email support',
    ],
  },
];

const faqs = [
  {
    question: 'Can I cancel anytime?',
    answer: 'Yes. You can cancel your subscription at any time without penalty. Your access continues until the end of your billing period. No hidden fees, no complications.',
  },
  {
    question: 'What happens after the trial?',
    answer: "Your 14-day trial gives you full access to all features. When it ends, you choose to subscribe or walk away. We'll never charge you without your decision.",
  },
  {
    question: 'Can I change my plan?',
    answer: "Yes. You can switch between monthly and annual plans at any time. Changes take effect immediately, and we'll adjust your billing accordingly.",
  },
  {
    question: 'Do you offer school discounts?',
    answer: "We do. Schools and educational institutions receive custom pricing. Contact our team to discuss your institution's needs and explore tailored solutions.",
  },
  {
    question: 'Is the trial truly free?',
    answer: 'Completely free. No credit card required to start. You get 14 days of unrestricted access to everything. Cancel anytime before the trial ends.',
  },
];

export default function PricingPage() {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { user } = useAuth();
  const router = useRouter();

  const handleSelectPlan = async (planCode: string) => {
    if (!user) {
      sessionStorage.setItem('selectedPlan', planCode);
      router.push('/register');
      return;
    }

    try {
      setLoadingPlan(planCode);
      setError(null);

      // Check if user's trial has expired - if so, go to payment
      const isTrialExpired = user.subscription?.status === 'trialing' &&
        user.subscription?.trialEndsAt &&
        new Date(user.subscription.trialEndsAt) < new Date();

      if (isTrialExpired) {
        // Trial expired - initiate payment
        const response = await authApiClient.post<{ authorization_url: string }>(
          '/payment/initialize',
          { planCode }
        );

        if (response.data.authorization_url) {
          window.location.href = response.data.authorization_url;
        }
      } else {
        // Start free trial
        const response = await authApiClient.post<{ message: string; trialEndsAt: string; redirectUrl: string }>(
          '/payment/start-trial',
          { planCode }
        );

        // Cardless trial started - redirect to dashboard
        if (response.data.redirectUrl) {
          router.push(response.data.redirectUrl);
        } else {
          router.push('/dashboard');
        }
      }
    } catch (err: unknown) {
      console.error('Failed to process:', err);
      const errorMessage = (err as { response?: { data?: { error?: string } } })?.response?.data?.error || 'Failed to process. Please try again.';
      setError(errorMessage);
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Header Section */}
      <section className="px-5 md:px-16 py-16 md:py-28">
        <Container size="xl" className="px-0">
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-semibold text-base text-gray-900 mb-4">
              Plans
            </p>
            <h1 className="font-serif font-bold text-4xl md:text-7xl lg:text-[84px] leading-[1.1] tracking-tight text-gray-900 mb-6">
              Flexible pricing for every learner
            </h1>
            <p className="text-base md:text-xl text-gray-600 leading-relaxed mb-8">
              Choose a plan that fits your needs. All plans include full access to 5,000+ UK-curriculum lessons, quizzes, and exams.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="#pricing">
                <Button size="lg" className="rounded-xl">
                  Explore
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Pricing Cards Section */}
      <section id="pricing" className="px-5 md:px-16 py-16 md:py-28">
        <Container size="xl" className="px-0">
          <div className="flex flex-col gap-12 md:gap-20">
            {/* Section Header */}
            <div className="max-w-3xl mx-auto text-center">
              <p className="font-semibold text-base text-gray-900 mb-4">
                Plans
              </p>
              <h2 className="font-serif font-bold text-3xl md:text-5xl lg:text-[60px] leading-[1.2] tracking-tight text-gray-900 mb-6">
                Simple pricing
              </h2>
              <p className="text-base md:text-xl text-gray-600 leading-relaxed">
                All plans unlock access to 5,000+ curriculum-aligned lessons and expert-designed content.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="max-w-md mx-auto p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-center">
                {error}
              </div>
            )}

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 flex flex-col"
                >
                  {/* Plan Title */}
                  <div className="mb-8">
                    <h3 className="font-serif font-bold text-xl md:text-2xl leading-tight text-gray-900 mb-1">
                      {plan.name}
                    </h3>
                    <p className="text-base text-gray-600">
                      {plan.description}
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-200 mb-8" />

                  {/* Price */}
                  <div className="mb-8">
                    <p className="font-serif font-bold text-4xl md:text-5xl lg:text-[84px] leading-[1.1] tracking-tight text-gray-900">
                      {plan.price}
                    </p>
                  </div>

                  {/* CTA Button */}
                  <Button
                    onClick={() => handleSelectPlan(plan.planCode)}
                    isLoading={loadingPlan === plan.planCode}
                    disabled={!!loadingPlan && loadingPlan !== plan.planCode}
                    fullWidth
                    className="rounded-xl mb-4"
                  >
                    {user?.subscription?.status === 'trialing' && user?.subscription?.trialEndsAt && new Date(user.subscription.trialEndsAt) < new Date()
                      ? 'Subscribe Now'
                      : 'Start 14-day free trial'}
                  </Button>
                  <p className="text-center text-sm text-gray-500 mb-8">
                    No credit card required
                  </p>

                  {/* Divider */}
                  <div className="border-t border-gray-200 mb-8" />

                  {/* Features */}
                  <ul className="space-y-4 flex-grow">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-4">
                        <svg
                          className="flex-shrink-0 w-6 h-6 text-gray-900"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-base text-gray-900">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="px-5 md:px-16 py-16 md:py-28">
        <Container size="xl" className="px-0">
          <div className="flex flex-col gap-12 md:gap-20">
            {/* Section Header */}
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-serif font-bold text-3xl md:text-5xl lg:text-[60px] leading-[1.2] tracking-tight text-gray-900 mb-6">
                Questions
              </h2>
              <p className="text-base md:text-xl text-gray-600 leading-relaxed">
                Find answers to common questions about billing, plans, and your free trial.
              </p>
            </div>

            {/* FAQ Accordion */}
            <div className="max-w-3xl mx-auto w-full space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-5 md:p-6 text-left"
                  >
                    <span className="font-bold text-base md:text-xl text-gray-900">
                      {faq.question}
                    </span>
                    <svg
                      className={`w-6 h-6 text-gray-900 transition-transform ${
                        openFaq === index ? 'rotate-45' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </button>
                  {openFaq === index && (
                    <div className="px-5 md:px-6 pb-5 md:pb-6">
                      <p className="text-base text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Need More Help */}
            <div className="max-w-xl mx-auto text-center">
              <h3 className="font-serif font-bold text-2xl md:text-3xl lg:text-[40px] leading-tight text-gray-900 mb-4">
                Need more help?
              </h3>
              <p className="text-base md:text-xl text-gray-600 leading-relaxed mb-6">
                Reach out to our support team for assistance.
              </p>
              <Link href="/about">
                <Button variant="outline" className="rounded-xl">
                  Contact
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="px-5 md:px-16 py-16 md:py-28">
        <Container size="xl" className="px-0">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif font-bold text-4xl md:text-7xl lg:text-[84px] leading-[1.1] tracking-tight text-gray-900 mb-6">
              Ready to start<br />Begin learning
            </h2>
            <p className="text-base md:text-xl text-gray-600 leading-relaxed mb-10">
              Start your 14-day free trial today and unlock UK-standard education for your child or school.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="rounded-xl">
                  Start
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg" className="rounded-xl">
                  Learn
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
