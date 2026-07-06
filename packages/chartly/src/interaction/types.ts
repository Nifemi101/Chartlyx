import type * as React from "react";

export interface TooltipState<T> {
  x: number;
  y: number;
  datum: T;
  index: number;
}

export type TooltipRender<T> = (state: TooltipState<T>) => React.ReactNode;
