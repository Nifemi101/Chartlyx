import type { ScaleBand, ScaleLinear, ScaleTime } from "d3-scale";

export type LinearScale = ScaleLinear<number, number>;
export type TimeScale = ScaleTime<number, number>;
export type BandScale = ScaleBand<string>;

export type XScale = LinearScale | TimeScale | BandScale;
export type YScale = LinearScale | TimeScale | BandScale;
