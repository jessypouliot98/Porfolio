import { Client } from "../../types";
import { SocialSkeleton } from "../model";

export async function querySocialList(client: Client) {
  const resp = await client.withoutUnresolvableLinks.getEntries<SocialSkeleton>({
    locale: "en-CA",
    content_type: "field-social",
  });
  return resp;
}