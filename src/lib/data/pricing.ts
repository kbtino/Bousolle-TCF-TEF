import type { DurationKey, PlanKey } from "@/lib/types/pricing";

// Tarifs validés (voir knowledge/prompt.md pour la décision produit).
export const PRICING: Record<PlanKey, Record<DurationKey, { priceFcfa: number; priceUsd: string }>> = {
  standard: {
    semaine: { priceFcfa: 2500, priceUsd: "~4 $ US" },
    mois: { priceFcfa: 6000, priceUsd: "~10 $ US" },
    trois: { priceFcfa: 15000, priceUsd: "~25 $ US" },
  },
  premium: {
    semaine: { priceFcfa: 4000, priceUsd: "~6,5 $ US" },
    mois: { priceFcfa: 10000, priceUsd: "~17 $ US" },
    trois: { priceFcfa: 25000, priceUsd: "~42 $ US" },
  },
};

export const DURATION_LABELS: Record<DurationKey, { short: string; full: string }> = {
  semaine: { short: "Semaine", full: "1 semaine" },
  mois: { short: "Mois", full: "1 mois" },
  trois: { short: "3 mois", full: "3 mois" },
};

export const PLAN_LABELS: Record<PlanKey, string> = {
  standard: "Standard",
  premium: "Premium",
};

export const PLAN_PERKS: Record<PlanKey, string[]> = {
  standard: [
    "Séries et simulations illimitées",
    "Correction IA de l'expression écrite",
    "Plan d'étude 30/60/90 jours",
  ],
  premium: [
    "Tout Standard, plus :",
    "Correction IA de l'expression orale (prononciation, fluidité)",
    "Simulations orales en conditions réelles",
  ],
};

export const MOMO_NETWORKS = ["T-Money", "Flooz", "Orange"];
