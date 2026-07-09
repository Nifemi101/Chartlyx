export interface ExampleLink {
  label: string;
  href: string;
}

export interface ExampleCategory {
  key: string;
  heading: string;
  basePath: string;
  firstExampleHref: string;
  tagline: string;
  examples: ExampleLink[];
}

export const exampleCategories: ExampleCategory[] = [
  {
    key: 'line',
    heading: 'LineChart',
    basePath: '/examples/line',
    firstExampleHref: '/examples/line/simple/',
    tagline: 'Time series and continuous trends.',
    examples: [
      { label: 'Simple Line Chart', href: '/examples/line/simple/' },
    ],
  },
  {
    key: 'area',
    heading: 'AreaChart',
    basePath: '/examples/area',
    firstExampleHref: '/examples/area/gradient/',
    tagline: 'Filled trends with gradient fades.',
    examples: [
      { label: 'Gradient Area Chart', href: '/examples/area/gradient/' },
    ],
  },
  {
    key: 'bar',
    heading: 'BarChart',
    basePath: '/examples/bar',
    firstExampleHref: '/examples/bar/simple/',
    tagline: 'Categorical comparisons.',
    examples: [
      { label: 'Simple Bar Chart', href: '/examples/bar/simple/' },
    ],
  },
  {
    key: 'scatter',
    heading: 'ScatterChart',
    basePath: '/examples/scatter',
    firstExampleHref: '/examples/scatter/simple/',
    tagline: 'Distribution and correlation.',
    examples: [
      { label: 'Simple Scatter Chart', href: '/examples/scatter/simple/' },
    ],
  },
  {
    key: 'stacked-bar',
    heading: 'StackedBarChart',
    basePath: '/examples/stacked-bar',
    firstExampleHref: '/examples/stacked-bar/simple/',
    tagline: 'Multi-series accumulated bars.',
    examples: [
      { label: 'Stacked Bar Chart', href: '/examples/stacked-bar/simple/' },
    ],
  },
  {
    key: 'stacked-area',
    heading: 'StackedAreaChart',
    basePath: '/examples/stacked-area',
    firstExampleHref: '/examples/stacked-area/simple/',
    tagline: 'Multi-series accumulated areas.',
    examples: [
      { label: 'Stacked Area Chart', href: '/examples/stacked-area/simple/' },
    ],
  },
  {
    key: 'composed',
    heading: 'ComposedChart',
    basePath: '/examples/composed',
    firstExampleHref: '/examples/composed/bar-line/',
    tagline: 'Multiple shapes on one chart.',
    examples: [
      { label: 'Bar + Line Composed', href: '/examples/composed/bar-line/' },
    ],
  },
  {
    key: 'pie',
    heading: 'PieChart',
    basePath: '/examples/pie',
    firstExampleHref: '/examples/pie/donut/',
    tagline: 'Pies and donuts for part-of-whole.',
    examples: [
      { label: 'Donut Chart', href: '/examples/pie/donut/' },
    ],
  },
  {
    key: 'radar',
    heading: 'RadarChart',
    basePath: '/examples/radar',
    firstExampleHref: '/examples/radar/multi-series/',
    tagline: 'Multi-axis attribute comparisons.',
    examples: [
      { label: 'Multi-series Radar', href: '/examples/radar/multi-series/' },
    ],
  },
];
