import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const robotoSans = Roboto({
  variable: "--font-sans",
  weight: ["500", "700"],
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
      <body className={`${robotoSans.className} ${robotoSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
