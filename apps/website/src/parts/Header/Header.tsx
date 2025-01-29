"use client"

import React, { useEffect, useRef, useState } from "react";
import { clsx } from "clsx";
import { MainMenu } from "../MainMenu/MainMenu";

function convertRemToPixels(rem: number) {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

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
        "[--h-nav:theme(height.12)] pt-(--h-nav)",
        "[--from-header-a:theme(color.blue.950)] [--from-header-b:theme(color.gray.50)]",
        "[--from-header:var(--from-header-a)]",
        "bg-gradient-to-b from-(--from-header) from-90% to-transparent",
        className,
      )}
    >
      <nav
        ref={navRef}
        data-transparent={true}
        className={clsx(
          "group/nav transition-colors z-10 shadow fixed h-(--h-nav) top-0 inset-x-0",
          "bg-white data-[transparent=true]:bg-transparent",
        )}
      >
        <MainMenu />
      </nav>
      <section id="hero">
        <div className="h-[500px]"/>
      </section>
    </header>
  )
}