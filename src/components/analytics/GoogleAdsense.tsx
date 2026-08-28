'use client';

import Script from 'next/script';
import { useConsent } from '@/lib/hooks/useConsent';

// Cookie consent gate: AdSense sets ad-targeting cookies, so - like
// MetaPixel - it must not load until the visitor opts into "Marketing"
// via the cookie banner. See src/lib/consent.ts.
const GoogleAdsense = () => {
  const marketingConsent = useConsent('marketing');
  if (!marketingConsent) return null;

  return (
    <Script
      async
      strategy="afterInteractive"
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9182332212235094"
      crossOrigin="anonymous"
    />
  );
};

export default GoogleAdsense;
