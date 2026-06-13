'use client';

import { useState, useEffect } from 'react';

export default function CyclingHeadline() {
  const endings = [
    "We're changing that.",
    "The future shouldn't depend on location.",
    "World-class learning to every child.",
    "Every potential deserves opportunity.",
    "Brighter futures through better learning.",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % endings.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <h1 className="font-serif font-bold text-3xl md:text-7xl lg:text-[90px] leading-[1.05] tracking-tight text-white mb-8 animate-slide-up delay-100">
      Talent is everywhere. Access to quality learning is not.{' '}
      <span className="relative inline-block">
        <span className="relative z-10 text-5xl text-gradient transition-opacity duration-500">
          {endings[currentIndex]}
        </span>
        <span className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-primary/50 to-secondary/50 blur-xl" />
      </span>
    </h1>
  );
}
