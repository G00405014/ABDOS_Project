const PDFDocument = require('pdfkit');
const nodemailer = require('nodemailer');
const fs = require('fs');

class ReportGenerator {
  constructor() {
    this.doc = new PDFDocument();
  }

  async generateReport(analysisData, patientInfo) {
    return new Promise((resolve, reject) => {
      try {
        const fileName = `report-${Date.now()}.pdf`;
        const filePath = `./temp/${fileName}`;

        // Create PDF
        this.doc.pipe(fs.createWriteStream(filePath));

        // Add header
        this.doc
          .image('logo.png', 50, 45, { width: 50 })
          .fillColor('#444444')
          .fontSize(20)
          .text('ABDOS Skin Analysis Report', 110, 57)
          .fontSize(10)
          .text(`Report Date: ${new Date().toLocaleDateString()}`, 200, 65, { align: 'right' })
          .moveDown();

        // Add patient info
        this.doc
          .fontSize(12)
          .text(`Patient Name: ${patientInfo.name}`)
          .text(`Email: ${patientInfo.email}`)
          .text(`Analysis ID: ${analysisData.id}`)
          .moveDown();

        // Add analysis results
        this.doc
          .fontSize(14)
          .text('Analysis Results', { underline: true })
          .moveDown();

        // Add condition details
        this.doc
          .fontSize(12)
          .text(`Detected Condition: ${analysisData.condition}`)
          .text(`Confidence Level: ${analysisData.confidence}%`)
          .text(`Risk Level: ${analysisData.riskLevel}`)
          .moveDown();

        // Add recommendations
        this.doc
          .fontSize(14)
          .text('Recommendations', { underline: true })
          .moveDown()
          .fontSize(12)
          .text(analysisData.recommendations)
          .moveDown();

        // Add disclaimer
        this.doc
          .fontSize(10)
          .fillColor('#999999')
          .text('DISCLAIMER: This report is for informational purposes only and should not be considered as medical advice. Please consult with a healthcare professional for proper diagnosis and treatment.');

        // Finalize PDF
        this.doc.end();

        resolve(filePath);
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = ReportGenerator; 