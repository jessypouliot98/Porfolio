import React from "react";
import { SocialLinksLayout } from "./SocialLinks.Layout";
import { SocialLinksLinkSkeleton } from "./SocialLinks.Link.Skeleton";

export type SocialLinksSkeletonProps = {
  className?: string;
}

export function SocialLinksSkeleton({ className }: SocialLinksSkeletonProps) {
  return (
    <SocialLinksLayout className={className}>
      {Array.from({ length: 3 }, (_, i) => (
        <li key={i}><SocialLinksLinkSkeleton/></li>
      ))}
    </SocialLinksLayout>
  )
}