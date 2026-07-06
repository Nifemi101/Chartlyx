import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { Line } from "../shapes/Line";
import { renderInChart } from "./testUtils";

interface Row {
  x: number;
  y: number;
}

describe("Line", () => {
  it("renders one path with a d attribute", () => {
    const { container } = renderInChart(<Line />);
    const path = container.querySelector("path");
    expect(path).not.toBeNull();
    expect(path!.getAttribute("d")).toMatch(/^M/);
  });

  it("applies stroke and strokeWidth props", () => {
    const { container } = renderInChart(
      <Line stroke="tomato" strokeWidth={5} />,
    );
    const path = container.querySelector("path")!;
    expect(path.getAttribute("stroke")).toBe("tomato");
    expect(path.getAttribute("stroke-width")).toBe("5");
    expect(path.getAttribute("fill")).toBe("none");
  });

  it("invokes label render-prop with pixel geometry per point", () => {
    const label = vi.fn((_p) => null);
    renderInChart(<Line<Row> label={label} />);
    expect(label).toHaveBeenCalledTimes(4);
    const firstCall = label.mock.calls[0]![0];
    expect(firstCall).toHaveProperty("x");
    expect(firstCall).toHaveProperty("y");
    expect(firstCall).toHaveProperty("datum");
    expect(firstCall).toHaveProperty("index", 0);
    expect(Number.isFinite(firstCall.x)).toBe(true);
    expect(Number.isFinite(firstCall.y)).toBe(true);
  });

  it("renders label output when it returns JSX, skips when it returns null", () => {
    const { container } = renderInChart(
      <Line<Row>
        label={({ index, x, y }) =>
          index === 0 ? (
            <text data-testid="lbl" x={x} y={y}>
              first
            </text>
          ) : null
        }
      />,
    );
    const labels = container.querySelectorAll('[data-testid="lbl"]');
    expect(labels).toHaveLength(1);
  });

  it("curve=monotone emits cubic bezier segments; linear does not", () => {
    const { container: linear } = renderInChart(<Line curve="linear" />);
    const { container: monotone } = renderInChart(<Line curve="monotone" />);
    const dLinear = linear.querySelector("path")!.getAttribute("d") ?? "";
    const dMono = monotone.querySelector("path")!.getAttribute("d") ?? "";
    expect(dLinear).not.toMatch(/C/);
    expect(dMono).toMatch(/C/);
  });

  it("y accessor override plots overridden values", () => {
    const { container } = renderInChart(<Line y={() => 25} />);
    const d = container.querySelector("path")!.getAttribute("d") ?? "";
    const ys = [...d.matchAll(/[ML]([\d.-]+),([\d.-]+)/g)].map((m) =>
      Number(m[2]),
    );
    expect(ys.length).toBe(4);
    const first = ys[0]!;
    for (const y of ys) expect(y).toBeCloseTo(first, 1);
  });
});
