import * as React from "react";

export interface LinearGradientProps {
  id: string;
  from: string;
  to: string;
  fromOpacity?: number;
  toOpacity?: number;
  direction?: "vertical" | "horizontal";
}

export function LinearGradient({
  id,
  from,
  to,
  fromOpacity = 1,
  toOpacity = 0,
  direction = "vertical",
}: LinearGradientProps): React.JSX.Element {
  const x2 = direction === "horizontal" ? 1 : 0;
  const y2 = direction === "horizontal" ? 0 : 1;
  return (
    <defs>
      <linearGradient id={id} x1={0} y1={0} x2={x2} y2={y2}>
        <stop offset="0%" stopColor={from} stopOpacity={fromOpacity} />
        <stop offset="100%" stopColor={to} stopOpacity={toOpacity} />
      </linearGradient>
    </defs>
  );
}
