import { useState, useRef, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import ReportService from '../services/reportService';

const ImageAnalysis = () => {
  const { isDarkMode } = useTheme();
  const { user } = useAuth();
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const fileInputRef = useRef(null);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState(null);
  const [isTestingConnection, setIsTestingConnection] = useState(false);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = [...e.dataTransfer.files];
    if (files && files.length > 0) {
      processFiles(files);
    }
  }, []);

  const handleFileSelect = (e) => {
    const files = [...e.target.files];
    processFiles(files);
  };

  const processFiles = (files) => {
    // Reset previous analysis results
    setAnalysis(null);
    
    // Only accept image files
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    // Set to the most recent image only
    const newImages = imageFiles.map(file => ({
      file,
      url: URL.createObjectURL(file),
      name: file.name,
      status: 'pending'
    }));
    
    // Only use the latest image
    setImages(newImages.length > 0 ? [newImages[0]] : []);
  };

  const analyzeImage = async (image) => {
    try {
      setIsLoading(true);
      setError(null); // Clear any previous errors
      setImages(prev => prev.map(img => 
        img.url === image.url ? { ...img, status: 'analyzing' } : img
      ));

      const formData = new FormData();
      formData.append('image', image.file);

      console.log('Sending image for analysis:', image.file.name, 'Size:', image.file.size, 'Type:', image.file.type);

      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Analysis failed with status:', response.status, errorData);
        
        let errorMessage = 'Image analysis failed';
        
        // Provide more specific error messages based on status code
        if (response.status === 503) {
          errorMessage = 'Backend service unavailable. Please make sure the backend server is running.';
        } else if (response.status === 400) {
          errorMessage = errorData.error || 'Invalid image format or size';
        } else if (response.status === 500) {
          errorMessage = 'Server error processing the image. Please try a different image.';
        }
        
        setError(errorMessage);
        setImages(prev => prev.map(img => 
          img.url === image.url ? { ...img, status: 'failed' } : img
        ));
        setIsLoading(false);
        return;
      }

      const result = await response.json();
      console.log('Analysis result:', result);

      // Format the result for the UI
      const analysisResult = {
        condition: result.label,
        description: result.description,
        confidence: result.confidence,
        riskLevel: result.riskLevel,
        recommendations: result.recommendedAction,
        timestamp: result.timestamp,
        rawData: result // Store the raw data for potential future use
      };

      setAnalysis(analysisResult);
      setImages(prev => prev.map(img => 
        img.url === image.url ? { ...img, status: 'completed' } : img
      ));
    } catch (error) {
      console.error('Analysis failed:', error);
      setError('Failed to connect to the analysis service. Please check your network connection and try again.');
      setImages(prev => prev.map(img => 
        img.url === image.url ? { ...img, status: 'failed' } : img
      ));
    } finally {
      setIsLoading(false);
    }
  };

  // Check backend health
  const checkBackendHealth = async () => {
    try {
      setIsTestingConnection(true);
      setConnectionStatus(null);
      setError(null);
      
      console.log('Checking backend health...');
      const response = await fetch('/api/health-check');
      
      const result = await response.json();
      console.log('Backend health check result:', result);
      
      if (result.status === 'success') {
        setConnectionStatus({
          success: true,
          message: 'Backend server is running correctly',
          details: result.details
        });
        return true;
      } else {
        setConnectionStatus({
          success: false,
          message: 'Backend server is not responding correctly',
          error: result.error || 'Unknown error'
        });
        return false;
      }
    } catch (error) {
      console.error('Backend health check failed:', error);
      setConnectionStatus({
        success: false,
        message: 'Failed to connect to the backend server',
        error: error.message
      });
      return false;
    } finally {
      setIsTestingConnection(false);
    }
  };

  const handleGenerateReport = async (analysisResult) => {
    try {
      setIsGeneratingReport(true);
      setError(null);
      
      // Verify user authentication
      if (!user) {
        throw new Error('You must be logged in to generate a report');
      }
      
      // Check if token exists in localStorage
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('Authentication token not found. Please log in again.');
      }
      
      console.log('Authenticated as:', user.name, 'with token available');
      
      // First check if the backend server is running
      const isBackendHealthy = await checkBackendHealth();
      if (!isBackendHealthy) {
        throw new Error('Backend server is not running or not accessible. Please make sure the Flask server is running.');
      }
      
      const report = await ReportService.generateReport(analysisResult, {
        name: user?.name || 'User',
        email: user?.email || 'user@example.com'
      });
      
      // Show the report in a modal or new window
      const reportWindow = window.open('', '_blank');
      reportWindow.document.write(`
        <html>
          <head>
            <title>ABDOS Analysis Report</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              h1 { color: #2c5282; }
              .report-section { margin-bottom: 20px; }
              .recommendations { margin-top: 20px; }
              ul { padding-left: 20px; }
            </style>
          </head>
          <body>
            <h1>ABDOS Analysis Report</h1>
            <div class="report-section">
              <h2>Diagnosis: ${report.diagnosis}</h2>
              <p>Confidence: ${report.confidence}</p>
              <p>${report.description}</p>
            </div>
            <div class="recommendations">
              <h2>Recommendations:</h2>
              <ul>
                ${Array.isArray(report.recommendations) 
                  ? report.recommendations.map(rec => `<li>${rec}</li>`).join('') 
                  : `<li>${report.recommendations}</li>`}
              </ul>
            </div>
          </body>
        </html>
      `);
      reportWindow.document.close();
    } catch (error) {
      console.error('Failed to generate report:', error);
      setError('Failed to generate report: ' + error.message);
    } finally {
      setIsGeneratingReport(false);
    }
  };

  const getConfidenceText = (confidence) => {
    if (confidence === null) return 'N/A';
    
    // Convert confidence to percentage (0-100)
    const confidencePercentage = Math.round(confidence * 100);
    return `${confidencePercentage}%`;
  };

  const getConfidenceColor = (confidence, isDarkMode) => {
    if (confidence === null) return isDarkMode ? '#888888' : '#888888';
    
    // Convert confidence to percentage (0-100)
    const confidencePercentage = confidence * 100;
    
    if (confidencePercentage >= 70) {
      return '#10b981'; // Green for high confidence (>=70%)
    } else if (confidencePercentage >= 40) {
      return '#f59e0b'; // Yellow for medium confidence (40-70%)
    } else {
      return '#ef4444'; // Red for low confidence (<40%)
    }
  };

  const getRiskLevelColor = (riskLevel, isDarkMode) => {
    if (riskLevel === 'Unknown') return isDarkMode ? '#888888' : '#888888';
    if (riskLevel === 'Low') return '#10b981';
    if (riskLevel === 'Medium') return '#f59e0b';
    return '#ef4444';
  };

  const clearAnalysis = () => {
    setImages([]);
    setAnalysis(null);
  };

  // Function to test the connection to the backend
  const testBackendConnection = async () => {
    try {
      setIsTestingConnection(true);
      setConnectionStatus(null);
      setError(null);
      
      console.log('Testing connection to backend API...');
      const response = await fetch('/api/test-analyze');
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('Connection test result:', result);
      
      setConnectionStatus({
        success: result.success,
        message: result.message,
        details: result.backendStatus
      });
    } catch (error) {
      console.error('Connection test failed:', error);
      setConnectionStatus({
        success: false,
        message: 'Failed to connect to the backend',
        error: error.message
      });
    } finally {
      setIsTestingConnection(false);
    }
  };

  return (
    <div className="container py-6 animate-fade-in">
      <div className="grid grid-2">
        <div>
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-3">
              Skin Analysis
            </h1>
            <p className="mb-6" style={{ 
              color: isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'
            }}>
              Upload a clear image of your skin concern to get an instant AI-powered analysis.
            </p>
          </div>

          {/* Upload Section */}
          <div className="upload-container">
            <div 
              className={`upload-area ${isDragging ? 'dragging' : ''}`}
              onDragOver={handleDrag}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/*"
                style={{ display: 'none' }}
              />
              <div className="upload-icon">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 16L12 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 11L12 8 15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 16H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 20.4V3.6C3 3.26863 3.26863 3 3.6 3H20.4C20.7314 3 21 3.26863 21 3.6V20.4C21 20.7314 20.7314 21 20.4 21H3.6C3.26863 21 3 20.7314 3 20.4Z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <h3>Upload an image for analysis</h3>
              <p>Drag and drop an image here, or click to select</p>
              <p className="upload-note">Supported formats: JPG, PNG, JPEG</p>
            </div>
            
            <div className="connection-test">
              <button 
                className="test-connection-button"
                onClick={testBackendConnection}
                disabled={isTestingConnection}
              >
                {isTestingConnection ? 'Testing...' : 'Test Backend Connection'}
              </button>
              
              {connectionStatus && (
                <div className={`connection-status ${connectionStatus.success ? 'success' : 'error'}`}>
                  <div className="status-icon">
                    {connectionStatus.success ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 11.0857V12.0057C21.9988 14.1621 21.3005 16.2604 20.0093 17.9875C18.7182 19.7147 16.9033 20.9782 14.8354 21.5896C12.7674 22.201 10.5573 22.1276 8.53447 21.3803C6.51168 20.633 4.78465 19.2518 3.61096 17.4428C2.43727 15.6338 1.87979 13.4938 2.02168 11.342C2.16356 9.19029 2.99721 7.14205 4.39828 5.5028C5.79935 3.86354 7.69279 2.72111 9.79619 2.24587C11.8996 1.77063 14.1003 1.98806 16.07 2.86572" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M15 9L9 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9 9L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <div className="status-message">
                    <p>{connectionStatus.message}</p>
                    {connectionStatus.error && <p className="error-details">{connectionStatus.error}</p>}
                  </div>
                </div>
              )}
            </div>
            
            {error && (
              <div className="error-message">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p>{error}</p>
                <button onClick={() => setError(null)} className="close-error">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="card">
            <h3 className="text-lg font-semibold mb-3">Tips for Better Results</h3>
            <ul className="pl-5 space-y-2" style={{
              color: isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)',
              listStyleType: 'disc'
            }}>
              <li>Ensure good lighting for clear visibility</li>
              <li>Take photos from multiple angles when possible</li>
              <li>Include a reference object for size comparison</li>
              <li>Avoid using filters or editing the image</li>
              <li>For moles, capture the entire area with some surrounding skin</li>
            </ul>
          </div>
        </div>

        <div>
          {/* Preview and Analysis Section */}
          {images.length > 0 && (
            <div className="image-preview-container">
              <div className="image-preview">
                <img src={images[0].url} alt="Uploaded skin image" />
                <div className={`image-status ${images[0].status}`}>
                  {images[0].status === 'pending' && 'Pending'}
                  {images[0].status === 'analyzing' && 'Analyzing...'}
                  {images[0].status === 'completed' && 'Completed'}
                  {images[0].status === 'failed' && 'Failed'}
                  </div>
                </div>
              <div className="image-actions">
                <button 
                  className="analyze-button"
                  onClick={() => analyzeImage(images[0])}
                  disabled={isLoading || images[0].status === 'analyzing'}
                >
                  {isLoading ? 'Analyzing...' : 'Analyze Image'}
                </button>
                <button 
                  className="clear-button"
                  onClick={clearAnalysis}
                  disabled={isLoading}
                >
                  Clear
                </button>
              </div>
            </div>
              )}

          {/* Analysis Results */}
          {analysis && (
            <div className="card animate-slide-up">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Analysis Results</h3>
                <span className="text-sm" style={{ color: isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)' }}>
                  {new Date().toLocaleString()}
                </span>
              </div>
              
              <div className="grid grid-2 gap-4 mb-6">
                <div className="card" style={{
                  boxShadow: 'none',
                  border: `1px solid ${isDarkMode ? 'var(--dark-border)' : 'var(--light-border)'}`,
                  backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.02)'
                }}>
                  <div style={{ color: isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)' }}>
                    Condition
                  </div>
                  <div className="text-xl font-semibold">
                    {analysis.condition}
                  </div>
                </div>
                
                <div className="card" style={{
                  boxShadow: 'none',
                  border: `1px solid ${isDarkMode ? 'var(--dark-border)' : 'var(--light-border)'}`,
                  backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.02)'
                }}>
                  <div style={{ color: isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)' }}>
                    Confidence
                  </div>
                  <div className="text-xl font-semibold" style={{
                    color: getConfidenceColor(analysis.confidence, isDarkMode)
                  }}>
                    {getConfidenceText(analysis.confidence)}
                  </div>
                </div>
              </div>
              
              <div className="card mb-6" style={{
                boxShadow: 'none',
                border: `1px solid ${isDarkMode ? 'var(--dark-border)' : 'var(--light-border)'}`,
                backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.02)'
              }}>
                <div style={{ color: isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)' }}>
                  Risk Level
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{
                    backgroundColor: getRiskLevelColor(analysis.riskLevel, isDarkMode)
                  }}></div>
                  <div className="text-xl font-semibold" style={{
                    color: getRiskLevelColor(analysis.riskLevel, isDarkMode)
                  }}>
                    {analysis.riskLevel}
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-md font-semibold mb-2">Recommendations</h4>
                <p style={{ color: isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)' }}>
                  {analysis.recommendations}
                </p>
              </div>
              
              <div className="flex gap-3">
                <button 
                  className="btn btn-primary flex-1"
                  onClick={() => handleGenerateReport(analysis)}
                  disabled={isGeneratingReport}
                >
                  {isGeneratingReport ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
                      </svg>
                      Generating...
                    </span>
                  ) : 'Generate Report'}
                </button>
                <button 
                  className="btn btn-outline"
                  onClick={clearAnalysis}
                  style={{
                    color: isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'
                  }}
                >
                  New Analysis
                </button>
              </div>
              
              <div className="mt-4 text-center text-sm" style={{ color: isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)' }}>
                <p>⚠️ This analysis is for informational purposes only and should not replace professional medical advice.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add CSS styles */}
      <style jsx>{`
        .upload-container {
          margin-bottom: var(--space-xl);
        }
        
        .upload-area {
          border: 2px dashed ${isDarkMode ? 'var(--dark-border)' : 'var(--light-border)'};
          background-color: ${isDarkMode ? 'var(--dark-card)' : 'var(--light-card)'};
          border-radius: 8px;
          padding: var(--space-xl);
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: var(--space-md);
        }
        
        .upload-area.dragging {
          border-color: var(--primary);
          background-color: ${isDarkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)'};
          transform: scale(1.01);
        }
        
        .upload-icon {
          width: 64px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: ${isDarkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)'};
          color: var(--primary);
          border-radius: 50%;
          margin-bottom: var(--space-sm);
        }
        
        .upload-area h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: var(--space-xs);
        }
        
        .upload-area p {
          color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
          margin-bottom: var(--space-xs);
        }
        
        .upload-note {
          font-size: 0.875rem;
          opacity: 0.8;
        }
        
        .error-message {
          margin-top: var(--space-md);
          padding: var(--space-md);
          background-color: ${isDarkMode ? 'rgba(239, 68, 68, 0.2)' : 'rgba(239, 68, 68, 0.1)'};
          border: 1px solid ${isDarkMode ? 'rgba(239, 68, 68, 0.4)' : 'rgba(239, 68, 68, 0.3)'};
          border-radius: 8px;
          color: ${isDarkMode ? '#f87171' : '#ef4444'};
          display: flex;
          align-items: center;
          gap: var(--space-sm);
        }
        
        .error-message p {
          flex: 1;
          margin: 0;
        }
        
        .close-error {
          background: none;
          border: none;
          cursor: pointer;
          color: currentColor;
          opacity: 0.7;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .close-error:hover {
          opacity: 1;
        }
        
        .image-preview-container {
          margin-top: var(--space-md);
        }
        
        .image-preview {
          position: relative;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 6px ${isDarkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.1)'};
        }
        
        .image-preview img {
          width: 100%;
          height: auto;
          display: block;
        }
        
        .image-status {
          position: absolute;
          top: 10px;
          right: 10px;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
        }
        
        .image-status.pending {
          background-color: ${isDarkMode ? 'rgba(234, 179, 8, 0.3)' : 'rgba(234, 179, 8, 0.2)'};
          color: #eab308;
        }
        
        .image-status.analyzing {
          background-color: ${isDarkMode ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.2)'};
          color: #3b82f6;
        }
        
        .image-status.completed {
          background-color: ${isDarkMode ? 'rgba(34, 197, 94, 0.3)' : 'rgba(34, 197, 94, 0.2)'};
          color: #22c55e;
        }
        
        .image-status.failed {
          background-color: ${isDarkMode ? 'rgba(239, 68, 68, 0.3)' : 'rgba(239, 68, 68, 0.2)'};
          color: #ef4444;
        }
        
        .image-actions {
          display: flex;
          gap: var(--space-md);
          margin-top: var(--space-md);
        }
        
        .analyze-button, .clear-button {
          padding: 10px 20px;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
          flex: 1;
        }
        
        .analyze-button {
          background-color: var(--primary);
          color: white;
        }
        
        .analyze-button:hover:not(:disabled) {
          background-color: var(--primary-dark);
        }
        
        .clear-button {
          background-color: ${isDarkMode ? 'rgba(100, 116, 139, 0.2)' : 'rgba(100, 116, 139, 0.1)'};
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
        }
        
        .clear-button:hover:not(:disabled) {
          background-color: ${isDarkMode ? 'rgba(100, 116, 139, 0.3)' : 'rgba(100, 116, 139, 0.2)'};
        }
        
        .analyze-button:disabled, .clear-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        
        .connection-test {
          margin-top: var(--space-md);
          display: flex;
          flex-direction: column;
          gap: var(--space-sm);
        }
        
        .test-connection-button {
          padding: 8px 16px;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
          background-color: ${isDarkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)'};
          color: var(--primary);
          width: 100%;
        }
        
        .test-connection-button:hover:not(:disabled) {
          background-color: ${isDarkMode ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.2)'};
        }
        
        .test-connection-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        
        .connection-status {
          display: flex;
          align-items: flex-start;
          gap: var(--space-sm);
          padding: var(--space-sm);
          border-radius: 6px;
          margin-top: var(--space-xs);
        }
        
        .connection-status.success {
          background-color: ${isDarkMode ? 'rgba(34, 197, 94, 0.2)' : 'rgba(34, 197, 94, 0.1)'};
          color: ${isDarkMode ? '#4ade80' : '#22c55e'};
        }
        
        .connection-status.error {
          background-color: ${isDarkMode ? 'rgba(239, 68, 68, 0.2)' : 'rgba(239, 68, 68, 0.1)'};
          color: ${isDarkMode ? '#f87171' : '#ef4444'};
        }
        
        .status-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        
        .status-message {
          flex: 1;
        }
        
        .status-message p {
          margin: 0;
          color: inherit;
        }
        
        .error-details {
          font-size: 0.875rem;
          opacity: 0.8;
          margin-top: var(--space-xs) !important;
        }
      `}</style>
    </div>
  );
};

// Helper Component
const StatusBadge = ({ status, isDarkMode }) => {
  const getStatusColor = (status, isDarkMode) => {
    if (status === 'pending') return isDarkMode ? '#888888' : '#888888';
    if (status === 'analyzing') return '#f59e0b';
    if (status === 'completed') return '#10b981';
    return '#ef4444'; // error
  };

  const getStatusText = (status) => {
    if (status === 'pending') return 'Ready to analyze';
    if (status === 'analyzing') return 'Analyzing...';
    if (status === 'completed') return 'Analysis complete';
    return 'Analysis failed';
  };

  return (
    <span 
      className="text-xs py-1 px-2 rounded-full" 
      style={{
        backgroundColor: `${getStatusColor(status, isDarkMode)}20`,
        color: getStatusColor(status, isDarkMode),
      }}
    >
      {getStatusText(status)}
    </span>
  );
};

export default ImageAnalysis; 