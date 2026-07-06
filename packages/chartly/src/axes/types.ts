export type TickValue = number | Date | string;

export type TickFormatter<V extends TickValue = TickValue> = (
  value: V,
  index: number,
) => string;

export interface AxisProps<V extends TickValue = TickValue> {
  tickCount?: number;
  tickFormatter?: TickFormatter<V>;
  label?: string;
  labelOffset?: number;
  stroke?: string;
}
