"use client";

import { motion } from "motion/react";
import { Carousel } from "@repo/ui/src/components/Carousel/Carousel";
import { MediaContent } from "@repo/ui/src/components/contentful/MediaContent/MediaContent";
import { CarouselDots } from "@repo/ui/src/components/Carousel/CarouselDots";
import { CarouselProvider } from "@repo/ui/src/components/Carousel/CarouselProvider";
import React from "react";
import { Asset } from "@repo/api/src/contentful";

export type ProjectCardCarouselProps = {
  className?: string;
  id: string;
}

export function ProjectCardCarousel({ id, className }: React.PropsWithChildren<ProjectCardCarouselProps>) {
  return (
    <motion.div
      className={className}
      layoutId={`${id}-image`}
    >
      <Carousel<Asset<"WITHOUT_UNRESOLVABLE_LINKS">>
        className="size-full"
        keyExtractor={(media) => media.sys.id}
        renderItem={({ item: media, focused }) => (
          <MediaContent
            className="size-full"
            classNames={{
              image: "object-contain pointer-events-none",
              video: ""
            }}
            media={media}
            focused={focused}
          />
        )}
      />
    </motion.div>
  )
}

export type ProjectCardCarouselProviderProps = {
  mediaList: Array<Asset<"WITHOUT_UNRESOLVABLE_LINKS">>;
}

export function ProjectCardCarouselProvider({ children, mediaList }: React.PropsWithChildren<ProjectCardCarouselProviderProps>) {
  return (
    <CarouselProvider data={mediaList}>
      {children}
    </CarouselProvider>
  )
}

export function ProjectCardCarouselDots() {
  return (
    <CarouselDots<Asset<"WITHOUT_UNRESOLVABLE_LINKS">>
      className="px-4 py-2"
      keyExtractor={(media) => media.sys.id}
    />
  )
}
