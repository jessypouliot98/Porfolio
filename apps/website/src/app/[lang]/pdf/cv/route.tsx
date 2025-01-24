import ReactPDF from "@react-pdf/renderer";
import { NextRequest } from "next/server";
import { CvPage } from "@repo/cv/pages/CvPage/CvPage";
import en from "@repo/cv/translations/en.json"
import fr from "@repo/cv/translations/fr.json"
import { registerFonts } from "@repo/cv/utils/registerFonts";
import path from "path";

type Params = {
  lang: string;
}

const fontPath = path.resolve(process.cwd(), "../../node_modules/@repo/cv/fonts");
registerFonts(fontPath);

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
  return new Response(pdfStream as unknown as ReadableStream<unknown>, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": contentDisposition ?? "",
    }
  });
}