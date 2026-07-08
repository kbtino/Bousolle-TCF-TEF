"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IconArrowLeft, IconBulb, IconMicrophone, IconPlayerStopFilled, IconSparkles } from "@tabler/icons-react";
import { MobileScreen } from "@/components/layout/MobileScreen";
import { AudioPlayer } from "@/components/audio/AudioPlayer";
import { Card } from "@/components/ui/Card";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { CriteriaScoreBars } from "@/components/ui/CriteriaScoreBars";
import { useMediaRecorder } from "@/hooks/useMediaRecorder";
import { formatMinutesSeconds } from "@/lib/format";
import { WAVEFORM_BAR_HEIGHTS } from "@/lib/audio-waveform";
import { SPEAKING_PROMPT } from "@/lib/data/speaking-prompt";
import { analyzeSpeech, transcribeSpeech } from "@/lib/services/speaking-service";
import type { SpeakingCorrection } from "@/lib/types/speaking";

type Phase = "idle" | "recording" | "review" | "loading" | "done";

export default function OralPage() {
  const router = useRouter();
  const recorder = useMediaRecorder();
  const [phase, setPhase] = useState<Phase>("idle");
  const [recSeconds, setRecSeconds] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [correction, setCorrection] = useState<SpeakingCorrection | null>(null);

  useEffect(() => {
    if (phase !== "recording") return;
    const id = setInterval(() => setRecSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [phase]);

  async function handleStart() {
    setRecSeconds(0);
    await recorder.start();
    setPhase("recording");
  }

  async function handleStop() {
    recorder.stop();
    const text = await transcribeSpeech();
    setTranscript(text);
    setPhase("review");
  }

  async function handleAnalyze() {
    setPhase("loading");
    const result = await analyzeSpeech(transcript);
    setCorrection(result);
    setPhase("done");
  }

  function handleRetry() {
    recorder.reset();
    setPhase("idle");
  }

  return (
    <MobileScreen>
      <div className="flex flex-1 flex-col gap-3 px-4 pb-4 pt-4.5">
        <div className="flex items-center gap-2.5">
          <button type="button" onClick={() => router.push("/bibliotheque")} aria-label="Retour" className="text-ink-600">
            <IconArrowLeft size={18} />
          </button>
          <div className="flex flex-col">
            <span className="text-h3 font-semibold text-ink-900">{SPEAKING_PROMPT.taskLabel}</span>
            <span className="text-[10px] text-ink-600">{SPEAKING_PROMPT.taskMeta}</span>
          </div>
        </div>

        <Card className="p-3.5">
          <div className="text-eyebrow font-semibold uppercase tracking-eyebrow text-ink-600">Sujet</div>
          <p className="mt-1.5 text-caption leading-normal text-ink-900">{SPEAKING_PROMPT.topic}</p>
        </Card>

        {phase === "idle" && (
          <div className="flex flex-1 flex-col items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => void handleStart()}
              aria-label="Enregistrer"
              className="flex h-[76px] w-[76px] items-center justify-center rounded-full bg-primary text-white shadow-primary hover:bg-primary-hover"
            >
              <IconMicrophone size={32} />
            </button>
            <div className="text-[13px] font-semibold text-ink-900">Appuyez pour enregistrer</div>
            <p className="text-center text-caption leading-normal text-ink-600">
              Préparez-vous 1 minute, puis parlez 2 minutes.
              <br />
              Votre réponse est transcrite et notée par l&rsquo;IA.
            </p>
            {recorder.status === "error" && (
              <p className="text-center text-[11px] text-error">
                Micro indisponible — autorisez l&rsquo;accès au micro dans votre navigateur.
              </p>
            )}
          </div>
        )}

        {phase === "recording" && (
          <div className="flex flex-1 flex-col items-center justify-center gap-4">
            <div className="font-mono text-h1 font-bold text-ink-900">{formatMinutesSeconds(recSeconds)}</div>
            <div className="flex h-10 w-full items-center gap-0.5 px-3">
              {WAVEFORM_BAR_HEIGHTS.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm bg-primary transition-[height] duration-300"
                  style={{ height: 8 + ((h * 3 + recSeconds * 11 + i * 7) % 26) }}
                />
              ))}
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-error">
              <span className="h-2 w-2 rounded-full bg-danger" />
              Enregistrement en cours
            </div>
            <button
              type="button"
              onClick={() => void handleStop()}
              aria-label="Arrêter"
              className="flex h-[60px] w-[60px] items-center justify-center rounded-full border-[1.5px] border-danger bg-surface text-danger"
            >
              <IconPlayerStopFilled size={22} />
            </button>
          </div>
        )}

        {phase === "review" && (
          <>
            <AudioPlayer durationSeconds={Math.max(recSeconds, 1)} />
            <Card className="p-3.5">
              <div className="text-eyebrow font-semibold uppercase tracking-eyebrow text-ink-600">
                Transcription automatique
              </div>
              <p className="mt-1.5 text-caption italic leading-normal text-ink-900">{transcript}</p>
            </Card>
            <div className="mt-auto flex flex-col gap-2">
              <PrimaryButton onClick={() => void handleAnalyze()}>
                <IconSparkles size={16} /> Analyser ma réponse
              </PrimaryButton>
              <SecondaryButton onClick={handleRetry}>Réenregistrer</SecondaryButton>
            </div>
          </>
        )}

        {phase === "loading" && (
          <div className="flex flex-1 flex-col items-center justify-center gap-3.5">
            <div className="h-8 w-8 animate-spin rounded-full border-[3px] border-green-100 border-t-primary" />
            <div className="text-[13px] font-semibold text-ink-900">Analyse de votre réponse…</div>
            <div className="text-caption text-ink-600">Prononciation, fluidité, grammaire, vocabulaire</div>
          </div>
        )}

        {phase === "done" && correction && (
          <>
            <Card className="p-3.5">
              <div className="flex items-baseline justify-between">
                <span className="text-eyebrow font-semibold uppercase tracking-eyebrow text-ink-600">
                  Niveau estimé — oral
                </span>
                <span className="font-mono text-[13px] font-bold text-ink-900">
                  ≈ NCLC {correction.estimatedNclc}{" "}
                  <span className="text-[10px] font-semibold text-warn">· {correction.thresholdLabel}</span>
                </span>
              </div>
              <div className="mt-2.5">
                <CriteriaScoreBars criteria={correction.criteria} />
              </div>
            </Card>

            <Card className="px-3.5">
              <div className="py-2.5 text-eyebrow font-semibold uppercase tracking-eyebrow text-ink-600">Conseils</div>
              {correction.tips.map((tip, i) => (
                <div key={i} className="flex gap-2 border-t border-border-faint py-2 text-[12px] leading-normal text-ink-900">
                  <IconBulb size={14} className="mt-0.5 flex-none text-accent" />
                  <span>{tip}</span>
                </div>
              ))}
            </Card>

            <div className="mt-auto flex flex-col gap-2">
              <PrimaryButton onClick={handleRetry}>Réessayer la tâche</PrimaryButton>
              <SecondaryButton onClick={() => router.push("/bibliotheque")}>Retour aux exercices</SecondaryButton>
            </div>
          </>
        )}
      </div>
    </MobileScreen>
  );
}
