'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Button } from '@/components/ui';
import { TrialExpiredModal } from '@/components/subscription';

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
}

function NavItem({ href, icon, label, isActive }: NavItemProps) {
  return (
    <Link
      href={href}
      className={clsx(
        'flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all rounded-xl mx-2',
        {
          'bg-primary/5 text-primary': isActive,
          'text-gray-500 hover:bg-primary/5 hover:text-primary': !isActive,
        }
      )}
    >
      <span className={clsx("w-5 h-5", isActive ? "text-primary" : "text-gray-500")}>{icon}</span>
      {label}
    </Link>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout, loading, isTrialExpired, daysRemaining } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Calculate days overdue for the modal
  const getDaysOverdue = (): number => {
    if (!user?.subscription?.trialEndsAt) return 0;
    const trialEnd = new Date(user.subscription.trialEndsAt);
    const now = new Date();
    const diffTime = now.getTime() - trialEnd.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Determine user badge based on role (defaulting to Free if not present)
  const userRole = user.role === 'premium' ? 'Premium' : 'Free';
  const isPremium = userRole === 'Premium';

  return (
    <div className="min-h-screen bg-background-light flex">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 w-full bg-white z-50 px-4 py-3 flex items-center justify-between border-b border-gray-100 shadow-sm">
        <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
               <Image
                  src="/Transparent logo.png"
                  alt="Infoverse"
                  width={32}
                  height={32}
                  className="rounded-lg object-cover"
                />
            </div>
            <span className="font-bold text-gray-900">Infoverse</span>
        </Link>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg bg-gray-50 text-gray-600"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={clsx(
          'fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-100 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:h-screen lg:flex lg:flex-col',
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo Section */}
        <div className="h-20 flex items-center px-6 border-b border-gray-50">
          <Link href="/" className="flex items-center gap-3 group">
             <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-sm group-hover:shadow-md transition-shadow bg-primary/10">
              <Image
                src="/Transparent logo.png"
                alt="Infoverse Digital-Ed Logo"
                width={40}
                height={40}
                className="object-cover"
                priority
              />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">Infoverse</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 py-6 space-y-1 overflow-y-auto">
          <NavItem
            href="/dashboard"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            }
            label="Dashboard"
            isActive={pathname === '/dashboard'}
          />
          <NavItem
            href="/browse"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            }
            label="Browse"
            isActive={pathname?.startsWith('/browse')}
          />
          <NavItem
            href="/profile"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            }
            label="Profile"
            isActive={pathname === '/profile'}
          />
        </nav>

        {/* User Profile Snippet */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 mb-4 px-2">
             <div className="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center font-bold text-lg">
                 {user.name.charAt(0).toUpperCase()}
             </div>
             <div className="flex-1 min-w-0">
                 <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
                 <span className={clsx(
                    "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium",
                    isPremium ? "bg-primary/10 text-primary" : "bg-gray-100 text-gray-600"
                 )}>
                    {userRole} Account
                 </span>
             </div>
          </div>
          <Button
             variant="outline"
             size="sm"
             fullWidth
             onClick={() => {
                logout();
                router.push('/');
             }}
             className="text-xs h-9"
          >
             Log Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-0 pt-16 lg:pt-0 min-h-screen">
        <div className="p-6 md:p-8 max-w-7xl mx-auto">
           {children}
        </div>
      </main>
      
      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
            className="fixed inset-0 bg-black/20 z-30 lg:hidden backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Trial Expired Modal - temporarily disabled, paywall is off
      {isTrialExpired && <TrialExpiredModal daysOverdue={getDaysOverdue()} />}
      */}
    </div>
  );
}
