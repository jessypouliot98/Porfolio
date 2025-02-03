import { ContentfulClientApi } from "contentful"

export type Client = ContentfulClientApi<undefined>;

export type Skeleton<TTypeId extends string, TFields extends object> = {
  contentTypeId: TTypeId,
  fields: TFields
}