import type { Metadata } from 'next';
import { Inter, Fraunces } from 'next/font/google';
import './globals.css';
// KaTeX CSS for rendering LaTeX math in quizzes
import 'katex/dist/katex.min.css';
import { LayoutWrapper } from '@/components/layout';
import { AuthProvider } from '@/contexts/AuthContext';
import { GlobalChatbot } from '@/components/ai';
import { TrialBanner } from '@/components/TrialBanner';

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
        <AuthProvider>
          <TrialBanner />
          <LayoutWrapper>{children}</LayoutWrapper>
          <GlobalChatbot />
        </AuthProvider>
      </body>
    </html>
  );
}
