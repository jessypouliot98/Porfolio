import { ComponentPropsWithRef } from "react";
import { Slot, SlotProps } from "@radix-ui/react-slot";
import { clsx } from "clsx";

export type ButtonProps<TAsChild extends boolean> =
  & (TAsChild extends false
    ? ComponentPropsWithRef<"div">
    : SlotProps)
  & {
    asChild?: TAsChild;
  }

export function Card<TAsChild extends boolean = false>({
  asChild,
  children,
  className,
  ...cardProps
}: ButtonProps<TAsChild>) {
  const Comp = asChild ? Slot : "div";
  return (
    <Comp
      className={clsx(
        "bg-white shadow-xl shadow-gray-500",
        className,
      )}
      {...cardProps}
    >
      {children}
    </Comp>
  )
}