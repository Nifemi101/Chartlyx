import * as React from "react";
import { useChartContext } from "../context";
import { useHoverState } from "./useHoverState";
import type { TooltipRender } from "./types";

export interface TooltipProps<T = unknown> {
  children: TooltipRender<T>;
  showIndicator?: boolean;
  indicatorStroke?: string;
  indicatorOpacity?: number;
  dotRadius?: number;
  dotFill?: string;
}

/**
 * Renders a tooltip that follows the nearest data point on hover.
 * MUST be the last child of ChartContainer so its overlay rect
 * captures pointer events on top of other chart elements.
 */
export function Tooltip<T = unknown>({
  children,
  showIndicator = true,
  indicatorStroke = "currentColor",
  indicatorOpacity = 0.3,
  dotRadius = 4,
  dotFill = "currentColor",
}: TooltipProps<T>): React.JSX.Element {
  const { margin, width, height } = useChartContext();
  const { active, onMouseMove, onMouseLeave } = useHoverState<T>();

  const plotX = margin.left;
  const plotY = margin.top;
  const plotW = Math.max(0, width - margin.left - margin.right);
  const plotH = Math.max(0, height - margin.top - margin.bottom);

  return (
    <g data-chartly-tooltip="">
      {active && showIndicator ? (
        <g pointerEvents="none">
          <line
            x1={active.x}
            x2={active.x}
            y1={plotY}
            y2={plotY + plotH}
            stroke={indicatorStroke}
            opacity={indicatorOpacity}
          />
          <circle
            cx={active.x}
            cy={active.y}
            r={dotRadius}
            fill={dotFill}
            stroke="white"
            strokeWidth={2}
          />
        </g>
      ) : null}
      {active ? (
        <g pointerEvents="none">{children(active)}</g>
      ) : null}
      <rect
        x={plotX}
        y={plotY}
        width={plotW}
        height={plotH}
        fill="transparent"
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        data-testid="chartly-tooltip-overlay"
      />
    </g>
  );
}
