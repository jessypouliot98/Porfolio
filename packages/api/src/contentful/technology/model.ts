import { Skeleton } from "../types";
import { EntryFieldTypes } from "@repo/api/src/contentful";
import { Entry } from "contentful";

export type Technology = {
  name: EntryFieldTypes.Text;
  slug: EntryFieldTypes.Text;
  image: EntryFieldTypes.AssetLink;
  level: EntryFieldTypes.Integer;
  extra?: EntryFieldTypes.Object<{
    skillSpinnerBubbleStyle?: Record<string, string | number>;
  }>;
};

export type TechnologySkeleton = Skeleton<"field-tech", Technology>;
export type TechnologyEntry = Entry<TechnologySkeleton, "WITHOUT_UNRESOLVABLE_LINKS">;