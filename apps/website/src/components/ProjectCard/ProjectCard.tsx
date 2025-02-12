"use client";

import { Card } from "@repo/ui/src/components/Card/Card"
import { motion } from "motion/react";
import React, { useMemo, useState } from "react";
import Image, { ImageProps } from "next/image"
import { Modal } from "@repo/ui/src/components/Modal/Modal";
import { IconLinkAlt, IconLinkExternal, IconX } from "@repo/ui/src/components/icons";
import { clsx } from "clsx";
import { ProjectEntry } from "@repo/api/src/contentful/project/model";
import { assertDefined } from "@repo/util/src/assertDefined";
import { contentfulImageProps } from "../../utils/cms/client";
import { RichTextRender } from "@repo/ui/src/components/contentful/RichTextRender/RichTextRender";
import { CarouselContext } from "@repo/ui/src/components/Carousel/CarouselContext";
import { ProjectCardTechList } from "./ProjectCard.TechList";
import { ProjectCardCarousel, ProjectCardCarouselDots, ProjectCardCarouselProvider } from "./ProjectCard.Carousel";
import { ProjectCardTitle } from "./ProjectCard.Title";
import Link from "next/link";
import { ProjectCardLinks } from "./ProjectCard.Links";
import { ProjectCardCarouselButtonOpenInNewTab } from "./ProjectCardCarousel.ButtonOpenInNewTab";

export type ProjectCardProps = {
  className?: string;
  project: ProjectEntry;
  thumbnailLoading?: ImageProps["loading"];
}

export function ProjectCard({ className, project, thumbnailLoading }: ProjectCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const id = project.sys.id
  const { description, title, thumbnail } = project.fields;
  const technologies = useMemo(() => project.fields.technologies.filter((tech) => !!tech), [project.fields.technologies]);
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
          className="block text-left size-full !bg-black"
          aria-description={description}
        >
          <motion.button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            layoutId={`${id}-container`}
          >
            <motion.div
              className="bg-black size-full relative"
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
                sizes="25vw"
              />
            </motion.div>
            <div
              className="absolute bottom-0 inset-x-0 p-1.5 text-white"
            >
              <ProjectCardTitle
                as="h3"
                id={id}
                className="font-pixel text-xl leading-tight truncate"
              >
                {title}
              </ProjectCardTitle>
              <ProjectCardTechList
                id={id}
                className="overflow-hidden"
                technologies={technologies}
              />
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
            <ProjectCardCarouselProvider mediaList={mediaList}>
              <div className="relative">
                <ProjectCardCarousel
                  id={project.sys.id}
                  className="aspect-video"
                />
                <Link
                  className="block absolute transition bg-black/30 hover:bg-black/40 backdrop-blur text-xl text-white p-2 top-4 left-4"
                  aria-label="Open page"
                  href={`/projects/${project.sys.id}`}
                >
                  <IconLinkAlt/>
                </Link>
                <button
                  type="button"
                  className="block absolute transition bg-black/30 hover:bg-black/40 backdrop-blur text-xl text-white p-2 top-4 right-4"
                  aria-label="Close"
                  onClick={() => setIsOpen(false)}
                >
                  <IconX/>
                </button>
                <ProjectCardCarouselButtonOpenInNewTab
                  className="absolute bottom-4 right-4"
                />
              </div>
              <ProjectCardCarouselDots/>
            </ProjectCardCarouselProvider>
            <div className="px-4 pt-4 pb-6 space-y-4">
              <ProjectCardTechList
                className="flex-wrap"
                id={id}
                technologies={technologies}
              />
              <Link
                className="transition-colors underline inline-block font-pixel text-6xl text-blue-500 hover:text-blue-600"
                href={`/projects/${project.sys.id}`}
              >
                <ProjectCardTitle
                  as="h2"
                  id={id}
                >
                  {title}
                </ProjectCardTitle>
              </Link>
              <div>
                {project.fields.content ? (
                  <RichTextRender
                    richTextDocument={project.fields.content}
                  />
                ) : (
                  <p>{description}</p>
                )}
              </div>
              {!!project.fields.links && (
                <ProjectCardLinks className="justify-end" links={project.fields.links} />
              )}
            </div>
          </motion.div>
        </Card>
      </Modal>
    </>
  )
}