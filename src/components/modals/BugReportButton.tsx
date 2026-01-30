'use client';

import { useState } from 'react';
import BugReportModal from './BugReportModal';

export function BugReportButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Action Button - bottom-left */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95 group"
        style={{
          background: 'linear-gradient(135deg, #f97316 0%, #ef4444 100%)',
        }}
        aria-label="Report a Bug / Give Feedback"
      >
        <svg
          className="w-7 h-7 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        {/* Tooltip */}
        <span className="absolute left-full ml-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Report a Bug / Give Feedback
        </span>
      </button>

      {/* Modal */}
      <BugReportModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

export default BugReportButton;
