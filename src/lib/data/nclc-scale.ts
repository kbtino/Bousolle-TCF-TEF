import type { ExamType } from "@/lib/types/exam";

type Band = { minScore: number; cecrl: string; nclc: number };

// Source: knowledge/exam_structure.md — official TCF/TEF Canada score tables.
const TCF_BANDS: Band[] = [
  { minScore: 0, cecrl: "A1", nclc: 1 },
  { minScore: 100, cecrl: "A2", nclc: 3 },
  { minScore: 226, cecrl: "B1", nclc: 5 },
  { minScore: 406, cecrl: "B2", nclc: 7 },
  { minScore: 549, cecrl: "C1", nclc: 9 },
  { minScore: 699, cecrl: "C2", nclc: 12 },
];

const TEF_BANDS: Band[] = [
  { minScore: 0, cecrl: "A1", nclc: 1 },
  { minScore: 121, cecrl: "A2", nclc: 3 },
  { minScore: 181, cecrl: "B1", nclc: 5 },
  { minScore: 281, cecrl: "B2", nclc: 7 },
  { minScore: 349, cecrl: "C1", nclc: 9 },
  { minScore: 371, cecrl: "C2", nclc: 12 },
];

export const EXAM_MAX_SCORE: Record<ExamType, number> = { TCF: 699, TEF: 450 };

function bandsFor(exam: ExamType): Band[] {
  return exam === "TCF" ? TCF_BANDS : TEF_BANDS;
}

function bandForScore(exam: ExamType, rawScore: number): Band {
  const bands = bandsFor(exam);
  return [...bands].reverse().find((band) => rawScore >= band.minScore) ?? bands[0];
}

export function cecrlFromRawScore(exam: ExamType, rawScore: number): string {
  return bandForScore(exam, rawScore).cecrl;
}

export function nclcFromRawScore(exam: ExamType, rawScore: number): number {
  return bandForScore(exam, rawScore).nclc;
}

/** Lowest raw score that reaches the given NCLC level — the "you need at
 * least X points" reference used to show remaining progress. */
export function minRawScoreForNclc(exam: ExamType, targetNclc: number): number {
  const bands = bandsFor(exam);
  const band = bands.find((b) => b.nclc >= targetNclc) ?? bands[bands.length - 1];
  return band.minScore;
}

/** Official IRCC per-skill thresholds for NCLC 7 (Entrée Express) — the
 * only NCLC level these are published for. */
export const NCLC_7_SKILL_THRESHOLDS: Record<
  ExamType,
  { comprehensionOrale: number; comprehensionEcrite: number; expressionOrale: number; expressionEcrite: number }
> = {
  TCF: { comprehensionOrale: 331, comprehensionEcrite: 342, expressionOrale: 310, expressionEcrite: 14 },
  TEF: { comprehensionOrale: 269, comprehensionEcrite: 263, expressionOrale: 269, expressionEcrite: 263 },
};
