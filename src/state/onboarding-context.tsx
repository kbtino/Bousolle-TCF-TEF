"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { ExamDate, ExamType } from "@/lib/types/exam";
import type { DiagnosticAnswer, DiagnosticResult } from "@/lib/types/diagnostic";

type OnboardingState = {
  exam: ExamType;
  goal: number;
  when: ExamDate;
  diagnosticAnswers: DiagnosticAnswer[];
  diagnosticResult: DiagnosticResult | null;
};

type OnboardingContextValue = OnboardingState & {
  setExam: (exam: ExamType) => void;
  setGoal: (goal: number) => void;
  setWhen: (when: ExamDate) => void;
  recordDiagnosticAnswer: (answer: DiagnosticAnswer) => void;
  resetDiagnosticAnswers: () => void;
  setDiagnosticResult: (result: DiagnosticResult) => void;
};

const DEFAULT_STATE: OnboardingState = {
  exam: "TCF",
  goal: 7,
  when: "3mois",
  diagnosticAnswers: [],
  diagnosticResult: null,
};

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<OnboardingState>(DEFAULT_STATE);

  const value: OnboardingContextValue = {
    ...state,
    setExam: (exam) => setState((s) => ({ ...s, exam })),
    setGoal: (goal) => setState((s) => ({ ...s, goal })),
    setWhen: (when) => setState((s) => ({ ...s, when })),
    recordDiagnosticAnswer: (answer) =>
      setState((s) => ({ ...s, diagnosticAnswers: [...s.diagnosticAnswers, answer] })),
    resetDiagnosticAnswers: () => setState((s) => ({ ...s, diagnosticAnswers: [], diagnosticResult: null })),
    setDiagnosticResult: (result) => setState((s) => ({ ...s, diagnosticResult: result })),
  };

  return <OnboardingContext.Provider value={value}>{children}</OnboardingContext.Provider>;
}

export function useOnboarding() {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error("useOnboarding must be used within an OnboardingProvider");
  return ctx;
}
