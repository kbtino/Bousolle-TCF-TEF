"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IconArrowLeft, IconSparkles } from "@tabler/icons-react";
import { MobileScreen } from "@/components/layout/MobileScreen";
import { Card } from "@/components/ui/Card";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { CriteriaScoreBars } from "@/components/ui/CriteriaScoreBars";
import { ScoreVsThreshold } from "@/components/ui/ScoreVsThreshold";
import { WRITING_PROMPT } from "@/lib/data/writing-prompt";
import { correctWriting } from "@/lib/services/writing-service";
import type { WritingCorrection } from "@/lib/types/writing";

type Phase = "edit" | "loading" | "done";

export default function EcriturePage() {
  const router = useRouter();
  const [text, setText] = useState(WRITING_PROMPT.sampleDraft);
  const [phase, setPhase] = useState<Phase>("edit");
  const [correction, setCorrection] = useState<WritingCorrection | null>(null);

  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;

  async function handleCorrect() {
    setPhase("loading");
    const result = await correctWriting(text);
    setCorrection(result);
    setPhase("done");
  }

  return (
    <MobileScreen>
      <div className="flex flex-1 flex-col gap-3 px-4 pb-4 pt-4.5">
        <div className="flex items-center gap-2.5">
          <button type="button" onClick={() => router.push("/bibliotheque")} aria-label="Retour" className="text-ink-600">
            <IconArrowLeft size={18} />
          </button>
          <div className="flex flex-col">
            <span className="text-h3 font-semibold text-ink-900">{WRITING_PROMPT.taskLabel}</span>
            <span className="text-[10px] text-ink-600">{WRITING_PROMPT.taskMeta}</span>
          </div>
        </div>

        <Card className="p-3.5">
          <div className="text-eyebrow font-semibold uppercase tracking-eyebrow text-ink-600">Consigne</div>
          <p className="mt-1.5 text-caption leading-normal text-ink-900">{WRITING_PROMPT.instructions}</p>
        </Card>

        {phase === "edit" && (
          <>
            <textarea
              value={text}
              onChange={(event) => setText(event.target.value)}
              className="min-h-[190px] flex-1 resize-none rounded-md border border-border bg-surface p-3.5 text-body leading-normal text-ink-900 outline-none"
            />
            <div className="flex items-center justify-between text-[10.5px]">
              <span className="font-mono text-ink-600">
                {wordCount} mots · min {WRITING_PROMPT.minWords}
              </span>
              <span className="text-ink-400">Brouillon enregistré</span>
            </div>
            <PrimaryButton onClick={() => void handleCorrect()}>
              <IconSparkles size={16} /> Corriger avec l&rsquo;IA
            </PrimaryButton>
          </>
        )}

        {phase === "loading" && (
          <div className="flex flex-1 flex-col items-center justify-center gap-3.5">
            <div className="h-8 w-8 animate-spin rounded-full border-[3px] border-green-100 border-t-primary" />
            <div className="text-[13px] font-semibold text-ink-900">Correction en cours…</div>
            <div className="text-caption text-ink-600">Grammaire, lexique, cohérence, consigne</div>
          </div>
        )}

        {phase === "done" && correction && (
          <>
            <Card className="p-3.5 text-body leading-[1.75] text-ink-900">
              {correction.segments.map((segment, i) => (
                <span
                  key={i}
                  className={segment.isError ? "rounded-xs border-b-2 border-dashed border-danger bg-error-bg" : undefined}
                >
                  {segment.text}
                </span>
              ))}
            </Card>

            <Card className="p-3.5">
              <ScoreVsThreshold
                label="Score estimé"
                value={correction.scoreTotal}
                max={correction.scoreMax}
                thresholdLabel={correction.thresholdLabel}
              />
              <div className="mt-2.5">
                <CriteriaScoreBars criteria={correction.criteria} />
              </div>
            </Card>

            <Card className="px-3.5">
              <div className="py-2.5 text-eyebrow font-semibold uppercase tracking-eyebrow text-ink-600">
                Corrections proposées
              </div>
              {correction.segments
                .filter((segment) => segment.isError)
                .map((segment, i) => (
                  <div key={i} className="flex flex-col gap-0.5 border-t border-border-faint py-2">
                    <div className="text-[12px] leading-normal">
                      <span className="text-error line-through">{segment.text}</span> →{" "}
                      <strong className="text-primary">{segment.fix}</strong>
                    </div>
                    <span className="text-[10px] text-ink-600">{segment.errorType}</span>
                  </div>
                ))}
            </Card>

            <PrimaryButton onClick={() => setPhase("edit")}>Réviser ma copie</PrimaryButton>
          </>
        )}
      </div>
    </MobileScreen>
  );
}
