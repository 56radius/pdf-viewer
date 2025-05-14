import React from "react";
import PdfDisplay from "../routes_components/PdfDisplay";

const PdfModal = ({
  isOpen,
  onClose,
  pdfUrl,
  pageNumber,
  numPages,
  setPageNumber,
  onLoadSuccess,
  customTextRenderer,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-black font-bold text-xl"
        >
          X
        </button>
        <PdfDisplay
          pdfUrl={pdfUrl}
          pageNumber={pageNumber}
          onLoadSuccess={onLoadSuccess}
          customTextRenderer={customTextRenderer}
        />
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
    </div>
  );
};

export default PdfModal;
