import type { KeysOfType } from "../types";

export interface YOverride<T> {
  y?: (d: T) => number;
  yKey?: KeysOfType<T, number>;
}

export function resolveYAccessor<T>(
  props: YOverride<T>,
  fallback: (d: T) => number | Date | string,
): (d: T) => number {
  if (props.y) return props.y;
  if (props.yKey !== undefined) {
    const key = props.yKey as keyof T;
    return (d: T) => d[key] as number;
  }
  return fallback as (d: T) => number;
}
