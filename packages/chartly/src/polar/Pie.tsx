import * as React from "react";
import { arc as d3arc, pie as d3pie, type PieArcDatum } from "d3-shape";
import {
  DEFAULT_STACK_COLORS,
  pickColor,
} from "../shapes/stackHelpers";
import { usePolarChartContext } from "./context";
import type { PieLabelRender } from "./types";

export interface PieProps<T = unknown> {
  colors?: readonly string[];
  stroke?: string;
  strokeWidth?: number;
  label?: PieLabelRender<T>;
}

export function Pie<T = unknown>({
  colors = DEFAULT_STACK_COLORS,
  stroke = "white",
  strokeWidth = 2,
  label,
}: PieProps<T>): React.JSX.Element {
  const {
    data,
    valueAccessor,
    cx,
    cy,
    radius,
    innerRadius,
    setActiveIndex,
  } = usePolarChartContext<T>();

  const pieGen = d3pie<T>()
    .value((d) => valueAccessor(d))
    .sort(null);
  const arcs = pieGen(data as T[]);

  const arcGen = d3arc<PieArcDatum<T>>()
    .innerRadius(innerRadius)
    .outerRadius(radius);

  return (
    <g transform={`translate(${cx}, ${cy})`} data-chartly-pie="">
      {arcs.map((a, i) => (
        <path
          key={i}
          d={arcGen(a) ?? ""}
          fill={pickColor(colors, i)}
          stroke={stroke}
          strokeWidth={strokeWidth}
          onMouseEnter={() => setActiveIndex(i)}
          onMouseLeave={() => setActiveIndex(null)}
          data-testid={`pie-slice-${i}`}
        />
      ))}
      {label ? (
        <g pointerEvents="none">
          {arcs.map((a, i) => (
            <React.Fragment key={i}>
              {label({
                centroid: arcGen.centroid(a),
                cx: 0,
                cy: 0,
                startAngle: a.startAngle,
                endAngle: a.endAngle,
                datum: a.data,
                index: i,
              })}
            </React.Fragment>
          ))}
        </g>
      ) : null}
    </g>
  );
}
