'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, Button, Container } from '@/components/ui';
import authApiClient from '@/lib/api/auth-client';
import { API_ENDPOINTS } from '@/config/api.config';
import { useRouter } from 'next/navigation';

interface Student {
  _id: string;
  name: string;
  email: string;
  lastActiveAt?: string;
  createdAt: string;
}

export default function SchoolAdminDashboard() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [schoolCode, setSchoolCode] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [copied, setCopied] = useState(false);

  // Helper to make plan names human-readable
  const formatPlanName = (plan?: string) => {
    if (!plan) return null;
    return plan
      .replace('school_tier', 'Tier ')
      .replace('_term', ' — Term')
      .replace('_year', ' — Year')
      .replace('_', ' ')
      .replace(/^(\w)/, (c) => c.toUpperCase());
  };

  useEffect(() => {
    if (!authLoading && user?.role !== 'schooladmin') {
      router.push('/dashboard');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await authApiClient.get(API_ENDPOINTS.schoolStudents);
        const backendData = response.data?.data || response.data || {};
        setStudents(backendData.students || []);
        setSchoolCode(backendData.schoolCode || '---');
        setSchoolName(backendData.schoolName || 'Your School');
      } catch (err: any) {
        console.error('Failed to fetch students:', err);
        setError('Failed to load student data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === 'schooladmin') {
      fetchStudents();
    }
  }, [user]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(schoolCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (authLoading || loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Container className="px-0 py-8">
      <div className="flex flex-col gap-8">
        {/* Header Section */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">School Admin Dashboard</h1>
          <p className="text-gray-500">
            Welcome back, {user?.name}. Manage your students for <strong className="text-gray-800">{schoolName}</strong>.
          </p>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* Code Sharing and Subscription Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-6 lg:p-8 bg-blue-50 border border-blue-100 flex flex-col justify-between gap-6 lg:col-span-2">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Your Unique School Code</h2>
              <p className="text-gray-600 mb-4">
                Share this code with your students. They will use it when registering on Infoverse to automatically link to your school's account.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="px-6 py-3 bg-white border-2 border-primary border-dashed rounded-xl font-mono text-xl font-bold tracking-wider text-primary text-center">
                {schoolCode}
              </div>
              <Button onClick={handleCopyCode} variant={copied ? "primary" : "outline"} className="h-[54px] px-8">
                {copied ? 'Copied!' : 'Copy Code'}
              </Button>
            </div>
          </Card>

          {/* Subscription Status Card */}
          <Card className="p-6 border border-gray-100 flex flex-col justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3">Subscription Status</h2>

              {/* Status badge */}
              <div className="flex items-center gap-2 mb-4">
                {(() => {
                  const status = user?.subscription?.status;
                  const badge =
                    status === 'active'   ? { label: 'Active',   cls: 'bg-green-100 text-green-800' } :
                    status === 'trialing' ? { label: 'Free Trial', cls: 'bg-orange-100 text-orange-800' } :
                    status === 'past_due' ? { label: 'Past Due',  cls: 'bg-yellow-100 text-yellow-800' } :
                    status === 'cancelled'? { label: 'Cancelled', cls: 'bg-red-100 text-red-700' } :
                    { label: 'No Plan',   cls: 'bg-gray-100 text-gray-500' };
                  return (
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${badge.cls}`}>
                      {badge.label}
                    </span>
                  );
                })()}
                {user?.subscription?.plan && (
                  <span className="text-sm text-gray-500">
                    {formatPlanName(user.subscription.plan)}
                  </span>
                )}
              </div>
            </div>

            {/* Date / countdown */}
            <div className="bg-gray-50 rounded-xl p-4">
              {user?.subscription?.status === 'trialing' && user.subscription.trialEndsAt ? (() => {
                const end = new Date(user.subscription.trialEndsAt);
                const days = Math.max(0, Math.ceil((end.getTime() - Date.now()) / 86_400_000));
                const isExpiring = days <= 5;
                return (
                  <>
                    <p className="text-xs text-gray-500 mb-0.5">Free trial ends</p>
                    <p className="font-bold text-gray-900 text-base">
                      {end.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    <p className={`text-xs mt-1 font-medium ${isExpiring ? 'text-red-500' : 'text-orange-500'}`}>
                      {days === 0 ? 'Expires today!' : `${days} day${days !== 1 ? 's' : ''} remaining`}
                    </p>
                    <button
                      onClick={() => router.push('/pricing/school')}
                      className="mt-3 text-xs font-semibold text-primary hover:underline"
                    >
                      {isExpiring ? '⚠️ Upgrade before expiry →' : 'Upgrade to a paid plan →'}
                    </button>
                  </>
                );
              })() : user?.subscription?.status === 'active' && user.subscription.expiresAt ? (
                <>
                  <p className="text-xs text-gray-500 mb-0.5">Subscription valid until</p>
                  <p className="font-bold text-gray-900 text-base">
                    {new Date(user.subscription.expiresAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </>
              ) : user?.subscription?.status === 'active' ? (
                <>
                  <p className="text-xs text-gray-500 mb-0.5">Plan</p>
                  <p className="font-bold text-gray-900 text-base">{formatPlanName(user.subscription.plan) ?? 'Active'}</p>
                  <button
                    onClick={() => router.push('/pricing/school')}
                    className="mt-2 text-xs font-semibold text-primary hover:underline"
                  >
                    Manage plan →
                  </button>
                </>
              ) : (
                <>
                  <p className="text-xs text-gray-500 mb-1">No active plan selected</p>
                  <button
                    onClick={() => router.push('/pricing/school')}
                    className="text-xs font-semibold text-primary hover:underline"
                  >
                    Choose a plan →
                  </button>
                </>
              )}
            </div>
          </Card>
        </div>

        {/* Students List */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Enrolled Students ({students.length})</h2>
          </div>

          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-sm font-semibold text-gray-600 uppercase tracking-wide">
                    <th className="p-4 px-6">Name</th>
                    <th className="p-4 px-6">Email</th>
                    <th className="p-4 px-6">Joined Date</th>
                    <th className="p-4 px-6">Last Active</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {students.length > 0 ? (
                    students.map((student) => (
                      <tr key={student._id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="p-4 px-6 font-medium text-gray-900">{student.name}</td>
                        <td className="p-4 px-6 text-gray-600">{student.email}</td>
                        <td className="p-4 px-6 text-gray-600">
                          {new Date(student.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-4 px-6 text-gray-600">
                          {student.lastActiveAt 
                            ? new Date(student.lastActiveAt).toLocaleString() 
                            : 'Never'}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="p-8 text-center text-gray-500">
                        No students have registered using your school code yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </Container>
  );
}
