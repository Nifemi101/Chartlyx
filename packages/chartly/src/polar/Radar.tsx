import * as React from "react";
import type { KeysOfType } from "../types";
import {
  DEFAULT_STACK_COLORS,
  pickColor,
} from "../shapes/stackHelpers";
import { usePolarChartContext } from "./context";
import { axisAngle, polarPoint, polygonPath } from "./radarScales";

export interface RadarProps<T = unknown> {
  axes: readonly KeysOfType<T, number>[];
  maxValue?: number;
  fill?: string;
  fillOpacity?: number;
  stroke?: string;
  strokeWidth?: number;
  showPoints?: boolean;
  pointRadius?: number;
  rowIndex?: number;
  colorByIndex?: number;
}

interface RadarPoint<T> {
  x: number;
  y: number;
  axis: keyof T;
  value: number;
}

export function Radar<T = unknown>({
  axes,
  maxValue,
  fill,
  fillOpacity = 0.3,
  stroke,
  strokeWidth = 2,
  showPoints = true,
  pointRadius = 3,
  rowIndex,
  colorByIndex,
}: RadarProps<T>): React.JSX.Element {
  const { data, cx, cy, radius, setActiveIndex } = usePolarChartContext<T>();

  const effectiveMax = maxValue ?? autoMax<T>(data, axes);

  const rows =
    rowIndex !== undefined
      ? data[rowIndex] !== undefined
        ? [{ row: data[rowIndex] as T, index: rowIndex }]
        : []
      : data.map((row, index) => ({ row, index }));

  const resolvedFill =
    fill ??
    (colorByIndex !== undefined
      ? pickColor(DEFAULT_STACK_COLORS, colorByIndex)
      : "currentColor");
  const resolvedStroke = stroke ?? resolvedFill;

  return (
    <g transform={`translate(${cx}, ${cy})`} data-chartly-radar="">
      {rows.map(({ row, index }) => {
        const points: RadarPoint<T>[] = axes.map((axis, i) => {
          const angle = axisAngle(i, axes.length);
          const value = row[axis] as unknown as number;
          const [x, y] = polarPoint(angle, value, effectiveMax, radius);
          return { x, y, axis, value };
        });
        const d = polygonPath(points.map((p) => [p.x, p.y] as [number, number]));
        return (
          <g
            key={index}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <path
              d={d}
              fill={resolvedFill}
              fillOpacity={fillOpacity}
              stroke={resolvedStroke}
              strokeWidth={strokeWidth}
            />
            {showPoints
              ? points.map((p, j) => (
                  <circle
                    key={j}
                    cx={p.x}
                    cy={p.y}
                    r={pointRadius}
                    fill={resolvedStroke}
                  />
                ))
              : null}
          </g>
        );
      })}
    </g>
  );
}

function autoMax<T>(
  data: readonly T[],
  axes: readonly (keyof T)[],
): number {
  let max = 0;
  for (const row of data) {
    for (const axis of axes) {
      const v = row[axis] as unknown as number;
      if (Number.isFinite(v) && v > max) max = v;
    }
  }
  return max;
}
