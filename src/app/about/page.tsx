import { Container, Button } from '@/components/ui';
import Link from 'next/link';

export const metadata = {
  title: 'About | Infoverse Digital-Ed',
  description: 'Learn more about Infoverse Digital-Ed and our educational platform',
};

export default function AboutPage() {
  const wisdomQuotes = [
    {
      quote: "The mind is not a vessel to be filled, but a fire to be kindled.",
      author: "Plutarch",
      role: "Greek Philosopher",
    },
    {
      quote: "Education is not the filling of a pail, but the lighting of a fire.",
      author: "W.B. Yeats",
      role: "Irish Poet & Nobel Laureate",
    },
    {
      quote: "The roots of education are bitter, but the fruit is sweet.",
      author: "Aristotle",
      role: "Greek Philosopher",
    },
  ];

  const features = [
    {
      icon: (
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: 'Curriculum-aligned content',
      description: 'Every lesson mapped to UK standards',
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      title: 'Organized structure',
      description: 'Clear pathways through every subject',
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'User-friendly interface',
      description: 'Learning that feels natural and intuitive',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Header Section */}
      <section className="px-5 md:px-16 py-16 md:py-28">
        <Container size="xl" className="px-0">
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-semibold text-base text-gray-900 mb-4">
              Education
            </p>
            <h1 className="font-serif font-bold text-4xl md:text-7xl lg:text-[84px] leading-[1.1] tracking-tight text-gray-900 mb-6">
              Redefining access
            </h1>
            <p className="text-base md:text-xl text-gray-600 leading-relaxed mb-8">
              We believe every student deserves world-class learning opportunities regardless of geography or circumstance.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/key-stages">
                <Button size="lg" className="rounded-xl">
                  Learn
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="outline" size="lg" className="rounded-xl">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Platform Section - Two Column */}
      <section className="px-5 md:px-16 py-16 md:py-28">
        <Container size="xl" className="px-0">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
            {/* Content Left */}
            <div className="flex-1">
              <p className="font-semibold text-base text-gray-900 mb-4">
                Platform
              </p>
              <h2 className="font-serif font-bold text-3xl md:text-5xl lg:text-[60px] leading-[1.2] tracking-tight text-gray-900 mb-6">
                Quality education built for every student
              </h2>
              <p className="text-base md:text-xl text-gray-600 leading-relaxed mb-8">
                Infoverse Digital Education brings UK-standard learning to students across Africa and beyond. We&apos;ve built a platform that removes barriers, making world-class curriculum accessible to those who need it most.
              </p>
              <div className="flex flex-wrap gap-6 items-center">
                <Link href="/key-stages">
                  <Button variant="outline" className="rounded-xl">
                    Explore
                  </Button>
                </Link>
                <Link href="/about" className="inline-flex items-center gap-2 font-medium text-gray-900 hover:text-primary transition-colors">
                  Learn more
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Image Right */}
            <div className="flex-1 w-full">
              <div className="aspect-[600/640] rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-gray-100" />
            </div>
          </div>
        </Container>
      </section>

      {/* Mission Quote Section */}
      <section className="px-5 md:px-16 py-16 md:py-28">
        <Container size="xl" className="px-0">
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-semibold text-base text-gray-900 mb-4">
              Mission
            </p>
            <p className="font-serif font-bold text-xl md:text-2xl lg:text-[32px] leading-[1.3] tracking-tight text-gray-900 mb-8">
              We democratise UK-standard education and unlock every student&apos;s potential. Geography and circumstance should never limit what a young person can achieve.
            </p>
            <div className="flex flex-wrap gap-6 justify-center items-center">
              <Link href="/register">
                <Button variant="outline" className="rounded-xl">
                  Begin
                </Button>
              </Link>
              <Link href="/key-stages" className="inline-flex items-center gap-2 font-medium text-gray-900 hover:text-primary transition-colors">
                Explore
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Leadership Section - Full Width Image */}
      <section className="bg-white">
        <div className="flex flex-col lg:flex-row">
          {/* Content Left */}
          <div className="flex-1 px-5 md:px-16 lg:pr-20 py-16 md:py-28">
            <div className="max-w-xl ml-auto">
              <p className="font-semibold text-base text-gray-900 mb-4">
                Leadership
              </p>
              <h2 className="font-serif font-bold text-3xl md:text-5xl lg:text-[60px] leading-[1.2] tracking-tight text-gray-900 mb-6">
                Built on proven educational excellence
              </h2>
              <p className="text-base md:text-xl text-gray-600 leading-relaxed mb-4">
                Founded by <strong>Ebenezer Aladese</strong>, a dedicated educator with over 20 years of classroom experience, Infoverse was born from a passion to make quality education accessible to all.
              </p>
              <p className="text-base md:text-xl text-gray-600 leading-relaxed mb-8">
                Our team of teachers brings a combined <strong>50+ years of teaching expertise</strong> to every lesson, ensuring students receive the rigorous, curriculum-aligned content they deserve.
              </p>

              {/* List Items */}
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-gray-900">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  20+ years of founder teaching experience
                </li>
                <li className="flex items-center gap-3 text-gray-900">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  50+ years combined team expertise
                </li>
                <li className="flex items-center gap-3 text-gray-900">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  UK curriculum standards
                </li>
                <li className="flex items-center gap-3 text-gray-900">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  Global reach, local impact
                </li>
              </ul>

              <div className="flex flex-wrap gap-6 items-center">
                <Link href="/key-stages">
                  <Button variant="outline" className="rounded-xl">
                    Explore Lessons
                  </Button>
                </Link>
                <Link href="/contact" className="inline-flex items-center gap-2 font-medium text-gray-900 hover:text-primary transition-colors">
                  Get in touch
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Image Right - Full Height */}
          <div className="flex-1 min-h-[375px] lg:min-h-[720px] bg-gradient-to-br from-secondary/20 via-secondary/10 to-gray-100" />
        </div>
      </section>

      {/* Features Section */}
      <section className="px-5 md:px-16 py-16 md:py-28">
        <Container size="xl" className="px-0">
          <div className="flex flex-col gap-12 md:gap-20">
            {/* Section Header */}
            <div className="max-w-3xl mx-auto text-center">
              <p className="font-semibold text-base text-gray-900 mb-4">
                Features
              </p>
              <h2 className="font-serif font-bold text-3xl md:text-5xl lg:text-[60px] leading-[1.2] tracking-tight text-gray-900 mb-6">
                What makes us different
              </h2>
              <p className="text-base md:text-xl text-gray-600 leading-relaxed">
                Every element designed with purpose
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="text-gray-900 mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="font-serif font-bold text-2xl md:text-3xl lg:text-[40px] leading-tight text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6">
                    {feature.description}
                  </p>
                  <Link
                    href="/key-stages"
                    className="inline-flex items-center gap-2 font-medium text-gray-900 hover:text-primary transition-colors"
                  >
                    Learn more
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Wisdom Quotes Section */}
      <section className="px-5 md:px-16 py-16 md:py-28 bg-gradient-to-br from-gray-900 via-primary-dark to-gray-900 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[100px]" />

        {/* Large quote mark */}
        <div className="absolute top-10 left-10 text-white/5 pointer-events-none">
          <svg className="w-64 h-64" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
        </div>

        <Container size="xl" className="px-0 relative">
          <div className="flex flex-col gap-12 md:gap-16">
            {/* Section Header */}
            <div className="max-w-3xl mx-auto text-center">
              <p className="font-semibold text-base text-primary-light mb-4">
                Words of Wisdom
              </p>
              <h2 className="font-serif font-bold text-3xl md:text-5xl lg:text-[60px] leading-[1.2] tracking-tight text-white mb-6">
                Standing on the shoulders of giants
              </h2>
            </div>

            {/* Quotes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {wisdomQuotes.map((item, index) => (
                <div
                  key={index}
                  className="group relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300"
                >
                  {/* Quote icon */}
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white mb-6">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>

                  {/* Quote */}
                  <blockquote className="font-serif text-lg md:text-xl text-white leading-relaxed mb-6 italic">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>

                  {/* Author */}
                  <div>
                    <p className="font-semibold text-white">{item.author}</p>
                    <p className="text-sm text-white/60">{item.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="px-5 md:px-16 py-16 md:py-28">
        <Container size="xl" className="px-0">
          <div className="max-w-3xl mx-auto text-center">
            {/* Einstein quote before CTA */}
            <div className="mb-12 p-8 bg-gray-50 rounded-2xl border border-gray-100">
              <blockquote className="font-serif text-xl md:text-2xl text-gray-700 italic mb-4">
                &ldquo;Imagination is more important than knowledge. Knowledge is limited. Imagination encircles the world.&rdquo;
              </blockquote>
              <p className="text-gray-500 font-medium">— Albert Einstein</p>
            </div>

            <h2 className="font-serif font-bold text-4xl md:text-7xl lg:text-[84px] leading-[1.1] tracking-tight text-gray-900 mb-6">
              Begin your journey today
            </h2>
            <p className="text-base md:text-xl text-gray-600 leading-relaxed mb-10">
              Join thousands of students accessing world-class UK education at no cost initially.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="rounded-xl">
                  Start
                </Button>
              </Link>
              <Link href="/key-stages">
                <Button variant="outline" size="lg" className="rounded-xl">
                  Explore
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
