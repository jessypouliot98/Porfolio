import ReactPDF from "@react-pdf/renderer";
import CvPage from "./english.page";

export async function GET() {
  const pdfStream = await ReactPDF.renderToStream(<CvPage/>);
  return new Response(pdfStream as unknown as BodyInit, {
    headers: {
      "Content-Type": "application/pdf"
    }
  });
}