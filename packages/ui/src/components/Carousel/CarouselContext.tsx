import React from "react";

export type CarouselValue<TData> = {
  data: TData[];
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}

export const CarouselContext = React.createContext<CarouselValue<unknown> | null>(null);