export const VERSION = "0.0.0";

export { ChartContainer, type ChartContainerProps } from "./ChartContainer";
export { useChartContext, type ChartContextValue } from "./context";
export { Line, type LineProps } from "./shapes/Line";
export { Area, type AreaProps } from "./shapes/Area";
export { Bar, type BarProps } from "./shapes/Bar";
export { Scatter, type ScatterProps } from "./shapes/Scatter";
export { StackedBar, type StackedBarProps } from "./shapes/StackedBar";
export { StackedArea, type StackedAreaProps } from "./shapes/StackedArea";
export {
  DEFAULT_STACK_COLORS,
  pickColor,
  stackSum,
} from "./shapes/stackHelpers";
export {
  LinearGradient,
  type LinearGradientProps,
} from "./shapes/LinearGradient";
export type { CurveType } from "./shapes/curves";
export { XAxis } from "./axes/XAxis";
export { YAxis } from "./axes/YAxis";
export { Legend, type LegendProps, type LegendItem } from "./Legend";
export { Tooltip, type TooltipProps } from "./interaction/Tooltip";
export type { TooltipState, TooltipRender } from "./interaction/types";
export {
  PolarChartContainer,
  type PolarChartContainerProps,
} from "./PolarChartContainer";
export { Pie, type PieProps } from "./polar/Pie";
export {
  PolarTooltip,
  type PolarTooltipProps,
} from "./polar/PolarTooltip";
export { Radar, type RadarProps } from "./polar/Radar";
export { RadarGrid, type RadarGridProps } from "./polar/RadarGrid";
export { RadarAxes, type RadarAxesProps } from "./polar/RadarAxes";
export { usePolarChartContext } from "./polar/context";
export type {
  PolarChartContextValue,
  PieLabelRender,
  PieLabelRenderProps,
  PolarTooltipRender,
  PolarTooltipState,
} from "./polar/types";
export type {
  ShapeLabelRender,
  ShapeLabelRenderProps,
} from "./shapes/types";
export type { AxisProps, TickFormatter, TickValue } from "./axes/types";
export type { Margin, ScaleType, ScaleInput, KeysOfType } from "./types";
export { DEFAULT_MARGIN } from "./types";
