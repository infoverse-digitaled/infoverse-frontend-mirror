'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { apiClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/config/api.config';

interface BugReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const REPORT_TYPES = [
  { value: 'bug', label: 'Bug' },
  { value: 'feature', label: 'Feature Request' },
  { value: 'improvement', label: 'Improvement' },
  { value: 'general', label: 'General Feedback' },
] as const;

export function BugReportModal({ isOpen, onClose }: BugReportModalProps) {
  const { user } = useAuth();
  const [type, setType] = useState<string>('bug');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState<number>(0);
  const [email, setEmail] = useState(user?.email || '');
  const [website, setWebsite] = useState(''); // honeypot
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const resetForm = () => {
    setType('bug');
    setMessage('');
    setRating(0);
    setEmail(user?.email || '');
    setWebsite('');
    setError('');
    setSubmitted(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      setError('Please enter a message.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await apiClient.post(API_ENDPOINTS.bugReport, {
        type,
        message: message.trim(),
        rating: rating || undefined,
        email: email.trim() || undefined,
        userId: user?.id,
        page: window.location.href,
        userAgent: navigator.userAgent,
        website, // honeypot
      });

      setSubmitted(true);
      setTimeout(handleClose, 3000);
    } catch (err: any) {
      const msg = err.response?.data?.error || 'Failed to submit. Please try again.';
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-orange-500 to-red-500 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-white">Report & Feedback</h2>
          </div>
          <button onClick={handleClose} className="text-white/80 hover:text-white transition-colors p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center">
            <svg className="w-16 h-16 mx-auto mb-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Thank you!</h3>
            <p className="text-gray-600">Your feedback has been submitted successfully.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            {/* Type selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <div className="flex flex-wrap gap-2">
                {REPORT_TYPES.map((t) => (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => setType(t.value)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      type === t.value
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Star rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rating <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star === rating ? 0 : star)}
                    className="p-0.5 transition-transform hover:scale-110"
                  >
                    <svg
                      className={`w-7 h-7 ${star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us what happened or what you'd like to see..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 resize-none"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-gray-400 font-normal">(optional, for follow-up)</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
              />
            </div>

            {/* Honeypot - hidden from users, visible to bots */}
            <div className="absolute -left-[9999px]" aria-hidden="true" tabIndex={-1}>
              <input
                type="text"
                name="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-100 rounded-xl p-3 text-red-600 text-sm">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting || !message.trim()}
              className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium rounded-xl hover:from-orange-600 hover:to-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default BugReportModal;
