'use client';

import { useState } from 'react';
import { SubjectCard } from '@/components/lessons/SubjectCard';
import { useSubjects } from '@/lib/hooks/useOakData';
import { Loading } from '@/components/ui';
import clsx from 'clsx';

export default function BrowsePage() {
  const [selectedKeyStage, setSelectedKeyStage] = useState(1);

  const {
    data: subjects,
    error,
    isLoading,
  } = useSubjects({ keyStageSlug: `ks${selectedKeyStage}` });

  const keyStages = [
      { id: 1, label: 'Key Stage 1' },
      { id: 2, label: 'Key Stage 2' },
      { id: 3, label: 'Key Stage 3' },
      { id: 4, label: 'Key Stage 4' },
  ];

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
      <div className="bg-white p-1 sm:p-1.5 rounded-xl shadow-soft flex sm:inline-flex overflow-x-auto max-w-full gap-0.5 sm:gap-1">
         {keyStages.map((ks) => (
             <button
                key={ks.id}
                onClick={() => setSelectedKeyStage(ks.id)}
                className={clsx(
                    "flex-1 sm:flex-none px-3 sm:px-6 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap",
                    selectedKeyStage === ks.id
                        ? "bg-primary text-white shadow-md"
                        : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                )}
             >
                <span className="hidden sm:inline">{ks.label}</span>
                <span className="sm:hidden">KS{ks.id}</span>
             </button>
         ))}
      </div>

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
          <p className="text-gray-400 text-sm mt-1">Please try again later.</p>
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
