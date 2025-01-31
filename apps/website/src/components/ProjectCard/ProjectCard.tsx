"use client";

import { Card } from "@repo/ui/src/components/Card/Card"
import { motion } from "motion/react";
import React, { useState } from "react";
import Image, { ImageProps } from "next/image"
import { Modal } from "@repo/ui/src/components/Modal/Modal";
import { IconX } from "@repo/ui/src/components/icons";
import { clsx } from "clsx";
import { Badge } from "@repo/ui/src/components/Badge/Badge";

export type ProjectCardProps = {
  id: string;
  className?: string;
  title: string;
  thumbnail: string;
  technologies: string[]
  Content: React.ReactNode;
  description: string;
  thumbnailLoading?: ImageProps["loading"];
}

export function ProjectCard({ id, className, title, thumbnail, technologies, Content, description, thumbnailLoading }: ProjectCardProps) {
  const [isOpen, setIsOpen] = useState(false);

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
                src={thumbnail}
                alt={`${title} thumbnail`}
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
                {technologies.map((tech) => (
                  <li key={tech}>
                    <Badge>{tech}</Badge>
                  </li>
                ))}
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
              className="relative aspect-[21/9] bg-gray-200"
              layoutId={`${id}-image`}
            >
              <Image
                className="object-contain"
                src={thumbnail}
                alt={`${title} thumbnail`}
                loading={thumbnailLoading}
                fill
              />
            </motion.div>
            <button
              type="button"
              className="absolute transition bg-black/30 hover:bg-black/40 text-xl text-white p-2 top-4 right-4"
              onClick={() => setIsOpen(false)}
            >
              <IconX />
            </button>
            <div className="px-4 py-6 space-y-4">
              <motion.ul
                className="flex flex-wrap gap-1"
                layoutId={`${id}-techs`}
              >
                {technologies.map((tech) => (
                  <li key={tech}>
                    <Badge>{tech}</Badge>
                  </li>
                ))}
              </motion.ul>
              <motion.h3
                className="font-pixel text-5xl text-blue-500"
                layoutId={`${id}-title`}
              >
                {title}
              </motion.h3>
              <div>
                {Content}
              </div>
            </div>
          </motion.div>
        </Card>
      </Modal>
    </>
  )
}