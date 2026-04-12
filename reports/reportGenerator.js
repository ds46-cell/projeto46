import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export default function generateReport(decision) {
  const file = path.join('reports', `decision-${decision.id}.pdf`);
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(file));

  doc.fontSize(18).text('Relatório de Decisão Estratégica');
  doc.moveDown();
  doc.text(`Título: ${decision.title}`);
  doc.text(`Status: ${decision.status}`);
  doc.text(`Risco: ${decision.riskScore}`);
  doc.text(`Responsável: ${decision.owner}`);
  doc.text(`Data: ${new Date().toLocaleDateString()}`);

  doc.end();
  return file;
}
