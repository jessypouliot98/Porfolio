import { Skeleton } from "../types";
import { Entry, EntryFieldTypes } from "contentful";

export type Link = {
  title: EntryFieldTypes.Text;
  slug: EntryFieldTypes.Text;
  link: EntryFieldTypes.Text;
  label: EntryFieldTypes.Text;
  icon: EntryFieldTypes.Text;
}

export type LinkSkeleton = Skeleton<"field-link", Link>;
export type LinkEntry = Entry<LinkSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">;