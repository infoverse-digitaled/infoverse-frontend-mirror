'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardTitle, Loading, Button } from '@/components/ui';
import { useSubjects, useUnits, useMyProgress, useEnroll } from '@/lib/hooks/useOakData';
import { useAuth } from '@/contexts/AuthContext';

const UNITS_PER_PAGE = 5;

export default function SubjectPage() {
  const params = useParams();
  const router = useRouter();
  const keyStage = params.keyStage as string;
  const slug = params.slug as string;
  const { user } = useAuth();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  // Tier selection state for KS4 subjects
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  // Enrollment hooks
  const { data: myProgress } = useMyProgress();
  const { enroll, isEnrolling, error: enrollError } = useEnroll();
  const [enrollSuccess, setEnrollSuccess] = useState(false);

  // Fetch subjects for this keyStage to get subject details
  const { data: subjects, error: subjectsError, isLoading: subjectsLoading } = useSubjects({ keyStageSlug: keyStage });
  const { data: units, error: unitsError, isLoading: unitsLoading } = useUnits({ keyStageSlug: keyStage, subjectSlug: slug });

  // Find the specific subject from the subjects list
  const subject = subjects?.find(s => s.slug === slug);

  // Check if this is a KS4 tiered subject
  const isKs4Maths = keyStage === 'ks4' && slug === 'maths';
  const isKs4Science = keyStage === 'ks4' && slug === 'science';
  const isKs4TieredSubject = isKs4Maths || isKs4Science;

  // Exam subject selection state for KS4 Science
  const [selectedExamSubject, setSelectedExamSubject] = useState<string | null>(null);

  // Get available exam subjects from units (for Science)
  const availableExamSubjects = useMemo(() => {
    if (!units || !isKs4Science) return [];
    const examSubjects = new Map<string, { slug: string; title: string; count: number }>();
    units.forEach(unit => {
      if (unit.examSubject && unit.examSubjectTitle) {
        const existing = examSubjects.get(unit.examSubject);
        if (existing) {
          existing.count++;
        } else {
          examSubjects.set(unit.examSubject, { slug: unit.examSubject, title: unit.examSubjectTitle, count: 1 });
        }
      }
    });
    // Sort: Combined Science first, then alphabetically
    return Array.from(examSubjects.values()).sort((a, b) => {
      if (a.slug === 'combined-science') return -1;
      if (b.slug === 'combined-science') return 1;
      return a.title.localeCompare(b.title);
    });
  }, [units, isKs4Science]);

  // Get available tiers from units (filtered by exam subject for Science)
  const availableTiers = useMemo(() => {
    if (!units || !isKs4TieredSubject) return [];
    // For Science, only show tiers for the selected exam subject
    const filteredUnits = isKs4Science && selectedExamSubject
      ? units.filter(u => u.examSubject === selectedExamSubject)
      : units;

    const tiers = new Map<string, { slug: string; title: string; count: number }>();
    filteredUnits.forEach(unit => {
      if (unit.tier && unit.tierTitle) {
        const existing = tiers.get(unit.tier);
        if (existing) {
          existing.count++;
        } else {
          tiers.set(unit.tier, { slug: unit.tier, title: unit.tierTitle, count: 1 });
        }
      }
    });
    // Sort so Foundation comes before Higher
    return Array.from(tiers.values()).sort((a, b) =>
      a.slug === 'foundation' ? -1 : b.slug === 'foundation' ? 1 : 0
    );
  }, [units, isKs4TieredSubject, isKs4Science, selectedExamSubject]);

  // Check if user is already enrolled in this subject
  const isEnrolled = useMemo(() => {
    return myProgress?.some(p => p.subjectSlug === slug && p.keyStage === keyStage) || false;
  }, [myProgress, slug, keyStage]);

  // Filter units by selected tier and exam subject for KS4
  const filteredUnits = useMemo(() => {
    if (!units) return [];
    let filtered = units;

    // Filter by exam subject for Science
    if (isKs4Science && selectedExamSubject) {
      filtered = filtered.filter(unit => unit.examSubject === selectedExamSubject);
    }

    // Filter by tier
    if (isKs4TieredSubject && selectedTier) {
      filtered = filtered.filter(unit => unit.tier === selectedTier);
    }

    return filtered;
  }, [units, isKs4TieredSubject, isKs4Science, selectedTier, selectedExamSubject]);

  // Pagination logic - use filtered units
  const totalPages = useMemo(() => {
    if (!filteredUnits) return 0;
    return Math.ceil(filteredUnits.length / UNITS_PER_PAGE);
  }, [filteredUnits]);

  const paginatedUnits = useMemo(() => {
    if (!filteredUnits) return [];
    const startIndex = (currentPage - 1) * UNITS_PER_PAGE;
    return filteredUnits.slice(startIndex, startIndex + UNITS_PER_PAGE);
  }, [filteredUnits, currentPage]);

  const handleEnroll = async () => {
    if (!user) {
      router.push('/login');
      return;
    }

    const result = await enroll({
      subjectSlug: slug,
      keyStage: keyStage,
    });

    if (result) {
      setEnrollSuccess(true);
      setTimeout(() => setEnrollSuccess(false), 3000);
    }
  };

  const isLoading = subjectsLoading || unitsLoading;
  const error = subjectsError || unitsError;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isLoading && (error || !subject)) {
      timer = setTimeout(() => {
        router.push(`/browse?ks=${keyStage.replace('ks', '')}`);
      }, 3000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isLoading, error, subject, router, keyStage]);

  // Debug: Check for missing slugs
  if (units && units.length > 0) {
    const slugs = units.map(u => u.slug);
    const undefinedSlugs = slugs.filter(s => !s);
    if (undefinedSlugs.length > 0) {
      console.warn('⚠️ Units with undefined slugs:', undefinedSlugs.length);
    }
  }

  const icon = (
    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-2xl font-bold shadow-sm">
        {subject?.title.charAt(0).toUpperCase()}
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loading size="lg" />
      </div>
    );
  }

  if (error || !subject) {
    return (
      <div className="text-center py-16 bg-white rounded-xl shadow-soft">
        <h2 className="text-2xl font-bold text-red-500 mb-4">
          Error Loading Subject
        </h2>
        <p className="text-gray-500 mb-6">
          Unable to load this subject. Redirecting you automatically...
        </p>
        <Button onClick={() => router.push(`/browse?ks=${keyStage.replace('ks', '')}`)} variant="outline">
          ← Go back now
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <Card className="p-6 md:p-8 shadow-soft">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Button className="w-full sm:w-auto justify-center" variant="outline" onClick={() => router.push(`/browse?ks=${keyStage.replace('ks', '')}`)}>
              ← Back
            </Button>
            <div className="flex items-center gap-4">
              {icon}
              <div>
                <p className="text-sm text-gray-500">Subject Overview</p>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {subject.title}
                </h1>
                <p className="text-sm text-gray-500 mt-1">Key Stage: {subject.keyStageTitle}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {user && (
              isEnrolled ? (
                <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg border border-green-200">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-medium">Enrolled</span>
                </div>
              ) : (
                <Button
                  variant="primary"
                  onClick={handleEnroll}
                  disabled={isEnrolling}
                >
                  {isEnrolling ? 'Enrolling...' : 'Enroll in Course'}
                </Button>
              )
            )}
            {!user && (
              <Button variant="primary" onClick={() => router.push('/login')}>
                Sign in to Enroll
              </Button>
            )}
          </div>
        </div>

        {/* Success/Error Messages */}
        {enrollSuccess && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
            Successfully enrolled in {subject.title}! This course now appears in your dashboard.
          </div>
        )}
        {enrollError && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {enrollError}
          </div>
        )}
      </Card>

      {/* Exam Subject Selection for KS4 Science */}
      {isKs4Science && availableExamSubjects.length > 0 && !selectedExamSubject && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-soft overflow-hidden">
          <div className="px-6 md:px-8 py-5 border-b border-gray-100">
            <h2 className="text-lg md:text-xl font-bold text-gray-900">Choose Your Science Course</h2>
            <p className="text-sm text-gray-500 mt-1">Select the science course you're studying</p>
          </div>
          <div className="p-4 sm:p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {availableExamSubjects.map((examSubject) => {
              const getExamSubjectStyle = (slug: string) => {
                switch (slug) {
                  case 'combined-science':
                    return { gradient: 'from-emerald-500 to-teal-600', icon: '🔬' };
                  case 'biology':
                    return { gradient: 'from-green-500 to-emerald-600', icon: '🧬' };
                  case 'chemistry':
                    return { gradient: 'from-blue-500 to-cyan-600', icon: '⚗️' };
                  case 'physics':
                    return { gradient: 'from-purple-500 to-indigo-600', icon: '⚛️' };
                  default:
                    return { gradient: 'from-gray-500 to-gray-600', icon: '🔬' };
                }
              };
              const style = getExamSubjectStyle(examSubject.slug);

              return (
                <button
                  key={examSubject.slug}
                  onClick={() => {
                    setSelectedExamSubject(examSubject.slug);
                    setCurrentPage(1);
                  }}
                  className="group text-left"
                >
                  <Card hover className="p-6 md:p-8 h-full transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                    <div className="flex items-start gap-4">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg bg-gradient-to-br ${style.gradient}`}>
                        {style.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                          {examSubject.title}
                        </h3>
                        <p className="text-gray-500 mt-1">
                          {examSubject.count} unit{examSubject.count !== 1 ? 's' : ''} available
                        </p>
                        <p className="text-sm text-gray-400 mt-2">
                          {examSubject.slug === 'combined-science'
                            ? 'Covers all three sciences - ideal for most students'
                            : `Separate ${examSubject.title} GCSE course`
                          }
                        </p>
                      </div>
                      <div className="text-gray-400 group-hover:text-primary transition-colors">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Card>
                </button>
              );
            })}
            </div>
          </div>
        </div>
      )}

      {/* Tier Selection for KS4 (Maths or Science after exam subject selected) */}
      {isKs4TieredSubject && availableTiers.length > 0 && !selectedTier && (isKs4Maths || (isKs4Science && selectedExamSubject)) && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-soft overflow-hidden">
          <div className="px-6 md:px-8 py-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-gray-900">Choose Your Level</h2>
              <p className="text-sm text-gray-500 mt-1">
                {isKs4Science && selectedExamSubject
                  ? `Select Foundation or Higher for ${availableExamSubjects.find(e => e.slug === selectedExamSubject)?.title}`
                  : 'Select Foundation or Higher to view the available units'
                }
              </p>
            </div>
            {isKs4Science && selectedExamSubject && (
              <button
                onClick={() => {
                  setSelectedExamSubject(null);
                  setSelectedTier(null);
                  setCurrentPage(1);
                }}
                className="text-sm text-primary hover:text-primary-dark flex items-center gap-1.5 whitespace-nowrap"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Change course
              </button>
            )}
          </div>
          <div className="p-4 sm:p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {availableTiers.map((tier) => (
              <button
                key={tier.slug}
                onClick={() => {
                  setSelectedTier(tier.slug);
                  setCurrentPage(1);
                }}
                className="group text-left"
              >
                <Card hover className="p-6 md:p-8 h-full transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                  <div className="flex items-start gap-4">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg ${
                      tier.slug === 'foundation'
                        ? 'bg-gradient-to-br from-blue-500 to-blue-600'
                        : 'bg-gradient-to-br from-purple-500 to-purple-600'
                    }`}>
                      {tier.slug === 'foundation' ? '📘' : '📕'}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                        {tier.title}
                      </h3>
                      <p className="text-gray-500 mt-1">
                        {tier.count} unit{tier.count !== 1 ? 's' : ''} available
                      </p>
                    </div>
                    <div className="text-gray-400 group-hover:text-primary transition-colors">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Card>
              </button>
            ))}
            </div>
          </div>
        </div>
      )}

      {/* Units Section - Show when tier is selected (for KS4) or always (for other key stages) */}
      {(!isKs4TieredSubject || selectedTier) && (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-soft overflow-hidden">
        {/* Units section header */}
        <div className="px-6 md:px-8 py-5 border-b border-gray-100 flex items-center justify-between flex-wrap gap-3">
          <div className="flex flex-col gap-1.5 min-w-0">
            <h2 className="text-lg md:text-xl font-bold text-gray-900 truncate">
              {isKs4Science && selectedExamSubject && selectedTier
                ? `${availableExamSubjects.find(e => e.slug === selectedExamSubject)?.title} - ${availableTiers.find(t => t.slug === selectedTier)?.title}`
                : selectedTier
                  ? `${availableTiers.find(t => t.slug === selectedTier)?.title} Units`
                  : `Units in ${subject.title}`
              }
            </h2>
            {(selectedTier || selectedExamSubject) && (
              <div className="flex items-center gap-3 flex-wrap">
                {isKs4Science && selectedExamSubject && (
                  <button
                    onClick={() => {
                      setSelectedExamSubject(null);
                      setSelectedTier(null);
                      setCurrentPage(1);
                    }}
                    className="text-sm text-primary hover:text-primary-dark flex items-center gap-1.5 whitespace-nowrap"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Change course
                  </button>
                )}
                {selectedTier && (
                  <button
                    onClick={() => {
                      setSelectedTier(null);
                      setCurrentPage(1);
                    }}
                    className="text-sm text-primary hover:text-primary-dark flex items-center gap-1.5 whitespace-nowrap"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Change level
                  </button>
                )}
              </div>
            )}
          </div>
          {filteredUnits && filteredUnits.length > 0 && (
            <span className="text-sm font-medium text-gray-400 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100 shrink-0">
              {filteredUnits.length} unit{filteredUnits.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>
        <div className="p-4 sm:p-6 md:p-8">

        {paginatedUnits && paginatedUnits.length > 0 ? (
          <>
            <div className="flex flex-col gap-3">
              {paginatedUnits.map((unit, index) => {
                const uniqueKey = unit.slug 
                  ? `${unit.slug}-${unit.tier || 'none'}-${unit.examSubject || 'none'}`
                  : `${unit.subjectSlug}-${unit.unitNumber || index}`;

                return (
                  <div key={uniqueKey}>
                    <Link href={`/units/${unit.slug}`} className="block group">
                      <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 rounded-xl border border-gray-100 bg-gray-50/60 hover:bg-white hover:border-primary/30 hover:shadow-md transition-all duration-200">
                        <div className="flex items-center gap-4 sm:gap-5 flex-1 min-w-0">
                          {/* Unit number badge */}
                          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-sm font-bold shrink-0">
                            {unit.unitNumber || index + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <CardTitle className="text-base group-hover:text-primary transition-colors">{unit.title}</CardTitle>
                              {/* KS4 Tier Badge */}
                              {unit.tierTitle && (
                                <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                                  unit.tier === 'higher'
                                    ? 'bg-purple-100 text-purple-700'
                                    : 'bg-blue-100 text-blue-700'
                                }`}>
                                  {unit.tierTitle}
                                </span>
                              )}
                              {/* KS4 Science Exam Subject Badge */}
                              {unit.examSubjectTitle && (
                                <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-700">
                                  {unit.examSubjectTitle}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-400 mt-0.5">
                              {unit.year && <span>Year {unit.year} · </span>}
                              {unit.numberOfLessons !== undefined ? (
                                <>{unit.numberOfLessons} lesson{unit.numberOfLessons !== 1 ? 's' : ''}</>
                              ) : (
                                <span>Lessons available</span>
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0 text-gray-400 group-hover:text-primary transition-colors">
                          <span className="text-sm font-medium hidden sm:block">View Unit</span>
                          <svg className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mt-8 pt-6 border-t border-gray-100">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-full sm:w-auto shrink-0 justify-center"
                >
                  ← Previous
                </Button>

                <div className="flex items-center gap-1.5 flex-wrap justify-center overflow-x-auto max-w-full">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-9 h-9 shrink-0 rounded-lg text-sm font-medium transition-colors ${
                        currentPage === page
                          ? 'bg-primary text-white shadow-sm'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="w-full sm:w-auto shrink-0 justify-center"
                >
                  Next →
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <p className="text-base font-medium text-gray-500">No units found for this subject yet.</p>
          </div>
        )}
        </div>
      </div>
      )}
    </div>
  );
}