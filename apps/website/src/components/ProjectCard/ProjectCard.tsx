"use client";

import { Card } from "@repo/ui/src/components/Card/Card"
import { motion } from "motion/react";
import React, { useMemo, useState } from "react";
import Image, { ImageProps } from "next/image"
import { Modal } from "@repo/ui/src/components/Modal/Modal";
import { IconX } from "@repo/ui/src/components/icons";
import { clsx } from "clsx";
import { Badge } from "@repo/ui/src/components/Badge/Badge";
import { ProjectEntry } from "@repo/api/src/contentful/project/model";
import { assertDefined } from "@repo/util/src/assertDefined";
import { contentfulImageProps } from "../../utils/cms/client";
import { RichTextRender } from "@repo/ui/src/components/contentful/RichTextRender/RichTextRender";
import { Carousel } from "@repo/ui/src/components/Carousel/Carousel";
import { MediaContent } from "@repo/ui/src/components/contentful/MediaContent/MediaContent";
import { ButtonLinkContentful } from "@repo/ui/src/components/contentful/ButtonLinkContentful/ButtonLinkContentful";

export type ProjectCardProps = {
  className?: string;
  project: ProjectEntry;
  thumbnailLoading?: ImageProps["loading"];
}

export function ProjectCard({ className, project, thumbnailLoading }: ProjectCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const id = project.sys.id
  const { description, title, thumbnail, technologies } = project.fields;
  assertDefined(thumbnail, "thumbnail not defined");

  const mediaList = useMemo(() => {
    if (!project.fields.mediaList) {
      return [thumbnail];
    }
    return [
      thumbnail,
      ...project.fields.mediaList.map((media) => {
        assertDefined(media, "project media not defined");
        return media;
      }),
    ];
  }, [thumbnail, project.fields.mediaList]);
  const thumbnailSrc = contentfulImageProps(thumbnail).src;
  const thumbnailAlt = `${title} thumbnail`;
  const renderTechListItems = technologies.map((tech) => {
    assertDefined(tech, "project tech not defined");
    return (
      <li key={tech.sys.id}>
        <Badge>{tech.fields.name}</Badge>
      </li>
    )
  });
  const renderLinkItems = project.fields.links?.map((link) => {
    assertDefined(link, "project link not defined");
    return (
      <li key={link.sys.id}>
        <ButtonLinkContentful link={link} />
      </li>
    )
  })

  return (
    <>
      <div className={clsx(
        "transition scale-100 hover:scale-105 focus-within:scale-105",
        "aspect-video bg-gray-500/30",
        className,
      )}>
        <Card
          asChild
          id={id}
          className="block relative text-left size-full !bg-black"
          aria-description={description}
        >
          <motion.button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            layoutId={`${id}-container`}
          >
            <motion.div
              className="bg-black size-full"
              layoutId={`${id}-image`}
            >
              <Image
                className="object-cover"
                style={{
                  maskMode: "alpha",
                  maskImage: "linear-gradient(to top, transparent 0%, rgba(255,255,255,1) 80%)",
                }}
                src={thumbnailSrc}
                alt={thumbnailAlt}
                loading={thumbnailLoading}
                fill
              />
            </motion.div>
            <div
              className="absolute bottom-0 inset-x-0 p-1.5 text-white"
            >
              <motion.h3
                className="font-pixel text-xl leading-tight truncate"
                layoutId={`${id}-title`}
              >
                {title}
              </motion.h3>
              <motion.ul
                className="w-full overflow-hidden flex gap-1"
                layoutId={`${id}-techs`}
              >
                {renderTechListItems}
              </motion.ul>
            </div>
          </motion.button>
        </Card>
      </div>
      <Modal
        classNames={{
          content: "w-full max-w-screen-md"
        }}
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
      >
        <Card asChild className="relative">
          <motion.div layoutId={`${id}-container`}>
            <motion.div
              className="relative aspect-video bg-gray-200"
              layoutId={`${id}-image`}
            >
              <Carousel
                className="size-full"
                data={mediaList}
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
            <button
              type="button"
              className="absolute transition bg-black/30 hover:bg-black/40 text-xl text-white p-2 top-4 right-4"
              aria-label="Close"
              onClick={() => setIsOpen(false)}
            >
              <IconX />
            </button>
            <div className="px-4 py-6 space-y-4">
              <motion.ul
                className="flex flex-wrap gap-1"
                layoutId={`${id}-techs`}
              >
                {renderTechListItems}
              </motion.ul>
              <motion.h2
                className="font-pixel text-6xl text-blue-500"
                layoutId={`${id}-title`}
              >
                {title}
              </motion.h2>
              <div>
                {project.fields.content ? (
                  <RichTextRender
                    richTextDocument={project.fields.content}
                  />
                ) : (
                  <p>{description}</p>
                )}
              </div>
              <ul className="flex flex-wrap gap-2">
                {renderLinkItems}
              </ul>
            </div>
          </motion.div>
        </Card>
      </Modal>
    </>
  )
}