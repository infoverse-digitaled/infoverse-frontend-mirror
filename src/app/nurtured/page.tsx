'use client';

import Link from 'next/link';
import { Container, Button } from '@/components/ui';

const benefitsData = [
  { text: 'Research-backed strategies proven to improve outcomes', icon: '📊' },
  { text: 'Hands-on practice and real-world application', icon: '🎯' },
  { text: 'Bespoke programmes tailored to your needs', icon: '✨' },
  { text: 'Expert facilitators with extensive teaching experience', icon: '👨‍🏫' },
  { text: 'Flexible delivery formats (in-person, online, hybrid)', icon: '🔄' },
  { text: 'Ongoing support and follow-up coaching', icon: '🤝' },
  { text: 'Measurable impact on staff performance', icon: '📈' },
  { text: 'Professional certification and CPD credits', icon: '🏆' },
];

const focusAreasData = [
  {
    title: 'Effective Teaching & Learning',
    description: 'Evidence-based pedagogical approaches that enhance student engagement and learning outcomes.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Digital Pedagogy & AI',
    description: 'Integrating technology and artificial intelligence tools effectively into modern teaching practice.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Classroom Management',
    description: 'Proven techniques for creating positive, productive learning environments that motivate students.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    gradient: 'from-orange-500 to-red-500',
  },
  {
    title: 'Inclusive Instruction',
    description: 'Meeting diverse learning needs and ensuring every student can access and excel in the curriculum.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    title: 'Assessment for Learning',
    description: 'Using formative assessment strategies to drive improvement and inform teaching decisions.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    gradient: 'from-indigo-500 to-purple-500',
  },
  {
    title: 'Leadership Development',
    description: 'Building capacity for effective leadership and collaborative professional cultures.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    gradient: 'from-yellow-500 to-orange-500',
  },
];

const projectsData = [
  {
    title: 'Strategic Development',
    description: 'Comprehensive school improvement planning aligned with your vision, focusing on sustainable growth.',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: 'Branding & Positioning',
    description: 'Develop a compelling identity that reflects your values and distinguishes your school.',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
  {
    title: 'Customised Consultancy',
    description: 'Tailored solutions addressing your specific challenges, from curriculum design to operations.',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

const stats = [
  { value: '500+', label: 'Educators Trained' },
  { value: '50+', label: 'Schools Partnered' },
  { value: '95%', label: 'Satisfaction Rate' },
  { value: '10+', label: 'Years Experience' },
];

export default function NurturedPage() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {/* Hero Section - Full Impact */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-background-dark to-primary-dark animate-gradient-shift" />

        {/* Mesh gradient overlay */}
        <div className="absolute inset-0 opacity-50">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/30 rounded-full blur-[120px] animate-blob" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/30 rounded-full blur-[100px] animate-blob delay-1000" />
          <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[80px] animate-float-slow" />
        </div>

        {/* Floating shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-[15%] w-20 h-20 border-2 border-white/10 rounded-2xl rotate-12 animate-float" />
          <div className="absolute bottom-40 left-[10%] w-16 h-16 border-2 border-white/10 rounded-full animate-float-delay-1" />
          <div className="absolute top-1/3 left-[5%] w-24 h-24 border-2 border-white/10 rounded-3xl -rotate-12 animate-float-delay-2" />
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
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              Professional Development Excellence
            </div>

            {/* Main Headline */}
            <h1 className="font-serif font-bold text-5xl md:text-7xl lg:text-[90px] leading-[1.05] tracking-tight text-white mb-8 animate-slide-up delay-100">
              The{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-gradient">NurturED</span>
                <span className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-secondary/50 to-primary/50 blur-xl" />
              </span>{' '}
              Programme
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-white/80 leading-relaxed mb-12 max-w-3xl mx-auto animate-slide-up delay-200">
              Empowering schools through world-class professional development.
              Transform teaching, enhance leadership, and drive meaningful student outcomes.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center animate-slide-up delay-300">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="rounded-2xl px-10 py-4 text-lg shadow-2xl shadow-primary/40 hover:shadow-primary/50 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="relative z-10">Book consultation</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </Button>
              </Link>
              <Link href="#services">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-2xl px-10 py-4 text-lg border-white/30 text-white hover:bg-white hover:text-gray-900 transition-all duration-300 backdrop-blur-sm"
                >
                  Explore services
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 mt-16 animate-slide-up delay-400">
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

      {/* Staff Training Section */}
      <section id="services" className="px-5 md:px-16 py-20 md:py-32 bg-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-500/5 to-pink-500/5 rounded-full blur-3xl" />

        <Container size="xl" className="px-0 relative">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-center">
            {/* Content */}
            <div className="flex-1 max-w-xl">
              <p className="font-semibold text-base text-primary mb-4">
                Training Excellence
              </p>
              <h2 className="font-serif font-bold text-4xl md:text-6xl leading-[1.15] tracking-tight text-gray-900 mb-6">
                Staff training &{' '}
                <span className="text-gradient-static">development</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
                We provide bespoke training programmes for teachers, school leaders, and support staff.
                Our sessions blend research-backed strategies with hands-on practice to improve
                classroom effectiveness and student outcomes.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button className="rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all">
                    Get started
                    <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Button>
                </Link>
                <Link href="#focus-areas" className="inline-flex items-center gap-2 px-6 py-3 font-medium text-gray-900 hover:text-primary transition-colors group">
                  View focus areas
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Visual Card */}
            <div className="flex-1 w-full max-w-xl">
              <div className="relative">
                {/* Glowing background */}
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-secondary/20 to-purple-500/20 rounded-3xl blur-2xl animate-pulse-glow" />

                {/* Main card */}
                <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                  <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 via-secondary/5 to-purple-500/10 flex items-center justify-center p-8">
                    <div className="text-center">
                      <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white animate-float">
                        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <p className="text-xl font-semibold text-gray-900 mb-2">Professional Development</p>
                      <p className="text-gray-500">Tailored to your school&apos;s needs</p>
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
                      <p className="font-semibold text-gray-900 text-sm">CPD Certified</p>
                      <p className="text-xs text-gray-500">Accredited training</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 animate-float-delay-1">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">Expert Led</p>
                      <p className="text-xs text-gray-500">Experienced educators</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Benefits Section */}
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
            {/* Header */}
            <div className="max-w-3xl mx-auto text-center">
              <p className="font-semibold text-base text-primary mb-4">
                Why NurturED
              </p>
              <h2 className="font-serif font-bold text-4xl md:text-6xl leading-[1.15] tracking-tight text-gray-900 mb-6">
                Programme{' '}
                <span className="text-gradient-static">benefits</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                Comprehensive development that delivers measurable results
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 stagger-grid">
              {benefitsData.map((benefit, index) => (
                <div
                  key={index}
                  className="group flex items-center gap-4 p-6 bg-white border border-gray-100 rounded-2xl hover-lift hover:border-primary/20 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-base md:text-lg text-gray-900 font-medium">{benefit.text}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Focus Areas Section */}
      <section id="focus-areas" className="px-5 md:px-16 py-20 md:py-32 bg-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/5 via-secondary/5 to-purple-500/5 rounded-full blur-3xl" />

        <Container size="xl" className="px-0 relative">
          <div className="flex flex-col gap-16 md:gap-20">
            {/* Header */}
            <div className="max-w-3xl mx-auto text-center">
              <p className="font-semibold text-base text-primary mb-4">
                Our Expertise
              </p>
              <h2 className="font-serif font-bold text-4xl md:text-6xl leading-[1.15] tracking-tight text-gray-900 mb-6">
                Training{' '}
                <span className="text-gradient-static">focus areas</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                Comprehensive professional development across all aspects of modern education
              </p>
            </div>

            {/* Focus Areas Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {focusAreasData.map((area, index) => (
                <div
                  key={index}
                  className="group relative bg-white rounded-3xl p-8 hover-lift border border-gray-100 overflow-hidden"
                >
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${area.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${area.gradient} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {area.icon}
                  </div>

                  {/* Content */}
                  <h3 className="font-serif font-bold text-xl md:text-2xl leading-tight text-gray-900 mb-4">
                    {area.title}
                  </h3>
                  <p className="text-base text-gray-600 leading-relaxed mb-6">
                    {area.description}
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 font-semibold text-gray-900 group-hover:text-primary transition-colors"
                  >
                    Learn more
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Development Projects Section */}
      <section className="px-5 md:px-16 py-20 md:py-32 bg-gray-50">
        <Container size="xl" className="px-0">
          <div className="flex flex-col gap-16 md:gap-20">
            {/* Header */}
            <div className="max-w-3xl mx-auto text-center">
              <p className="font-semibold text-base text-primary mb-4">
                Strategic Projects
              </p>
              <h2 className="font-serif font-bold text-4xl md:text-6xl leading-[1.15] tracking-tight text-gray-900 mb-6">
                Development{' '}
                <span className="text-gradient-static">projects</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                Transformational initiatives tailored to your school&apos;s vision
              </p>
            </div>

            {/* Projects Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {projectsData.map((project, index) => (
                <div
                  key={index}
                  className="group relative bg-white rounded-3xl p-8 hover-lift border border-gray-100"
                >
                  {/* Icon */}
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                    {project.icon}
                  </div>

                  <h3 className="font-serif font-bold text-2xl md:text-3xl leading-tight text-gray-900 mb-4">
                    {project.title}
                  </h3>
                  <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6">
                    {project.description}
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 font-semibold text-gray-900 group-hover:text-primary transition-colors"
                  >
                    Get started
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Educator's Wisdom Quote */}
      <section className="px-5 md:px-16 py-16 md:py-24 bg-gray-50">
        <Container size="xl" className="px-0">
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-white rounded-3xl p-10 md:p-16 shadow-lg border border-gray-100">
              {/* Decorative quote marks */}
              <div className="absolute top-6 left-6 text-primary/10">
                <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              <div className="relative text-center">
                <blockquote className="font-serif text-2xl md:text-4xl text-gray-900 leading-relaxed italic mb-8">
                  &ldquo;A good teacher can inspire hope, ignite the imagination, and instill a love of learning.&rdquo;
                </blockquote>

                <div className="flex items-center justify-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xl">
                    BC
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900 text-lg">Brad Henry</p>
                    <p className="text-gray-500">Former Governor of Oklahoma</p>
                  </div>
                </div>
              </div>

              {/* Decorative gradient line */}
              <div className="absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r from-primary via-secondary to-purple-500 rounded-full" />
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
                Transform your school today
              </h2>
              <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
                Whether you need targeted staff training or a comprehensive school development project,
                our expert team is ready to partner with you.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/contact">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="rounded-2xl px-10 py-4 text-lg shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300"
                  >
                    Book Consultation
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-2xl px-10 py-4 text-lg border-white/30 text-white hover:bg-white hover:text-gray-900 transition-all duration-300"
                  >
                    General Inquiry
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
