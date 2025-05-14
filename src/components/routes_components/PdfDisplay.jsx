import React from "react";
import { Document, Page } from "react-pdf";

function PdfDisplay({ pdfUrl, pageNumber, onLoadSuccess, customTextRenderer }) {
  return (
    <div className="mt-8 w-full max-w-4xl overflow-x-auto">
      <Document file={pdfUrl} onLoadSuccess={onLoadSuccess}>
        <Page pageNumber={pageNumber} customTextRenderer={customTextRenderer} />
      </Document>
    </div>
  );
}

export default PdfDisplay;
