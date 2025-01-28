import { ComponentPropsWithRef } from "react";
import { Slot, SlotProps } from "@radix-ui/react-slot";

export type ButtonProps<TAsChild extends boolean> =
  & (TAsChild extends false
    ? ComponentPropsWithRef<"button">
    : SlotProps)
  & {
    asChild?: TAsChild;
    disabled?: boolean;
  }

export function Button<TAsChild extends boolean = false>({
  asChild,
  disabled,
  children,
  ...buttonProps
}: ButtonProps<TAsChild>) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      {...buttonProps}
      aria-disabled={disabled}
    >
      {children}
    </Comp>
  )
}