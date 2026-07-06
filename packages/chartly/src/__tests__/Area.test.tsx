import * as React from "react";
import { describe, expect, it } from "vitest";
import { Area } from "../shapes/Area";
import { renderInChart } from "./testUtils";

describe("Area", () => {
  it("renders a filled path with a closed d attribute", () => {
    const { container } = renderInChart(<Area />);
    const path = container.querySelector("path");
    expect(path).not.toBeNull();
    const d = path!.getAttribute("d") ?? "";
    expect(d.startsWith("M")).toBe(true);
    expect(d).toMatch(/L/);
    expect(d).toMatch(/Z\s*$/);
  });

  it("applies fill and fillOpacity props", () => {
    const { container } = renderInChart(
      <Area fill="rebeccapurple" fillOpacity={0.3} />,
    );
    const path = container.querySelector("path")!;
    expect(path.getAttribute("fill")).toBe("rebeccapurple");
    expect(path.getAttribute("fill-opacity")).toBe("0.3");
  });

  it("monotone curve emits cubic bezier segments; linear does not", () => {
    const { container: linear } = renderInChart(<Area curve="linear" />);
    const { container: monotone } = renderInChart(<Area curve="monotone" />);
    const dLinear = linear.querySelector("path")!.getAttribute("d") ?? "";
    const dMono = monotone.querySelector("path")!.getAttribute("d") ?? "";
    expect(dLinear).not.toMatch(/C/);
    expect(dMono).toMatch(/C/);
  });
});
