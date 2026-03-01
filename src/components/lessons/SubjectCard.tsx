'use client';

import Link from 'next/link';
import { Card } from '@/components/ui';
import { useAuth } from '@/contexts/AuthContext';
import clsx from 'clsx';

interface SubjectCardProps {
  subject: {
    slug: string;
    title: string;
    description?: string;
    lessonCount?: number;
  };
  keyStage: number;
}

// Subject icon component with gradient
const SubjectIcon = ({ title }: { title: string }) => {
  const getIconAndColor = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('math')) {
      return { icon: '∑', gradient: 'from-blue-500 to-indigo-600' };
    } else if (lowerTitle.includes('english') || lowerTitle.includes('literacy')) {
      return { icon: '📖', gradient: 'from-emerald-500 to-teal-600' };
    } else if (lowerTitle.includes('science')) {
      return { icon: '🔬', gradient: 'from-purple-500 to-pink-600' };
    } else if (lowerTitle.includes('history')) {
      return { icon: '📜', gradient: 'from-amber-500 to-orange-600' };
    } else if (lowerTitle.includes('geography')) {
      return { icon: '🌍', gradient: 'from-cyan-500 to-blue-600' };
    } else if (lowerTitle.includes('art')) {
      return { icon: '🎨', gradient: 'from-pink-500 to-rose-600' };
    } else if (lowerTitle.includes('music')) {
      return { icon: '🎵', gradient: 'from-violet-500 to-purple-600' };
    } else if (lowerTitle.includes('computing') || lowerTitle.includes('computer')) {
      return { icon: '💻', gradient: 'from-slate-500 to-gray-700' };
    } else if (lowerTitle.includes('language') || lowerTitle.includes('french') || lowerTitle.includes('spanish') || lowerTitle.includes('german') || lowerTitle.includes('latin')) {
      return { icon: '🗣️', gradient: 'from-red-500 to-orange-600' };
    } else if (lowerTitle.includes('pe') || lowerTitle.includes('physical')) {
      return { icon: '⚽', gradient: 'from-green-500 to-emerald-600' };
    } else {
      return { icon: '📚', gradient: 'from-primary to-secondary' };
    }
  };

  const { icon, gradient } = getIconAndColor(title);

  return (
    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-2xl shadow-lg mb-4 transform group-hover:scale-110 transition-transform duration-300 text-white`}>
      <span className="drop-shadow-sm">{icon}</span>
    </div>
  );
};

// Paid subjects list
const PAID_SUBJECTS = ['german', 'french', 'spanish', 'latin'];

export function SubjectCard({ subject, keyStage }: SubjectCardProps) {
  const { user } = useAuth();
  
  // Determine if content is locked
  const isPaidSubject = PAID_SUBJECTS.includes(subject.slug.toLowerCase());
  const isLocked = isPaidSubject && user?.role === 'free'; // Assuming user object has a role

  const keyStageSlug = `ks${keyStage}`;

  return (
    <Link href={`/subjects/${keyStageSlug}/${subject.slug}`} className="block h-full group animate-slide-up">
      <Card 
        hover={true}
        className={clsx(
            "h-full flex flex-col transition-all duration-300 relative overflow-hidden group border-gray-100 p-8 rounded-2xl bg-white",
            isLocked && "opacity-90"
        )}
      >
        {isLocked && (
            <>
                <div className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm text-secondary">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>
                <div className="absolute top-4 right-14 z-10 px-2 py-1 bg-secondary text-white text-[10px] font-bold uppercase tracking-wider rounded-md shadow-sm">
                    Premium Only
                </div>
            </>
        )}

        <div className="relative z-10 flex flex-col h-full">
            {/* Subject Icon */}
            <SubjectIcon title={subject.title} />

            {/* Subject Title */}
            <div className="flex items-center gap-3 mb-3">
                <h3 className="font-serif font-bold text-xl md:text-2xl leading-tight text-gray-900 group-hover:text-primary transition-colors duration-300">
                    {subject.title}
                </h3>
                <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                    KS{keyStage}
                </span>
            </div>

            {/* Description */}
            <p className="text-base text-gray-600 leading-relaxed mb-6 flex-grow">
                {subject.description || `Explore units and lessons for ${subject.title}`}
            </p>

            {/* Footer / CTA */}
            <div className="flex items-center justify-between mt-auto">
                <div className="inline-flex items-center gap-2 font-medium text-gray-900 group-hover:text-primary transition-colors duration-300">
                {isLocked ? 'Upgrade to view' : 'View units'}
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                </div>
            </div>
        </div>
      </Card>
    </Link>
  );
}

