'use client';

import React from 'react';

/**
 * Full-screen overlay shown while the backend initialises a Paystack payment
 * and the browser is about to navigate to the Paystack checkout page.
 *
 * Rendered at the root of each pricing page so it sits above every element.
 * Pointer-events are blocked on the overlay itself, preventing any interaction.
 */
export const PaymentRedirectOverlay: React.FC = () => (
  <div
    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm"
    aria-live="assertive"
    aria-label="Redirecting to payment"
    // Prevent any click-through
    onClick={(e) => e.stopPropagation()}
    onKeyDown={(e) => e.stopPropagation()}
  >
    {/* Animated ring */}
    <div className="relative w-20 h-20 mb-6">
      {/* Outer pulse ring */}
      <span className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
      {/* Spinner */}
      <span className="relative flex w-20 h-20 items-center justify-center rounded-full bg-white shadow-lg">
        <svg
          className="w-10 h-10 animate-spin text-primary"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            className="opacity-90"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      </span>
    </div>

    <p className="text-lg font-semibold text-gray-900 mb-1">
      Redirecting to payment…
    </p>
    <p className="text-sm text-gray-500">
      Please wait, do not close or refresh this page.
    </p>
  </div>
);
