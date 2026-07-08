"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { IconArrowRight, IconCheck } from "@tabler/icons-react";
import { MobileScreen } from "@/components/layout/MobileScreen";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { useUserProgress } from "@/state/user-progress-context";
import { PLAN_LABELS } from "@/lib/data/pricing";
import type { PlanKey } from "@/lib/types/pricing";

export default function ConfirmationPage() {
  return (
    <Suspense fallback={null}>
      <ConfirmationContent />
    </Suspense>
  );
}

function ConfirmationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = (searchParams.get("plan") as PlanKey) ?? "standard";
  const { setPlan } = useUserProgress();

  useEffect(() => {
    setPlan(plan);
    // Activates the purchased plan once, when the confirmation screen mounts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plan]);

  return (
    <MobileScreen>
      <div className="flex flex-1 flex-col items-center justify-center gap-3.5 p-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full text-white shadow-primary [background:var(--gradient-primary)]">
          <IconCheck size={30} />
        </div>
        <div className="text-h2 font-semibold text-ink-900">Bienvenue dans Boussole {PLAN_LABELS[plan]}</div>
        <p className="max-w-[260px] text-caption leading-normal text-pretty text-ink-600">
          Votre accès est actif. Toutes les séries, simulations et corrections IA sont débloquées.
        </p>
        <PrimaryButton className="mt-3" onClick={() => router.push("/dashboard")}>
          Reprendre l&rsquo;entraînement <IconArrowRight size={16} />
        </PrimaryButton>
      </div>
    </MobileScreen>
  );
}
