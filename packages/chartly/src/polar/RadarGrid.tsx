import * as React from "react";
import { usePolarChartContext } from "./context";
import { axisAngle, polygonPath } from "./radarScales";

export interface RadarGridProps {
  axesCount: number;
  rings?: number;
  stroke?: string;
  strokeWidth?: number;
  fill?: string;
  shape?: "polygon" | "circle";
}

export function RadarGrid({
  axesCount,
  rings = 5,
  stroke = "#e5e7eb",
  strokeWidth = 1,
  fill = "none",
  shape = "polygon",
}: RadarGridProps): React.JSX.Element {
  const { cx, cy, radius } = usePolarChartContext();

  const ringRadii = Array.from(
    { length: rings },
    (_, i) => ((i + 1) / rings) * radius,
  );

  return (
    <g
      transform={`translate(${cx}, ${cy})`}
      data-chartly-radar-grid=""
      pointerEvents="none"
    >
      {ringRadii.map((r, i) => {
        if (shape === "circle") {
          return (
            <circle
              key={i}
              cx={0}
              cy={0}
              r={r}
              fill={fill}
              stroke={stroke}
              strokeWidth={strokeWidth}
            />
          );
        }
        const points: [number, number][] = Array.from(
          { length: axesCount },
          (_, j) => {
            const angle = axisAngle(j, axesCount);
            return [r * Math.cos(angle), r * Math.sin(angle)];
          },
        );
        return (
          <path
            key={i}
            d={polygonPath(points)}
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
        );
      })}
    </g>
  );
}
