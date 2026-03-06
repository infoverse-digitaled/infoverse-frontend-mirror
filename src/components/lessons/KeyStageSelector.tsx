import clsx from 'clsx';

interface KeyStageSelectorProps {
  selectedKeyStage: number;
  onSelect: (keyStage: number) => void;
}

// Matches the stageColors defined on the public key stages page
const KEY_STAGE_COLORS = [
  {
    // KS1 — Blue / Cyan
    active: 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-blue-200',
    inactive: 'bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-100',
  },
  {
    // KS2 — Green / Emerald
    active: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-green-200',
    inactive: 'bg-green-50 text-green-600 hover:bg-green-100 border border-green-100',
  },
  {
    // KS3 — Purple / Pink
    active: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-purple-200',
    inactive: 'bg-purple-50 text-purple-600 hover:bg-purple-100 border border-purple-100',
  },
  {
    // KS4 — Orange / Red
    active: 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-orange-200',
    inactive: 'bg-orange-50 text-orange-600 hover:bg-orange-100 border border-orange-100',
  },
];

export function KeyStageSelector({
  selectedKeyStage,
  onSelect,
}: KeyStageSelectorProps) {
  const keyStages = [1, 2, 3, 4];

  return (
    <div className="flex flex-wrap gap-3">
      {keyStages.map((ks) => {
        const colors = KEY_STAGE_COLORS[ks - 1];
        const isActive = selectedKeyStage === ks;
        return (
          <button
            key={ks}
            onClick={() => onSelect(ks)}
            className={clsx(
              'px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 shadow-sm',
              isActive ? `${colors.active} shadow-md` : colors.inactive
            )}
          >
            Key Stage {ks}
          </button>
        );
      })}
    </div>
  );
}
