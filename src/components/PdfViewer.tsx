import React from "react";
import { useLocation } from "react-router-dom";

const PdfViewer: React.FC = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  let pdfUrl = params.get("file");

  if (!pdfUrl) {
    return (
      <div className="h-screen flex justify-center items-center text-white text-lg">
        No PDF selected.
      </div>
    );
  }

  // Append #toolbar=0 to disable the download option
  pdfUrl += "#toolbar=0";

  return (
    <div className="h-screen flex flex-col">
      {/* PDF Display */}
      <iframe
        src={pdfUrl}
        className="flex-1 w-full pt-9 h-full"
        title="PDF Viewer"
      ></iframe>
    </div>
  );
};

export default PdfViewer;
