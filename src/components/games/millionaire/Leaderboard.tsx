'use client';

import { useLeaderboard } from '@/lib/hooks/useGame';

const RANK_COLORS = ['#ffaa00', '#e5e4e2', '#cd7f32'];

export function Leaderboard() {
  const { data: leaders, isLoading } = useLeaderboard();

  return (
    <div className="bg-[var(--background-dark)] p-8 rounded-xl text-white max-w-sm w-full border border-white/10">
      <h2 className="text-center text-[var(--accent-purple)] font-bold mb-6">🏆 Weekly Top 10</h2>

      {isLoading ? (
        <div className="text-center text-gray-400 italic">Loading ranks...</div>
      ) : !leaders || leaders.length === 0 ? (
        <div className="text-center text-gray-400 italic">No games played this week yet.</div>
      ) : (
        <div className="flex flex-col gap-3">
          {leaders.map((player, index) => {
            const rankColor = RANK_COLORS[index] ?? '#9ca3af';
            return (
              <div
                key={player.userId}
                className="flex justify-between items-center bg-white/5 p-4 rounded-lg border border-white/10"
              >
                <div className="flex items-center gap-4">
                  <span className="text-lg font-bold" style={{ color: rankColor }}>
                    #{index + 1}
                  </span>
                  <span className="font-medium">{player.name}</span>
                </div>
                <div className="text-green-400 font-bold">{player.weeklyXp} XP</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
