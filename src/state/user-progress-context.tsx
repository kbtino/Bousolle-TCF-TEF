"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type PlanType = "free" | "standard" | "premium";

type UserProgressState = {
  plan: PlanType;
  freeSeriesRemaining: number;
  streakDays: number;
  daysUntilExam: number;
  monthlyPointsGain: number;
};

type UserProgressContextValue = UserProgressState & {
  consumeFreeSeries: () => void;
  setPlan: (plan: PlanType) => void;
};

// Mock defaults matching the approved design's persona (Awa: NCLC 7 goal,
// exam in 42 days, 7-day streak). Real values will come from the backend later.
const DEFAULT_STATE: UserProgressState = {
  plan: "free",
  freeSeriesRemaining: 2,
  streakDays: 7,
  daysUntilExam: 42,
  monthlyPointsGain: 18,
};

const UserProgressContext = createContext<UserProgressContextValue | null>(null);

export function UserProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<UserProgressState>(DEFAULT_STATE);

  const value: UserProgressContextValue = {
    ...state,
    consumeFreeSeries: () =>
      setState((s) => ({ ...s, freeSeriesRemaining: Math.max(0, s.freeSeriesRemaining - 1) })),
    setPlan: (plan) => setState((s) => ({ ...s, plan })),
  };

  return <UserProgressContext.Provider value={value}>{children}</UserProgressContext.Provider>;
}

export function useUserProgress() {
  const ctx = useContext(UserProgressContext);
  if (!ctx) throw new Error("useUserProgress must be used within a UserProgressProvider");
  return ctx;
}
