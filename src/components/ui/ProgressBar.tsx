type ProgressBarProps = {
  percent: number;
  /** When set, draws a small tick mark at this position — the IRCC score
   * threshold, shown against the user's current progress. */
  thresholdPercent?: number;
  thresholdColor?: string;
  heightPx?: number;
  trackClassName?: string;
  fillClassName?: string;
};

export function ProgressBar({
  percent,
  thresholdPercent,
  thresholdColor = "var(--color-threshold)",
  heightPx = 5,
  trackClassName = "bg-border",
  fillClassName = "bg-primary",
}: ProgressBarProps) {
  return (
    <div className={`relative rounded-full ${trackClassName}`} style={{ height: heightPx }}>
      <div
        className={`absolute inset-y-0 left-0 rounded-full transition-[width] duration-300 ${fillClassName}`}
        style={{ width: `${Math.min(100, Math.max(0, percent))}%` }}
      />
      {thresholdPercent != null && (
        <div
          className="absolute rounded-sm"
          style={{
            top: -3,
            left: `${thresholdPercent}%`,
            width: 2,
            height: heightPx + 6,
            background: thresholdColor,
          }}
        />
      )}
    </div>
  );
}
