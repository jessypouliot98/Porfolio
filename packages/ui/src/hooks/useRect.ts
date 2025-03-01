import React, { useCallback, useEffect, useState } from "react";

export function useRect(el: React.RefObject<HTMLElement | null>) {
  const [rect, setRect] = useState(() => {
    return el.current?.getBoundingClientRect();
  });

  useEffect(() => {
    const currentEl = el.current;
    if (!currentEl) return;

    const observer = new ResizeObserver(() => {
      // TODO - rate limit with throttle
      setRect(currentEl.getBoundingClientRect());
    });
    observer.observe(currentEl);
    setRect(currentEl.getBoundingClientRect());

    return () => observer.disconnect();
  }, [el]);

  const update = useCallback(() => {
    const currentEl = el.current;
    if (!currentEl) return;
    setRect(currentEl.getBoundingClientRect());
  }, [el]);

  return [rect, update] as const;
}