type NclcGaugeProps = {
  currentLevel: number;
  targetLevel: number;
  min?: number;
  max?: number;
  /** Width in px — height is derived to keep the semicircle proportions. */
  size?: number;
};

/** Semicircular NCLC gauge (levels 4-10 by default): a needle on the
 * current level, the immigration target level marked in yellow. Designed
 * for the dark green hero backgrounds it appears on. */
export function NclcGauge({ currentLevel, targetLevel, min = 4, max = 10, size = 210 }: NclcGaugeProps) {
  const width = size;
  const height = Math.round(size * 0.53);
  const cx = width / 2;
  const cy = height * 0.86;
  const radius = width * 0.37;

  const angleForLevel = (level: number) => Math.PI * (1 - (level - min) / (max - min));
  const point = (angle: number, r: number): [number, number] => [cx + r * Math.cos(angle), cy - r * Math.sin(angle)];
  const arcPath = (fromLevel: number, toLevel: number, r: number) => {
    const [x1, y1] = point(angleForLevel(fromLevel), r);
    const [x2, y2] = point(angleForLevel(toLevel), r);
    return `M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`;
  };

  const levels: number[] = [];
  for (let level = min; level <= max; level++) levels.push(level);

  const [needleX, needleY] = point(angleForLevel(currentLevel), radius - 16);

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`Niveau NCLC ${currentLevel}, objectif NCLC ${targetLevel}`}>
      <path d={arcPath(min, max, radius - 2)} fill="none" stroke="rgba(255,255,255,.15)" strokeWidth={5} strokeLinecap="round" />
      <path d={arcPath(min, currentLevel, radius - 2)} fill="none" stroke="#7fd4bc" strokeWidth={5} strokeLinecap="round" />

      {levels.map((level) => {
        const angle = angleForLevel(level);
        const isTarget = level === targetLevel;
        const [x1, y1] = point(angle, radius - 6);
        const [x2, y2] = point(angle, radius + 2);
        const [lx, ly] = point(angle, radius + 13);
        return (
          <g key={level}>
            <line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={isTarget ? "#FFCD00" : "rgba(255,255,255,.45)"}
              strokeWidth={isTarget ? 3 : 1.5}
              strokeLinecap="round"
            />
            <text
              x={lx}
              y={ly + 3}
              textAnchor="middle"
              fontSize={9.5}
              fontFamily="var(--font-mono)"
              fontWeight={isTarget ? 700 : 400}
              fill={isTarget ? "#FFCD00" : "rgba(255,255,255,.6)"}
            >
              {level}
            </text>
          </g>
        );
      })}

      <line x1={cx} y1={cy} x2={needleX} y2={needleY} stroke="#fff" strokeWidth={2.5} strokeLinecap="round" />
      <circle cx={cx} cy={cy} r={5} fill="#fff" />
      <text x={cx} y={cy - 26} textAnchor="middle" fontSize={26} fontWeight={700} fontFamily="var(--font-mono)" fill="#fff">
        NCLC {currentLevel}
      </text>
    </svg>
  );
}
