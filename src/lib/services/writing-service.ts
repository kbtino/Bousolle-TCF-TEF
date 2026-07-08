import type { WritingCorrection } from "@/lib/types/writing";

const MOCK_SEGMENTS = [
  { text: "Le graphique montre l'évolution du nombre d'étudiants " },
  { text: "inscrit", isError: true, fix: "inscrits", errorType: "Accord du participe passé" },
  { text: " à l'université entre 2010 et 2020. On observe une " },
  { text: "augmentation important", isError: true, fix: "augmentation importante", errorType: "Accord de l'adjectif" },
  { text: " du nombre d'inscriptions. En 2010, il y avait 2 000 étudiants, alors qu'en 2020 " },
  { text: "ils sont 3 500", isError: true, fix: "on en compte 3 500", errorType: "Tournure / registre écrit" },
  { text: ". Cette hausse s'explique par les nouvelles filières que l'université a " },
  { text: "ouvert", isError: true, fix: "ouvertes", errorType: "Accord du participe avec le COD" },
  { text: "." },
];

/**
 * V1 has no real grammar-correction API — this returns a fixed, realistic
 * correction so the screen has believable data to render. Swapping in
 * LanguageTool later only changes this function's body.
 */
export async function correctWriting(text: string): Promise<WritingCorrection> {
  await new Promise((resolve) => setTimeout(resolve, 1600));

  return {
    segments: MOCK_SEGMENTS,
    scoreTotal: 13,
    scoreMax: 24,
    thresholdLabel: "seuil NCLC 7 : 14",
    criteria: [
      { name: "Respect de la consigne", score: 5, max: 6 },
      { name: "Cohérence", score: 4, max: 6 },
      { name: "Lexique", score: 3, max: 6 },
      { name: "Grammaire", score: 3, max: 6 },
    ],
  };
}
