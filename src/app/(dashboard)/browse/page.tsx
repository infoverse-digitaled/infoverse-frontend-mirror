'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { SubjectCard } from '@/components/lessons/SubjectCard';
import { KeyStageSelector } from '@/components/lessons';
import { useSubjects } from '@/lib/hooks/useOakData';
import { Loading } from '@/components/ui';

export default function BrowsePage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get key stage from URL params, default to 1
  const ksParam = searchParams.get('ks');
  const initialKeyStage = ksParam ? parseInt(ksParam, 10) : 1;
  const [selectedKeyStage, setSelectedKeyStage] = useState(initialKeyStage);

  // Update URL when key stage changes
  const handleKeyStageChange = (ks: number) => {
    setSelectedKeyStage(ks);
    router.replace(`/browse?ks=${ks}`, { scroll: false });
  };

  // Sync state with URL params when they change (e.g., back navigation)
  useEffect(() => {
    if (ksParam) {
      const ks = parseInt(ksParam, 10);
      if (ks >= 1 && ks <= 4 && ks !== selectedKeyStage) {
        setSelectedKeyStage(ks);
      }
    }
  }, [ksParam]);

  const {
    data: subjects,
    error,
    isLoading,
  } = useSubjects({ keyStageSlug: `ks${selectedKeyStage}` });

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-text-dark mb-1 sm:mb-2">
          Browse Curriculum
        </h1>
        <p className="text-sm sm:text-base text-gray-500">
           Explore our comprehensive collection of subjects and lessons.
        </p>
      </div>

      {/* Key Stage Selector Tabs */}
      <KeyStageSelector
        selectedKeyStage={selectedKeyStage}
        onSelect={handleKeyStageChange}
      />

      {/* Subjects Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center py-12 sm:py-20">
          <Loading size="lg" />
        </div>
      ) : error ? (
        <div className="text-center py-12 sm:py-20 px-4 bg-white rounded-xl shadow-soft border border-red-100">
          <p className="text-base sm:text-lg text-red-500 font-medium">
            Error loading subjects
          </p>
          <p className="text-gray-500 text-sm mt-1">Please try again later.</p>
        </div>
      ) : subjects && subjects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {subjects.map((subject: any) => (
              <SubjectCard
                key={subject.slug}
                subject={subject}
                keyStage={selectedKeyStage}
              />
            ))}
        </div>
      ) : (
        <div className="text-center py-12 sm:py-20 px-4 bg-white rounded-xl shadow-soft">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <p className="text-base sm:text-lg text-gray-900 font-medium">
            No subjects found
          </p>
          <p className="text-gray-500 text-sm mt-1">
             Try selecting a different Key Stage.
          </p>
        </div>
      )}
    </div>
  );
}
