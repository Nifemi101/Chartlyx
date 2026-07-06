import type * as React from "react";

export interface ShapeLabelRenderProps<T> {
  x: number;
  y: number;
  datum: T;
  index: number;
}

export type ShapeLabelRender<T> = (
  props: ShapeLabelRenderProps<T>,
) => React.ReactNode;
