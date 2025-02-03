/**
 * Ideas:
 *  - Replace with autoplaying snake game where the snake eats skills to grow.
 * Issues:
 *  - Circles doesn't fit well in the "pixel"/square design I had in mind
 */

import { SkillSpinner } from "../SkillSpinner/SkillSpinner";
import { clsx } from "clsx";
import React, { cache } from "react";
import { querySkillCircle } from "@repo/api/src/contentful/skill-circle/queries/querySkillCircle";
import { contentfulClient } from "../../utils/cms/server";

const getSkillCircle = cache(() => {
  return querySkillCircle(contentfulClient, {
    skillCircleId: "5vOJmStm2QB4yc9Iqx6KTs"
  });
})

export async function HeroSkillSpinner() {
  const skillCircle = await getSkillCircle();

  return (
    <SkillSpinner
      className={clsx(
        "absolute right-0 top-0 -translate-y-1/4 translate-x-1/4",
        "opacity-30 lg:opacity-60 xl:opacity-100",
        "scale-75 md:scale-100"
      )}
      skillCircle={skillCircle}
    />
  )
}