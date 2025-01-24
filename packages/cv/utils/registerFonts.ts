import { Font } from "@react-pdf/renderer";
import { resolve as pathResolve } from "node:path";


export function registerFonts(fontPath: string) {
  // Disable word hyphenation
  Font.registerHyphenationCallback((word) => [word]);

  Font.register({
    family: "Roboto",
    fonts: [
      {
        src: pathResolve(fontPath, "Roboto-Regular.ttf"),
        weight: 500,
      },
      {
        src: pathResolve(fontPath, "Roboto-Italic.ttf"),
        weight: 500,
        fontStyle: "italic",
      },
      {
        src: pathResolve(fontPath, "Roboto-Medium.ttf"),
        weight: 600,
      },
      {
        src: pathResolve(fontPath, "Roboto-Bold.ttf"),
        weight: 700,
      }
    ]
  });

  Font.registerEmojiSource({
    format: "png",
    url: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/",
  });
}