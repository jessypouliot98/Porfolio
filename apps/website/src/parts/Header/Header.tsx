"use client"

import React, { useEffect, useRef, useState } from "react";
import { clsx } from "clsx";
import { convertRemToPixels } from "../../utils/css/convertRemToPixels";
import { MainMenu } from "../MainMenu/MainMenu";

export type HeaderProps = {
  className?: string;
  backgroundContent?: React.ReactNode;
};

export function Header({ children, className, backgroundContent }: React.PropsWithChildren<HeaderProps>) {
  const [header, setHeader] = useState<HTMLElement | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!header) return;
    const abortController = new AbortController();

    let isTransparent = navRef.current?.getAttribute("data-transparent") !== "false";

    const update = () => {
      const headerBottom = header.offsetTop + header.offsetHeight;
      const overlapRem = getComputedStyle(header).getPropertyValue("--overlap");
      if (window.scrollY < headerBottom - convertRemToPixels(parseFloat(overlapRem))) {
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

    return () => abortController.abort();
  }, [header]);

  return (
    <header
      ref={setHeader}
      role="banner"
      className={clsx(
        "relative pt-(--h-nav)",
        "bg-gradient-to-b from-neutral-900 from-70% to-transparent",
        className,
      )}
    >
      <div className="absolute inset-0 overflow-hidden">
        {backgroundContent}
      </div>
      <nav
        ref={navRef}
        role="navigation"
        data-transparent={true}
        className={clsx(
          "group/nav transition-colors z-10 shadow fixed h-(--h-nav) top-0 inset-x-0",
          "bg-white/90 data-[transparent=true]:bg-white/10 backdrop-blur",
        )}
      >
        <MainMenu/>
      </nav>
      {children}
    </header>
  )
}