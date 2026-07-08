"use client";

import { useRouter } from "next/navigation";
import clsx from "clsx";
import { IconArrowRight, IconCircle, IconCircleCheckFilled } from "@tabler/icons-react";
import { MobileScreen } from "@/components/layout/MobileScreen";
import { Chip } from "@/components/ui/Chip";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { pressable } from "@/lib/ui";
import { useOnboarding } from "@/state/onboarding-context";
import { EXAMS, EXAM_DATE_OPTIONS, NCLC_ENTREE_EXPRESS_THRESHOLD, NCLC_GOAL_OPTIONS } from "@/lib/data/exams";

export default function ObjectifPage() {
  const router = useRouter();
  const { exam, setExam, goal, setGoal, when, setWhen } = useOnboarding();

  return (
    <MobileScreen>
      <div className="flex flex-1 flex-col gap-4.5 px-5 pb-5 pt-6">
        <div>
          <div className="text-eyebrow font-semibold uppercase tracking-eyebrow text-ink-600">
            Votre préparation · 1/2
          </div>
          <h1 className="mt-1 text-h2 font-semibold tracking-heading text-ink-900">
            Quel examen visez-vous ?
          </h1>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {EXAMS.map((option) => {
            const selected = exam === option.type;
            return (
              <button
                key={option.type}
                type="button"
                onClick={() => setExam(option.type)}
                className={clsx(
                  "flex flex-col gap-1.5 rounded-lg border-[1.5px] bg-surface p-3.5 text-left",
                  selected ? "border-primary" : "border-border",
                  pressable,
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-h3 font-bold text-ink-900">{option.name}</span>
                  {selected ? (
                    <IconCircleCheckFilled size={17} className="text-primary" />
                  ) : (
                    <IconCircle size={17} className="text-ink-400" />
                  )}
                </div>
                <div className="text-[10.5px] leading-snug text-ink-600">{option.description}</div>
              </button>
            );
          })}
        </div>

        <div>
          <div className="mb-2 text-eyebrow font-semibold uppercase tracking-eyebrow text-ink-600">
            Objectif NCLC
          </div>
          <div className="flex gap-1.5">
            {NCLC_GOAL_OPTIONS.map((n) => {
              const selected = goal === n;
              return (
                <button
                  key={n}
                  type="button"
                  onClick={() => setGoal(n)}
                  className={clsx(
                    "flex flex-1 flex-col items-center gap-0.5 rounded-md border py-2",
                    selected ? "border-primary bg-primary" : "border-border bg-surface",
                    pressable,
                  )}
                >
                  <span className={clsx("font-mono text-h3 font-bold", selected ? "text-white" : "text-ink-900")}>
                    {n}
                  </span>
                  <span
                    className={clsx(
                      "text-[8.5px] font-semibold uppercase tracking-eyebrow",
                      selected ? "text-green-300" : n === NCLC_ENTREE_EXPRESS_THRESHOLD ? "text-primary" : "text-transparent",
                    )}
                  >
                    {n === NCLC_ENTREE_EXPRESS_THRESHOLD ? "seuil EE" : "·"}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="mt-1.5 text-[10.5px] leading-normal text-ink-600">
            NCLC {NCLC_ENTREE_EXPRESS_THRESHOLD} est le seuil clé d&rsquo;Entrée express (catégorie francophone).
          </p>
        </div>

        <div>
          <div className="mb-2 text-eyebrow font-semibold uppercase tracking-eyebrow text-ink-600">
            Examen prévu
          </div>
          <div className="flex flex-wrap gap-1.5">
            {EXAM_DATE_OPTIONS.map((option) => (
              <Chip key={option.value} selected={when === option.value} onClick={() => setWhen(option.value)}>
                {option.label}
              </Chip>
            ))}
          </div>
        </div>

        <PrimaryButton className="mt-auto" onClick={() => router.push("/onboarding/preparation-diagnostic")}>
          Continuer <IconArrowRight size={17} />
        </PrimaryButton>
      </div>
    </MobileScreen>
  );
}
