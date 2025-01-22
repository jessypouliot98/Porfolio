import ReactPDF from "@react-pdf/renderer";
import CvPage from "./cv.page";
import { NextRequest } from "next/server";
import en from "./_translations_/en.json";
import fr from "./_translations_/fr.json";

type Params = {
  lang: string;
  variant: string;
}

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<Params> }
) {
  const { lang, variant } = await params;
  const Page = variant === "compact" ? CvPage : CvPage;
  const pdfStream = await ReactPDF.renderToStream(<Page t={lang === "fr" ? fr : en} />);
  return new Response(pdfStream as unknown as BodyInit, {
    headers: {
      "Content-Type": "application/pdf"
    }
  });
}