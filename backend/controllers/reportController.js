const ReportGenerator = require('../services/reportGenerator');
const EmailService = require('../services/emailService');
const fs = require('fs').promises;

class ReportController {
  constructor() {
    this.reportGenerator = new ReportGenerator();
    this.emailService = new EmailService();
  }

  async generateAndSendReport(req, res) {
    try {
      const { analysisData, patientInfo } = req.body;

      // Generate PDF report
      const reportPath = await this.reportGenerator.generateReport(analysisData, patientInfo);

      // Send email with report
      await this.emailService.sendReport(patientInfo.email, reportPath, analysisData);

      // Clean up temporary file
      await fs.unlink(reportPath);

      res.status(200).json({
        success: true,
        message: 'Report generated and sent successfully'
      });
    } catch (error) {
      console.error('Report generation failed:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to generate and send report',
        error: error.message
      });
    }
  }
}

module.exports = ReportController; 