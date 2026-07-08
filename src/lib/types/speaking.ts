export type SpeakingCriterion = { name: string; score: number; max: number };

export type SpeakingCorrection = {
  transcript: string;
  estimatedNclc: number;
  thresholdLabel: string;
  criteria: SpeakingCriterion[];
  tips: string[];
};
