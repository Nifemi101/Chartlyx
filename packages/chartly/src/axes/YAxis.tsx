import * as React from "react";
import { useChartContext } from "../context";
import type { YScale } from "../scales/types";
import type { AxisProps, TickValue } from "./types";

export function YAxis({
  tickCount = 5,
  tickFormatter,
  label,
  labelOffset = 40,
  stroke = "currentColor",
  textFill,
  labelFill,
}: AxisProps): React.JSX.Element {
  const { yScale, height, margin } = useChartContext();
  const x = margin.left;
  const y0 = margin.top;
  const y1 = height - margin.bottom;

  const ticks = getTicks(yScale, tickCount);
  const format = tickFormatter ?? ((v: TickValue) => String(v));
  const tickFill = textFill ?? stroke;
  const axisLabelFill = labelFill ?? tickFill;

  return (
    <g data-chartly-axis="y">
      <line x1={x} y1={y0} x2={x} y2={y1} stroke={stroke} />
      {ticks.map((tick, i) => {
        const ty = tickPos(yScale, tick);
        return (
          <g key={i} transform={`translate(${x}, ${ty})`}>
            <line x2={-6} stroke={stroke} />
            <text
              x={-9}
              dy="0.32em"
              textAnchor="end"
              fontSize={10}
              fill={tickFill}
            >
              {format(tick, i)}
            </text>
          </g>
        );
      })}
      {label ? (
        <text
          transform={`translate(${x - labelOffset}, ${(y0 + y1) / 2}) rotate(-90)`}
          textAnchor="middle"
          fontSize={12}
          fill={axisLabelFill}
        >
          {label}
        </text>
      ) : null}
    </g>
  );
}

function getTicks(scale: YScale, tickCount: number): TickValue[] {
  if ("ticks" in scale && typeof scale.ticks === "function") {
    return (scale.ticks as (n: number) => TickValue[])(tickCount);
  }
  return [...scale.domain()];
}

function tickPos(scale: YScale, value: TickValue): number {
  const pos = (scale as (v: never) => number | undefined)(value as never) ?? 0;
  if ("bandwidth" in scale && typeof scale.bandwidth === "function") {
    return pos + scale.bandwidth() / 2;
  }
  return pos;
}
