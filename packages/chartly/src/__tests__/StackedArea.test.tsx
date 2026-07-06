import * as React from "react";
import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { scaleLinear } from "d3-scale";
import { ChartContext, type ChartContextValue } from "../context";
import { DEFAULT_MARGIN } from "../types";
import { StackedArea } from "../shapes/StackedArea";
import { stackSum } from "../shapes/stackHelpers";

interface Row {
  x: number;
  a: number;
  b: number;
  c: number;
}

const DATA: Row[] = [
  { x: 0, a: 10, b: 15, c: 5 },
  { x: 1, a: 20, b: 10, c: 8 },
  { x: 2, a: 15, b: 20, c: 12 },
  { x: 3, a: 25, b: 12, c: 10 },
];

const WIDTH = 400;
const HEIGHT = 300;

function makeCtx(): ChartContextValue {
  const margin = DEFAULT_MARGIN;
  const xScale = scaleLinear()
    .domain([0, 3])
    .range([margin.left, WIDTH - margin.right]);
  const yScale = scaleLinear()
    .domain([0, stackSum(DATA, ["a", "b", "c"])])
    .range([HEIGHT - margin.bottom, margin.top])
    .nice();
  return {
    data: DATA,
    xScale,
    yScale,
    xAccessor: (d) => (d as Row).x,
    yAccessor: (d) => (d as Row).a,
    width: WIDTH,
    height: HEIGHT,
    innerWidth: WIDTH - margin.left - margin.right,
    innerHeight: HEIGHT - margin.top - margin.bottom,
    margin,
  };
}

function renderStack(children: React.ReactNode) {
  return render(
    <svg width={WIDTH} height={HEIGHT}>
      <ChartContext.Provider value={makeCtx()}>
        {children}
      </ChartContext.Provider>
    </svg>,
  );
}

describe("StackedArea", () => {
  it("renders one <path> per key", () => {
    const { container } = renderStack(
      <StackedArea<Row> keys={["a", "b", "c"]} />,
    );
    expect(container.querySelectorAll("path").length).toBe(3);
  });

  it("all paths are closed (end with Z)", () => {
    const { container } = renderStack(
      <StackedArea<Row> keys={["a", "b", "c"]} />,
    );
    const paths = Array.from(container.querySelectorAll("path"));
    for (const p of paths) {
      const d = p.getAttribute("d") ?? "";
      expect(d).toMatch(/Z\s*$/);
    }
  });

  it("curve=monotone emits cubic bezier segments; linear does not", () => {
    const { container: linear } = renderStack(
      <StackedArea<Row> keys={["a", "b", "c"]} curve="linear" />,
    );
    const { container: mono } = renderStack(
      <StackedArea<Row> keys={["a", "b", "c"]} curve="monotone" />,
    );
    const dLinear =
      linear.querySelector("path")!.getAttribute("d") ?? "";
    const dMono = mono.querySelector("path")!.getAttribute("d") ?? "";
    expect(dLinear).not.toMatch(/C/);
    expect(dMono).toMatch(/C/);
  });
});
