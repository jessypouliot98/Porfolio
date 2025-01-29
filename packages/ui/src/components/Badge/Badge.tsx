import { ComponentPropsWithRef } from "react";
import { clsx } from "clsx";

export type BadgeProps = ComponentPropsWithRef<"div">;

export function Badge({ children, className, ...props }: BadgeProps) {
  return (
    <div {...props} className={clsx("inline-flex bg-blue-500 text-white px-1 py-0.5 text-xs font-medium leading-tight truncate", className)}>
      {children}
    </div>
  )
}