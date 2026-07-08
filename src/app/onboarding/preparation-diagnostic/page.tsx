"use client";

import { useRouter } from "next/navigation";
import clsx from "clsx";
import { IconAbc, IconBook2, IconHeadphones, IconInfoCircle, IconListCheck } from "@tabler/icons-react";
import { MobileScreen } from "@/components/layout/MobileScreen";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { pressable } from "@/lib/ui";

const DIAGNOSTIC_PARTS = [
  { icon: IconHeadphones, name: "Compréhension de l'oral", count: "10 questions" },
  { icon: IconAbc, name: "Structures de la langue", count: "10 questions" },
  { icon: IconBook2, name: "Compréhension de l'écrit", count: "10 questions" },
];

export default function PreparationDiagnosticPage() {
  const router = useRouter();

  return (
    <MobileScreen>
      <div className="flex flex-1 flex-col gap-4 px-5 pb-5 pt-6">
        <div>
          <div className="text-eyebrow font-semibold uppercase tracking-eyebrow text-ink-600">
            Votre préparation · 2/2
          </div>
          <h1 className="mt-1 text-h2 font-semibold tracking-heading text-ink-900">Test de niveau</h1>
          <p className="mt-1.5 text-caption leading-normal text-ink-600 text-pretty">
            Sans enjeu et sans note éliminatoire : ce test estime votre NCLC de départ et calibre votre plan
            d&rsquo;étude.
          </p>
        </div>

        <Card className="overflow-hidden">
          <div className="flex items-center gap-2.5 p-3.5">
            <IconBadge icon={IconListCheck} size={34} />
            <div className="flex-1 text-caption font-medium text-ink-900">30 questions · toutes les épreuves</div>
            <span className="font-mono text-xs text-ink-600">~25 min</span>
          </div>
          <div className="bg-bg">
            {DIAGNOSTIC_PARTS.map((part) => (
              <div key={part.name} className="flex items-center gap-2.5 border-t border-border px-3.5 py-2.5">
                <part.icon size={14} className="w-4 text-ink-600" />
                <span className="flex-1 text-[12px] text-ink-900">{part.name}</span>
                <span className="font-mono text-xs text-ink-600">{part.count}</span>
              </div>
            ))}
          </div>
        </Card>

        <div className="flex items-start gap-2.5 rounded-md border border-green-100 bg-green-050 px-3.5 py-2.5">
          <IconInfoCircle size={15} className="mt-0.5 text-primary" />
          <div className="text-[11.5px] leading-normal text-[#0a4f3d]">
            Vous pouvez le refaire plus tard. Votre résultat reste privé.
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-2">
          <PrimaryButton onClick={() => router.push("/diagnostic")}>Commencer le test</PrimaryButton>
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className={clsx("h-10 text-caption text-ink-600 hover:text-ink-900", pressable)}
          >
            Plus tard
          </button>
        </div>
      </div>
    </MobileScreen>
  );
}
