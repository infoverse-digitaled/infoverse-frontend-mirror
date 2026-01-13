'use client';

import { usePathname } from 'next/navigation';
import { Header } from './Header';
import { Footer } from './Footer';
import { TrialExpiredModal } from '@/components/modals/TrialExpiredModal';

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

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
    </>
  );
}
