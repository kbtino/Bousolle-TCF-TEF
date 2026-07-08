import clsx from "clsx";
import { IconCheck, IconX } from "@tabler/icons-react";
import { pressable } from "@/lib/ui";

export type QcmOptionState = "default" | "selected" | "correct" | "incorrect";

type QcmOptionRowProps = {
  letter: string;
  label: string;
  state: QcmOptionState;
  onClick?: () => void;
  disabled?: boolean;
};

const STATE_STYLES: Record<QcmOptionState, { row: string; badge: string }> = {
  default: { row: "border-border bg-surface", badge: "bg-bg text-ink-600" },
  selected: { row: "border-primary bg-green-050", badge: "bg-primary text-white" },
  correct: { row: "border-[#0F9B80] bg-green-050", badge: "bg-primary text-white" },
  incorrect: { row: "border-danger bg-error-bg", badge: "bg-error text-white" },
};

export function QcmOptionRow({ letter, label, state, onClick, disabled }: QcmOptionRowProps) {
  const styles = STATE_STYLES[state];
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "flex min-h-11 items-center gap-2.5 rounded-md border-[1.5px] px-3.5 py-3 text-left",
        styles.row,
        pressable,
      )}
    >
      <span
        className={clsx(
          "flex h-6 w-6 flex-none items-center justify-center rounded-full text-[11px] font-bold",
          styles.badge,
        )}
      >
        {letter}
      </span>
      <span className="flex-1 text-body leading-snug text-ink-900">{label}</span>
      {state === "correct" && <IconCheck size={16} className="text-primary" />}
      {state === "incorrect" && <IconX size={16} className="text-danger" />}
    </button>
  );
}
