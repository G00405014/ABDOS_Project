import { useState, useRef, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';
import ReportService from '../services/reportService';

const ImageAnalysis = () => {
  const { isDarkMode } = useTheme();
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const fileInputRef = useRef(null);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

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
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    const newImages = imageFiles.map(file => ({
      file,
      url: URL.createObjectURL(file),
      name: file.name,
      status: 'pending'
    }));
    setImages(prev => [...prev, ...newImages]);
  };

  const analyzeImage = async (image) => {
    try {
      setImages(prev => prev.map(img => 
        img.url === image.url ? { ...img, status: 'analyzing' } : img
      ));

      const formData = new FormData();
      formData.append('image', image.file);

      console.log('Sending image for analysis:', image.file.name);

      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Analysis result:', result);

      if (!result.condition) {
        throw new Error('Invalid response from analysis');
      }

      setAnalysis(result);
      setImages(prev => prev.map(img => 
        img.url === image.url ? { ...img, status: 'completed' } : img
      ));
    } catch (error) {
      console.error('Analysis failed:', error);
      setImages(prev => prev.map(img => 
        img.url === image.url ? { ...img, status: 'error' } : img
      ));
      setAnalysis({
        condition: 'Error',
        confidence: null,
        riskLevel: 'Unknown',
        recommendations: 'An error occurred during analysis. Please try again.'
      });
    }
  };

  const handleGenerateReport = async (analysisResult) => {
    try {
      setIsGeneratingReport(true);
      
      const patientInfo = {
        name: 'John Doe', // This should come from user authentication
        email: 'john@example.com' // This should come from user authentication
      };

      await ReportService.generateReport(analysisResult, patientInfo);
      
      // Show success message
      alert('Report has been sent to your email!');
    } catch (error) {
      console.error('Failed to generate report:', error);
      alert('Failed to generate report. Please try again.');
    } finally {
      setIsGeneratingReport(false);
    }
  };

  const getConfidenceColor = (confidence, isDarkMode) => {
    if (confidence >= 80) return isDarkMode ? '#34D399' : '#059669';
    if (confidence >= 60) return isDarkMode ? '#FBBF24' : '#D97706';
    return isDarkMode ? '#EF4444' : '#DC2626';
  };

  const getRiskLevelColor = (riskLevel, isDarkMode) => {
    switch (riskLevel) {
      case 'High':
        return isDarkMode ? '#EF4444' : '#DC2626';
      case 'Medium':
        return isDarkMode ? '#FBBF24' : '#D97706';
      case 'Low':
        return isDarkMode ? '#34D399' : '#059669';
      default:
        return isDarkMode ? '#A0AEC0' : '#4A5568';
    }
  };

  return (
    <div style={{
      padding: '2rem',
      backgroundColor: isDarkMode ? 'rgba(45, 55, 72, 0.9)' : 'rgba(255, 255, 255, 0.9)',
      borderRadius: '1.5rem',
      boxShadow: isDarkMode ? '0 8px 32px rgba(0, 0, 0, 0.3)' : '0 8px 32px rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(10px)',
      border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
      animation: 'fadeIn 0.3s ease-out'
    }}>
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        style={{
          padding: '3rem',
          border: `2px dashed ${isDragging ? '#3b82f6' : isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
          borderRadius: '1rem',
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          backgroundColor: isDragging ? (isDarkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)') : 'transparent'
        }}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          multiple
          accept="image/*"
          style={{ display: 'none' }}
        />
        <div style={{
          fontSize: '3rem',
          marginBottom: '1rem'
        }}>
          📸
        </div>
        <h3 style={{
          color: isDarkMode ? '#e2e8f0' : '#2d3748',
          marginBottom: '0.5rem'
        }}>
          Drop your images here
        </h3>
        <p style={{
          color: isDarkMode ? '#a0aec0' : '#4a5568'
        }}>
          or click to select files
        </p>
      </div>

      {images.length > 0 && (
        <div style={{
          marginTop: '2rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '1rem'
        }}>
          {images.map((image, index) => (
            <div
              key={index}
              style={{
                position: 'relative',
                borderRadius: '0.75rem',
                overflow: 'hidden',
                boxShadow: isDarkMode ? '0 4px 6px rgba(0, 0, 0, 0.2)' : '0 4px 6px rgba(0, 0, 0, 0.1)',
                backgroundColor: isDarkMode ? 'rgba(45, 55, 72, 0.5)' : 'white'
              }}
            >
              <img
                src={image.url}
                alt={image.name}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover'
                }}
              />
              <div style={{
                padding: '1rem'
              }}>
                <p style={{
                  color: isDarkMode ? '#e2e8f0' : '#2d3748',
                  fontSize: '0.875rem',
                  marginBottom: '0.5rem',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {image.name}
                </p>
                <button
                  onClick={() => analyzeImage(image)}
                  disabled={image.status === 'analyzing'}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    backgroundColor: getStatusColor(image.status, isDarkMode),
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.5rem',
                    cursor: image.status === 'analyzing' ? 'default' : 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {getStatusText(image.status)}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {analysis && (
        <div style={{
          marginTop: '2rem',
          padding: '2rem',
          backgroundColor: isDarkMode ? 'rgba(45, 55, 72, 0.5)' : 'white',
          borderRadius: '1rem',
          boxShadow: isDarkMode ? '0 4px 6px rgba(0, 0, 0, 0.2)' : '0 4px 6px rgba(0, 0, 0, 0.1)',
          animation: 'fadeIn 0.3s ease-out'
        }}>
          <h3 style={{
            color: isDarkMode ? '#e2e8f0' : '#2d3748',
            marginBottom: '1.5rem',
            fontSize: '1.5rem',
            fontWeight: '600'
          }}>
            Analysis Results
          </h3>
          
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {/* Condition Card */}
            <div style={{
              padding: '1.5rem',
              backgroundColor: isDarkMode ? 'rgba(45, 55, 72, 0.7)' : '#f7fafc',
              borderRadius: '0.75rem',
              border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '1.5rem' }}>🔍</span>
                <h4 style={{ color: isDarkMode ? '#e2e8f0' : '#2d3748', margin: 0 }}>Detected Condition</h4>
              </div>
              <p style={{ 
                color: isDarkMode ? '#60a5fa' : '#3b82f6', 
                fontSize: '1.25rem',
                fontWeight: '600',
                margin: '0.5rem 0' 
              }}>
                {analysis.condition}
              </p>
            </div>

            {/* Confidence and Risk Level */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{
                padding: '1.5rem',
                backgroundColor: isDarkMode ? 'rgba(45, 55, 72, 0.7)' : '#f7fafc',
                borderRadius: '0.75rem',
                border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>📊</span>
                  <h4 style={{ color: isDarkMode ? '#e2e8f0' : '#2d3748', margin: 0 }}>Confidence</h4>
                </div>
                <p style={{ 
                  color: getConfidenceColor(analysis.confidence, isDarkMode),
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  margin: '0.5rem 0'
                }}>
                  {analysis.confidence}%
                </p>
              </div>

              <div style={{
                padding: '1.5rem',
                backgroundColor: isDarkMode ? 'rgba(45, 55, 72, 0.7)' : '#f7fafc',
                borderRadius: '0.75rem',
                border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>⚠️</span>
                  <h4 style={{ color: isDarkMode ? '#e2e8f0' : '#2d3748', margin: 0 }}>Risk Level</h4>
                </div>
                <p style={{ 
                  color: getRiskLevelColor(analysis.riskLevel, isDarkMode),
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  margin: '0.5rem 0'
                }}>
                  {analysis.riskLevel}
                </p>
              </div>
            </div>

            {/* Recommendations */}
            <div style={{
              padding: '1.5rem',
              backgroundColor: isDarkMode ? 'rgba(45, 55, 72, 0.7)' : '#f7fafc',
              borderRadius: '0.75rem',
              border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '1.5rem' }}>💡</span>
                <h4 style={{ color: isDarkMode ? '#e2e8f0' : '#2d3748', margin: 0 }}>Recommendations</h4>
              </div>
              <p style={{ 
                color: isDarkMode ? '#a0aec0' : '#4a5568',
                margin: '0.5rem 0',
                lineHeight: '1.5'
              }}>
                {analysis.recommendations}
              </p>
            </div>
          </div>

          <button
            onClick={() => handleGenerateReport(analysis)}
            disabled={isGeneratingReport}
            style={{
              marginTop: '1.5rem',
              padding: '0.75rem 1.5rem',
              backgroundColor: isGeneratingReport ? '#9CA3AF' : '#3B82F6',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: isGeneratingReport ? 'default' : 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '1rem',
              fontWeight: '500'
            }}
          >
            {isGeneratingReport ? (
              <>
                <span>Generating Report...</span>
                <div className="spinner" />
              </>
            ) : (
              <>
                <span>📄</span>
                <span>Generate PDF Report</span>
              </>
            )}
          </button>
        </div>
      )}

      <style jsx>{`
        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid #ffffff;
          border-top: 2px solid transparent;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

const getStatusColor = (status, isDarkMode) => {
  switch (status) {
    case 'analyzing':
      return '#3b82f6';
    case 'completed':
      return '#10b981';
    case 'error':
      return '#ef4444';
    default:
      return isDarkMode ? '#4b5563' : '#6b7280';
  }
};

const getStatusText = (status) => {
  switch (status) {
    case 'analyzing':
      return 'Analyzing...';
    case 'completed':
      return 'Analysis Complete';
    case 'error':
      return 'Analysis Failed';
    default:
      return 'Analyze Image';
  }
};

export default ImageAnalysis; 