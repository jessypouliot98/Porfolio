import type { Config } from "tailwindcss";
import sharedConfig from "@repo/config-tailwind/tailwind.config";

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

export default config;