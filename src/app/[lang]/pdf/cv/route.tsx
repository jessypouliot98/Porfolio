import ReactPDF from "@react-pdf/renderer";
import CvPage from "./cv.page";
import { NextRequest } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ lang: string }> }
) {
  const { lang } = await params;
  const pdfStream = await ReactPDF.renderToStream(<CvPage language={lang} />);
  return new Response(pdfStream as unknown as BodyInit, {
    headers: {
      "Content-Type": "application/pdf"
    }
  });
}