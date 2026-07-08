"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { MobileScreen } from "@/components/layout/MobileScreen";
import { SessionHeader } from "@/components/navigation/SessionHeader";
import { QcmQuestion } from "@/components/qcm/QcmQuestion";
import { useCountdown } from "@/hooks/useCountdown";
import { useOnboarding } from "@/state/onboarding-context";
import { DIAGNOSTIC_DURATION_SECONDS, DIAGNOSTIC_QUESTIONS } from "@/lib/data/diagnostic-questions";

const AUTO_ADVANCE_DELAY_MS = 450;

export default function DiagnosticPage() {
  const router = useRouter();
  const { recordDiagnosticAnswer, resetDiagnosticAnswers } = useOnboarding();
  const { secondsLeft, isExpired } = useCountdown(DIAGNOSTIC_DURATION_SECONDS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const advanceTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    resetDiagnosticAnswers();
    return () => clearTimeout(advanceTimeout.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isExpired) router.push("/diagnostic/analyse");
  }, [isExpired, router]);

  const question = DIAGNOSTIC_QUESTIONS[currentIndex];
  const isLastQuestion = currentIndex >= DIAGNOSTIC_QUESTIONS.length - 1;

  function handleSelect(index: number) {
    if (selectedIndex != null) return;
    setSelectedIndex(index);
    recordDiagnosticAnswer({ questionIndex: currentIndex, selectedIndex: index });
    advanceTimeout.current = setTimeout(() => {
      if (isLastQuestion) {
        router.push("/diagnostic/analyse");
      } else {
        setCurrentIndex((i) => i + 1);
        setSelectedIndex(null);
      }
    }, AUTO_ADVANCE_DELAY_MS);
  }

  return (
    <MobileScreen>
      <div className="flex flex-1 flex-col gap-3.5 px-5 pb-5 pt-4.5">
        <SessionHeader
          title="Test de niveau"
          secondsLeft={secondsLeft}
          progressPercent={(currentIndex / DIAGNOSTIC_QUESTIONS.length) * 100}
          sectionLabel={question.section}
          questionLabel={`Question ${currentIndex + 1}/${DIAGNOSTIC_QUESTIONS.length}`}
          onClose={() => router.push("/onboarding/preparation-diagnostic")}
        />
        <QcmQuestion
          mode="diagnostic"
          question={question.question}
          options={question.options}
          audioDurationSeconds={question.audioDurationSeconds}
          passage={question.passage}
          selectedIndex={selectedIndex}
          onSelect={handleSelect}
        />
        <p className="text-center text-[9.5px] text-ink-400">
          Prototype : {DIAGNOSTIC_QUESTIONS.length} questions représentatives des 30
        </p>
      </div>
    </MobileScreen>
  );
}
