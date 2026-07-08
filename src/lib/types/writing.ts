export type WritingSegment = {
  text: string;
  isError?: boolean;
  fix?: string;
  errorType?: string;
};

export type WritingCriterion = { name: string; score: number; max: number };

export type WritingCorrection = {
  segments: WritingSegment[];
  scoreTotal: number;
  scoreMax: number;
  thresholdLabel: string;
  criteria: WritingCriterion[];
};
