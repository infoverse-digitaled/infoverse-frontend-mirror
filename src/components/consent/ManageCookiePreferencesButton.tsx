'use client';

import { Button, ButtonProps } from '@/components/ui';
import { openCookiePreferences } from '@/lib/consent';

/** Reopens the cookie consent banner (rendered in the root layout) from anywhere, e.g. the /cookies page. */
export function ManageCookiePreferencesButton(props: Omit<ButtonProps, 'onClick' | 'children'>) {
  return (
    <Button type="button" onClick={openCookiePreferences} {...props}>
      Manage cookie preferences
    </Button>
  );
}
