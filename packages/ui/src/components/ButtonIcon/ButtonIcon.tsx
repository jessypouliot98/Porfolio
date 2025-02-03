import { Slot, Slottable } from "@radix-ui/react-slot";
import React from "react";

import { Button, ButtonProps } from "../Button/Button";
import { clsx } from "clsx";

export type NewButtonIconProps<TAsChild extends boolean> = ButtonProps<TAsChild> & {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

export function ButtonIcon<TAsChild extends boolean>({
  leftIcon,
  rightIcon,
  children,
  asChild,
  className,
  ...props
}: NewButtonIconProps<TAsChild>) {
  const Comp = asChild ? Slot : "button";
  return (
    <Button
      {...props}
      className={clsx(
        "justify-between gap-2",
        className,
      )}
      asChild
    >
      <Comp>
        {leftIcon}
        <Slottable>{children}</Slottable>
        {rightIcon}
      </Comp>
    </Button>
  );
}
