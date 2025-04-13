import jsPDF from "jspdf";

export const exportResultToPDF = (fileName: string, content: string) => {
  const doc = new jsPDF();

  // Add content to the PDF
  doc.text(content, 10, 10);

  // Save the PDF with the given file name
  doc.save(`${fileName}.pdf`);
};
