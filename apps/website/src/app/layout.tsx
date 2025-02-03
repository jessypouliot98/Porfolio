import type { Metadata } from "next";
import { Lexend, Jersey_15 } from "next/font/google";
import "./globals.css";
import "@repo/ui/dist/styles.css"
import React from "react";
import { clsx } from "clsx";
import { MainMenu } from "../parts/MainMenu/MainMenu";

const lexendSans = Lexend({
  variable: "--font-sans",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

const micro5 = Jersey_15({
  variable: "--font-pixel",
  weight: ["400"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jessy Pouliot | Portfolio",
  description: "Experienced full-stack developer with 5 years of experience in the industry developing and maintaining web & mobile applications with a strong focus on Typescript based technologies such as Next.js and React-Native",
  keywords: "typescript, nextjs, react, react-native, tailwindcss, front end, back end, full-stack, software engineer, montreal, quebec, canada",
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
    <body className={`${lexendSans.className} ${lexendSans.variable} ${micro5.variable} antialiased bg-gray-50`}>
    <nav
      ref={navRef}
      data-transparent={true}
      className={clsx(
        "group/nav transition-colors z-10 shadow fixed h-(--h-nav) top-0 inset-x-0",
        "bg-white/90 data-[transparent=true]:bg-white/10 backdrop-blur",
      )}
    >
      <MainMenu/>
    </nav>
    {children}
    </body>
    </html>
  );
}
