'use client';

export interface BarChartProps {
  data: { label: string; value: number }[];
  color?: string;
  height?: number;
  showXAxis?: boolean;
  showGrid?: boolean;
  className?: string;
}

const VIEW_W = 100;
const VIEW_H = 100;
const PAD_TOP = 8;
const X_AXIS_H = 20;
const BAR_RADIUS = 2;

function roundedTopRect(x: number, y: number, w: number, h: number, r: number) {
  const cr = Math.min(r, w / 2, h);
  return [
    `M ${x + cr} ${y}`,
    `L ${x + w - cr} ${y}`,
    `Q ${x + w} ${y} ${x + w} ${y + cr}`,
    `L ${x + w} ${y + h}`,
    `L ${x} ${y + h}`,
    `L ${x} ${y + cr}`,
    `Q ${x} ${y} ${x + cr} ${y}`,
    'Z',
  ].join(' ');
}

export function BarChart({
  data,
  color = 'currentColor',
  height = 160,
  showXAxis = false,
  showGrid = false,
  className,
}: BarChartProps) {
  if (!data || data.length === 0) return null;

  const values = data.map((d) => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const chartH = VIEW_H - PAD_TOP;
  const slotW = VIEW_W / data.length;
  // gap = 20% of bar width  →  slot = bar + 0.2*bar = 1.2*bar
  const barW = slotW / 1.2;

  const barX = (i: number) => i * slotW + (slotW - barW) / 2;
  const barH = (value: number) => Math.max(((value - min) / range) * chartH, 1);
  const barY = (value: number) => VIEW_H - barH(value);

  const svgH = showXAxis ? height + X_AXIS_H : height;
  const viewBoxH = showXAxis ? VIEW_H + X_AXIS_H : VIEW_H;

  return (
    <svg
      width="100%"
      height={svgH}
      viewBox={`0 0 ${VIEW_W} ${viewBoxH}`}
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      {showGrid &&
        [25, 50, 75].map((pct) => {
          const y = VIEW_H - (pct / 100) * chartH;
          return (
            <line
              key={pct}
              x1={0}
              y1={y}
              x2={VIEW_W}
              y2={y}
              stroke="currentColor"
              strokeOpacity={0.15}
              strokeWidth={0.5}
              strokeDasharray="2 2"
              vectorEffect="non-scaling-stroke"
            />
          );
        })}

      {data.map((d, i) => (
        <path
          key={i}
          d={roundedTopRect(barX(i), barY(d.value), barW, barH(d.value), BAR_RADIUS)}
          fill={color}
          fillOpacity={0.85}
        />
      ))}

      {showXAxis &&
        data.map((d, i) => (
          <text
            key={i}
            x={i * slotW + slotW / 2}
            y={VIEW_H + X_AXIS_H - 4}
            textAnchor="middle"
            fontSize={7}
            fill="currentColor"
            fillOpacity={0.5}
            vectorEffect="non-scaling-stroke"
          >
            {d.label}
          </text>
        ))}
    </svg>
  );
}
