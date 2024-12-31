const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }

  async sendReport(email, reportPath, analysisData) {
    const mailOptions = {
      from: 'ABDOS Analysis <noreply@abdos.com>',
      to: email,
      subject: 'Your Skin Analysis Report',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c5282;">Your ABDOS Skin Analysis Report</h2>
          <p>Dear ${analysisData.patientName},</p>
          <p>Thank you for using ABDOS. Please find your skin analysis report attached to this email.</p>
          <p>Key Findings:</p>
          <ul>
            <li>Condition Detected: ${analysisData.condition}</li>
            <li>Confidence Level: ${analysisData.confidence}%</li>
            <li>Risk Level: ${analysisData.riskLevel}</li>
          </ul>
          <p style="color: #718096; font-size: 0.9em;">
            Note: This analysis is for informational purposes only. 
            Please consult with a healthcare professional for proper diagnosis and treatment.
          </p>
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
            <p style="color: #718096; font-size: 0.8em;">
              ABDOS - AI-Based Detection of Skin Cancer<br>
              This is an automated message, please do not reply.
            </p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: 'ABDOS-Analysis-Report.pdf',
          path: reportPath
        }
      ]
    };

    try {
      await this.transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error('Email sending failed:', error);
      throw error;
    }
  }
}

module.exports = EmailService; 