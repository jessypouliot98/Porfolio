import { useLayoutEffect, useRef, useState } from "react";
import { MotionValue, useMotionValueEvent, useTransform, EasingFunction } from "motion/react";

type Params = {
  value: MotionValue<number>;
  inputVariables: string[];
  outputVariable: string;
  inputRange: number[];
  fallback?: string;
  ease?: EasingFunction | EasingFunction[];
}
export function useInterpolatedAnimatedCss<TEl extends HTMLElement>({
  value,
  inputVariables,
  outputVariable,
  inputRange,
  fallback = "#000000",
  ease,
}: Params) {
  const elementRef = useRef<TEl>(null);
  const [colors, setColors] = useState<string[]>(() => inputVariables.map(() => fallback));
  const animatedColor = useTransform(value, inputRange, colors, { ease });

  useMotionValueEvent(animatedColor, "change", (color) => {
    elementRef.current?.style.setProperty(outputVariable, color);
  });

  useLayoutEffect(() => {
    const el = elementRef.current;
    if (!el) return;
    const computed = getComputedStyle(el);
    const colors = inputVariables.map((property) => {
      const propertyValue = computed.getPropertyValue(property);
      return propertyValue === "" ? fallback : propertyValue;
    })
    setColors(colors);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Mount only
  }, []);

  return elementRef;
}