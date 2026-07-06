import * as React from "react";
import { area as d3Area } from "d3-shape";
import { useChartContext } from "../context";
import { resolveYAccessor, type YOverride } from "./accessors";
import { resolveCurve, type CurveType } from "./curves";
import type { ShapeLabelRender } from "./types";

export interface AreaProps<T = unknown> extends YOverride<T> {
  fill?: string;
  fillOpacity?: number;
  stroke?: string;
  strokeWidth?: number;
  curve?: CurveType;
  label?: ShapeLabelRender<T>;
}

interface Point<T> {
  x: number;
  y: number;
  datum: T;
  index: number;
}

export function Area<T = unknown>(props: AreaProps<T>): React.JSX.Element {
  const {
    fill = "currentColor",
    fillOpacity = 1,
    stroke = "none",
    strokeWidth = 0,
    curve = "linear",
    label,
  } = props;
  const { data, xScale, yScale, xAccessor, yAccessor, height, margin } =
    useChartContext<T>();
  const yFn = resolveYAccessor<T>(props, yAccessor);

  const baselineY = height - margin.bottom;

  const points: Point<T>[] = data.map((d, index) => {
    const x = xScale(xAccessor(d) as never) as number;
    const y = yScale(yFn(d) as never) as number;
    return { x, y, datum: d, index };
  });

  const areaGenerator = d3Area<Point<T>>()
    .x((p) => p.x)
    .y0(baselineY)
    .y1((p) => p.y)
    .curve(resolveCurve(curve))
    .defined((p) => Number.isFinite(p.x) && Number.isFinite(p.y));

  const d = areaGenerator(points) ?? "";

  return (
    <g>
      <path
        d={d}
        fill={fill}
        fillOpacity={fillOpacity}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      {label ? (
        <g>
          {points.map((p) => (
            <React.Fragment key={p.index}>{label(p)}</React.Fragment>
          ))}
        </g>
      ) : null}
    </g>
  );
}
