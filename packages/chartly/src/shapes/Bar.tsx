import * as React from "react";
import { useChartContext } from "../context";
import { resolveYAccessor, type YOverride } from "./accessors";
import type { ShapeLabelRender } from "./types";

export interface BarProps<T = unknown> extends YOverride<T> {
  fill?: string;
  fillOpacity?: number;
  stroke?: string;
  strokeWidth?: number;
  radius?: number;
  baseline?: number;
  label?: ShapeLabelRender<T>;
}

const FALLBACK_BAR_WIDTH = 20;

export function Bar<T = unknown>(props: BarProps<T>): React.JSX.Element {
  const {
    fill = "currentColor",
    fillOpacity = 1,
    stroke = "none",
    strokeWidth = 0,
    radius = 0,
    baseline = 0,
    label,
  } = props;
  const { data, xScale, yScale, xAccessor, yAccessor, height, margin } =
    useChartContext<T>();
  const yFn = resolveYAccessor<T>(props, yAccessor);

  const plotTop = margin.top;
  const plotBottom = height - margin.bottom;
  const rawBaseline = (yScale as (v: never) => number)(baseline as never);
  const baselinePx = Math.max(
    plotTop,
    Math.min(plotBottom, Number.isFinite(rawBaseline) ? rawBaseline : plotBottom),
  );

  const hasBandwidth =
    "bandwidth" in xScale && typeof xScale.bandwidth === "function";
  const bandWidth = hasBandwidth ? xScale.bandwidth() : FALLBACK_BAR_WIDTH;

  const bars = data.map((datum, index) => {
    const xLeft = (xScale as (v: never) => number)(xAccessor(datum) as never);
    const valuePx = (yScale as (v: never) => number)(yFn(datum) as never);
    const top = Math.min(baselinePx, valuePx);
    const barHeight = Math.abs(baselinePx - valuePx);
    return { xLeft, top, barHeight, datum, index };
  });

  return (
    <g>
      {bars.map(({ xLeft, top, barHeight, index }) => (
        <rect
          key={index}
          x={xLeft}
          y={top}
          width={bandWidth}
          height={barHeight}
          rx={radius}
          fill={fill}
          fillOpacity={fillOpacity}
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
      ))}
      {label ? (
        <g>
          {bars.map(({ xLeft, top, datum, index }) => (
            <React.Fragment key={index}>
              {label({
                x: xLeft + bandWidth / 2,
                y: top,
                datum,
                index,
              })}
            </React.Fragment>
          ))}
        </g>
      ) : null}
    </g>
  );
}
