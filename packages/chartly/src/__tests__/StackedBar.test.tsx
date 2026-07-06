import * as React from "react";
import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { scaleBand, scaleLinear } from "d3-scale";
import { ChartContext, type ChartContextValue } from "../context";
import { DEFAULT_MARGIN } from "../types";
import { StackedBar } from "../shapes/StackedBar";
import { stackSum } from "../shapes/stackHelpers";

interface Row {
  month: string;
  a: number;
  b: number;
  c: number;
}

const DATA: Row[] = [
  { month: "Jan", a: 20, b: 30, c: 10 },
  { month: "Feb", a: 25, b: 20, c: 15 },
  { month: "Mar", a: 15, b: 25, c: 20 },
  { month: "Apr", a: 30, b: 15, c: 25 },
];

const WIDTH = 400;
const HEIGHT = 300;

function makeStackContext(): ChartContextValue {
  const margin = DEFAULT_MARGIN;
  const xScale = scaleBand<string>()
    .domain(DATA.map((d) => d.month))
    .range([margin.left, WIDTH - margin.right])
    .padding(0.1);
  const yScale = scaleLinear()
    .domain([0, stackSum(DATA, ["a", "b", "c"])])
    .range([HEIGHT - margin.bottom, margin.top])
    .nice();

  return {
    data: DATA,
    xScale,
    yScale,
    xAccessor: (d) => (d as Row).month,
    yAccessor: (d) => (d as Row).a,
    width: WIDTH,
    height: HEIGHT,
    innerWidth: WIDTH - margin.left - margin.right,
    innerHeight: HEIGHT - margin.top - margin.bottom,
    margin,
  };
}

function renderStack(children: React.ReactNode) {
  const value = makeStackContext();
  return render(
    <svg width={WIDTH} height={HEIGHT}>
      <ChartContext.Provider value={value}>{children}</ChartContext.Provider>
    </svg>,
  );
}

describe("StackedBar", () => {
  it("renders keys.length × data.length rects", () => {
    const { container } = renderStack(
      <StackedBar<Row> keys={["a", "b", "c"]} />,
    );
    const rects = container.querySelectorAll("rect");
    expect(rects.length).toBe(3 * DATA.length);
  });

  it("segment heights in one column sum to the total pixel height", () => {
    const { container } = renderStack(
      <StackedBar<Row> keys={["a", "b", "c"]} />,
    );
    // All segments for column 0 have the same x coord.
    const rects = Array.from(container.querySelectorAll("rect"));
    const groupsByX = new Map<string, number>();
    for (const r of rects) {
      const x = r.getAttribute("x")!;
      const h = Number(r.getAttribute("height"));
      groupsByX.set(x, (groupsByX.get(x) ?? 0) + h);
    }
    const expectedTotal = sumForRow(DATA[0]!);
    const ctx = makeStackContext();
    const yScale = ctx.yScale as (v: never) => number;
    const expectedPx = yScale(0 as never) - yScale(expectedTotal as never);
    const firstColumnHeight = [...groupsByX.values()][0]!;
    expect(firstColumnHeight).toBeCloseTo(expectedPx, 0);
  });

  it("cycles colors when fewer colors than keys", () => {
    const { container } = renderStack(
      <StackedBar<Row> keys={["a", "b", "c"]} colors={["red", "blue"]} />,
    );
    // rects are grouped by series in <g fill="...">.
    const groups = Array.from(container.querySelectorAll("g[fill]"));
    const fills = groups.map((g) => g.getAttribute("fill"));
    expect(fills).toEqual(["red", "blue", "red"]);
  });

  it("only the top segment has rounded corners", () => {
    const { container } = renderStack(
      <StackedBar<Row> keys={["a", "b", "c"]} radius={4} />,
    );
    const groups = Array.from(container.querySelectorAll("g[fill]"));
    const rxs = groups.map((g) =>
      g.querySelector("rect")!.getAttribute("rx"),
    );
    expect(rxs[0]).toBe("0");
    expect(rxs[1]).toBe("0");
    expect(rxs[2]).toBe("4");
  });
});

function sumForRow(row: Row): number {
  return row.a + row.b + row.c;
}
