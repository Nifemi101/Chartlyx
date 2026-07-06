import * as React from "react";
import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { Legend } from "../Legend";

const ITEMS = [
  { label: "Laptops", color: "#3b82f6" },
  { label: "Phones", color: "#10b981" },
  { label: "Tablets", color: "#f59e0b" },
];

describe("Legend", () => {
  it("renders one chip + label per item", () => {
    const { container } = render(<Legend items={ITEMS} />);
    const root = container.querySelector('[data-chartly-legend=""]')!;
    const rows = root.querySelectorAll(":scope > span");
    expect(rows.length).toBe(ITEMS.length);
    const texts = Array.from(rows).map((r) => r.textContent);
    expect(texts).toEqual(ITEMS.map((i) => i.label));
  });

  it("shape='circle' rounds the chip", () => {
    const items = [{ label: "A", color: "red", shape: "circle" as const }];
    const { container } = render(<Legend items={items} />);
    const chip = container.querySelector("span > span")! as HTMLElement;
    expect(chip.style.borderRadius).toBe("999px");
  });

  it("direction='column' applies vertical flex", () => {
    const { container } = render(
      <Legend items={ITEMS} direction="column" />,
    );
    const root = container.querySelector<HTMLElement>(
      '[data-chartly-legend=""]',
    )!;
    expect(root.style.flexDirection).toBe("column");
  });
});
