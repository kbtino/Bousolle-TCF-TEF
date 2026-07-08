import type { HTMLAttributes } from "react";
import clsx from "clsx";

/** Base surface used by almost every block in the design: white card,
 * hairline border, soft radius, whisper-soft shadow. */
export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        "rounded-md border border-border bg-surface shadow-card",
        className,
      )}
      {...props}
    />
  );
}
