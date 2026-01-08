'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button, Container } from '@/components/ui';

export default function Home() {
  const features = [
    {
      tagline: 'Content',
      title: 'Quality content that matters',
      description: 'Lessons written by experienced educators and tested in classrooms',
      cta: 'Learn',
      href: '/about',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      gradient: 'from-blue-500/20 to-cyan-500/20',
    },
    {
      tagline: 'Resources',
      title: 'Free materials to get started',
      description: 'Access sample lessons and quizzes without paying anything upfront',
      cta: 'Start',
      href: '/pricing',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: 'from-green-500/20 to-emerald-500/20',
    },
    {
      tagline: 'Navigation',
      title: 'Find what you need in seconds',
      description: 'Intuitive design means less time searching and more time learning',
      cta: 'Browse',
      href: '/key-stages',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      gradient: 'from-purple-500/20 to-pink-500/20',
    },
    {
      tagline: 'Standards',
      title: 'Education that meets global benchmarks',
      description: 'Compete with confidence using curriculum aligned to international expectations',
      cta: 'Discover',
      href: '/about',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      gradient: 'from-orange-500/20 to-red-500/20',
    },
  ];

  const stats = [
    { value: '5,000+', label: 'Lessons Available' },
    { value: '4', label: 'Key Stages' },
    { value: '50+', label: 'Subjects' },
    { value: '100%', label: 'Curriculum Aligned' },
  ];

  const testimonials = [
    {
      quote: "Infoverse has completely transformed how my children approach learning. The UK-standard content gives us confidence.",
      author: "Sarah M.",
      role: "Parent of 2",
      avatar: "S",
    },
    {
      quote: "As an educator, I appreciate the quality and depth of the lessons. The curriculum alignment is exceptional.",
      author: "James O.",
      role: "Secondary Teacher",
      avatar: "J",
    },
    {
      quote: "My grades improved significantly after using Infoverse. The quizzes really help me understand the material.",
      author: "Amara K.",
      role: "Year 10 Student",
      avatar: "A",
    },
  ];

  const inspirationalQuotes = [
    {
      quote: "Give me a place to stand, and I shall move the earth.",
      author: "Archimedes",
      role: "Greek Mathematician & Physicist",
    },
    {
      quote: "Education is the most powerful weapon which you can use to change the world.",
      author: "Nelson Mandela",
      role: "Former President of South Africa",
    },
    {
      quote: "Live as if you were to die tomorrow. Learn as if you were to live forever.",
      author: "Mahatma Gandhi",
      role: "Leader of Indian Independence",
    },
    {
      quote: "The only true wisdom is in knowing you know nothing.",
      author: "Socrates",
      role: "Greek Philosopher",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {/* Hero Section - Full Screen Impact */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-background-dark to-primary-dark animate-gradient-shift" />

        {/* Mesh gradient overlay */}
        <div className="absolute inset-0 opacity-60">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/30 rounded-full blur-[120px] animate-blob" />
          <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-secondary/30 rounded-full blur-[100px] animate-blob delay-1000" />
          <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[80px] animate-float-slow" />
        </div>

        {/* Floating geometric shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-[10%] w-20 h-20 border-2 border-white/10 rounded-2xl rotate-12 animate-float" />
          <div className="absolute top-40 right-[15%] w-16 h-16 border-2 border-white/10 rounded-full animate-float-delay-1" />
          <div className="absolute bottom-32 left-[20%] w-24 h-24 border-2 border-white/10 rounded-3xl -rotate-12 animate-float-delay-2" />
          <div className="absolute top-1/2 right-[10%] w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl animate-spin-slow" />
          <div className="absolute bottom-40 right-[25%] w-8 h-8 bg-white/10 rounded-full animate-bounce-subtle" />
        </div>

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />

        {/* Content */}
        <Container size="xl" className="relative z-10 px-5 md:px-16">
          <div className="max-w-5xl mx-auto text-center">
            {/* Brand Logo and Name */}
            <div className="flex items-center justify-center gap-4 mb-8 animate-slide-up">
              <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden shadow-2xl shadow-white/20 border-2 border-white/30">
                <Image
                  src="/Transparent logo.png"
                  alt="Infoverse Logo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="text-left">
                <h2 className="font-bold text-3xl md:text-4xl text-white tracking-tight">
                  Infoverse
                </h2>
                <p className="text-white/70 text-sm md:text-base">Digital-Ed</p>
              </div>
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm mb-8 animate-slide-up delay-75">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              50+ Years of Combined Teaching Excellence
            </div>

            {/* Main Headline */}
            <h1 className="font-serif font-bold text-5xl md:text-7xl lg:text-[90px] leading-[1.05] tracking-tight text-white mb-8 animate-slide-up delay-100">
              Improve your grades with{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-gradient">UK-standard</span>
                <span className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-primary/50 to-secondary/50 blur-xl" />
              </span>{' '}
              lessons
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-white/80 leading-relaxed mb-12 max-w-3xl mx-auto animate-slide-up delay-200">
              Over 5,000+ curriculum-aligned lessons, expertly designed to boost academic performance.
              Access the same quality content trusted by UK schools.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center animate-slide-up delay-300">
              <Link href="/register">
                <Button
                  size="lg"
                  className="rounded-2xl px-10 py-4 text-lg shadow-2xl shadow-primary/40 hover:shadow-3xl hover:shadow-primary/50 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="relative z-10">Start free trial</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </Button>
              </Link>
              <Link href="/key-stages">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-2xl px-10 py-4 text-lg border-white/30 text-white hover:bg-white hover:text-gray-900 transition-all duration-300 backdrop-blur-sm"
                >
                  Browse lessons
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Button>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 mt-16 animate-slide-up delay-400">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-white/60">{stat.label}</div>
                </div>
              ))}
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

      {/* Trusted Section */}
      <section className="px-5 md:px-16 py-20 md:py-32 bg-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-500/5 to-pink-500/5 rounded-full blur-3xl" />

        <Container size="xl" className="px-0 relative">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-center">
            {/* Left Content */}
            <div className="flex-1 max-w-xl">
              <p className="font-semibold text-base text-primary mb-4 animate-slide-in-left">
                Expert-Led Learning
              </p>
              <h2 className="font-serif font-bold text-4xl md:text-6xl leading-[1.15] tracking-tight text-gray-900 mb-6">
                Built on{' '}
                <span className="text-gradient-static">proven</span>{' '}
                educational foundations
              </h2>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-6">
                Founded by <strong>Ebenezer Aladese</strong>, a dedicated educator with over 20 years of classroom experience.
                Our team of teachers brings a combined 50+ years of teaching expertise to every lesson.
              </p>
              <p className="text-base text-gray-500 leading-relaxed mb-8">
                Every lesson is carefully curated and aligned with UK national curriculum standards, ensuring students receive
                the quality education they deserve.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/key-stages">
                  <Button className="rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all">
                    Explore lessons
                    <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Button>
                </Link>
                <Link href="/about" className="inline-flex items-center gap-2 px-6 py-3 font-medium text-gray-900 hover:text-primary transition-colors group">
                  Meet our team
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Right Image/Card */}
            <div className="flex-1 w-full max-w-xl">
              <div className="relative">
                {/* Glowing background */}
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-secondary/20 to-purple-500/20 rounded-3xl blur-2xl animate-pulse-glow" />

                {/* Main card */}
                <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                  {/* Image placeholder with Infoverse branding */}
                  <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 via-secondary/5 to-purple-500/10 flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="relative w-24 h-24 mx-auto mb-4 rounded-2xl overflow-hidden shadow-xl">
                        <Image
                          src="/Transparent logo.png"
                          alt="Infoverse Logo"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">Infoverse</h3>
                      <p className="text-gray-500 font-medium">Expert-Crafted Lessons</p>
                    </div>
                  </div>

                  {/* Card footer */}
                  <div className="p-6 bg-white">
                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-2">
                        {['A', 'B', 'C'].map((letter, i) => (
                          <div
                            key={i}
                            className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm border-2 border-white"
                          >
                            {letter}
                          </div>
                        ))}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Join 10,000+ learners</p>
                        <p className="text-sm text-gray-500">Already improving their grades</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating badges */}
                <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 animate-float">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-green-600">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">Verified</p>
                      <p className="text-xs text-gray-500">UK Curriculum</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 animate-float-delay-1">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">5,000+</p>
                      <p className="text-xs text-gray-500">Active lessons</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="px-5 md:px-16 py-20 md:py-32 bg-gray-50 relative">
        {/* Background pattern */}
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
                Why Choose Us
              </p>
              <h2 className="font-serif font-bold text-4xl md:text-6xl leading-[1.15] tracking-tight text-gray-900 mb-6">
                What makes us{' '}
                <span className="text-gradient-static">different</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                Everything you need to succeed academically, all in one place
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 stagger-grid">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="group relative bg-white rounded-3xl overflow-hidden hover-lift border border-gray-100"
                >
                  {/* Gradient hover effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  <div className="relative p-8 md:p-10">
                    {/* Icon */}
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>

                    {/* Content */}
                    <p className="font-semibold text-sm text-primary mb-2 uppercase tracking-wider">
                      {feature.tagline}
                    </p>
                    <h3 className="font-serif font-bold text-2xl md:text-3xl leading-tight text-gray-900 mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6">
                      {feature.description}
                    </p>

                    {/* CTA Link */}
                    <Link
                      href={feature.href}
                      className="inline-flex items-center gap-2 font-semibold text-gray-900 group-hover:text-primary transition-colors"
                    >
                      {feature.cta}
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="px-5 md:px-16 py-20 md:py-32 bg-white relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/5 via-secondary/5 to-purple-500/5 rounded-full blur-3xl" />

        <Container size="xl" className="px-0 relative">
          <div className="flex flex-col gap-16 md:gap-20">
            {/* Section Header */}
            <div className="max-w-3xl mx-auto text-center">
              <p className="font-semibold text-base text-primary mb-4">
                Testimonials
              </p>
              <h2 className="font-serif font-bold text-4xl md:text-6xl leading-[1.15] tracking-tight text-gray-900 mb-6">
                Loved by learners
              </h2>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                See what our community has to say about their experience
              </p>
            </div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="group relative bg-white rounded-3xl p-8 hover-lift border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500"
                >
                  {/* Quote icon */}
                  <div className="absolute top-6 right-6 text-primary/10 group-hover:text-primary/20 transition-colors">
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>

                  {/* Quote */}
                  <p className="text-lg text-gray-600 leading-relaxed mb-8 relative z-10">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.author}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Inspirational Quotes Section */}
      <section className="px-5 md:px-16 py-20 md:py-32 bg-gray-50 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />

        {/* Large decorative quote mark */}
        <div className="absolute top-20 left-10 text-primary/5 pointer-events-none hidden lg:block">
          <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
        </div>

        <Container size="xl" className="px-0 relative">
          <div className="flex flex-col gap-16 md:gap-20">
            {/* Section Header */}
            <div className="max-w-3xl mx-auto text-center">
              <p className="font-semibold text-base text-primary mb-4">
                Words of Wisdom
              </p>
              <h2 className="font-serif font-bold text-4xl md:text-6xl leading-[1.15] tracking-tight text-gray-900 mb-6">
                Inspired by the{' '}
                <span className="text-gradient-static">greatest minds</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                Timeless wisdom from history&apos;s most influential thinkers
              </p>
            </div>

            {/* Quotes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {inspirationalQuotes.map((item, index) => (
                <div
                  key={index}
                  className="group relative bg-white rounded-3xl p-8 md:p-10 hover-lift border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500"
                >
                  {/* Gradient accent line */}
                  <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-primary via-secondary to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Quote icon */}
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>

                  {/* Quote */}
                  <blockquote className="font-serif text-xl md:text-2xl text-gray-900 leading-relaxed mb-6 italic">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg">
                      {item.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{item.author}</p>
                      <p className="text-sm text-gray-500">{item.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Final CTA Section */}
      <section className="px-5 md:px-16 py-20 md:py-32">
        <Container size="xl" className="px-0">
          <div className="relative rounded-[32px] overflow-hidden">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-background-dark animate-gradient-shift" />

            {/* Mesh gradient overlay */}
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
              {/* Infoverse Logo and Brand */}
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-xl overflow-hidden shadow-xl border-2 border-white/30">
                  <Image
                    src="/Transparent logo.png"
                    alt="Infoverse Logo"
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-2xl md:text-3xl font-bold text-white">Infoverse</span>
              </div>

              <h2 className="font-serif font-bold text-4xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight text-white mb-8 max-w-4xl mx-auto">
                Ready to transform your learning journey?
              </h2>
              <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
                Join thousands of students already improving their grades with UK-standard curriculum content.
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
                <Link href="/register">
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-2xl px-10 py-4 text-lg border-white/30 text-white hover:bg-white hover:text-gray-900 transition-all duration-300"
                  >
                    View Pricing
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
