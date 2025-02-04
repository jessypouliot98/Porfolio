import React from "react";
import { clsx } from "clsx";

export type SocialLinksLayoutProps = {
  className?: string;
}

export function SocialLinksLayout({ children, className }: React.PropsWithChildren<SocialLinksLayoutProps>) {
  return (
    <menu className={clsx("flex text-xl gap-4", className)}>
      {children}
    </menu>
  )
}