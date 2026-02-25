/**
 * Oak National Academy API Configuration
 * Now proxied through our backend API
 */

export const OAK_API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api/v1';

export const API_ENDPOINTS = {
  keyStages: '/oak/keystages',
  subjects: (keyStage: string) => `/oak/keystages/${keyStage}/subjects`,
  units: (keyStage: string, subject: string) => `/oak/subjects/${keyStage}/${subject}/units`,
  unit: (unitSlug: string) => `/oak/units/${unitSlug}`,
  lessons: (unit: string) => `/oak/units/${unit}/lessons`,
  lesson: (lessonSlug: string) => `/oak/lessons/${lessonSlug}`,
  lessonQuiz: (lessonSlug: string) => `/oak/lessons/${lessonSlug}/quiz`,
  lessonAssets: (lessonSlug: string) => `/oak/lessons/${lessonSlug}/assets`,
  lessonTranscript: (lessonSlug: string) => `/oak/lessons/${lessonSlug}/transcript`,
  // Progress & Enrollment endpoints
  myProgress: '/progress/my-progress',
  enroll: '/progress/enroll',
  // AI Tutor endpoints
  aiTutor: '/ai/tutor',
  aiSummary: '/ai/summary',
  aiExplain: '/ai/explain',
  // Content/Blog endpoints
  contentPosts: '/content/posts',
  contentPost: (slug: string) => `/content/posts/${slug}`,
  // Auth endpoints
  login: '/auth/login',
  register: '/auth/register',
  me: '/auth/me',
  forgotPassword: '/auth/forgot-password',
  resetPassword: '/auth/reset-password',
  // Bug Report / Feedback
  bugReport: '/public/bug-report',
} as const;

export const API_CONFIG = {
  timeout: 10000,
  retries: 3,
  cacheTime: 1000 * 60 * 5, // 5 minutes
} as const;
