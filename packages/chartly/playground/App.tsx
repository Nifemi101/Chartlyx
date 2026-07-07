import * as React from "react";
import {
  Area,
  Bar,
  CartesianGrid,
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
  { month: new Date("2024-10-01"), revenue: 300 },
  { month: new Date("2024-11-01"), revenue: 240 },
  { month: new Date("2024-12-01"), revenue: 280 },
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
  const [animatedData, setAnimatedData] = React.useState<Row[]>(data);
  const [productData, setProductData] = React.useState<Product[]>(products);
  const [peopleData, setPeopleData] = React.useState<Person[]>(people);
  const [salesData, setSalesData] = React.useState<Sale[]>(sales);
  const [quarterData, setQuarterData] = React.useState<QuarterSales[]>(quarter);
  const [productMixData, setProductMixData] = React.useState<ProductMix[]>(productMix);
  const [playerData, setPlayerData] = React.useState<Stats[]>(players);

  const totalRevenue = animatedData.reduce((sum, row) => sum + row.revenue, 0);
  const monthCount = animatedData.length;
  const totalProductUnits = productData.reduce((sum, row) => sum + row.sales, 0);
  const totalSalesRevenue = salesData.reduce((sum, row) => sum + row.revenue, 0);
  const pieTotal = productMixData.reduce((sum, row) => sum + row.revenue, 0);

  const clamp = (value: number, min: number, max: number) =>
    Math.min(max, Math.max(min, value));

  const randomizeRevenue = () => {
    setAnimatedData((prev) =>
      prev.map((row) => ({
        ...row,
        revenue: Math.max(
          80,
          Math.round(row.revenue * (0.85 + Math.random() * 0.3)),
        ),
      })),
    );
  };

  const randomizeProducts = () => {
    setProductData((prev) =>
      prev.map((row) => ({
        ...row,
        sales: Math.max(
          8,
          Math.round(row.sales * (0.7 + Math.random() * 0.6)),
        ),
      })),
    );
  };

  const randomizePeople = () => {
    setPeopleData((prev) =>
      prev.map((row) => ({
        ...row,
        income: Math.max(
          20,
          Math.round(row.income * (0.8 + Math.random() * 0.4)),
        ),
      })),
    );
  };

  const randomizeSales = () => {
    setSalesData((prev) => {
      const next = prev.map((row) => ({
        ...row,
        revenue: Math.max(
          90,
          Math.round(row.revenue * (0.75 + Math.random() * 0.5)),
        ),
      }));
      return next.map((row, index, arr) => {
        const window = arr.slice(Math.max(0, index - 2), index + 1);
        const runningAvg = Math.round(
          window.reduce((sum, item) => sum + item.revenue, 0) / window.length,
        );
        return { ...row, runningAvg };
      });
    });
  };

  const randomizeQuarter = () => {
    setQuarterData((prev) =>
      prev.map((row) => ({
        ...row,
        laptops: Math.max(
          40,
          Math.round(row.laptops * (0.7 + Math.random() * 0.5)),
        ),
        phones: Math.max(
          30,
          Math.round(row.phones * (0.7 + Math.random() * 0.5)),
        ),
        tablets: Math.max(
          18,
          Math.round(row.tablets * (0.7 + Math.random() * 0.5)),
        ),
      })),
    );
  };

  const randomizeProductMix = () => {
    setProductMixData((prev) =>
      prev.map((row) => ({
        ...row,
        revenue: Math.max(
          500,
          Math.round(row.revenue * (0.7 + Math.random() * 0.6)),
        ),
      })),
    );
  };

  const randomizePlayers = () => {
    setPlayerData((prev) =>
      prev.map((row) => ({
        ...row,
        speed: clamp(Math.round(row.speed * (0.8 + Math.random() * 0.4)), 0, 100),
        power: clamp(Math.round(row.power * (0.8 + Math.random() * 0.4)), 0, 100),
        defense: clamp(Math.round(row.defense * (0.8 + Math.random() * 0.4)), 0, 100),
        magic: clamp(Math.round(row.magic * (0.8 + Math.random() * 0.4)), 0, 100),
        agility: clamp(Math.round(row.agility * (0.8 + Math.random() * 0.4)), 0, 100),
      })),
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
    <div style={CARD_STYLE}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 12,
          marginBottom: 12,
        }}
      >
        <div>
          <div style={{ fontSize: 12, color: "#6b7280" }}>Revenue</div>
          <div style={{ fontSize: 20, fontWeight: 600, color: "#111827" }}>
            ${totalRevenue.toLocaleString()} total · {monthCount} months
          </div>
        </div>
        <button
          type="button"
          onClick={randomizeRevenue}
          style={{
            border: "1px solid #d1d5db",
            background: "white",
            color: "#111827",
            borderRadius: 8,
            padding: "10px 14px",
            cursor: "pointer",
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          Randomize
        </button>
      </div>
      <div style={{ height: 300 }}>
        <ChartContainer
          data={animatedData}
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
          <CartesianGrid
            stroke="#e5e7eb"
            strokeOpacity={0.6}
            xTickCount={6}
            yTickCount={5}
          />
          <XAxis
            stroke="#9ca3af"
            tickFormatter={(v) => monthFmt.format(v as Date)}
          />
          <YAxis
            stroke="#9ca3af"
            tickFormatter={(v) => `$${v}`}
          />
          <Area animate fill="url(#revenueFill)" curve="monotone" />
          <Line
            animate
            stroke={ACCENT}
            strokeWidth={2}
            curve="monotone"
          />
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 12,
          marginBottom: 12,
        }}
      >
        <div>
          <div style={{ fontSize: 12, color: "#6b7280" }}>Sales by product</div>
          <div style={{ fontSize: 20, fontWeight: 600, color: "#111827" }}>
            {totalProductUnits} units · {productData.length} products
          </div>
        </div>
        <button
          type="button"
          onClick={randomizeProducts}
          style={{
            border: "1px solid #d1d5db",
            background: "white",
            color: "#111827",
            borderRadius: 8,
            padding: "10px 14px",
            cursor: "pointer",
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          Randomize
        </button>
      </div>
      <div style={{ height: 280 }}>
        <ChartContainer
          data={productData}
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 12,
          marginBottom: 12,
        }}
      >
        <div>
          <div style={{ fontSize: 12, color: "#6b7280" }}>Age vs Income</div>
          <div style={{ fontSize: 20, fontWeight: 600, color: "#111827" }}>
            {peopleData.length} people surveyed
          </div>
        </div>
        <button
          type="button"
          onClick={randomizePeople}
          style={{
            border: "1px solid #d1d5db",
            background: "white",
            color: "#111827",
            borderRadius: 8,
            padding: "10px 14px",
            cursor: "pointer",
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          Randomize
        </button>
      </div>
      <div style={{ height: 300 }}>
        <ChartContainer
          data={peopleData}
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 12,
          marginBottom: 12,
        }}
      >
        <div>
          <div style={{ fontSize: 12, color: "#6b7280" }}>
            Revenue + 3-month running average
          </div>
          <div style={{ fontSize: 20, fontWeight: 600, color: "#111827" }}>
            Composed chart · ${totalSalesRevenue}
          </div>
        </div>
        <button
          type="button"
          onClick={randomizeSales}
          style={{
            border: "1px solid #d1d5db",
            background: "white",
            color: "#111827",
            borderRadius: 8,
            padding: "10px 14px",
            cursor: "pointer",
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          Randomize
        </button>
      </div>
      <div style={{ height: 300 }}>
        <ChartContainer
          data={salesData}
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 12,
          marginBottom: 12,
        }}
      >
        <div>
          <div style={{ fontSize: 12, color: "#6b7280" }}>
            Sales by category
          </div>
          <div style={{ fontSize: 20, fontWeight: 600, color: "#111827" }}>
            Stacked bar chart · ${stackSum(quarterData, STACK_KEYS)} total
          </div>
        </div>
        <button
          type="button"
          onClick={randomizeQuarter}
          style={{
            border: "1px solid #d1d5db",
            background: "white",
            color: "#111827",
            borderRadius: 8,
            padding: "10px 14px",
            cursor: "pointer",
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          Randomize
        </button>
      </div>
      <div style={{ height: 300 }}>
        <ChartContainer
          data={quarterData}
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 12,
          marginBottom: 12,
        }}
      >
        <div>
          <div style={{ fontSize: 12, color: "#6b7280" }}>
            Revenue share by product
          </div>
          <div style={{ fontSize: 20, fontWeight: 600, color: "#111827" }}>
            Donut chart · ${pieTotal.toLocaleString()} total
          </div>
        </div>
        <button
          type="button"
          onClick={randomizeProductMix}
          style={{
            border: "1px solid #d1d5db",
            background: "white",
            color: "#111827",
            borderRadius: 8,
            padding: "10px 14px",
            cursor: "pointer",
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          Randomize
        </button>
      </div>
      <div style={{ height: 320 }}>
        <PolarChartContainer<ProductMix>
          data={productMixData}
          valueKey="revenue"
          innerRadius={70}
          padding={16}
        >
          <Pie<ProductMix>
            colors={PIE_COLORS}
            label={({ centroid, datum }) => {
              const pct = Math.round((datum.revenue / pieTotal) * 100);
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
              const pct = ((datum.revenue / pieTotal) * 100).toFixed(1);
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 12,
          marginBottom: 12,
        }}
      >
        <div>
          <div style={{ fontSize: 12, color: "#6b7280" }}>
            Player skill comparison
          </div>
          <div style={{ fontSize: 20, fontWeight: 600, color: "#111827" }}>
            Radar chart · {playerData.length} players
          </div>
        </div>
        <button
          type="button"
          onClick={randomizePlayers}
          style={{
            border: "1px solid #d1d5db",
            background: "white",
            color: "#111827",
            borderRadius: 8,
            padding: "10px 14px",
            cursor: "pointer",
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          Randomize
        </button>
      </div>
      <div style={{ height: 380 }}>
        <PolarChartContainer<Stats> data={playerData} padding={48}>
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
