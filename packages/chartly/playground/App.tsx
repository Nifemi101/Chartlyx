import * as React from "react";
import {
  Area,
  Bar,
  ChartContainer,
  Line,
  LinearGradient,
  Scatter,
  Tooltip,
  XAxis,
  YAxis,
} from "../src";

interface Row {
  month: Date;
  revenue: number;
}

const data: Row[] = [
  { month: new Date("2024-01-01"), revenue: 120 },
  { month: new Date("2024-02-01"), revenue: 180 },
  { month: new Date("2024-03-01"), revenue: 150 },
  { month: new Date("2024-04-01"), revenue: 220 },
  { month: new Date("2024-05-01"), revenue: 270 },
  { month: new Date("2024-06-01"), revenue: 200 },
  { month: new Date("2024-07-01"), revenue: 250 },
  { month: new Date("2024-08-01"), revenue: 290 },
  { month: new Date("2024-09-01"), revenue: 150 },
  { month: new Date("2024-010-01"), revenue: 300 },
  { month: new Date("2024-011-01"), revenue: 240 },
  { month: new Date("2024-012-01"), revenue: 280 },
];

interface Product {
  name: string;
  sales: number;
}

const products: Product[] = [
  { name: "Widgets", sales: 42 },
  { name: "Gadgets", sales: 65 },
  { name: "Gizmos", sales: 28 },
  { name: "Doohickeys", sales: 51 },
  { name: "Watches", sales: 11 },
  { name: "Phones", sales: 55 },
  { name: "Balls", sales: 20 },
  { name: "Coffee", sales: 61 },
  { name: "Machines", sales: 57 },
];

interface Person {
  age: number;
  income: number;
}

interface Sale {
  month: string;
  revenue: number;
  runningAvg: number;
}

const sales: Sale[] = [
  { month: "Jan", revenue: 120, runningAvg: 120 },
  { month: "Feb", revenue: 180, runningAvg: 150 },
  { month: "Mar", revenue: 150, runningAvg: 150 },
  { month: "Apr", revenue: 220, runningAvg: 168 },
  { month: "May", revenue: 270, runningAvg: 188 },
  { month: "Jun", revenue: 240, runningAvg: 197 },
  { month: "Jul", revenue: 260, runningAvg: 200 },
  { month: "Aug", revenue: 280, runningAvg: 209 },
  { month: "Sep", revenue: 210, runningAvg: 150 },
  { month: "Oct", revenue: 180, runningAvg: 130 },
  { month: "Nov", revenue: 109, runningAvg: 120 },
  { month: "Dec", revenue: 200, runningAvg: 205 },
];

const people: Person[] = [
  { age: 22, income: 34 },
  { age: 25, income: 42 },
  { age: 27, income: 38 },
  { age: 30, income: 48 },
  { age: 32, income: 55 },
  { age: 34, income: 51 },
  { age: 36, income: 62 },
  { age: 39, income: 58 },
  { age: 41, income: 71 },
  { age: 43, income: 68 },
  { age: 46, income: 79 },
  { age: 48, income: 74 },
  { age: 51, income: 88 },
  { age: 54, income: 82 },
  { age: 57, income: 95 },
  { age: 60, income: 60 },
  { age: 64, income: 55 },
  { age: 68, income: 70 },
  { age: 70, income: 46 },
  { age: 72, income: 80 },
  { age: 75, income: 89 },
  { age: 77, income: 57 },
  { age: 80, income: 86 },
  { age: 85, income: 35 },
  { age: 90, income: 31 },
  { age: 93, income: 29 },
  { age: 95, income: 30 },
];

const monthFmt = new Intl.DateTimeFormat("en", { month: "short" });

const ACCENT = "#3b82f6";

const CARD_STYLE: React.CSSProperties = {
  maxWidth: 720,
  border: "1px solid #e5e7eb",
  borderRadius: 12,
  padding: 20,
  fontFamily: "system-ui, sans-serif",
};

export function App(): React.JSX.Element {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
    <div style={CARD_STYLE}>
      <header style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 12, color: "#6b7280" }}>Revenue</div>
        <div style={{ fontSize: 20, fontWeight: 600, color: "#111827" }}>
          $940 total · 5 months
        </div>
      </header>
      <div style={{ height: 300 }}>
        <ChartContainer
          data={data}
          xKey="month"
          xScaleType="time"
          yKey="revenue"
          yScaleType="linear"
          margin={{ top: 20, right: 20, bottom: 34, left: 50 }}
        >
          <LinearGradient
            id="revenueFill"
            from={ACCENT}
            to={ACCENT}
            fromOpacity={0.25}
            toOpacity={0}
          />
          <XAxis
            stroke="#9ca3af"
            tickFormatter={(v) => monthFmt.format(v as Date)}
          />
          <YAxis
            stroke="#9ca3af"
            tickFormatter={(v) => `$${v}`}
          />
          <Area fill="url(#revenueFill)" curve="monotone" />
          <Line stroke={ACCENT} strokeWidth={2} curve="monotone" />
          <Tooltip<Row> indicatorStroke="#9ca3af" dotFill={ACCENT}>
            {({ x, y, datum }) => {
              const cardH = 46;
              const gap = 8;
              const above = y > cardH + gap;
              const dy = above ? -cardH - gap : gap;
              return (
                <g transform={`translate(${x + 12}, ${y + dy})`}>
                  <rect
                    width={130}
                    height={cardH}
                    rx={6}
                    fill="white"
                    stroke="#e5e7eb"
                  />
                  <text x={10} y={20} fontSize={11} fill="#6b7280">
                    {monthFmt.format(datum.month)}
                  </text>
                  <text
                    x={10}
                    y={36}
                    fontSize={13}
                    fontWeight={600}
                    fill="#111827"
                  >
                    ${datum.revenue}
                  </text>
                </g>
              );
            }}
          </Tooltip>
        </ChartContainer>
      </div>
    </div>

    <div style={CARD_STYLE}>
      <header style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 12, color: "#6b7280" }}>Sales by product</div>
        <div style={{ fontSize: 20, fontWeight: 600, color: "#111827" }}>
          186 units · 4 products
        </div>
      </header>
      <div style={{ height: 280 }}>
        <ChartContainer
          data={products}
          xKey="name"
          xScaleType="band"
          yKey="sales"
          yScaleType="linear"
          margin={{ top: 20, right: 20, bottom: 34, left: 50 }}
        >
          <XAxis stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <Bar fill={ACCENT} radius={4} />
          <Tooltip<Product>
            indicatorStroke="#9ca3af"
            indicatorOpacity={0.25}
            dotFill={ACCENT}
          >
            {({ x, y, datum }) => {
              const cardH = 40;
              const gap = 10;
              const above = y > cardH + gap;
              const dy = above ? -cardH - gap : gap;
              return (
                <g transform={`translate(${x - 65}, ${y + dy})`}>
                  <rect
                    width={130}
                    height={cardH}
                    rx={6}
                    fill="white"
                    stroke="#e5e7eb"
                  />
                  <text x={10} y={18} fontSize={11} fill="#6b7280">
                    {datum.name}
                  </text>
                  <text
                    x={10}
                    y={32}
                    fontSize={13}
                    fontWeight={600}
                    fill="#111827"
                  >
                    {datum.sales} units
                  </text>
                </g>
              );
            }}
          </Tooltip>
        </ChartContainer>
      </div>
    </div>

    <div style={CARD_STYLE}>
      <header style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 12, color: "#6b7280" }}>Age vs Income</div>
        <div style={{ fontSize: 20, fontWeight: 600, color: "#111827" }}>
          {people.length} people surveyed
        </div>
      </header>
      <div style={{ height: 300 }}>
        <ChartContainer
          data={people}
          xKey="age"
          xScaleType="linear"
          yKey="income"
          yScaleType="linear"
          margin={{ top: 20, right: 20, bottom: 34, left: 50 }}
        >
          <XAxis stroke="#9ca3af" tickFormatter={(v) => `${v}y`} />
          <YAxis stroke="#9ca3af" tickFormatter={(v) => `$${v}k`} />
          <Scatter fill={ACCENT} fillOpacity={0.7} radius={5} />
          <Tooltip<Person> indicatorStroke="#9ca3af" dotFill={ACCENT}>
            {({ x, y, datum }) => {
              const cardH = 40;
              const gap = 10;
              const above = y > cardH + gap;
              const dy = above ? -cardH - gap : gap;
              return (
                <g transform={`translate(${x - 65}, ${y + dy})`}>
                  <rect
                    width={130}
                    height={cardH}
                    rx={6}
                    fill="white"
                    stroke="#e5e7eb"
                  />
                  <text x={10} y={18} fontSize={11} fill="#6b7280">
                    Age {datum.age}
                  </text>
                  <text
                    x={10}
                    y={32}
                    fontSize={13}
                    fontWeight={600}
                    fill="#111827"
                  >
                    ${datum.income}k / year
                  </text>
                </g>
              );
            }}
          </Tooltip>
        </ChartContainer>
      </div>
    </div>

    <div style={CARD_STYLE}>
      <header style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 12, color: "#6b7280" }}>
          Revenue + 3-month running average
        </div>
        <div style={{ fontSize: 20, fontWeight: 600, color: "#111827" }}>
          Composed chart
        </div>
      </header>
      <div style={{ height: 300 }}>
        <ChartContainer
          data={sales}
          xKey="month"
          xScaleType="band"
          yKey="revenue"
          yScaleType="linear"
          margin={{ top: 20, right: 20, bottom: 34, left: 50 }}
        >
          <XAxis stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" tickFormatter={(v) => `$${v}`} />
          <Bar<Sale> fill={ACCENT} fillOpacity={0.5} radius={4} />
          <Line<Sale>
            stroke={ACCENT}
            strokeWidth={2}
            curve="monotone"
            y={(d) => d.runningAvg}
          />
          <Tooltip<Sale> indicatorStroke="#9ca3af" dotFill={ACCENT}>
            {({ x, y, datum }) => {
              const cardH = 56;
              const gap = 10;
              const above = y > cardH + gap;
              const dy = above ? -cardH - gap : gap;
              return (
                <g transform={`translate(${x - 70}, ${y + dy})`}>
                  <rect
                    width={140}
                    height={cardH}
                    rx={6}
                    fill="white"
                    stroke="#e5e7eb"
                  />
                  <text x={10} y={18} fontSize={11} fill="#6b7280">
                    {datum.month}
                  </text>
                  <text
                    x={10}
                    y={34}
                    fontSize={12}
                    fontWeight={600}
                    fill="#111827"
                  >
                    Revenue: ${datum.revenue}
                  </text>
                  <text x={10} y={50} fontSize={11} fill="#6b7280">
                    Avg: ${datum.runningAvg}
                  </text>
                </g>
              );
            }}
          </Tooltip>
        </ChartContainer>
      </div>
    </div>
    </div>
  );
}
