'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui';

export default function SubscriptionExpiredPage() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-amber-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h1 className="font-serif font-bold text-3xl text-gray-900 mb-3">
          Your access has expired
        </h1>

        {/* Message */}
        <p className="text-gray-600 text-base leading-relaxed mb-2">
          {user?.name ? `Hi ${user.name.split(' ')[0]}, your` : 'Your'} school subscription has
          lapsed or has not yet been renewed.
        </p>
        <p className="text-gray-600 text-base leading-relaxed mb-8">
          Please contact your <span className="font-semibold text-gray-900">school administrator</span> to
          restore access. You do not need to take any payment action — your admin manages the
          subscription on behalf of your school.
        </p>

        {/* School info if available */}
        {(user as any)?.schoolName && (
          <div className="bg-white border border-gray-200 rounded-xl px-5 py-4 mb-8 text-left">
            <p className="text-sm text-gray-500 mb-1">Registered school</p>
            <p className="font-semibold text-gray-900">{(user as any).schoolName}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Link href="/dashboard">
            <Button fullWidth className="rounded-xl">
              Back to dashboard
            </Button>
          </Link>
          <button
            onClick={logout}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
