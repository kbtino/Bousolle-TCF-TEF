"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { MobileScreen } from "@/components/layout/MobileScreen";
import { useOnboarding } from "@/state/onboarding-context";
import { analyzeDiagnostic } from "@/lib/services/diagnostic-service";

export default function DiagnosticAnalysePage() {
  const router = useRouter();
  const { exam, diagnosticAnswers, setDiagnosticResult } = useOnboarding();

  useEffect(() => {
    let cancelled = false;
    void analyzeDiagnostic(diagnosticAnswers, exam).then((result) => {
      if (cancelled) return;
      setDiagnosticResult(result);
      router.push("/diagnostic/resultat");
    });
    return () => {
      cancelled = true;
    };
    // Runs once when the analysis screen mounts — the mock delay/result
    // shouldn't restart if diagnosticAnswers/exam happen to re-render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MobileScreen>
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-5">
        <div className="h-9 w-9 animate-spin rounded-full border-[3px] border-green-100 border-t-primary" />
        <div className="text-h3 font-semibold text-ink-900">Analyse de vos réponses…</div>
        <div className="text-caption text-ink-600">Estimation du niveau CECRL et NCLC</div>
      </div>
    </MobileScreen>
  );
}
