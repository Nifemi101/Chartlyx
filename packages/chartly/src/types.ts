export interface Margin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export const DEFAULT_MARGIN: Margin = {
  top: 10,
  right: 10,
  bottom: 30,
  left: 40,
};

export type ScaleType = "linear" | "time" | "band";

export type ScaleInput<S extends ScaleType> = S extends "linear"
  ? number
  : S extends "time"
  ? Date
  : S extends "band"
  ? string
  : never;

export type KeysOfType<T, V> = {
  [K in keyof T]-?: T[K] extends V ? K : never;
}[keyof T];
