'use client';

export interface AreaSeries {
  label: string;
  data: { label: string; value: number }[];
  color?: string;
}

export interface AreaChartProps {
  data?: { label: string; value: number }[];
  series?: AreaSeries[];
  color?: string;
  height?: number;
  showXAxis?: boolean;
  showYAxis?: boolean;
  showGrid?: boolean;
  className?: string;
}

const Y_AXIS_W = 28;
const X_AXIS_H = 20;
const PAD_TOP = 8;
const CHART_W = 100;
const CHART_H = 100;
const MAX_X_LABELS = 6;

export function AreaChart({
  data,
  series,
  color = 'currentColor',
  height = 160,
  showXAxis = false,
  showYAxis = false,
  showGrid = false,
  className,
}: AreaChartProps) {
  // Normalise to series format
  const allSeries: AreaSeries[] = series
    ? series
    : data && data.length > 0
    ? [{ label: 'default', data, color }]
    : [];

  if (allSeries.length === 0) return null;

  // Global min/max across all series
  const allValues = allSeries.flatMap((s) => s.data.map((d) => d.value));
  const min = Math.min(...allValues);
  const max = Math.max(...allValues);
  const range = max - min || 1;

  const labels = allSeries[0].data.map((d) => d.label);
  const n = labels.length;

  const toX = (i: number) => (n === 1 ? CHART_W / 2 : (i / (n - 1)) * CHART_W);
  const toY = (value: number) =>
    CHART_H - ((value - min) / range) * (CHART_H - PAD_TOP);

  const step = Math.ceil(n / MAX_X_LABELS);
  const labelIndices = labels
    .map((_, i) => i)
    .filter((i) => i % step === 0 || i === n - 1);

  const yTicks = [0, 25, 50, 75, 100];

  // Layout: chart area + optional axes rendered with HTML div wrapper
  // to avoid text distortion from preserveAspectRatio="none"
  const chartAreaHeight = height - (showXAxis ? X_AXIS_H : 0);

  return (
    <div className={`relative w-full ${className ?? ''}`} style={{ height }}>
      {/* Y axis labels — absolute left, not inside the scaled SVG */}
      {showYAxis && (
        <div
          className="absolute left-0 top-0 flex flex-col justify-between pointer-events-none"
          style={{ width: Y_AXIS_W, height: chartAreaHeight }}
        >
          {[...yTicks].reverse().map((t) => (
            <span
              key={t}
              className="text-neutral-400 dark:text-neutral-500"
              style={{ fontSize: 10, lineHeight: 1 }}
            >
              {t}
            </span>
          ))}
        </div>
      )}

      {/* Chart SVG */}
      <div
        className="absolute top-0 bottom-0"
        style={{ left: showYAxis ? Y_AXIS_W : 0, right: 0 }}
      >
        <svg
          width="100%"
          height={chartAreaHeight}
          viewBox={`0 0 ${CHART_W} ${CHART_H}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {showGrid &&
            [25, 50, 75].map((pct) => {
              const y = CHART_H - (pct / 100) * (CHART_H - PAD_TOP);
              return (
                <line
                  key={pct}
                  x1={0} y1={y} x2={CHART_W} y2={y}
                  stroke="currentColor"
                  strokeOpacity={0.12}
                  strokeWidth={0.5}
                  strokeDasharray="2 2"
                  vectorEffect="non-scaling-stroke"
                />
              );
            })}

          {allSeries.map((s, si) => {
            const pts = s.data.map((d, i) => ({ x: toX(i), y: toY(d.value) }));
            const seriesColor = s.color ?? color;

            const linePath = pts
              .map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`)
              .join(' ');

            const areaPath = [
              `M${pts[0].x},${CHART_H}`,
              ...pts.map((p) => `L${p.x},${p.y}`),
              `L${pts[pts.length - 1].x},${CHART_H}`,
              'Z',
            ].join(' ');

            return (
              <g key={si}>
                <path d={areaPath} fill={seriesColor} fillOpacity={0.15} stroke="none" />
                <path
                  d={linePath}
                  fill="none"
                  stroke={seriesColor}
                  strokeWidth={1.5}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              </g>
            );
          })}
        </svg>

        {/* X axis labels — plain HTML, no distortion */}
        {showXAxis && (
          <div className="relative w-full" style={{ height: X_AXIS_H }}>
            {labelIndices.map((i) => {
              const pct = n === 1 ? 50 : (i / (n - 1)) * 100;
              return (
                <span
                  key={i}
                  className="absolute text-neutral-400 dark:text-neutral-500 -translate-x-1/2"
                  style={{ left: `${pct}%`, fontSize: 10, top: 4 }}
                >
                  {labels[i]}
                </span>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
