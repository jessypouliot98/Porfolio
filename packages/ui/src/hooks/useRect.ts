import React, { useEffect, useState } from "react";

export function useRect(el: React.RefObject<HTMLElement | null>) {
  const [rect, setRect] = useState(() => {
    return el.current?.getBoundingClientRect();
  });

  useEffect(() => {
    const currentEl = el.current;
    if (!currentEl) return;

    const observer = new ResizeObserver(() => {
      // TODO - rate limit
      setRect(currentEl.getBoundingClientRect());
    });
    setRect(currentEl.getBoundingClientRect());

    return () => observer.disconnect();
  }, [el]);

  return rect;
}