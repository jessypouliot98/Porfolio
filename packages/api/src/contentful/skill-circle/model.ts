import { Skeleton } from "../types";
import { EntryFieldTypes } from "@repo/api/src/contentful";
import { Entry } from "contentful";
import { TechnologySkeleton } from "../technology/model";

export type SkillRing = {
  title: EntryFieldTypes.Text;
  skills: EntryFieldTypes.Array<
    EntryFieldTypes.EntryResourceLink<
      TechnologySkeleton
    >
  >;
  configuration?: EntryFieldTypes.Object<
    Partial<{
      size: Partial<{
        "ring": number | string,
        "bubble": number | string
      }>,
      "spinDuration": number | string
    }>
  >;
}

export type SkillRingSkeleton = Skeleton<"component-skill-circle", SkillRing>;
export type SkillRingEntry = Entry<SkillRingSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">;

export type SkillCircle = {
  title: EntryFieldTypes.Text;
  rings: EntryFieldTypes.Array<
    EntryFieldTypes.EntryResourceLink<
      SkillRingSkeleton
    >
  >;
  icon: EntryFieldTypes.Text;
  highlightColor: EntryFieldTypes.Text;
  href: EntryFieldTypes.Text;
};

export type SkillCircleSkeleton = Skeleton<"component-skill-circle-ring", SkillCircle>;
export type SkillCircleEntry = Entry<SkillCircleSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">;
