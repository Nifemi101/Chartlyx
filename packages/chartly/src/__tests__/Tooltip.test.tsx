import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { fireEvent } from "@testing-library/react";
import { Tooltip } from "../interaction/Tooltip";
import { renderInChart } from "./testUtils";

interface Row {
  x: number;
  y: number;
}

describe("Tooltip", () => {
  it("renders only the overlay when nothing is hovered", () => {
    const render = vi.fn(
      (_state: { x: number; y: number; datum: Row; index: number }) => null,
    );
    const { container } = renderInChart(<Tooltip<Row>>{render}</Tooltip>);
    expect(render).not.toHaveBeenCalled();
    const scope = container.querySelector("[data-chartly-tooltip]")!;
    expect(scope.querySelector("line")).toBeNull();
    expect(scope.querySelector("circle")).toBeNull();
    expect(
      container.querySelector('[data-testid="chartly-tooltip-overlay"]'),
    ).not.toBeNull();
  });

  it("bisector selects the nearest data point on mousemove", () => {
    // testUtils data: x = [0, 1, 2, 3], xScale domain [0,3] range [40, 390].
    // Data pixels: 40, ~156.67, ~273.33, 390.
    // Overlay rect starts at x=40 with width=350. clientX=100 (localX=100)
    // → svgX = 140 → dataX ≈ 0.857 → bisector.center picks index 1.
    const render = vi.fn(
      (_state: { x: number; y: number; datum: Row; index: number }) => null,
    );
    const { container } = renderInChart(<Tooltip<Row>>{render}</Tooltip>);
    const overlay = container.querySelector<SVGRectElement>(
      '[data-testid="chartly-tooltip-overlay"]',
    )!;
    fireEvent.mouseMove(overlay, { clientX: 100, clientY: 50 });
    expect(render).toHaveBeenCalled();
    const lastCall = render.mock.calls[render.mock.calls.length - 1]!;
    const state = lastCall[0];
    expect(state.index).toBe(1);
    expect(state.datum).toEqual({ x: 1, y: 20 });
  });

  it("clears active state on mouseleave", () => {
    const render = vi.fn(() => <text data-testid="tt">on</text>);
    const { container } = renderInChart(<Tooltip<Row>>{render}</Tooltip>);
    const overlay = container.querySelector<SVGRectElement>(
      '[data-testid="chartly-tooltip-overlay"]',
    )!;
    fireEvent.mouseMove(overlay, { clientX: 100, clientY: 50 });
    expect(container.querySelector('[data-testid="tt"]')).not.toBeNull();
    fireEvent.mouseLeave(overlay);
    expect(container.querySelector('[data-testid="tt"]')).toBeNull();
  });

  it("renders guide line + dot when active by default", () => {
    const { container } = renderInChart(<Tooltip<Row>>{() => null}</Tooltip>);
    const overlay = container.querySelector<SVGRectElement>(
      '[data-testid="chartly-tooltip-overlay"]',
    )!;
    fireEvent.mouseMove(overlay, { clientX: 100, clientY: 50 });
    const scope = container.querySelector("[data-chartly-tooltip]")!;
    expect(scope.querySelector("line")).not.toBeNull();
    expect(scope.querySelector("circle")).not.toBeNull();
  });

  it("suppresses indicator when showIndicator={false}", () => {
    const { container } = renderInChart(
      <Tooltip<Row> showIndicator={false}>{() => null}</Tooltip>,
    );
    const overlay = container.querySelector<SVGRectElement>(
      '[data-testid="chartly-tooltip-overlay"]',
    )!;
    fireEvent.mouseMove(overlay, { clientX: 100, clientY: 50 });
    const scope = container.querySelector("[data-chartly-tooltip]")!;
    expect(scope.querySelector("line")).toBeNull();
    expect(scope.querySelector("circle")).toBeNull();
  });
});
