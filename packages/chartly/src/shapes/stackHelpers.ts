export const DEFAULT_STACK_COLORS: readonly string[] = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
];

export function stackSum<T>(
  data: readonly T[],
  keys: readonly (keyof T)[],
): number {
  let max = 0;
  for (const row of data) {
    let sum = 0;
    for (const k of keys) {
      const v = Number(row[k]);
      if (Number.isFinite(v)) sum += v;
    }
    if (sum > max) max = sum;
  }
  return max;
}

export function pickColor(colors: readonly string[], i: number): string {
  return colors[i % colors.length] ?? "currentColor";
}
