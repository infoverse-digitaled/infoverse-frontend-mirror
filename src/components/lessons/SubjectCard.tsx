'use client';

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
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

// Paid subjects list
const PAID_SUBJECTS = ['german', 'french', 'spanish', 'latin'];

export function SubjectCard({ subject, keyStage }: SubjectCardProps) {
  const { user } = useAuth();
  
  // Determine if content is locked
  const isPaidSubject = PAID_SUBJECTS.includes(subject.slug.toLowerCase());
  const isLocked = isPaidSubject && user?.role === 'free'; // Assuming user object has a role

  // Placeholder icon generation based on first letter
  const firstLetter = subject.title.charAt(0).toUpperCase();

  const CardWrapper = ({ children }: { children: React.ReactNode }) => {
    const keyStageSlug = `ks${keyStage}`;
    return <Link href={`/subjects/${keyStageSlug}/${subject.slug}`} className="h-full block">{children}</Link>;
  };

  return (
    <CardWrapper>
      <Card 
        hover={true}
        className={clsx(
            "h-full flex flex-col transition-all duration-300 relative overflow-hidden group border-gray-100",
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

        <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold bg-primary/10 text-primary shadow-sm group-hover:scale-105 transition-transform duration-300">
                {firstLetter}
            </div>
            <div>
                 <CardTitle className="text-lg line-clamp-1">{subject.title}</CardTitle>
                 <span className="text-xs font-medium text-gray-500 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100">
                    KS{keyStage}
                 </span>
            </div>
        </CardHeader>

        <CardContent className="mt-2 flex-1 flex flex-col justify-between">
           {subject.description ? (
               <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                  {subject.description}
               </p>
           ) : (
                <p className="text-sm text-gray-500 italic mb-4">
                    Explore this subject to learn more.
                </p>
           )}
           
           <div className="pt-4 border-t border-gray-50 flex items-center justify-between text-xs text-gray-500 font-medium">
               <span>{subject.lessonCount ? `${subject.lessonCount} Lessons` : 'Content Available'}</span>
               <span className={clsx("flex items-center gap-1 transition-all", isLocked ? "text-secondary" : "text-primary group-hover:gap-2")}>
                   {isLocked ? "Upgrade" : "Explore"}
                   <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                   </svg>
               </span>
           </div>
        </CardContent>
      </Card>
    </CardWrapper>
  );
}
