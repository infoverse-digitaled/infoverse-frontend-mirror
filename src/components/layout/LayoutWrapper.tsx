'use client';

import { usePathname } from 'next/navigation';
import { Header } from './Header';
import { Footer } from './Footer';
import { TrialExpiredModal } from '@/components/modals/TrialExpiredModal';
import { BugReportButton } from '@/components/modals/BugReportButton';
import { BugReportModal } from '@/components/modals/BugReportModal';
import { useFeedbackTimer } from '@/lib/hooks/useFeedbackTimer';

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { shouldShowFeedback, dismissFeedback } = useFeedbackTimer();

  // Don't show Header/Footer on auth pages
  const isAuthPage =
    pathname?.startsWith('/login') || pathname?.startsWith('/register');

  // Always render the trial expired modal
  const trialModal = <TrialExpiredModal />;

  if (isAuthPage) {
    return (
      <>
        {children}
        {trialModal}
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
      {trialModal}
      <BugReportButton />
      <BugReportModal isOpen={shouldShowFeedback} onClose={dismissFeedback} />
    </>
  );
}
