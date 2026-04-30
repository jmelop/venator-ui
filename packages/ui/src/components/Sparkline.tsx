'use client';

export interface SparklineProps {
  data: number[];
  color?: string;
  strokeColor?: string;
  width?: number;
  height?: number;
  filled?: boolean;
  className?: string;
}

export function Sparkline({
  data,
  color = 'currentColor',
  strokeColor,
  width,
  height = 32,
  filled = false,
  className,
}: SparklineProps) {
  if (!data || data.length === 0) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const w = width ?? 100;

  const points = data.map((value, i) => {
    const x = data.length === 1 ? w / 2 : (i / (data.length - 1)) * w;
    const y = height - ((value - min) / range) * height;
    return `${x},${y}`;
  });

  const polylinePoints = points.join(' ');

  const areaPoints = [
    `0,${height}`,
    ...points,
    `${w},${height}`,
  ].join(' ');

  return (
    <svg
      width={width ?? '100%'}
      height={height}
      viewBox={`0 0 ${w} ${height}`}
      className={className}
      aria-hidden="true"
    >
      {filled && (
        <polygon
          points={areaPoints}
          fill={color}
          fillOpacity={0.2}
          stroke="none"
        />
      )}
      <polyline
        points={polylinePoints}
        fill="none"
        stroke={strokeColor ?? color}
        strokeWidth={1.5}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
