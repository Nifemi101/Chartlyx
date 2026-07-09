import React from "react";
import {
  ChartContainer,
  CartesianGrid,
  Line,
  Tooltip,
  XAxis,
  YAxis,
} from "chartly";

interface Row {
  month: string;
  revenue: number;
}

const data: Row[] = [
  { month: "Jan", revenue: 320 },
  { month: "Feb", revenue: 460 },
  { month: "Mar", revenue: 380 },
  { month: "Apr", revenue: 620 },
  { month: "May", revenue: 540 },
  { month: "Jun", revenue: 880 },
  { month: "Jul", revenue: 760 },
  { month: "Aug", revenue: 940 },
];

export default function SimpleLineChart(): React.JSX.Element {
  return (
    <ChartContainer
      data={data}
      xKey="month"
      xScaleType="band"
      yKey="revenue"
      yScaleType="linear"
      margin={{ top: 20, right: 24, bottom: 34, left: 52 }}
    >
      <CartesianGrid stroke="#334155" strokeOpacity={0.75} dashArray="4 6" />
      <XAxis stroke="#64748b" textFill="#cbd5e1" />
      <YAxis stroke="#64748b" textFill="#cbd5e1" />
      <Line stroke="#5eead4" strokeWidth={2} curve="monotone" />
      <Tooltip<Row> indicatorStroke="#5eead4" dotFill="#5eead4">
        {({ x, y, datum }) => (
          <g transform={`translate(${x + 12}, ${y - 48})`}>
            <rect
              width={120}
              height={44}
              rx={8}
              fill="#0f172a"
              stroke="#334155"
            />
            <text x={12} y={20} fontSize={11} fill="#94a3b8">
              {datum.month}
            </text>
            <text x={12} y={36} fontSize={13} fill="#5eead4" fontWeight={600}>
              ${datum.revenue}
            </text>
          </g>
        )}
      </Tooltip>
    </ChartContainer>
  );
}
