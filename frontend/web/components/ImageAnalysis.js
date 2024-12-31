import { useState, useRef, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';

const ImageAnalysis = () => {
  const { isDarkMode } = useTheme();
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const fileInputRef = useRef(null);

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
      // Update status to analyzing
      setImages(prev => prev.map(img => 
        img.url === image.url ? { ...img, status: 'analyzing' } : img
      ));

      // TODO: Replace with your actual API endpoint
      const formData = new FormData();
      formData.append('image', image.file);
      
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      
      // Update status to completed
      setImages(prev => prev.map(img => 
        img.url === image.url ? { ...img, status: 'completed', analysis: result } : img
      ));

      setAnalysis(result);
    } catch (error) {
      console.error('Analysis failed:', error);
      // Update status to error
      setImages(prev => prev.map(img => 
        img.url === image.url ? { ...img, status: 'error' } : img
      ));
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
          padding: '1.5rem',
          backgroundColor: isDarkMode ? 'rgba(45, 55, 72, 0.5)' : 'white',
          borderRadius: '0.75rem',
          animation: 'fadeIn 0.3s ease-out'
        }}>
          <h3 style={{
            color: isDarkMode ? '#e2e8f0' : '#2d3748',
            marginBottom: '1rem'
          }}>
            Analysis Results
          </h3>
          <pre style={{
            color: isDarkMode ? '#a0aec0' : '#4a5568',
            overflow: 'auto'
          }}>
            {JSON.stringify(analysis, null, 2)}
          </pre>
        </div>
      )}
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