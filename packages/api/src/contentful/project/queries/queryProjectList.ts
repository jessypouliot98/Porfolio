import { Client } from "../../types";
import { ProjectSkeleton } from "../model";

export async function queryProjectList(client: Client) {
  const resp = await client.withoutUnresolvableLinks.getEntries<ProjectSkeleton>({
    locale: "en-CA",
    content_type: "field-project",
    order: ["-sys.createdAt"],
  });
  for (const project of resp.items) {
    const file = project.fields.thumbnail?.fields.file;
    if (file && !file.url.includes("https:")) {
      file.url = "https:" + file.url;
    }
  }
  return resp;
}