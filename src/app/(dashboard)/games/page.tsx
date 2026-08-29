'use client';

import Link from 'next/link';
import { Card } from '@/components/ui';

const GAMES = [
  {
    slug: 'millionaire',
    title: 'Who Wants to Be a Millionaire?',
    description: 'Answer curriculum trivia questions and climb the money ladder.',
    gradient: 'from-purple-500 to-pink-500',
    available: true,
  },
];

export default function GamesPage() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-text-dark mb-1 sm:mb-2">Games</h1>
        <p className="text-sm sm:text-base text-gray-500">
          Learn while you play — pick a game to get started.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {GAMES.map((game) => (
          <Link key={game.slug} href={`/games/${game.slug}`}>
            <Card hover className="h-full flex flex-col overflow-hidden">
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${game.gradient} mb-4 flex items-center justify-center text-white`}
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="2" y="6" width="20" height="12" rx="6" strokeWidth={1.5} />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10v4M6 12h4" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13h.01M18 11h.01" />
                </svg>
              </div>
              <h3 className="font-serif font-bold text-xl text-gray-900 mb-2">{game.title}</h3>
              <p className="text-sm text-gray-600 flex-grow">{game.description}</p>
            </Card>
          </Link>
        ))}

        <Card className="h-full flex flex-col items-center justify-center text-center border-dashed border-2 bg-gray-50/50">
          <p className="text-gray-400 font-medium">More games coming soon</p>
        </Card>
      </div>
    </div>
  );
}
