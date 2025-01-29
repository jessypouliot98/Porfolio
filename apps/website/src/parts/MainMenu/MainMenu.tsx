import React from "react";
import Link from "next/link";
import { Button } from "@repo/ui/src/components/Button/Button";
import { clsx } from "clsx";

export function MainMenu() {
  return (
    <menu className="flex gap-4 px-6 py-2 w-full h-full max-w-screen-2xl mx-auto">
      <Item
        href="/#hero"
        label="Home"
        selected={false}
      />
      <Item
        href="/#projects"
        label="Projects"
        selected={true}
      />
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
        "bg-transparent hover:bg-blue-100",
        "text-black group-data-[transparent=true]/nav:text-white group-aria-selected/item:text-white",
        "group-aria-selected/item:bg-blue-500 group-aria-selected/item:hover:bg-blue-600"
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