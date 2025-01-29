import { createClient } from "@repo/api/src/contentful";

export const contentfulClient = createClient({
  space: String(process.env.CONTENTFUL_SPACE_ID),
  accessToken: String(process.env.CONTENTFUL_ACCESS_TOKEN)
});