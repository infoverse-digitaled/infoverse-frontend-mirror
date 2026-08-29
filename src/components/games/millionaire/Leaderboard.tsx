'use client';

import clsx from 'clsx';
import { useLeaderboard } from '@/lib/hooks/useGame';

const RANK_COLORS = ['#ffaa00', '#94a3b8', '#cd7f32'];

interface LeaderboardProps {
  variant?: 'dark' | 'light';
}

export function Leaderboard({ variant = 'dark' }: LeaderboardProps) {
  const { data: leaders, isLoading } = useLeaderboard();
  const isLight = variant === 'light';

  return (
    <div
      className={clsx(
        'rounded-xl w-full',
        isLight ? 'text-gray-900' : 'bg-[var(--background-dark)] p-4 sm:p-6 text-white border border-white/10',
      )}
    >
      <h2
        className={clsx(
          'text-center font-bold mb-4 text-sm sm:text-base',
          isLight ? 'text-primary' : 'text-[var(--accent-purple)]',
        )}
      >
        🏆 Weekly Top 10
      </h2>

      {isLoading ? (
        <div className={clsx('text-center italic text-sm', isLight ? 'text-gray-400' : 'text-gray-400')}>
          Loading ranks...
        </div>
      ) : !leaders || leaders.length === 0 ? (
        <div className={clsx('text-center italic text-sm', isLight ? 'text-gray-400' : 'text-gray-400')}>
          No games played this week yet.
        </div>
      ) : (
        <div className="flex flex-col gap-2 sm:gap-3 max-h-72 overflow-y-auto">
          {leaders.map((player, index) => {
            const rankColor = RANK_COLORS[index] ?? (isLight ? '#6b7280' : '#9ca3af');
            return (
              <div
                key={player.userId}
                className={clsx(
                  'flex justify-between items-center p-3 rounded-lg border text-sm',
                  isLight ? 'bg-gray-50 border-gray-100' : 'bg-white/5 border-white/10',
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="font-bold" style={{ color: rankColor }}>
                    #{index + 1}
                  </span>
                  <span className="font-medium truncate">{player.name}</span>
                </div>
                <div className="text-green-500 font-bold shrink-0">{player.weeklyXp} XP</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
