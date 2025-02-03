import React from "react";
import { querySocialList } from "@repo/api/src/contentful/social/queries/querySocialList";
import { contentfulClient } from "../../utils/cms";
import { SocialLinksLayout } from "./SocialLinks.Layout";
import { SocialLinksLink } from "./SocialLinks.Link";

export async function SocialLinks() {
  const { items: socials } = await querySocialList(contentfulClient);
  return (
    <SocialLinksLayout>
      {socials.map((social) => (
        <li key={social.sys.id}>
          <SocialLinksLink social={social} />
        </li>
      ))}
    </SocialLinksLayout>
  )
}