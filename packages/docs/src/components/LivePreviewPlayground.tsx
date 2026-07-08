import React, { useMemo, useState } from 'react';
import {
  Area,
  CartesianGrid,
  ChartContainer,
  Line,
  LinearGradient,
  Tooltip,
  XAxis,
  YAxis,
  useChartContext,
} from 'chartly';

interface Row {
  label: string;
  value: number;
}

const data: Row[] = [
  { label: 'Jan', value: 320 },
  { label: 'Feb', value: 460 },
  { label: 'Mar', value: 380 },
  { label: 'Apr', value: 620 },
  { label: 'May', value: 540 },
  { label: 'Jun', value: 880 },
  { label: 'Jul', value: 760 },
  { label: 'Aug', value: 940 },
];

type CurveType = 'linear' | 'monotone' | 'step';

const COLOR_OPTIONS: { label: string; value: string }[] = [
  { label: 'Teal', value: '#5eead4' },
  { label: 'Blue', value: '#38bdf8' },
  { label: 'Purple', value: '#a78bfa' },
  { label: 'Pink', value: '#f472b6' },
];

const CURVE_OPTIONS: { label: string; value: CurveType }[] = [
  { label: 'Linear', value: 'linear' },
  { label: 'Monotone', value: 'monotone' },
  { label: 'Step', value: 'step' },
];

function useTooltipPlacement(
  x: number,
  y: number,
  cardWidth: number,
  cardHeight: number,
) {
  const { width, height, margin } = useChartContext();
  const gap = 12;
  const overflowsRight = x + gap + cardWidth > width - margin.right;
  const overflowsTop = y - cardHeight - gap < margin.top;
  let px = overflowsRight ? x - gap - cardWidth : x + gap;
  let py = overflowsTop ? y + gap : y - cardHeight - gap;
  px = Math.max(margin.left, Math.min(px, width - margin.right - cardWidth));
  py = Math.max(margin.top, Math.min(py, height - margin.bottom - cardHeight));
  return { px, py };
}

function PreviewTooltip({
  x,
  y,
  datum,
  accent,
}: {
  x: number;
  y: number;
  datum: Row;
  accent: string;
}): React.JSX.Element {
  const cardWidth = 110;
  const cardHeight = 48;
  const { px, py } = useTooltipPlacement(x, y, cardWidth, cardHeight);
  return (
    <g transform={`translate(${px}, ${py})`}>
      <rect width={cardWidth} height={cardHeight} rx={8} fill="#0f172a" stroke="#334155" />
      <text x={14} y={20} fontSize={11} fill="#94a3b8">
        {datum.label}
      </text>
      <text x={14} y={38} fontSize={13} fill={accent} fontWeight={600}>
        {datum.value}
      </text>
    </g>
  );
}

function buildSource(color: string, curve: CurveType, showArea: boolean): string {
  return `import { Area, CartesianGrid, ChartContainer, Line, LinearGradient, XAxis, YAxis } from 'chartly';

<ChartContainer data={data} xKey="label" xScaleType="band" yKey="value" yScaleType="linear">
  ${showArea ? `<LinearGradient id="fill" from="${color}" to="${color}" fromOpacity={0.25} toOpacity={0} />\n  ` : ''}<CartesianGrid stroke="#334155" dashArray="4 6" />
  <XAxis />
  <YAxis />
  ${showArea ? `<Area fill="url(#fill)" curve="${curve}" />\n  ` : ''}<Line stroke="${color}" strokeWidth={2} curve="${curve}" />
</ChartContainer>`;
}

const TOKEN_REGEX =
  /(\/\/.*)|("(?:[^"\\]|\\.)*")|(<\/?[A-Za-z][\w.]*)|(\{|\})|\b(import|from|const)\b|([a-zA-Z][\w-]*)(?==)/g;

function highlightSource(code: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  TOKEN_REGEX.lastIndex = 0;

  while ((match = TOKEN_REGEX.exec(code))) {
    if (match.index > lastIndex) {
      nodes.push(code.slice(lastIndex, match.index));
    }
    const [full, comment, str, tag, brace, keyword, attr] = match;
    let className = '';
    if (comment) className = 'text-[#64748b] italic';
    else if (str) className = 'text-[#fbbf24]';
    else if (tag) className = 'text-[#38bdf8] font-semibold';
    else if (brace) className = 'text-[#94a3b8]';
    else if (keyword) className = 'text-[#f472b6] font-semibold';
    else if (attr) className = 'text-[#5eead4]';
    nodes.push(
      <span key={key++} className={className}>
        {full}
      </span>,
    );
    lastIndex = TOKEN_REGEX.lastIndex;
  }
  if (lastIndex < code.length) nodes.push(code.slice(lastIndex));
  return nodes;
}

export default function LivePreviewPlayground(): React.JSX.Element {
  const [color, setColor] = useState(COLOR_OPTIONS[0].value);
  const [curve, setCurve] = useState<CurveType>('monotone');
  const [showArea, setShowArea] = useState(true);

  const source = useMemo(() => buildSource(color, curve, showArea), [color, curve, showArea]);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
      <div className="flex flex-col gap-6 rounded-lg border border-border bg-panel p-5">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted">Stroke color</p>
          <div className="flex gap-2">
            {COLOR_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                aria-label={opt.label}
                onClick={() => setColor(opt.value)}
                className={
                  color === opt.value
                    ? 'h-8 w-8 rounded-full ring-2 ring-offset-2 ring-offset-panel'
                    : 'h-8 w-8 rounded-full opacity-70 transition-opacity hover:opacity-100'
                }
                style={{ background: opt.value, ...(color === opt.value ? ({ '--tw-ring-color': opt.value } as React.CSSProperties) : {}) }}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted">Curve</p>
          <div className="flex flex-wrap gap-2">
            {CURVE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setCurve(opt.value)}
                className={
                  curve === opt.value
                    ? 'rounded-full border border-brand-strong bg-brand-strong px-3 py-1.5 text-xs font-bold text-bg'
                    : 'rounded-full border border-border px-3 py-1.5 text-xs font-bold text-muted hover:text-text'
                }
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted">Area fill</p>
          <button
            onClick={() => setShowArea((v) => !v)}
            className={
              showArea
                ? 'rounded-full border border-brand-strong bg-brand-strong px-3 py-1.5 text-xs font-bold text-bg'
                : 'rounded-full border border-border px-3 py-1.5 text-xs font-bold text-muted hover:text-text'
            }
          >
            {showArea ? 'On' : 'Off'}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="h-[300px] w-full rounded-lg border border-border bg-panel p-4">
          <ChartContainer
            data={data}
            xKey="label"
            xScaleType="band"
            yKey="value"
            yScaleType="linear"
            margin={{ top: 16, right: 20, bottom: 30, left: 46 }}
          >
            {showArea && (
              <LinearGradient
                id="livePreviewFill"
                from={color}
                to={color}
                fromOpacity={0.25}
                toOpacity={0}
              />
            )}
            <CartesianGrid stroke="#334155" strokeOpacity={0.75} dashArray="4 6" />
            <XAxis stroke="#64748b" textFill="#cbd5e1" />
            <YAxis stroke="#64748b" textFill="#cbd5e1" />
            {showArea && <Area fill="url(#livePreviewFill)" curve={curve} />}
            <Line stroke={color} strokeWidth={2} curve={curve} />
            <Tooltip<Row> indicatorStroke={color} dotFill={color}>
              {({ x, y, datum }) => <PreviewTooltip x={x} y={y} datum={datum} accent={color} />}
            </Tooltip>
          </ChartContainer>
        </div>

        <div className="overflow-hidden rounded-lg border border-border bg-[#020617]">
          <div className="flex items-center gap-3 border-b border-border bg-[#111318] px-4 py-3 text-xs font-bold text-[#cbd5e1]">
            <span className="inline-flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
            </span>
            <span>LivePreview.tsx</span>
          </div>
          <pre className="m-0 overflow-auto p-4 text-[0.82rem] leading-relaxed text-[#cbd5e1]">
            <code style={{ background: 'transparent', padding: 0, borderRadius: 0 }}>
              {highlightSource(source)}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}