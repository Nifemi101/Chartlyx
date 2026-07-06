import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { Pie } from "../polar/Pie";
import { POLAR_DATA, renderInPolarChart, type PolarRow } from "./testUtils";

describe("Pie", () => {
  it("renders one <path> per data slice", () => {
    const { container } = renderInPolarChart(<Pie />);
    const paths = container.querySelectorAll("path");
    expect(paths.length).toBe(POLAR_DATA.length);
  });

  it("each slice path starts with M and contains an arc command A", () => {
    const { container } = renderInPolarChart(<Pie />);
    const paths = Array.from(container.querySelectorAll("path"));
    for (const p of paths) {
      const d = p.getAttribute("d") ?? "";
      expect(d.startsWith("M")).toBe(true);
      expect(d).toMatch(/A/);
    }
  });

  it("innerRadius > 0 produces a donut (two arc commands per slice)", () => {
    const { container: pie } = renderInPolarChart(<Pie />);
    const { container: donut } = renderInPolarChart(<Pie />, {
      innerRadius: 50,
    });
    const pieArcs = (
      pie.querySelector("path")!.getAttribute("d") ?? ""
    ).match(/A/g);
    const donutArcs = (
      donut.querySelector("path")!.getAttribute("d") ?? ""
    ).match(/A/g);
    expect(pieArcs?.length ?? 0).toBe(1);
    expect(donutArcs?.length ?? 0).toBeGreaterThanOrEqual(2);
  });

  it("cycles colors when fewer colors than slices", () => {
    const { container } = renderInPolarChart(
      <Pie colors={["red", "blue"]} />,
    );
    const paths = Array.from(container.querySelectorAll("path"));
    const fills = paths.map((p) => p.getAttribute("fill"));
    expect(fills).toEqual(["red", "blue", "red", "blue"]);
  });

  it("calls label render-prop per slice with centroid + datum", () => {
    const label = vi.fn(
      (_p: {
        centroid: [number, number];
        cx: number;
        cy: number;
        startAngle: number;
        endAngle: number;
        datum: PolarRow;
        index: number;
      }) => null,
    );
    renderInPolarChart(<Pie<PolarRow> label={label} />);
    expect(label).toHaveBeenCalledTimes(POLAR_DATA.length);
    const firstCall = label.mock.calls[0]![0];
    expect(firstCall.centroid).toHaveLength(2);
    expect(Number.isFinite(firstCall.centroid[0])).toBe(true);
    expect(Number.isFinite(firstCall.centroid[1])).toBe(true);
    expect(firstCall.datum).toEqual(POLAR_DATA[0]);
    expect(firstCall.index).toBe(0);
  });
});
