import { Skeleton } from "../types";
import { EntryFieldTypes } from "@repo/api/src/contentful";
import { Entry } from "contentful";

export type Social = {
  title: EntryFieldTypes.Text;
  slug: EntryFieldTypes.Text;
  icon: EntryFieldTypes.Text;
  highlightColor: EntryFieldTypes.Text;
  href: EntryFieldTypes.Text;
};

export type SocialSkeleton = Skeleton<"field-social", Social>;
export type SocialEntry = Entry<SocialSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">;