import useSWR, { mutate } from 'swr';
import { useState, useCallback } from 'react';
import { oakService, EnrollmentProgress, EnrollRequest } from '@/lib/api/oak-service';
import type {
  KeyStage,
  Subject,
  Unit,
  Lesson,
  Year,
  LessonQuiz,
  LessonAssets,
  LessonTranscript,
  SubjectFilters,
  UnitFilters,
  LessonFilters,
} from '@/types/oak-api.types';

/**
 * Custom hooks for fetching Oak National Academy data with SWR
 */

// Default SWR options for Oak data - prevent stale cache issues
const OAK_SWR_OPTIONS = {
  dedupingInterval: 30000, // 30 seconds - prevent duplicate requests
  revalidateOnFocus: false, // Don't refetch on window focus
  revalidateOnReconnect: true, // Refetch when network reconnects
};

export function useKeyStages() {
  return useSWR<KeyStage[]>('key-stages', () => oakService.getKeyStages(), OAK_SWR_OPTIONS);
}

export function useSubjects(filters?: SubjectFilters) {
  const key = filters
    ? ['subjects', filters.keyStageSlug]
    : 'subjects';

  return useSWR<Subject[]>(key, () => oakService.getSubjects(filters), OAK_SWR_OPTIONS);
}

export function useSubject(slug: string | null) {
  return useSWR<Subject>(
    slug ? ['subject', slug] : null,
    () => slug ? oakService.getSubject(slug) : Promise.reject('No slug'),
    OAK_SWR_OPTIONS
  );
}

export function useUnits(filters?: UnitFilters) {
  const key = ['units', filters?.keyStageSlug, filters?.subjectSlug, filters?.yearSlug].filter(
    Boolean
  );

  return useSWR<Unit[]>(
    filters ? key : 'units',
    () => oakService.getUnits(filters),
    OAK_SWR_OPTIONS
  );
}

export function useUnit(slug: string | null) {
  return useSWR<Unit>(
    slug ? ['unit', slug] : null,
    () => slug ? oakService.getUnit(slug) : Promise.reject('No slug'),
    OAK_SWR_OPTIONS
  );
}

export function useLessons(filters?: LessonFilters) {
  const key = [
    'lessons',
    filters?.unitSlug,
    filters?.subjectSlug,
    filters?.keyStageSlug,
  ].filter(Boolean);

  return useSWR<Lesson[]>(
    filters ? key : 'lessons',
    () => oakService.getLessons(filters),
    OAK_SWR_OPTIONS
  );
}

export function useLesson(slug: string | null) {
  return useSWR<Lesson>(
    slug ? ['lesson', slug] : null,
    () => slug ? oakService.getLesson(slug) : Promise.reject('No slug'),
    OAK_SWR_OPTIONS
  );
}

export function useYears() {
  return useSWR<Year[]>('years', () => oakService.getYears(), OAK_SWR_OPTIONS);
}

export function useLessonQuiz(lessonSlug: string | null) {
  return useSWR<LessonQuiz>(
    lessonSlug ? ['lesson-quiz', lessonSlug] : null,
    () => lessonSlug ? oakService.getLessonQuiz(lessonSlug) : Promise.reject('No slug'),
    OAK_SWR_OPTIONS
  );
}

export function useLessonAssets(lessonSlug: string | null) {
  return useSWR<LessonAssets>(
    lessonSlug ? ['lesson-assets', lessonSlug] : null,
    () => lessonSlug ? oakService.getLessonAssets(lessonSlug) : Promise.reject('No slug'),
    OAK_SWR_OPTIONS
  );
}

export function useLessonTranscript(lessonSlug: string | null) {
  return useSWR<LessonTranscript>(
    lessonSlug ? ['lesson-transcript', lessonSlug] : null,
    () => lessonSlug ? oakService.getLessonTranscript(lessonSlug) : Promise.reject('No slug'),
    OAK_SWR_OPTIONS
  );
}

/**
 * Hook to fetch user's enrolled courses and progress
 */
export function useMyProgress() {
  return useSWR<EnrollmentProgress[]>(
    'my-progress',
    () => oakService.getMyProgress(),
    {
      revalidateOnFocus: true,
      dedupingInterval: 5000,
    }
  );
}

/**
 * Hook to handle course enrollment
 */
export function useEnroll() {
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const enroll = useCallback(async (data: EnrollRequest): Promise<EnrollmentProgress | null> => {
    setIsEnrolling(true);
    setError(null);

    try {
      const result = await oakService.enrollInSubject(data);
      // Revalidate the progress data after enrollment
      mutate('my-progress');
      return result;
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } }; message?: string };
      const errorMessage = error.response?.data?.message || error.message || 'Failed to enroll';
      setError(errorMessage);
      return null;
    } finally {
      setIsEnrolling(false);
    }
  }, []);

  return { enroll, isEnrolling, error };
}

/**
 * Utility function to clear all Oak data from SWR cache
 * Call this to force fresh data fetch after backend cache is cleared
 */
export async function clearOakCache() {
  // Clear all Oak-related keys from SWR cache
  await mutate((key) => {
    if (typeof key === 'string') {
      return ['key-stages', 'subjects', 'units', 'lessons', 'years'].some(k => key.includes(k));
    }
    if (Array.isArray(key)) {
      return ['subjects', 'subject', 'units', 'unit', 'lessons', 'lesson', 'lesson-quiz', 'lesson-assets', 'lesson-transcript'].includes(key[0]);
    }
    return false;
  }, undefined, { revalidate: true });
}
