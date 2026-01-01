'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container, Button } from '@/components/ui';
import { apiClient } from '@/lib/api/client';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeMessage, setSubscribeMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubscribing(true);
    setSubscribeMessage(null);

    try {
      await apiClient.post('/public/subscribe', { email });
      setSubscribeMessage({ type: 'success', text: 'Successfully subscribed!' });
      setEmail('');
    } catch (error: any) {
      const errorMsg = error.response?.data?.error || 'Failed to subscribe. Please try again.';
      setSubscribeMessage({ type: 'error', text: errorMsg });
    } finally {
      setIsSubscribing(false);
    }
  };

  const footerLinks = {
    product: [
      { href: '/key-stages', label: 'Browse Lessons' },
      { href: '/pricing', label: 'Pricing' },
      { href: '/nurtured', label: 'For Schools' },
      { href: '/about', label: 'About Us' },
    ],
    resources: [
      { href: '/blog', label: 'Blog' },
      { href: '/contact', label: 'Contact' },
      { href: '/about', label: 'Our Story' },
    ],
    legal: [
      { href: '/terms', label: 'Terms of Service' },
      { href: '/privacy', label: 'Privacy Policy' },
      { href: '/cookies', label: 'Cookie Policy' },
    ],
  };

  const socialLinks = [
    {
      href: 'https://www.linkedin.com/company/infoversedigital-ed/',
      label: 'LinkedIn',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
        </svg>
      ),
    },
    {
      href: 'https://www.instagram.com/infoverse.digitaled/',
      label: 'Instagram',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="relative mt-auto overflow-hidden pb-24 md:pb-20">
      {/* Gradient background with mesh effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-background-dark to-gray-900" />

      {/* Animated decorative blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-blob" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[100px] animate-blob delay-1000" />
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] animate-float-slow" />

      <div className="relative">
        {/* Newsletter Section */}
        <div className="border-b border-white/10">
          <Container>
            <div className="py-16 md:py-20">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="font-serif font-bold text-3xl md:text-5xl text-white mb-4 animate-slide-up">
                  Stay ahead of the curve
                </h2>
                <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto animate-slide-up delay-100">
                  Subscribe to our newsletter for the latest educational resources, tips, and updates.
                </p>
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto animate-slide-up delay-200">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-5 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    required
                  />
                  <Button
                    type="submit"
                    isLoading={isSubscribing}
                    className="rounded-xl px-8 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 transition-all whitespace-nowrap"
                  >
                    Subscribe
                  </Button>
                </form>
                {subscribeMessage && (
                  <p className={`mt-3 text-sm ${subscribeMessage.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                    {subscribeMessage.text}
                  </p>
                )}
              </div>
            </div>
          </Container>
        </div>

        {/* Main Footer Content */}
        <Container>
          <div className="py-16 md:py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
              {/* Brand Column */}
              <div className="lg:col-span-2">
                <Link href="/" className="inline-flex items-center gap-3 group mb-6">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-lg group-hover:shadow-primary/30 transition-shadow">
                    <Image
                      src="/Transparent logo.png"
                      alt="Infoverse Logo"
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <span className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
                    Infoverse
                  </span>
                </Link>
                <p className="text-white/60 leading-relaxed mb-6 max-w-sm">
                  Empowering students with UK-standard curriculum content. Quality educational resources crafted by experienced educators.
                </p>
                {/* Social Links */}
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white/60 hover:bg-primary hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/30"
                      aria-label={social.label}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Product Links */}
              <div>
                <h3 className="font-semibold text-white mb-5 text-sm uppercase tracking-wider">
                  Product
                </h3>
                <ul className="space-y-3">
                  {footerLinks.product.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-white/60 hover:text-white transition-colors duration-200 inline-flex items-center gap-1 group"
                      >
                        <span>{link.label}</span>
                        <svg
                          className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources Links */}
              <div>
                <h3 className="font-semibold text-white mb-5 text-sm uppercase tracking-wider">
                  Resources
                </h3>
                <ul className="space-y-3">
                  {footerLinks.resources.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-white/60 hover:text-white transition-colors duration-200 inline-flex items-center gap-1 group"
                      >
                        <span>{link.label}</span>
                        <svg
                          className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal Links */}
              <div>
                <h3 className="font-semibold text-white mb-5 text-sm uppercase tracking-wider">
                  Legal
                </h3>
                <ul className="space-y-3">
                  {footerLinks.legal.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-white/60 hover:text-white transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <Container>
            <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-white/50 text-sm">
                &copy; {currentYear} Infoverse Digital-Ed. All rights reserved.
              </p>
              <div className="flex items-center gap-1.5 text-xs text-white/30">
                <span>Content powered by</span>
                <a
                  href="https://www.thenational.academy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-white/60 transition-colors"
                >
                  Oak National Academy
                </a>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </footer>
  );
};
