import { FieldImage, Skeleton } from "../types";
import { EntryFieldTypes } from "@repo/api/src/contentful";

export type Technology = {
  image: FieldImage;
  name: EntryFieldTypes.Text;
  slug: EntryFieldTypes.Text;
};

export type TechnologySkeleton = Skeleton<"field-tech", Technology>;