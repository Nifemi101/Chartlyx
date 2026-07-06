import * as React from "react";
import { useResize } from "./hooks/useResize";
import { PolarContext } from "./polar/context";
import type { PolarChartContextValue } from "./polar/types";
import type { KeysOfType } from "./types";

type ValueProps<T> =
  | { valueKey: KeysOfType<T, number>; value?: never }
  | { value: (d: T) => number; valueKey?: never }
  | { valueKey?: never; value?: never };

export type PolarChartContainerProps<T> = {
  data: readonly T[];
  padding?: number;
  innerRadius?: number;
  minHeight?: number;
  children?: React.ReactNode;
} & ValueProps<T>;

const DEFAULT_PADDING = 20;

export function PolarChartContainer<T>(
  props: PolarChartContainerProps<T>,
): React.JSX.Element {
  const {
    data,
    padding = DEFAULT_PADDING,
    innerRadius = 0,
    minHeight = 300,
    children,
  } = props;
  const { ref, width, height } = useResize<HTMLDivElement>();

  const valueAccessor: (d: T) => number = resolvePolarAccessor(props);

  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const cx = width / 2;
  const cy = height / 2;
  const radius = Math.max(0, Math.min(width, height) / 2 - padding);

  const value: PolarChartContextValue = {
    data,
    valueAccessor: valueAccessor as (d: unknown) => number,
    width,
    height,
    cx,
    cy,
    radius,
    innerRadius,
    padding,
    activeIndex,
    setActiveIndex,
  };

  return (
    <div
      ref={ref}
      style={{ width: "100%", height: "100%", minHeight, position: "relative" }}
    >
      <svg width={width} height={height} role="img">
        {width > 0 && height > 0 ? (
          <PolarContext.Provider value={value}>{children}</PolarContext.Provider>
        ) : null}
      </svg>
    </div>
  );
}

function resolvePolarAccessor<T>(
  props: PolarChartContainerProps<T>,
): (d: T) => number {
  if ("value" in props && typeof props.value === "function") {
    return props.value as (d: T) => number;
  }
  if ("valueKey" in props && props.valueKey !== undefined) {
    const key = props.valueKey as keyof T;
    return (d: T) => d[key] as unknown as number;
  }
  // Neither set — radar case. Unused; return a stable no-op.
  return () => 0;
}
