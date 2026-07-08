import type { ComponentType } from "react";
import clsx from "clsx";
import { pressable } from "@/lib/ui";

type SegmentedTabsProps<T extends string> = {
  options: { value: T; label: string; icon?: ComponentType<{ size?: number }> }[];
  value: T;
  onChange: (value: T) => void;
};

/** Sunken-track segmented control (plan picker, payment method picker):
 * a white raised "thumb" marks the active tab. */
export function SegmentedTabs<T extends string>({ options, value, onChange }: SegmentedTabsProps<T>) {
  return (
    <div className="flex gap-0.5 rounded-md bg-border p-0.5">
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={clsx(
              "flex h-[34px] flex-1 items-center justify-center gap-1.5 rounded-sm text-[12.5px] font-semibold",
              active ? "bg-surface text-ink-900 shadow-sm" : "text-ink-600",
              pressable,
            )}
          >
            {option.icon && <option.icon size={14} />}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
