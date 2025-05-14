import React, { useState } from "react";
import PdfDisplay from "../routes_components/PdfDisplay";

const PdfModal = ({
  isOpen,
  onClose,
  pdfUrl,
  pageNumber,
  numPages,
  setPageNumber,
  onLoadSuccess,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-[90%] max-w-6xl h-[90%] bg-gray-100 rounded-2xl shadow-2xl p-6 flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/80 rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold transition"
        >
          &times;
        </button>

        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search text..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* PDF Display */}
        <div className="flex-1 overflow-auto rounded-md bg-white shadow-inner p-4 border">
          <PdfDisplay
            pdfUrl={pdfUrl}
            pageNumber={pageNumber}
            onLoadSuccess={onLoadSuccess}
            searchTerm={searchTerm}
          />
        </div>

        {/* Navigation */}
        <div className="mt-4 flex justify-between items-center text-gray-700 text-sm sm:text-base">
          <button
            onClick={() => setPageNumber(pageNumber - 1)}
            disabled={pageNumber <= 1}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed transition"
          >
            ◀ Previous
          </button>
          <span className="mx-4 font-medium">
            Page <span className="text-indigo-600">{pageNumber}</span> of{" "}
            <span className="text-indigo-600">{numPages}</span>
          </span>
          <button
            onClick={() => setPageNumber(pageNumber + 1)}
            disabled={pageNumber >= numPages}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed transition"
          >
            Next ▶
          </button>
        </div>
      </div>
    </div>
  );
};

export default PdfModal;
