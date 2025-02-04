import React, { cache } from "react";
import { querySocialList } from "@repo/api/src/contentful/social/queries/querySocialList";
import { contentfulClient } from "../../utils/cms/server";
import { SocialLinksLayout } from "./SocialLinks.Layout";
import { SocialLinksLink } from "./SocialLinks.Link";

const getSocialList = cache(() => querySocialList(contentfulClient))

export async function SocialLinks() {
  const { items: socials } = await getSocialList();
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