"use client";

import { useEffect, useState } from "react";

/**
 * No real audio files in V1 — this simulates playback progress so the
 * listening-comprehension screens still feel real. Swapping in a real
 * <audio> element later only touches this hook.
 */
export function useAudioPlayer(durationSeconds: number) {
  const [state, setState] = useState({ position: 0, isPlaying: false });

  useEffect(() => {
    if (!state.isPlaying) return;
    const id = setInterval(() => {
      setState((current) => {
        const next = current.position + 1;
        if (next >= durationSeconds) return { position: durationSeconds, isPlaying: false };
        return { position: next, isPlaying: true };
      });
    }, 1000);
    return () => clearInterval(id);
  }, [state.isPlaying, durationSeconds]);

  function toggle() {
    setState((current) => {
      if (current.position >= durationSeconds) return { position: 0, isPlaying: true };
      return { ...current, isPlaying: !current.isPlaying };
    });
  }

  return { position: state.position, isPlaying: state.isPlaying, toggle };
}
