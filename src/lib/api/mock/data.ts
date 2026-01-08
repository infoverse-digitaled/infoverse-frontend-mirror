import type { KeyStage, Subject, Unit, Lesson } from '@/types/oak-api.types';

export const mockKeyStages: KeyStage[] = [
  {
    slug: 'ks1',
    title: 'Key Stage 1',
    shortCode: 'KS1',
    displayOrder: 1,
  },
  {
    slug: 'ks2',
    title: 'Key Stage 2',
    shortCode: 'KS2',
    displayOrder: 2,
  },
  {
    slug: 'ks3',
    title: 'Key Stage 3',
    shortCode: 'KS3',
    displayOrder: 3,
  },
  {
    slug: 'ks4',
    title: 'Key Stage 4',
    shortCode: 'KS4',
    displayOrder: 4,
  },
];

export const mockSubjects: Record<string, Subject[]> = {
  ks1: [
    {
      slug: 'maths-ks1',
      title: 'Mathematics',
      keyStageSlug: 'ks1',
      keyStageTitle: 'Key Stage 1',
    },
    {
      slug: 'english-ks1',
      title: 'English',
      keyStageSlug: 'ks1',
      keyStageTitle: 'Key Stage 1',
    },
    {
      slug: 'science-ks1',
      title: 'Science',
      keyStageSlug: 'ks1',
      keyStageTitle: 'Key Stage 1',
    },
    {
      slug: 'art-ks1',
      title: 'Art & Design',
      keyStageSlug: 'ks1',
      keyStageTitle: 'Key Stage 1',
    },
    {
      slug: 'computing-ks1',
      title: 'Computing',
      keyStageSlug: 'ks1',
      keyStageTitle: 'Key Stage 1',
    },
    {
      slug: 'pe-ks1',
      title: 'Physical Education',
      keyStageSlug: 'ks1',
      keyStageTitle: 'Key Stage 1',
    },
  ],
  ks2: [
    {
      slug: 'maths-ks2',
      title: 'Mathematics',
      keyStageSlug: 'ks2',
      keyStageTitle: 'Key Stage 2',
    },
    {
      slug: 'english-ks2',
      title: 'English',
      keyStageSlug: 'ks2',
      keyStageTitle: 'Key Stage 2',
    },
    {
      slug: 'science-ks2',
      title: 'Science',
      keyStageSlug: 'ks2',
      keyStageTitle: 'Key Stage 2',
    },
    {
      slug: 'history-ks2',
      title: 'History',
      keyStageSlug: 'ks2',
      keyStageTitle: 'Key Stage 2',
    },
    {
      slug: 'geography-ks2',
      title: 'Geography',
      keyStageSlug: 'ks2',
      keyStageTitle: 'Key Stage 2',
    },
    {
      slug: 'art-ks2',
      title: 'Art & Design',
      keyStageSlug: 'ks2',
      keyStageTitle: 'Key Stage 2',
    },
    {
      slug: 'music-ks2',
      title: 'Music',
      keyStageSlug: 'ks2',
      keyStageTitle: 'Key Stage 2',
    },
    {
      slug: 'computing-ks2',
      title: 'Computing',
      keyStageSlug: 'ks2',
      keyStageTitle: 'Key Stage 2',
    },
  ],
  ks3: [
    {
      slug: 'maths-ks3',
      title: 'Mathematics',
      keyStageSlug: 'ks3',
      keyStageTitle: 'Key Stage 3',
    },
    {
      slug: 'english-ks3',
      title: 'English',
      keyStageSlug: 'ks3',
      keyStageTitle: 'Key Stage 3',
    },
    {
      slug: 'science-ks3',
      title: 'Science',
      keyStageSlug: 'ks3',
      keyStageTitle: 'Key Stage 3',
    },
    {
      slug: 'history-ks3',
      title: 'History',
      keyStageSlug: 'ks3',
      keyStageTitle: 'Key Stage 3',
    },
    {
      slug: 'geography-ks3',
      title: 'Geography',
      keyStageSlug: 'ks3',
      keyStageTitle: 'Key Stage 3',
    },
    {
      slug: 'french-ks3',
      title: 'French',
      keyStageSlug: 'ks3',
      keyStageTitle: 'Key Stage 3',
    },
    {
      slug: 'spanish-ks3',
      title: 'Spanish',
      keyStageSlug: 'ks3',
      keyStageTitle: 'Key Stage 3',
    },
    {
      slug: 'computing-ks3',
      title: 'Computing',
      keyStageSlug: 'ks3',
      keyStageTitle: 'Key Stage 3',
    },
  ],
  ks4: [
    {
      slug: 'maths-ks4',
      title: 'Mathematics',
      keyStageSlug: 'ks4',
      keyStageTitle: 'Key Stage 4',
    },
    {
      slug: 'english-ks4',
      title: 'English Language',
      keyStageSlug: 'ks4',
      keyStageTitle: 'Key Stage 4',
    },
    {
      slug: 'english-lit-ks4',
      title: 'English Literature',
      keyStageSlug: 'ks4',
      keyStageTitle: 'Key Stage 4',
    },
    {
      slug: 'biology-ks4',
      title: 'Biology',
      keyStageSlug: 'ks4',
      keyStageTitle: 'Key Stage 4',
    },
    {
      slug: 'chemistry-ks4',
      title: 'Chemistry',
      keyStageSlug: 'ks4',
      keyStageTitle: 'Key Stage 4',
    },
    {
      slug: 'physics-ks4',
      title: 'Physics',
      keyStageSlug: 'ks4',
      keyStageTitle: 'Key Stage 4',
    },
    {
      slug: 'history-ks4',
      title: 'History',
      keyStageSlug: 'ks4',
      keyStageTitle: 'Key Stage 4',
    },
    {
      slug: 'geography-ks4',
      title: 'Geography',
      keyStageSlug: 'ks4',
      keyStageTitle: 'Key Stage 4',
    },
  ],
};

export const mockUnits: Record<string, Unit[]> = {
  'maths-ks1': [
    {
      slug: 'numbers-to-10',
      title: 'Numbers to 10',
      subjectSlug: 'maths-ks1',
      subjectTitle: 'Mathematics',
      keyStageSlug: 'ks1',
      keyStageTitle: 'Key Stage 1',
      numberOfLessons: 5,
      unitStudyOrder: 1,
    },
    {
      slug: 'addition-subtraction',
      title: 'Addition and Subtraction',
      subjectSlug: 'maths-ks1',
      subjectTitle: 'Mathematics',
      keyStageSlug: 'ks1',
      keyStageTitle: 'Key Stage 1',
      numberOfLessons: 8,
      unitStudyOrder: 2,
    },
  ],
  'english-ks1': [
    {
      slug: 'phonics-basics',
      title: 'Phonics Basics',
      subjectSlug: 'english-ks1',
      subjectTitle: 'English',
      keyStageSlug: 'ks1',
      keyStageTitle: 'Key Stage 1',
      numberOfLessons: 10,
      unitStudyOrder: 1,
    },
  ],
};

export const mockLessons: Record<string, Lesson[]> = {
  'numbers-to-10': [
    {
      slug: 'counting-1-5',
      title: 'Counting from 1 to 5',
      description: 'Learn to count objects from 1 to 5',
      unitSlug: 'numbers-to-10',
      unitTitle: 'Numbers to 10',
      lessonNumber: 1,
      keyStageSlug: 'ks1',
      keyStageTitle: 'Key Stage 1',
      subjectSlug: 'maths-ks1',
      subjectTitle: 'Mathematics',
      expired: false,
    },
    {
      slug: 'counting-6-10',
      title: 'Counting from 6 to 10',
      description: 'Learn to count objects from 6 to 10',
      unitSlug: 'numbers-to-10',
      unitTitle: 'Numbers to 10',
      lessonNumber: 2,
      keyStageSlug: 'ks1',
      keyStageTitle: 'Key Stage 1',
      subjectSlug: 'maths-ks1',
      subjectTitle: 'Mathematics',
      expired: false,
    },
  ],
};
