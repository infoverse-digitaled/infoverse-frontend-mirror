'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils/cn';
import { useAuth } from '@/contexts/AuthContext';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const publicNavLinks = [
    { href: '/', label: 'Home', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )},
    { href: '/key-stages', label: 'Learn', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    )},
    { href: '/pricing', label: 'Pricing', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )},
    { href: '/about', label: 'About', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )},
    { href: '/contact', label: 'Contact', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )},
  ];

  const authenticatedNavLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    )},
    { href: '/browse', label: 'Browse', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    )},
    { href: '/profile', label: 'Profile', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )},
  ];

  const navLinks = user ? authenticatedNavLinks : publicNavLinks;

  return (
    <>
      {/* Floating Bottom Navigation Bar */}
      <header
        className={cn(
          'fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500',
          scrolled ? 'scale-90' : 'scale-100'
        )}
      >
        {/* Main Navigation Pill */}
        <nav
          className={cn(
            'flex items-center gap-1 px-3 py-2 rounded-full bg-white/95 backdrop-blur-xl shadow-2xl shadow-black/20 border border-gray-200/50 transition-all duration-500',
            scrolled ? 'px-2 py-1.5' : 'px-3 py-2'
          )}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 px-3 group">
            <div className={cn(
              'relative rounded-xl overflow-hidden shadow-lg group-hover:shadow-xl group-hover:shadow-primary/20 transition-all duration-300 group-hover:scale-105',
              scrolled ? 'w-8 h-8' : 'w-10 h-10'
            )}>
              <Image
                src="/Transparent logo.png"
                alt="Infoverse Logo"
                width={40}
                height={40}
                className="object-cover"
                priority
              />
            </div>
            <span className={cn(
              'font-bold tracking-tight bg-gradient-to-r from-gray-900 via-primary to-gray-900 bg-clip-text text-transparent hidden md:block transition-all duration-300',
              scrolled ? 'text-base' : 'text-lg'
            )}>
              Infoverse
            </span>
          </Link>

          {/* Divider */}
          <div className="w-px h-6 bg-gray-200 mx-1 hidden md:block" />

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-primary transition-all duration-300 font-medium rounded-full hover:bg-primary/10 group',
                  scrolled ? 'px-3 py-1.5 text-sm' : 'px-4 py-2 text-sm'
                )}
              >
                <span className="text-gray-400 group-hover:text-primary transition-colors">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div className="w-px h-6 bg-gray-200 mx-1 hidden md:block" />

          {/* CTA / User Section */}
          {!user ? (
            <div className="hidden md:flex items-center gap-2">
              <Link href="/login">
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    'rounded-full hover:shadow-lg hover:shadow-primary/10 transition-all duration-300',
                    scrolled ? 'px-4 py-1 text-xs' : 'px-5 py-1.5'
                  )}
                >
                  Login
                </Button>
              </Link>
              <Link href="/pricing">
                <Button
                  variant="primary"
                  size="sm"
                  className={cn(
                    'rounded-full shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 relative overflow-hidden group',
                    scrolled ? 'px-4 py-1 text-xs' : 'px-6 py-1.5'
                  )}
                >
                  <span className="relative z-10">Get Started</span>
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <div className={cn(
                'rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold shadow-lg',
                scrolled ? 'w-7 h-7 text-xs' : 'w-9 h-9 text-sm'
              )}>
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  'rounded-full hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors',
                  scrolled ? 'px-3 py-1 text-xs' : 'px-4 py-1.5'
                )}
                onClick={logout}
              >
                Logout
              </Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className={cn(
              'md:hidden relative flex items-center justify-center text-gray-600 hover:text-primary transition-colors rounded-full hover:bg-primary/10',
              scrolled ? 'w-8 h-8' : 'w-10 h-10'
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <div className="w-5 flex flex-col gap-1 items-center">
              <span
                className={cn(
                  'w-5 h-0.5 bg-current rounded-full transition-all duration-300',
                  isMobileMenuOpen && 'rotate-45 translate-y-1.5'
                )}
              />
              <span
                className={cn(
                  'w-3 h-0.5 bg-current rounded-full transition-all duration-300',
                  isMobileMenuOpen && 'opacity-0 scale-0'
                )}
              />
              <span
                className={cn(
                  'w-5 h-0.5 bg-current rounded-full transition-all duration-300',
                  isMobileMenuOpen && '-rotate-45 -translate-y-1.5'
                )}
              />
            </div>
          </button>
        </nav>

        {/* Mobile Menu Dropdown (slides up) */}
        <div
          className={cn(
            'md:hidden absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-[calc(100vw-48px)] max-w-sm transition-all duration-300 transform',
            isMobileMenuOpen
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 translate-y-4 pointer-events-none'
          )}
        >
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 p-4">
            {/* Mobile Nav Links */}
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-primary rounded-xl hover:bg-primary/10 transition-all duration-300 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="text-gray-400">{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-200 my-3" />

            {/* Mobile CTA / User Section */}
            {!user ? (
              <div className="flex flex-col gap-2">
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button fullWidth variant="outline" className="rounded-xl">
                    Login
                  </Button>
                </Link>
                <Link href="/pricing" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button fullWidth variant="primary" className="rounded-xl shadow-lg shadow-primary/30">
                    Get Started Free
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 px-4 py-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold shadow-lg">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-500">Logged in</p>
                  </div>
                </div>
                <Button
                  fullWidth
                  variant="outline"
                  className="rounded-xl hover:bg-red-50 hover:border-red-200 hover:text-red-600"
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};
