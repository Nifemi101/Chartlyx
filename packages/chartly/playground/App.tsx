import * as React from "react";
import {
  Area,
  Bar,
  ChartContainer,
  Legend,
  Line,
  LinearGradient,
  Pie,
  PolarChartContainer,
  PolarTooltip,
  Radar,
  RadarAxes,
  RadarGrid,
  Scatter,
  StackedBar,
  Tooltip,
  XAxis,
  YAxis,
  stackSum,
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

interface QuarterSales {
  month: string;
  laptops: number;
  phones: number;
  tablets: number;
}

const quarter: QuarterSales[] = [
  { month: "Jan", laptops: 120, phones: 80, tablets: 45 },
  { month: "Feb", laptops: 140, phones: 90, tablets: 60 },
  { month: "Mar", laptops: 110, phones: 100, tablets: 55 },
  { month: "Apr", laptops: 160, phones: 110, tablets: 70 },
  { month: "May", laptops: 180, phones: 130, tablets: 80 },
  { month: "Jun", laptops: 155, phones: 120, tablets: 75 },
];

const STACK_COLORS = ["#3b82f6", "#10b981", "#f59e0b"] as const;
const STACK_KEYS = ["laptops", "phones", "tablets"] as const;

interface ProductMix {
  name: string;
  revenue: number;
}

const productMix: ProductMix[] = [
  { name: "Laptops", revenue: 4200 },
  { name: "Phones", revenue: 3100 },
  { name: "Tablets", revenue: 1700 },
  { name: "Watches", revenue: 900 },
  { name: "Accessories", revenue: 1100 },
];

const PIE_COLORS = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
] as const;

const PIE_TOTAL = productMix.reduce((s, r) => s + r.revenue, 0);

interface Stats {
  name: string;
  speed: number;
  power: number;
  defense: number;
  magic: number;
  agility: number;
}

const players: Stats[] = [
  {
    name: "Alice",
    speed: 75,
    power: 60,
    defense: 80,
    magic: 90,
    agility: 70,
  },
  {
    name: "Bob",
    speed: 85,
    power: 90,
    defense: 55,
    magic: 40,
    agility: 75,
  },
];

const RADAR_AXES = ["speed", "power", "defense", "magic", "agility"] as const;
const RADAR_COLORS = ["#3b82f6", "#10b981"] as const;
const RADAR_MAX = 100;

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
          <XAxis stroke="#e5e7eb" textFill="#374151" />
          <YAxis stroke="#e5e7eb" textFill="#374151" />
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

    <div style={CARD_STYLE}>
      <header style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 12, color: "#6b7280" }}>
          Sales by category
        </div>
        <div style={{ fontSize: 20, fontWeight: 600, color: "#111827" }}>
          Stacked bar chart
        </div>
        <div style={{ marginTop: 10 }}>
          <Legend
            items={STACK_KEYS.map((k, i) => ({
              label: k,
              color: STACK_COLORS[i]!,
            }))}
            gap={16}
          />
        </div>
      </header>
      <div style={{ height: 300 }}>
        <ChartContainer
          data={quarter}
          xKey="month"
          xScaleType="band"
          yKey="laptops"
          yScaleType="linear"
          yDomain={[0, stackSum(quarter, STACK_KEYS)]}
          margin={{ top: 20, right: 20, bottom: 34, left: 50 }}
        >
          <XAxis stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" tickFormatter={(v) => `$${v}`} />
          <StackedBar<QuarterSales>
            keys={STACK_KEYS}
            colors={STACK_COLORS}
            radius={4}
          />
          <Tooltip<QuarterSales>
            indicatorStroke="#9ca3af"
            indicatorOpacity={0.25}
            dotFill={STACK_COLORS[0]}
          >
            {({ x, y, datum }) => {
              const cardH = 78;
              const gap = 10;
              const above = y > cardH + gap;
              const dy = above ? -cardH - gap : gap;
              const total =
                datum.laptops + datum.phones + datum.tablets;
              return (
                <g transform={`translate(${x - 75}, ${y + dy})`}>
                  <rect
                    width={150}
                    height={cardH}
                    rx={6}
                    fill="white"
                    stroke="#e5e7eb"
                  />
                  <text x={10} y={16} fontSize={11} fill="#6b7280">
                    {datum.month} · ${total}
                  </text>
                  {STACK_KEYS.map((k, i) => (
                    <g
                      key={k}
                      transform={`translate(10, ${30 + i * 14})`}
                    >
                      <rect
                        width={8}
                        height={8}
                        rx={1}
                        y={-7}
                        fill={STACK_COLORS[i]}
                      />
                      <text x={14} fontSize={11} fill="#111827">
                        {k}: ${datum[k]}
                      </text>
                    </g>
                  ))}
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
          Revenue share by product
        </div>
        <div style={{ fontSize: 20, fontWeight: 600, color: "#111827" }}>
          Donut chart · ${PIE_TOTAL.toLocaleString()} total
        </div>
        <div style={{ marginTop: 10 }}>
          <Legend
            items={productMix.map((row, i) => ({
              label: row.name,
              color: PIE_COLORS[i]!,
              shape: "circle",
            }))}
          />
        </div>
      </header>
      <div style={{ height: 320 }}>
        <PolarChartContainer<ProductMix>
          data={productMix}
          valueKey="revenue"
          innerRadius={70}
          padding={16}
        >
          <Pie<ProductMix>
            colors={PIE_COLORS}
            label={({ centroid, datum }) => {
              const pct = Math.round((datum.revenue / PIE_TOTAL) * 100);
              if (pct < 8) return null; // hide labels on thin slices
              return (
                <text
                  x={centroid[0]}
                  y={centroid[1]}
                  textAnchor="middle"
                  dy="0.32em"
                  fontSize={11}
                  fontWeight={600}
                  fill="white"
                >
                  {pct}%
                </text>
              );
            }}
          />
          <PolarTooltip<ProductMix>>
            {({ datum, cx, cy }) => {
              const pct = ((datum.revenue / PIE_TOTAL) * 100).toFixed(1);
              const cardW = 140;
              const cardH = 54;
              return (
                <g pointerEvents="none">
                  <foreignObject
                    x={cx - cardW / 2}
                    y={cy - cardH / 2}
                    width={cardW}
                    height={cardH}
                  >
                    <div
                      style={{
                        width: cardW,
                        height: cardH,
                        borderRadius: 6,
                        border: "1px solid #e5e7eb",
                        background: "white",
                        padding: "6px 10px",
                        boxSizing: "border-box",
                        fontFamily: "system-ui, sans-serif",
                      }}
                    >
                      <div style={{ fontSize: 11, color: "#6b7280" }}>
                        {datum.name}
                      </div>
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: "#111827",
                        }}
                      >
                        ${datum.revenue.toLocaleString()}
                      </div>
                      <div style={{ fontSize: 10, color: "#6b7280" }}>
                        {pct}% of total
                      </div>
                    </div>
                  </foreignObject>
                </g>
              );
            }}
          </PolarTooltip>
        </PolarChartContainer>
      </div>
    </div>

    <div style={CARD_STYLE}>
      <header style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 12, color: "#6b7280" }}>
          Player skill comparison
        </div>
        <div style={{ fontSize: 20, fontWeight: 600, color: "#111827" }}>
          Radar chart
        </div>
        <div style={{ marginTop: 10 }}>
          <Legend
            items={players.map((p, i) => ({
              label: p.name,
              color: RADAR_COLORS[i]!,
              shape: "circle",
            }))}
          />
        </div>
      </header>
      <div style={{ height: 380 }}>
        <PolarChartContainer<Stats> data={players} padding={48}>
          <RadarGrid axesCount={RADAR_AXES.length} rings={4} />
          <RadarAxes axes={RADAR_AXES as unknown as string[]} />
          {players.map((_, i) => (
            <Radar<Stats>
              key={i}
              axes={[...RADAR_AXES]}
              maxValue={RADAR_MAX}
              rowIndex={i}
              fill={RADAR_COLORS[i]}
              fillOpacity={0.25}
              strokeWidth={2}
            />
          ))}
          <PolarTooltip<Stats>>
            {({ datum, cx, cy }) => {
              const cardW = 170;
              const cardH = 116;
              return (
                <g pointerEvents="none">
                  <foreignObject
                    x={cx - cardW / 2}
                    y={cy - cardH / 2}
                    width={cardW}
                    height={cardH}
                  >
                    <div
                      style={{
                        width: cardW,
                        height: cardH,
                        borderRadius: 6,
                        border: "1px solid #e5e7eb",
                        background: "white",
                        padding: "8px 12px",
                        boxSizing: "border-box",
                        fontFamily: "system-ui, sans-serif",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: "#111827",
                          marginBottom: 4,
                        }}
                      >
                        {datum.name}
                      </div>
                      {RADAR_AXES.map((axis) => (
                        <div
                          key={axis}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontSize: 11,
                            color: "#6b7280",
                            lineHeight: "16px",
                          }}
                        >
                          <span>{axis}</span>
                          <span style={{ color: "#111827", fontWeight: 500 }}>
                            {datum[axis]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </foreignObject>
                </g>
              );
            }}
          </PolarTooltip>
        </PolarChartContainer>
      </div>
    </div>
    </div>
  );
}
