'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Container, Loading, Button } from '@/components/ui';
import { usePost } from '@/lib/hooks/useContent';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { data: post, isLoading, error } = usePost(slug);

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

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
            <p className="mt-4 text-gray-600 animate-pulse">Loading article...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="font-serif font-bold text-3xl md:text-5xl leading-tight text-gray-900 mb-4 animate-slide-up">
                Post not found
              </h2>
              <p className="text-base md:text-xl text-gray-600 leading-relaxed mb-8 animate-slide-up delay-100">
                The blog post you&apos;re looking for doesn&apos;t exist or may have been moved.
              </p>
              <Link href="/blog" className="animate-slide-up delay-200 inline-block">
                <Button className="rounded-xl shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-1 transition-all">
                  Back to Blog
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
      {/* Animated Header Background */}
      <div className="relative">
        {/* Mesh gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-white to-secondary/5" />
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `radial-gradient(circle at 20% 30%, rgba(var(--primary-rgb, 79, 70, 229), 0.15) 0%, transparent 50%),
                           radial-gradient(circle at 80% 70%, rgba(var(--secondary-rgb, 16, 185, 129), 0.15) 0%, transparent 50%),
                           radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)`
        }} />

        {/* Floating shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl animate-float" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-secondary/10 rounded-full blur-2xl animate-float delay-500" />
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl animate-float delay-1000" />

        {/* Breadcrumb */}
        <section className="relative z-10 px-5 md:px-16 pt-8">
          <Container size="xl" className="px-0">
            <nav className="flex items-center gap-2 text-sm text-gray-600 animate-slide-up">
              <Link href="/" className="hover:text-primary transition-colors duration-300 hover:-translate-y-0.5 inline-block">
                Home
              </Link>
              <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <Link href="/blog" className="hover:text-primary transition-colors duration-300 hover:-translate-y-0.5 inline-block">
                Blog
              </Link>
              <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-gray-900 font-medium line-clamp-1">{post.title}</span>
            </nav>
          </Container>
        </section>

        {/* Article Header */}
        <section className="relative z-10 px-5 md:px-16 py-16 md:py-20">
          <Container size="xl" className="px-0">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6 animate-slide-up">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                Article
              </span>
              <h1 className="font-serif font-bold text-3xl md:text-5xl lg:text-[60px] leading-[1.2] tracking-tight text-gray-900 mb-6 animate-slide-up delay-100">
                {post.title}
              </h1>
              <div className="flex items-center justify-center gap-4 text-gray-600 animate-slide-up delay-200">
                {post.publishedAt && (
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {formatDate(post.publishedAt)}
                  </span>
                )}
                {post.author && (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary to-secondary" />
                    <span className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <span className="text-white text-xs font-bold">
                          {post.author.name?.charAt(0) || 'A'}
                        </span>
                      </div>
                      By {post.author.name}
                    </span>
                  </>
                )}
              </div>
            </div>
          </Container>
        </section>
      </div>

      {/* Featured Image with dramatic styling */}
      {post.featuredImage && (
        <section className="px-5 md:px-16 animate-slide-up delay-300">
          <Container size="xl" className="px-0">
            <div className="relative aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl shadow-black/20 group">
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <Image
                src={post.featuredImage}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />

              {/* Decorative corner accents */}
              <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-white/30 rounded-tl-lg z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-white/30 rounded-br-lg z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </Container>
        </section>
      )}

      {/* Article Content with enhanced styling */}
      <section className="px-5 md:px-16 py-16 md:py-20">
        <Container size="xl" className="px-0">
          <article className="max-w-3xl mx-auto">
            {/* Decorative line */}
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mb-10 mx-auto animate-slide-up" />

            <div
              className="prose prose-lg max-w-none animate-slide-up delay-100
                prose-headings:font-serif prose-headings:font-bold prose-headings:text-gray-900
                prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mt-12 prose-h2:mb-6
                prose-h3:text-xl prose-h3:md:text-2xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-6
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-a:font-semibold
                prose-strong:text-gray-900 prose-strong:font-semibold
                prose-ul:text-gray-600 prose-ol:text-gray-600
                prose-li:mb-2
                prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:text-gray-700 prose-blockquote:italic prose-blockquote:not-italic
                prose-img:rounded-xl prose-img:shadow-lg
                prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-primary prose-code:before:content-none prose-code:after:content-none
                prose-pre:bg-gray-900 prose-pre:rounded-xl prose-pre:shadow-xl"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
        </Container>
      </section>

      {/* Back to Blog with enhanced styling */}
      <section className="px-5 md:px-16 py-8">
        <Container size="xl" className="px-0">
          <div className="max-w-3xl mx-auto border-t border-gray-200 pt-12">
            <Link
              href="/blog"
              className="inline-flex items-center gap-3 font-medium text-gray-900 hover:text-primary transition-all duration-300 group"
            >
              <span className="w-10 h-10 rounded-xl bg-gray-100 group-hover:bg-primary/10 flex items-center justify-center transition-all duration-300 group-hover:-translate-x-1">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </span>
              <span className="relative">
                Back to all articles
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </span>
            </Link>
          </div>
        </Container>
      </section>

      {/* Dramatic CTA Section */}
      <section className="px-5 md:px-16 py-16 md:py-28">
        <Container size="xl" className="px-0">
          <div className="relative rounded-3xl overflow-hidden">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-purple-600 to-secondary animate-gradient-shift" />

            {/* Mesh overlay */}
            <div className="absolute inset-0 opacity-30" style={{
              backgroundImage: `radial-gradient(circle at 30% 20%, rgba(255,255,255,0.3) 0%, transparent 40%),
                               radial-gradient(circle at 70% 80%, rgba(255,255,255,0.2) 0%, transparent 40%)`
            }} />

            {/* Animated blobs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-blob" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-blob delay-1000" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl animate-float" />

            {/* Floating shapes */}
            <div className="absolute top-10 left-10 w-4 h-4 bg-white/20 rounded-full animate-float" />
            <div className="absolute top-20 right-20 w-6 h-6 bg-white/20 rounded-full animate-float delay-300" />
            <div className="absolute bottom-10 left-1/4 w-3 h-3 bg-white/30 rounded-full animate-float delay-700" />
            <div className="absolute bottom-20 right-1/3 w-5 h-5 bg-white/20 rounded-full animate-float delay-500" />

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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Start Your Journey
                </span>

                <h2 className="font-serif font-bold text-3xl md:text-5xl lg:text-6xl leading-tight tracking-tight mb-6 animate-slide-up delay-100">
                  Ready to start learning?
                </h2>
                <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed animate-slide-up delay-200">
                  Access over 100+ curriculum-aligned lessons designed by expert educators. Transform your learning journey today.
                </p>
                <div className="flex flex-wrap gap-4 justify-center animate-slide-up delay-300">
                  <Link href="/pricing">
                    <Button
                      variant="secondary"
                      size="lg"
                      className="rounded-xl shadow-lg shadow-black/20 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 bg-white text-primary hover:bg-white/90"
                    >
                      Start free trial
                      <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Button>
                  </Link>
                  <Link href="/key-stages">
                    <Button
                      variant="outline"
                      size="lg"
                      className="rounded-xl border-2 border-white/30 text-white hover:bg-white hover:text-primary backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
                    >
                      Browse lessons
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
