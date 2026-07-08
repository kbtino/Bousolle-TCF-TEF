import { IconArrowRight } from "@tabler/icons-react";
import { AudioPlayer } from "@/components/audio/AudioPlayer";
import { ReadingPassage } from "@/components/qcm/ReadingPassage";
import { QcmOptionRow, type QcmOptionState } from "@/components/qcm/QcmOptionRow";
import { Card } from "@/components/ui/Card";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

const LETTERS = ["A", "B", "C", "D"];

type QcmQuestionProps = {
  question: string;
  options: string[];
  audioDurationSeconds?: number;
  passage?: string;
  /** "diagnostic" only marks the pick, no right/wrong shown.
   * "practice" reveals correct/incorrect immediately and shows the explanation. */
  mode: "diagnostic" | "practice";
  selectedIndex: number | null;
  correctIndex?: number;
  explanation?: string;
  onSelect: (index: number) => void;
  onNext?: () => void;
  nextLabel?: string;
};

export function QcmQuestion({
  question,
  options,
  audioDurationSeconds,
  passage,
  mode,
  selectedIndex,
  correctIndex,
  explanation,
  onSelect,
  onNext,
  nextLabel = "Question suivante",
}: QcmQuestionProps) {
  const revealed = mode === "practice" && selectedIndex != null;

  function stateFor(index: number): QcmOptionState {
    if (mode === "diagnostic") return selectedIndex === index ? "selected" : "default";
    if (!revealed) return "default";
    if (index === correctIndex) return "correct";
    if (index === selectedIndex) return "incorrect";
    return "default";
  }

  return (
    <div className="flex flex-1 flex-col gap-3.5">
      {audioDurationSeconds != null && <AudioPlayer durationSeconds={audioDurationSeconds} />}
      {passage && <ReadingPassage text={passage} />}
      <p className="text-h3 font-semibold leading-snug text-pretty text-ink-900">{question}</p>
      <div className="flex flex-col gap-2">
        {options.map((label, index) => (
          <QcmOptionRow
            key={label}
            letter={LETTERS[index]}
            label={label}
            state={stateFor(index)}
            disabled={mode === "diagnostic" ? selectedIndex != null : revealed}
            onClick={() => onSelect(index)}
          />
        ))}
      </div>
      {mode === "practice" && revealed && (
        <>
          <Card className="p-3.5">
            <div
              className={`text-eyebrow font-semibold uppercase tracking-eyebrow ${
                selectedIndex === correctIndex ? "text-primary" : "text-error"
              }`}
            >
              {selectedIndex === correctIndex ? "Bonne réponse" : "Réponse incorrecte"}
            </div>
            <p className="mt-1.5 text-[12px] leading-normal text-ink-900">{explanation}</p>
          </Card>
          {onNext && (
            <PrimaryButton onClick={onNext}>
              {nextLabel} <IconArrowRight size={16} />
            </PrimaryButton>
          )}
        </>
      )}
    </div>
  );
}
