# Chartly

A composable, TypeScript-first charting library for React, built on [D3](https://d3js.org/)'s scales and shapes — not a black-box config API.

```bash
npm install chartlyx
```

## Why Chartly

- **Composable primitives.** Build charts out of ordinary React components — `<ChartContainer>`, `<Line>`, `<XAxis>`, `<Tooltip>` — the same way you'd compose any other UI, instead of passing one large config object.
- **Real generic type inference.** Components infer directly against your data shape, so `datum.revenue` autocompletes and type-checks without manual casts.
- **Built on D3, not hidden behind it.** Chartly only pulls in `d3-scale`, `d3-shape`, and `d3-array` — the components are thin, inspectable wrappers around real D3 primitives, not a fully abstracted rendering engine.
- **Polar charts included.** Donut/Pie and Radar charts share the same component conventions as the Cartesian charts, not a bolted-on afterthought.

## Chart types

Line · Area · Bar · Scatter · Stacked Bar · Stacked Area · Pie / Donut · Radar · Composed (any combination of the above in one container)

## Quick start

```tsx
import {
  ChartContainer,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  LinearGradient,
  Tooltip,
} from 'chartlyx';

interface Row {
  month: string;
  revenue: number;
}

const data: Row[] = [
  { month: 'Jan', revenue: 320 },
  { month: 'Feb', revenue: 460 },
  { month: 'Mar', revenue: 380 },
];

export default function RevenueChart() {
  return (
    <div style={{ width: '100%', height: 320 }}>
      <ChartContainer
        data={data}
        xKey="month"
        xScaleType="band"
        yKey="revenue"
        yScaleType="linear"
        margin={{ top: 20, right: 24, bottom: 34, left: 52 }}
      >
        <LinearGradient id="fill" from="#38bdf8" to="#38bdf8" fromOpacity={0.25} toOpacity={0} />
        <CartesianGrid stroke="#e5e7eb" strokeOpacity={0.6} />
        <XAxis />
        <YAxis />
        <Area fill="url(#fill)" curve="monotone" />
        <Line stroke="#38bdf8" strokeWidth={2} curve="monotone" />
        <Tooltip<Row>>
          {({ x, y, datum }) => (
            <g transform={`translate(${x + 12}, ${y - 40})`}>
              <rect width={100} height={40} rx={6} fill="#0f172a" />
              <text x={10} y={16} fontSize={11} fill="#94a3b8">{datum.month}</text>
              <text x={10} y={32} fontSize={13} fill="#38bdf8" fontWeight={600}>{datum.revenue}</text>
            </g>
          )}
        </Tooltip>
      </ChartContainer>
    </div>
  );
}
```

## Polar charts (Pie / Donut / Radar)

```tsx
import { PolarChartContainer, Pie, PolarTooltip } from 'chartlyx';

interface ShareRow {
  category: string;
  revenue: number;
}

<PolarChartContainer data={data} valueKey="revenue" innerRadius={70} padding={20}>
  <Pie<ShareRow> colors={['#5eead4', '#38bdf8', '#a78bfa']} />
  <PolarTooltip<ShareRow>>
    {({ datum, cx, cy }) => (
      <text x={cx} y={cy} textAnchor="middle" fill="#f8fafc">
        {datum.category}
      </text>
    )}
  </PolarTooltip>
</PolarChartContainer>
```

Radar charts use the same `<PolarChartContainer>`, paired with `<RadarGrid>`, `<RadarAxes>`, and one `<Radar rowIndex={n}>` per series — see the docs site for a full example.

## Core components

| Component | Purpose |
|---|---|
| `ChartContainer` | Cartesian root — computes scales from `data`, provides sizing/context to children |
| `PolarChartContainer` | Root for Pie/Donut and Radar charts |
| `Line` / `Area` / `Bar` / `Scatter` | Cartesian shapes |
| `StackedBar` / `StackedArea` | Multi-key stacked shapes (pair with `stackSum()` for the y-domain) |
| `Pie` | Donut/pie slices (set `innerRadius` on the container for a donut) |
| `Radar` / `RadarGrid` / `RadarAxes` | Radar chart primitives |
| `XAxis` / `YAxis` / `CartesianGrid` | Cartesian axes and gridlines |
| `LinearGradient` | SVG gradient defs for fills |
| `Legend` | Series legend |
| `Tooltip` / `PolarTooltip` | Hover interaction, render-prop based |

## TypeScript

Every component is generic over your row type. Pass it explicitly where inference can't reach it on its own (e.g. `<Tooltip<Row>>`, `<Pie<ShareRow>>`):

```tsx
<Tooltip<Row>>{({ datum }) => datum.revenue /* typed as number */}</Tooltip>
```

## Documentation

Full docs, live playground, and per-chart-type examples: [link to your docs site]

## Development

This package lives in a monorepo alongside its docs site.

```bash
git clone <repo-url>
cd chartly
npm install

# build the library in watch mode
cd packages/chartly && npm run dev

# run the docs site
cd packages/docs && npm run dev
```

## License

MIT
