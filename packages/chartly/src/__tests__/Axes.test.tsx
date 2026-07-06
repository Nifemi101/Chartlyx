import * as React from "react";
import { describe, expect, it } from "vitest";
import { XAxis } from "../axes/XAxis";
import { YAxis } from "../axes/YAxis";
import { renderInChart } from "./testUtils";

describe("XAxis", () => {
  it("renders an axis line + tick text elements", () => {
    const { container } = renderInChart(<XAxis />);
    const axis = container.querySelector('[data-chartly-axis="x"]');
    expect(axis).not.toBeNull();
    expect(axis!.querySelectorAll("line").length).toBeGreaterThan(1);
    expect(axis!.querySelectorAll("text").length).toBeGreaterThan(0);
  });

  it("uses tickFormatter for tick text", () => {
    const { container } = renderInChart(
      <XAxis tickFormatter={(v) => `x=${v}`} />,
    );
    const texts = Array.from(
      container.querySelectorAll<SVGTextElement>(
        '[data-chartly-axis="x"] text',
      ),
    );
    expect(texts.some((t) => t.textContent?.startsWith("x="))).toBe(true);
  });

  it("renders static label text when label prop provided", () => {
    const { container } = renderInChart(<XAxis label="Time" />);
    const labels = Array.from(
      container.querySelectorAll<SVGTextElement>(
        '[data-chartly-axis="x"] text',
      ),
    );
    expect(labels.some((t) => t.textContent === "Time")).toBe(true);
  });
});

describe("YAxis", () => {
  it("renders an axis line + tick text elements", () => {
    const { container } = renderInChart(<YAxis />);
    const axis = container.querySelector('[data-chartly-axis="y"]');
    expect(axis).not.toBeNull();
    expect(axis!.querySelectorAll("text").length).toBeGreaterThan(0);
  });

  it("renders label rotated -90 degrees when label prop provided", () => {
    const { container } = renderInChart(<YAxis label="Revenue" />);
    const texts = Array.from(
      container.querySelectorAll<SVGTextElement>(
        '[data-chartly-axis="y"] text',
      ),
    );
    const labelEl = texts.find((t) => t.textContent === "Revenue");
    expect(labelEl).toBeDefined();
    expect(labelEl!.getAttribute("transform")).toMatch(/rotate\(-90\)/);
  });
});
