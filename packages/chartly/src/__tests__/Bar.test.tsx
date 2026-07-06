import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { scaleLinear } from "d3-scale";
import { Bar } from "../shapes/Bar";
import {
  BAND_DATA,
  makeBandContext,
  renderInBandChart,
  type BandRow,
} from "./testUtils";
import { DEFAULT_MARGIN } from "../types";

describe("Bar", () => {
  it("renders one <rect> per data point", () => {
    const { container } = renderInBandChart(<Bar />);
    const rects = container.querySelectorAll("rect");
    expect(rects.length).toBe(BAND_DATA.length);
  });

  it("all bars share the band scale's bandwidth", () => {
    const { container } = renderInBandChart(<Bar />);
    const rects = Array.from(container.querySelectorAll("rect"));
    const widths = new Set(rects.map((r) => r.getAttribute("width")));
    expect(widths.size).toBe(1);
  });

  it("applies fill, fillOpacity, and radius (rx) props", () => {
    const { container } = renderInBandChart(
      <Bar fill="tomato" fillOpacity={0.6} radius={6} />,
    );
    const rect = container.querySelector("rect")!;
    expect(rect.getAttribute("fill")).toBe("tomato");
    expect(rect.getAttribute("fill-opacity")).toBe("0.6");
    expect(rect.getAttribute("rx")).toBe("6");
  });

  it("clamps baseline to plot bottom when y-domain omits 0", () => {
    // Force a domain of [100, 200] — 0 is well below the plot.
    const ctx = makeBandContext({
      yScale: scaleLinear()
        .domain([100, 200])
        .range([300 - DEFAULT_MARGIN.bottom, DEFAULT_MARGIN.top]),
    });
    const { container } = renderInBandChart(<Bar />, {
      yScale: ctx.yScale,
      data: [
        { name: "A", sales: 130 },
        { name: "B", sales: 180 },
      ] as BandRow[],
    });
    const rects = Array.from(container.querySelectorAll("rect"));
    const plotBottom = 300 - DEFAULT_MARGIN.bottom;
    for (const r of rects) {
      const y = Number(r.getAttribute("y"));
      const h = Number(r.getAttribute("height"));
      expect(y + h).toBeLessThanOrEqual(plotBottom + 0.001);
      expect(h).toBeGreaterThan(0);
    }
  });

  it("y accessor override produces uniform bar heights", () => {
    const { container } = renderInBandChart(<Bar y={() => 20} />);
    const rects = Array.from(container.querySelectorAll("rect"));
    const heights = new Set(rects.map((r) => r.getAttribute("height")));
    expect(heights.size).toBe(1);
  });

  it("calls label render-prop with top-center coordinates", () => {
    const label = vi.fn(
      (_p: { x: number; y: number; datum: BandRow; index: number }) => null,
    );
    renderInBandChart(<Bar<BandRow> label={label} />);
    expect(label).toHaveBeenCalledTimes(BAND_DATA.length);
    for (let i = 0; i < BAND_DATA.length; i++) {
      const call = label.mock.calls[i]![0];
      expect(call.index).toBe(i);
      expect(call.datum).toEqual(BAND_DATA[i]);
      expect(Number.isFinite(call.x)).toBe(true);
      expect(Number.isFinite(call.y)).toBe(true);
    }
  });
});
