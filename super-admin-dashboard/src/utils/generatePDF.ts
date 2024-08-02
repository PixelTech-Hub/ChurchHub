import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface PDFColumn {
  header: string;
  accessor: string;
}

interface PDFData<T> {
  columns: PDFColumn[];
  data: T[];
  filename: string;
}

const generatePDF = <T>({ columns, data, filename }: PDFData<T>) => {
  const doc = new jsPDF();
  
  // Generate table data
  const tableHeaders = columns.map(col => col.header);
  const tableBody = data.map(item =>
    columns.map(col => (item as any)[col.accessor])
  );

  (doc as any).autoTable({
    head: [tableHeaders],
    body: tableBody,
    startY: 20,
  });

  doc.save(filename);
};

export default generatePDF;
