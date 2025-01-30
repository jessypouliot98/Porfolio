import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@repo/ui/src/components/Button/Button";
import { clsx } from "clsx";
import { assertDefined } from "@repo/util/src/assertDefined";
import { convertRemToPixels } from "../../utils/css/convertRemToPixels";

const SECTIONS = [
  "hero",
  "projects",
  "technologies"
] as const;

export function MainMenu() {
  const [currentSection, setCurrentSection] = useState<string>(SECTIONS[0]);
  const currentSectionRef = useRef(currentSection);
  currentSectionRef.current = currentSection;

  useEffect(() => {
    const abortController = new AbortController();

    const navHeightRem = parseFloat(getComputedStyle(document.body).getPropertyValue("--h-nav"));
    const navOffset = convertRemToPixels(navHeightRem) + 1;

    const sections = SECTIONS
      .map((sectionId) => {
        const el = document.getElementById(sectionId);
        assertDefined(el);
        return {
          id: sectionId,
          el,
        };
      })
      .sort((a, b) => b.el.offsetTop - a.el.offsetTop);

    window.addEventListener(
      "scroll",
      () => {
        const section = sections.find(({ el }) => el.offsetTop <= window.scrollY + navOffset);
        const id = section?.id ?? SECTIONS[0];
        if (id === currentSectionRef.current) return;
        setCurrentSection(id);
      },
      { signal: abortController.signal }
    );

    return () => abortController.abort();
  }, []);

  return (
    <menu className="flex gap-4 px-6 py-2 w-full h-full max-w-screen-2xl mx-auto">
      {SECTIONS.map((section) => (
        <Item
          key={section}
          href={`/#${section}`}
          label={section}
          selected={currentSection === section}
        />
      ))}
    </menu>
  )
}

type ItemProps = {
  href: string;
  selected: boolean;
  label: string;
}

function Item({ href, selected, label }: ItemProps) {
  return (
    <li
      className="group/item"
      aria-selected={selected}
    >
      <Button asChild className={clsx(
        "transition-colors flex justify-center items-center h-full px-2 py-1",
        selected
          ? "bg-blue-500 hover:bg-blue-600 text-white"
          : clsx(
            "bg-transparent hover:bg-blue-500/70 text-black hover:text-white",
            "group-data-[transparent=true]/nav:text-white"
          )
      )}>
        <Link
          href={href}
        >
          {label}
        </Link>
      </Button>
    </li>
  )
}