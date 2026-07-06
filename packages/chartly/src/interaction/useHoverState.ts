import { useCallback, useMemo, useState } from "react";
import { bisector } from "d3-array";
import { useChartContext } from "../context";
import type { XScale } from "../scales/types";

export interface HoverPoint<T> {
  x: number;
  y: number;
  datum: T;
  index: number;
}

export interface UseHoverState<T> {
  active: HoverPoint<T> | null;
  onMouseMove: (evt: React.MouseEvent<SVGRectElement>) => void;
  onMouseLeave: () => void;
}

export function useHoverState<T = unknown>(): UseHoverState<T> {
  const { data, xScale, yScale, xAccessor, yAccessor, margin } =
    useChartContext<T>();

  const [active, setActive] = useState<HoverPoint<T> | null>(null);

  const supportsInvert = hasInvert(xScale);

  const bisect = useMemo(() => {
    if (!supportsInvert) return null;
    const xValues = data.map((d) => xAccessor(d));
    return {
      xValues,
      center: bisector<number | Date | string, number | Date | string>(
        (v) => v,
      ).center,
    };
  }, [data, xAccessor, supportsInvert]);

  const onMouseMove = useCallback(
    (evt: React.MouseEvent<SVGRectElement>) => {
      if (data.length === 0) return;
      const rect = evt.currentTarget.getBoundingClientRect();
      const localX = evt.clientX - rect.left;
      const svgX = localX + margin.left;

      let index: number;

      if (bisect) {
        const invertible = xScale as unknown as {
          invert: (v: number) => number | Date;
        };
        const dataX = invertible.invert(svgX);
        index = bisect.center(bisect.xValues, dataX);
      } else {
        index = nearestByPixel(data, xAccessor, xScale, svgX);
      }

      index = Math.max(0, Math.min(index, data.length - 1));
      const datum = data[index] as T;
      const px = pixelX(xScale, xAccessor(datum));
      const py = (yScale as (v: never) => number)(yAccessor(datum) as never);

      setActive((prev) =>
        prev?.index === index ? prev : { x: px, y: py, datum, index },
      );
    },
    [data, xAccessor, yAccessor, xScale, yScale, margin.left, bisect],
  );

  const onMouseLeave = useCallback(() => setActive(null), []);

  return { active, onMouseMove, onMouseLeave };
}

function hasInvert(scale: XScale): boolean {
  return typeof (scale as { invert?: unknown }).invert === "function";
}

function pixelX(scale: XScale, value: number | Date | string): number {
  const pos = (scale as (v: never) => number)(value as never);
  if ("bandwidth" in scale && typeof scale.bandwidth === "function") {
    return pos + scale.bandwidth() / 2;
  }
  return pos;
}

function nearestByPixel<T>(
  data: readonly T[],
  xAccessor: (d: T) => number | Date | string,
  scale: XScale,
  targetX: number,
): number {
  let bestIndex = 0;
  let bestDist = Infinity;
  for (let i = 0; i < data.length; i++) {
    const px = pixelX(scale, xAccessor(data[i] as T));
    const dist = Math.abs(px - targetX);
    if (dist < bestDist) {
      bestDist = dist;
      bestIndex = i;
    }
  }
  return bestIndex;
}
