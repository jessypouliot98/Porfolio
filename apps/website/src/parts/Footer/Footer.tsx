import React, { Suspense } from "react";
import { SocialLinks } from "../SocialLinks/SocialLinks";
import { SocialLinksSkeleton } from "../SocialLinks/SocialLinks.Skeleton";

export function Footer() {
  return (
    <footer className="py-12 bg-black text-white space-y-6">
      <div className="max-w-screen-2xl mx-auto px-6">
        <Suspense fallback={<SocialLinksSkeleton/>}>
          <SocialLinks/>
        </Suspense>
      </div>
      <div className="max-w-screen-2xl mx-auto px-6 text-sm">
        &copy; {new Date().getFullYear()} Jessy Pouliot, All rights reserved.
      </div>
    </footer>
  )
}