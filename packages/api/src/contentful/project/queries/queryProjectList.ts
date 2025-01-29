import { Client } from "../../types";
import { ProjectSkeleton } from "../model";

export async function queryProjectList(client: Client) {
  const resp = await client.withoutUnresolvableLinks.getEntries<ProjectSkeleton>({
    locale: "en-CA",
    content_type: "field-project",
    order: ["-sys.createdAt"],
  });
  return resp;
}