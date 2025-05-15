import React, { useState, useRef, useEffect } from "react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

function PdfDisplay({ pdfUrl, pageNumber, onLoadSuccess, searchTerm }) {
  const [pageDimensions, setPageDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef();

  // Called when page is rendered to get dimensions
  function onPageRenderSuccess(page) {
    const { width, height } = page.getViewport({ scale: 1 });
    setPageDimensions({ width, height });
  }

  // Function to highlight matched words inside the PDF text layer
  const highlightText = () => {
    if (!containerRef.current) return;
    if (!searchTerm) {
      // If no search term, clear all previous highlights
      const marks = containerRef.current.querySelectorAll("mark");
      marks.forEach((mark) => {
        const parent = mark.parentNode;
        parent.replaceChild(document.createTextNode(mark.textContent), mark);
        parent.normalize();
      });
      return;
    }

    const textLayer = containerRef.current.querySelector(".react-pdf__Page__textContent");

    if (!textLayer) return;

    // First clear previous highlights to avoid stacking
    const previousMarks = textLayer.querySelectorAll("mark");
    previousMarks.forEach((mark) => {
      const parent = mark.parentNode;
      parent.replaceChild(document.createTextNode(mark.textContent), mark);
      parent.normalize();
    });

    // Highlight all matching text nodes
    const regex = new RegExp(searchTerm, "gi");

    const walk = (node) => {
      if (node.nodeType === 3) {
        // Text node
        const matches = node.data.match(regex);
        if (matches) {
          const frag = document.createDocumentFragment();
          let lastIndex = 0;

          node.data.replace(regex, (match, index) => {
            // Append text before match
            frag.appendChild(document.createTextNode(node.data.substring(lastIndex, index)));
            // Append highlighted match
            const mark = document.createElement("mark");
            mark.style.backgroundColor = "yellow";
            mark.style.color = "black";
            mark.textContent = match;
            frag.appendChild(mark);
            lastIndex = index + match.length;
          });
          // Append remaining text
          frag.appendChild(document.createTextNode(node.data.substring(lastIndex)));
          node.parentNode.replaceChild(frag, node);
        }
      } else if (node.nodeType === 1 && node.childNodes && !["SCRIPT", "STYLE", "MARK"].includes(node.tagName)) {
        // Element node — recurse into children except SCRIPT, STYLE, MARK
        for (let i = 0; i < node.childNodes.length; i++) {
          walk(node.childNodes[i]);
        }
      }
    };

    walk(textLayer);
  };

  // Run highlightText when the component mounts and when searchTerm or page changes
  useEffect(() => {
    highlightText();
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
