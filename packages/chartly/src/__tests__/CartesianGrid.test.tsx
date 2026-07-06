import * as React from "react";
import { describe, expect, it } from "vitest";
import { CartesianGrid } from "../CartesianGrid";
import { renderInChart } from "./testUtils";

describe("CartesianGrid", () => {
  it("renders horizontal and vertical grid lines by default", () => {
    const { container } = renderInChart(<CartesianGrid />);
    const lines = container.querySelectorAll("[data-chartly-cartesian-grid] line");
    expect(lines.length).toBeGreaterThanOrEqual(10);
  });

  it("renders only horizontal or vertical grid lines when configured", () => {
    const { container: horizontalOnly } = renderInChart(
      <CartesianGrid horizontal vertical={false} />,
    );
    const horizontalLines = Array.from(
      horizontalOnly.querySelectorAll('[data-chartly-cartesian-grid] line'),
    ).filter((line) => line.getAttribute("y1") === line.getAttribute("y2"));
    expect(horizontalLines.length).toBeGreaterThanOrEqual(5);

    const { container: verticalOnly } = renderInChart(
      <CartesianGrid horizontal={false} vertical />,
    );
    const verticalLines = Array.from(
      verticalOnly.querySelectorAll('[data-chartly-cartesian-grid] line'),
    ).filter((line) => line.getAttribute("x1") === line.getAttribute("x2"));
    expect(verticalLines.length).toBeGreaterThanOrEqual(5);
  });
});
