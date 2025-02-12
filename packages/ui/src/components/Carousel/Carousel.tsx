"use client";

import { motion, useMotionValue } from "motion/react";
import { JSX } from "react";
import { clsx } from "clsx";
import { useCarouselData } from "./useCarouselData";

export type CarouselProps<TData> = {
  className?: string;
  data?: TData[];
  keyExtractor: (key: TData) => string;
  renderItem: (arg: { item: TData; index: number; focused: boolean }) => JSX.Element;
}

const DRAG_BUFFER = 50;

export function Carousel<TData>({ className, data: maybeData, keyExtractor, renderItem }: CarouselProps<TData>) {
  const { data, currentIndex, setCurrentIndex } = useCarouselData(maybeData);
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
      className={clsx(
        "relative",
        className,
      )}
    >
      <motion.div
        className="h-full flex cursor-grab items-center active:cursor-grabbing"
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
              className="size-full shrink-0"
            >
              {renderItem({ item, index: i, focused: i === currentIndex })}
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}