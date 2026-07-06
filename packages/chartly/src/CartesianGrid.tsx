import * as React from "react";
import { useChartContext } from "./context";
import type { XScale, YScale } from "./scales/types";
import type { TickValue } from "./axes/types";

export interface CartesianGridProps {
  horizontal?: boolean;
  vertical?: boolean;
  xTickCount?: number;
  yTickCount?: number;
  stroke?: string;
  strokeWidth?: number;
  strokeOpacity?: number;
  dashArray?: string;
}

export function CartesianGrid({
  horizontal = true,
  vertical = true,
  xTickCount = 5,
  yTickCount = 5,
  stroke = "#d1d5db",
  strokeWidth = 1,
  strokeOpacity = 0.5,
  dashArray = "2 4",
}: CartesianGridProps): React.JSX.Element {
  const { xScale, yScale, width, height, margin } = useChartContext();

  const xTicks = vertical ? getTicks(xScale, xTickCount) : [];
  const yTicks = horizontal ? getTicks(yScale, yTickCount) : [];
  const x0 = margin.left;
  const x1 = width - margin.right;
  const y0 = margin.top;
  const y1 = height - margin.bottom;

  return (
    <g data-chartly-cartesian-grid="" pointerEvents="none">
      {vertical &&
        xTicks.map((tick, index) => (
          <line
            key={`v-${index}`}
            x1={tickPos(xScale, tick)}
            x2={tickPos(xScale, tick)}
            y1={y0}
            y2={y1}
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeOpacity={strokeOpacity}
            strokeDasharray={dashArray}
          />
        ))}
      {horizontal &&
        yTicks.map((tick, index) => (
          <line
            key={`h-${index}`}
            x1={x0}
            x2={x1}
            y1={tickPos(yScale, tick)}
            y2={tickPos(yScale, tick)}
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeOpacity={strokeOpacity}
            strokeDasharray={dashArray}
          />
        ))}
    </g>
  );
}

function getTicks(scale: XScale | YScale, tickCount: number): TickValue[] {
  if (tickCount <= 0) {
    return [];
  }
  if ("ticks" in scale && typeof scale.ticks === "function") {
    return (scale.ticks as (n: number) => TickValue[])(tickCount);
  }
  return [...scale.domain()];
}

function tickPos(scale: XScale | YScale, value: TickValue): number {
  const pos = (scale as (v: never) => number | undefined)(value as never) ?? 0;
  if ("bandwidth" in scale && typeof scale.bandwidth === "function") {
    return pos + scale.bandwidth() / 2;
  }
  return pos;
}
