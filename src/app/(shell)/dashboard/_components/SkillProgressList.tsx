import { IconAbc, IconBook2, IconChevronRight, IconHeadphones, IconPencil } from "@tabler/icons-react";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { toPercent } from "@/lib/scoring";
import type { DiagnosticSkillResult } from "@/lib/types/diagnostic";

const SKILL_ICONS: Record<string, typeof IconHeadphones> = {
  "Compréhension de l'oral": IconHeadphones,
  "Structures de la langue": IconAbc,
  "Compréhension de l'écrit": IconBook2,
  "Expression écrite": IconPencil,
};

type SkillProgressListProps = {
  skills: DiagnosticSkillResult[];
  rawMax: number;
};

export function SkillProgressList({ skills, rawMax }: SkillProgressListProps) {
  return (
    <Card className="px-3.5">
      <div className="py-2.5 text-eyebrow font-semibold uppercase tracking-eyebrow text-ink-600">
        Progression par épreuve
      </div>
      {skills.map((skill) => {
        const Icon = SKILL_ICONS[skill.name] ?? IconHeadphones;
        const percent = toPercent(skill.score, rawMax);
        const thresholdPercent = skill.threshold > 0 ? toPercent(skill.threshold, rawMax) : undefined;
        const reached = skill.threshold > 0 && skill.score >= skill.threshold;
        return (
          <div key={skill.name} className="flex items-center gap-2.5 border-t border-border-faint py-2.5">
            <Icon size={16} className="w-[18px] text-ink-600" />
            <div className="flex flex-1 flex-col gap-1">
              <div className="flex justify-between text-[12px]">
                <span className="font-medium text-ink-900">{skill.name}</span>
                <span className="font-mono text-[11px] text-ink-600">
                  {skill.score}/{rawMax}
                </span>
              </div>
              <ProgressBar
                percent={percent}
                thresholdPercent={thresholdPercent}
                heightPx={4}
                fillClassName={reached ? "bg-green-500" : "bg-warn"}
              />
            </div>
            <IconChevronRight size={14} className="text-ink-400" />
          </div>
        );
      })}
    </Card>
  );
}
