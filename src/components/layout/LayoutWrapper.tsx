'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { TrialExpiredModal } from '@/components/modals/TrialExpiredModal';
import { BugReportButton } from '@/components/modals/BugReportButton';
import { BugReportModal } from '@/components/modals/BugReportModal';
import { useFeedbackTimer } from '@/lib/hooks/useFeedbackTimer';
import { useAuth } from '@/contexts/AuthContext';
import { CountdownBanner } from './CountdownBanner';

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuth();
  const { shouldShowFeedback, dismissFeedback } = useFeedbackTimer();

  // Don't show Header/Footer on auth pages
  const authPaths = ['/login', '/register', '/onboarding', '/forgot-password', '/reset-password', '/auth/callback', '/welcome'];
  const isAuthPage = authPaths.some(path => pathname === path || pathname?.startsWith(path + '/'));

  if (isAuthPage) {
    return (
      <>
        {children}
        <TrialExpiredModal />
      </>
    );
  }

  return (
    <>
      <Header />
      <CountdownBanner/>
      <main className="flex-grow">{children}</main>
      <Footer />
      <TrialExpiredModal />
      <BugReportButton />
      <BugReportModal isOpen={shouldShowFeedback} onClose={dismissFeedback} />
    </>
  );
}
