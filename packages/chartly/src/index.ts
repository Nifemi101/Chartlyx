export const VERSION = "0.0.0";

export { ChartContainer, type ChartContainerProps } from "./ChartContainer";
export { useChartContext, type ChartContextValue } from "./context";
export { Line, type LineProps } from "./shapes/Line";
export { Area, type AreaProps } from "./shapes/Area";
export { Bar, type BarProps } from "./shapes/Bar";
export { Scatter, type ScatterProps } from "./shapes/Scatter";
export {
  LinearGradient,
  type LinearGradientProps,
} from "./shapes/LinearGradient";
export type { CurveType } from "./shapes/curves";
export { XAxis } from "./axes/XAxis";
export { YAxis } from "./axes/YAxis";
export { Tooltip, type TooltipProps } from "./interaction/Tooltip";
export type { TooltipState, TooltipRender } from "./interaction/types";
export type {
  ShapeLabelRender,
  ShapeLabelRenderProps,
} from "./shapes/types";
export type { AxisProps, TickFormatter, TickValue } from "./axes/types";
export type { Margin, ScaleType, ScaleInput, KeysOfType } from "./types";
export { DEFAULT_MARGIN } from "./types";
