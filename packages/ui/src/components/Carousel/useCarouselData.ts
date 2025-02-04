import { useContext, useState } from "react";
import { CarouselContext, CarouselValue } from "./CarouselContext";
import { assertDefined } from "@repo/util/src/assertDefined";

export function useCarouselData<TData>(data?: TData[]): CarouselValue<TData>  {
  const ctx = useContext(CarouselContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  if (ctx) return ctx as CarouselValue<TData>;
  assertDefined(data, "data must be provided as a prop or via context")
  return {
    data,
    currentIndex,
    setCurrentIndex,
  }
}