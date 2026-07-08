"use client";

import { useRouter } from "next/navigation";
import { IconFlame, IconTargetArrow, IconUser } from "@tabler/icons-react";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { useOnboarding } from "@/state/onboarding-context";
import { useUserProgress } from "@/state/user-progress-context";

const PLAN_LABELS = { free: "Gratuit", standard: "Standard", premium: "Premium" } as const;

export default function ProfilPage() {
  const router = useRouter();
  const { exam, goal } = useOnboarding();
  const { plan, streakDays } = useUserProgress();

  return (
    <div className="flex flex-1 flex-col gap-3.5 px-4 pt-4.5">
      <div className="flex items-center gap-2.5">
        <IconBadge icon={IconUser} variant="tint" size={40} />
        <div className="flex flex-col gap-0.5">
          <span className="text-h3 font-semibold text-ink-900">Awa</span>
          <span className="text-[11px] text-ink-600">Plan {PLAN_LABELS[plan]}</span>
        </div>
      </div>

      <Card className="flex items-center gap-2.5 p-3.5">
        <IconTargetArrow size={17} className="text-primary" />
        <span className="flex-1 text-caption text-ink-900">
          Objectif NCLC {goal} · {exam === "TCF" ? "TCF Canada" : "TEF Canada"}
        </span>
      </Card>

      <Card className="flex items-center gap-2.5 p-3.5">
        <IconFlame size={17} className="text-accent" />
        <span className="flex-1 text-caption text-ink-900">{streakDays} jours de suite</span>
      </Card>

      <SecondaryButton className="mt-auto mb-4" onClick={() => router.push("/")}>
        Se déconnecter
      </SecondaryButton>
    </div>
  );
}
