import { Asset } from "@repo/api/src/contentful";
import { assertDefined } from "@repo/util/src/assertDefined";
import { assert } from "@repo/util/src/assert";

export function contentfulImageProps(asset: Asset): { src: string; alt: string } {
  const file = asset.fields.file;
  assertDefined(file, "file not defined");
  const { url, fileName, contentType } = file;
  assert(typeof contentType === "string" && contentType.startsWith("image/"), "Must be an image");
  assert(typeof url === "string", "Must be a string");
  assert(typeof fileName === "string", "Must be a string");
  return {
    src: "https:" + url,
    alt: fileName
  };
}