import type { ExamType } from "@/lib/types/exam";
import { minRawScoreForNclc } from "@/lib/data/nclc-scale";

/** How many raw points are still needed to reach the target NCLC level. */
export function pointsRemaining(exam: ExamType, currentRawScore: number, targetNclc: number): number {
  return Math.max(0, minRawScoreForNclc(exam, targetNclc) - currentRawScore);
}

/** Clamps a value/max pair to a 0-100 percentage, for progress bars and gauges. */
export function toPercent(value: number, maxValue: number): number {
  if (maxValue <= 0) return 0;
  return Math.min(100, Math.max(0, (value / maxValue) * 100));
}
