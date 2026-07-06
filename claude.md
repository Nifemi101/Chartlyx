# Chartly — Project Instructions

## What we're building
Chartly: a TypeScript-first, D3-powered React charting library — a focused,
well-typed alternative to Recharts. Also a portfolio centerpiece.

## Stack
- TypeScript (strict, generics-heavy for typed data props)
- React 18+ and 19+ (peerDependency range: "^18.0.0 || ^19.0.0")
- D3 modules only: d3-scale, d3-shape, d3-array (NOT full d3)
- SVG rendering
- tsup bundler (CJS + ESM + .d.ts output)
- Monorepo: npm workspaces (packages/chartly, packages/docs)

## Working style
- Plan before coding — confirm approach before writing files
- Minimal, targeted edits — avoid full rewrites of existing files
- Explain the "why" behind D3/React patterns, not just output code
- State current phase and what's broken/next at the start of each session

## Locked architecture decisions
- 9 chart types: Line, Bar, Area, Scatter, Composed, Stacked Bar,
  Stacked Area, Pie, Radar
- Separate containers per chart family: `ChartContainer` (Cartesian)
  vs `PolarChartContainer` (Pie/Radar) — NO union-typed scale context
- Context + hooks for prop sharing — NO cloneElement
- Responsive sizing via ResizeObserver — NO fixed width/height props
- `margin` prop baked into Phase 2 scale math (range = [margin.left,
  width - margin.right], not [0, width])
- Axis customization: `tickFormatter`, static `label` (axis title)
- Shape customization: typed per-shape render-prop `label` pattern,
  exposing computed {x, y} pixel geometry to consumers

## Build order (9 phases, one per session)
1. Scaffolding — repo, tsconfig, tsup config, deps, hello-world builds
2. ChartContainer + scale system (useChartScales), margin baked in — no visuals yet
3. LineChart end-to-end: Line, XAxis, YAxis, tickFormatter, axis label,
   render-prop label — validates the full architecture
4. Interaction: Tooltip, hover/nearest-point via d3-array bisector
5. BarChart, AreaChart, Scatter, Composed, Stacked Bar, Stacked Area
6. Polar architecture: shared ResizeObserver hook, PolarChartContainer, Pie
7. Radar (reuses Phase 6's polar container)
8. Animation + polish: transitions, legend, grid lines
9. Docs site: Next.js/Astro + MDX + Sandpack live examples