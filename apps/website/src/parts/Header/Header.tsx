"use client"

import React, { useLayoutEffect, useRef, useState } from "react";
import { clsx } from "clsx";
import { motion, useMotionValueEvent, useScroll, useTransform, easeIn } from "motion/react";

export type HeaderProps = {
  className?: string;
};

export function Header({ className }: HeaderProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [colors, setColors] = useState<[a: string, b: string]>(["#000", "#000"]);
  const animatedOpacity = useTransform(scrollY, [0, window.innerHeight-300], colors, {
    ease: easeIn
  });

  useMotionValueEvent(animatedOpacity, "change", (current) => {
    headerRef.current?.style.setProperty("--from", current);
  });

  useLayoutEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const a = getComputedStyle(header).getPropertyValue("--from-a");
    const b = getComputedStyle(header).getPropertyValue("--from-b");
    setColors([a, b]);
  }, []);

  return (
    <motion.header
      ref={headerRef}
      className={clsx(
        "[--from-a:theme(color.blue.950)] [--from-b:theme(color.blue.600)]",
        "[--from:var(--from-a)]",
        "bg-gradient-to-b from-(--from) from-90% to-transparent",
        className,
      )}
    >
      <nav className="sticky top-0 inset-x-0 bg-white px-2 h-14">
        <menu className="flex gap-2 w-full max-w-screen-2xl mx-auto">
          <li>Home</li>
          <li>Projects</li>
        </menu>
      </nav>
      <div className="h-[500px]"/>
    </motion.header>
  )
}