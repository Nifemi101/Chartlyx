import React from "react";
import {
  Area,
  CartesianGrid,
  ChartContainer,
  Line,
  LinearGradient,
  Tooltip,
  XAxis,
  YAxis,
} from "chartly";

interface Row {
  month: string;
  revenue: number;
}

const data: Row[] = [
  { month: "Jan", revenue: 4200 },
  { month: "Feb", revenue: 3800 },
  { month: "Mar", revenue: 5100 },
  { month: "Apr", revenue: 4600 },
  { month: "May", revenue: 6300 },
  { month: "Jun", revenue: 5800 },
  { month: "Jul", revenue: 7200 },
  { month: "Aug", revenue: 8100 },
];

export default function GradientAreaChart(): React.JSX.Element {
  return (
    <ChartContainer
      data={data}
      xKey="month"
      xScaleType="band"
      yKey="revenue"
      yScaleType="linear"
      margin={{ top: 20, right: 24, bottom: 34, left: 60 }}
    >
      <LinearGradient
        id="areaFadeExample"
        from="#5eead4"
        to="#5eead4"
        fromOpacity={0.35}
        toOpacity={0}
      />
      <CartesianGrid stroke="#334155" strokeOpacity={0.75} dashArray="4 6" />
      <XAxis stroke="#64748b" textFill="#cbd5e1" />
      <YAxis
        stroke="#64748b"
        textFill="#cbd5e1"
        tickFormatter={(v) => `$${(Number(v) / 1000).toFixed(1)}k`}
      />
      <Area fill="url(#areaFadeExample)" curve="monotone" />
      <Line stroke="#5eead4" strokeWidth={2} curve="monotone" />
      <Tooltip<Row> indicatorStroke="#5eead4" dotFill="#5eead4">
        {({ x, y, datum }) => (
          <g transform={`translate(${x + 12}, ${y - 48})`}>
            <rect
              width={140}
              height={44}
              rx={8}
              fill="#0f172a"
              stroke="#334155"
            />
            <text x={12} y={20} fontSize={11} fill="#94a3b8">
              {datum.month}
            </text>
            <text x={12} y={36} fontSize={13} fill="#5eead4" fontWeight={600}>
              ${datum.revenue.toLocaleString()}
            </text>
          </g>
        )}
      </Tooltip>
    </ChartContainer>
  );
}
