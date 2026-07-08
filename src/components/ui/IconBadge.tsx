import type { Icon } from "@tabler/icons-react";
import clsx from "clsx";

type IconBadgeProps = {
  icon: Icon;
  size?: number;
  variant?: "gradient" | "tint" | "accent";
  className?: string;
};

const variantClasses: Record<NonNullable<IconBadgeProps["variant"]>, string> = {
  gradient: "text-white shadow-primary [background:var(--gradient-primary)]",
  tint: "border border-green-100 bg-green-050 text-primary",
  accent: "border border-[#f6e2c8] bg-[#fff8ed] text-[#c07b33]",
};

/** Small rounded icon box used for the app logo mark and for row/card icons
 * (exercise types, next-action card, etc.) throughout the design. */
export function IconBadge({ icon: TablerIcon, size = 38, variant = "tint", className }: IconBadgeProps) {
  return (
    <div
      className={clsx(
        "flex flex-none items-center justify-center",
        size >= 48 ? "rounded-lg" : "rounded-md",
        variantClasses[variant],
        className,
      )}
      style={{ width: size, height: size }}
    >
      <TablerIcon size={Math.round(size * 0.5)} stroke={1.75} />
    </div>
  );
}
