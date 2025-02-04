import { CarouselContext } from "./CarouselContext";
import React, { useState } from "react";

export type CarouselProviderProps<TData> = {
  data: TData[]
}

export function CarouselProvider<TData>({ children, data }: React.PropsWithChildren<CarouselProviderProps<TData>>) {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <CarouselContext.Provider value={{ data, currentIndex, setCurrentIndex }}>
      {children}
    </CarouselContext.Provider>
  )
}