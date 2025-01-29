import { createClient, Asset } from "@repo/api/src/contentful";
import { assert } from "@repo/util/src/assert";
import { assertDefined } from "@repo/util/src/assertDefined";

export const contentfulClient = createClient({
  space: String(process.env.CONTENTFUL_SPACE_ID),
  accessToken: String(process.env.CONTENTFUL_ACCESS_TOKEN)
});

export function contentfulImageProps(asset: Asset): { src: string; alt: string } {
  const file = asset.fields.file;
  console.log(file)
  assertDefined(file, "File must be defined");
  const { url, fileName, contentType } = file;
  assert(typeof contentType === "string" && contentType.startsWith("image/"), "Must be an image");
  assert(typeof url === "string", "Must be a string");
  assert(typeof fileName === "string", "Must be a string");
  return {
    src: "https:" + url,
    alt: fileName
  };
}