'use client';

export interface SparklineProps {
  data: number[];
  color?: string;
  width?: number;
  height?: number;
  filled?: boolean;
  className?: string;
}

export function Sparkline({
  data,
  color = 'currentColor',
  width = 80,
  height = 32,
  filled = false,
  className,
}: SparklineProps) {
  if (!data || data.length === 0) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((value, i) => {
    const x = data.length === 1 ? width / 2 : (i / (data.length - 1)) * width;
    const y = height - ((value - min) / range) * height;
    return `${x},${y}`;
  });

  const polylinePoints = points.join(' ');

  const areaPoints = [
    `0,${height}`,
    ...points,
    `${width},${height}`,
  ].join(' ');

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
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
        stroke={color}
        strokeWidth={1.5}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
