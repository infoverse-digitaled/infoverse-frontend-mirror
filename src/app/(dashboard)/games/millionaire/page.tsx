'use client';

import dynamic from 'next/dynamic';

// Excalibur touches the DOM/canvas at construction time, so this must never render on the server.
const MillionaireView = dynamic(
  () => import('@/components/games/millionaire/MillionaireView').then((mod) => mod.MillionaireView),
  { ssr: false },
);

export default function MillionaireGamePage() {
  return <MillionaireView />;
}
