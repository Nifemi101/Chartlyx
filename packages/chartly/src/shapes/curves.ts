import {
  curveLinear,
  curveMonotoneX,
  curveStepAfter,
  type CurveFactory,
} from "d3-shape";

export type CurveType = "linear" | "monotone" | "step";

export function resolveCurve(type: CurveType): CurveFactory {
  switch (type) {
    case "monotone":
      return curveMonotoneX;
    case "step":
      return curveStepAfter;
    case "linear":
      return curveLinear;
  }
}
