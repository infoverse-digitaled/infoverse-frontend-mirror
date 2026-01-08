'use client';

import { ReactNode } from 'react';

interface VisuallyHiddenProps {
  children: ReactNode;
  /** When true, content becomes visible on focus (useful for skip links) */
  focusable?: boolean;
}

/**
 * Visually hides content while keeping it accessible to screen readers.
 * Use for skip links, hidden labels, or additional screen reader context.
 */
export function VisuallyHidden({ children, focusable = false }: VisuallyHiddenProps) {
  if (focusable) {
    return (
      <span className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
        {children}
      </span>
    );
  }

  return <span className="sr-only">{children}</span>;
}

export default VisuallyHidden;
