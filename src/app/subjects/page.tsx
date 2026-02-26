'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Container, Card, CardHeader, CardTitle, CardContent, Loading, Button } from '@/components/ui';
import { useSubjects } from '@/lib/hooks/useOakData';

export default function SubjectsPage() {
  const router = useRouter();
  const { data: subjects, error, isLoading } = useSubjects();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isLoading && error) {
      timer = setTimeout(() => {
        router.push('/');
      }, 3000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isLoading, error, router]);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loading size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <Container className="py-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-text-dark mb-4">
            Error Loading Subjects
          </h2>
          <p className="text-text-light mb-6">
            Unable to load subjects. Redirecting you automatically...
          </p>
          <Button onClick={() => router.push('/')} variant="outline">
            ← Go back home
          </Button>
        </div>
      </Container>
    );
  }

  // Filter out blocked subjects (geography) as a frontend fallback
  const BLOCKED_SUBJECTS = ['geography'];
  const filteredSubjects = subjects?.filter(
    (subject) => !BLOCKED_SUBJECTS.includes(subject.slug)
  );

  // Group subjects by key stage
  const subjectsByKeyStage = filteredSubjects?.reduce((acc, subject) => {
    const keyStage = subject.keyStageTitle || 'Other';
    if (!acc[keyStage]) {
      acc[keyStage] = [];
    }
    acc[keyStage].push(subject);
    return acc;
  }, {} as Record<string, typeof filteredSubjects>);

  return (
    <div className="bg-background-light min-h-screen py-16">
      <Container>
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-text-dark mb-4">
            All Subjects
          </h1>
          <p className="text-lg text-text-light max-w-2xl mx-auto">
            Browse all available subjects across different key stages
          </p>
        </div>

        {subjectsByKeyStage && Object.entries(subjectsByKeyStage).map(([keyStage, subjects]) => (
          <div key={keyStage} className="mb-12">
            <h2 className="text-2xl font-bold text-text-dark mb-6">
              {keyStage}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subjects.map((subject) => (
                <Link key={subject.slug} href={`/subjects/${subject.keyStageSlug}/${subject.slug}`}>
                  <Card hover>
                    <CardHeader>
                      <CardTitle>{subject.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-primary font-semibold">
                        {subject.keyStageTitle}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </Container>
    </div>
  );
}
