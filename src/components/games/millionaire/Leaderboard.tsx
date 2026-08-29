'use client';

import { useLeaderboard } from '@/lib/hooks/useGame';

const RANK_COLORS = ['#ffaa00', '#e5e4e2', '#cd7f32'];

export function Leaderboard() {
  const { data: leaders, isLoading } = useLeaderboard();

  return (
    <div className="bg-[var(--background-dark)] p-4 sm:p-6 rounded-xl text-white w-full border border-white/10">
      <h2 className="text-center text-[var(--accent-purple)] font-bold mb-4 text-sm sm:text-base">
        🏆 Weekly Top 10
      </h2>

      {isLoading ? (
        <div className="text-center text-gray-400 italic text-sm">Loading ranks...</div>
      ) : !leaders || leaders.length === 0 ? (
        <div className="text-center text-gray-400 italic text-sm">No games played this week yet.</div>
      ) : (
        <div className="flex flex-col gap-2 sm:gap-3 max-h-64 overflow-y-auto">
          {leaders.map((player, index) => {
            const rankColor = RANK_COLORS[index] ?? '#9ca3af';
            return (
              <div
                key={player.userId}
                className="flex justify-between items-center bg-white/5 p-3 rounded-lg border border-white/10 text-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="font-bold" style={{ color: rankColor }}>
                    #{index + 1}
                  </span>
                  <span className="font-medium truncate">{player.name}</span>
                </div>
                <div className="text-green-400 font-bold shrink-0">{player.weeklyXp} XP</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
