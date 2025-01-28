import sharedConfig from "@repo/config-tailwind";
import { createTw } from "react-pdf-tailwind";
import type { Config } from "tailwindcss";

const config: Pick<Config, "presets" | "content" | "theme"> = {
  // None required for this package
  content: [],
  presets: [sharedConfig],
  theme: {
    extend: {
      fontFamily: {
        "roboto-sans": "Roboto",
      }
    }
  }
};

export const tw = createTw(config);