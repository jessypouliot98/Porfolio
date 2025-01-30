import { Skeleton } from "../types";
import { EntryFieldTypes } from "@repo/api/src/contentful";

export type Technology = {
  name: EntryFieldTypes.Text;
  slug: EntryFieldTypes.Text;
  image: EntryFieldTypes.AssetLink;
  level: EntryFieldTypes.Integer;
  extra?: EntryFieldTypes.Object;
};

export type TechnologySkeleton = Skeleton<"field-tech", Technology>;