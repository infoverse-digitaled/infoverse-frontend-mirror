'use client';

import Link from 'next/link';
import { Container, Button, Loading } from '@/components/ui';
import { useKeyStages } from '@/lib/hooks/useOakData';

const featuresData = [
  {
    title: 'Curriculum-aligned',
    description: 'All content mapped to UK national curriculum standards for consistent, quality learning.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    title: 'Expert-designed',
    description: 'Lessons crafted by educators with 50+ years of combined teaching experience.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Interactive quizzes',
    description: 'Test understanding with built-in quizzes after every lesson.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    gradient: 'from-purple-500 to-pink-500',
  },
];

const stageColors = [
  { bg: 'from-blue-500 to-cyan-500', light: 'bg-blue-50', text: 'text-blue-600' },
  { bg: 'from-green-500 to-emerald-500', light: 'bg-green-50', text: 'text-green-600' },
  { bg: 'from-purple-500 to-pink-500', light: 'bg-purple-50', text: 'text-purple-600' },
  { bg: 'from-orange-500 to-red-500', light: 'bg-orange-50', text: 'text-orange-600' },
];

export default function KeyStagesPage() {
  const { data: keyStages, error, isLoading } = useKeyStages();

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loading size="lg" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <section className="px-5 md:px-16 py-16 md:py-28">
          <Container size="xl" className="px-0">
            <div className="max-w-xl mx-auto text-center">
              <h2 className="font-serif font-bold text-3xl md:text-5xl leading-tight text-gray-900 mb-4">
                Error loading key stages
              </h2>
              <p className="text-base md:text-xl text-gray-600 leading-relaxed mb-8">
                Unable to load key stages. Please try again later.
              </p>
              <Link href="/">
                <Button className="rounded-xl">Return home</Button>
              </Link>
            </div>
          </Container>
        </section>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-background-dark to-primary-dark animate-gradient-shift" />

        {/* Mesh gradient overlay */}
        <div className="absolute inset-0 opacity-50">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/30 rounded-full blur-[120px] animate-blob" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-secondary/30 rounded-full blur-[100px] animate-blob delay-1000" />
          <div className="absolute top-1/2 right-0 w-[300px] h-[300px] bg-purple-500/20 rounded-full blur-[80px] animate-float-slow" />
        </div>

        {/* Floating shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-[10%] w-20 h-20 border-2 border-white/10 rounded-2xl rotate-12 animate-float" />
          <div className="absolute top-40 right-[15%] w-16 h-16 border-2 border-white/10 rounded-full animate-float-delay-1" />
          <div className="absolute bottom-32 left-[20%] w-24 h-24 border-2 border-white/10 rounded-3xl -rotate-12 animate-float-delay-2" />
        </div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />

        {/* Content */}
        <Container size="xl" className="relative z-10 px-5 md:px-16">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm mb-8 animate-slide-up">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              UK National Curriculum
            </div>

            {/* Main Headline */}
            <h1 className="font-serif font-bold text-5xl md:text-7xl lg:text-[90px] leading-[1.05] tracking-tight text-white mb-8 animate-slide-up delay-100">
              Explore{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-gradient">Key Stages</span>
                <span className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-primary/50 to-secondary/50 blur-xl" />
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-white/80 leading-relaxed mb-12 max-w-3xl mx-auto animate-slide-up delay-200">
              Over 5,000+ curriculum-aligned lessons designed by expert educators.
              Select a key stage to begin your learning journey.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center animate-slide-up delay-300">
              <Link href="#stages">
                <Button
                  size="lg"
                  className="rounded-2xl px-10 py-4 text-lg shadow-2xl shadow-primary/40 hover:shadow-primary/50 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="relative z-10">Browse stages</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-2xl px-10 py-4 text-lg border-white/30 text-white hover:bg-white hover:text-gray-900 transition-all duration-300 backdrop-blur-sm"
                >
                  Learn more
                </Button>
              </Link>
            </div>
          </div>
        </Container>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-white/60 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Key Stages Grid Section */}
      <section id="stages" className="px-5 md:px-16 py-20 md:py-32 bg-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-500/5 to-pink-500/5 rounded-full blur-3xl" />

        <Container size="xl" className="px-0 relative">
          <div className="flex flex-col gap-16 md:gap-20">
            {/* Section Header */}
            <div className="max-w-3xl mx-auto text-center">
              <p className="font-semibold text-base text-primary mb-4">
                Choose Your Level
              </p>
              <h2 className="font-serif font-bold text-4xl md:text-6xl leading-[1.15] tracking-tight text-gray-900 mb-6">
                Select a{' '}
                <span className="text-gradient-static">key stage</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                Each key stage is tailored to specific age groups and learning objectives
              </p>
            </div>

            {/* Key Stages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {keyStages?.map((stage, index) => {
                const color = stageColors[index % stageColors.length];
                return (
                  <Link key={stage.slug} href={`/key-stages/${stage.slug}`}>
                    <div className="group relative bg-white rounded-3xl p-8 hover-lift border border-gray-100 h-full flex flex-col overflow-hidden">
                      {/* Gradient background on hover */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${color.bg} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                      {/* Stage Badge */}
                      <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${color.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <span className="font-serif font-bold text-3xl text-white">{stage.shortCode}</span>
                      </div>

                      {/* Stage Title */}
                      <h3 className="font-serif font-bold text-2xl md:text-3xl leading-tight text-gray-900 mb-3">
                        {stage.title}
                      </h3>

                      {/* Description */}
                      <p className="text-base text-gray-600 leading-relaxed mb-6 flex-grow">
                        Explore subjects and lessons for {stage.title}
                      </p>

                      {/* Link */}
                      <div className="inline-flex items-center gap-2 font-semibold text-gray-900 group-hover:text-primary transition-colors">
                        View subjects
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="px-5 md:px-16 py-20 md:py-32 bg-gray-50 relative">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, gray 1px, transparent 0)`,
            backgroundSize: '24px 24px',
          }}
        />

        <Container size="xl" className="px-0 relative">
          <div className="flex flex-col gap-16 md:gap-20">
            {/* Section Header */}
            <div className="max-w-3xl mx-auto text-center">
              <p className="font-semibold text-base text-primary mb-4">
                What You&apos;ll Find
              </p>
              <h2 className="font-serif font-bold text-4xl md:text-6xl leading-[1.15] tracking-tight text-gray-900 mb-6">
                Designed for{' '}
                <span className="text-gradient-static">success</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                Every lesson is created to help students achieve their potential
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {featuresData.map((feature, index) => (
                <div
                  key={index}
                  className="group relative bg-white rounded-3xl p-8 hover-lift border border-gray-100 overflow-hidden"
                >
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>

                  <h3 className="font-serif font-bold text-xl md:text-2xl leading-tight text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Inspirational Quote Banner */}
      <section className="px-5 md:px-16 py-16 md:py-24 bg-white">
        <Container size="xl" className="px-0">
          <div className="max-w-4xl mx-auto text-center">
            <div className="relative">
              {/* Decorative quote marks */}
              <div className="absolute -top-4 left-0 text-primary/10">
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              <blockquote className="font-serif text-2xl md:text-4xl text-gray-900 leading-relaxed italic px-8">
                &ldquo;The beautiful thing about learning is that no one can take it away from you.&rdquo;
              </blockquote>

              <div className="mt-6 flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                  BB
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">B.B. King</p>
                  <p className="text-sm text-gray-500">Legendary Blues Musician</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="px-5 md:px-16 py-20 md:py-32">
        <Container size="xl" className="px-0">
          <div className="relative rounded-[32px] overflow-hidden">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-background-dark animate-gradient-shift" />

            {/* Mesh overlay */}
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] animate-blob" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-[100px] animate-blob delay-1000" />
            </div>

            {/* Grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
              }}
            />

            {/* Content */}
            <div className="relative z-10 p-10 md:p-20 text-center">
              <h2 className="font-serif font-bold text-4xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight text-white mb-8 max-w-4xl mx-auto">
                Start learning today
              </h2>
              <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
                Join thousands of students accessing world-class UK education.
                Sign up for free to unlock all lessons.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/register">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="rounded-2xl px-10 py-4 text-lg shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300"
                  >
                    Get Started Free
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-2xl px-10 py-4 text-lg border-white/30 text-white hover:bg-white hover:text-gray-900 transition-all duration-300"
                  >
                    Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
