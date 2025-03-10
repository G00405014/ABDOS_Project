import { useTheme } from '../context/ThemeContext';
import TypewriterText from '../components/TypewriterText';
import HealthAssistant from '../components/HealthAssistant';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import ImageAnalysis from '../components/ImageAnalysis';
import Layout from '../components/Layout';

export default function Home() {
  const { isDarkMode } = useTheme();
  const [activeSection, setActiveSection] = useState('home');
  const [animatedElements, setAnimatedElements] = useState([]);
  const sectionsRef = useRef({});

  useEffect(() => {
    // Setup intersection observer for animation on scroll
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15,
    };

    const handleIntersect = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add to animated elements so it stays visible
          setAnimatedElements(prev => [...prev, entry.target.id]);
          
          // If it's a section, update active section
          if (entry.target.dataset.section) {
            setActiveSection(entry.target.id);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    // Observe all elements with the 'animate-on-scroll' class
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });
    
    // Observe sections for active state
    document.querySelectorAll('[data-section]').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const isElementAnimated = (id) => {
    return animatedElements.includes(id);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-section" id="hero" data-section="true">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text-container animate-on-scroll" id="hero-text">
              <h1 className="hero-title">
                Early Detection of Skin Cancer with <span className="text-gradient">AI Technology</span>
              </h1>
              <p className="hero-description">
                Our advanced AI platform analyzes skin lesions to identify potential skin cancers with high accuracy, providing you with peace of mind and early detection.
              </p>
              
              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-number">90%+</span>
                  <span className="stat-label">Accuracy Rate</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">7</span>
                  <span className="stat-label">Cancer Types</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">10s</span>
                  <span className="stat-label">Analysis Time</span>
                </div>
              </div>
              
              <div className="hero-buttons">
                <Link href="/analysis" className="hero-button primary">
                  Try Analysis Now
                </Link>
                <Link href="/about" className="hero-button secondary">
                  Learn More
                </Link>
              </div>
            </div>
            
            <div className="hero-image-container animate-on-scroll" id="hero-image">
              <div className="image-wrapper">
                <img 
                  src="/images/hero-image.jpg"
                  alt="AI-powered skin cancer detection visualization" 
                  className="hero-image"
                />
                <div className="image-badge">
                  <span className="badge-text">Medically Validated</span>
                </div>
                
                <div className="image-overlay">
                  <div className="overlay-content">
                    <div className="overlay-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="overlay-stats">
                      <div className="overlay-stat">
                        <span className="overlay-stat-value">90%+</span>
                        <span className="overlay-stat-label">Accuracy</span>
                      </div>
                      <div className="overlay-stat">
                        <span className="overlay-stat-value">7</span>
                        <span className="overlay-stat-label">Cancer Types</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="image-decoration">
                <div className="decoration-circle"></div>
                <div className="decoration-line"></div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .hero-section {
            padding: 9rem 0 6rem;
            background-color: ${isDarkMode ? 'var(--dark-bg)' : 'var(--light-bg-secondary)'};
            position: relative;
            overflow: hidden;
          }
          
          .hero-section::before {
            content: '';
            position: absolute;
            top: -10%;
            right: -5%;
            width: 40%;
            height: 70%;
            background: radial-gradient(circle, ${isDarkMode ? 'rgba(56, 189, 248, 0.1)' : 'rgba(2, 132, 199, 0.1)'}, transparent 70%);
            border-radius: 50%;
            z-index: 0;
          }
          
          .hero-content {
            gap: 4rem;
            position: relative;
            z-index: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          
          .hero-text-container {
            flex: 1;
            max-width: 600px;
          }
          
          .hero-image-container {
            flex: 1;
            display: flex;
            justify-content: flex-end;
            position: relative;
          }
          
          .hero-title {
            font-size: 3.5rem;
            line-height: 1.1;
            letter-spacing: -0.02em;
            margin-bottom: 1.5rem;
          }
          
          .hero-typed-text {
            display: block;
            min-height: 4rem;
          }
          
          .hero-description {
            font-size: 1.25rem;
            line-height: 1.6;
            color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
            margin-bottom: 2rem;
            max-width: 32rem;
          }
          
          .hero-stats {
            display: flex;
            gap: 2rem;
            margin-bottom: 2.5rem;
          }
          
          .stat-item {
            display: flex;
            flex-direction: column;
          }
          
          .stat-number {
            font-size: 2rem;
            font-weight: 700;
            color: var(--primary);
            line-height: 1;
          }
          
          .stat-label {
            font-size: 0.875rem;
            color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
            margin-top: 0.5rem;
          }
          
          .hero-buttons {
            display: flex;
            gap: 1rem;
          }
          
          .hero-button {
            padding: 0.875rem 2rem;
            border-radius: 0.5rem;
            font-weight: 600;
            font-size: 1.125rem;
            text-decoration: none;
            transition: all 0.3s ease;
            display: inline-flex;
            align-items: center;
            justify-content: center;
          }
          
          .hero-button.primary {
            background: linear-gradient(90deg, var(--primary) 0%, var(--primary-light) 100%);
            color: white;
            box-shadow: 0 4px 14px rgba(0, 118, 255, 0.39);
          }
          
          .hero-button.primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 118, 255, 0.5);
          }
          
          .hero-button.secondary {
            background: transparent;
            color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
            border: 2px solid ${isDarkMode ? 'var(--dark-border)' : 'var(--light-border)'};
          }
          
          .hero-button.secondary:hover {
            background-color: ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
            transform: translateY(-2px);
          }
          
          .image-wrapper {
            position: relative;
            border-radius: 1rem;
            overflow: hidden;
            box-shadow: var(--shadow-xl);
            transform: perspective(1000px) rotateY(-5deg);
            transition: transform 0.5s ease, box-shadow 0.5s ease;
            max-width: 550px;
            border: 1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
          }
          
          .image-wrapper:hover {
            transform: perspective(1000px) rotateY(0);
            box-shadow: var(--shadow-2xl);
          }
          
          .hero-image {
            width: 100%;
            height: auto;
            object-fit: cover;
            transition: transform 0.5s ease;
            display: block;
          }
          
          .image-badge {
            position: absolute;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, var(--primary), var(--primary-light));
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 2rem;
            font-size: 0.875rem;
            font-weight: 600;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 2;
          }
          
          .image-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(to top, 
              ${isDarkMode ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)'}, 
              transparent);
            padding: 2rem 1.5rem 1.5rem;
            transform: translateY(100%);
            transition: transform 0.4s ease;
            z-index: 1;
          }
          
          .image-wrapper:hover .image-overlay {
            transform: translateY(0);
          }
          
          .overlay-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
          }
          
          .overlay-icon {
            width: 3rem;
            height: 3rem;
            border-radius: 50%;
            background: var(--primary);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
          }
          
          .overlay-icon svg {
            width: 1.5rem;
            height: 1.5rem;
          }
          
          .overlay-stats {
            display: flex;
            gap: 2rem;
            width: 100%;
            justify-content: center;
          }
          
          .overlay-stat {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          
          .overlay-stat-value {
            font-size: 1.5rem;
            font-weight: 700;
            color: ${isDarkMode ? 'white' : 'var(--primary)'};
          }
          
          .overlay-stat-label {
            font-size: 0.75rem;
            color: ${isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'var(--light-text-secondary)'};
          }
          
          .image-decoration {
            position: absolute;
            top: 50%;
            left: -30px;
            transform: translateY(-50%);
            z-index: -1;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
          }
          
          .decoration-circle {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            border: 2px dashed var(--primary);
            opacity: 0.5;
          }
          
          .decoration-line {
            width: 2px;
            height: 100px;
            background: linear-gradient(to bottom, var(--primary), transparent);
            opacity: 0.5;
          }
          
          @media (max-width: 1024px) {
            .hero-title {
              font-size: 3rem;
            }
            
            .hero-content {
              flex-direction: column;
              gap: 3rem;
              text-align: center;
            }
            
            .hero-text-container {
              max-width: 100%;
            }
            
            .hero-image-container {
              justify-content: center;
              width: 100%;
            }
            
            .hero-stats {
              justify-content: center;
            }
            
            .hero-buttons {
              justify-content: center;
            }
            
            .image-decoration {
              display: none;
            }
          }
          
          @media (max-width: 768px) {
            .hero-section {
              padding: 7rem 0 4rem;
            }
            
            .hero-title {
              font-size: 2.5rem;
            }
            
            .hero-typed-text {
              min-height: 3rem;
            }
            
            .hero-stats {
              flex-wrap: wrap;
              gap: 1.5rem;
            }
            
            .hero-buttons {
              flex-direction: column;
            }
          }
        `}</style>
      </section>
      
      {/* How It Works Section */}
      <section className="section" id="features" data-section="true">
        <div className="container">
          <div className="section-header animate-on-scroll" id="features-header">
            <h2 className="section-title">How It Works</h2>
            <p className="section-description">
              Our advanced AI platform uses deep learning algorithms trained on thousands of clinical images to provide accurate skin lesion analysis
            </p>
          </div>
          
          <div className="features-grid">
            <div className={`feature-card animate-on-scroll ${isElementAnimated('feature-1') ? 'animated' : ''}`} id="feature-1">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="feature-title">Upload Image</h3>
              <p className="feature-description">
                Take a clear photo of your skin lesion or upload an existing image. Our system works with various image formats and quality levels.
              </p>
              <ul className="feature-list">
                <li>Supports JPEG, PNG, and HEIC formats</li>
                <li>Works with smartphone camera photos</li>
                <li>Secure, encrypted file transfer</li>
              </ul>
            </div>
            
            <div className={`feature-card animate-on-scroll ${isElementAnimated('feature-2') ? 'animated' : ''}`} id="feature-2">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="feature-title">AI Analysis</h3>
              <p className="feature-description">
                Our advanced deep learning model analyzes the image using the same patterns dermatologists look for when identifying potential skin cancers.
              </p>
              <ul className="feature-list">
                <li>Trained on 100,000+ clinical images</li>
                <li>Identifies 7 common skin cancer types</li>
                <li>Processes in just seconds</li>
              </ul>
            </div>
            
            <div className={`feature-card animate-on-scroll ${isElementAnimated('feature-3') ? 'animated' : ''}`} id="feature-3">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="feature-title">Get Results</h3>
              <p className="feature-description">
                Receive a detailed assessment with potential condition matches, confidence levels, and recommended next steps.
              </p>
              <ul className="feature-list">
                <li>Risk level assessment</li>
                <li>Confidence percentage</li>
                <li>Option to generate detailed reports</li>
              </ul>
            </div>
            
            <div className={`feature-card animate-on-scroll ${isElementAnimated('feature-4') ? 'animated' : ''}`} id="feature-4">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="feature-title">Medical Follow-up</h3>
              <p className="feature-description">
                If a concerning lesion is detected, we provide guidance on next steps and how to seek professional medical care.
              </p>
              <ul className="feature-list">
                <li>Find nearby dermatologists</li>
                <li>Educational resources</li>
                <li>Preparation for doctor visits</li>
              </ul>
            </div>
          </div>
          
          <div className="technology-highlight animate-on-scroll" id="tech-highlight">
            <div className="tech-content">
              <h3>Powered by Advanced Technology</h3>
              <p>Our AI model is built on EfficientNet architecture and trained on diverse datasets to ensure accuracy across different skin types, ages, and lesion characteristics.</p>
              <div className="tech-stats">
                <div className="tech-stat">
                  <span className="tech-number">90%+</span>
                  <span className="tech-label">Accuracy</span>
                </div>
                <div className="tech-stat">
                  <span className="tech-number">7</span>
                  <span className="tech-label">Cancer Types</span>
                </div>
                <div className="tech-stat">
                  <span className="tech-number">100K+</span>
                  <span className="tech-label">Training Images</span>
                </div>
              </div>
            </div>
            <div className="tech-image">
              <img src="/images/ai-visualization.jpg" alt="AI visualization" />
            </div>
          </div>
        </div>

        <style jsx>{`
          .section {
            padding: 6rem 0;
            background-color: ${isDarkMode ? 'var(--dark-bg-secondary)' : 'var(--light-bg)'};
          }
          
          .section-header {
            text-align: center;
            margin-bottom: 4rem;
          }
          
          .section-title {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 1rem;
            color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
          }
          
          .section-description {
            font-size: 1.125rem;
            color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
            max-width: 700px;
            margin: 0 auto;
          }
          
          .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 2.5rem;
            margin-top: 2rem;
          }
          
          .feature-card {
            background-color: ${isDarkMode ? 'var(--dark-card)' : 'var(--light-card)'};
            padding: 2.5rem;
            border-radius: 1rem;
            box-shadow: var(--shadow);
            transition: all 0.3s ease;
            height: 100%;
            border: 1px solid ${isDarkMode ? 'var(--dark-border)' : 'var(--light-border)'};
            display: flex;
            flex-direction: column;
          }
          
          .feature-card:hover {
            transform: translateY(-0.5rem);
            box-shadow: var(--shadow-lg);
          }
          
          .feature-icon {
            width: 3.5rem;
            height: 3.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1.5rem;
            border-radius: 0.75rem;
            background-color: ${isDarkMode ? 'rgba(56, 189, 248, 0.1)' : 'rgba(2, 132, 199, 0.1)'};
          }
          
          .feature-icon svg {
            width: 1.75rem;
            height: 1.75rem;
            color: var(--primary);
          }
          
          .feature-title {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 1rem;
            color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
          }
          
          .feature-description {
            color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
            line-height: 1.6;
            margin-bottom: 1.5rem;
          }
          
          .feature-list {
            list-style-type: none;
            padding: 0;
            margin: 0;
            margin-top: auto;
          }
          
          .feature-list li {
            position: relative;
            padding-left: 1.5rem;
            margin-bottom: 0.75rem;
            color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
            font-size: 0.95rem;
          }
          
          .feature-list li:before {
            content: "✓";
            position: absolute;
            left: 0;
            color: var(--primary);
            font-weight: bold;
          }
          
          .technology-highlight {
            margin-top: 5rem;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
            background-color: ${isDarkMode ? 'var(--dark-card)' : 'var(--light-card)'};
            border-radius: 1rem;
            overflow: hidden;
            box-shadow: var(--shadow-lg);
            border: 1px solid ${isDarkMode ? 'var(--dark-border)' : 'var(--light-border)'};
          }
          
          .tech-content {
            padding: 3rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          
          .tech-content h3 {
            font-size: 1.75rem;
            font-weight: 700;
            margin-bottom: 1rem;
            color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
          }
          
          .tech-content p {
            color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
            line-height: 1.7;
            margin-bottom: 2rem;
          }
          
          .tech-stats {
            display: flex;
            gap: 2rem;
          }
          
          .tech-stat {
            display: flex;
            flex-direction: column;
          }
          
          .tech-number {
            font-size: 2rem;
            font-weight: 700;
            color: var(--primary);
          }
          
          .tech-label {
            font-size: 0.875rem;
            color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
          }
          
          .tech-image {
            overflow: hidden;
          }
          
          .tech-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          
          @media (max-width: 1024px) {
            .technology-highlight {
              grid-template-columns: 1fr;
            }
            
            .tech-image {
              height: 300px;
            }
          }
          
          @media (max-width: 768px) {
            .section-title {
              font-size: 2rem;
            }
            
            .tech-content {
              padding: 2rem;
            }
            
            .tech-stats {
              flex-wrap: wrap;
              gap: 1.5rem;
            }
          }
        `}</style>
      </section>
      
      {/* Analysis Section */}
      <section className="section analysis-section" id="analysis" data-section="true">
        <div className="container">
          <div className="section-header animate-on-scroll" id="analysis-header">
            <h2 className="section-title">Try it Now</h2>
            <p className="section-description">
              Upload an image to get a preliminary assessment of your skin condition
            </p>
          </div>
          
          <div className={`analysis-container animate-on-scroll ${isElementAnimated('analysis-component') ? 'animated' : ''}`} id="analysis-component">
            <div className="analysis-card">
              <ImageAnalysis />
            </div>
          </div>
        </div>

        <style jsx>{`
          .analysis-section {
            background-color: ${isDarkMode ? 'var(--dark-bg)' : 'var(--light-bg-secondary)'};
            padding: 6rem 0;
          }
          
          .analysis-container {
            max-width: 900px;
            margin: 0 auto;
          }
          
          .analysis-card {
            background-color: ${isDarkMode ? 'var(--dark-card)' : 'var(--light-card)'};
            border-radius: 1rem;
            box-shadow: var(--shadow-lg);
            overflow: hidden;
            border: 1px solid ${isDarkMode ? 'var(--dark-border)' : 'var(--light-border)'};
          }
        `}</style>
      </section>
      
      {/* FAQ Section - Expanded */}
      <section className="section" id="faq" data-section="true">
        <div className="container">
          <div className="section-header animate-on-scroll" id="faq-header">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-description">
              Common questions about our AI skin cancer detection technology
            </p>
          </div>
          
          <div className="faq-container">
            <div className={`faq-item animate-on-scroll ${isElementAnimated('faq-1') ? 'animated' : ''}`} id="faq-1">
              <div className="faq-question">
                <h3>How accurate is the skin cancer detection?</h3>
              </div>
              <div className="faq-answer">
                <p>Our AI model has been trained on over 100,000 medical images and achieves an accuracy rate of 90%+ for common skin cancers. The system is particularly effective at identifying melanoma, basal cell carcinoma, and squamous cell carcinoma. However, it's designed as a preliminary assessment tool, not a replacement for professional medical diagnosis.</p>
              </div>
            </div>
            
            <div className={`faq-item animate-on-scroll ${isElementAnimated('faq-2') ? 'animated' : ''}`} id="faq-2">
              <div className="faq-question">
                <h3>Is my data secure when using this service?</h3>
              </div>
              <div className="faq-answer">
                <p>Yes, we take data security very seriously. All images are encrypted during transmission and storage using industry-standard protocols. We comply with healthcare privacy standards including HIPAA guidelines, and you can request deletion of your data at any time through your account settings or by contacting our support team.</p>
              </div>
            </div>
            
            <div className={`faq-item animate-on-scroll ${isElementAnimated('faq-3') ? 'animated' : ''}`} id="faq-3">
              <div className="faq-question">
                <h3>What types of skin cancer can the system detect?</h3>
              </div>
              <div className="faq-answer">
                <p>Our system is trained to identify seven common types of skin cancer, including melanoma, basal cell carcinoma, squamous cell carcinoma, actinic keratosis, dermatofibroma, vascular lesions, and benign keratosis-like lesions. The model is continuously being improved to detect additional skin conditions.</p>
              </div>
            </div>
            
            <div className={`faq-item animate-on-scroll ${isElementAnimated('faq-4') ? 'animated' : ''}`} id="faq-4">
              <div className="faq-question">
                <h3>How should I take photos for the best analysis results?</h3>
              </div>
              <div className="faq-answer">
                <p>For optimal results, take photos in good lighting conditions (natural daylight is best), keep the camera steady, ensure the lesion is in focus, and include some surrounding skin for context. Take multiple photos from different angles if possible. Remove any hair, makeup, or other obstructions from the area being photographed.</p>
              </div>
            </div>
            
            <div className={`faq-item animate-on-scroll ${isElementAnimated('faq-5') ? 'animated' : ''}`} id="faq-5">
              <div className="faq-question">
                <h3>What should I do if the system identifies a high-risk lesion?</h3>
              </div>
              <div className="faq-answer">
                <p>If our system identifies a high-risk lesion, we recommend consulting with a dermatologist or healthcare provider as soon as possible. Our analysis provides a risk assessment, not a definitive diagnosis. You can download or share your analysis report with your healthcare provider to assist in their evaluation.</p>
              </div>
            </div>
            
            <div className={`faq-item animate-on-scroll ${isElementAnimated('faq-6') ? 'animated' : ''}`} id="faq-6">
              <div className="faq-question">
                <h3>Does the system work for all skin types and colors?</h3>
              </div>
              <div className="faq-answer">
                <p>Yes, our AI model has been trained on a diverse dataset that includes various skin types, colors, and ethnicities. We've made a conscious effort to ensure the system performs well across the full spectrum of skin tones, though we continuously work to improve accuracy for all users.</p>
              </div>
            </div>
          </div>
          
          <div className="faq-more animate-on-scroll" id="faq-more">
            <p>Have more questions? Check our comprehensive <Link href="/resources" className="faq-link">resources section</Link> or <Link href="/contact" className="faq-link">contact our team</Link>.</p>
          </div>
        </div>

        <style jsx>{`
          .faq-container {
            max-width: 800px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
          }
          
          .faq-item {
            background-color: ${isDarkMode ? 'var(--dark-card)' : 'var(--light-card)'};
            border-radius: 0.75rem;
            overflow: hidden;
            box-shadow: var(--shadow);
            border: 1px solid ${isDarkMode ? 'var(--dark-border)' : 'var(--light-border)'};
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          
          .faq-item:hover {
            transform: translateY(-3px);
            box-shadow: var(--shadow-md);
          }
          
          .faq-question {
            padding: 1.5rem;
            cursor: pointer;
          }
          
          .faq-question h3 {
            font-size: 1.125rem;
            font-weight: 600;
            color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
            margin: 0;
            position: relative;
            padding-right: 1.5rem;
          }
          
          .faq-answer {
            padding: 0 1.5rem 1.5rem;
          }
          
          .faq-answer p {
            margin: 0;
            color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
            line-height: 1.6;
          }
          
          .faq-more {
            text-align: center;
            margin-top: 3rem;
          }
          
          .faq-more p {
            color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
            font-size: 1.125rem;
          }
          
          .faq-link {
            color: var(--primary);
            text-decoration: none;
            font-weight: 500;
            transition: color 0.2s ease;
          }
          
          .faq-link:hover {
            color: var(--primary-light);
            text-decoration: underline;
          }
        `}</style>
      </section>
      
      {/* Testimonials Section */}
      <section className="section testimonials-section" id="testimonials" data-section="true">
        <div className="container">
          <div className="section-header animate-on-scroll" id="testimonials-header">
            <h2 className="section-title">Success Stories</h2>
            <p className="section-description">
              Hear from users who have benefited from our early detection technology
            </p>
          </div>
          
          <div className="testimonials-grid">
            <div className={`testimonial-card animate-on-scroll ${isElementAnimated('testimonial-1') ? 'animated' : ''}`} id="testimonial-1">
              <div className="testimonial-content">
                <div className="quote-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className="testimonial-text">
                  "I noticed a strange mole on my back and used ABDOS to analyze it. The system flagged it as high-risk with melanoma characteristics. I saw a dermatologist the next day who confirmed it was an early-stage melanoma. Early detection literally saved my life."
                </p>
                <div className="testimonial-author">
                  <div className="author-image">
                    <img src="/images/testimonials/user1.jpg" alt="Michael S." />
                  </div>
                  <div className="author-info">
                    <h4>Michael S.</h4>
                    <p>Early Stage Melanoma Survivor</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={`testimonial-card animate-on-scroll ${isElementAnimated('testimonial-2') ? 'animated' : ''}`} id="testimonial-2">
              <div className="testimonial-content">
                <div className="quote-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className="testimonial-text">
                  "As a dermatologist, I've been impressed with the accuracy of ABDOS. I now recommend it to my patients for monitoring between appointments. It's particularly valuable for those in rural areas with limited access to specialists."
                </p>
                <div className="testimonial-author">
                  <div className="author-image">
                    <img src="/images/testimonials/user2.jpg" alt="Dr. Sarah J." />
                  </div>
                  <div className="author-info">
                    <h4>Dr. Sarah J.</h4>
                    <p>Board Certified Dermatologist</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={`testimonial-card animate-on-scroll ${isElementAnimated('testimonial-3') ? 'animated' : ''}`} id="testimonial-3">
              <div className="testimonial-content">
                <div className="quote-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className="testimonial-text">
                  "I have a family history of skin cancer and dozens of moles. ABDOS helps me monitor changes over time and prioritize which ones to show my doctor. It's given me peace of mind and a proactive approach to my skin health."
                </p>
                <div className="testimonial-author">
                  <div className="author-image">
                    <img src="/images/testimonials/user3.jpg" alt="Jennifer L." />
                  </div>
                  <div className="author-info">
                    <h4>Jennifer L.</h4>
                    <p>High-Risk Patient</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .testimonials-section {
            background-color: ${isDarkMode ? 'var(--dark-bg)' : 'var(--light-bg-secondary)'};
            position: relative;
            overflow: hidden;
          }
          
          .testimonials-section::before {
            content: '';
            position: absolute;
            bottom: -10%;
            left: -5%;
            width: 40%;
            height: 70%;
            background: radial-gradient(circle, ${isDarkMode ? 'rgba(56, 189, 248, 0.1)' : 'rgba(2, 132, 199, 0.1)'}, transparent 70%);
            border-radius: 50%;
            z-index: 0;
          }
          
          .testimonials-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 2.5rem;
            margin-top: 3rem;
            position: relative;
            z-index: 1;
          }
          
          .testimonial-card {
            background-color: ${isDarkMode ? 'var(--dark-card)' : 'var(--light-card)'};
            border-radius: 1rem;
            overflow: hidden;
            box-shadow: var(--shadow-lg);
            border: 1px solid ${isDarkMode ? 'var(--dark-border)' : 'var(--light-border)'};
            height: 100%;
            transition: transform 0.3s ease;
          }
          
          .testimonial-card:hover {
            transform: translateY(-5px);
          }
          
          .testimonial-content {
            padding: 2.5rem;
            position: relative;
          }
          
          .quote-icon {
            position: absolute;
            top: 1.5rem;
            left: 1.5rem;
            width: 2.5rem;
            height: 2.5rem;
            opacity: 0.1;
            color: var(--primary);
          }
          
          .testimonial-text {
            font-size: 1.125rem;
            line-height: 1.7;
            color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
            margin-bottom: 2rem;
            position: relative;
            z-index: 1;
            font-style: italic;
          }
          
          .testimonial-author {
            display: flex;
            align-items: center;
            gap: 1rem;
          }
          
          .author-image {
            width: 3.5rem;
            height: 3.5rem;
            border-radius: 50%;
            overflow: hidden;
            border: 2px solid var(--primary);
          }
          
          .author-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          
          .author-info h4 {
            font-size: 1.125rem;
            font-weight: 600;
            margin: 0 0 0.25rem;
            color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
          }
          
          .author-info p {
            font-size: 0.875rem;
            color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
            margin: 0;
          }
          
          @media (max-width: 768px) {
            .testimonials-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </section>
      
      {/* CTA Section */}
      <section className="section cta-section" id="cta" data-section="true">
        <div className="container">
          <div className="cta-container">
            <div className="cta-content animate-on-scroll" id="cta-content">
              <h2 className="cta-title">Take Control of Your Skin Health Today</h2>
              <p className="cta-description">
                Early detection is your best defense against skin cancer. Our AI-powered platform makes it easy to monitor changes and get professional insights when you need them most.
              </p>
              <div className="cta-features">
                <div className="cta-feature">
                  <div className="cta-feature-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span>90%+ Detection Accuracy</span>
                </div>
                <div className="cta-feature">
                  <div className="cta-feature-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <span>HIPAA Compliant Security</span>
                </div>
                <div className="cta-feature">
                  <div className="cta-feature-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <span>Instant Analysis Results</span>
                </div>
              </div>
              <div className="cta-buttons">
                <Link href="/analysis" className="cta-button primary">
                  Analyze Your Skin Now
                </Link>
                <Link href="/resources" className="cta-button secondary">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="cta-image animate-on-scroll" id="cta-image">
              <img src="/images/cta-image.jpg" alt="Skin analysis dashboard" className="cta-img" />
              <div className="cta-badge">
                <span className="cta-badge-text">Medical Grade</span>
                <span className="cta-badge-text">AI Technology</span>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .cta-section {
            background: linear-gradient(135deg, 
              ${isDarkMode ? 'var(--dark-bg)' : 'var(--light-bg)'} 0%, 
              ${isDarkMode ? 'var(--dark-bg-secondary)' : 'var(--light-bg-secondary)'} 100%);
            position: relative;
            overflow: hidden;
            padding: 6rem 0;
          }
          
          .cta-section::before {
            content: '';
            position: absolute;
            top: -10%;
            right: -5%;
            width: 40%;
            height: 70%;
            background: radial-gradient(circle, ${isDarkMode ? 'rgba(56, 189, 248, 0.1)' : 'rgba(2, 132, 199, 0.1)'}, transparent 70%);
            border-radius: 50%;
            z-index: 0;
          }
          
          .cta-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
            align-items: center;
            position: relative;
            z-index: 1;
          }
          
          .cta-title {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 1.5rem;
            background: linear-gradient(90deg, var(--primary) 0%, var(--primary-light) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            line-height: 1.2;
          }
          
          .cta-description {
            font-size: 1.25rem;
            line-height: 1.6;
            color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
            margin-bottom: 2rem;
          }
          
          .cta-features {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            margin-bottom: 2.5rem;
          }
          
          .cta-feature {
            display: flex;
            align-items: center;
            gap: 1rem;
            font-size: 1.125rem;
            color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
          }
          
          .cta-feature-icon {
            width: 1.5rem;
            height: 1.5rem;
            color: var(--primary);
            flex-shrink: 0;
          }
          
          .cta-buttons {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
          }
          
          .cta-button {
            padding: 0.875rem 2rem;
            border-radius: 0.5rem;
            font-weight: 600;
            font-size: 1.125rem;
            text-decoration: none;
            transition: all 0.3s ease;
            display: inline-flex;
            align-items: center;
            justify-content: center;
          }
          
          .cta-button.primary {
            background: linear-gradient(90deg, var(--primary) 0%, var(--primary-light) 100%);
            color: white;
            box-shadow: 0 4px 14px rgba(0, 118, 255, 0.39);
          }
          
          .cta-button.primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 118, 255, 0.5);
          }
          
          .cta-button.secondary {
            background: transparent;
            color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
            border: 2px solid ${isDarkMode ? 'var(--dark-border)' : 'var(--light-border)'};
          }
          
          .cta-button.secondary:hover {
            background-color: ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
            transform: translateY(-2px);
          }
          
          .cta-image {
            position: relative;
            border-radius: 1rem;
            overflow: hidden;
            box-shadow: var(--shadow-xl);
            transform: perspective(1000px) rotateY(-5deg);
            transition: transform 0.5s ease;
          }
          
          .cta-image:hover {
            transform: perspective(1000px) rotateY(0deg);
          }
          
          .cta-img {
            width: 100%;
            height: auto;
            display: block;
            border-radius: 1rem;
          }
          
          .cta-badge {
            position: absolute;
            top: 1.5rem;
            right: 1.5rem;
            background: rgba(0, 0, 0, 0.75);
            border-radius: 0.5rem;
            padding: 0.75rem 1rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            border: 1px solid rgba(255, 255, 255, 0.2);
          }
          
          .cta-badge-text {
            color: white;
            font-size: 0.875rem;
            font-weight: 600;
            line-height: 1.4;
          }
          
          @media (max-width: 1024px) {
            .cta-container {
              grid-template-columns: 1fr;
              gap: 3rem;
            }
            
            .cta-image {
              order: -1;
              max-width: 600px;
              margin: 0 auto;
            }
          }
          
          @media (max-width: 768px) {
            .cta-section {
              padding: 4rem 0;
            }
            
            .cta-title {
              font-size: 2rem;
            }
            
            .cta-description {
              font-size: 1.125rem;
            }
            
            .cta-buttons {
              flex-direction: column;
              width: 100%;
            }
            
            .cta-button {
              width: 100%;
            }
          }
        `}</style>
      </section>
    </Layout>
  );
}
