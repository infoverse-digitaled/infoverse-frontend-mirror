'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

export function CountdownBanner() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

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
    <div className="relative w-full bg-gradient-to-r from-blue-900 via-primary to-blue-900 text-white px-4 py-2 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 md:gap-6 shadow-md z-50">
      <div className="flex items-center gap-2 text-sm sm:text-base font-medium tracking-wide text-center">
        <span>🎓 GCSE 2026 Exams begin in:</span>
        <div className="flex items-center space-x-1 font-bold font-mono">
          <span className="bg-white/20 px-1.5 py-0.5 rounded">{String(timeLeft.days).padStart(2, '0')}d</span>
          <span className="bg-white/20 px-1.5 py-0.5 rounded">{String(timeLeft.hours).padStart(2, '0')}h</span>
          <span className="bg-white/20 px-1.5 py-0.5 rounded">{String(timeLeft.minutes).padStart(2, '0')}m</span>
          <span className="bg-white/20 px-1.5 py-0.5 rounded">{String(timeLeft.seconds).padStart(2, '0')}s</span>
        </div>
      </div>
      
      <Link 
        href="/pricing" 
        className="text-xs sm:text-sm bg-white text-primary px-3 py-1 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-sm whitespace-nowrap"
      >
        Maximize Prep Now →
      </Link>

      <button 
        onClick={() => setIsVisible(false)}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-white/70 hover:text-white transition-colors"
        aria-label="Close banner"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
