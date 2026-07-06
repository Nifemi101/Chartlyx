import * as React from "react";
import { describe, expect, it } from "vitest";
import { Radar } from "../polar/Radar";
import { renderInPolarChart } from "./testUtils";

interface Stats {
  name: string;
  speed: number;
  power: number;
  defense: number;
}

const RADAR_DATA: Stats[] = [
  { name: "Alice", speed: 60, power: 80, defense: 40 },
  { name: "Bob", speed: 90, power: 40, defense: 70 },
];

const AXES = ["speed", "power", "defense"] as const;

describe("Radar", () => {
  it("renders one <path> per data row by default", () => {
    const { container } = renderInPolarChart(
      <Radar<Stats> axes={[...AXES]} />,
      { data: RADAR_DATA },
    );
    const paths = container.querySelectorAll("path");
    expect(paths.length).toBe(RADAR_DATA.length);
  });

  it("each polygon is closed (ends with Z)", () => {
    const { container } = renderInPolarChart(
      <Radar<Stats> axes={[...AXES]} />,
      { data: RADAR_DATA },
    );
    for (const p of Array.from(container.querySelectorAll("path"))) {
      expect(p.getAttribute("d")).toMatch(/Z$/);
    }
  });

  it("maxValue prop shrinks the polygon versus auto-max", () => {
    // Auto max for RADAR_DATA is 90 (Bob's speed).
    // Setting maxValue=180 should scale everything to half.
    const { container: auto } = renderInPolarChart(
      <Radar<Stats> axes={[...AXES]} />,
      { data: RADAR_DATA },
    );
    const { container: capped } = renderInPolarChart(
      <Radar<Stats>
        axes={[...AXES]}
        maxValue={180}
      />,
      { data: RADAR_DATA },
    );
    // Compare the FIRST vertex x-coordinate of the first polygon.
    // Radar vertex 0 sits at angle -π/2, so x ≈ 0 and y is negative.
    // Compare the second vertex instead (angle 2π/3 in a 3-axis chart).
    const parseFirstY = (svg: Element) => {
      const d = svg.querySelector("path")!.getAttribute("d") ?? "";
      const match = d.match(
        /M(-?\d+(?:\.\d+)?(?:e[+-]?\d+)?),(-?\d+(?:\.\d+)?(?:e[+-]?\d+)?)/,
      );
      return match ? Number(match[2]) : 0;
    };
    const autoY = parseFirstY(auto);
    const cappedY = parseFirstY(capped);
    // Auto scales speed=60 to 60/90 of radius; capped scales 60/180.
    // So |cappedY| should be roughly half of |autoY|.
    expect(Math.abs(cappedY)).toBeLessThan(Math.abs(autoY));
    expect(Math.abs(cappedY) / Math.abs(autoY)).toBeCloseTo(0.5, 1);
  });

  it("showPoints=false suppresses circles", () => {
    const { container: withPoints } = renderInPolarChart(
      <Radar<Stats> axes={[...AXES]} />,
      { data: RADAR_DATA },
    );
    const { container: noPoints } = renderInPolarChart(
      <Radar<Stats>
        axes={[...AXES]}
        showPoints={false}
      />,
      { data: RADAR_DATA },
    );
    expect(withPoints.querySelectorAll("circle").length).toBe(
      RADAR_DATA.length * AXES.length,
    );
    expect(noPoints.querySelectorAll("circle").length).toBe(0);
  });

  it("rowIndex prop renders only the selected row", () => {
    const { container } = renderInPolarChart(
      <Radar<Stats>
        axes={[...AXES]}
        rowIndex={1}
      />,
      { data: RADAR_DATA },
    );
    expect(container.querySelectorAll("path").length).toBe(1);
  });
});
