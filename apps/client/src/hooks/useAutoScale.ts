import { useRef, useEffect, useState } from "react";

export function useAutoScale(maxScale = 1.5) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const maxScaleRef = useRef(maxScale);
  maxScaleRef.current = maxScale;

  useEffect(() => {
    const update = () => {
      const outer = outerRef.current;
      const inner = innerRef.current;
      if (!outer || !inner) return;

      const scaleX = outer.clientWidth / inner.offsetWidth;
      const scaleY = outer.clientHeight / inner.offsetHeight;
      // Shrink to fit if too tall; otherwise scale to fill width only.
      const heightLimit = scaleY < 1 ? scaleY : Infinity;
      setScale(Math.min(scaleX, heightLimit, maxScaleRef.current));
    };

    const ro = new ResizeObserver(update);
    if (outerRef.current) ro.observe(outerRef.current);
    if (innerRef.current) ro.observe(innerRef.current);
    update();

    return () => ro.disconnect();
  }, []);

  return { outerRef, innerRef, scale };
}
