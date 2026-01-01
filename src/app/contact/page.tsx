'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Container, Button } from '@/components/ui';
import { apiClient } from '@/lib/api/client';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  helpWith: string;
  userType: string;
  message: string;
  agreeToTerms: boolean;
}

const userTypes = [
  'Student',
  'Parent',
  'Teacher',
  'School administrator',
  'Educational partner',
  'Other',
];

const helpOptions = [
  { value: '', label: 'Select one' },
  { value: 'general', label: 'General inquiry' },
  { value: 'support', label: 'Technical support' },
  { value: 'billing', label: 'Billing question' },
  { value: 'partnership', label: 'Partnership opportunity' },
  { value: 'feedback', label: 'Feedback' },
];

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    helpWith: '',
    userType: '',
    message: '',
    agreeToTerms: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      userType: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreeToTerms) {
      setError('Please agree to the terms of service');
      return;
    }
    setIsSubmitting(true);
    setError(null);

    try {
      await apiClient.post('/public/contact', {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        subject: formData.helpWith || 'General inquiry',
        message: `User type: ${formData.userType}\nPhone: ${formData.phone || 'Not provided'}\n\n${formData.message}`,
      });
      setSubmitted(true);
    } catch (err: any) {
      const errorMsg = err.response?.data?.error || 'Failed to send message. Please try again.';
      setError(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col min-h-screen">
        <section className="px-5 md:px-16 py-16 md:py-28">
          <Container size="xl" className="px-0">
            <div className="max-w-xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="font-serif font-bold text-3xl md:text-5xl leading-tight text-gray-900 mb-4">
                Message sent!
              </h2>
              <p className="text-base md:text-xl text-gray-600 leading-relaxed mb-8">
                Thank you for reaching out. We&apos;ll get back to you within 24 hours.
              </p>
              <Button onClick={() => setSubmitted(false)} className="rounded-xl">
                Send another message
              </Button>
            </div>
          </Container>
        </section>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Header Section */}
      <section className="px-5 md:px-16 py-16 md:py-28">
        <Container size="xl" className="px-0">
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-semibold text-base text-gray-900 mb-4">
              Support
            </p>
            <h1 className="font-serif font-bold text-4xl md:text-7xl lg:text-[84px] leading-[1.1] tracking-tight text-gray-900 mb-6">
              Get in touch
            </h1>
            <p className="text-base md:text-xl text-gray-600 leading-relaxed mb-8">
              We&apos;re here to help you with any questions, support needs, or partnership inquiries.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="#contact-form">
                <Button size="lg" className="rounded-xl">
                  Contact
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg" className="rounded-xl">
                  Learn
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Connect Section with Contact Info */}
      <section className="px-5 md:px-16 py-16 md:py-28">
        <Container size="xl" className="px-0">
          <div className="flex flex-col gap-12 md:gap-20">
            {/* Two Column Layout */}
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
              {/* Left - Section Header */}
              <div className="flex-1">
                <p className="font-semibold text-base text-gray-900 mb-4">
                  Reach
                </p>
                <h2 className="font-serif font-bold text-3xl md:text-5xl lg:text-[60px] leading-[1.2] tracking-tight text-gray-900 mb-6">
                  Connect with us
                </h2>
                <p className="text-base md:text-xl text-gray-600 leading-relaxed">
                  Multiple ways to get in touch with our support team
                </p>
              </div>

              {/* Right - Contact Info */}
              <div className="flex-1 lg:w-[500px] lg:flex-none">
                <div className="flex flex-col gap-6 py-2">
                  {/* Email */}
                  <div className="flex gap-4 items-start">
                    <svg className="w-6 h-6 text-gray-900 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div className="flex-1">
                      <h3 className="font-serif font-bold text-lg md:text-[26px] leading-[1.4] tracking-tight text-gray-900 mb-2">
                        Email
                      </h3>
                      <a
                        href="mailto:support@infoversedigitaleducation.net"
                        className="text-lg text-gray-900 underline hover:text-primary transition-colors"
                      >
                        support@infoversedigitaleducation.net
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex gap-4 items-start">
                    <svg className="w-6 h-6 text-gray-900 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div className="flex-1">
                      <h3 className="font-serif font-bold text-lg md:text-[26px] leading-[1.4] tracking-tight text-gray-900 mb-2">
                        Phone
                      </h3>
                      <a
                        href="tel:+2349032840916"
                        className="text-lg text-gray-900 underline hover:text-primary transition-colors"
                      >
                        +234 903 284 0916
                      </a>
                    </div>
                  </div>

                  {/* Office */}
                  <div className="flex gap-4 items-start">
                    <svg className="w-6 h-6 text-gray-900 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div className="flex-1">
                      <h3 className="font-serif font-bold text-lg md:text-[26px] leading-[1.4] tracking-tight text-gray-900 mb-2">
                        Office
                      </h3>
                      <p className="text-lg text-gray-900">
                        Lagos, Nigeria and serving globally
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Full Width Image */}
            <div className="aspect-[16/9] md:aspect-[1280/720] rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-gray-100" />
          </div>
        </Container>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="px-5 md:px-16 py-16 md:py-28">
        <Container size="xl" className="px-0">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            {/* Left - Info */}
            <div className="flex-1">
              <p className="font-semibold text-base text-gray-900 mb-4">
                Message
              </p>
              <h2 className="font-serif font-bold text-3xl md:text-5xl lg:text-[60px] leading-[1.2] tracking-tight text-gray-900 mb-6">
                Send your inquiry
              </h2>
              <p className="text-base md:text-xl text-gray-600 leading-relaxed mb-8">
                Tell us what&apos;s on your mind
              </p>

              {/* Contact Info Compact */}
              <div className="flex flex-col gap-4 py-2">
                <div className="flex gap-4 items-center">
                  <svg className="w-6 h-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:support@infoversedigitaleducation.net" className="text-lg text-gray-900 underline hover:text-primary transition-colors">
                    support@infoversedigitaleducation.net
                  </a>
                </div>
                <div className="flex gap-4 items-center">
                  <svg className="w-6 h-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href="tel:+2349032840916" className="text-lg text-gray-900 underline hover:text-primary transition-colors">
                    +234 903 284 0916
                  </a>
                </div>
                <div className="flex gap-4 items-center">
                  <svg className="w-6 h-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-lg text-gray-900">
                    Lagos, Nigeria and serving globally
                  </p>
                </div>
              </div>
            </div>

            {/* Right - Form */}
            <div className="flex-1">
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                    {error}
                  </div>
                )}

                {/* First Name / Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="firstName" className="text-base text-gray-900">
                      First name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-0 py-2 border-b border-gray-200 bg-transparent focus:outline-none focus:border-gray-900 transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="lastName" className="text-base text-gray-900">
                      Last name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-0 py-2 border-b border-gray-200 bg-transparent focus:outline-none focus:border-gray-900 transition-colors"
                    />
                  </div>
                </div>

                {/* Email / Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-base text-gray-900">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-0 py-2 border-b border-gray-200 bg-transparent focus:outline-none focus:border-gray-900 transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="phone" className="text-base text-gray-900">
                      Phone number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-0 py-2 border-b border-gray-200 bg-transparent focus:outline-none focus:border-gray-900 transition-colors"
                    />
                  </div>
                </div>

                {/* What can we help with? */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="helpWith" className="text-base text-gray-900">
                    What can we help with?
                  </label>
                  <select
                    id="helpWith"
                    name="helpWith"
                    value={formData.helpWith}
                    onChange={handleChange}
                    required
                    className="w-full px-0 py-2 border-b border-gray-200 bg-transparent focus:outline-none focus:border-gray-900 transition-colors appearance-none cursor-pointer"
                  >
                    {helpOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* User Type Radio Buttons */}
                <div className="flex flex-col gap-4 py-4">
                  <p className="text-base text-gray-900">
                    How would you describe yourself?
                  </p>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                    {userTypes.map((type) => (
                      <label key={type} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="userType"
                          value={type}
                          checked={formData.userType === type}
                          onChange={() => handleRadioChange(type)}
                          className="w-[18px] h-[18px] border border-gray-200 rounded-full appearance-none checked:border-4 checked:border-primary cursor-pointer"
                        />
                        <span className="text-base text-gray-900">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-base text-gray-900">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Share your question or feedback"
                    className="w-full px-0 py-3 border-b border-gray-200 bg-transparent focus:outline-none focus:border-gray-900 transition-colors resize-none placeholder:text-gray-400"
                  />
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-center gap-2 pb-4">
                  <input
                    type="checkbox"
                    id="agreeToTerms"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    className="w-[18px] h-[18px] border border-gray-200 rounded appearance-none checked:bg-primary checked:border-primary cursor-pointer"
                  />
                  <label htmlFor="agreeToTerms" className="text-sm md:text-base text-gray-900 cursor-pointer">
                    I agree to the terms of service
                  </label>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  className="rounded-xl w-fit"
                >
                  Send
                </Button>
              </form>
            </div>
          </div>
        </Container>
      </section>

      {/* Inspirational Quote Section */}
      <section className="px-5 md:px-16 py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white">
        <Container size="xl" className="px-0">
          <div className="max-w-3xl mx-auto text-center">
            <div className="relative">
              {/* Decorative quote marks */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-primary/10">
                <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              <blockquote className="font-serif text-2xl md:text-4xl text-gray-900 leading-relaxed italic pt-10 mb-8">
                &ldquo;Alone we can do so little; together we can do so much.&rdquo;
              </blockquote>

              <div className="flex items-center justify-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xl">
                  HK
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900 text-lg">Helen Keller</p>
                  <p className="text-gray-500">Author & Activist</p>
                </div>
              </div>

              {/* Decorative gradient line */}
              <div className="mt-10 w-32 h-1 bg-gradient-to-r from-primary via-secondary to-purple-500 rounded-full mx-auto" />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
