import type { ExamDate, ExamType } from "@/lib/types/exam";

export const EXAMS: { type: ExamType; name: string; description: string }[] = [
  { type: "TCF", name: "TCF Canada", description: "QCM + 3 tâches écrites, 3 orales · score /699" },
  { type: "TEF", name: "TEF Canada", description: "QCM + 2 tâches écrites, 5 orales · score /450" },
];

export const NCLC_GOAL_OPTIONS = [5, 6, 7, 8, 9, 10];
export const NCLC_ENTREE_EXPRESS_THRESHOLD = 7;

export const EXAM_DATE_OPTIONS: { value: ExamDate; label: string }[] = [
  { value: "1mois", label: "Dans 1 mois" },
  { value: "3mois", label: "Dans 3 mois" },
  { value: "6mois", label: "Dans 6 mois" },
  { value: "nd", label: "Pas encore fixé" },
];
