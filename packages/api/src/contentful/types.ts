import { ContentfulClientApi } from "contentful"

export type Client = ContentfulClientApi<undefined>;

export type Skeleton<TTypeId extends string, TFields extends object> = {
  contentTypeId: TTypeId,
  fields: TFields
}

export type FieldImage = {
  contentType: `image/${string}`;
  details: {
    image: {
      width: number;
      height: number;
    };
    size: number;
  };
  fileName: string;
  url: string;
}