import * as React from "react";
import { describe, expect, it } from "vitest";
import { RadarGrid } from "../polar/RadarGrid";
import { RadarAxes } from "../polar/RadarAxes";
import { renderInPolarChart } from "./testUtils";

describe("RadarGrid", () => {
  it("renders `rings` polygons by default", () => {
    const { container } = renderInPolarChart(
      <RadarGrid axesCount={5} rings={4} />,
    );
    const paths = container.querySelectorAll(
      '[data-chartly-radar-grid=""] path',
    );
    expect(paths.length).toBe(4);
  });

  it("shape='circle' renders <circle> elements instead of paths", () => {
    const { container } = renderInPolarChart(
      <RadarGrid axesCount={5} rings={3} shape="circle" />,
    );
    const scope = container.querySelector('[data-chartly-radar-grid=""]')!;
    expect(scope.querySelectorAll("circle").length).toBe(3);
    expect(scope.querySelectorAll("path").length).toBe(0);
  });
});

describe("RadarAxes", () => {
  it("renders one <line> and one <text> per axis", () => {
    const axes = ["speed", "power", "defense", "magic", "agility"];
    const { container } = renderInPolarChart(<RadarAxes axes={axes} />);
    const scope = container.querySelector('[data-chartly-radar-axes=""]')!;
    expect(scope.querySelectorAll("line").length).toBe(axes.length);
    const texts = Array.from(scope.querySelectorAll("text")).map(
      (t) => t.textContent,
    );
    expect(texts).toEqual(axes);
  });
});
