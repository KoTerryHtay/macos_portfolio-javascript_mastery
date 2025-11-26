import { Download } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import WindowWrapper from "@/hoc/WindowWrapper";
import { WindowControls } from "@/components";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.min.mjs",
//   import.meta.url
// ).toString();

function Resume() {
  return (
    <>
      <div id="window-header">
        <WindowControls target="resume" />
        <h2>Resume.pdf</h2>

        <a
          href="files/resume.pdf"
          download
          className="cursor-pointer"
          title="Download resume"
        >
          <Download className="icon" />
        </a>
      </div>

      <Document
        file="files/resume.pdf"
        onLoadError={(e) => console.log(e.message)}
        onSourceError={(e) => console.log("onSourceError >>>", e.message)}
        loading={<p>Loading PDF...</p>}
        error={<div>Failed to load PDF.</div>}
      >
        <Page
          pageNumber={1}
          renderTextLayer
          renderAnnotationLayer
          loading={<div>Loading page...</div>}
        />
      </Document>
    </>
  );
}

const ResumeWindow = WindowWrapper(Resume, "resume");
export default ResumeWindow;
