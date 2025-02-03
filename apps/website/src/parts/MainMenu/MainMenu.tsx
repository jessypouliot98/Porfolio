import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { clsx } from "clsx";
import { assertDefined } from "@repo/util/src/assertDefined";
import { convertRemToPixels } from "../../utils/css/convertRemToPixels";

const SECTIONS = [
  "hero",
  "projects",
  "technologies"
] as const;

const LABELS = {
  hero: "Presentation",
  projects: "Projects",
  technologies: "Technologies",
} satisfies Record<typeof SECTIONS[number], string>

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
        assertDefined(el, "element not defined");
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
    <menu className="flex px-6 w-full h-full max-w-screen-2xl mx-auto">
      {SECTIONS.map((section) => (
        <Item
          key={section}
          href={`/#${section}`}
          label={LABELS[section]}
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

function Item({ href, label, selected }: ItemProps) {
  return (
    <li
      className="group/item"
    >
      <Link
        className={clsx(
          "transition-colors flex justify-center items-center h-full px-3 pb-1 pt-1.5 border-b-4",
          "text-black group-data-[transparent=true]/nav:text-white",
          "bg-transparent hover:bg-gray-500/10",
          "border-transparent aria-[current=page]/item:border-blue-500",
        )}
        href={href}
        aria-current={selected ? "page" : false}
      >
        {label}
      </Link>
    </li>
  )
}