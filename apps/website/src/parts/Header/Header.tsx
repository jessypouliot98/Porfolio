"use client"

import React, { useEffect, useRef, useState } from "react";
import { clsx } from "clsx";
import { MainMenu } from "../MainMenu/MainMenu";
import { Hero } from "../Hero/Hero";
import { convertRemToPixels } from "../../utils/css/convertRemToPixels";

export type HeaderProps = {
  className?: string;
};

export function Header({ className }: HeaderProps) {
  const [header, setHeader] = useState<HTMLElement | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!header) return;
    const abortController = new AbortController();

    let isTransparent = navRef.current?.getAttribute("data-transparent") !== "false";
    let rect = header.getBoundingClientRect();
    const observer = new ResizeObserver(() => {
      // TODO - Rate limit
      rect = header.getBoundingClientRect();
    });
    observer.observe(header, {});

    const update = () => {
      const overlapRem = getComputedStyle(header).getPropertyValue("--overlap");
      if (window.scrollY < rect.bottom - convertRemToPixels(parseFloat(overlapRem))) {
        if (!isTransparent) {
          navRef.current?.setAttribute("data-transparent", "true");
          isTransparent = true;
        }
      } else {
        if (isTransparent) {
          navRef.current?.setAttribute("data-transparent", "false");
          isTransparent = false;
        }
      }
    }

    window.addEventListener("scroll", update, { signal: abortController.signal });
    update();

    return () => {
      observer.disconnect();
      abortController.abort();
    }
  }, [header]);

  return (
    <header
      ref={setHeader}
      className={clsx(
        "pt-(--h-nav)",
        "bg-gradient-to-b from-neutral-900 from-70% to-transparent",
        className,
      )}
    >
      <nav
        ref={navRef}
        data-transparent={true}
        className={clsx(
          "group/nav transition-colors z-10 shadow fixed h-(--h-nav) top-0 inset-x-0",
          "bg-white/90 data-[transparent=true]:bg-white/10 backdrop-blur",
        )}
      >
        <MainMenu />
      </nav>
      <section id="hero" className="max-w-screen-2xl mx-auto px-6">
        <Hero/>
      </section>
    </header>
  )
}