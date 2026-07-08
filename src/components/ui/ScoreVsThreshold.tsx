type ScoreVsThresholdProps = {
  label: string;
  value: number | string;
  max: number | string;
  thresholdLabel: string;
};

/** "Score estimé  13/24 · seuil NCLC 7 : 14" header pattern, shared by the
 * writing and speaking AI-correction result screens. */
export function ScoreVsThreshold({ label, value, max, thresholdLabel }: ScoreVsThresholdProps) {
  return (
    <div className="flex items-baseline justify-between">
      <span className="text-eyebrow font-semibold uppercase tracking-eyebrow text-ink-600">{label}</span>
      <span className="font-mono text-[13px] font-bold text-ink-900">
        {value}
        <span className="text-ink-400">/{max}</span> <span className="text-[10px] font-semibold text-warn">· {thresholdLabel}</span>
      </span>
    </div>
  );
}
