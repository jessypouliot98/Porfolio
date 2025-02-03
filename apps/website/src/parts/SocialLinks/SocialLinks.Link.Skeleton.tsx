import React from "react";
import { SkeletonBox } from "@repo/ui/src/components/SkeletonBox/SkeletonBox";

export function SocialLinksLinkSkeleton() {
  return (
    <div
      className="size-[2em] grid place-items-center"
    >
      <SkeletonBox className="size-[1em]"/>
    </div>
  )
}