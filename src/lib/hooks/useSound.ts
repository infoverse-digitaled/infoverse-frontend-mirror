'use client';

import { useCallback, useEffect, useRef } from 'react';

// CC0 (public domain) SFX from Kenney's "Interface Sounds" pack (kenney.nl), converted to MP3.
const SOUND_FILES = {
  select: '/sounds/millionaire/select.mp3',
  lockIn: '/sounds/millionaire/lock-in.mp3',
  tick: '/sounds/millionaire/tick.mp3',
  correct: '/sounds/millionaire/correct.mp3',
  wrong: '/sounds/millionaire/wrong.mp3',
  win: '/sounds/millionaire/win.mp3',
  navClick: '/sounds/millionaire/nav-click.mp3',
} as const;

type SoundName = keyof typeof SOUND_FILES;

const MUTE_STORAGE_KEY = 'millionaire-sound-muted';

/**
 * Lightweight sound-effect player for the Millionaire game. Plain <Audio> elements are enough
 * here - short one-shot SFX plus a single looping tick, no mixing/ducking needed, so the Web
 * Audio API would be unnecessary overhead.
 */
export function useSound() {
  const audioCache = useRef<Partial<Record<SoundName, HTMLAudioElement>>>({});
  const loopingRef = useRef<HTMLAudioElement | null>(null);
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

  const stopLoop = useCallback(() => {
    if (loopingRef.current) {
      loopingRef.current.pause();
      loopingRef.current.loop = false;
      loopingRef.current.currentTime = 0;
      loopingRef.current = null;
    }
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

  const startLoop = useCallback(
    (name: SoundName) => {
      stopLoop();
      if (mutedRef.current) return;
      const audio = getAudio(name);
      audio.loop = true;
      audio.currentTime = 0;
      loopingRef.current = audio;
      audio.play().catch(() => {});
    },
    [getAudio, stopLoop],
  );

  const toggleMuted = useCallback(() => {
    mutedRef.current = !mutedRef.current;
    try {
      localStorage.setItem(MUTE_STORAGE_KEY, String(mutedRef.current));
    } catch {
      // ignore
    }
    if (mutedRef.current) stopLoop();
    return mutedRef.current;
  }, [stopLoop]);

  const isMuted = useCallback(() => mutedRef.current, []);

  // Stop any looping sound if the component unmounts mid-suspense
  useEffect(() => stopLoop, [stopLoop]);

  return { play, startLoop, stopLoop, toggleMuted, isMuted };
}

export default useSound;
