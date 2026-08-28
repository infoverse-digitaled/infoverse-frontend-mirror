import type { Metadata } from 'next';
import { Inter, Fraunces } from 'next/font/google';
import './globals.css';
// KaTeX CSS for rendering LaTeX math in quizzes
import 'katex/dist/katex.min.css';
import { LayoutWrapper } from '@/components/layout';
import { AuthProvider } from '@/contexts/AuthContext';
import { AIProvider } from '@/contexts/AIContext';
import { GlobalChatbot } from '@/components/ai';
import { PostHogProvider } from './providers';
import MetaPixel from '@/components/analytics/MetaPixel';
import GoogleAdsense from '@/components/analytics/GoogleAdsense';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { CookieConsentBanner } from '@/components/consent/CookieConsentBanner';

// Skip Navigation Component for accessibility
function SkipNavigation() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
    >
      Skip to main content
    </a>
  );
}

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Infoverse Digital-Ed | Educational Platform',
  description:
    'Access quality educational content for Key Stages 1-4. Explore subjects, units, and lessons aligned with the UK curriculum, crafted by educators with 50+ years of experience.',
  keywords: [
    'education',
    'Infoverse',
    'Key Stages',
    'UK curriculum',
    'learning',
    'lessons',
    'online learning',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${fraunces.variable} antialiased flex flex-col min-h-screen bg-blue-50`}
        suppressHydrationWarning
      >
        <PostHogProvider>
          <MetaPixel />
          <GoogleAdsense />
          {/*
            Google Identity Services (Sign in with Google) is treated as
            strictly necessary and left ungated by cookie consent: it's a
            login mechanism the user explicitly invokes on /login and
            /register, not passive tracking, and gating it could break
            authentication for those users. See src/lib/consent.ts.
          */}
          <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}>
            <AuthProvider>
              <AIProvider>
                <SkipNavigation />
                <LayoutWrapper>
                  <main id="main-content" tabIndex={-1}>
                    {children}
                  </main>
                </LayoutWrapper>
                <GlobalChatbot />
              </AIProvider>
            </AuthProvider>
          </GoogleOAuthProvider>
        </PostHogProvider>
        <CookieConsentBanner />
      </body>
    </html>
  );
}
