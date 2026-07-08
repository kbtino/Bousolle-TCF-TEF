export type ExerciseQuestion = {
  question: string;
  audioDurationSeconds?: number;
  passage?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export type ExerciseSeries = {
  id: string;
  title: string;
  meta: string;
  skillName: string;
  estimatedMinutes: number;
  requiresPremium?: boolean;
  /** Mock "already completed" state for the library list (e.g. "2/3"). */
  completedResult?: string;
  questions: ExerciseQuestion[];
};
