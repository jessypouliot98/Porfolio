import { Skeleton } from "../types";
import { EntryFieldTypes } from "contentful";
import { TechnologySkeleton } from "../technology/model";

export type Project = {
  title: EntryFieldTypes.Text;
  slug: EntryFieldTypes.Text;
  level: EntryFieldTypes.Number;
  description: EntryFieldTypes.Text;
  technologies: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TechnologySkeleton>>;
  thumbnail: EntryFieldTypes.AssetLink;
  content?: EntryFieldTypes.RichText;
}

export type ProjectSkeleton = Skeleton<"field-project", Project>;