'use client';

import { useCallback, useEffect, useRef } from 'react';

// UI blips are CC0 (public domain) from Kenney's "Interface Sounds" pack (kenney.nl).
// The tension cue is a CC0 excerpt of "Tension" by Trevor Lentz (opengameart.org/content/midi-2-tension-songs).
// All converted to MP3 for Safari compatibility.
const SOUND_FILES = {
  select: '/sounds/millionaire/select.mp3',
  lockIn: '/sounds/millionaire/lock-in.mp3',
  tension: '/sounds/millionaire/tension.mp3',
  correct: '/sounds/millionaire/correct.mp3',
  wrong: '/sounds/millionaire/wrong.mp3',
  win: '/sounds/millionaire/win.mp3',
  navClick: '/sounds/millionaire/nav-click.mp3',
} as const;

type SoundName = keyof typeof SOUND_FILES;

const MUTE_STORAGE_KEY = 'millionaire-sound-muted';

const AMBIENT_FADE_MS = 220;

/**
 * Lightweight sound-effect player for the Millionaire game. Plain <Audio> elements are enough
 * here - short one-shot SFX plus a single tension cue, no mixing/ducking needed, so the Web
 * Audio API would be unnecessary overhead.
 */
export function useSound() {
  const audioCache = useRef<Partial<Record<SoundName, HTMLAudioElement>>>({});
  const ambientRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
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

  // Fades out and pauses whatever ambient cue is currently playing, so cutting it short for a
  // reveal doesn't sound like an abrupt hard stop.
  const stopAmbient = useCallback(() => {
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
    const audio = ambientRef.current;
    if (!audio) return;
    ambientRef.current = null;

    const steps = 8;
    const startVolume = audio.volume;
    let step = 0;
    fadeIntervalRef.current = setInterval(() => {
      step += 1;
      audio.volume = Math.max(0, startVolume * (1 - step / steps));
      if (step >= steps) {
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
        audio.pause();
        audio.currentTime = 0;
        audio.volume = startVolume;
      }
    }, AMBIENT_FADE_MS / steps);
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

  // Plays a longer cue once (not looped - it has its own fade-out baked in) and remembers it
  // so stopAmbient() can cut it short gracefully if the reveal comes before it finishes.
  const playAmbient = useCallback(
    (name: SoundName) => {
      stopAmbient();
      if (mutedRef.current) return;
      const audio = getAudio(name);
      audio.currentTime = 0;
      audio.volume = 1;
      ambientRef.current = audio;
      audio.play().catch(() => {});
    },
    [getAudio, stopAmbient],
  );

  const toggleMuted = useCallback(() => {
    mutedRef.current = !mutedRef.current;
    try {
      localStorage.setItem(MUTE_STORAGE_KEY, String(mutedRef.current));
    } catch {
      // ignore
    }
    if (mutedRef.current) stopAmbient();
    return mutedRef.current;
  }, [stopAmbient]);

  const isMuted = useCallback(() => mutedRef.current, []);

  // Stop any ambient cue if the component unmounts mid-suspense
  useEffect(() => stopAmbient, [stopAmbient]);

  return { play, playAmbient, stopAmbient, toggleMuted, isMuted };
}

export default useSound;
