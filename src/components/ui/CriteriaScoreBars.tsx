import { ProgressBar } from "@/components/ui/ProgressBar";
import { toPercent } from "@/lib/scoring";

type Criterion = { name: string; score: number; max: number };

/** Label + thin bar + "score/max" readout, repeated identically for the
 * writing and speaking AI-correction criteria. */
export function CriteriaScoreBars({ criteria }: { criteria: Criterion[] }) {
  return (
    <div className="flex flex-col gap-2">
      {criteria.map((criterion) => (
        <div key={criterion.name} className="flex items-center gap-2.5">
          <span className="w-[118px] text-[11px] text-ink-900">{criterion.name}</span>
          <div className="flex-1">
            <ProgressBar
              percent={toPercent(criterion.score, criterion.max)}
              heightPx={5}
              fillClassName={criterion.score / criterion.max >= 4 / 6 ? "bg-green-500" : "bg-warn"}
            />
          </div>
          <span className="w-[26px] text-right font-mono text-[10.5px] text-ink-600">
            {criterion.score}/{criterion.max}
          </span>
        </div>
      ))}
    </div>
  );
}
