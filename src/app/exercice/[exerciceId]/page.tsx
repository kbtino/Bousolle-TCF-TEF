"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { IconArrowRight, IconCircleCheck, IconFlame, IconTrendingUp } from "@tabler/icons-react";
import { MobileScreen } from "@/components/layout/MobileScreen";
import { SessionHeader } from "@/components/navigation/SessionHeader";
import { QcmQuestion } from "@/components/qcm/QcmQuestion";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { useCountdown } from "@/hooks/useCountdown";
import { useUserProgress } from "@/state/user-progress-context";
import { findExerciseSeries } from "@/lib/data/exercise-series";
import type { ExerciseSeries } from "@/lib/types/exercise";

type ExercicePageProps = { params: Promise<{ exerciceId: string }> };

export default function ExercicePage({ params }: ExercicePageProps) {
  const { exerciceId } = use(params);
  const series = findExerciseSeries(exerciceId);

  if (!series) return <NotFoundScreen />;
  return <ExerciceSession series={series} />;
}

function NotFoundScreen() {
  const router = useRouter();
  return (
    <MobileScreen>
      <div className="flex flex-1 flex-col items-center justify-center gap-3 p-5 text-center">
        <p className="text-caption text-ink-600">Cet exercice n&rsquo;existe pas.</p>
        <SecondaryButton onClick={() => router.push("/bibliotheque")}>Retour aux exercices</SecondaryButton>
      </div>
    </MobileScreen>
  );
}

function ExerciceSession({ series }: { series: ExerciseSeries }) {
  const router = useRouter();
  const { streakDays, freeSeriesRemaining, consumeFreeSeries } = useUserProgress();
  const { secondsLeft } = useCountdown(series.estimatedMinutes * 60);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const question = series.questions[currentIndex];
  const isLastQuestion = currentIndex >= series.questions.length - 1;

  function handleSelect(index: number) {
    if (selectedIndex != null) return;
    setSelectedIndex(index);
    if (index === question.correctIndex) setCorrectCount((c) => c + 1);
  }

  function handleNext() {
    if (isLastQuestion) {
      consumeFreeSeries();
      setIsDone(true);
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedIndex(null);
    }
  }

  if (isDone) {
    return (
      <MobileScreen>
        <div className="flex flex-1 flex-col items-center justify-center gap-3.5 p-6 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-green-100 bg-green-050 text-primary">
            <IconCircleCheck size={30} />
          </div>
          <div className="text-h2 font-semibold text-ink-900">Série terminée</div>
          <div className="font-mono text-h3 text-ink-900">
            {correctCount}/{series.questions.length} bonnes réponses
          </div>
          <div className="flex gap-2">
            <span className="flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-[11px] text-ink-900">
              <IconFlame size={14} className="text-accent" />
              {streakDays} jours de suite
            </span>
            <span className="flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-[11px] text-ink-900">
              <IconTrendingUp size={14} className="text-primary" />+6 pts
            </span>
          </div>
          <div className="mt-3.5 flex w-full flex-col gap-2">
            <PrimaryButton onClick={() => router.push(freeSeriesRemaining <= 0 ? "/paywall" : "/bibliotheque")}>
              Série suivante <IconArrowRight size={16} />
            </PrimaryButton>
            <SecondaryButton onClick={() => router.push("/dashboard")}>Retour au tableau de bord</SecondaryButton>
          </div>
        </div>
      </MobileScreen>
    );
  }

  return (
    <MobileScreen>
      <div className="flex flex-1 flex-col gap-3.5 px-5 pb-5 pt-4.5">
        <SessionHeader
          title={series.title}
          meta={`${series.skillName} · niveau B1`}
          secondsLeft={secondsLeft}
          progressPercent={(currentIndex / series.questions.length) * 100}
          questionLabel={`Question ${currentIndex + 1}/${series.questions.length}`}
          onBack={() => router.push("/bibliotheque")}
        />
        <QcmQuestion
          mode="practice"
          question={question.question}
          options={question.options}
          audioDurationSeconds={question.audioDurationSeconds}
          passage={question.passage}
          selectedIndex={selectedIndex}
          correctIndex={question.correctIndex}
          explanation={question.explanation}
          onSelect={handleSelect}
          onNext={handleNext}
          nextLabel={isLastQuestion ? "Terminer la série" : "Question suivante"}
        />
      </div>
    </MobileScreen>
  );
}
