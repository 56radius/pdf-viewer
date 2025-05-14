import React from "react";
import { Document, Page } from "react-pdf";

function PdfDisplay({ pdfUrl, pageNumber, onLoadSuccess, customTextRenderer }) {
  return (
    <div className="flex justify-center items-start w-full h-full overflow-auto bg-gray-200 p-4 rounded-lg">
      <div className="bg-white shadow-xl rounded-md p-4 max-w-[900px] w-full">
        <Document file={pdfUrl} onLoadSuccess={onLoadSuccess}>
          <Page
            pageNumber={pageNumber}
            customTextRenderer={customTextRenderer}
            renderAnnotationLayer={false}
            renderTextLayer={true}
            width={800}
          />
        </Document>
      </div>
    </div>
  );
}

export default PdfDisplay;
