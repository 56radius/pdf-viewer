import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// Set up PDF worker
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

function PdfViewer() {
  const [isDragging, setIsDragging] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); // 🔍 NEW
  const [searchActive, setSearchActive] = useState(false); // ✅ NEW

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
      uploadFile(file);
    } else {
      alert("Please drop a valid PDF file.");
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
      uploadFile(file);
    } else {
      alert("Please select a valid PDF file.");
    }
  };

  const uploadFile = (file) => {
    const fileUrl = URL.createObjectURL(file);
    setPdfUrl(fileUrl);
    setPageNumber(1);
  };

  const onLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  // ✨ Custom highlight for matched text
  const customTextRenderer = (textItem) => {
    if (!searchTerm || !searchActive) return textItem.str;

    const parts = textItem.str.split(new RegExp(`(${searchTerm})`, "gi"));

    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === searchTerm.toLowerCase() ? (
            <mark key={i} style={{ backgroundColor: "yellow", padding: "1px 2px" }}>
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <div className="full-screen bg-gray-100 overflow-hidden min-h-screen">
      {/* Header */}
      <section className="w-full">
        <header className="bg-white shadow-md border-b border-gray-200">
          <div className="w-full sm:px-6 lg:px-8 xl:px-12">
            <div className="flex items-center justify-between h-16 lg:h-[72px]">
              <div className="flex items-center flex-shrink-0">
                <a href="#" className="inline-flex">
                  <h2 className="text-black text-lg font-semibold">Pdf Viewer</h2>
                </a>
              </div>
              {/* 🔍 Search Input */}
              {pdfUrl && (
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Search text..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 text-sm"
                  />
                  <button
                    onClick={() => setSearchActive(true)}
                    className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
                  >
                    Search
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>
      </section>

      {/* Upload Section */}
      <section className="p-6 flex flex-col items-center justify-center text-center mt-16">
        <h2 className="text-3xl font-bold text-black mb-2">Pdf Viewer App</h2>
        <p className="text-gray-600 mb-8 text-lg">
          View pdf in seconds. Easily adjust orientation and margins.
        </p>

        <div
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={`transition-all duration-300 w-full max-w-md p-10 rounded-xl border-2 border-dashed bg-white flex flex-col items-center justify-center cursor-pointer
            ${isDragging ? "border-indigo-600 bg-indigo-50 scale-105 shadow-xl" : "border-gray-300 hover:shadow-lg"}`}
        >
          <svg className="w-12 h-12 text-indigo-500 mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <p className="text-gray-600">
            {isDragging ? "Drop your file here" : "Select file or drop PDF here"}
          </p>
          <button
            onClick={() => document.getElementById("file-input").click()}
            className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200"
          >
            Select Pdf File
          </button>
          <input
            id="file-input"
            type="file"
            accept="application/pdf"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {/* PDF Viewer */}
        {pdfUrl && (
          <div className="mt-8 w-full max-w-4xl overflow-x-auto">
            <Document file={pdfUrl} onLoadSuccess={onLoadSuccess}>
              <Page pageNumber={pageNumber} customTextRenderer={customTextRenderer} />
            </Document>

            <div className="mt-4 flex justify-between">
              <button
                onClick={() => setPageNumber(pageNumber - 1)}
                disabled={pageNumber <= 1}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:bg-gray-300"
              >
                Previous
              </button>
              <span className="text-lg text-gray-700 self-center">
                Page {pageNumber} of {numPages}
              </span>
              <button
                onClick={() => setPageNumber(pageNumber + 1)}
                disabled={pageNumber >= numPages}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:bg-gray-300"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer style={{ bottom: -350, position: "relative" }} className="mt-auto py-4 bg-white text-center border-t border-gray-200 text-gray-600 text-sm">
        © pdfViewer 2025 ® All Rights Reserved
      </footer>
    </div>
  );
}

export default PdfViewer;
