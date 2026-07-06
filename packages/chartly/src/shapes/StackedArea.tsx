import * as React from "react";
import { area as d3Area, stack as d3stack } from "d3-shape";
import { useChartContext } from "../context";
import type { KeysOfType } from "../types";
import { resolveCurve, type CurveType } from "./curves";
import { DEFAULT_STACK_COLORS, pickColor } from "./stackHelpers";

export interface StackedAreaProps<T = unknown> {
  keys: readonly KeysOfType<T, number>[];
  colors?: readonly string[];
  curve?: CurveType;
  stroke?: string;
  strokeWidth?: number;
  fillOpacity?: number;
}

interface StackPoint {
  x: number;
  y0: number;
  y1: number;
}

export function StackedArea<T = unknown>({
  keys,
  colors = DEFAULT_STACK_COLORS,
  curve = "linear",
  stroke = "none",
  strokeWidth = 0,
  fillOpacity = 1,
}: StackedAreaProps<T>): React.JSX.Element {
  const { data, xScale, yScale, xAccessor } = useChartContext<T>();

  const stackGen = d3stack<T, string>().keys(keys as unknown as string[]);
  const series = stackGen(data as T[]);

  const areaGen = d3Area<StackPoint>()
    .x((p) => p.x)
    .y0((p) => p.y0)
    .y1((p) => p.y1)
    .curve(resolveCurve(curve))
    .defined(
      (p) =>
        Number.isFinite(p.x) &&
        Number.isFinite(p.y0) &&
        Number.isFinite(p.y1),
    );

  return (
    <g>
      {series.map((seriesRows, seriesIdx) => {
        const points: StackPoint[] = seriesRows.map((point) => {
          const rawX = xAccessor(point.data);
          const x = (xScale as (v: never) => number)(rawX as never);
          const y0 = (yScale as (v: never) => number)(point[0] as never);
          const y1 = (yScale as (v: never) => number)(point[1] as never);
          return { x, y0, y1 };
        });
        const d = areaGen(points) ?? "";
        return (
          <path
            key={seriesIdx}
            d={d}
            fill={pickColor(colors, seriesIdx)}
            fillOpacity={fillOpacity}
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
        );
      })}
    </g>
  );
}
