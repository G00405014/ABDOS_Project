import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import ProtectedRoute from '../components/ProtectedRoute';
import { saveAnalysisResult } from '../services/analysisService';
import { useAuth } from '../context/AuthContext';

export default function Analysis() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const { user } = useAuth();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        setError(null);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalysis = async () => {
    if (!selectedImage) {
      setError('Please select an image first');
      return;
    }
    setIsAnalyzing(true);
    setError(null);
    try {
      // Convert base64 image to file object
      const base64Data = selectedImage.split(',')[1];
      const blob = await fetch(`data:image/jpeg;base64,${base64Data}`).then(res => res.blob());
      const file = new File([blob], "image.jpg", { type: "image/jpeg" });
      
      // Create form data
      const formData = new FormData();
      formData.append('image', file);
      
      // Call the actual API
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const apiResult = await response.json();
      console.log('API result:', apiResult);
      
      // Format the result for our UI
      const result = {
        type: apiResult.label || 'Unknown',
        confidence: apiResult.confidence / 100 || 0,
        description: apiResult.description || `The image shows characteristics consistent with ${apiResult.label || 'skin condition'}.`,
        recommendations: apiResult.recommendations || [
          'Schedule an appointment with a dermatologist for professional evaluation',
          'Monitor the area for any changes in size, shape, or color',
          'Take photos of the area for future comparison',
          'Practice sun protection measures'
        ]
      };
      
      setAnalysisResult(result);
      
      // Save the analysis result to the database
      setIsSaving(true);
      await saveAnalysisResult(selectedImage, result);
      setIsSaving(false);
    } catch (err) {
      console.error('Analysis error:', err);
      setError('An error occurred during analysis. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <ProtectedRoute>
      <Layout title="Skin Analysis | ABDOS">
        {/* Hero Section */}
        <section className="analysis-hero">
          <div className="container">
            <motion.div 
              className="hero-content"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="overline">AI-Powered Analysis</span>
              <h1 className="hero-title">
                Get Instant Skin Analysis
                <span className="gradient-text"> Powered by AI</span>
              </h1>
              <p className="hero-subtitle">
                Upload a clear photo of your skin concern and receive an instant analysis 
                from our advanced AI detection system.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Upload Section */}
        <section className="upload-section">
          <div className="container">
            <div className="upload-grid">
              {/* Upload Area */}
              <motion.div 
                className="upload-area"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="upload-card">
                  <h2>Upload Your Image</h2>
                  <p>Follow these guidelines for best results:</p>
                  <div className="guidelines-container">
                    <div className="guideline-item">
                      <span className="guideline-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather">
                          <circle cx="12" cy="12" r="4"></circle>
                          <path d="M3 12h-1m19 0h1M12 3v-1m0 19v-1"></path>
                          <path d="M18.364 18.364l.7071-.7071M18.364 5.636l.7071.7071M5.636 5.636l-.7071.7071M5.636 18.364l-.7071-.7071"></path>
                        </svg>
                      </span>
                      <div>
                        <h3>Clear, Well-Lit Photo</h3>
                        <p>Ensure good lighting on the area of concern</p>
                      </div>
                    </div>
                    <div className="guideline-item">
                      <span className="guideline-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                          <circle cx="8.5" cy="8.5" r="1.5"></circle>
                          <polyline points="21 15 16 10 5 21"></polyline>
                        </svg>
                      </span>
                      <div>
                        <h3>Multiple Angles</h3>
                        <p>Take photos from different perspectives</p>
                      </div>
                    </div>
                    <div className="guideline-item">
                      <span className="guideline-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather">
                          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                          <polyline points="17 21 17 13 7 13 7 21"></polyline>
                          <polyline points="7 3 7 8 15 8"></polyline>
                        </svg>
                      </span>
                      <div>
                        <h3>Size Reference</h3>
                        <p>Include a ruler or common object for scale</p>
                      </div>
                    </div>
                  </div>
                  <div className="upload-zone">
                    <input
                      type="file"
                      id="image-upload"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="file-input"
                    />
                    <label htmlFor="image-upload" className="upload-label">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="upload-icon">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="17 8 12 3 7 8"></polyline>
                        <line x1="12" y1="3" x2="12" y2="15"></line>
                      </svg>
                      <div className="upload-text">
                        <p>Click to upload or drag and drop</p>
                        <span>PNG, JPG, JPEG up to 10MB</span>
                      </div>
                    </label>
                  </div>
                </div>
              </motion.div>
              {/* Preview Area */}
              <motion.div 
                className="preview-area"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="preview-card">
                  <h2>Image Preview</h2>
                  <div className="preview-container">
                    {selectedImage ? (
                      <img src={selectedImage} alt="Uploaded skin image" />
                    ) : (
                      <div className="preview-placeholder">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                          <circle cx="8.5" cy="8.5" r="1.5"></circle>
                          <polyline points="21 15 16 10 5 21"></polyline>
                        </svg>
                        <p>Your image will appear here</p>
                      </div>
                    )}
                  </div>
                  <div className="preview-actions">
                    <button 
                      className="analyze-button"
                      onClick={handleAnalysis}
                      disabled={!selectedImage || isAnalyzing}
                    >
                      {isAnalyzing ? 'Analyzing...' : 'Start Analysis'}
                    </button>
                    {selectedImage && (
                      <button 
                        className="clear-button"
                        onClick={() => {
                          setSelectedImage(null);
                          setAnalysisResult(null);
                        }}
                        disabled={isAnalyzing}
                      >
                        Clear Image
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Results Section */} 
        {analysisResult && (
          <motion.section 
            className="results-section"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="container">
              <div className="results-card">
                <div className="results-header">
                  <h2>Analysis Results</h2>
                  <div className="confidence-badge">
                    {Math.round(analysisResult.confidence * 100)}% Confidence
                  </div>
                </div>
                <div className="results-content">
                  <div className="result-type">
                    <h3>Detected Condition</h3>
                    <p className="type-name">{analysisResult.type}</p>
                  </div>
                  <div className="result-description">
                    <h3>Description</h3>
                    <p>{analysisResult.description}</p>
                  </div>
                  <div className="result-recommendations">
                    <h3>Recommendations</h3>
                    <ul className="recommendations-list">
                      {analysisResult.recommendations.map((rec, index) => (
                        <li key={index}>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rec-icon">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                          </svg>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="results-footer">
                  <p className="disclaimer">
                    This analysis is for informational purposes only and should not replace professional medical advice. 
                    Always consult with a healthcare provider for diagnosis and treatment.
                  </p>
                  <button 
                    className="new-analysis-button"
                    onClick={() => {
                      setSelectedImage(null);
                      setAnalysisResult(null);
                      setError(null);
                    }}
                  >
                    Start New Analysis
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather">
                      <polyline points="1 4 1 10 7 10"></polyline>
                      <polyline points="23 20 23 14 17 14"></polyline>
                      <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Error Message */} 
        {error && (
          <motion.div 
            className="error-message"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container">
              <div className="error-content">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <p>{error}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Saving Indicator */}
        {isSaving && (
          <motion.div 
            className="saving-message"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container">
              <div className="saving-content">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="saving-icon rotating">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 6v6l4 2"></path>
                </svg>
                <p>Saving your analysis results...</p>
              </div>
            </div>
          </motion.div>
        )}

        <style jsx>{`
          /* Hero Section */
          .analysis-hero {
            padding: 80px 0 60px;
            background: linear-gradient(to bottom, rgba(0, 0, 0, 0.02), transparent);
            text-align: center;
          }

          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
          }

          .overline {
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            font-weight: 600;
            color: #3b82f6;
            margin-bottom: 16px;
            display: block;
          }

          .hero-title {
            font-size: 42px;
            font-weight: 800;
            line-height: 1.2;
            margin-bottom: 16px;
            color: #1f2937;
          }

          .gradient-text {
            background: linear-gradient(90deg, #3b82f6, #2563eb);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .hero-subtitle {
            font-size: 18px;
            color: #6b7280;
            max-width: 600px;
            margin: 0 auto;
            line-height: 1.5;
          }

          /* Upload Section */
          .upload-section {
            padding: 40px 0 80px;
          }

          .upload-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
          }

          .upload-card, .preview-card {
            background: white;
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
            padding: 30px;
            height: 100%;
          }

          h2 {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 16px;
            color: #1f2937;
          }

          p {
            color: #6b7280;
            margin-bottom: 20px;
            line-height: 1.5;
          }

          /* New Guidelines Container */
          .guidelines-container {
            margin-bottom: 30px;
          }

          .guideline-item {
            display: flex;
            align-items: center;
            margin-bottom: 16px;
            padding-bottom: 16px;
            border-bottom: 1px solid #f3f4f6;
          }

          .guideline-item:last-child {
            margin-bottom: 0;
            padding-bottom: 0;
            border-bottom: none;
          }

          .guideline-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 32px;
            height: 32px;
            background: #edf2ff;
            border-radius: 8px;
            margin-right: 16px;
            color: #3b82f6;
            flex-shrink: 0;
          }

          .guideline-icon svg {
            width: 16px;
            height: 16px;
          }

          .guideline-item h3 {
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 4px;
            color: #1f2937;
          }

          .guideline-item p {
            font-size: 14px;
            color: #6b7280;
            margin: 0;
          }

          /* Upload Zone */
          .upload-zone {
            border: 2px dashed #e5e7eb;
            border-radius: 12px;
            padding: 30px;
            text-align: center;
            transition: all 0.2s ease;
          }

          .upload-zone:hover {
            border-color: #3b82f6;
            background: #f9fafb;
          }

          .file-input {
            display: none;
          }

          .upload-label {
            display: flex;
            flex-direction: column;
            align-items: center;
            cursor: pointer;
          }

          .upload-icon {
            width: 36px;
            height: 36px;
            color: #3b82f6;
            margin-bottom: 16px;
          }

          .upload-text p {
            font-size: 16px;
            font-weight: 500;
            color: #1f2937;
            margin-bottom: 4px;
          }

          .upload-text span {
            font-size: 14px;
            color: #6b7280;
          }

          /* Preview Area */
          .preview-container {
            aspect-ratio: 16/10;
            background: #f9fafb;
            border-radius: 12px;
            overflow: hidden;
            margin-bottom: 20px;
            position: relative;
          }

          .preview-container img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }

          .preview-placeholder {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            color: #9ca3af;
          }

          .preview-placeholder svg {
            width: 48px;
            height: 48px;
            margin-bottom: 12px;
          }

          .preview-placeholder p {
            margin: 0;
            font-size: 14px;
          }

          /* Action Buttons */
          .preview-actions {
            display: flex;
            gap: 12px;
          }

          .analyze-button {
            flex: 1;
            background: linear-gradient(90deg, #3b82f6, #2563eb);
            color: white;
            border: none;
            border-radius: 8px;
            padding: 12px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
          }

          .analyze-button:hover:not(:disabled) {
            background: linear-gradient(90deg, #2563eb, #1d4ed8);
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
          }

          .analyze-button:disabled {
            opacity: 0.7;
            cursor: not-allowed;
          }

          .clear-button {
            background: transparent;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 12px 20px;
            font-size: 16px;
            color: #6b7280;
            cursor: pointer;
            transition: all 0.2s ease;
          }

          .clear-button:hover:not(:disabled) {
            border-color: #d1d5db;
            color: #4b5563;
          }

          .clear-button:disabled {
            opacity: 0.7;
            cursor: not-allowed;
          }

          /* Results Section */
          .results-section {
            padding: 60px 0;
            background: #f9fafb;
          }

          .results-card {
            background: white;
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
            padding: 30px;
          }

          .results-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
          }

          .confidence-badge {
            background: linear-gradient(90deg, #3b82f6, #2563eb);
            color: white;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 600;
          }

          .results-content {
            display: grid;
            gap: 30px;
            margin-bottom: 30px;
          }

          .result-type h3,
          .result-description h3,
          .result-recommendations h3 {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 12px;
            color: #1f2937;
          }

          .type-name {
            font-size: 24px;
            font-weight: 700;
            color: #2563eb;
          }

          .recommendations-list {
            list-style: none;
            padding: 0;
            margin: 0;
          }

          .recommendations-list li {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 12px;
          }

          .rec-icon {
            width: 18px;
            height: 18px;
            color: #2563eb;
            flex-shrink: 0;
          }

          .results-footer {
            border-top: 1px solid #f3f4f6;
            padding-top: 24px;
          }

          .disclaimer {
            font-size: 14px;
            color: #9ca3af;
            text-align: center;
            margin-bottom: 24px;
          }

          .new-analysis-button {
            display: flex;
            align-items: center;
            gap: 8px;
            background: white;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 12px 24px;
            font-size: 16px;
            font-weight: 500;
            color: #4b5563;
            margin: 0 auto;
            cursor: pointer;
            transition: all 0.2s ease;
          }

          .new-analysis-button:hover {
            border-color: #d1d5db;
            background: #f9fafb;
          }

          .new-analysis-button svg {
            width: 16px;
            height: 16px;
          }

          /* Error Message */
          .error-message {
            position: fixed;
            bottom: 20px;
            left: 0;
            right: 0;
            z-index: 100;
          }

          .error-content {
            display: flex;
            align-items: center;
            gap: 12px;
            background: white;
            border-left: 4px solid #ef4444;
            border-radius: 8px;
            padding: 16px;
            max-width: 500px;
            margin: 0 auto;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          }

          .error-content svg {
            width: 20px;
            height: 20px;
            color: #ef4444;
            flex-shrink: 0;
          }

          .error-content p {
            margin: 0;
            color: #1f2937;
            font-weight: 500;
          }

          /* Saving Message */
          .saving-message {
            position: fixed;
            bottom: 20px;
            left: 0;
            right: 0;
            z-index: 100;
          }

          .saving-content {
            display: flex;
            align-items: center;
            gap: 12px;
            background: white;
            border-left: 4px solid #3b82f6;
            border-radius: 8px;
            padding: 16px;
            max-width: 500px;
            margin: 0 auto;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          }

          .saving-icon {
            width: 20px;
            height: 20px;
            color: #3b82f6;
            flex-shrink: 0;
          }

          .rotating {
            animation: rotate 2s linear infinite;
          }

          @keyframes rotate {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }

          .saving-content p {
            margin: 0;
            color: #1f2937;
            font-weight: 500;
          }

          @media (max-width: 1024px) {
            .upload-grid {
              grid-template-columns: 1fr;
            }
          }

          @media (max-width: 768px) {
            .hero-title {
              font-size: 32px;
            }

            .upload-card, .preview-card {
              padding: 24px;
            }

            .results-header {
              flex-direction: column;
              align-items: flex-start;
              gap: 12px;
            }
          }
        `}</style>
      </Layout>
    </ProtectedRoute>
  );
} 