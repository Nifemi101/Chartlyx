import * as React from "react";
import { useChartContext } from "../context";
import type { XScale } from "../scales/types";
import type { AxisProps, TickValue } from "./types";

export function XAxis({
  tickCount = 5,
  tickFormatter,
  label,
  labelOffset = 30,
  stroke = "currentColor",
  textFill,
  labelFill,
}: AxisProps): React.JSX.Element {
  const { xScale, width, height, margin } = useChartContext();
  const y = height - margin.bottom;
  const x0 = margin.left;
  const x1 = width - margin.right;

  const ticks = getTicks(xScale, tickCount);
  const format = tickFormatter ?? ((v: TickValue) => String(v));
  const tickFill = textFill ?? stroke;
  const axisLabelFill = labelFill ?? tickFill;

  return (
    <g data-chartly-axis="x">
      <line x1={x0} y1={y} x2={x1} y2={y} stroke={stroke} />
      {ticks.map((tick, i) => {
        const tx = tickPos(xScale, tick);
        return (
          <g key={i} transform={`translate(${tx}, ${y})`}>
            <line y2={6} stroke={stroke} />
            <text
              y={9}
              dy="0.71em"
              textAnchor="middle"
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
          x={(x0 + x1) / 2}
          y={y + labelOffset}
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

function getTicks(scale: XScale, tickCount: number): TickValue[] {
  if ("ticks" in scale && typeof scale.ticks === "function") {
    return (scale.ticks as (n: number) => TickValue[])(tickCount);
  }
  return [...scale.domain()];
}

function tickPos(scale: XScale, value: TickValue): number {
  const pos = (scale as (v: never) => number | undefined)(value as never) ?? 0;
  if ("bandwidth" in scale && typeof scale.bandwidth === "function") {
    return pos + scale.bandwidth() / 2;
  }
  return pos;
}
