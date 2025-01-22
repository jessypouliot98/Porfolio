import { Font } from "@react-pdf/renderer";
import path from "node:path";


export function registerFonts() {
  const fontPath = path.resolve(process.cwd(), "public/fonts");

  Font.register({
    family: 'Roboto',
    fonts: [
      {
        src: path.resolve(fontPath, "Roboto-Regular.ttf"),
        weight: 500,
      },
      {
        src: path.resolve(fontPath, "Roboto-Medium.ttf"),
        weight: 600,
      },
      {
        src: path.resolve(fontPath, "Roboto-Bold.ttf"),
        weight: 700,
      }
    ]
  });

  Font.registerEmojiSource({
    format: "png",
    url: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/",
  });
}