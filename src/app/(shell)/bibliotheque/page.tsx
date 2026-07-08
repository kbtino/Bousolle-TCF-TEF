"use client";

import { useRouter } from "next/navigation";
import clsx from "clsx";
import {
  IconAbc,
  IconBook2,
  IconChevronRight,
  IconCircleCheck,
  IconClipboardText,
  IconHeadphones,
  IconLock,
  IconMicrophone,
  IconPencil,
} from "@tabler/icons-react";
import { IconBadge } from "@/components/ui/IconBadge";
import { pressable } from "@/lib/ui";
import { useUserProgress } from "@/state/user-progress-context";
import { EXERCISE_SERIES } from "@/lib/data/exercise-series";

const SKILL_ICONS: Record<string, typeof IconHeadphones> = {
  "Compréhension de l'oral": IconHeadphones,
  "Structures de la langue": IconAbc,
  "Compréhension de l'écrit": IconBook2,
};

type LibraryRow = {
  key: string;
  icon: typeof IconHeadphones;
  variant: "tint" | "accent";
  title: string;
  meta: string;
  isAi?: boolean;
  completedResult?: string;
  locked?: boolean;
  href: string;
};

export default function BibliothequePage() {
  const router = useRouter();
  const { freeSeriesRemaining } = useUserProgress();

  const rows: LibraryRow[] = [
    ...EXERCISE_SERIES.map((series) => ({
      key: series.id,
      icon: SKILL_ICONS[series.skillName] ?? IconHeadphones,
      variant: "tint" as const,
      title: series.title,
      meta: series.meta,
      completedResult: series.completedResult,
      href: `/exercice/${series.id}`,
    })),
    {
      key: "ecriture",
      icon: IconPencil,
      variant: "tint" as const,
      title: "Expression écrite — Tâche 2",
      meta: "Description de données · notée /24",
      isAi: true,
      href: "/ecriture",
    },
    {
      key: "oral",
      icon: IconMicrophone,
      variant: "tint" as const,
      title: "Expression orale — Tâche 2",
      meta: "Point de vue · 2 min de parole",
      isAi: true,
      href: "/oral",
    },
    {
      key: "simulation",
      icon: IconClipboardText,
      variant: "accent" as const,
      title: "Simulation complète TCF",
      meta: "Conditions réelles · 2 h 47 · Premium",
      locked: true,
      href: "/paywall",
    },
  ];

  return (
    <div className="flex flex-1 flex-col gap-3.5 px-4 pb-4 pt-4.5">
      <div className="flex items-center gap-2.5">
        <h1 className="text-h3 font-semibold text-ink-900">Exercices</h1>
        <span className="ml-auto text-[10.5px] text-ink-600">
          {freeSeriesRemaining} série{freeSeriesRemaining > 1 ? "s" : ""} gratuite
          {freeSeriesRemaining > 1 ? "s" : ""} restante{freeSeriesRemaining > 1 ? "s" : ""} aujourd&rsquo;hui
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {rows.map((row) => (
          <button
            key={row.key}
            type="button"
            onClick={() => router.push(row.href)}
            className={clsx(
              "flex min-h-11 items-center gap-2.5 rounded-md border border-border bg-surface p-3 text-left shadow-card",
              pressable,
            )}
          >
            <IconBadge icon={row.icon} variant={row.variant} size={36} />
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <div className="flex items-center gap-1.5">
                <span className="text-[13px] font-semibold text-ink-900">{row.title}</span>
                {row.isAi && (
                  <span className="rounded-xs border border-green-100 bg-green-050 px-1.5 py-0.5 text-[8.5px] font-bold uppercase tracking-eyebrow text-primary">
                    Correction IA
                  </span>
                )}
              </div>
              <span className="text-[10.5px] text-ink-600">{row.meta}</span>
            </div>
            {row.completedResult && (
              <span className="whitespace-nowrap font-mono text-[10.5px] text-primary">{row.completedResult}</span>
            )}
            {row.locked ? (
              <IconLock size={16} className="text-ink-400" />
            ) : row.completedResult ? (
              <IconCircleCheck size={16} className="text-primary" />
            ) : (
              <IconChevronRight size={16} className="text-ink-400" />
            )}
          </button>
        ))}
      </div>

      <p className="mt-auto text-center text-[9.5px] text-ink-400">
        Les épreuves suivent les formats officiels TCF Canada
      </p>
    </div>
  );
}
