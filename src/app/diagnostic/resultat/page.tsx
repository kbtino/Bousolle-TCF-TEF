"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { IconAbc, IconArrowRight, IconBook2, IconHeadphones, IconRoute } from "@tabler/icons-react";
import { MobileScreen } from "@/components/layout/MobileScreen";
import { Card } from "@/components/ui/Card";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { NclcGauge } from "@/components/nclc/NclcGauge";
import { useOnboarding } from "@/state/onboarding-context";
import { pointsRemaining } from "@/lib/scoring";
import { EXAMS } from "@/lib/data/exams";

const SKILL_ICONS: Record<string, typeof IconHeadphones> = {
  "Compréhension de l'oral": IconHeadphones,
  "Structures de la langue": IconAbc,
  "Compréhension de l'écrit": IconBook2,
};

export default function DiagnosticResultatPage() {
  const router = useRouter();
  const { exam, goal, diagnosticResult } = useOnboarding();

  useEffect(() => {
    if (!diagnosticResult) router.replace("/diagnostic");
  }, [diagnosticResult, router]);

  if (!diagnosticResult) return null;

  const examName = EXAMS.find((e) => e.type === exam)?.name ?? exam;
  const remaining = pointsRemaining(exam, diagnosticResult.rawScore, goal);

  return (
    <MobileScreen>
      <div className="flex flex-1 flex-col">
        <div className="[background:var(--gradient-primary)] px-4 pb-5 pt-4.5">
          <div className="text-center text-eyebrow font-semibold uppercase tracking-eyebrow text-green-300">
            Résultat du test de niveau · {examName}
          </div>
          <div className="mt-2 flex justify-center">
            <NclcGauge currentLevel={diagnosticResult.nclcLevel} targetLevel={goal} />
          </div>
          <div className="text-center font-mono text-xs text-white/80">
            estimation ~{diagnosticResult.rawScore}/{diagnosticResult.rawMax} · {diagnosticResult.cecrlLevel}{" "}
            <span className="whitespace-nowrap text-[#FFCD00]">objectif NCLC {goal}</span>
          </div>
        </div>

        <div className="-mt-2 flex flex-1 flex-col gap-3 px-4 pb-4.5 pt-3.5">
          <Card className="overflow-hidden">
            <div className="grid grid-cols-[1fr_58px_56px_30px] gap-2 px-3.5 pb-1.5 pt-2.5 text-[9.5px] font-semibold uppercase tracking-eyebrow text-ink-400">
              <span>Épreuve</span>
              <span className="text-right">Estimé</span>
              <span className="text-right">Seuil {goal}</span>
              <span />
            </div>
            {diagnosticResult.skills.map((skill) => {
              const Icon = SKILL_ICONS[skill.name] ?? IconHeadphones;
              const hasThreshold = skill.threshold > 0;
              const reached = hasThreshold && skill.score >= skill.threshold;
              const dotColor = !hasThreshold ? "#0F9B80" : reached ? "var(--color-ok)" : "var(--color-warn)";
              return (
                <div
                  key={skill.name}
                  className="grid grid-cols-[1fr_58px_56px_30px] items-center gap-2 border-t border-border-faint px-3.5 py-2.5"
                >
                  <div className="flex items-center gap-1.5 text-[12px] font-medium text-ink-900">
                    <Icon size={14} className="text-ink-600" />
                    {skill.name}
                  </div>
                  <div className="text-right font-mono text-[12px] font-semibold text-ink-900">{skill.score}</div>
                  <div className="text-right font-mono text-xs text-ink-400">{hasThreshold ? skill.threshold : "—"}</div>
                  <div className="flex justify-end">
                    <span className="h-2 w-2 rounded-full" style={{ background: dotColor }} />
                  </div>
                </div>
              );
            })}
          </Card>

          <Card className="flex items-start gap-2.5 p-3.5">
            <IconRoute size={16} className="mt-0.5 text-primary" />
            <p className="text-[12px] leading-normal text-ink-900">
              Il vous manque environ <strong>{remaining} points</strong> pour NCLC {goal}. Point faible prioritaire :{" "}
              <strong>{diagnosticResult.weakestSkill.toLowerCase()}</strong>. C&rsquo;est atteignable avec un plan de
              6 semaines.
            </p>
          </Card>

          <div className="mt-auto flex flex-col gap-1.5">
            <PrimaryButton glow onClick={() => router.push("/dashboard")}>
              Commencer l&rsquo;entraînement <IconArrowRight size={16} />
            </PrimaryButton>
            <p className="text-center text-[10.5px] text-ink-400">
              Première recommandation : oral, série 5 · 12 min
            </p>
          </div>
        </div>
      </div>
    </MobileScreen>
  );
}
