'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { useEffect, Suspense } from 'react';
import { useConsent } from '@/lib/hooks/useConsent';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

// MetaPixelInner component to handle the tracking logic with useSearchParams (which requires Suspense)
function MetaPixelInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Only run if fbq is defined (it's initialized by the script)
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'PageView');
    }
  }, [pathname, searchParams]);

  return (
    <>
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '971526668682151');
            fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src="https://www.facebook.com/tr?id=971526668682151&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>
    </>
  );
}

const MetaPixel = () => {
  // Cookie consent gate: the pixel script (and the cookies/local storage it
  // sets) must not load until the visitor has actively opted into
  // "Marketing" via the cookie banner. See src/lib/consent.ts.
  //
  // Note: if consent is later withdrawn after being granted, this stops
  // further PageView tracking (MetaPixelInner unmounts), but the
  // fbevents.js script and any cookies it already set before withdrawal
  // are outside our control to remove - Meta doesn't expose a JS API for
  // that. The fix is not loading it until consent is given in the first
  // place, which this does.
  const marketingConsent = useConsent('marketing');
  if (!marketingConsent) return null;

  return (
    <Suspense fallback={null}>
      <MetaPixelInner />
    </Suspense>
  );
};

export default MetaPixel;
