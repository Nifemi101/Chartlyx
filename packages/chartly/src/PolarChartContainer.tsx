import * as React from "react";
import { useResize } from "./hooks/useResize";
import { PolarContext } from "./polar/context";
import type { PolarChartContextValue } from "./polar/types";
import type { KeysOfType } from "./types";

type ValueProps<T> =
  | { valueKey: KeysOfType<T, number>; value?: never }
  | { value: (d: T) => number; valueKey?: never };

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

  const valueAccessor: (d: T) => number =
    "value" in props && typeof props.value === "function"
      ? (props.value as (d: T) => number)
      : (d: T) => d[(props as { valueKey: keyof T }).valueKey] as number;

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
