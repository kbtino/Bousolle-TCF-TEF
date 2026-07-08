import type { ExerciseSeries } from "@/lib/types/exercise";

export const EXERCISE_SERIES: ExerciseSeries[] = [
  {
    id: "oral-serie-4",
    title: "Oral — série 4",
    meta: "3 questions · terminée",
    skillName: "Compréhension de l'oral",
    estimatedMinutes: 12,
    completedResult: "2/3",
    questions: [
      {
        question: "Deux collègues parlent d'une réunion. Quand aura-t-elle finalement lieu ?",
        audioDurationSeconds: 32,
        options: ["Lundi matin", "Mardi après-midi", "Jeudi matin", "Vendredi après-midi"],
        correctIndex: 2,
        explanation:
          "L'homme se corrige en fin de dialogue : « finalement, ce sera jeudi, à 9 heures ». Mardi et vendredi sont des distracteurs — au TCF, la bonne information arrive souvent après une correction.",
      },
      {
        question: "Pourquoi la femme ne peut-elle pas y assister ?",
        audioDurationSeconds: 32,
        options: ["Elle est en congé", "Elle a un rendez-vous médical", "Elle reçoit un client", "Elle est en déplacement"],
        correctIndex: 3,
        explanation:
          "« Je serai à Kara toute la semaine » indique un déplacement. Le rendez-vous médical est bien mentionné, mais pour une autre semaine — attention aux détails déplacés dans le temps.",
      },
      {
        question: "Que propose l'homme à la fin de la conversation ?",
        audioDurationSeconds: 32,
        options: ["Reporter la réunion", "Envoyer un compte rendu", "Organiser un appel vidéo", "Annuler le projet"],
        correctIndex: 1,
        explanation:
          "« Je t'enverrai le compte rendu dès la fin » : il propose un compte rendu. Il ne reporte pas la réunion — proposer une solution n'est pas changer la décision.",
      },
    ],
  },
  {
    id: "oral-serie-5",
    title: "Oral — série 5",
    meta: "3 questions · ~12 min · recommandée",
    skillName: "Compréhension de l'oral",
    estimatedMinutes: 12,
    questions: [
      {
        question: "Un client appelle un service après-vente. Quel est le problème ?",
        audioDurationSeconds: 32,
        options: [
          "Un colis endommagé à la livraison",
          "Un retard de livraison",
          "Une erreur de facturation",
          "Un produit manquant dans le colis",
        ],
        correctIndex: 0,
        explanation:
          "« La boîte est arrivée écrasée sur un côté » décrit un colis endommagé. Le retard est mentionné mais comme cause probable, pas comme le problème signalé.",
      },
      {
        question: "Que va faire l'entreprise pour dédommager le client ?",
        audioDurationSeconds: 32,
        options: ["Rembourser intégralement", "Envoyer un nouveau produit", "Offrir un bon de réduction", "Ne rien proposer"],
        correctIndex: 1,
        explanation:
          "« On vous renvoie un article neuf dès aujourd'hui » : c'est un remplacement, pas un remboursement ni un bon de réduction.",
      },
      {
        question: "Quand le client doit-il renvoyer le produit endommagé ?",
        audioDurationSeconds: 32,
        options: ["Immédiatement", "Sous 7 jours", "Il n'a rien à renvoyer", "Avant la fin du mois"],
        correctIndex: 2,
        explanation:
          "« Vous pouvez garder ou jeter l'ancien, pas besoin de le renvoyer » : c'est une politique fréquente pour les petits articles endommagés.",
      },
    ],
  },
  {
    id: "structures-serie-2",
    title: "Structures — série 2",
    meta: "10 questions · ~15 min",
    skillName: "Structures de la langue",
    estimatedMinutes: 15,
    questions: [
      {
        question: "« Bien qu'il ___ fatigué, il a terminé le rapport. »",
        options: ["est", "soit", "était", "sera"],
        correctIndex: 1,
        explanation: "« Bien que » impose le subjonctif : « bien qu'il soit fatigué ».",
      },
      {
        question: "« Nous partirons dès que le train ___ en gare. »",
        options: ["arrive", "arrivera", "arriverait", "soit arrivé"],
        correctIndex: 1,
        explanation: "Après « dès que » avec une action future, on utilise le futur simple : « arrivera ».",
      },
      {
        question: "« Ce document, je te ___ ai envoyé hier. »",
        options: ["le", "l'", "la", "les"],
        correctIndex: 1,
        explanation: "« Document » est masculin singulier et commence par une consonne muette pour l'élision : « je te l'ai envoyé ».",
      },
    ],
  },
  {
    id: "ecrit-serie-3",
    title: "Écrit — série 3",
    meta: "10 questions · ~20 min",
    skillName: "Compréhension de l'écrit",
    estimatedMinutes: 20,
    questions: [
      {
        question: "D'après l'affiche, à quelle condition l'entrée est-elle gratuite ?",
        passage:
          "« Journée portes ouvertes samedi 14 mars, 9 h-17 h. Entrée gratuite sur inscription préalable en ligne, places limitées. »",
        options: ["Pour tous sans condition", "En s'inscrivant à l'avance en ligne", "En arrivant avant 9 h", "Pour les groupes de 10 personnes"],
        correctIndex: 1,
        explanation: "Le texte précise « gratuite sur inscription préalable en ligne » : l'inscription à l'avance est la condition.",
      },
      {
        question: "Que doit faire le destinataire de ce message ?",
        passage:
          "« Votre colis est arrivé au point relais. Merci de le récupérer avant le 20, muni d'une pièce d'identité, sous peine de retour à l'expéditeur. »",
        options: ["Attendre une nouvelle livraison", "Aller le chercher avant le 20 avec une pièce d'identité", "Appeler le transporteur", "Payer des frais supplémentaires"],
        correctIndex: 1,
        explanation: "Le message demande explicitement de récupérer le colis avant le 20, avec une pièce d'identité.",
      },
    ],
  },
];

export function findExerciseSeries(id: string): ExerciseSeries | undefined {
  return EXERCISE_SERIES.find((series) => series.id === id);
}
