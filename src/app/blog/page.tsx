'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container, Loading, Button } from '@/components/ui';
import { usePosts } from '@/lib/hooks/useContent';

interface Post {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  featuredImage?: string;
  publishedAt?: string;
  author?: {
    name: string;
  };
}

function formatDate(dateString?: string) {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function FeaturedPost({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <div className="relative rounded-3xl overflow-hidden bg-white border border-gray-100 hover-lift">
        <div className="flex flex-col lg:flex-row">
          {/* Image */}
          <div className="lg:w-1/2">
            <div className="relative aspect-[16/10] lg:aspect-auto lg:h-full overflow-hidden">
              {post.featuredImage ? (
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-purple-500/10 flex items-center justify-center">
                  <svg className="w-20 h-20 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
              )}
              {/* Featured badge */}
              <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-primary">
                Featured
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
            <h2 className="font-serif font-bold text-2xl md:text-4xl lg:text-5xl leading-[1.15] tracking-tight text-gray-900 mb-4 group-hover:text-primary transition-colors">
              {post.title}
            </h2>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6 line-clamp-3">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
              {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
              {post.author && (
                <>
                  <span className="w-1 h-1 rounded-full bg-gray-300" />
                  <span>{post.author.name}</span>
                </>
              )}
            </div>
            <div className="inline-flex items-center gap-2 font-semibold text-gray-900 group-hover:text-primary transition-colors">
              Read article
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

function BlogCard({ post, index }: { post: Post; index: number }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <div
        className="bg-white border border-gray-100 rounded-3xl overflow-hidden hover-lift h-full flex flex-col"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          {post.featuredImage ? (
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-purple-500/10 flex items-center justify-center">
              <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 flex flex-col flex-grow">
          <h3 className="font-serif font-bold text-xl md:text-2xl leading-tight text-gray-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>
          <p className="text-base text-gray-600 leading-relaxed mb-6 line-clamp-3 flex-grow">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
            {post.author && <span className="font-medium">{post.author.name}</span>}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function BlogPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = usePosts('BLOG', page, 9);

  if (isLoading && !data) {
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
                Error loading blog
              </h2>
              <p className="text-base md:text-xl text-gray-600 leading-relaxed mb-8">
                Unable to load blog posts. Please try again later.
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

  const posts = data?.posts || [];
  const pagination = data?.pagination;
  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-background-dark to-primary-dark animate-gradient-shift" />

        {/* Mesh gradient overlay */}
        <div className="absolute inset-0 opacity-50">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-secondary/30 rounded-full blur-[120px] animate-blob" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-primary/30 rounded-full blur-[100px] animate-blob delay-1000" />
        </div>

        {/* Floating shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-[15%] w-16 h-16 border-2 border-white/10 rounded-2xl rotate-12 animate-float" />
          <div className="absolute bottom-32 right-[10%] w-20 h-20 border-2 border-white/10 rounded-full animate-float-delay-1" />
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
              Blog & Resources
            </div>

            {/* Main Headline */}
            <h1 className="font-serif font-bold text-5xl md:text-7xl lg:text-[90px] leading-[1.05] tracking-tight text-white mb-8 animate-slide-up delay-100">
              Insights &{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-gradient">Resources</span>
                <span className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-secondary/50 to-primary/50 blur-xl" />
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-white/80 leading-relaxed mb-8 max-w-3xl mx-auto animate-slide-up delay-200">
              Tips, guides, and resources for students, parents, and educators.
              Stay informed with the latest in education.
            </p>
          </div>
        </Container>
      </section>

      {/* Featured Post Section */}
      {featuredPost && page === 1 && (
        <section className="px-5 md:px-16 py-16 md:py-24 bg-white">
          <Container size="xl" className="px-0">
            <FeaturedPost post={featuredPost} />
          </Container>
        </section>
      )}

      {/* Posts Grid Section */}
      <section className="px-5 md:px-16 py-16 md:py-24 bg-gray-50 relative">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, gray 1px, transparent 0)`,
            backgroundSize: '24px 24px',
          }}
        />

        <Container size="xl" className="px-0 relative">
          <div className="flex flex-col gap-12 md:gap-16">
            {/* Section Header */}
            <div className="max-w-3xl mx-auto text-center">
              <p className="font-semibold text-base text-primary mb-4">
                Articles
              </p>
              <h2 className="font-serif font-bold text-4xl md:text-6xl leading-[1.15] tracking-tight text-gray-900 mb-6">
                Latest{' '}
                <span className="text-gradient-static">posts</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                Explore our collection of educational insights
              </p>
            </div>

            {/* Posts Grid */}
            {(page === 1 ? remainingPosts : posts).length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {(page === 1 ? remainingPosts : posts).map((post, index) => (
                  <BlogCard key={post._id} post={post} index={index} />
                ))}
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                  <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <h3 className="font-serif font-bold text-2xl text-gray-900 mb-2">No posts yet</h3>
                <p className="text-gray-600">Check back soon for new content!</p>
              </div>
            ) : null}

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex items-center justify-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="rounded-xl px-6 hover:shadow-lg transition-all"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </Button>
                <span className="px-4 py-2 bg-white rounded-xl border border-gray-200 text-gray-600 font-medium">
                  Page {page} of {pagination.totalPages}
                </span>
                <Button
                  variant="outline"
                  onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                  disabled={page === pagination.totalPages}
                  className="rounded-xl px-6 hover:shadow-lg transition-all"
                >
                  Next
                  <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Button>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Wisdom Quote Section */}
      <section className="px-5 md:px-16 py-16 md:py-24 bg-white">
        <Container size="xl" className="px-0">
          <div className="max-w-4xl mx-auto text-center">
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              <blockquote className="font-serif text-2xl md:text-4xl text-gray-900 leading-relaxed italic pt-12 mb-8">
                &ldquo;The pen is mightier than the sword.&rdquo;
              </blockquote>

              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                  EB
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Edward Bulwer-Lytton</p>
                  <p className="text-sm text-gray-500">English Writer & Politician</p>
                </div>
              </div>

              {/* Second quote */}
              <div className="mt-16 pt-16 border-t border-gray-100">
                <blockquote className="font-serif text-xl md:text-2xl text-gray-700 leading-relaxed italic mb-6">
                  &ldquo;An investment in knowledge pays the best interest.&rdquo;
                </blockquote>
                <p className="text-gray-500 font-medium">— Benjamin Franklin</p>
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
                Start your learning journey
              </h2>
              <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
                Access over 100+ curriculum-aligned lessons designed by expert educators.
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
                <Link href="/key-stages">
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-2xl px-10 py-4 text-lg border-white/30 text-white hover:bg-white hover:text-gray-900 transition-all duration-300"
                  >
                    Browse Lessons
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
