'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Container, Button, Loading } from '@/components/ui';
import { useSubjects } from '@/lib/hooks/useOakData';
import { useAuth } from '@/contexts/AuthContext';
import { SignupPromptModal } from '@/components/modals/SignupPromptModal';

// Subject icon component with gradient
const SubjectIcon = ({ title }: { title: string }) => {
  const getIconAndColor = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('math')) {
      return { icon: '∑', gradient: 'from-blue-500 to-indigo-600' };
    } else if (lowerTitle.includes('english') || lowerTitle.includes('literacy')) {
      return { icon: '📖', gradient: 'from-emerald-500 to-teal-600' };
    } else if (lowerTitle.includes('science')) {
      return { icon: '🔬', gradient: 'from-purple-500 to-pink-600' };
    } else if (lowerTitle.includes('history')) {
      return { icon: '📜', gradient: 'from-amber-500 to-orange-600' };
    } else if (lowerTitle.includes('geography')) {
      return { icon: '🌍', gradient: 'from-cyan-500 to-blue-600' };
    } else if (lowerTitle.includes('art')) {
      return { icon: '🎨', gradient: 'from-pink-500 to-rose-600' };
    } else if (lowerTitle.includes('music')) {
      return { icon: '🎵', gradient: 'from-violet-500 to-purple-600' };
    } else if (lowerTitle.includes('computing') || lowerTitle.includes('computer')) {
      return { icon: '💻', gradient: 'from-slate-500 to-gray-700' };
    } else if (lowerTitle.includes('language') || lowerTitle.includes('french') || lowerTitle.includes('spanish')) {
      return { icon: '🗣️', gradient: 'from-red-500 to-orange-600' };
    } else if (lowerTitle.includes('pe') || lowerTitle.includes('physical')) {
      return { icon: '⚽', gradient: 'from-green-500 to-emerald-600' };
    } else {
      return { icon: '📚', gradient: 'from-primary to-secondary' };
    }
  };

  const { icon, gradient } = getIconAndColor(title);

  return (
    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-2xl shadow-lg`}>
      <span className="drop-shadow-sm">{icon}</span>
    </div>
  );
};

export default function KeyStagePage() {
  const params = useParams();
  const slug = params.slug as string;
  const { user } = useAuth();
  const [showSignupModal, setShowSignupModal] = useState(false);

  const { data: subjects, error, isLoading } = useSubjects({ keyStageSlug: slug });

  const handleSubjectClick = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      setShowSignupModal(true);
    }
  };

  const keyStageTitle = subjects?.[0]?.keyStageTitle || slug.toUpperCase();

  // Get gradient based on key stage
  const getStageGradient = () => {
    if (slug.includes('ks1') || slug.includes('1')) {
      return { from: 'from-blue-500', to: 'to-cyan-500', accent: 'blue' };
    } else if (slug.includes('ks2') || slug.includes('2')) {
      return { from: 'from-emerald-500', to: 'to-teal-500', accent: 'emerald' };
    } else if (slug.includes('ks3') || slug.includes('3')) {
      return { from: 'from-purple-500', to: 'to-pink-500', accent: 'purple' };
    } else if (slug.includes('ks4') || slug.includes('4')) {
      return { from: 'from-orange-500', to: 'to-red-500', accent: 'orange' };
    }
    return { from: 'from-primary', to: 'to-secondary', accent: 'primary' };
  };

  const stageGradient = getStageGradient();

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        {/* Animated loading state */}
        <div className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-white to-secondary/5" />
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-blob" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-blob delay-1000" />

          <div className="relative z-10 text-center">
            <Loading size="lg" />
            <p className="mt-4 text-gray-600 animate-pulse">Loading subjects...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <section className="relative px-5 md:px-16 py-16 md:py-28 overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-orange-50" />
          <div className="absolute top-20 left-10 w-64 h-64 bg-red-200/30 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-64 h-64 bg-orange-200/30 rounded-full blur-3xl animate-float delay-1000" />

          <Container size="xl" className="relative z-10 px-0">
            <div className="max-w-xl mx-auto text-center">
              <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center animate-bounce-subtle">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h2 className="font-serif font-bold text-3xl md:text-5xl leading-tight text-gray-900 mb-4 animate-slide-up">
                Error loading subjects
              </h2>
              <p className="text-base md:text-xl text-gray-600 leading-relaxed mb-8 animate-slide-up delay-100">
                Unable to load subjects for this key stage. Please try again later.
              </p>
              <Link href="/key-stages" className="animate-slide-up delay-200 inline-block">
                <Button className="rounded-xl shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-1 transition-all">
                  Back to Key Stages
                </Button>
              </Link>
            </div>
          </Container>
        </section>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with animated background */}
      <section className="relative px-5 md:px-16 pt-8 pb-16 md:pb-28 overflow-hidden">
        {/* Animated gradient background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${stageGradient.from}/5 via-white ${stageGradient.to}/5`} />

        {/* Mesh gradient overlay */}
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: `radial-gradient(circle at 20% 30%, rgba(var(--primary-rgb, 79, 70, 229), 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 80% 70%, rgba(var(--secondary-rgb, 16, 185, 129), 0.1) 0%, transparent 50%)`
        }} />

        {/* Floating shapes */}
        <div className={`absolute top-20 left-10 w-32 h-32 bg-gradient-to-br ${stageGradient.from}/20 ${stageGradient.to}/20 rounded-full blur-2xl animate-float`} />
        <div className={`absolute top-40 right-20 w-24 h-24 bg-gradient-to-br ${stageGradient.from}/20 ${stageGradient.to}/20 rounded-full blur-2xl animate-float delay-500`} />
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl animate-float delay-1000" />
        <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-amber-500/10 rounded-full blur-2xl animate-float delay-700" />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />

        {/* Breadcrumb */}
        <Container size="xl" className="relative z-10 px-0">
          <nav className="flex items-center gap-2 text-sm text-gray-600 animate-slide-up">
            <Link href="/" className="hover:text-primary transition-colors duration-300 hover:-translate-y-0.5 inline-block">
              Home
            </Link>
            <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/key-stages" className="hover:text-primary transition-colors duration-300 hover:-translate-y-0.5 inline-block">
              Key Stages
            </Link>
            <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900 font-medium">{keyStageTitle}</span>
          </nav>
        </Container>

        {/* Hero Content */}
        <Container size="xl" className="relative z-10 px-0 pt-12 md:pt-20">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${stageGradient.from}/10 ${stageGradient.to}/10 font-semibold text-sm mb-6 animate-slide-up`}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Subjects
            </span>

            {/* Title with gradient */}
            <h1 className="font-serif font-bold text-4xl md:text-7xl lg:text-[84px] leading-[1.1] tracking-tight mb-6 animate-slide-up delay-100">
              <span className={`bg-gradient-to-r ${stageGradient.from} ${stageGradient.to} bg-clip-text text-transparent`}>
                {keyStageTitle}
              </span>
            </h1>

            <p className="text-base md:text-xl text-gray-600 leading-relaxed mb-8 animate-slide-up delay-200">
              Explore all subjects available for {keyStageTitle}. Each subject contains multiple units
              with lessons, videos, and quizzes designed by expert educators.
            </p>

            {/* Stats row */}
            <div className="flex items-center justify-center gap-8 mb-8 animate-slide-up delay-300">
              <div className="text-center">
                <div className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${stageGradient.from} ${stageGradient.to} bg-clip-text text-transparent`}>
                  {subjects?.length || 0}
                </div>
                <div className="text-sm text-gray-500">Subjects</div>
              </div>
              <div className="w-px h-12 bg-gray-200" />
              <div className="text-center">
                <div className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${stageGradient.from} ${stageGradient.to} bg-clip-text text-transparent`}>
                  100+
                </div>
                <div className="text-sm text-gray-500">Units</div>
              </div>
              <div className="w-px h-12 bg-gray-200" />
              <div className="text-center">
                <div className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${stageGradient.from} ${stageGradient.to} bg-clip-text text-transparent`}>
                  1000+
                </div>
                <div className="text-sm text-gray-500">Lessons</div>
              </div>
            </div>

            {!user && (
              <div className="inline-flex items-center gap-2 px-5 py-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-700 text-sm animate-slide-up delay-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="font-medium">Sign up to access all lessons and track your progress</span>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Subjects Grid Section */}
      <section className="px-5 md:px-16 py-16 md:py-28 bg-gray-50/50">
        <Container size="xl" className="px-0">
          <div className="flex flex-col gap-12 md:gap-16">
            {/* Section Header */}
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6 animate-slide-up">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Browse
              </span>
              <h2 className="font-serif font-bold text-3xl md:text-5xl lg:text-[60px] leading-[1.2] tracking-tight text-gray-900 mb-6 animate-slide-up delay-100">
                Available subjects
              </h2>
              <p className="text-base md:text-xl text-gray-600 leading-relaxed animate-slide-up delay-200">
                Choose from {subjects?.length || 0} subjects designed to support {keyStageTitle} curriculum
              </p>
            </div>

            {/* Subjects Grid */}
            {subjects && subjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {subjects.map((subject, index) => {
                  // Check if this is KS4 Maths (Coming Soon)
                  const isKs4Maths = slug === 'ks4' && subject.slug === 'maths';

                  const cardContent = (
                    <div className={`group bg-white border border-gray-200 rounded-2xl p-8 ${isKs4Maths ? 'opacity-75' : 'hover:shadow-xl hover:-translate-y-2'} transition-all duration-300 h-full flex flex-col relative overflow-hidden`}>
                      {/* Coming Soon Banner for KS4 Maths */}
                      {isKs4Maths && (
                        <div className="absolute top-4 right-4 z-20">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Coming Soon
                          </span>
                        </div>
                      )}

                      {/* Gradient hover effect */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${stageGradient.from}/5 ${stageGradient.to}/5 opacity-0 ${!isKs4Maths ? 'group-hover:opacity-100' : ''} transition-opacity duration-300`} />

                      {/* Corner decoration */}
                      <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stageGradient.from}/10 ${stageGradient.to}/10 rounded-bl-[100px] opacity-0 ${!isKs4Maths ? 'group-hover:opacity-100' : ''} transition-opacity duration-300`} />

                      <div className="relative z-10">
                        {/* Subject Icon */}
                        <div className={`mb-5 transform ${!isKs4Maths ? 'group-hover:scale-110' : ''} transition-transform duration-300 ${isKs4Maths ? 'grayscale-[30%]' : ''}`}>
                          <SubjectIcon title={subject.title} />
                        </div>

                        {/* Subject Title */}
                        <h3 className={`font-serif font-bold text-xl md:text-2xl leading-tight mb-3 ${isKs4Maths ? 'text-gray-500' : 'text-gray-900 group-hover:text-primary'} transition-colors duration-300`}>
                          {subject.title}
                        </h3>

                        {/* Description */}
                        <p className="text-base text-gray-600 leading-relaxed mb-6 flex-grow">
                          {isKs4Maths
                            ? 'GCSE Maths content coming soon from Oak National Academy'
                            : `Explore units and lessons for ${subject.title}`
                          }
                        </p>

                        {/* Footer */}
                        <div className="flex items-center justify-between">
                          {isKs4Maths ? (
                            <div className="inline-flex items-center gap-2 font-medium text-gray-400">
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                              </svg>
                              Not available yet
                            </div>
                          ) : (
                            <div className="inline-flex items-center gap-2 font-medium text-gray-900 group-hover:text-primary transition-colors duration-300">
                              View units
                              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                              </svg>
                            </div>
                          )}

                          {!user && !isKs4Maths && (
                            <div className="flex items-center gap-1.5 text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-lg">
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                              </svg>
                              Login required
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );

                  // If KS4 Maths, don't wrap in Link (make it unclickable)
                  if (isKs4Maths) {
                    return (
                      <div
                        key={subject.slug}
                        className="animate-slide-up cursor-not-allowed"
                        style={{ animationDelay: `${100 + index * 50}ms` }}
                      >
                        {cardContent}
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={subject.slug}
                      href={`/subjects/${slug}/${subject.slug}`}
                      onClick={handleSubjectClick}
                      className="animate-slide-up"
                      style={{ animationDelay: `${100 + index * 50}ms` }}
                    >
                      {cardContent}
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gray-100 flex items-center justify-center">
                  <svg className="w-10 h-10 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <p className="text-base md:text-xl text-gray-600 mb-6">
                  No subjects found for this key stage.
                </p>
                <Link href="/key-stages">
                  <Button variant="outline" className="rounded-xl hover:-translate-y-1 transition-transform">
                    View all key stages
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Dramatic CTA Section for non-logged in users */}
      {!user && (
        <section className="px-5 md:px-16 py-16 md:py-28">
          <Container size="xl" className="px-0">
            <div className="relative rounded-3xl overflow-hidden">
              {/* Animated gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stageGradient.from} via-purple-600 ${stageGradient.to} animate-gradient-shift`} />

              {/* Mesh overlay */}
              <div className="absolute inset-0 opacity-30" style={{
                backgroundImage: `radial-gradient(circle at 30% 20%, rgba(255,255,255,0.3) 0%, transparent 40%),
                                 radial-gradient(circle at 70% 80%, rgba(255,255,255,0.2) 0%, transparent 40%)`
              }} />

              {/* Animated blobs */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-blob" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-blob delay-1000" />

              {/* Floating shapes */}
              <div className="absolute top-10 left-10 w-4 h-4 bg-white/20 rounded-full animate-float" />
              <div className="absolute top-20 right-20 w-6 h-6 bg-white/20 rounded-full animate-float delay-300" />
              <div className="absolute bottom-10 left-1/4 w-3 h-3 bg-white/30 rounded-full animate-float delay-700" />

              {/* Grid pattern */}
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                 linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: '40px 40px'
              }} />

              <div className="relative z-10 p-8 md:p-16 text-center text-white">
                <div className="max-w-3xl mx-auto">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white font-medium text-sm mb-6 animate-slide-up">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Free Access
                  </span>

                  <h2 className="font-serif font-bold text-3xl md:text-5xl lg:text-6xl leading-tight tracking-tight mb-6 animate-slide-up delay-100">
                    Unlock all lessons
                  </h2>
                  <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed animate-slide-up delay-200">
                    Create a free account to access all units and lessons for {keyStageTitle}.
                    Track your progress and start your learning journey today.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center animate-slide-up delay-300">
                    <Link href="/pricing">
                      <Button
                        size="lg"
                        className="rounded-xl shadow-lg shadow-black/20 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 !bg-white !text-primary hover:!bg-gray-100"
                      >
                        Start free trial
                        <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </Button>
                    </Link>
                    <Link href="/login">
                      <Button
                        size="lg"
                        className="rounded-xl border-2 !border-white/30 !bg-transparent !text-white hover:!bg-white hover:!text-primary backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
                      >
                        Log in
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Signup Prompt Modal */}
      <SignupPromptModal
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        title="Sign Up to View Units"
        message="Create a free account to access all units and lessons for this subject."
      />
    </div>
  );
}
