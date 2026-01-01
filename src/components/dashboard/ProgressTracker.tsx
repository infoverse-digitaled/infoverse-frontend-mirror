'use client';

import { useEffect } from 'react';
import useSWR from 'swr';
import { useMyProgress } from '@/lib/hooks/useOakData';
import authApiClient from '@/lib/api/auth-client';

interface ProgressStats {
  totalEnrollments: number;
  completedLessons: number;
  totalLessons: number;
  averageProgress: number;
  streakDays: number;
}

// Fetcher for streak data
const streakFetcher = async (url: string) => {
  const response = await authApiClient.get(url);
  return response.data?.data;
};

export function ProgressTracker() {
  const { data: enrollments, isLoading } = useMyProgress();
  const { data: streakData } = useSWR('/progress/streak', streakFetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000, // Only fetch once per minute
  });

  // Record activity on component mount
  useEffect(() => {
    const recordActivity = async () => {
      try {
        await authApiClient.post('/progress/activity');
      } catch (error) {
        // Silent fail - activity recording is not critical
        console.debug('Activity recording skipped');
      }
    };
    recordActivity();
  }, []);

  // Calculate stats from enrollments
  const stats: ProgressStats = {
    totalEnrollments: enrollments?.length || 0,
    completedLessons: enrollments?.reduce((acc, e) => acc + (e.progress?.completedLessons || 0), 0) || 0,
    totalLessons: enrollments?.reduce((acc, e) => acc + (e.progress?.totalLessons || 0), 0) || 0,
    averageProgress: enrollments?.length
      ? Math.round(enrollments.reduce((acc, e) => acc + (e.progress?.progressPercent || 0), 0) / enrollments.length)
      : 0,
    streakDays: streakData?.streak || 0,
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-100 rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Your Progress</h2>
        <span className="text-sm text-gray-500">Keep up the great work!</span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {/* Courses Enrolled */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-700">{stats.totalEnrollments}</p>
              <p className="text-xs text-blue-600">Courses</p>
            </div>
          </div>
        </div>

        {/* Lessons Completed */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-700">{stats.completedLessons}</p>
              <p className="text-xs text-green-600">Lessons Done</p>
            </div>
          </div>
        </div>

        {/* Average Progress */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-700">{stats.averageProgress}%</p>
              <p className="text-xs text-purple-600">Avg Progress</p>
            </div>
          </div>
        </div>

        {/* Learning Streak */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-orange-700">{stats.streakDays}</p>
              <p className="text-xs text-orange-600">Day Streak</p>
            </div>
          </div>
        </div>
      </div>

      {/* Overall Progress Bar */}
      <div className="bg-gray-50 rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Overall Learning Progress</span>
          <span className="text-sm font-bold text-primary">{stats.averageProgress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-primary to-primary-dark h-3 rounded-full transition-all duration-500"
            style={{ width: `${stats.averageProgress}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-2">
          {stats.completedLessons} of {stats.totalLessons} lessons completed across all courses
        </p>
      </div>
    </div>
  );
}

export default ProgressTracker;
