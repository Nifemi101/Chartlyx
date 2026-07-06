import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { scaleLinear } from "d3-scale";
import { Scatter } from "../shapes/Scatter";
import { renderInChart } from "./testUtils";
import { DEFAULT_MARGIN } from "../types";

interface Row {
  x: number;
  y: number;
}

const DATA: Row[] = [
  { x: 0, y: 10 },
  { x: 1, y: 20 },
  { x: 2, y: 15 },
  { x: 3, y: 30 },
];

describe("Scatter", () => {
  it("renders one <circle> per data point", () => {
    const { container } = renderInChart(<Scatter />);
    const circles = container.querySelectorAll("circle");
    expect(circles.length).toBe(DATA.length);
  });

  it("applies fill, radius, stroke props", () => {
    const { container } = renderInChart(
      <Scatter fill="tomato" radius={7} stroke="black" strokeWidth={1} />,
    );
    const circle = container.querySelector("circle")!;
    expect(circle.getAttribute("fill")).toBe("tomato");
    expect(circle.getAttribute("r")).toBe("7");
    expect(circle.getAttribute("stroke")).toBe("black");
    expect(circle.getAttribute("stroke-width")).toBe("1");
  });

  it("positions the first circle at (xScale(x), yScale(y))", () => {
    // Reproduce testUtils' default linear scales:
    const width = 400;
    const height = 300;
    const xScale = scaleLinear()
      .domain([0, 3])
      .range([DEFAULT_MARGIN.left, width - DEFAULT_MARGIN.right]);
    const yScale = scaleLinear()
      .domain([10, 30])
      .range([height - DEFAULT_MARGIN.bottom, DEFAULT_MARGIN.top]);

    const { container } = renderInChart(<Scatter />);
    const circle = container.querySelector("circle")!;
    expect(Number(circle.getAttribute("cx"))).toBeCloseTo(xScale(0));
    expect(Number(circle.getAttribute("cy"))).toBeCloseTo(yScale(10));
  });

  it("calls label render-prop with pixel coords + datum per point", () => {
    const label = vi.fn(
      (_p: { x: number; y: number; datum: Row; index: number }) => null,
    );
    renderInChart(<Scatter<Row> label={label} />);
    expect(label).toHaveBeenCalledTimes(DATA.length);
    const first = label.mock.calls[0]![0];
    expect(first.index).toBe(0);
    expect(first.datum).toEqual(DATA[0]);
    expect(Number.isFinite(first.x)).toBe(true);
    expect(Number.isFinite(first.y)).toBe(true);
  });
});
