'use client';

interface CourseProgressCardProps {
  subjectName: string;
  subjectSlug: string;
  keyStage: string; // e.g. "ks1", "ks2", "ks3", "ks4"
  progress: number;
  onClick?: () => void;
}

// ─── Visual identity map ────────────────────────────────────────────────────
// Each subject gets a base icon + colour palette.
// The key-stage number shifts the palette (hue rotation / lightness) so that
// KS1 Maths looks noticeably different from KS2 Maths while still sharing the
// "maths" family of blue-to-indigo colours.

interface SubjectTheme {
  icon: string;
  /** Tailwind gradient classes for the card background */
  gradients: Record<string, string>; // keyed by "ks1"|"ks2"|"ks3"|"ks4"
  /** Tailwind gradient for the progress bar */
  barGradient: Record<string, string>;
}

const SUBJECT_THEMES: Record<string, SubjectTheme> = {
  maths: {
    icon: '∑',
    gradients: {
      ks1: 'from-sky-400 to-blue-500',
      ks2: 'from-blue-500 to-indigo-600',
      ks3: 'from-indigo-500 to-violet-600',
      ks4: 'from-violet-600 to-purple-700',
    },
    barGradient: {
      ks1: 'from-sky-200 to-blue-300',
      ks2: 'from-blue-300 to-indigo-400',
      ks3: 'from-indigo-300 to-violet-400',
      ks4: 'from-violet-400 to-purple-500',
    },
  },
  english: {
    icon: '📖',
    gradients: {
      ks1: 'from-emerald-400 to-teal-500',
      ks2: 'from-teal-500 to-cyan-600',
      ks3: 'from-green-500 to-emerald-700',
      ks4: 'from-emerald-700 to-green-900',
    },
    barGradient: {
      ks1: 'from-emerald-200 to-teal-300',
      ks2: 'from-teal-300 to-cyan-400',
      ks3: 'from-green-300 to-emerald-500',
      ks4: 'from-emerald-500 to-green-700',
    },
  },
  science: {
    icon: '🔬',
    gradients: {
      ks1: 'from-fuchsia-400 to-pink-500',
      ks2: 'from-pink-500 to-rose-600',
      ks3: 'from-purple-500 to-fuchsia-700',
      ks4: 'from-rose-600 to-pink-900',
    },
    barGradient: {
      ks1: 'from-fuchsia-200 to-pink-300',
      ks2: 'from-pink-300 to-rose-400',
      ks3: 'from-purple-300 to-fuchsia-500',
      ks4: 'from-rose-400 to-pink-600',
    },
  },
  history: {
    icon: '📜',
    gradients: {
      ks1: 'from-amber-400 to-orange-500',
      ks2: 'from-orange-500 to-amber-600',
      ks3: 'from-amber-600 to-yellow-700',
      ks4: 'from-yellow-700 to-orange-900',
    },
    barGradient: {
      ks1: 'from-amber-200 to-orange-300',
      ks2: 'from-orange-300 to-amber-400',
      ks3: 'from-amber-400 to-yellow-500',
      ks4: 'from-yellow-500 to-orange-700',
    },
  },
  geography: {
    icon: '🌍',
    gradients: {
      ks1: 'from-cyan-400 to-blue-500',
      ks2: 'from-blue-500 to-cyan-600',
      ks3: 'from-cyan-600 to-sky-700',
      ks4: 'from-sky-700 to-blue-900',
    },
    barGradient: {
      ks1: 'from-cyan-200 to-blue-300',
      ks2: 'from-blue-300 to-cyan-400',
      ks3: 'from-cyan-400 to-sky-500',
      ks4: 'from-sky-500 to-blue-700',
    },
  },
  art: {
    icon: '🎨',
    gradients: {
      ks1: 'from-pink-400 to-rose-500',
      ks2: 'from-rose-500 to-pink-600',
      ks3: 'from-pink-600 to-fuchsia-700',
      ks4: 'from-fuchsia-700 to-pink-900',
    },
    barGradient: {
      ks1: 'from-pink-200 to-rose-300',
      ks2: 'from-rose-300 to-pink-400',
      ks3: 'from-pink-400 to-fuchsia-500',
      ks4: 'from-fuchsia-500 to-pink-700',
    },
  },
  music: {
    icon: '🎵',
    gradients: {
      ks1: 'from-violet-400 to-purple-500',
      ks2: 'from-purple-500 to-violet-600',
      ks3: 'from-violet-600 to-indigo-700',
      ks4: 'from-indigo-700 to-purple-900',
    },
    barGradient: {
      ks1: 'from-violet-200 to-purple-300',
      ks2: 'from-purple-300 to-violet-400',
      ks3: 'from-violet-400 to-indigo-500',
      ks4: 'from-indigo-500 to-purple-700',
    },
  },
  computing: {
    icon: '💻',
    gradients: {
      ks1: 'from-slate-400 to-gray-500',
      ks2: 'from-gray-500 to-slate-600',
      ks3: 'from-slate-600 to-zinc-700',
      ks4: 'from-zinc-700 to-slate-900',
    },
    barGradient: {
      ks1: 'from-slate-200 to-gray-300',
      ks2: 'from-gray-300 to-slate-400',
      ks3: 'from-slate-400 to-zinc-500',
      ks4: 'from-zinc-500 to-slate-700',
    },
  },
  french: {
    icon: '🗣️',
    gradients: {
      ks1: 'from-red-400 to-orange-500',
      ks2: 'from-orange-500 to-red-600',
      ks3: 'from-red-600 to-rose-700',
      ks4: 'from-rose-700 to-red-900',
    },
    barGradient: {
      ks1: 'from-red-200 to-orange-300',
      ks2: 'from-orange-300 to-red-400',
      ks3: 'from-red-400 to-rose-500',
      ks4: 'from-rose-500 to-red-700',
    },
  },
};

// Fallback for unknown subjects
const DEFAULT_THEME: SubjectTheme = {
  icon: '📚',
  gradients: {
    ks1: 'from-teal-400 to-cyan-500',
    ks2: 'from-cyan-500 to-teal-600',
    ks3: 'from-teal-600 to-emerald-700',
    ks4: 'from-emerald-700 to-teal-900',
  },
  barGradient: {
    ks1: 'from-teal-200 to-cyan-300',
    ks2: 'from-cyan-300 to-teal-400',
    ks3: 'from-teal-400 to-emerald-500',
    ks4: 'from-emerald-500 to-teal-700',
  },
};

// Key-stage human labels and badge colours
const KS_LABELS: Record<string, { label: string; badge: string }> = {
  ks1: { label: 'Key Stage 1', badge: 'bg-white/20 text-white' },
  ks2: { label: 'Key Stage 2', badge: 'bg-white/20 text-white' },
  ks3: { label: 'Key Stage 3', badge: 'bg-white/20 text-white' },
  ks4: { label: 'Key Stage 4', badge: 'bg-white/20 text-white' },
};

// ────────────────────────────────────────────────────────────────────────────

function getTheme(subjectSlug: string, keyStage: string) {
  // Normalise slug (strip hyphens/spaces, lowercase)
  const key = subjectSlug.toLowerCase().replace(/[-\s]/g, '');
  // Try exact match first, then partial match
  const themeKey = Object.keys(SUBJECT_THEMES).find(
    (k) => key === k || key.startsWith(k)
  );
  const theme = themeKey ? SUBJECT_THEMES[themeKey] : DEFAULT_THEME;
  const ks = keyStage.toLowerCase() as 'ks1' | 'ks2' | 'ks3' | 'ks4';

  return {
    gradient: theme.gradients[ks] ?? theme.gradients.ks1,
    barGradient: theme.barGradient[ks] ?? theme.barGradient.ks1,
    icon: theme.icon,
  };
}

export default function CourseProgressCard({
  subjectName,
  subjectSlug,
  keyStage,
  progress,
  onClick,
}: CourseProgressCardProps) {
  const { gradient, barGradient, icon } = getTheme(subjectSlug, keyStage);
  const ksInfo = KS_LABELS[keyStage.toLowerCase()] ?? { label: keyStage.toUpperCase(), badge: 'bg-white/20 text-white' };

  return (
    <div
      onClick={onClick}
      className={`bg-gradient-to-br ${gradient} rounded-2xl p-5 flex flex-col justify-between cursor-pointer 
        hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 shadow-lg group min-h-[190px] relative overflow-hidden`}
    >
      {/* Decorative blurred circle */}
      <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />

      {/* Top row: icon + KS badge */}
      <div className="flex items-start justify-between">
        {/* Icon bubble */}
        <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>

        {/* Key Stage badge */}
        <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${ksInfo.badge} backdrop-blur-sm border border-white/30`}>
          {ksInfo.label}
        </span>
      </div>

      {/* Subject name */}
      <div className="mt-3 flex-1">
        <p className="text-base font-bold text-white leading-tight drop-shadow-sm">
          {subjectName}
        </p>
      </div>

      {/* Progress bar + percentage */}
      <div className="space-y-1.5 mt-3">
        <div className="flex items-center justify-between mb-0.5">
          <span className="text-[11px] text-white/80 font-medium">Progress</span>
          <span className="text-xs text-white font-bold">{progress}%</span>
        </div>
        <div className="w-full h-2.5 bg-black/20 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${barGradient} rounded-full transition-all duration-700 shadow-sm`}
            style={{ width: `${Math.max(progress, 3)}%` }}
          />
        </div>
        {progress === 0 && (
          <p className="text-[10px] text-white/60">Not started yet — dive in!</p>
        )}
        {progress > 0 && progress < 100 && (
          <p className="text-[10px] text-white/60">Keep going, you're doing great!</p>
        )}
        {progress === 100 && (
          <p className="text-[10px] text-white/80 font-semibold">🎉 Completed!</p>
        )}
      </div>
    </div>
  );
}
