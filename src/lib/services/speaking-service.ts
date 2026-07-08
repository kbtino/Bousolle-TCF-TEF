import type { SpeakingCorrection } from "@/lib/types/speaking";

const MOCK_TRANSCRIPT =
  "« Euh… je pense que vivre en ville, c'est mieux parce que… il y a plus de possibilités de travail. Par exemple à Lomé, euh… on trouve beaucoup d'entreprises et les transports sont plus faciles. Mais la campagne, c'est plus calme, euh… pour les enfants. »";

/**
 * V1 has no real speech-to-text API — the recording is real (see
 * useMediaRecorder) but the transcript is a fixed, realistic example.
 * Swapping in Whisper/Deepgram later only changes this function's body.
 */
export async function transcribeSpeech(): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return MOCK_TRANSCRIPT;
}

/**
 * V1 has no real pronunciation/fluency analysis — this returns a fixed,
 * realistic result so the screen has believable data. Swapping in a real
 * analysis model later only changes this function's body.
 */
export async function analyzeSpeech(transcript: string): Promise<SpeakingCorrection> {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return {
    transcript,
    estimatedNclc: 6,
    thresholdLabel: "seuil 7 : 310/699",
    criteria: [
      { name: "Prononciation", score: 4, max: 6 },
      { name: "Fluidité", score: 3, max: 6 },
      { name: "Grammaire", score: 4, max: 6 },
      { name: "Vocabulaire", score: 4, max: 6 },
    ],
    tips: [
      "Réduisez les hésitations (« euh ») : préparez des connecteurs — d'abord, ensuite, par exemple, en conclusion.",
      "Structurez : opinion claire → deux arguments → un exemple concret → conclusion.",
      "Développez l'argument opposé (« la campagne ») pour montrer la nuance, attendue au niveau B2.",
    ],
  };
}
