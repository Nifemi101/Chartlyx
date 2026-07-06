import { createContext, useContext } from "react";
import type { Margin } from "./types";
import type { XScale, YScale } from "./scales/types";

export interface ChartContextValue {
  data: readonly unknown[];
  xScale: XScale;
  yScale: YScale;
  xAccessor: (d: unknown) => number | Date | string;
  yAccessor: (d: unknown) => number | Date | string;
  width: number;
  height: number;
  innerWidth: number;
  innerHeight: number;
  margin: Margin;
}

export const ChartContext = createContext<ChartContextValue | null>(null);

export function useChartContext<T = unknown>(): Omit<ChartContextValue, "data"> & {
  data: readonly T[];
} {
  const ctx = useContext(ChartContext);
  if (!ctx) {
    throw new Error("useChartContext must be used inside a <ChartContainer>");
  }
  return ctx as Omit<ChartContextValue, "data"> & { data: readonly T[] };
}
