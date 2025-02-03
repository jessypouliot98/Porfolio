import { Skeleton } from "../types";
import { Entry, EntryFieldTypes } from "contentful";
import { TechnologySkeleton } from "../technology/model";
import { LinkSkeleton } from "../link/model";

export type Project = {
  title: EntryFieldTypes.Text;
  slug: EntryFieldTypes.Text;
  level: EntryFieldTypes.Number;
  description: EntryFieldTypes.Text;
  technologies: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TechnologySkeleton>>;
  thumbnail: EntryFieldTypes.AssetLink;
  mediaList?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
  content?: EntryFieldTypes.RichText;
  links?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<LinkSkeleton>>;
}

export type ProjectSkeleton = Skeleton<"field-project", Project>;
export type ProjectEntry = Entry<ProjectSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">;