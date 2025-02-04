import { ComponentPropsWithRef } from "react";
import { clsx } from "clsx";

const variants = {
  primary: "bg-blue-600 text-white",
  secondary: "bg-gray-200 text-black"
} satisfies Record<string, string>;

type Variant = keyof typeof variants;

export type BadgeProps = ComponentPropsWithRef<"div"> & {
  inline?: boolean;
  variant?: Variant;
};

export function Badge({ children, className, inline = false, variant = "primary", ...props }: BadgeProps) {
  return (
    <div
      {...props}
      className={clsx(
        inline ? "inline-flex" : "flex",
        "px-1 py-0.5 text-xs font-medium leading-tight truncate shadow",
        variants[variant],
        className,
      )}
    >
      {children}
    </div>
  )
}