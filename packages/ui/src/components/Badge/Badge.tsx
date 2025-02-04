import { ComponentPropsWithRef } from "react";
import { clsx } from "clsx";

export type BadgeProps = ComponentPropsWithRef<"div"> & {
  inline?: boolean;
};

export function Badge({ children, className, inline = false, ...props }: BadgeProps) {
  return (
    <div
      {...props}
      className={clsx(
        inline ? "inline-flex" : "flex",
        "bg-blue-600 text-white px-1 py-0.5 text-xs font-medium leading-tight truncate",
        className,
      )}
    >
      {children}
    </div>
  )
}