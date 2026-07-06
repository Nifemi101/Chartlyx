import { describe, expect, it } from "vitest";
import { axisAngle, polarPoint, polygonPath } from "../polar/radarScales";

describe("radarScales", () => {
  it("axisAngle(0, N) is -π/2 (top of circle)", () => {
    for (const N of [3, 4, 5, 6, 8]) {
      expect(axisAngle(0, N)).toBeCloseTo(-Math.PI / 2);
    }
  });

  it("axisAngle(N/4, N) is 0 (3 o'clock) when N is divisible by 4", () => {
    for (const N of [4, 8, 12, 16]) {
      expect(axisAngle(N / 4, N)).toBeCloseTo(0);
    }
  });

  it("polarPoint returns [0, 0] when value is 0", () => {
    const [x, y] = polarPoint(0, 0, 100, 200);
    expect(x).toBe(0);
    expect(y).toBe(0);
  });

  it("polarPoint returns [radius, 0] at angle=0, value=maxValue", () => {
    const [x, y] = polarPoint(0, 100, 100, 200);
    expect(x).toBeCloseTo(200);
    expect(y).toBeCloseTo(0);
  });

  it("polygonPath emits M .. L .. L .. Z", () => {
    const d = polygonPath([
      [0, 0],
      [10, 0],
      [10, 10],
    ]);
    expect(d).toBe("M0,0L10,0L10,10Z");
  });
});
