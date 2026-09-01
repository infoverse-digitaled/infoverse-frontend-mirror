'use client';

import { useCallback, useEffect, useRef } from 'react';

// CC0 (public domain) SFX from Kenney's "Interface Sounds" pack (kenney.nl), converted to MP3
// for Safari compatibility. Background music is "Determined Pursuit (epic orchestra loop)",
// CC0 (opengameart.org/content/determined-pursuit-epic-orchestra-loop), also converted to MP3.
const SOUND_FILES = {
  select: '/sounds/millionaire/select.mp3',
  lockIn: '/sounds/millionaire/lock-in.mp3',
  correct: '/sounds/millionaire/correct.mp3',
  wrong: '/sounds/millionaire/wrong.mp3',
  win: '/sounds/millionaire/win.mp3',
  navClick: '/sounds/millionaire/nav-click.mp3',
} as const;

const MUSIC_FILE = '/sounds/millionaire/bg-music.mp3';

type SoundName = keyof typeof SOUND_FILES;

const MUTE_STORAGE_KEY = 'millionaire-sound-muted';

/**
 * Lightweight sound player for the Millionaire game: one-shot SFX plus a single looping
 * background music track. Plain <Audio> elements are enough here, no mixing/ducking needed,
 * so the Web Audio API would be unnecessary overhead.
 */
export function useSound() {
  const audioCache = useRef<Partial<Record<SoundName, HTMLAudioElement>>>({});
  const musicRef = useRef<HTMLAudioElement | null>(null);
  const mutedRef = useRef(false);

  useEffect(() => {
    try {
      mutedRef.current = localStorage.getItem(MUTE_STORAGE_KEY) === 'true';
    } catch {
      // localStorage can throw in private-browsing contexts; default to unmuted.
    }
  }, []);

  const getAudio = useCallback((name: SoundName) => {
    let audio = audioCache.current[name];
    if (!audio) {
      audio = new Audio(SOUND_FILES[name]);
      audio.preload = 'auto';
      audioCache.current[name] = audio;
    }
    return audio;
  }, []);

  const getMusic = useCallback(() => {
    if (!musicRef.current) {
      const audio = new Audio(MUSIC_FILE);
      audio.preload = 'auto';
      audio.loop = true;
      musicRef.current = audio;
    }
    return musicRef.current;
  }, []);

  const play = useCallback(
    (name: SoundName) => {
      if (mutedRef.current) return;
      const audio = getAudio(name);
      audio.currentTime = 0;
      audio.play().catch(() => {
        // Autoplay can be blocked outside a user gesture; safe to ignore.
      });
    },
    [getAudio],
  );

  // Call from inside a user-gesture handler (e.g. "Start Game") so the browser's autoplay
  // policy allows it. Resumes from wherever it left off rather than restarting.
  const playMusic = useCallback(() => {
    if (mutedRef.current) return;
    const audio = getMusic();
    audio.play().catch(() => {});
  }, [getMusic]);

  const stopMusic = useCallback(() => {
    if (musicRef.current) {
      musicRef.current.pause();
    }
  }, []);

  const toggleMuted = useCallback(() => {
    mutedRef.current = !mutedRef.current;
    try {
      localStorage.setItem(MUTE_STORAGE_KEY, String(mutedRef.current));
    } catch {
      // ignore
    }
    if (mutedRef.current) {
      stopMusic();
    } else {
      musicRef.current?.play().catch(() => {});
    }
    return mutedRef.current;
  }, [stopMusic]);

  const isMuted = useCallback(() => mutedRef.current, []);

  // Stop music if the component unmounts (e.g. navigating away from the game)
  useEffect(() => stopMusic, [stopMusic]);

  return { play, playMusic, stopMusic, toggleMuted, isMuted };
}

export default useSound;
