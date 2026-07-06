import type * as React from "react";

export interface PolarChartContextValue {
  data: readonly unknown[];
  valueAccessor: (d: unknown) => number;
  width: number;
  height: number;
  cx: number;
  cy: number;
  radius: number;
  innerRadius: number;
  padding: number;
  activeIndex: number | null;
  setActiveIndex: (i: number | null) => void;
}

export interface PieLabelRenderProps<T> {
  centroid: [number, number];
  cx: number;
  cy: number;
  startAngle: number;
  endAngle: number;
  datum: T;
  index: number;
}

export type PieLabelRender<T> = (
  props: PieLabelRenderProps<T>,
) => React.ReactNode;

export interface PolarTooltipState<T> {
  datum: T;
  index: number;
  cx: number;
  cy: number;
  radius: number;
  innerRadius: number;
}

export type PolarTooltipRender<T> = (
  state: PolarTooltipState<T>,
) => React.ReactNode;
