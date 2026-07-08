"use client";

import { useEffect, useState } from "react";

/** A ticking countdown timer. The caller owns what happens on expiry —
 * watch `isExpired` in a `useEffect` rather than passing a callback in,
 * so this hook stays a pure timer with no side effects of its own. */
export function useCountdown(initialSeconds: number) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) return;
    const id = setInterval(() => {
      setSecondsLeft((current) => {
        if (current <= 1) {
          setIsRunning(false);
          return 0;
        }
        return current - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [isRunning]);

  return {
    secondsLeft,
    isExpired: secondsLeft <= 0,
    reset: (seconds: number) => {
      setSecondsLeft(seconds);
      setIsRunning(true);
    },
  };
}
