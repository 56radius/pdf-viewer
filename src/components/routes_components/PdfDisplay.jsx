import React from "react";
import { Document, Page } from "react-pdf";

function PdfDisplay({ pdfUrl, pageNumber, onLoadSuccess, searchTerm }) {
  const customTextRenderer = ({ str }) => {
    if (!searchTerm || searchTerm.trim() === "") return str;

    const parts = str.split(new RegExp(`(${searchTerm})`, "gi"));

    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === searchTerm.toLowerCase() ? (
            <mark
              key={index}
              style={{
                backgroundColor: "yellow",
                color: "black",
                padding: "0 2px",
                borderRadius: "4px",
              }}
            >
              {part}
            </mark>
          ) : (
            <span key={index}>{part}</span>
          )
        )}
      </>
    );
  };

  return (
    <div className="flex justify-center">
      <Document file={pdfUrl} onLoadSuccess={onLoadSuccess}>
        <Page
          pageNumber={pageNumber}
          width={900}
          renderAnnotationLayer={false}
          renderTextLayer={true}
          customTextRenderer={customTextRenderer}
        />
      </Document>
    </div>
  );
}

export default PdfDisplay;
