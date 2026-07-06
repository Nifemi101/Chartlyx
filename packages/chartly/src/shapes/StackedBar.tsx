import * as React from "react";
import { stack as d3stack } from "d3-shape";
import { useChartContext } from "../context";
import type { KeysOfType } from "../types";
import { DEFAULT_STACK_COLORS, pickColor } from "./stackHelpers";

export interface StackedBarProps<T = unknown> {
  keys: readonly KeysOfType<T, number>[];
  colors?: readonly string[];
  radius?: number;
  stroke?: string;
  strokeWidth?: number;
}

const FALLBACK_BAR_WIDTH = 20;

export function StackedBar<T = unknown>({
  keys,
  colors = DEFAULT_STACK_COLORS,
  radius = 0,
  stroke = "none",
  strokeWidth = 0,
}: StackedBarProps<T>): React.JSX.Element {
  const { data, xScale, yScale, xAccessor } = useChartContext<T>();

  const stackGen = d3stack<T, string>().keys(keys as unknown as string[]);
  const series = stackGen(data as T[]);

  const hasBandwidth =
    "bandwidth" in xScale && typeof xScale.bandwidth === "function";
  const bandWidth = hasBandwidth ? xScale.bandwidth() : FALLBACK_BAR_WIDTH;

  return (
    <g>
      {series.map((seriesRows, seriesIdx) => {
        const isTopSegment = seriesIdx === series.length - 1;
        return (
          <g key={seriesIdx} fill={pickColor(colors, seriesIdx)}>
            {seriesRows.map((point, rowIdx) => {
              const rawX = xAccessor(point.data);
              const xLeft = (xScale as (v: never) => number)(rawX as never);
              const y0 = (yScale as (v: never) => number)(point[0] as never);
              const y1 = (yScale as (v: never) => number)(point[1] as never);
              const top = Math.min(y0, y1);
              const h = Math.abs(y0 - y1);
              return (
                <rect
                  key={rowIdx}
                  x={xLeft}
                  y={top}
                  width={bandWidth}
                  height={h}
                  rx={isTopSegment ? radius : 0}
                  stroke={stroke}
                  strokeWidth={strokeWidth}
                />
              );
            })}
          </g>
        );
      })}
    </g>
  );
}
