import type { DiagnosticAnswer, DiagnosticResult } from "@/lib/types/diagnostic";
import type { ExamType } from "@/lib/types/exam";
import { cecrlFromRawScore, nclcFromRawScore, NCLC_7_SKILL_THRESHOLDS } from "@/lib/data/nclc-scale";

const MOCK_RAW_SCORE: Record<ExamType, number> = { TCF: 302, TEF: 196 };

/**
 * V1 has no real scoring engine — 5 sample questions can't produce a
 * trustworthy estimate. This returns a realistic, fixed result so the
 * result/dashboard screens have believable data to render. Swapping in a
 * real scoring model later only changes this function's body.
 */
export async function analyzeDiagnostic(answers: DiagnosticAnswer[], exam: ExamType): Promise<DiagnosticResult> {
  await new Promise((resolve) => setTimeout(resolve, 1900));

  const rawScore = MOCK_RAW_SCORE[exam];
  const thresholds = NCLC_7_SKILL_THRESHOLDS[exam];

  return {
    rawScore,
    rawMax: exam === "TCF" ? 699 : 450,
    cecrlLevel: `${cecrlFromRawScore(exam, rawScore)}+`,
    nclcLevel: nclcFromRawScore(exam, rawScore),
    weakestSkill: "Compréhension de l'oral",
    skills: [
      { name: "Compréhension de l'oral", score: Math.round(rawScore * 0.96), threshold: thresholds.comprehensionOrale },
      { name: "Structures de la langue", score: Math.round(rawScore * 1.01), threshold: 0 },
      { name: "Compréhension de l'écrit", score: Math.round(rawScore * 1.05), threshold: thresholds.comprehensionEcrite },
    ],
  };
}
