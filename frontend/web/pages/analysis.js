import { useState } from 'react';
import Layout from '../components/Layout';
import ImageAnalysis from '../components/ImageAnalysis';
import { useTheme } from '../context/ThemeContext';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Analysis() {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('upload');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        setError(null);
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
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock analysis result
      setAnalysisResult({
        type: 'Melanoma',
        confidence: 0.92,
        description: 'The image shows characteristics consistent with melanoma, including irregular borders and color variation.',
        recommendations: [
          'Schedule an appointment with a dermatologist for professional evaluation',
          'Monitor the area for any changes in size, shape, or color',
          'Take photos of the area for future comparison',
          'Practice sun protection measures'
        ]
      });
    } catch (err) {
      setError('An error occurred during analysis. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Layout title="Skin Analysis | ABDOS">
      <div className="analysis-page">
        <div className="container">
          <div className="analysis-header">
            <h1 className="analysis-title">Skin Cancer Analysis</h1>
            <p className="analysis-description">
              Upload an image of your skin concern for AI-powered analysis and risk assessment
            </p>
          </div>

          <div className="analysis-tabs">
            <button 
              className={`analysis-tab ${activeTab === 'upload' ? 'active' : ''}`}
              onClick={() => setActiveTab('upload')}
            >
              Upload & Analyze
            </button>
            <button 
              className={`analysis-tab ${activeTab === 'guide' ? 'active' : ''}`}
              onClick={() => setActiveTab('guide')}
            >
              Photo Guide
            </button>
            <button 
              className={`analysis-tab ${activeTab === 'about' ? 'active' : ''}`}
              onClick={() => setActiveTab('about')}
            >
              About Our Technology
            </button>
          </div>

          <div className="analysis-content">
            {activeTab === 'upload' && (
              <div className="analysis-upload-container">
                <ImageAnalysis />
              </div>
            )}

            {activeTab === 'guide' && (
              <div className="analysis-guide">
                <h2>How to Take Good Skin Photos</h2>
                
                <div className="guide-grid">
                  <div className="guide-item">
                    <div className="guide-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <h3>Good Lighting</h3>
                    <p>Use natural daylight when possible. Avoid harsh shadows or direct sunlight that can wash out details.</p>
                  </div>
                  
                  <div className="guide-item">
                    <div className="guide-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h3>Clear Focus</h3>
                    <p>Keep your camera steady and ensure the skin lesion is in sharp focus. Blurry images reduce accuracy.</p>
                  </div>
                  
                  <div className="guide-item">
                    <div className="guide-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <h3>Close-up View</h3>
                    <p>Capture from 4-6 inches away. Include the lesion and some surrounding skin for context.</p>
                  </div>
                  
                  <div className="guide-item">
                    <div className="guide-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                      </svg>
                    </div>
                    <h3>Multiple Angles</h3>
                    <p>If possible, take photos from different angles to capture the full appearance of the lesion.</p>
                  </div>
                  
                  <div className="guide-item">
                    <div className="guide-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                      </svg>
                    </div>
                    <h3>Size Reference</h3>
                    <p>Include a common object for size reference (coin, ruler) placed near but not covering the lesion.</p>
                  </div>
                  
                  <div className="guide-item">
                    <div className="guide-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h3>Clean Area</h3>
                    <p>Remove hair, makeup, or other obstructions from the area being photographed when possible.</p>
                  </div>
                </div>
                
                <div className="guide-examples">
                  <h3>Examples</h3>
                  <div className="example-grid">
                    <div className="example-item good">
                      <div className="example-image">
                        <img src="/images/good-photo-example.jpg" alt="Good photo example" />
                        <div className="example-badge">Good</div>
                      </div>
                      <p>Clear, well-lit, focused image with visible details</p>
                    </div>
                    <div className="example-item bad">
                      <div className="example-image">
                        <img src="/images/bad-photo-example.jpg" alt="Bad photo example" />
                        <div className="example-badge">Poor</div>
                      </div>
                      <p>Blurry, poorly lit image with distracting elements</p>
                    </div>
                  </div>
                </div>
                
                <div className="guide-cta">
                  <button 
                    className="guide-cta-button"
                    onClick={() => setActiveTab('upload')}
                  >
                    Ready to Upload
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'about' && (
              <div className="analysis-about">
                <h2>About Our AI Technology</h2>
                
                <div className="about-content">
                  <div className="about-image">
                    <img src="/images/ai-technology.jpg" alt="AI Technology" />
                  </div>
                  
                  <div className="about-text">
                    <h3>Advanced Deep Learning</h3>
                    <p>Our skin cancer detection system uses EfficientNet, a state-of-the-art convolutional neural network architecture optimized for both accuracy and computational efficiency. The model has been trained on over 100,000 dermatological images across diverse skin types and conditions.</p>
                    
                    <h3>Medical Validation</h3>
                    <p>The system has been validated against diagnoses from board-certified dermatologists, achieving over 90% accuracy for the seven most common types of skin cancer and concerning lesions.</p>
                    
                    <h3>Continuous Improvement</h3>
                    <p>Our AI models are continuously refined through regular retraining with new validated data, ensuring the system stays current with the latest dermatological research and improves over time.</p>
                    
                    <h3>Privacy & Security</h3>
                    <p>All images are processed with strict privacy controls. Your uploads are encrypted in transit and at rest, and are only used for providing you with analysis results unless you explicitly opt in to contribute to research.</p>
                    
                    <div className="about-stats">
                      <div className="stat-item">
                        <div className="stat-value">90%+</div>
                        <div className="stat-label">Accuracy</div>
                      </div>
                      <div className="stat-item">
                        <div className="stat-value">7</div>
                        <div className="stat-label">Cancer Types</div>
                      </div>
                      <div className="stat-item">
                        <div className="stat-value">100K+</div>
                        <div className="stat-label">Training Images</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="about-disclaimer">
                  <h3>Important Disclaimer</h3>
                  <p>This tool is designed to assist in the preliminary assessment of skin lesions and should not replace professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider for any medical concerns. Early detection significantly improves treatment outcomes for skin cancer.</p>
                  
                  <div className="about-cta">
                    <button 
                      className="about-cta-button"
                      onClick={() => setActiveTab('upload')}
                    >
                      Start Analysis
                    </button>
                    <Link href="/resources" className="about-cta-link">
                      Learn More About Skin Cancer
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

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
                
                <ul className="upload-guidelines">
                  <li>
                    <div className="guideline-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="guideline-content">
                      <h3>Clear, Well-Lit Photo</h3>
                      <p>Ensure good lighting and focus on the area of concern</p>
                    </div>
                  </li>
                  <li>
                    <div className="guideline-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="guideline-content">
                      <h3>Close-Up View</h3>
                      <p>Take a close-up photo that clearly shows the skin area</p>
                    </div>
                  </li>
                  <li>
                    <div className="guideline-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                      </svg>
                    </div>
                    <div className="guideline-content">
                      <h3>Multiple Angles</h3>
                      <p>If possible, take photos from different angles</p>
                    </div>
                  </li>
                </ul>

                <div className="upload-zone">
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="file-input"
                  />
                  <label htmlFor="image-upload" className="upload-label">
                    <div className="upload-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                    </div>
                    <p>Click to upload or drag and drop</p>
                    <span className="upload-hint">PNG, JPG, JPEG up to 10MB</span>
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
                    <div className="image-preview">
                      <Image
                        src={selectedImage}
                        alt="Selected skin area"
                        layout="fill"
                        objectFit="contain"
                      />
                      <button 
                        className="analyze-button"
                        onClick={handleAnalysis}
                        disabled={isAnalyzing}
                      >
                        {isAnalyzing ? (
                          <>
                            <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Analyzing...
                          </>
                        ) : (
                          <>
                            Start Analysis
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </>
                        )}
                      </button>
                    </div>
                  ) : (
                    <div className="preview-placeholder">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p>Your image will appear here</p>
                    </div>
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
                  <ul>
                    {analysisResult.recommendations.map((rec, index) => (
                      <li key={index}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {rec}
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
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
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
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>{error}</p>
            </div>
          </div>
        </motion.div>
      )}

      <style jsx>{`
        .analysis-page {
          padding: 2rem 0 6rem;
          background-color: ${isDarkMode ? 'var(--dark-bg)' : 'var(--light-bg)'};
          min-height: calc(100vh - 70px);
        }
        
        .analysis-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        
        .analysis-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          background: linear-gradient(90deg, var(--primary) 0%, var(--primary-light) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .analysis-description {
          font-size: 1.25rem;
          color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
          max-width: 700px;
          margin: 0 auto;
        }
        
        .analysis-tabs {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 2.5rem;
          flex-wrap: wrap;
        }
        
        .analysis-tab {
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          font-weight: 500;
          font-size: 1rem;
          background-color: ${isDarkMode ? 'var(--dark-card)' : 'var(--light-card)'};
          color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
          border: 1px solid ${isDarkMode ? 'var(--dark-border)' : 'var(--light-border)'};
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .analysis-tab:hover {
          background-color: ${isDarkMode ? 'var(--dark-bg-secondary)' : 'var(--light-bg-secondary)'};
        }
        
        .analysis-tab.active {
          background-color: var(--primary);
          color: white;
          border-color: var(--primary);
        }
        
        .analysis-content {
          max-width: 1000px;
          margin: 0 auto;
          background-color: ${isDarkMode ? 'var(--dark-card)' : 'var(--light-card)'};
          border-radius: 1rem;
          box-shadow: var(--shadow-lg);
          overflow: hidden;
          border: 1px solid ${isDarkMode ? 'var(--dark-border)' : 'var(--light-border)'};
        }
        
        .analysis-upload-container {
          padding: 2rem;
        }
        
        /* Photo Guide Styles */
        .analysis-guide {
          padding: 3rem;
        }
        
        .analysis-guide h2 {
          font-size: 1.75rem;
          margin-bottom: 2rem;
          text-align: center;
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
        }
        
        .guide-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }
        
        .guide-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        
        .guide-icon {
          width: 3.5rem;
          height: 3.5rem;
          border-radius: 50%;
          background-color: ${isDarkMode ? 'rgba(56, 189, 248, 0.1)' : 'rgba(2, 132, 199, 0.1)'};
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
          color: var(--primary);
        }
        
        .guide-icon svg {
          width: 1.75rem;
          height: 1.75rem;
        }
        
        .guide-item h3 {
          font-size: 1.25rem;
          margin-bottom: 0.75rem;
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
        }
        
        .guide-item p {
          color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
          line-height: 1.6;
        }
        
        .guide-examples {
          margin-bottom: 3rem;
        }
        
        .guide-examples h3 {
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
          text-align: center;
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
        }
        
        .example-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }
        
        .example-item {
          text-align: center;
        }
        
        .example-image {
          position: relative;
          border-radius: 0.75rem;
          overflow: hidden;
          margin-bottom: 1rem;
          box-shadow: var(--shadow);
        }
        
        .example-image img {
          width: 100%;
          height: auto;
          display: block;
        }
        
        .example-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          font-weight: 600;
          font-size: 0.875rem;
        }
        
        .good .example-badge {
          background-color: rgba(16, 185, 129, 0.9);
          color: white;
        }
        
        .bad .example-badge {
          background-color: rgba(239, 68, 68, 0.9);
          color: white;
        }
        
        .example-item p {
          color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
        }
        
        .guide-cta {
          text-align: center;
        }
        
        .guide-cta-button {
          padding: 0.875rem 2rem;
          border-radius: 0.5rem;
          font-weight: 600;
          font-size: 1.125rem;
          background: linear-gradient(90deg, var(--primary) 0%, var(--primary-light) 100%);
          color: white;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 14px rgba(0, 118, 255, 0.39);
        }
        
        .guide-cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 118, 255, 0.5);
        }
        
        /* About Technology Styles */
        .analysis-about {
          padding: 3rem;
        }
        
        .analysis-about h2 {
          font-size: 1.75rem;
          margin-bottom: 2rem;
          text-align: center;
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
        }
        
        .about-content {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 3rem;
          margin-bottom: 3rem;
        }
        
        .about-image {
          border-radius: 0.75rem;
          overflow: hidden;
          box-shadow: var(--shadow-lg);
        }
        
        .about-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        
        .about-text h3 {
          font-size: 1.25rem;
          margin: 1.5rem 0 0.75rem;
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
        }
        
        .about-text h3:first-child {
          margin-top: 0;
        }
        
        .about-text p {
          color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
          line-height: 1.6;
          margin-bottom: 1rem;
        }
        
        .about-stats {
          display: flex;
          justify-content: space-between;
          margin-top: 2rem;
          background-color: ${isDarkMode ? 'var(--dark-bg)' : 'var(--light-bg-secondary)'};
          border-radius: 0.75rem;
          padding: 1.5rem;
        }
        
        .stat-item {
          text-align: center;
        }
        
        .stat-value {
          font-size: 2rem;
          font-weight: 700;
          color: var(--primary);
          margin-bottom: 0.25rem;
        }
        
        .stat-label {
          font-size: 0.875rem;
          color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
        }
        
        .about-disclaimer {
          background-color: ${isDarkMode ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.05)'};
          border-left: 4px solid #ef4444;
          padding: 1.5rem;
          border-radius: 0.5rem;
        }
        
        .about-disclaimer h3 {
          font-size: 1.25rem;
          margin-bottom: 0.75rem;
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
        }
        
        .about-disclaimer p {
          color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }
        
        .about-cta {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        
        .about-cta-button {
          padding: 0.875rem 2rem;
          border-radius: 0.5rem;
          font-weight: 600;
          font-size: 1.125rem;
          background: linear-gradient(90deg, var(--primary) 0%, var(--primary-light) 100%);
          color: white;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 14px rgba(0, 118, 255, 0.39);
        }
        
        .about-cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 118, 255, 0.5);
        }
        
        .about-cta-link {
          padding: 0.875rem 2rem;
          border-radius: 0.5rem;
          font-weight: 500;
          font-size: 1.125rem;
          background: transparent;
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
          border: 1px solid ${isDarkMode ? 'var(--dark-border)' : 'var(--light-border)'};
          text-decoration: none;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
        }
        
        .about-cta-link:hover {
          background-color: ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
        }
        
        @media (max-width: 768px) {
          .analysis-page {
            padding: 1rem 0 4rem;
          }
          
          .analysis-title {
            font-size: 2rem;
          }
          
          .analysis-description {
            font-size: 1.125rem;
          }
          
          .analysis-guide, 
          .analysis-about,
          .analysis-upload-container {
            padding: 1.5rem;
          }
          
          .about-content {
            grid-template-columns: 1fr;
          }
          
          .about-image {
            max-height: 300px;
          }
          
          .about-cta {
            flex-direction: column;
          }
          
          .about-cta-button,
          .about-cta-link {
            width: 100%;
            text-align: center;
            justify-content: center;
          }
        }

        /* Hero Section */
        .analysis-hero {
          padding: 160px 0 120px;
          background: ${isDarkMode ? 
            'radial-gradient(circle at 50% -20%, rgba(56, 189, 248, 0.1), transparent 800px)' :
            'radial-gradient(circle at 50% -20%, rgba(2, 132, 199, 0.1), transparent 800px)'
          };
          text-align: center;
        }

        .hero-content {
          max-width: 800px;
          margin: 0 auto;
        }

        .overline {
          text-transform: uppercase;
          font-size: 0.875rem;
          font-weight: 600;
          letter-spacing: 2px;
          color: var(--primary);
          margin-bottom: 16px;
          display: block;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 24px;
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
        }

        .hero-subtitle {
          font-size: 1.25rem;
          line-height: 1.6;
          color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
          max-width: 600px;
          margin: 0 auto;
        }

        /* Upload Section */
        .upload-section {
          background: ${isDarkMode ? 'var(--dark-bg)' : 'var(--light-bg)'};
        }

        .upload-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
        }

        .upload-card, .preview-card {
          background: ${isDarkMode ? 'var(--dark-card)' : 'var(--light-card)'};
          border-radius: 24px;
          padding: 32px;
          border: 1px solid ${isDarkMode ? 'var(--dark-border)' : 'var(--light-border)'};
        }

        .upload-card h2, .preview-card h2 {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 16px;
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
        }

        .upload-card p {
          font-size: 1.125rem;
          line-height: 1.6;
          color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
          margin-bottom: 32px;
        }

        /* Upload Guidelines */
        .upload-guidelines {
          list-style: none;
          padding: 0;
          margin: 0 0 32px;
        }

        .upload-guidelines li {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 24px;
        }

        .guideline-icon {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: ${isDarkMode ? 'var(--dark-bg)' : 'var(--light-bg)'};
          border-radius: 12px;
          color: var(--primary);
        }

        .guideline-icon svg {
          width: 24px;
          height: 24px;
        }

        .guideline-content h3 {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 4px;
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
        }

        .guideline-content p {
          font-size: 1rem;
          margin-bottom: 0;
          color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
        }

        /* Upload Zone */
        .upload-zone {
          border: 2px dashed ${isDarkMode ? 'var(--dark-border)' : 'var(--light-border)'};
          border-radius: 16px;
          padding: 32px;
          text-align: center;
          transition: all 0.3s ease;
        }

        .upload-zone:hover {
          border-color: var(--primary);
          background: ${isDarkMode ? 'rgba(56, 189, 248, 0.05)' : 'rgba(2, 132, 199, 0.05)'};
        }

        .file-input {
          display: none;
        }

        .upload-label {
          cursor: pointer;
        }

        .upload-icon {
          width: 64px;
          height: 64px;
          margin: 0 auto 16px;
          color: var(--primary);
        }

        .upload-icon svg {
          width: 100%;
          height: 100%;
        }

        .upload-label p {
          font-size: 1.125rem;
          font-weight: 500;
          margin-bottom: 8px;
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
        }

        .upload-hint {
          font-size: 0.875rem;
          color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
        }

        /* Preview Area */
        .preview-container {
          aspect-ratio: 1;
          background: ${isDarkMode ? 'var(--dark-bg)' : 'var(--light-bg)'};
          border-radius: 16px;
          overflow: hidden;
          position: relative;
        }

        .image-preview {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .preview-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
        }

        .preview-placeholder svg {
          width: 64px;
          height: 64px;
          margin-bottom: 16px;
        }

        .preview-placeholder p {
          font-size: 1.125rem;
        }

        /* Analysis Button */
        .analyze-button {
          position: absolute;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
          color: white;
          padding: 16px 32px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 1.125rem;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(0, 118, 255, 0.2);
        }

        .analyze-button:hover {
          transform: translateX(-50%) translateY(-2px);
          box-shadow: 0 8px 30px rgba(0, 118, 255, 0.3);
        }

        .analyze-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        /* Results Section */
        .results-section {
          background: ${isDarkMode ? 'var(--dark-bg-secondary)' : 'var(--light-bg-secondary)'};
        }

        .results-card {
          background: ${isDarkMode ? 'var(--dark-card)' : 'var(--light-card)'};
          border-radius: 24px;
          padding: 32px;
          border: 1px solid ${isDarkMode ? 'var(--dark-border)' : 'var(--light-border)'};
        }

        .results-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
        }

        .results-header h2 {
          font-size: 2rem;
          font-weight: 700;
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
        }

        .confidence-badge {
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: 600;
          font-size: 0.875rem;
        }

        .results-content {
          display: grid;
          gap: 32px;
        }

        .result-type h3,
        .result-description h3,
        .result-recommendations h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 16px;
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
        }

        .type-name {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--primary);
        }

        .result-description p {
          font-size: 1.125rem;
          line-height: 1.6;
          color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
        }

        .result-recommendations ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .result-recommendations li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 1.125rem;
          line-height: 1.6;
          color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
          margin-bottom: 16px;
        }

        .result-recommendations li svg {
          width: 24px;
          height: 24px;
          color: var(--primary);
          flex-shrink: 0;
        }

        .results-footer {
          margin-top: 32px;
          padding-top: 32px;
          border-top: 1px solid ${isDarkMode ? 'var(--dark-border)' : 'var(--light-border)'};
        }

        .disclaimer {
          font-size: 0.875rem;
          line-height: 1.6;
          color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
          margin-bottom: 24px;
          text-align: center;
        }

        .new-analysis-button {
          background: ${isDarkMode ? 'var(--dark-bg)' : 'var(--light-bg)'};
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
          padding: 16px 32px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 1.125rem;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
          border: 1px solid ${isDarkMode ? 'var(--dark-border)' : 'var(--light-border)'};
          cursor: pointer;
        }

        .new-analysis-button:hover {
          background: ${isDarkMode ? 'var(--dark-bg-secondary)' : 'var(--light-bg-secondary)'};
        }

        /* Error Message */
        .error-message {
          position: fixed;
          bottom: 24px;
          left: 0;
          right: 0;
          z-index: 100;
        }

        .error-content {
          background: ${isDarkMode ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.1)'};
          border: 1px solid var(--error);
          border-radius: 12px;
          padding: 16px 24px;
          display: flex;
          align-items: center;
          gap: 12px;
          max-width: 600px;
          margin: 0 auto;
        }

        .error-content svg {
          width: 24px;
          height: 24px;
          color: var(--error);
        }

        .error-content p {
          color: var(--error);
          font-weight: 500;
          margin: 0;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .upload-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          section {
            padding: 80px 0;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .upload-card, .preview-card {
            padding: 24px;
          }

          .results-header {
            flex-direction: column;
            gap: 16px;
            text-align: center;
          }
        }
      `}</style>
    </Layout>
  );
} 