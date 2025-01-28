"use client";

import { Card } from "@repo/ui/src/components/Card/Card"
import { motion, useScroll } from "motion/react";
import { useRef, useState } from "react";
import { Modal } from "@repo/ui/src/components/Modal/Modal";

const img = "https://images.unsplash.com/photo-1547039996-61c1135690c0?q=80&w=2889&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

export type ProjectCardProps = {
  id: string;
  className?: string;
}

export function ProjectCard({ id, className }: ProjectCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Card asChild id={id} className={className}>
        <motion.button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          layoutId={`${id}-container`}
        >
          <motion.div
            className="aspect-square bg-cover bg-left-top"
            style={{ backgroundImage: `url(${img})` }}
            layoutId={`${id}-image`}
          />
        </motion.button>
      </Card>
      <Modal
        classNames={{
          content: "w-full max-w-screen-lg"
        }}
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
      >
        <Card asChild>
          <motion.div layoutId={`${id}-container`}>
            <motion.div
              className="aspect-[21/9] bg-cover bg-center"
              style={{ backgroundImage: `url(${img})` }}
              layoutId={`${id}-image`}
            />
            <div className="px-4 py-6">
              <h2 className="font-medium text-4xl">{id}</h2>
              <div className="bg-red-500 pb-[1000px]"/>
            </div>
          </motion.div>
        </Card>
      </Modal>
    </>
  )
}