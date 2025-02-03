import { createTw } from "react-pdf-tailwind";

export const tw = createTw({
  theme: {
    extend: {
      fontFamily: {
        "roboto-sans": "Roboto",
      }
    }
  }
});