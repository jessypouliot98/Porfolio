"use client";

import { Card } from "@repo/ui/src/components/Card/Card"
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const img = "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

export type ProjectCardProps = {
  id: string;
  className?: string;
}

export function ProjectCard({ id, className }: ProjectCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Card asChild id={id} className={className}>
        <button type="button" onClick={() => setIsOpen((prev) => !prev)}>
          <motion.div
            className="ui-aspect-video ui-bg-cover ui-bg-left-top"
            style={{ backgroundImage: `url(${img})` }}
            layoutId={id}
          />
        </button>
      </Card>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 bg-black/30 bg-blur">
            <div className="p-8 max-w-screen-md mx-auto">
              <Card className="relative p-4">
                <motion.div
                  className="aspect-video bg-cover bg-center"
                  style={{ backgroundImage: `url(${img})` }}
                  layoutId={id}
                />
                <button
                  className="bg-white/30 text-black size-12 rounded-full absolute top-4 right-4"
                  type="button"
                  onClick={() => setIsOpen(false)}
                >
                  X
                </button>
              </Card>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}