import { Font } from "@react-pdf/renderer";

// https://gist.github.com/karimnaaji/b6c9c9e819204113e9cabf290d580551

export function registerFonts() {
  // Disable word hyphenation
  Font.registerHyphenationCallback((word) => [word]);

  Font.register({
    family: "Roboto",
    fonts: [
      {
        src: "http://fonts.gstatic.com/s/roboto/v15/W5F8_SL0XFawnjxHGsZjJA.ttf",
        weight: 400,
      },
      {
        src: "http://fonts.gstatic.com/s/roboto/v15/hcKoSgxdnKlbH5dlTwKbow.ttf",
        weight: 400,
        fontStyle: "italic",
      },
      {
        src: "http://fonts.gstatic.com/s/roboto/v15/Uxzkqj-MIMWle-XP2pDNAA.ttf",
        weight: 500,
      },
      {
        src: "http://fonts.gstatic.com/s/roboto/v15/bdHGHleUa-ndQCOrdpfxfw.ttf",
        weight: 700,
      }
    ]
  });

  Font.registerEmojiSource({
    format: "png",
    url: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/",
  });
}