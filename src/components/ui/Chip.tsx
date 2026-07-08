import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import { pressable } from "@/lib/ui";

type ChipProps = ButtonHTMLAttributes<HTMLButtonElement> & { selected?: boolean };

/** Simple pill selector (exam date, filters…). For richer multi-line
 * selectable tiles, build a screen-specific component instead. */
export function Chip({ selected, className, ...props }: ChipProps) {
  return (
    <button
      type="button"
      className={clsx(
        "rounded-full border px-3.5 py-2 text-[12px] font-medium",
        selected ? "border-primary bg-primary text-white" : "border-border bg-surface text-ink-900",
        pressable,
        className,
      )}
      {...props}
    />
  );
}
