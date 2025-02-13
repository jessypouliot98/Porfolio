import { Client } from "../../types";
import { ProjectSkeleton } from "../model";

export async function queryProject(client: Client, projectId: string) {
  const resp = await client.withoutUnresolvableLinks.getEntry<ProjectSkeleton>(projectId, {
    locale: "en-CA",
  });
  return resp;
}