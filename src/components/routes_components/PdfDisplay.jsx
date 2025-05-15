import React, { useState, useRef, useEffect } from "react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

function PdfDisplay({ pdfUrl, pageNumber, onLoadSuccess, searchTerm }) {
  const [pageDimensions, setPageDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef();
  const textLayerRef = useRef();

  function onPageRenderSuccess(page) {
    const { width, height } = page.getViewport({ scale: 1 });
    setPageDimensions({ width, height });
  }

  // Highlight function
  useEffect(() => {
    if (!searchTerm) return;

    const textLayer = containerRef.current?.querySelector(".react-pdf__Page__textContent");
    if (!textLayer) return;

    // Clear old highlights
    textLayer.querySelectorAll("span").forEach((span) => {
      const original = span.getAttribute("data-original-text");
      if (original) {
        span.innerHTML = original;
      }
    });

    // Highlight new terms
    const regex = new RegExp(`(${searchTerm})`, "gi");

    textLayer.querySelectorAll("span").forEach((span) => {
      const text = span.textContent;
      if (!text) return;

      const markedText = text.replace(regex, `<mark style="background: yellow; color: black;">$1</mark>`);
      if (text !== markedText) {
        span.setAttribute("data-original-text", text); // store original
        span.innerHTML = markedText;
      }
    });
  }, [searchTerm, pageNumber]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: pageDimensions.width || 600,
        height: pageDimensions.height || "auto",
        margin: "auto",
      }}
    >
      <Document file={pdfUrl} onLoadSuccess={onLoadSuccess}>
        <Page
          pageNumber={pageNumber}
          onRenderSuccess={onPageRenderSuccess}
          width={600}
        />
      </Document>
    </div>
  );
}

export default PdfDisplay;
