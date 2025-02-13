"use client";

import { motion } from "motion/react";
import React from "react";
import { clsx } from "clsx";
import { Badge } from "@repo/ui/src/components/Badge/Badge";
import { TechnologyEntry } from "@repo/api/src/contentful/technology/model";

export type ProjectCardTechListProps = {
  className?: string;
  id: string;
  technologies: TechnologyEntry[];
}

export function ProjectCardTechList({ className, id, technologies }: ProjectCardTechListProps) {
  return (
    <motion.ul
      className={clsx(
        "flex gap-1",
        className
      )}
      layoutId={`${id}-techs`}
    >
      {technologies.map((tech) => (
        <li key={tech.sys.id}>
          <Badge variant="secondary">{tech.fields.name}</Badge>
        </li>
      ))}
    </motion.ul>
  )
}