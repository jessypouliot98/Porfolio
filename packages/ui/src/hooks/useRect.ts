import React, { useEffect, useState } from "react";

export function useRect(el: React.RefObject<HTMLElement | null>) {
  const [rect, setRect] = useState(() => {
    return el.current?.getBoundingClientRect();
  });

  useEffect(() => {
    const currentEl = el.current;
    if (!currentEl) return;

    setRect(currentEl.getBoundingClientRect());
    const observer = new ResizeObserver(() => {
      // TODO - rate limit with throttle
      setRect(currentEl.getBoundingClientRect());
    });
    observer.observe(currentEl);

    return () => observer.disconnect();
  }, [el]);

  return rect;
}