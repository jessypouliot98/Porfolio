"use client";

import { motion } from "motion/react";
import React from "react";

export type ProjectCardTitle = {
  id: string;
  className?: string;
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export function ProjectCardTitle({ children, as, id, className }: React.PropsWithChildren<ProjectCardTitle>) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      layoutId={`${id}-title`}
    >
      {children}
    </Comp>
  )
}