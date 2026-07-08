export type DiagnosticQuestion = {
  section: string;
  audioDurationSeconds?: number;
  passage?: string;
  question: string;
  options: string[];
};

export type DiagnosticAnswer = {
  questionIndex: number;
  selectedIndex: number;
};

export type DiagnosticSkillResult = {
  name: string;
  score: number;
  threshold: number;
};

export type DiagnosticResult = {
  rawScore: number;
  rawMax: number;
  cecrlLevel: string;
  nclcLevel: number;
  weakestSkill: string;
  skills: DiagnosticSkillResult[];
};
