'use client';

import { useRouter } from 'next/navigation';
import {
  ProfileCard,
  CourseProgressCard,
  SuggestedCourseCard,
  ProgressTracker,
} from '@/components/dashboard';
import { useAuth } from '@/contexts/AuthContext';
import { useMyProgress } from '@/lib/hooks/useOakData';

// Helper to format subject slug to display name
const formatSubjectName = (slug: string): string => {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuth();

  // Use SWR hook for progress data - auto-revalidates when enrollments change
  const { data: enrollments, isLoading: loading } = useMyProgress();

  // Suggested courses based on what user hasn't enrolled in
  const suggestedCourses = [
    {
      id: 1,
      name: 'History',
      description: 'Learn about historical events',
    },
    {
      id: 2,
      name: 'Geography',
      description: 'Explore the world',
    },
    {
      id: 3,
      name: 'Art',
      description: 'Express your creativity',
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header with Profile Card */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-1 sm:mb-2 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
            Welcome back, {user?.name?.split(' ')[0] || 'Student'}!
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600">Continue your learning journey</p>
        </div>
        <div className="hidden sm:block">
          <ProfileCard />
        </div>
      </div>

      {/* Progress Tracker */}
      <ProgressTracker />

      {/* My Courses Section */}
      <section className="mb-8 sm:mb-12 lg:mb-16">
        <div className="mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-black mb-1 sm:mb-2">My Courses</h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600">Pick up where you left off</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : enrollments && enrollments.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {enrollments.map((enrollment) => (
              <CourseProgressCard
                key={enrollment._id}
                subjectName={formatSubjectName(enrollment.subjectSlug)}
                progress={enrollment.progress.progressPercent}
                onClick={() =>
                  router.push(`/subjects/${enrollment.keyStage}/${enrollment.subjectSlug}`)
                }
              />
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-primary/10 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">No courses yet</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">Start learning by browsing our subjects!</p>
            <button
              onClick={() => router.push('/browse')}
              className="w-full sm:w-auto px-6 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors"
            >
              Browse Subjects
            </button>
          </div>
        )}
      </section>

      {/* Suggested Courses Section */}
      <section>
        <div className="mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-black mb-1 sm:mb-2">
            Suggested New Courses
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600">Explore new subjects to expand your knowledge</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {suggestedCourses.map((course) => (
            <SuggestedCourseCard
              key={course.id}
              courseName={course.name}
              description={course.description}
              onClick={() => router.push('/browse')}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
