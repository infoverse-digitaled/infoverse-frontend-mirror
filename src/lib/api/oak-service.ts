import { apiClient } from './client';
import authApiClient from './auth-client';
import { API_ENDPOINTS } from '@/config/api.config';
import {
  mockKeyStages,
  mockSubjects,
  mockUnits,
  mockLessons,
} from './mock/data';
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
 * Enrollment types
 */
export interface EnrollmentProgress {
  _id: string;
  subjectSlug: string;
  keyStage: string;
  status: string;
  startDate: string;
  lastAccessedAt: string;
  progress: {
    totalLessons: number;
    completedLessons: number;
    progressPercent: number;
  };
}

export interface EnrollRequest {
  subjectSlug: string;
  keyStage: string;
}

/**
 * Backend API Response wrapper
 * The backend returns responses in the format: { success: true, data: T, message: string }
 */
interface BackendResponse<T> {
  success: boolean;
  data: T;
  message: string;
  meta?: any;
}

/**
 * Check if mock data should be used
 */
const useMockData = () => {
  return process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';
};

/**
 * Oak National Academy API Service
 * Supports both real API and mock data based on environment variable
 */

export const oakService = {
  /**
   * Fetch all key stages (KS1-4)
   */
  async getKeyStages(): Promise<KeyStage[]> {
    if (useMockData()) {
      // Return mock data
      return Promise.resolve(mockKeyStages);
    }

    // Real API call - unwrap the backend response to get the data array
    const response = await apiClient.get<BackendResponse<KeyStage[]>>(API_ENDPOINTS.keyStages);
    return response.data.data; // Unwrap: response.data.data to get the array
  },

  /**
   * Fetch subjects for a specific key stage
   */
  async getSubjects(filters?: SubjectFilters): Promise<Subject[]> {
    if (useMockData()) {
      // Return mock data
      if (filters?.keyStageSlug) {
        return Promise.resolve(mockSubjects[filters.keyStageSlug] || []);
      }
      // Return all subjects
      return Promise.resolve(Object.values(mockSubjects).flat());
    }

    // Real API call - requires keyStageSlug
    if (!filters?.keyStageSlug) {
      throw new Error('keyStageSlug is required to fetch subjects');
    }

    const endpoint = API_ENDPOINTS.subjects(filters.keyStageSlug);
    const response = await apiClient.get<BackendResponse<Subject[]>>(endpoint);
    return response.data.data; // Unwrap: response.data.data to get the array
  },

  /**
   * Fetch units for a specific subject
   */
  async getUnits(filters?: UnitFilters): Promise<Unit[]> {
    if (useMockData()) {
      // Return mock data
      if (filters?.subjectSlug) {
        return Promise.resolve(mockUnits[filters.subjectSlug] || []);
      }
      return Promise.resolve(Object.values(mockUnits).flat());
    }

    // Real API call - requires BOTH keyStageSlug and subjectSlug
    if (!filters?.keyStageSlug || !filters?.subjectSlug) {
      throw new Error('Both keyStageSlug and subjectSlug are required to fetch units');
    }

    const endpoint = API_ENDPOINTS.units(filters.keyStageSlug, filters.subjectSlug);
    const response = await apiClient.get<BackendResponse<Unit[]>>(endpoint);
    return response.data.data; // Unwrap: response.data.data to get the array
  },

  /**
   * Fetch lessons for a specific unit
   */
  async getLessons(filters?: LessonFilters): Promise<Lesson[]> {
    if (useMockData()) {
      // Return mock data
      if (filters?.unitSlug) {
        return Promise.resolve(mockLessons[filters.unitSlug] || []);
      }
      return Promise.resolve(Object.values(mockLessons).flat());
    }

    // Real API call - requires unitSlug
    if (!filters?.unitSlug) {
      throw new Error('unitSlug is required to fetch lessons');
    }

    const endpoint = API_ENDPOINTS.lessons(filters.unitSlug);
    const response = await apiClient.get<BackendResponse<Lesson[]>>(endpoint);
    return response.data.data; // Unwrap: response.data.data to get the array
  },

  /**
   * Fetch a single lesson by slug
   * NOTE: This is a premium endpoint that requires authentication
   */
  async getLesson(slug: string): Promise<Lesson> {
    if (useMockData()) {
      // Return mock data - find lesson by slug
      const allLessons = Object.values(mockLessons).flat();
      const lesson = allLessons.find((l) => l.slug === slug);
      if (lesson) {
        return Promise.resolve(lesson);
      }
      return Promise.reject(new Error('Lesson not found'));
    }

    // Real API call using the lesson endpoint (requires auth token)
    const endpoint = API_ENDPOINTS.lesson(slug);
    const response = await authApiClient.get<BackendResponse<Lesson>>(endpoint);
    return response.data.data; // Unwrap: response.data.data to get the object
  },

  /**
   * Fetch years/year groups
   * NOTE: This endpoint is NOT implemented in the backend API
   * You need to add: GET /oak/years to your backend
   */
  async getYears(): Promise<Year[]> {
    if (useMockData()) {
      // Return empty array for mock data (not implemented)
      return Promise.resolve([]);
    }

    // Real API call - NOT YET IMPLEMENTED IN BACKEND
    throw new Error('getYears endpoint is not implemented in the backend. Please add GET /oak/years to your backend API.');
  },

  /**
   * Fetch subject by slug
   * NOTE: This endpoint is NOT implemented in the backend API
   * Backend only supports: GET /oak/keystages/:keyStage/subjects
   * You need to add: GET /oak/subjects/:slug to your backend
   */
  async getSubject(slug: string): Promise<Subject> {
    if (useMockData()) {
      // Return mock data - find subject by slug
      const allSubjects = Object.values(mockSubjects).flat();
      const subject = allSubjects.find((s) => s.slug === slug);
      if (subject) {
        return Promise.resolve(subject);
      }
      return Promise.reject(new Error('Subject not found'));
    }

    // Real API call - NOT YET IMPLEMENTED IN BACKEND
    throw new Error('getSubject endpoint is not implemented in the backend. Please add GET /oak/subjects/:slug to your backend API.');
  },

  /**
   * Fetch unit by slug
   */
  async getUnit(slug: string): Promise<Unit> {
    if (useMockData()) {
      // Return mock data - find unit by slug
      const allUnits = Object.values(mockUnits).flat();
      const unit = allUnits.find((u) => u.slug === slug);
      if (unit) {
        return Promise.resolve(unit);
      }
      return Promise.reject(new Error('Unit not found'));
    }

    // Real API call
    const endpoint = API_ENDPOINTS.unit(slug);
    const response = await apiClient.get<BackendResponse<Unit>>(endpoint);
    return response.data.data; // Unwrap: response.data.data to get the object
  },

  /**
   * Fetch quiz questions for a lesson
   * NOTE: This is a premium endpoint that requires authentication
   */
  async getLessonQuiz(lessonSlug: string): Promise<LessonQuiz> {
    if (useMockData()) {
      // Return empty quiz for mock data
      return Promise.resolve({ starterQuiz: [], exitQuiz: [] });
    }

    // Real API call (requires auth token)
    const endpoint = API_ENDPOINTS.lessonQuiz(lessonSlug);
    const response = await authApiClient.get<BackendResponse<LessonQuiz>>(endpoint);
    return response.data.data;
  },

  /**
   * Fetch lesson assets (video, worksheets, slides)
   * NOTE: This is a premium endpoint that requires authentication
   */
  async getLessonAssets(lessonSlug: string): Promise<LessonAssets> {
    if (useMockData()) {
      // Return empty assets for mock data
      return Promise.resolve({ assets: [] });
    }

    // Real API call (requires auth token)
    const endpoint = API_ENDPOINTS.lessonAssets(lessonSlug);
    const response = await authApiClient.get<BackendResponse<LessonAssets>>(endpoint);
    return response.data.data;
  },

  /**
   * Fetch lesson transcript
   * NOTE: This is a premium endpoint that requires authentication
   */
  async getLessonTranscript(lessonSlug: string): Promise<LessonTranscript> {
    if (useMockData()) {
      // Return empty transcript for mock data
      return Promise.resolve({ sentences: [] });
    }

    // Real API call (requires auth token)
    const endpoint = API_ENDPOINTS.lessonTranscript(lessonSlug);
    const response = await authApiClient.get<BackendResponse<LessonTranscript>>(endpoint);
    return response.data.data;
  },

  /**
   * Get user's enrolled courses and progress
   */
  async getMyProgress(): Promise<EnrollmentProgress[]> {
    const response = await authApiClient.get<BackendResponse<EnrollmentProgress[]>>(API_ENDPOINTS.myProgress);
    return response.data.data || [];
  },

  /**
   * Enroll in a subject
   */
  async enrollInSubject(data: EnrollRequest): Promise<EnrollmentProgress> {
    const response = await authApiClient.post<BackendResponse<EnrollmentProgress>>(API_ENDPOINTS.enroll, data);
    return response.data.data;
  },
};
