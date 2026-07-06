import { extent } from "d3-array";
import { scaleBand, scaleLinear, scaleTime } from "d3-scale";
import type { Margin, ScaleType } from "../types";
import type { XScale, YScale } from "./types";

export interface ChartScales {
  xScale: XScale;
  yScale: YScale;
  innerWidth: number;
  innerHeight: number;
}

export interface UseChartScalesParams<T> {
  data: readonly T[];
  xAccessor: (d: T) => number | Date | string;
  yAccessor: (d: T) => number | Date | string;
  xScaleType: ScaleType;
  yScaleType: ScaleType;
  margin: Margin;
  width: number;
  height: number;
}

export function useChartScales<T>(params: UseChartScalesParams<T>): ChartScales {
  const {
    data,
    xAccessor,
    yAccessor,
    xScaleType,
    yScaleType,
    margin,
    width,
    height,
  } = params;

  const xRange: [number, number] = [margin.left, width - margin.right];
  const yRange: [number, number] = [height - margin.bottom, margin.top];

  const xScale = buildScale(xScaleType, data, xAccessor, xRange);
  const yScale = buildScale(yScaleType, data, yAccessor, yRange);

  return {
    xScale,
    yScale,
    innerWidth: width - margin.left - margin.right,
    innerHeight: height - margin.top - margin.bottom,
  };
}

function buildScale<T>(
  scaleType: ScaleType,
  data: readonly T[],
  accessor: (d: T) => number | Date | string,
  range: [number, number],
): XScale {
  switch (scaleType) {
    case "linear": {
      const values = data.map((d) => accessor(d) as number);
      const [min, max] = extent(values);
      return scaleLinear()
        .domain([min ?? 0, max ?? 1])
        .range(range)
        .nice();
    }
    case "time": {
      const values = data.map((d) => accessor(d) as Date);
      const [min, max] = extent(values);
      return scaleTime()
        .domain([min ?? new Date(0), max ?? new Date(1)])
        .range(range)
        .nice();
    }
    case "band": {
      const values = data.map((d) => accessor(d) as string);
      const unique = Array.from(new Set(values));
      return scaleBand<string>().domain(unique).range(range).padding(0.1);
    }
  }
}
