import React from 'react';
import { useRef } from 'react';
import html2pdf from 'html2pdf.js';

const PDFExport = ({ resumeData, selectedTemplate }) => {
  const resumeRef = useRef(null);

  const handleExportPDF = () => {
    const element = resumeRef.current;
    const opt = {
      margin: 1,
      filename: `${resumeData.personalInfo.fullName}-resume.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <div>
      <button
        onClick={handleExportPDF}
        className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
      >
        Export to PDF
      </button>
      <div ref={resumeRef} className="hidden">
        {selectedTemplate === 'classic' && <ClassicTemplate resumeData={resumeData} />}
        {selectedTemplate === 'modern' && <ModernTemplate resumeData={resumeData} />}
        {selectedTemplate === 'creative' && <CreativeTemplate resumeData={resumeData} />}
      </div>
    </div>
  );
};

export default PDFExport; 