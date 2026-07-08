import type { DiagnosticQuestion } from "@/lib/types/diagnostic";

/**
 * V1 ships 5 representative questions (one per pattern: audio, grammar,
 * two reading passages) standing in for the real 30-question diagnostic.
 * The UI reads `questions.length` everywhere, so extending this array to
 * the full 30 later is a data-only change.
 */
export const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    section: "Compréhension de l'oral",
    audioDurationSeconds: 32,
    question: "Vous entendez ce message à la radio. Que propose l'annonce ?",
    options: [
      "Un concert gratuit ce week-end",
      "Une réduction sur les billets de train",
      "L'ouverture d'un nouveau marché",
      "Un changement d'horaires de bus",
    ],
  },
  {
    section: "Structures de la langue",
    question: "« Si j'avais su que tu venais, je ___ un plat de plus. »",
    options: ["préparerais", "aurais préparé", "préparais", "ai préparé"],
  },
  {
    section: "Compréhension de l'écrit",
    passage:
      "« La bibliothèque municipale sera fermée du 2 au 15 mars pour travaux. Les retours de livres restent possibles à la borne extérieure, 24 h/24. »",
    question: "Pendant les travaux, il est possible de…",
    options: [
      "emprunter de nouveaux livres",
      "rendre des livres à toute heure",
      "réserver une salle d'étude",
      "rencontrer un bibliothécaire",
    ],
  },
  {
    section: "Structures de la langue",
    question: "« Elle a réussi son examen ___ ses efforts. »",
    options: ["grâce à", "à cause de", "malgré", "faute de"],
  },
  {
    section: "Compréhension de l'écrit",
    passage:
      "« Recherchons vendeur(se) à temps partiel. Expérience souhaitée mais non exigée. Se présenter avec CV entre 9 h et 12 h. »",
    question: "Pour postuler, il faut…",
    options: [
      "avoir une expérience obligatoire",
      "envoyer le CV par courriel",
      "venir le matin avec un CV",
      "téléphoner avant midi",
    ],
  },
];

export const DIAGNOSTIC_DURATION_SECONDS = 25 * 60;
