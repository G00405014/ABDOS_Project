import { useState } from 'react';
import Layout from '../components/Layout';
import ImageAnalysis from '../components/ImageAnalysis';
import { useTheme } from '../context/ThemeContext';
import Link from 'next/link';

export default function Analysis() {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('upload');

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
      `}</style>
    </Layout>
  );
} 