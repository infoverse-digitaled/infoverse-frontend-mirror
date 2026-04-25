'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export function CountdownBanner() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  // Check if we are on a dashboard view that has a fixed mobile top navbar
  const hasSidebarNav = pathname?.startsWith('/dashboard') || 
    pathname?.startsWith('/browse') || 
    pathname?.startsWith('/profile');

  useEffect(() => {
    setIsMounted(true);
    // Target date: May 4, 2026 at 9:00 AM (local time)
    // Adjust the year as necessary
    const targetDate = new Date('2026-05-04T09:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsVisible(false); // Hide the banner if the date has passed
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!isMounted || !isVisible) return null;

  return (
    <div 
      className={cn(
        "relative w-full bg-gradient-to-r from-blue-900 via-primary to-blue-900 text-white shadow-md z-40 pt-[env(safe-area-inset-top)]",
        // If we have a sidebar nav, its mobile header is fixed height ~56px.
        // We push the banner down on mobile so it isn't hidden under the mobile navbar.
        hasSidebarNav && "mt-[56px] lg:mt-0"
      )}
    >
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 px-4 sm:px-8 pt-3 pb-3 sm:py-2">
        {/* Label + timer on one line for mobile */}
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1.5 text-xs sm:text-sm font-medium tracking-wide text-center">
          <span className="whitespace-nowrap">🎓 GCSE 2026 Exams begin in:</span>
          <div className="flex items-center gap-1 font-bold font-mono">
            <span className="bg-white/20 px-1.5 py-0.5 rounded flex items-center justify-center min-w-[32px] sm:min-w-0">
              {String(timeLeft.days).padStart(2, '0')}d
            </span>
            <span className="bg-white/20 px-1.5 py-0.5 rounded flex items-center justify-center min-w-[32px] sm:min-w-0">
              {String(timeLeft.hours).padStart(2, '0')}h
            </span>
            <span className="bg-white/20 px-1.5 py-0.5 rounded flex items-center justify-center min-w-[32px] sm:min-w-0">
              {String(timeLeft.minutes).padStart(2, '0')}m
            </span>
            <span className="bg-white/20 px-1.5 py-0.5 rounded flex items-center justify-center min-w-[32px] sm:min-w-0">
              {String(timeLeft.seconds).padStart(2, '0')}s
            </span>
          </div>
        </div>

        <Link
          href="/pricing"
          className="text-xs bg-white text-primary px-4 py-1.5 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-sm whitespace-nowrap mt-1 sm:mt-0"
        >
          Prep Now →
        </Link>
      </div>

      {/* Close button — vertically centered, avoiding notch padding */}
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-2 top-1/2 -translate-y-1/2 mt-[calc(env(safe-area-inset-top)/2)] p-2 text-white/70 hover:text-white transition-colors"
        aria-label="Close banner"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
