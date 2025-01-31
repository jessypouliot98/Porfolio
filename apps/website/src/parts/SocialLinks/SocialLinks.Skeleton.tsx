import React from "react";
import { SocialLinksLayout } from "./SocialLinks.Layout";
import { SocialLinksLinkSkeleton } from "./SocialLinks.Link.Skeleton";

export function SocialLinksSkeleton() {
  return (
    <SocialLinksLayout>
      {Array.from({ length: 3 }, (_, i) => (
        <li key={i}><SocialLinksLinkSkeleton/></li>
      ))}
    </SocialLinksLayout>
  )
}