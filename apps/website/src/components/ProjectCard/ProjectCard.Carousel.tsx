"use client";

import { motion } from "motion/react";
import { Carousel } from "@repo/ui/src/components/Carousel/Carousel";
import { MediaContent } from "@repo/ui/src/components/contentful/MediaContent/MediaContent";
import { CarouselDots } from "@repo/ui/src/components/Carousel/CarouselDots";
import { CarouselProvider } from "@repo/ui/src/components/Carousel/CarouselProvider";
import React from "react";
import { Asset } from "@repo/api/src/contentful";
import { clsx } from "clsx";

export type ProjectCardCarouselProps = {
  className?: string;
  id: string;
  overflow?: boolean;
}

export function ProjectCardCarousel({ id, className, overflow = false }: React.PropsWithChildren<ProjectCardCarouselProps>) {
  return (
    <motion.div
      className={className}
      layoutId={`${id}-image`}
    >
      <Carousel<Asset<"WITHOUT_UNRESOLVABLE_LINKS">>
        className={clsx(
          "size-full",
          !overflow && "overflow-hidden"
        )}
        keyExtractor={(media) => media.sys.id}
        renderItem={({ item: media, focused }) => (
          <MediaContent
            className="size-full bg-gray-200"
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

export type ProjectCardCarouselDotsProps = {
  className?: string;
}

export function ProjectCardCarouselDots({ className }: ProjectCardCarouselDotsProps) {
  return (
    <CarouselDots<Asset<"WITHOUT_UNRESOLVABLE_LINKS">>
      className={className}
      keyExtractor={(media) => media.sys.id}
      labelExtractor={(media, index) => {
        let label = `Select slide #${index + 1}`;
        if (media.fields.title) {
          label += ` (${media.fields.title})`;
        }
        return label;
      }}
    />
  )
}
