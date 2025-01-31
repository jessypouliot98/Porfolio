import { Client } from "../../types";
import { SkillCircleSkeleton } from "../model";

export type querySkillCircleParams = {
  skillCircleId: string;
}

export async function querySkillCircle(client: Client, params: querySkillCircleParams) {
  const resp = await client.withoutUnresolvableLinks.getEntry<SkillCircleSkeleton>(params.skillCircleId, {
    locale: "en-CA",
    include: 2,
  });
  return resp;
}