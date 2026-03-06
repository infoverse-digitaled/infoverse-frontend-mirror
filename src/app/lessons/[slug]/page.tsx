'use client';
import { useEffect } from 'react';
import { ContentRenderer } from '@/components/quiz/ContentRenderer';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  Container,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Loading,
  Button,
} from '@/components/ui';
import { QuizSection } from '@/components/quiz';
import { VideoPlayer, AssetDownloads } from '@/components/lessons';
import { AiHelperButton } from '@/components/ai';
import { useAuth } from '@/contexts/AuthContext';
import {
  useLesson,
  useLessonQuiz,
  useLessonAssets,
  useLessonTranscript,
} from '@/lib/hooks/useOakData';

export default function LessonPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { user } = useAuth();
  const router = useRouter();

  const { data: lesson, error, isLoading } = useLesson(slug);
  const { data: quizData, isLoading: quizLoading } = useLessonQuiz(slug);
  const { data: assetsData, isLoading: assetsLoading } = useLessonAssets(slug);
  const { data: transcriptData } = useLessonTranscript(slug);

  // Build context for AI helper
  const buildLessonContext = () => {
    if (!lesson) return '';
    let context = `Lesson: ${lesson.title}\n`;
    context += `Subject: ${lesson.subjectTitle}\n`;
    context += `Key Stage: ${lesson.keyStageTitle}\n`;
    context += `Unit: ${lesson.unitTitle}\n\n`;
    if (lesson.description) {
      context += `Description: ${typeof lesson.description === 'string' ? lesson.description : ''}\n\n`;
    }
    if (transcriptData?.sentences) {
      const transcriptText = transcriptData.sentences.map(s => s.text).join(' ');
      context += `Transcript: ${transcriptText.substring(0, 5000)}\n`;
    }
    return context;
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isLoading && (error || !lesson)) {
      timer = setTimeout(() => {
        router.push('/subjects');
      }, 3000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isLoading, error, lesson, router]);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loading size="lg" />
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <Container className="py-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-text-dark mb-4">
            Error Loading Lesson
          </h2>
          <p className="text-text-light mb-6">
            Unable to load this lesson. Redirecting you automatically...
          </p>
          <Button onClick={() => router.push('/subjects')} variant="primary">
            Go back now
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <div className="bg-background-light min-h-screen py-16">
      <Container>
        {/* Header: Back button + Lesson title */}
        <div className="mb-10">
          {/* Back button row */}
          <div className="mb-6">
            {lesson.unitSlug ? (
              <Link href={`/units/${lesson.unitSlug}`}>
                <Button variant="outline" className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Unit
                </Button>
              </Link>
            ) : (
              <Button variant="outline" onClick={() => router.back()} className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back
              </Button>
            )}
          </div>

          {/* Lesson title block */}
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center font-bold text-xl shrink-0">
              {lesson.lessonNumber}
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-text-dark">
                {lesson.title}
              </h1>
              <div className="flex flex-wrap gap-3 text-sm text-text-light mt-1.5">
                <span>{lesson.subjectTitle}</span>
                <span className="text-gray-300">•</span>
                <span>{lesson.keyStageTitle}</span>
                <span className="text-gray-300">•</span>
                <span>{lesson.unitTitle}</span>
              </div>
            </div>
          </div>
          {lesson.expired && (
            <span className="inline-block px-4 py-2 bg-secondary text-white rounded-button text-sm">
              Content may be outdated
            </span>
          )}
        </div>

        {lesson.description && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Lesson Description</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <ContentRenderer content={lesson.description} />
            </CardContent>
          </Card>
        )}

        {/* Video Player */}
        <VideoPlayer
          assets={assetsData || null}
          transcript={transcriptData || null}
          isLoading={assetsLoading}
        />

        {/* Downloadable Resources */}
        <AssetDownloads assets={assetsData || null} />

        {/* Quiz Sections */}
        {quizLoading ? (
          <Card className="mb-8">
            <CardContent className="py-8 flex items-center justify-center">
              <Loading size="md" />
              <span className="ml-3 text-gray-500">Loading quizzes...</span>
            </CardContent>
          </Card>
        ) : (
          <>
            {quizData?.starterQuiz && quizData.starterQuiz.length > 0 && (
              <QuizSection
                title="Starter Quiz"
                questions={quizData.starterQuiz}
                variant="starter"
              />
            )}

            {quizData?.exitQuiz && quizData.exitQuiz.length > 0 && (
              <QuizSection
                title="Exit Quiz"
                questions={quizData.exitQuiz}
                variant="exit"
              />
            )}
          </>
        )}

        <div className="flex justify-center">
          <Link href={`/units/${lesson.unitSlug}`}>
            <Button variant="outline">Back to Unit</Button>
          </Link>
        </div>
      </Container>

      {/* AI Helper Button - Only show for authenticated users */}
      {user && lesson && (
        <AiHelperButton
          lessonContext={buildLessonContext()}
          lessonTitle={lesson.title}
        />
      )}
    </div>
  );
}
