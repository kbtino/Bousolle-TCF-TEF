import { IconArrowLeft, IconClock, IconX } from "@tabler/icons-react";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { formatMinutesSeconds } from "@/lib/format";

type SessionHeaderProps = {
  title: string;
  meta?: string;
  secondsLeft: number;
  progressPercent: number;
  sectionLabel?: string;
  questionLabel?: string;
  onBack?: () => void;
  onClose?: () => void;
};

/** Header used by every timed screen (diagnostic, practice exercises):
 * back/close + title + countdown, then a progress bar with section/question
 * labels underneath. */
export function SessionHeader({
  title,
  meta,
  secondsLeft,
  progressPercent,
  sectionLabel,
  questionLabel,
  onBack,
  onClose,
}: SessionHeaderProps) {
  return (
    <div className="flex flex-col gap-3.5">
      <div className="flex items-center gap-2.5">
        {onBack && (
          <button type="button" onClick={onBack} aria-label="Retour" className="text-ink-600">
            <IconArrowLeft size={18} />
          </button>
        )}
        {onClose && (
          <button type="button" onClick={onClose} aria-label="Fermer" className="text-ink-600">
            <IconX size={18} />
          </button>
        )}
        <div className="flex flex-col">
          <span className="text-h3 font-semibold text-ink-900">{title}</span>
          {meta && <span className="text-[10px] text-ink-600">{meta}</span>}
        </div>
        <div className="ml-auto flex items-center gap-1.5 rounded-sm border border-border bg-surface px-2.5 py-1">
          <IconClock size={13} className="text-primary" />
          <span className="font-mono text-xs font-semibold text-ink-900">
            {formatMinutesSeconds(secondsLeft)}
          </span>
        </div>
      </div>

      <div>
        <ProgressBar percent={progressPercent} />
        {(sectionLabel || questionLabel) && (
          <div className="mt-1.5 flex justify-between">
            <span className="text-eyebrow font-semibold uppercase tracking-eyebrow text-ink-600">
              {sectionLabel}
            </span>
            <span className="font-mono text-[10.5px] text-ink-600">{questionLabel}</span>
          </div>
        )}
      </div>
    </div>
  );
}
