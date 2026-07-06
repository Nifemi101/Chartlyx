import { useEffect, useRef, useState } from "react";

export interface Size {
  width: number;
  height: number;
}

export function useResize<E extends HTMLElement>(): {
  ref: React.RefObject<E | null>;
  width: number;
  height: number;
} {
  const ref = useRef<E | null>(null);
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const { width, height } = entry.contentRect;
      setSize((prev) =>
        prev.width === width && prev.height === height ? prev : { width, height },
      );
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, width: size.width, height: size.height };
}
