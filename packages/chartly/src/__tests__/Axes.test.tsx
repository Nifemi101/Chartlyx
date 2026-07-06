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

  it("textFill overrides tick text fill; stroke stays on axis line", () => {
    const { container } = renderInChart(
      <XAxis stroke="red" textFill="blue" />,
    );
    const axis = container.querySelector('[data-chartly-axis="x"]')!;
    const line = axis.querySelector("line")!;
    const text = axis.querySelector("text")!;
    expect(line.getAttribute("stroke")).toBe("red");
    expect(text.getAttribute("fill")).toBe("blue");
  });

  it("labelFill overrides only the axis title", () => {
    const { container } = renderInChart(
      <XAxis label="Time" stroke="red" textFill="blue" labelFill="green" />,
    );
    const texts = Array.from(
      container.querySelectorAll<SVGTextElement>(
        '[data-chartly-axis="x"] text',
      ),
    );
    const title = texts.find((t) => t.textContent === "Time")!;
    const tick = texts.find((t) => t.textContent !== "Time")!;
    expect(title.getAttribute("fill")).toBe("green");
    expect(tick.getAttribute("fill")).toBe("blue");
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
