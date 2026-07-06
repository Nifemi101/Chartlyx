import * as React from "react";
import { usePolarChartContext } from "./context";
import type { PolarTooltipRender } from "./types";

export interface PolarTooltipProps<T = unknown> {
  children: PolarTooltipRender<T>;
}

export function PolarTooltip<T = unknown>({
  children,
}: PolarTooltipProps<T>): React.JSX.Element | null {
  const { data, activeIndex, cx, cy, radius, innerRadius } =
    usePolarChartContext<T>();
  if (activeIndex === null) return null;
  const datum = data[activeIndex] as T;
  return (
    <>{children({ datum, index: activeIndex, cx, cy, radius, innerRadius })}</>
  );
}
