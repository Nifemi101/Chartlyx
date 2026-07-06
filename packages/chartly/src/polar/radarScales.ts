export function axisAngle(index: number, axisCount: number): number {
  return -Math.PI / 2 + (2 * Math.PI * index) / axisCount;
}

export function polarPoint(
  angle: number,
  value: number,
  maxValue: number,
  radius: number,
): [number, number] {
  const r = maxValue > 0 ? (value / maxValue) * radius : 0;
  return [r * Math.cos(angle), r * Math.sin(angle)];
}

export function polygonPath(points: readonly [number, number][]): string {
  if (points.length === 0) return "";
  const [first, ...rest] = points;
  const move = `M${first![0]},${first![1]}`;
  const lines = rest.map(([x, y]) => `L${x},${y}`).join("");
  return `${move}${lines}Z`;
}
