"use client";

import React, { useMemo } from "react";
import { ButtonLinkContentful } from "@repo/ui/src/components/contentful/ButtonLinkContentful/ButtonLinkContentful";
import { ProjectEntry } from "@repo/api/src/contentful/project/model";
import { isDefined } from "@repo/util/src/isDefined";
import { clsx } from "clsx";

export type ProjectCardLinksProps = {
  className?: string;
  links: NonNullable<ProjectEntry["fields"]["links"]>;
}

export function ProjectCardLinks({ className, links }: ProjectCardLinksProps) {
  const definedLinks = useMemo(() => links.filter(isDefined), [links]);
  return (
    <ul className={clsx("flex flex-wrap gap-2", className)}>
      {definedLinks.map((link) => (
        <li key={link.sys.id}>
          <ButtonLinkContentful link={link}/>
        </li>
      ))}
    </ul>
  )
}