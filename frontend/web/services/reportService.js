class ReportService {
  static async generateReport(analysisData, patientInfo) {
    try {
      console.log('Generating report with data:', {
        disease: analysisData.condition,
        confidence: analysisData.confidence,
        patientInfo
      });
      
      // Get the token from localStorage
      const token = localStorage.getItem('accessToken');
      if (!token) {
        console.error('No access token found in localStorage');
        throw new Error('Authentication required. Please login first.');
      }
      
      console.log('Using token:', token.substring(0, 10) + '...');
      
      try {
        // Use Next.js API route to avoid CORS issues
        const response = await fetch('/api/report/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            disease: analysisData.condition,
            confidence: analysisData.confidence
          })
        });

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          // If not JSON, likely an HTML error page
          throw new Error('Server returned non-JSON response. Using fallback report generation.');
        }

        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || data.message || 'Failed to generate report');
        }

        return data;
      } catch (apiError) {
        console.log('API error, using fallback local report generation:', apiError.message);
        // Fallback to local report generation
        return this.generateLocalReport(analysisData.condition, analysisData.confidence);
      }
    } catch (error) {
      console.error('Report generation failed:', error);
      throw error;
    }
  }
  
  static generateLocalReport(disease, confidence) {
    // Generate a local report without requiring the backend
    console.log('Generating local report for', disease, 'with confidence', confidence);
    
    // Standardize disease name
    const diseaseLower = disease.toLowerCase().trim();
    
    // Report templates for different conditions
    const reports = {
      'melanoma': {
        diagnosis: 'Melanoma',
        description: 'Serious type of skin cancer detected.',
        confidence: (confidence * 100).toFixed(2) + '%',
        recommendations: [
          'Urgent dermatologist consultation required',
          'Immediate biopsy confirmation needed',
          'Surgical intervention likely necessary',
          'Regular monitoring and follow-up essential'
        ]
      },
      'melanocytic nevi': {
        diagnosis: 'Melanocytic Nevi',
        description: 'Common mole detected. Generally benign but should be monitored for changes.',
        confidence: (confidence * 100).toFixed(2) + '%',
        recommendations: [
          'Regular monitoring recommended',
          'Consider removal if changing in appearance',
          'No immediate treatment required',
          'Maintain regular skin checks'
        ]
      },
      'basal cell carcinoma': {
        diagnosis: 'Basal Cell Carcinoma',
        description: 'Most common type of skin cancer. Typically grows slowly and rarely spreads to other parts of the body.',
        confidence: (confidence * 100).toFixed(2) + '%',
        recommendations: [
          'Consult with a dermatologist',
          'Treatment options include surgery, radiation, or topical medications',
          'Regular follow-up appointments recommended',
          'Monitor for any changes in appearance'
        ]
      },
      'actinic keratoses': {
        diagnosis: 'Actinic Keratoses',
        description: 'Rough, scaly patches caused by sun damage. Potential precursor to skin cancer.',
        confidence: (confidence * 100).toFixed(2) + '%',
        recommendations: [
          'Consult with a dermatologist',
          'Treatment options include cryotherapy, topical medications, or photodynamic therapy',
          'Use sun protection to prevent further damage',
          'Regular skin checks recommended'
        ]
      },
      'vascular lesions': {
        diagnosis: 'Vascular Lesions',
        description: 'Blood vessel-related skin marks detected.',
        confidence: (confidence * 100).toFixed(2) + '%',
        recommendations: [
          'Consult with dermatologist',
          'Consider laser treatment if desired',
          'Monitor for any changes',
          'No immediate treatment required'
        ]
      },
      'dermatofibroma': {
        diagnosis: 'Dermatofibroma',
        description: 'Common non-cancerous skin growths that are usually harmless.',
        confidence: (confidence * 100).toFixed(2) + '%',
        recommendations: [
          'No treatment typically necessary',
          'Can be removed for cosmetic reasons if desired',
          'Monitor for any changes in size or appearance',
          'Consult dermatologist if it becomes painful or irritated'
        ]
      },
      'benign keratosis': {
        diagnosis: 'Benign Keratosis',
        description: 'Non-cancerous growths that appear as waxy, scaly raised areas on the skin.',
        confidence: (confidence * 100).toFixed(2) + '%',
        recommendations: [
          'No treatment necessary in most cases',
          'Can be removed for cosmetic reasons',
          'Avoid irritation of the affected areas',
          'Regular skin checks recommended'
        ]
      }
    };
    
    // Get the report for the detected disease, default to unknown if not found
    return reports[diseaseLower] || {
      diagnosis: disease,
      description: 'The detected condition requires further evaluation.',
      confidence: (confidence * 100).toFixed(2) + '%',
      recommendations: [
        'Consult with a dermatologist',
        'Further diagnostic tests may be needed',
        'Regular monitoring recommended'
      ]
    };
  }
}

export default ReportService; 