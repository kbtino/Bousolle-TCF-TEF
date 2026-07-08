"use client";

import { useRouter } from "next/navigation";
import { IconClipboardText } from "@tabler/icons-react";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { useOnboarding } from "@/state/onboarding-context";

export default function SimulationPage() {
  const router = useRouter();
  const { exam } = useOnboarding();

  return (
    <div className="flex flex-1 flex-col gap-3.5 px-4 pt-4.5">
      <h1 className="text-h2 font-semibold tracking-heading text-ink-900">Simulation</h1>
      <Card className="flex flex-col items-center gap-2.5 p-5 text-center">
        <IconBadge icon={IconClipboardText} variant="accent" size={44} />
        <p className="text-caption text-ink-900">
          Simulation complète {exam === "TCF" ? "TCF Canada" : "TEF Canada"} en conditions réelles, format et durée
          officiels.
        </p>
        <PrimaryButton onClick={() => router.push("/paywall")}>Débloquer avec Premium</PrimaryButton>
      </Card>
    </div>
  );
}
