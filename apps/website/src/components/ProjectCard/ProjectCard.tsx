"use client";

import { Card } from "@repo/ui/src/components/Card/Card"
import { motion } from "motion/react";
import React, { useState } from "react";
import Image from "next/image"
import { Modal } from "@repo/ui/src/components/Modal/Modal";
import { GoLink, GoX } from "@repo/ui/src/components/icons";
import { clsx } from "clsx";
import { Badge } from "@repo/ui/src/components/Badge/Badge";
import Link from "next/link";

export type ProjectCardProps = {
  id: string;
  className?: string;
  title: string;
  thumbnail: string;
  technologies: string[]
  Content: React.ReactNode;
}

export function ProjectCard({ id, className, title, thumbnail, technologies, Content }: ProjectCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className={clsx(
        "transition scale-100 hover:scale-105 focus-within:scale-105",
        "aspect-video bg-gray-200",
        className,
      )}>
        <Card
          asChild
          id={id}
          className="block relative text-left size-full"
        >
          <motion.button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            layoutId={`${id}-container`}
          >
            <motion.div
              className="size-full"
              layoutId={`${id}-image`}
            >
              <Image
                className="object-cover"
                src={thumbnail}
                alt={`${title} thumbnail`}
                fill
              />
            </motion.div>
            <div
              className="absolute bottom-0 inset-x-0 p-1.5 pt-6 text-white bg-gradient-to-t from-black/70 via-black/70 to-transparent"
            >
              <motion.h2
                className="font-pixel text-xl leading-tight"
                layoutId={`${id}-title`}
              >
                {title}
              </motion.h2>
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
                fill
              />
            </motion.div>
            <div className="absolute top-4 left-4 flex gap-4">
              <Link
                href={`/projects/${id}`}
                className="transition bg-black/30 hover:bg-black/40 text-xl text-white p-2"
              >
                <GoLink/>
              </Link>
            </div>
            <button
              type="button"
              className="absolute transition bg-black/30 hover:bg-black/40 text-xl text-white p-2 top-4 right-4"
              onClick={() => setIsOpen(false)}
            >
              <GoX />
            </button>
            <div className="px-4 py-6 space-y-4">
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
              <motion.h2
                className="font-pixel text-5xl text-blue-500"
                layoutId={`${id}-title`}
              >
                {title}
              </motion.h2>
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