import * as React from "react";
import { usePolarChartContext } from "./context";
import { axisAngle } from "./radarScales";

export interface RadarAxesProps {
  axes: readonly string[];
  stroke?: string;
  strokeWidth?: number;
  labelFill?: string;
  labelFontSize?: number;
  labelOffset?: number;
}

export function RadarAxes({
  axes,
  stroke = "#9ca3af",
  strokeWidth = 1,
  labelFill = "#374151",
  labelFontSize = 11,
  labelOffset = 12,
}: RadarAxesProps): React.JSX.Element {
  const { cx, cy, radius } = usePolarChartContext();

  return (
    <g
      transform={`translate(${cx}, ${cy})`}
      data-chartly-radar-axes=""
      pointerEvents="none"
    >
      {axes.map((axis, i) => {
        const angle = axisAngle(i, axes.length);
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        const lx = (radius + labelOffset) * Math.cos(angle);
        const ly = (radius + labelOffset) * Math.sin(angle);
        const anchor: "start" | "middle" | "end" =
          Math.abs(Math.cos(angle)) < 0.1
            ? "middle"
            : Math.cos(angle) > 0
            ? "start"
            : "end";
        return (
          <g key={axis}>
            <line
              x1={0}
              y1={0}
              x2={x}
              y2={y}
              stroke={stroke}
              strokeWidth={strokeWidth}
            />
            <text
              x={lx}
              y={ly}
              textAnchor={anchor}
              dominantBaseline="middle"
              fontSize={labelFontSize}
              fill={labelFill}
            >
              {axis}
            </text>
          </g>
        );
      })}
    </g>
  );
}
