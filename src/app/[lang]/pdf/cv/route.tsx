import ReactPDF from "@react-pdf/renderer";
import CvPage from "./cv.page";
import { NextRequest } from "next/server";
import en from "./_translations_/en.json";
import fr from "./_translations_/fr.json";

type Params = {
  lang: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<Params> }
) {
  const { lang } = await params;
  let contentDisposition: string | undefined;
  if (request.nextUrl.searchParams.get("download") === "1") {
    contentDisposition = `attachment; filename="cv_${lang}_jessypouliot.pdf"`
  }

  const pdfStream = await ReactPDF.renderToStream(<CvPage t={lang === "fr" ? fr : en} />);
  return new Response(pdfStream as unknown as ReadableStream<any>, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": contentDisposition ?? "",
    }
  });
}