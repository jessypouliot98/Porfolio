import React from "react";
import { IconLogoLinkedin } from "@repo/ui/src/components/icons"

export function Footer() {
  return (
    <footer className="py-12 bg-black text-white space-y-6">
      <menu className="flex text-xl px-6 gap-4">
        <li>
          <a
            className="size-[2em] grid place-items-center transition-colors bg-transparent hover:bg-white/30"
            href="https://linkedin.com/in/jessypouliot"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconLogoLinkedin/>
          </a>
        </li>
        <li>
          <a
            className="size-[2em] grid place-items-center transition-colors bg-transparent hover:bg-white/30"
            href="https://linkedin.com/in/jessypouliot"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconLogoLinkedin/>
          </a>
        </li>
      </menu>
      <div className="max-w-screen-2xl mx-auto px-6 text-sm">
        &copy; {new Date().getFullYear()} Jessy Pouliot, All rights reserved.
      </div>
    </footer>
  )
}