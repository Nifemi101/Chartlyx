import * as React from "react";
import { useChartContext } from "../context";
import type { XScale } from "../scales/types";
import { resolveYAccessor, type YOverride } from "./accessors";
import type { ShapeLabelRender } from "./types";

export interface ScatterProps<T = unknown> extends YOverride<T> {
  fill?: string;
  fillOpacity?: number;
  stroke?: string;
  strokeWidth?: number;
  radius?: number;
  label?: ShapeLabelRender<T>;
}

export function Scatter<T = unknown>(props: ScatterProps<T>): React.JSX.Element {
  const {
    fill = "currentColor",
    fillOpacity = 1,
    stroke = "none",
    strokeWidth = 0,
    radius = 4,
    label,
  } = props;
  const { data, xScale, yScale, xAccessor, yAccessor } = useChartContext<T>();
  const yFn = resolveYAccessor<T>(props, yAccessor);

  const points = data.map((datum, index) => {
    const cx = pixelX(xScale, xAccessor(datum));
    const cy = (yScale as (v: never) => number)(yFn(datum) as never);
    return { cx, cy, datum, index };
  });

  return (
    <g>
      {points.map(({ cx, cy, index }) => (
        <circle
          key={index}
          cx={cx}
          cy={cy}
          r={radius}
          fill={fill}
          fillOpacity={fillOpacity}
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
      ))}
      {label ? (
        <g>
          {points.map(({ cx, cy, datum, index }) => (
            <React.Fragment key={index}>
              {label({ x: cx, y: cy, datum, index })}
            </React.Fragment>
          ))}
        </g>
      ) : null}
    </g>
  );
}

function pixelX(scale: XScale, value: number | Date | string): number {
  const pos = (scale as (v: never) => number)(value as never);
  if ("bandwidth" in scale && typeof scale.bandwidth === "function") {
    return pos + scale.bandwidth() / 2;
  }
  return pos;
}
