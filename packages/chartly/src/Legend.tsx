import * as React from "react";

export interface LegendItem {
  label: string;
  color: string;
  shape?: "square" | "circle";
}

export interface LegendProps {
  items: readonly LegendItem[];
  direction?: "row" | "column";
  gap?: number;
  fontSize?: number;
  color?: string;
  chipSize?: number;
}

export function Legend({
  items,
  direction = "row",
  gap = 14,
  fontSize = 11,
  color = "#374151",
  chipSize = 10,
}: LegendProps): React.JSX.Element {
  return (
    <div
      data-chartly-legend=""
      style={{
        display: "flex",
        flexDirection: direction,
        gap,
        fontSize,
        color,
        flexWrap: direction === "row" ? "wrap" : "nowrap",
      }}
    >
      {items.map((item, i) => (
        <span
          key={i}
          style={{ display: "flex", alignItems: "center", gap: 6 }}
        >
          <span
            style={{
              width: chipSize,
              height: chipSize,
              borderRadius: item.shape === "circle" ? 999 : 2,
              background: item.color,
              display: "inline-block",
              flexShrink: 0,
            }}
          />
          {item.label}
        </span>
      ))}
    </div>
  );
}
