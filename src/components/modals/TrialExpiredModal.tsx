'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui';

export function TrialExpiredModal() {
  const { user, isTrialExpired, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Show modal if user is logged in and trial is expired
    // But NOT on the pricing page (so they can complete payment)
    if (user && isTrialExpired && pathname !== '/pricing') {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [user, isTrialExpired, pathname]);

  const handleViewPlans = () => {
    setIsOpen(false);
    router.push('/pricing');
  };

  const handleLogout = async () => {
    setIsOpen(false);
    await logout();
    router.push('/');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-8 animate-in fade-in zoom-in duration-300">
        {/* Warning Icon */}
        <div className="w-16 h-16 mx-auto mb-6 bg-amber-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">
          Your Free Trial Has Ended
        </h2>

        <p className="text-gray-600 text-center mb-6">
          Your 14-day free trial has expired. To continue accessing all features and lessons, please subscribe to a plan.
        </p>

        <div className="space-y-3">
          <Button onClick={handleViewPlans} fullWidth size="lg" className="shadow-lg">
            View Subscription Plans
          </Button>

          <Button onClick={handleLogout} variant="outline" fullWidth size="lg">
            Logout
          </Button>
        </div>

        {/* Features reminder */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <p className="text-sm font-medium text-gray-700 mb-3">With a subscription you get:</p>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Access to all subjects and lessons
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Track your progress
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
