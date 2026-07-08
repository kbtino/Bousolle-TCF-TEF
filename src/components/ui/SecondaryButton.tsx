import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import { pressable } from "@/lib/ui";

export function SecondaryButton({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={clsx(
        "flex h-[46px] w-full items-center justify-center gap-2 rounded-md border border-border bg-surface text-[13.5px] font-medium text-ink-900 hover:bg-black/[0.02]",
        pressable,
        className,
      )}
      {...props}
    />
  );
}
