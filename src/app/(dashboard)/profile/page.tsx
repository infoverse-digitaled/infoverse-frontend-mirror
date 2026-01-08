'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import authApiClient from '@/lib/api/auth-client';

export default function ProfilePage() {
  const { user } = useAuth();

  // Profile edit state
  const [name, setName] = useState(user?.name || '');
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameLoading, setNameLoading] = useState(false);
  const [nameError, setNameError] = useState('');
  const [nameSuccess, setNameSuccess] = useState('');

  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  const handleUpdateName = async () => {
    if (!name.trim() || name.trim().length < 2) {
      setNameError('Name must be at least 2 characters long.');
      return;
    }

    setNameLoading(true);
    setNameError('');
    setNameSuccess('');

    try {
      await authApiClient.patch('/auth/profile', { name: name.trim() });
      setNameSuccess('Name updated successfully!');
      setIsEditingName(false);
      // Refresh the page to update the context
      window.location.reload();
    } catch (err: any) {
      setNameError(err.response?.data?.error?.message || err.response?.data?.message || 'Failed to update name.');
    } finally {
      setNameLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError('All fields are required.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters long.');
      return;
    }

    setPasswordLoading(true);
    setPasswordError('');
    setPasswordSuccess('');

    try {
      await authApiClient.patch('/auth/change-password', {
        currentPassword,
        newPassword,
      });
      setPasswordSuccess('Password changed successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      const errorMsg = err.response?.data?.error?.message || err.response?.data?.message || 'Failed to change password.';
      setPasswordError(errorMsg);
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Profile Settings</h1>

      {/* Profile Information Card */}
      <Card className="mb-6 sm:mb-8 shadow-lg">
        <CardHeader className="border-b border-gray-100 px-4 sm:px-6">
          <CardTitle className="text-lg sm:text-xl">Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="space-y-4 sm:space-y-6">
            {/* Avatar and basic info */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary text-white flex items-center justify-center font-bold text-2xl sm:text-3xl flex-shrink-0">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="min-w-0">
                <p className="text-base sm:text-lg font-semibold text-gray-900 truncate">{user?.name}</p>
                <p className="text-sm sm:text-base text-gray-500 truncate">{user?.email}</p>
              </div>
            </div>

            {/* Edit Name Section */}
            <div className="pt-4 border-t border-gray-100">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Display Name
              </label>

              {isEditingName ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="Enter your name"
                  />
                  {nameError && (
                    <p className="text-red-500 text-sm">{nameError}</p>
                  )}
                  {nameSuccess && (
                    <p className="text-green-500 text-sm">{nameSuccess}</p>
                  )}
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <Button
                      onClick={handleUpdateName}
                      isLoading={nameLoading}
                      disabled={nameLoading}
                      className="w-full sm:w-auto"
                    >
                      Save
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsEditingName(false);
                        setName(user?.name || '');
                        setNameError('');
                      }}
                      disabled={nameLoading}
                      className="w-full sm:w-auto"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <span className="text-gray-900">{user?.name}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditingName(true)}
                  >
                    Edit
                  </Button>
                </div>
              )}
            </div>

            {/* Email (read-only) */}
            <div className="pt-4 border-t border-gray-100">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="flex items-center justify-between">
                <span className="text-gray-900">{user?.email}</span>
                <span className="text-xs text-gray-500">Cannot be changed</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Change Password Card */}
      <Card className="shadow-lg">
        <CardHeader className="border-b border-gray-100 px-4 sm:px-6">
          <CardTitle className="text-lg sm:text-xl">Change Password</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Password
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Enter current password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Enter new password"
              />
              <p className="text-xs text-gray-500 mt-1">
                Must be at least 8 characters with uppercase, lowercase, number, and special character.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Confirm new password"
              />
            </div>

            {passwordError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                {passwordError}
              </div>
            )}

            {passwordSuccess && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-xl text-green-600 text-sm">
                {passwordSuccess}
              </div>
            )}

            <Button
              type="submit"
              isLoading={passwordLoading}
              disabled={passwordLoading}
              className="w-full sm:w-auto"
            >
              Change Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
