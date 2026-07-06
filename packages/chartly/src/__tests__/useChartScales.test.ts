import { describe, expect, it } from "vitest";
import { useChartScales } from "../scales/useChartScales";
import type { Margin } from "../types";

const MARGIN: Margin = { top: 10, right: 10, bottom: 20, left: 20 };

describe("useChartScales", () => {
  it("linear x: domain covers data, range respects horizontal margins", () => {
    const data = [{ x: 1, y: 0 }, { x: 5, y: 0 }, { x: 10, y: 0 }];
    const { xScale, innerWidth } = useChartScales({
      data,
      xAccessor: (d) => d.x,
      yAccessor: (d) => d.y,
      xScaleType: "linear",
      yScaleType: "linear",
      margin: MARGIN,
      width: 200,
      height: 100,
    });

    const [dMin, dMax] = xScale.domain() as [number, number];
    expect(dMin).toBeLessThanOrEqual(1);
    expect(dMax).toBeGreaterThanOrEqual(10);
    expect(xScale(dMin as never)).toBe(MARGIN.left);
    expect(xScale(dMax as never)).toBe(200 - MARGIN.right);
    expect(innerWidth).toBe(200 - MARGIN.left - MARGIN.right);
  });

  it("time x: Date extent, endpoints land on margins", () => {
    const data = [
      { d: new Date("2020-01-01") },
      { d: new Date("2020-12-31") },
    ];
    const { xScale } = useChartScales({
      data,
      xAccessor: (d) => d.d,
      yAccessor: () => 0,
      xScaleType: "time",
      yScaleType: "linear",
      margin: MARGIN,
      width: 300,
      height: 100,
    });

    const [dMin, dMax] = xScale.domain() as [Date, Date];
    expect(dMin).toBeInstanceOf(Date);
    expect(dMax).toBeInstanceOf(Date);
    expect(xScale(dMin as never)).toBe(MARGIN.left);
    expect(xScale(dMax as never)).toBe(300 - MARGIN.right);
  });

  it("band x: unique values in insertion order, output inside range", () => {
    const data = [{ x: "a" }, { x: "b" }, { x: "a" }, { x: "c" }];
    const { xScale } = useChartScales({
      data,
      xAccessor: (d) => d.x,
      yAccessor: () => 0,
      xScaleType: "band",
      yScaleType: "linear",
      margin: MARGIN,
      width: 200,
      height: 100,
    });

    expect(xScale.domain()).toEqual(["a", "b", "c"]);
    const pos = xScale("a" as never)!;
    expect(pos).toBeGreaterThanOrEqual(MARGIN.left);
    expect(pos).toBeLessThan(200 - MARGIN.right);
  });

  it("y is inverted: max maps to top, min maps to bottom (margin-baked)", () => {
    const data = [{ y: 0 }, { y: 100 }];
    const { yScale, innerHeight } = useChartScales({
      data,
      xAccessor: () => 0,
      yAccessor: (d) => d.y,
      xScaleType: "linear",
      yScaleType: "linear",
      margin: MARGIN,
      width: 100,
      height: 100,
    });

    const [dMin, dMax] = yScale.domain() as [number, number];
    expect(yScale(dMax as never)).toBe(MARGIN.top);
    expect(yScale(dMin as never)).toBe(100 - MARGIN.bottom);
    expect(innerHeight).toBe(100 - MARGIN.top - MARGIN.bottom);
  });

  it("key-form and accessor-form produce identical scale output", () => {
    const data = [{ x: 1, y: 0 }, { x: 10, y: 0 }];

    const viaAccessor = useChartScales({
      data,
      xAccessor: (d) => d.x,
      yAccessor: (d) => d.y,
      xScaleType: "linear",
      yScaleType: "linear",
      margin: MARGIN,
      width: 200,
      height: 100,
    });

    const viaKeyEquivalent = useChartScales({
      data,
      xAccessor: (d) => d["x"],
      yAccessor: (d) => d["y"],
      xScaleType: "linear",
      yScaleType: "linear",
      margin: MARGIN,
      width: 200,
      height: 100,
    });

    expect(viaAccessor.xScale.domain()).toEqual(viaKeyEquivalent.xScale.domain());
    expect(viaAccessor.xScale(5 as never)).toBe(viaKeyEquivalent.xScale(5 as never));
  });

  it("empty data does not throw and produces a usable scale", () => {
    const { xScale, yScale } = useChartScales<{ x: number; y: number }>({
      data: [],
      xAccessor: (d) => d.x,
      yAccessor: (d) => d.y,
      xScaleType: "linear",
      yScaleType: "linear",
      margin: MARGIN,
      width: 100,
      height: 100,
    });

    expect(xScale.domain()).toHaveLength(2);
    expect(yScale.domain()).toHaveLength(2);
  });

  it("explicit yDomain bypasses extent-based inference", () => {
    const data = [{ y: 5 }, { y: 10 }];
    const { yScale } = useChartScales({
      data,
      xAccessor: () => 0,
      yAccessor: (d) => d.y,
      xScaleType: "linear",
      yScaleType: "linear",
      margin: MARGIN,
      width: 200,
      height: 200,
      yDomain: [0, 500],
    });
    const [dMin, dMax] = yScale.domain() as [number, number];
    expect(dMin).toBeLessThanOrEqual(0);
    expect(dMax).toBeGreaterThanOrEqual(500);
  });
});
