"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";
import { IconArrowLeft, IconCompass, IconCreditCard, IconDeviceMobile, IconLock } from "@tabler/icons-react";
import { MobileScreen } from "@/components/layout/MobileScreen";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SegmentedTabs } from "@/components/ui/SegmentedTabs";
import { pressable } from "@/lib/ui";
import { DURATION_LABELS, MOMO_NETWORKS, PLAN_LABELS, PRICING } from "@/lib/data/pricing";
import { createCheckout } from "@/lib/services/payment-service";
import type { DurationKey, PaymentMethod, PlanKey } from "@/lib/types/pricing";

const METHOD_OPTIONS: { value: PaymentMethod; label: string; icon: typeof IconCreditCard }[] = [
  { value: "card", label: "Carte", icon: IconCreditCard },
  { value: "momo", label: "Mobile money", icon: IconDeviceMobile },
];

export default function PaiementPage() {
  return (
    <Suspense fallback={null}>
      <PaiementContent />
    </Suspense>
  );
}

function PaiementContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = (searchParams.get("plan") as PlanKey) ?? "standard";
  const duration = (searchParams.get("duration") as DurationKey) ?? "mois";

  const [method, setMethod] = useState<PaymentMethod>("card");
  const [momoNetwork, setMomoNetwork] = useState(MOMO_NETWORKS[0]);
  const [isPaying, setIsPaying] = useState(false);

  const price = PRICING[plan][duration];

  async function handlePay() {
    setIsPaying(true);
    await createCheckout(plan, duration, method);
    router.push(`/paywall/confirmation?plan=${plan}`);
  }

  return (
    <MobileScreen>
      <div className="flex flex-1 flex-col gap-3.5 px-5 pb-5 pt-5">
        <div className="flex items-center gap-2.5">
          <button type="button" onClick={() => router.push("/paywall")} aria-label="Retour" className="text-ink-600">
            <IconArrowLeft size={18} />
          </button>
          <span className="text-h3 font-semibold text-ink-900">Paiement</span>
          <div className="ml-auto flex items-center gap-1.5 text-[10.5px] text-ink-600">
            <IconLock size={12} />
            Sécurisé par Stripe
          </div>
        </div>

        <Card className="flex items-center gap-2.5 p-3.5">
          <IconBadge icon={IconCompass} variant="gradient" size={38} />
          <div className="flex flex-1 flex-col gap-0.5">
            <span className="text-[13px] font-semibold text-ink-900">Boussole {PLAN_LABELS[plan]}</span>
            <span className="text-[11px] text-ink-600">{DURATION_LABELS[duration].full} · sans engagement</span>
          </div>
          <span className="whitespace-nowrap font-mono text-[14px] font-bold text-ink-900">
            {price.priceFcfa.toLocaleString("fr-FR")} F
          </span>
        </Card>

        <SegmentedTabs options={METHOD_OPTIONS} value={method} onChange={setMethod} />

        {method === "card" && (
          <div className="flex flex-col gap-2">
            <input
              placeholder="Numéro de carte"
              className="h-11 rounded-md border border-border bg-surface px-3.5 font-mono text-[13px] text-ink-900 outline-none"
            />
            <div className="flex gap-2">
              <input
                placeholder="MM/AA"
                className="h-11 min-w-0 flex-1 rounded-md border border-border bg-surface px-3.5 font-mono text-[13px] text-ink-900 outline-none"
              />
              <input
                placeholder="CVC"
                className="h-11 min-w-0 flex-1 rounded-md border border-border bg-surface px-3.5 font-mono text-[13px] text-ink-900 outline-none"
              />
            </div>
          </div>
        )}

        {method === "momo" && (
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              {MOMO_NETWORKS.map((network) => (
                <button
                  key={network}
                  type="button"
                  onClick={() => setMomoNetwork(network)}
                  className={clsx(
                    "flex-1 rounded-md border-[1.5px] bg-surface py-2.5 text-center text-[12px] font-semibold text-ink-900",
                    momoNetwork === network ? "border-primary" : "border-border",
                    pressable,
                  )}
                >
                  {network}
                </button>
              ))}
            </div>
            <input
              placeholder="Numéro mobile money"
              className="h-11 rounded-md border border-border bg-surface px-3.5 font-mono text-[13px] text-ink-900 outline-none"
            />
          </div>
        )}

        <div className="mt-auto flex flex-col gap-2">
          <PrimaryButton disabled={isPaying} onClick={() => void handlePay()}>
            {isPaying ? "Traitement…" : `Payer ${price.priceFcfa.toLocaleString("fr-FR")} F`}
          </PrimaryButton>
          <p className="text-center text-[9.5px] leading-normal text-ink-400">
            Reçu envoyé par e-mail. Remboursement sous 7 jours si aucune série entamée.
          </p>
        </div>
      </div>
    </MobileScreen>
  );
}
