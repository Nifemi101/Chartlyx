import * as React from "react";
import { line as d3Line } from "d3-shape";
import { useChartContext } from "../context";
import { resolveYAccessor, type YOverride } from "./accessors";
import { resolveCurve, type CurveType } from "./curves";
import type { ShapeLabelRender } from "./types";

export interface LineProps<T = unknown> extends YOverride<T> {
  stroke?: string;
  strokeWidth?: number;
  curve?: CurveType;
  animate?: boolean;
  label?: ShapeLabelRender<T>;
}

interface Point<T> {
  x: number;
  y: number;
  datum: T;
  index: number;
}

export function Line<T = unknown>(props: LineProps<T>): React.JSX.Element {
  const {
    stroke = "currentColor",
    strokeWidth = 2,
    curve = "linear",
    animate = false,
    label,
  } = props;
  const { data, xScale, yScale, xAccessor, yAccessor } = useChartContext<T>();
  const animationStyle: React.CSSProperties | undefined = animate
    ? {
        transition:
          "fill 250ms ease, stroke 250ms ease, opacity 250ms ease, transform 250ms ease",
      }
    : undefined;
  const yFn = resolveYAccessor<T>(props, yAccessor);

  const points: Point<T>[] = data.map((d, index) => {
    const x = xScale(xAccessor(d) as never) as number;
    const y = yScale(yFn(d) as never) as number;
    return { x, y, datum: d, index };
  });

  const pathGenerator = d3Line<Point<T>>()
    .x((p) => p.x)
    .y((p) => p.y)
    .curve(resolveCurve(curve))
    .defined((p) => Number.isFinite(p.x) && Number.isFinite(p.y));

  const d = pathGenerator(points) ?? "";

  return (
    <g>
      <path
        d={d}
        stroke={stroke}
        strokeWidth={strokeWidth}
        fill="none"
        style={animationStyle}
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
