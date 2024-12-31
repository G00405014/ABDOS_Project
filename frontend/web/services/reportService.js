class ReportService {
  static async generateReport(analysisData, patientInfo) {
    try {
      const response = await fetch('/api/report/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          analysisData,
          patientInfo
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to generate report');
      }

      return data;
    } catch (error) {
      console.error('Report generation failed:', error);
      throw error;
    }
  }
}

export default ReportService; 