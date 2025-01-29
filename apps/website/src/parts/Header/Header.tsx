"use client"

import React, { ComponentPropsWithoutRef, useEffect, useLayoutEffect, useRef, useState } from "react";
import { clsx } from "clsx";
import { motion, useMotionValueEvent, useScroll, useTransform, easeIn } from "motion/react";

export type HeaderProps = {
  className?: string;
};

export function Header({ className }: HeaderProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const animatedOpacity = useTransform(scrollY, [0, window.innerHeight], [1, 0.5], {
    ease: easeIn
  });
  const colorRef = useRef("#000"/* temp value */);

  useMotionValueEvent(animatedOpacity, "change", (current) => {
    headerRef.current?.style.setProperty("--from", `color-mix(in oklab, ${colorRef.current} ${current * 100}%, transparent)`);
  });

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const value = getComputedStyle(header).getPropertyValue("--color");
    colorRef.current = value;
  }, []);

  return (
    <motion.header
      ref={headerRef}
      className={clsx(
        "[--color:theme(color.blue.950)] [--from:var(--color)]",
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