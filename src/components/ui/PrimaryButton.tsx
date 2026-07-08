import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import { pressable } from "@/lib/ui";

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Adds the signature green glow shadow used under the most important CTAs. */
  glow?: boolean;
};

export function PrimaryButton({ className, glow, ...props }: PrimaryButtonProps) {
  return (
    <button
      type="button"
      className={clsx(
        "flex h-[46px] w-full items-center justify-center gap-2 rounded-md bg-primary text-[14px] font-semibold text-white hover:bg-primary-hover",
        glow && "shadow-primary",
        pressable,
        className,
      )}
      {...props}
    />
  );
}
