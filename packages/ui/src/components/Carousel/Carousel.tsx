"use client";

import { motion, useMotionValue } from "motion/react";
import { JSX, useRef, useState } from "react";
import { useRect } from "../../hooks/useRect";
import { clsx } from "clsx";

export type CarouselProps<TData> = {
  className?: string;
  data: TData[];
  keyExtractor: (key: TData) => string;
  renderItem: (arg: { item: TData; index: number; focused: boolean }) => JSX.Element;
}

const DRAG_BUFFER = 50;

export function Carousel<TData>({ className, data, keyExtractor, renderItem }: CarouselProps<TData>) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [rootRect, updateRootRect] = useRect(rootRef);
  const [currentIndex, setCurrentIndex] = useState(0);
  const dragX = useMotionValue(0);

  const handleDragEnd = () => {
    const x = dragX.get();

    if (x <= -DRAG_BUFFER && currentIndex < data.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else if (x >= DRAG_BUFFER && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div
      ref={rootRef}
      style={{
        "--width": `${rootRect?.width ?? 0}px`,
        "--height": `${rootRect?.height ?? 0}px`,
      } as object}
      className={clsx(
        "relative overflow-hidden",
        className,
      )}
    >
      <motion.div
        className="flex items-center"
        drag="x"
        dragConstraints={{
          left: 0,
          right: 0,
        }}
        style={{
          x: dragX,
        }}
        animate={{
          translateX: `-${currentIndex * 100}%`,
        }}
        onDragEnd={handleDragEnd}
        transition={{
          type: "spring",
          mass: 1,
          stiffness: 400,
          damping: 50,
        }}
      >
        {data.map((item, i) => {
          return (
            <div
              key={keyExtractor(item)}
              className="w-full"
            >
              {renderItem({ item, index: i, focused: i === currentIndex })}
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}