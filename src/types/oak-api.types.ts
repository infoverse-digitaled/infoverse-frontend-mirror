/**
 * Oak National Academy API Types
 * Based on Oak National Academy API documentation
 */

export interface KeyStage {
  slug: string;
  title: string;
  shortCode: string;
  displayOrder: number;
}

export interface Subject {
  slug: string;
  title: string;
  keyStageSlug: string;
  keyStageTitle: string;
}

export interface Unit {
  slug: string;
  title: string;
  subjectSlug: string;
  subjectTitle: string;
  keyStageSlug?: string;
  keyStageTitle?: string;
  yearSlug?: string;
  yearTitle?: string;
  unitStudyOrder?: number;
  numberOfLessons: number;
  unitNumber?: number;
}

export interface Lesson {
  slug: string;
  title: string;
  description?: string;
  unitSlug: string;
  unitTitle: string;
  lessonNumber: number;
  keyStageSlug: string;
  keyStageTitle: string;
  subjectSlug: string;
  subjectTitle: string;
  expired?: boolean;
  videoUrl?: string;
  worksheetUrl?: string;
  presentationUrl?: string;
}

export interface QuizAnswer {
  type: string;
  content: string;
  distractor: boolean;
  order?: number;
  matchOption?: { type: string; content: string };
  correctChoice?: { type: string; content: string };
}

export interface QuizQuestion {
  question: string;
  questionType: 'multiple-choice' | 'order' | 'match' | 'short-answer' | 'explanatory-text';
  answers: QuizAnswer[];
}

export interface LessonQuiz {
  starterQuiz: QuizQuestion[];
  exitQuiz: QuizQuestion[];
}

export interface Year {
  slug: string;
  title: string;
  displayOrder: number;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  totalPages: number;
  totalResults: number;
}

// Filter and Query Types
export interface SubjectFilters {
  keyStageSlug?: string;
}

export interface UnitFilters {
  keyStageSlug?: string;
  subjectSlug?: string;
  yearSlug?: string;
}

export interface LessonFilters {
  unitSlug?: string;
  subjectSlug?: string;
  keyStageSlug?: string;
}

/**
 * Lesson Asset Types
 */
export interface LessonAsset {
  type: 'video' | 'slideDeck' | 'worksheet' | 'worksheetAnswers' | 'supplementaryResource' | 'starterQuiz' | 'starterQuizAnswers' | 'exitQuiz' | 'exitQuizAnswers';
  label: string;
  url: string;
}

export interface LessonAssets {
  assets: LessonAsset[];
}

export interface TranscriptSentence {
  start: number;
  end: number;
  text: string;
}

export interface LessonTranscript {
  sentences: TranscriptSentence[];
}
