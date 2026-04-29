'use client';

export interface AreaChartProps {
  data: { label: string; value: number }[];
  color?: string;
  height?: number;
  showXAxis?: boolean;
  showGrid?: boolean;
  className?: string;
}

const PADDING = { top: 8, right: 0, bottom: 0, left: 0 };
const X_AXIS_HEIGHT = 20;
const VIEW_WIDTH = 100;
const VIEW_HEIGHT = 100;
const MAX_X_LABELS = 6;

export function AreaChart({
  data,
  color = 'currentColor',
  height = 160,
  showXAxis = false,
  showGrid = false,
  className,
}: AreaChartProps) {
  if (!data || data.length === 0) return null;

  const values = data.map((d) => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const chartTop = PADDING.top;
  const chartBottom = VIEW_HEIGHT;

  const toX = (i: number) =>
    data.length === 1 ? VIEW_WIDTH / 2 : (i / (data.length - 1)) * VIEW_WIDTH;

  const toY = (value: number) =>
    chartBottom - ((value - min) / range) * (chartBottom - chartTop);

  const pts = data.map((d, i) => ({ x: toX(i), y: toY(d.value) }));

  const linePath =
    pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');

  const areaPath = [
    `M${pts[0].x},${chartBottom}`,
    ...pts.map((p) => `L${p.x},${p.y}`),
    `L${pts[pts.length - 1].x},${chartBottom}`,
    'Z',
  ].join(' ');

  const step = Math.ceil(data.length / MAX_X_LABELS);
  const labelIndices = data
    .map((_, i) => i)
    .filter((i) => i % step === 0 || i === data.length - 1);

  const svgHeight = showXAxis ? height + X_AXIS_HEIGHT : height;

  return (
    <svg
      width="100%"
      height={svgHeight}
      viewBox={`0 0 ${VIEW_WIDTH} ${showXAxis ? VIEW_HEIGHT + X_AXIS_HEIGHT : VIEW_HEIGHT}`}
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      {showGrid &&
        [25, 50, 75].map((pct) => {
          const y = chartBottom - (pct / 100) * (chartBottom - chartTop);
          return (
            <line
              key={pct}
              x1={0}
              y1={y}
              x2={VIEW_WIDTH}
              y2={y}
              stroke="currentColor"
              strokeOpacity={0.15}
              strokeWidth={0.5}
              strokeDasharray="2 2"
              vectorEffect="non-scaling-stroke"
            />
          );
        })}

      <path d={areaPath} fill={color} fillOpacity={0.15} stroke="none" />
      <path
        d={linePath}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />

      {showXAxis &&
        labelIndices.map((i) => (
          <text
            key={i}
            x={toX(i)}
            y={VIEW_HEIGHT + X_AXIS_HEIGHT - 4}
            textAnchor="middle"
            fontSize={7}
            fill="currentColor"
            fillOpacity={0.5}
            vectorEffect="non-scaling-stroke"
          >
            {data[i].label}
          </text>
        ))}
    </svg>
  );
}
