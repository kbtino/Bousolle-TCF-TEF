"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { IconCheck, IconLock } from "@tabler/icons-react";
import { MobileScreen } from "@/components/layout/MobileScreen";
import { IconBadge } from "@/components/ui/IconBadge";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SegmentedTabs } from "@/components/ui/SegmentedTabs";
import { useUserProgress } from "@/state/user-progress-context";
import { DURATION_LABELS, PLAN_PERKS, PRICING } from "@/lib/data/pricing";
import type { DurationKey, PlanKey } from "@/lib/types/pricing";

const PLAN_OPTIONS: { value: PlanKey; label: string }[] = [
  { value: "standard", label: "Standard" },
  { value: "premium", label: "Premium oral" },
];

const DURATION_KEYS: DurationKey[] = ["semaine", "mois", "trois"];

export default function PaywallPage() {
  const router = useRouter();
  const { freeSeriesRemaining } = useUserProgress();
  const [plan, setPlan] = useState<PlanKey>("standard");
  const [duration, setDuration] = useState<DurationKey>("mois");

  const price = PRICING[plan][duration];

  return (
    <MobileScreen>
      <div className="flex flex-1 flex-col gap-3.5 px-5 pb-5 pt-6">
        <div className="flex flex-col items-center gap-2.5 text-center">
          <IconBadge icon={IconLock} variant="tint" size={48} />
          <h1 className="text-h2 font-semibold leading-snug text-pretty text-ink-900">
            Vous avez terminé vos {freeSeriesRemaining || 2} séries gratuites du jour
          </h1>
          <p className="text-caption leading-normal text-pretty text-ink-600">
            Revenez demain — c&rsquo;est gratuit. Ou continuez sans limite dès maintenant.
          </p>
        </div>

        <SegmentedTabs options={PLAN_OPTIONS} value={plan} onChange={setPlan} />

        <div className="flex flex-col gap-1.5">
          {PLAN_PERKS[plan].map((perk) => (
            <div key={perk} className="flex items-center gap-2 text-[12px] text-ink-900">
              <IconCheck size={14} className="text-primary" />
              {perk}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2">
          {DURATION_KEYS.map((key) => {
            const selected = duration === key;
            const isPopular = key === "mois";
            return (
              <button
                key={key}
                type="button"
                onClick={() => setDuration(key)}
                className={clsx(
                  "relative flex flex-col items-center gap-0.5 rounded-lg border-[1.5px] bg-surface px-2 pb-2 pt-3 text-center",
                  selected ? "border-primary" : "border-border",
                )}
              >
                {isPopular && (
                  <span className="absolute -top-2 whitespace-nowrap rounded-xs bg-primary px-1.5 py-0.5 text-[8.5px] font-bold uppercase tracking-eyebrow text-white">
                    populaire
                  </span>
                )}
                <span className="text-[11px] font-medium text-ink-600">{DURATION_LABELS[key].short}</span>
                <span className="whitespace-nowrap font-mono text-[14px] font-bold text-ink-900">
                  {PRICING[plan][key].priceFcfa.toLocaleString("fr-FR")} F
                </span>
                <span className="whitespace-nowrap text-[9.5px] text-ink-400">{PRICING[plan][key].priceUsd}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-auto flex flex-col gap-2">
          <PrimaryButton glow onClick={() => router.push(`/paywall/paiement?plan=${plan}&duration=${duration}`)}>
            Continuer — {price.priceFcfa.toLocaleString("fr-FR")} F / {DURATION_LABELS[duration].full}
          </PrimaryButton>
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="h-[38px] text-caption text-ink-600 hover:text-ink-900"
          >
            Revenir demain — c&rsquo;est gratuit
          </button>
          <p className="text-center text-[9.5px] text-ink-400">Paiement sécurisé Stripe · annulable à tout moment</p>
        </div>
      </div>
    </MobileScreen>
  );
}
