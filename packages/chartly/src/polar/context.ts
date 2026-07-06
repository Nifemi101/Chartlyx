import { createContext, useContext } from "react";
import type { PolarChartContextValue } from "./types";

export const PolarContext = createContext<PolarChartContextValue | null>(null);

export function usePolarChartContext<T = unknown>(): Omit<
  PolarChartContextValue,
  "data" | "valueAccessor"
> & {
  data: readonly T[];
  valueAccessor: (d: T) => number;
} {
  const ctx = useContext(PolarContext);
  if (!ctx) {
    throw new Error(
      "usePolarChartContext must be used inside a <PolarChartContainer>",
    );
  }
  return ctx as Omit<PolarChartContextValue, "data" | "valueAccessor"> & {
    data: readonly T[];
    valueAccessor: (d: T) => number;
  };
}
