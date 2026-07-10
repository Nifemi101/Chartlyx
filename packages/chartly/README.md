# chartlyx

Composable React charting library, TypeScript-first, D3-powered.

[![npm version](https://img.shields.io/npm/v/chartlyx.svg?style=flat)](https://www.npmjs.com/package/chartlyx)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/Nifemi101/Chartlyx/blob/main/LICENSE)
[![Types](https://img.shields.io/npm/types/chartlyx.svg?style=flat)](https://www.npmjs.com/package/chartlyx)

Chartlyx is a small set of composable primitives — a `ChartContainer`, a handful of shapes (`Line`, `Area`, `Bar`, `Scatter`, `Pie`, `Radar`…), axes, a tooltip — that you compose into whatever chart you need. It ships full TypeScript types with generic row-shape inference, dual ESM/CJS output, and externalises React so it stays tiny.

**Full docs:** [chartlyx.pxxl.click](https://chartlyx.pxxl.click/)

---

## Install

```bash
npm install chartlyx
# or
pnpm add chartlyx
# or
yarn add chartlyx
```

React 18 or 19 is a peer dependency.

## Quick start

```tsx
import {
  ChartContainer,
  CartesianGrid,
  Line,
  Tooltip,
  XAxis,
  YAxis,
} from "chartlyx";

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
];

export function RevenueChart() {
  return (
    <div style={{ height: 320 }}>
      <ChartContainer
        data={data}
        xKey="month"
        xScaleType="band"
        yKey="revenue"
        yScaleType="linear"
      >
        <CartesianGrid stroke="#334155" dashArray="4 6" />
        <XAxis stroke="#64748b" textFill="#cbd5e1" />
        <YAxis stroke="#64748b" textFill="#cbd5e1" />
        <Line stroke="#5eead4" strokeWidth={2} curve="monotone" />
        <Tooltip<Row>>
          {({ x, y, datum }) => (
            <g transform={`translate(${x + 12}, ${y - 48})`}>
              <rect width={120} height={44} rx={8} fill="#0f172a" stroke="#334155" />
              <text x={12} y={20} fontSize={11} fill="#94a3b8">{datum.month}</text>
              <text x={12} y={36} fontSize={13} fill="#5eead4" fontWeight={600}>
                ${datum.revenue}
              </text>
            </g>
          )}
        </Tooltip>
      </ChartContainer>
    </div>
  );
}
```

The chart fills its parent — `<div style={{ height: 320 }}>` sets the size, `ResizeObserver` handles everything after that.

## What's inside

**Cartesian shapes** — `Line`, `Area`, `Bar`, `Scatter`, `StackedBar`, `StackedArea`, plus composed charts via per-shape `y` accessor overrides.

**Polar shapes** — `Pie` (donut too, via `innerRadius`), `Radar`, `RadarGrid`, `RadarAxes`, with a shared `PolarChartContainer`.

**Axes and grid** — `XAxis`, `YAxis`, `CartesianGrid`, with independent `stroke` / `textFill` / `labelFill` for dark themes.

**Interaction** — `Tooltip` uses `d3-array`'s bisector for O(log n) nearest-point lookup on linear/time scales; `PolarTooltip` for pie/radar hover.

**Styling helpers** — `LinearGradient` wraps SVG `<defs>` gradients; `Legend` renders a standalone SVG legend.

**Utility exports** — `stackSum`, `pickColor`, `DEFAULT_STACK_COLORS`, `DEFAULT_MARGIN`, `VERSION`.

**TypeScript** — Every component is generic over your row type. `KeysOfType<T, V>` constrains key props (`yKey`, `valueKey`, stack `keys`, radar `axes`) to fields of the correct value type at compile time.

## Composability

There is no monolithic `<Chart>` with 40 props. Every visual layer is a sibling component that reads chart context. Adding a second series is another `<Line>`. Swapping a bar chart into an area chart is one JSX change. If you can render JSX, you can compose a chart.

```tsx
<ChartContainer data={sales} xKey="month" xScaleType="band" yKey="revenue" yScaleType="linear">
  <CartesianGrid />
  <XAxis />
  <YAxis />
  <Bar fill="#38bdf8" fillOpacity={0.5} />
  <Line y={(d) => d.runningAvg} stroke="#5eead4" curve="monotone" />
  <Tooltip>{({ datum }) => /* your JSX */}</Tooltip>
</ChartContainer>
```

## Responsive by default

No `width` / `height` props anywhere. Charts fill their parent via `ResizeObserver` and reflow automatically on resize.

## Learn more

- **Guide** – [chartlyx.pxxl.click/guide/](https://chartlyx.pxxl.click/guide/)
- **Examples** – [chartlyx.pxxl.click/examples/](https://chartlyx.pxxl.click/examples/)
- **API reference** – [chartlyx.pxxl.click/api/](https://chartlyx.pxxl.click/api/)
- **GitHub** – [Nifemi101/Chartlyx](https://github.com/Nifemi101/Chartlyx)

## License

[MIT](https://github.com/Nifemi101/Chartlyx/blob/main/LICENSE) © Nifemi
