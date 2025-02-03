import { Client } from "../../types";
import { TechnologySkeleton } from "../model";

export async function queryTechnologyList(client: Client) {
  const resp = await client.withoutUnresolvableLinks.getEntries<TechnologySkeleton>({
    locale: "en-CA",
    content_type: "field-tech",
    order: [
      "fields.level",
      "-sys.updatedAt"
    ]
  });
  return resp;
}