import * as React from "react";
import { ChartContext, type ChartContextValue } from "./context";
import { useResize } from "./hooks/useResize";
import { useChartScales } from "./scales/useChartScales";
import {
  DEFAULT_MARGIN,
  type KeysOfType,
  type Margin,
  type ScaleInput,
  type ScaleType,
} from "./types";

type XProps<T, XS extends ScaleType> = { xScaleType: XS } & (
  | { xKey: KeysOfType<T, ScaleInput<XS>>; x?: never }
  | { x: (d: T) => ScaleInput<XS>; xKey?: never }
);

type YProps<T, YS extends ScaleType> = { yScaleType: YS } & (
  | { yKey: KeysOfType<T, ScaleInput<YS>>; y?: never }
  | { y: (d: T) => ScaleInput<YS>; yKey?: never }
);

export type ChartContainerProps<
  T,
  XS extends ScaleType = "linear",
  YS extends ScaleType = "linear",
> = {
  data: readonly T[];
  margin?: Partial<Margin>;
  minHeight?: number;
  yDomain?: [number, number];
  children?: React.ReactNode;
} & XProps<T, XS> & YProps<T, YS>;

export function ChartContainer<
  T,
  XS extends ScaleType = "linear",
  YS extends ScaleType = "linear",
>(props: ChartContainerProps<T, XS, YS>) {
  const {
    data,
    margin: marginProp,
    minHeight = 300,
    yDomain,
    children,
  } = props;
  const { ref, width, height } = useResize<HTMLDivElement>();

  const margin: Margin = { ...DEFAULT_MARGIN, ...(marginProp ?? {}) };
  const xAccessor = resolveAccessor(props, "x");
  const yAccessor = resolveAccessor(props, "y");

  const { xScale, yScale, innerWidth, innerHeight } = useChartScales<T>({
    data,
    xAccessor,
    yAccessor,
    xScaleType: props.xScaleType,
    yScaleType: props.yScaleType,
    margin,
    width,
    height,
    yDomain,
  });

  const value: ChartContextValue = {
    data,
    xScale,
    yScale,
    xAccessor: xAccessor as (d: unknown) => number | Date | string,
    yAccessor: yAccessor as (d: unknown) => number | Date | string,
    width,
    height,
    innerWidth,
    innerHeight,
    margin,
  };

  return (
    <div
      ref={ref}
      style={{ width: "100%", height: "100%", minHeight, position: "relative" }}
    >
      <svg width={width} height={height} role="img">
        {width > 0 && height > 0 ? (
          <ChartContext.Provider value={value}>{children}</ChartContext.Provider>
        ) : null}
      </svg>
    </div>
  );
}

type AccessorAxis = "x" | "y";

function resolveAccessor<T>(
  props: Record<string, unknown>,
  axis: AccessorAxis,
): (d: T) => number | Date | string {
  const fn = props[axis];
  if (typeof fn === "function") {
    return fn as (d: T) => number | Date | string;
  }
  const key = props[`${axis}Key`] as keyof T;
  return (d: T) => d[key] as number | Date | string;
}
