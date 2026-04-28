'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card } from '@/components/ui';
import { useAuth } from '@/contexts/AuthContext';
import { CheckCircle2 } from 'lucide-react';

export default function WelcomePage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect if not logged in (e.g., someone navigated here directly without registering)
  useEffect(() => {
    if (!loading && !user && mounted) {
      router.push('/login');
    }
  }, [user, loading, router, mounted]);

  if (!mounted || loading || !user) {
    return (
      <div className="flex justify-center items-center w-full min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center w-full">
      <Card className="w-full max-w-md shadow-xl bg-white p-8 sm:p-10 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-bounce" style={{ animationIterationCount: 1 }}>
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome to Infoverse!
        </h1>
        
        <p className="text-gray-500 mb-8 leading-relaxed">
          Hi {user.name.split(' ')[0]}, your account has been successfully created. We're excited to have you on board! Get ready to explore personalized learning, track your progress, and excel in your studies.
        </p>

        <div className="space-y-4">
          <Button 
            onClick={() => router.push('/dashboard')} 
            fullWidth 
            size="lg"
            className="text-lg font-semibold shadow-md hover:shadow-lg transition-all"
          >
            Continue to Dashboard
          </Button>
        </div>
      </Card>
    </div>
  );
}
