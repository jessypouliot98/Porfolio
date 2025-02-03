import { createClient } from "@repo/api/src/contentful";
import { assertDefined } from "@repo/util/src/assertDefined";
import "server-only";

assertDefined(process.env.CONTENTFUL_SPACE_ID, "CONTENTFUL_SPACE_ID not defined");
assertDefined(process.env.CONTENTFUL_ACCESS_TOKEN, "CONTENTFUL_ACCESS_TOKEN not defined");

export const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
});

