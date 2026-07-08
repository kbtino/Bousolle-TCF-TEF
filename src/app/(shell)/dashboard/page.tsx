"use client";

import { useRouter } from "next/navigation";
import {
  IconArrowRight,
  IconCalendarEvent,
  IconCompass,
  IconFlame,
  IconHeadphones,
  IconTrendingUp,
} from "@tabler/icons-react";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SkillProgressList } from "./_components/SkillProgressList";
import { useOnboarding } from "@/state/onboarding-context";
import { useUserProgress } from "@/state/user-progress-context";
import { pointsRemaining, toPercent } from "@/lib/scoring";
import { minRawScoreForNclc } from "@/lib/data/nclc-scale";
import { EXERCISE_SERIES } from "@/lib/data/exercise-series";

export default function DashboardPage() {
  const router = useRouter();
  const { exam, goal, diagnosticResult } = useOnboarding();
  const { streakDays, daysUntilExam, monthlyPointsGain } = useUserProgress();
  const nextExercise = EXERCISE_SERIES.find((series) => series.id === "oral-serie-5");

  return (
    <div className="flex flex-1 flex-col gap-3 px-4 pb-3 pt-4.5">
      <div className="flex items-center gap-2.5">
        <IconBadge icon={IconCompass} variant="gradient" size={34} />
        <div className="flex flex-col gap-0.5">
          <span className="text-h3 font-bold tracking-heading text-ink-900">Boussole</span>
          <span className="text-[10.5px] text-ink-600">Bonjour, Awa</span>
        </div>
        <div className="ml-auto flex items-center gap-1.5 rounded-sm border border-border bg-surface px-2.5 py-1">
          <IconCalendarEvent size={13} className="text-primary" />
          <span className="font-mono text-[11.5px] font-semibold text-ink-900">J−{daysUntilExam}</span>
        </div>
      </div>

      {diagnosticResult ? (
        <div className="rounded-lg p-4 shadow-primary [background:var(--gradient-primary)]">
          <div className="text-eyebrow font-semibold uppercase tracking-eyebrow text-green-300">
            Niveau estimé · {exam === "TCF" ? "TCF Canada" : "TEF Canada"}
          </div>
          <div className="mt-1.5 flex items-baseline gap-2.5">
            <span className="font-mono text-h1 font-bold tracking-heading text-white">
              NCLC {diagnosticResult.nclcLevel}
            </span>
            <span className="font-mono text-xs text-white/75">
              {diagnosticResult.cecrlLevel} · {diagnosticResult.rawScore}
              <span className="text-white/45">/{diagnosticResult.rawMax}</span>
            </span>
          </div>
          <div className="mt-2.5">
            <ProgressBar
              percent={toPercent(diagnosticResult.rawScore, diagnosticResult.rawMax)}
              thresholdPercent={toPercent(minRawScoreForNclc(exam, goal), diagnosticResult.rawMax)}
              heightPx={6}
              trackClassName="bg-white/[0.18]"
              fillClassName="bg-green-300"
            />
            <div className="mt-1.5 flex justify-between text-[10.5px] text-white/75">
              <span>
                Objectif : <strong className="text-white">NCLC {goal}</strong>
              </span>
              <span className="font-mono">
                {(() => {
                  const remaining = pointsRemaining(exam, diagnosticResult.rawScore, goal);
                  return remaining > 0 ? `encore ~${remaining} pts` : "seuil atteint";
                })()}
              </span>
            </div>
          </div>
          <div className="mt-3 flex gap-2 border-t border-white/[0.16] pt-2.5 text-[11px] text-white/85">
            <span className="flex items-center gap-1.5">
              <IconFlame size={14} className="text-accent" />
              {streakDays} jours de suite
            </span>
            <span className="ml-auto flex items-center gap-1.5">
              <IconTrendingUp size={14} />+{monthlyPointsGain} pts ce mois
            </span>
          </div>
        </div>
      ) : (
        <Card className="flex flex-col items-center gap-2.5 p-5 text-center">
          <IconBadge icon={IconCompass} variant="tint" size={40} />
          <p className="text-caption text-ink-900">
            Passez le test de niveau pour découvrir votre score NCLC et débloquer votre plan d&rsquo;entraînement.
          </p>
          <PrimaryButton onClick={() => router.push("/diagnostic")}>Faire le test de niveau</PrimaryButton>
        </Card>
      )}

      {nextExercise && (
        <Card className="p-3.5">
          <div className="text-eyebrow font-semibold uppercase tracking-eyebrow text-ink-600">
            Prochaine action recommandée
          </div>
          <div className="mt-2.5 flex items-center gap-2.5">
            <IconBadge icon={IconHeadphones} size={38} />
            <div className="flex flex-col gap-0.5">
              <span className="text-[13px] font-semibold text-ink-900">{nextExercise.title}</span>
              <span className="text-[11px] text-ink-600">{nextExercise.meta}</span>
            </div>
          </div>
          <PrimaryButton className="mt-2.5" onClick={() => router.push(`/exercice/${nextExercise.id}`)}>
            Commencer <IconArrowRight size={15} />
          </PrimaryButton>
        </Card>
      )}

      {diagnosticResult && <SkillProgressList skills={diagnosticResult.skills} rawMax={diagnosticResult.rawMax} />}
    </div>
  );
}
