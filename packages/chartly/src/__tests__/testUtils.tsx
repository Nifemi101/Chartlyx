import * as React from "react";
import { render, type RenderResult } from "@testing-library/react";
import { scaleBand, scaleLinear } from "d3-scale";
import { ChartContext, type ChartContextValue } from "../context";
import { DEFAULT_MARGIN } from "../types";

export interface BandRow {
  name: string;
  sales: number;
}

export const BAND_DATA: BandRow[] = [
  { name: "A", sales: 10 },
  { name: "B", sales: 20 },
  { name: "C", sales: 15 },
  { name: "D", sales: 25 },
];

export interface MockChartOptions {
  data?: readonly { x: number; y: number }[];
  width?: number;
  height?: number;
  overrides?: Partial<ChartContextValue>;
}

const WIDTH = 400;
const HEIGHT = 300;

export function makeContext(options: MockChartOptions = {}): ChartContextValue {
  const {
    data = [
      { x: 0, y: 10 },
      { x: 1, y: 20 },
      { x: 2, y: 15 },
      { x: 3, y: 30 },
    ],
    width = WIDTH,
    height = HEIGHT,
    overrides = {},
  } = options;

  const margin = DEFAULT_MARGIN;
  const xScale = scaleLinear()
    .domain([0, 3])
    .range([margin.left, width - margin.right]);
  const yScale = scaleLinear()
    .domain([10, 30])
    .range([height - margin.bottom, margin.top]);

  return {
    data,
    xScale,
    yScale,
    xAccessor: (d) => (d as { x: number }).x,
    yAccessor: (d) => (d as { y: number }).y,
    width,
    height,
    innerWidth: width - margin.left - margin.right,
    innerHeight: height - margin.top - margin.bottom,
    margin,
    ...overrides,
  };
}

export function renderInChart(
  children: React.ReactNode,
  options: MockChartOptions = {},
): RenderResult {
  const value = makeContext(options);
  return render(
    <svg width={value.width} height={value.height} data-testid="chart-svg">
      <ChartContext.Provider value={value}>{children}</ChartContext.Provider>
    </svg>,
  );
}

export function makeBandContext(
  overrides: Partial<ChartContextValue> = {},
): ChartContextValue {
  const width = WIDTH;
  const height = HEIGHT;
  const margin = DEFAULT_MARGIN;
  const xScale = scaleBand<string>()
    .domain(BAND_DATA.map((d) => d.name))
    .range([margin.left, width - margin.right])
    .padding(0.1);
  const yScale = scaleLinear()
    .domain([0, 25])
    .range([height - margin.bottom, margin.top]);

  return {
    data: BAND_DATA,
    xScale,
    yScale,
    xAccessor: (d) => (d as BandRow).name,
    yAccessor: (d) => (d as BandRow).sales,
    width,
    height,
    innerWidth: width - margin.left - margin.right,
    innerHeight: height - margin.top - margin.bottom,
    margin,
    ...overrides,
  };
}

export function renderInBandChart(
  children: React.ReactNode,
  overrides: Partial<ChartContextValue> = {},
): RenderResult {
  const value = makeBandContext(overrides);
  return render(
    <svg width={value.width} height={value.height} data-testid="chart-svg">
      <ChartContext.Provider value={value}>{children}</ChartContext.Provider>
    </svg>,
  );
}
