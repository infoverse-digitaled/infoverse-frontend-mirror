'use client';

import { useEffect } from 'react';
import Link from 'next/link';

import { useParams, useRouter } from 'next/navigation';
import { Card, Loading, Button } from '@/components/ui';
import { useUnit, useLessons } from '@/lib/hooks/useOakData';
import { useAuth } from '@/contexts/AuthContext';

export default function UnitPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const { isTrialExpired } = useAuth();

  const { data: unit, error: unitError, isLoading: unitLoading } = useUnit(slug);
  const { data: lessons, error: lessonsError, isLoading: lessonsLoading } = useLessons({ unitSlug: slug });

  const isLoading = unitLoading || lessonsLoading;
  const error = unitError || lessonsError;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isLoading && (error || !unit)) {
      timer = setTimeout(() => {
        router.push('/browse');
      }, 3000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isLoading, error, unit, router]);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loading size="lg" />
      </div>
    );
  }

  if (error || !unit) {
    return (
      <div className="text-center py-16 bg-white rounded-xl shadow-soft">
        <h2 className="text-2xl font-bold text-red-500 mb-4">
          Error Loading Unit
        </h2>
        <p className="text-gray-500 mb-6">
          Unable to load this unit. Redirecting you automatically...
        </p>
        <Button onClick={() => router.push('/browse')} variant="outline">
          ← Go back now
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header with Breadcrumbs and Title */}
      <Card className="p-6 md:p-8 shadow-soft">
        <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6">
          {unit.keyStageSlug && unit.subjectSlug ? (
            <Link href={`/subjects/${unit.keyStageSlug}/${unit.subjectSlug}`} className="shrink-0">
              <Button variant="outline" className="flex items-center gap-2 w-full md:w-auto justify-center">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Subject
              </Button>
            </Link>
          ) : (
            <Button variant="outline" onClick={() => router.push('/browse')} className="shrink-0 flex items-center gap-2 w-full md:w-auto justify-center">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Browse
            </Button>
          )}
          <div className="flex-1 mt-2 md:mt-0">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Unit {unit.unitNumber}: {unit.title}
            </h1>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <span>{unit.subjectTitle}</span>
              {unit.yearTitle && (
                <>
                  <span className="text-gray-300">•</span>
                  <span>{unit.yearTitle}</span>
                </>
              )}
              <span className="text-gray-300">•</span>
              <span>{unit.numberOfLessons} Lessons</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Lessons List */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-soft overflow-hidden">
        {/* Section header */}
        <div className="px-6 md:px-8 py-5 border-b border-gray-100 flex items-center justify-between flex-wrap gap-3">
          <h2 className="text-lg md:text-xl font-bold text-gray-900">Lessons in this Unit</h2>
          {lessons && lessons.length > 0 && (
            <span className="text-sm font-medium text-gray-400 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
              {lessons.length} lesson{lessons.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        <div className="p-4 sm:p-6 md:p-8">
          {lessons && lessons.length > 0 ? (
            <div className="flex flex-col gap-3">
              {lessons
                .sort((a, b) => a.lessonNumber - b.lessonNumber)
                .map((lesson) => {
                  const handleLessonClick = (e: React.MouseEvent) => {
                    if (isTrialExpired) {
                      e.preventDefault();
                      window.dispatchEvent(new Event('show-paywall'));
                    }
                  };

                  return (
                    <Link 
                      key={lesson.slug} 
                      href={`/lessons/${lesson.slug}`} 
                      onClick={handleLessonClick}
                      className="block group"
                    >
                      <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 rounded-xl border border-gray-100 bg-gray-50/60 hover:bg-white hover:border-primary/30 hover:shadow-md transition-all duration-200">
                        <div className="flex items-center gap-4 sm:gap-5 flex-1 min-w-0">
                          {/* Lesson number badge */}
                          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-sm font-bold shrink-0">
                          {lesson.lessonNumber}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-1">
                            {lesson.title}
                          </h3>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 text-gray-400 group-hover:text-primary transition-colors">
                        <span className="text-sm font-medium hidden sm:block">Start Lesson</span>
                        <svg className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          {isTrialExpired ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          )}
                        </svg>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <p className="text-base font-medium text-gray-500">No lessons found for this unit yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}