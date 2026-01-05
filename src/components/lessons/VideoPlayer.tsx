'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Loading } from '@/components/ui';
import type { LessonAssets, TranscriptSentence } from '@/types/oak-api.types';

interface VideoPlayerProps {
  assets: LessonAssets | null;
  transcript?: { sentences: TranscriptSentence[] } | null;
  isLoading?: boolean;
}

export function VideoPlayer({ assets, transcript, isLoading }: VideoPlayerProps) {
  const [showTranscript, setShowTranscript] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [tokenChecked, setTokenChecked] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Get auth token from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      setAuthToken(token);
      setTokenChecked(true);
    }
  }, []);

  // Wait for token check to complete before rendering video
  // This prevents the video from loading without the token on first render
  if (isLoading || !tokenChecked) {
    return (
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Lesson Video</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-12">
          <Loading size="lg" />
          <span className="ml-3 text-gray-500">Loading video...</span>
        </CardContent>
      </Card>
    );
  }

  // Find video asset
  const videoAsset = assets?.assets?.find(a => a.type === 'video');
  const videoUrl = videoAsset?.url;

  if (!videoUrl) {
    return null;
  }

  // Append auth token to video URL for authentication (video elements can't send headers)
  const authenticatedVideoUrl = authToken
    ? `${videoUrl}${videoUrl.includes('?') ? '&' : '?'}token=${authToken}`
    : videoUrl;

  const handleTranscriptClick = (startTime: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = startTime;
      videoRef.current.play();
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Lesson Video</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-video bg-black rounded-lg overflow-hidden mb-4">
          <video
            ref={videoRef}
            src={authenticatedVideoUrl}
            controls
            className="w-full h-full"
            playsInline
            preload="metadata"
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {transcript?.sentences && transcript.sentences.length > 0 && (
          <div className="mt-4">
            <button
              onClick={() => setShowTranscript(!showTranscript)}
              className="flex items-center gap-2 text-primary hover:text-primary-dark font-medium"
            >
              <svg
                className={`w-5 h-5 transition-transform ${showTranscript ? 'rotate-90' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              {showTranscript ? 'Hide Transcript' : 'Show Transcript'}
            </button>

            {showTranscript && (
              <div className="mt-4 max-h-64 overflow-y-auto bg-gray-50 rounded-lg p-4">
                <div className="space-y-2">
                  {transcript.sentences.map((sentence, index) => (
                    <button
                      key={index}
                      onClick={() => handleTranscriptClick(sentence.start)}
                      className="block w-full text-left hover:bg-gray-100 p-2 rounded transition-colors"
                    >
                      <span className="text-xs text-gray-500 mr-2">
                        {formatTime(sentence.start)}
                      </span>
                      <span className="text-gray-700">{sentence.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
