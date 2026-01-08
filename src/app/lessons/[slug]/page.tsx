'use client';
import { ContentRenderer } from '@/components/quiz/ContentRenderer';
import Link from 'next/link';
import { useParams } from 'next/navigation';
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
            Unable to load this lesson. Please try again later.
          </p>
          <Link href="/subjects">
            <Button variant="primary">Back to Subjects</Button>
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <div className="bg-background-light min-h-screen py-16">
      <Container>
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-text-light">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          {' / '}
          <Link href="/key-stages" className="hover:text-primary">
            Key Stages
          </Link>
          {' / '}
          {lesson.keyStageSlug && (
            <>
              <Link href={`/key-stages/${lesson.keyStageSlug}`} className="hover:text-primary">
                {lesson.keyStageTitle}
              </Link>
              {' / '}
            </>
          )}
          {lesson.keyStageSlug && lesson.subjectSlug ? (
            <Link
              href={`/subjects/${lesson.keyStageSlug}/${lesson.subjectSlug}`}
              className="hover:text-primary"
            >
              {lesson.subjectTitle}
            </Link>
          ) : (
            <span>{lesson.subjectTitle}</span>
          )}
          {' / '}
          {lesson.unitSlug ? (
            <Link
              href={`/units/${lesson.unitSlug}`}
              className="hover:text-primary"
            >
              {lesson.unitTitle}
            </Link>
          ) : (
            <span>{lesson.unitTitle}</span>
          )}
          {' / '}
          <span className="text-text-dark font-semibold">{lesson.title}</span>
        </nav>

        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl">
              {lesson.lessonNumber}
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-text-dark">
                {lesson.title}
              </h1>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 text-lg text-text-light">
            <span>{lesson.subjectTitle}</span>
            <span>•</span>
            <span>{lesson.keyStageTitle}</span>
            <span>•</span>
            <span>{lesson.unitTitle}</span>
          </div>
          {lesson.expired && (
            <div className="mt-4">
              <span className="inline-block px-4 py-2 bg-secondary text-white rounded-button">
                Content may be outdated
              </span>
            </div>
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
