import { Skeleton } from "../types";
import { EntryFieldTypes } from "contentful";
import { TechnologySkeleton } from "../technology/model";

export type Project = {
  title: EntryFieldTypes.Text;
  slug: EntryFieldTypes.Text;
  description: EntryFieldTypes.Text;
  technologies: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TechnologySkeleton>>;
  thumbnail: EntryFieldTypes.AssetLink;
}

export type ProjectSkeleton = Skeleton<"field-project", Project>;