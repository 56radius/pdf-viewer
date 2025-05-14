import React, { useState, useEffect, useRef } from "react";
import { Document, Page } from "react-pdf";

function PdfDisplay({ pdfUrl, pageNumber, onLoadSuccess, searchTerm }) {
  const [textItems, setTextItems] = useState([]);
  const [pageDimensions, setPageDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef();

  // Called when Page text is loaded
  function onGetTextSuccess(items) {
    setTextItems(items);
  }

  // Called when page is rendered to get dimensions
  function onPageRenderSuccess(page) {
    const { width, height } = page.getViewport({ scale: 1 });
    setPageDimensions({ width, height });
  }

  // Find matches of searchTerm and return array of highlight styles (positions)
  const highlights = React.useMemo(() => {
    if (!searchTerm || !textItems.length) return [];

    const term = searchTerm.toLowerCase();
    const matches = [];

    textItems.forEach((item) => {
      const str = item.str.toLowerCase();
      let startIndex = 0;
      while (true) {
        const index = str.indexOf(term, startIndex);
        if (index === -1) break;

        // Calculate approximate position and width of matched substring inside item
        // Here we approximate by character width since pdf.js text items don't have per-char positions
        const charWidth = item.width / item.str.length;
        const highlightLeft = item.transform[4] + charWidth * index;
        const highlightWidth = charWidth * term.length;

        matches.push({
          top: item.transform[5] - item.height,
          left: highlightLeft,
          width: highlightWidth,
          height: item.height,
        });

        startIndex = index + term.length;
      }
    });

    return matches;
  }, [searchTerm, textItems]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: pageDimensions.width,
        height: pageDimensions.height,
        margin: "auto",
      }}
    >
      <Document file={pdfUrl} onLoadSuccess={onLoadSuccess}>
        <Page
          pageNumber={pageNumber}
          onGetTextSuccess={onGetTextSuccess}
          onRenderSuccess={onPageRenderSuccess}
          width={600}
        />
      </Document>

      {/* Highlights Layer */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
          width: pageDimensions.width,
          height: pageDimensions.height,
        }}
      >
        {highlights.map((hl, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              backgroundColor: "yellow",
              opacity: 0.4,
              top: hl.top,
              left: hl.left,
              width: hl.width,
              height: hl.height,
              pointerEvents: "none",
              borderRadius: 2,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default PdfDisplay;
