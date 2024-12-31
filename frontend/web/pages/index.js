import { useTheme } from '../context/ThemeContext';
import TypewriterText from '../components/TypewriterText';
import HealthAssistant from '../components/HealthAssistant';
import { useState } from 'react';
import Link from 'next/link';
import ImageAnalysis from '../components/ImageAnalysis';

export default function Home() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('home');

  const features = [
    { 
      icon: '🔍', 
      title: 'AI-Powered Analysis', 
      description: 'Advanced machine learning for accurate skin condition detection',
      gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
    },
    { 
      icon: '⚡', 
      title: 'Instant Results', 
      description: 'Get analysis results in seconds',
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #2dd4bf 100%)'
    },
    { 
      icon: '📊', 
      title: 'Detailed Reports', 
      description: 'Comprehensive analysis with risk assessment',
      gradient: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)'
    },
    { 
      icon: '🤖', 
      title: 'AI Assistant', 
      description: 'Chat with our AI for immediate guidance',
      gradient: 'linear-gradient(135deg, #14b8a6 0%, #3b82f6 100%)'
    }
  ];

  const tabs = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'analysis', label: 'Analysis', icon: '🔍' },
    { id: 'about', label: 'About', icon: 'ℹ️' },
    { id: 'resources', label: 'Resources', icon: '📚' }
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'analysis':
        return <ImageAnalysis />;
      case 'about':
        return aboutContent;
      case 'resources':
        return resourcesContent;
      default:
        return (
          <>
            <section style={{
              textAlign: 'center',
              marginBottom: '4rem',
              paddingTop: '2rem'
            }}>
              <h1 style={{
                fontSize: '3.5rem',
                color: isDarkMode ? '#f7fafc' : '#1a202c',
                marginBottom: '1.5rem',
                fontWeight: '700',
                lineHeight: '1.2'
              }}>
                <TypewriterText text="AI-Powered Skin Cancer Detection" delay={200} />
              </h1>
              <p style={{
                fontSize: '1.5rem',
                color: isDarkMode ? '#e2e8f0' : '#4a5568',
                maxWidth: '800px',
                margin: '0 auto',
                lineHeight: '1.6'
              }}>
                Early detection saves lives. Get instant AI-powered skin analysis.
              </p>
            </section>

            <section style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '1.5rem',
              marginBottom: '4rem',
              overflowX: 'auto',
              padding: '1rem 0'
            }}>
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  style={{
                    padding: '2rem',
                    background: isDarkMode 
                      ? `${feature.gradient}, rgba(45, 55, 72, 0.9)` 
                      : `${feature.gradient}, rgba(255, 255, 255, 0.9)`,
                    borderRadius: '1.5rem',
                    boxShadow: isDarkMode 
                      ? '0 8px 32px rgba(0, 0, 0, 0.3)' 
                      : '0 8px 32px rgba(0, 0, 0, 0.1)',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    backdropFilter: 'blur(10px)',
                    minWidth: '250px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                    e.currentTarget.style.boxShadow = isDarkMode 
                      ? '0 20px 40px rgba(0, 0, 0, 0.4)' 
                      : '0 20px 40px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = isDarkMode 
                      ? '0 8px 32px rgba(0, 0, 0, 0.3)' 
                      : '0 8px 32px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>
                    {feature.icon}
                  </div>
                  <h3 style={{
                    fontSize: '1.5rem',
                    color: 'white',
                    marginBottom: '1rem',
                    fontWeight: '600'
                  }}>
                    {feature.title}
                  </h3>
                  <p style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '1.1rem',
                    lineHeight: '1.6'
                  }}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </section>
          </>
        );
    }
  };

  const aboutContent = (
    <div style={{
      padding: '2rem',
      backgroundColor: isDarkMode ? 'rgba(45, 55, 72, 0.9)' : 'rgba(255, 255, 255, 0.9)',
      borderRadius: '1.5rem',
      boxShadow: isDarkMode ? '0 8px 32px rgba(0, 0, 0, 0.3)' : '0 8px 32px rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(10px)',
      animation: 'fadeIn 0.3s ease-out'
    }}>
      <h2 style={{ 
        marginBottom: '1.5rem', 
        color: isDarkMode ? '#e2e8f0' : '#2d3748',
        fontSize: '2rem',
        fontWeight: '600'
      }}>About ABDOS</h2>
      
      <div style={{ 
        color: isDarkMode ? '#a0aec0' : '#4a5568',
        lineHeight: '1.8'
      }}>
        <h3 style={{ marginBottom: '1rem', color: isDarkMode ? '#e2e8f0' : '#2d3748' }}>Project Overview</h3>
        <p style={{ marginBottom: '1.5rem' }}>
          ABDOS (AI-Based Detection of Skin Cancer) is an innovative platform that uses Convolutional Neural Networks (CNN) 
          to detect various types of skin cancer from images. Our system provides instant analysis and risk assessment through 
          both web and mobile platforms.
        </p>

        <h3 style={{ marginBottom: '1rem', color: isDarkMode ? '#e2e8f0' : '#2d3748' }}>Technology Stack</h3>
        <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
          <li>TensorFlow & Keras for AI model development</li>
          <li>Next.js and React Native for web and mobile applications</li>
          <li>Advanced image processing with OpenCV</li>
          <li>Cloud deployment on Vercel and Firebase</li>
        </ul>

        <h3 style={{ marginBottom: '1rem', color: isDarkMode ? '#e2e8f0' : '#2d3748' }}>Detectable Conditions</h3>
        <ul style={{ paddingLeft: '1.5rem' }}>
          <li>Melanocytic Nevi (nv): Common, benign moles</li>
          <li>Melanoma (mel): Malignant skin cancer</li>
          <li>Benign Keratosis-like Lesions (bkl)</li>
          <li>Basal Cell Carcinoma (bcc)</li>
          <li>Actinic Keratoses (akiec)</li>
          <li>Vascular Lesions (vasc)</li>
          <li>Dermatofibroma (df)</li>
        </ul>
      </div>
    </div>
  );

  const resourcesContent = (
    <div style={{
      padding: '2rem',
      backgroundColor: isDarkMode ? 'rgba(45, 55, 72, 0.9)' : 'rgba(255, 255, 255, 0.9)',
      borderRadius: '1.5rem',
      boxShadow: isDarkMode ? '0 8px 32px rgba(0, 0, 0, 0.3)' : '0 8px 32px rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(10px)',
      animation: 'fadeIn 0.3s ease-out'
    }}>
      <h2 style={{ 
        marginBottom: '1.5rem', 
        color: isDarkMode ? '#e2e8f0' : '#2d3748',
        fontSize: '2rem',
        fontWeight: '600'
      }}>Resources</h2>

      <div style={{ display: 'grid', gap: '2rem' }}>
        <div>
          <h3 style={{ 
            color: isDarkMode ? '#e2e8f0' : '#2d3748',
            marginBottom: '1rem'
          }}>Medical Resources</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {[
              { name: 'Skin Cancer Foundation', url: 'https://www.skincancer.org/' },
              { name: 'American Academy of Dermatology', url: 'https://www.aad.org/' },
              { name: 'National Cancer Institute', url: 'https://www.cancer.gov/types/skin' },
              { name: 'WHO - Skin Cancer', url: 'https://www.who.int/news-room/fact-sheets/detail/cancer' },
              { name: 'Mayo Clinic - Skin Cancer', url: 'https://www.mayoclinic.org/diseases-conditions/skin-cancer/symptoms-causes/syc-20377605' }
            ].map((resource, index) => (
              <li key={index} style={{ marginBottom: '1rem' }}>
                <a 
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: isDarkMode ? '#60a5fa' : '#3b82f6',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem',
                    borderRadius: '0.5rem',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(96, 165, 250, 0.1)' : 'rgba(59, 130, 246, 0.1)';
                    e.currentTarget.style.transform = 'translateX(5px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <span>→</span>
                  {resource.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 style={{ 
            color: isDarkMode ? '#e2e8f0' : '#2d3748',
            marginBottom: '1rem'
          }}>Research & Data</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {[
              { name: 'HAM10000 Dataset', url: 'https://dataverse.harvard.edu/dataset.xhtml?persistentId=doi:10.7910/DVN/DBW86T' },
              { name: 'ISIC Archive', url: 'https://www.isic-archive.com/' },
              { name: 'PubMed Central - Skin Cancer Research', url: 'https://www.ncbi.nlm.nih.gov/pmc/?term=skin+cancer+detection' }
            ].map((resource, index) => (
              <li key={index} style={{ marginBottom: '1rem' }}>
                <a 
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: isDarkMode ? '#60a5fa' : '#3b82f6',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem',
                    borderRadius: '0.5rem',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(96, 165, 250, 0.1)' : 'rgba(59, 130, 246, 0.1)';
                    e.currentTarget.style.transform = 'translateX(5px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <span>→</span>
                  {resource.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  // Add dark mode toggle button
  const darkModeToggle = (
    <button
      onClick={toggleTheme}
      style={{
        position: 'fixed',
        bottom: '2rem',
        left: '2rem',
        padding: '0.75rem',
        backgroundColor: isDarkMode ? 'rgba(45, 55, 72, 0.9)' : 'rgba(255, 255, 255, 0.9)',
        border: 'none',
        borderRadius: '50%',
        cursor: 'pointer',
        boxShadow: isDarkMode ? '0 4px 20px rgba(0, 0, 0, 0.3)' : '0 4px 20px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s ease',
        zIndex: 1000
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      {isDarkMode ? '🌞' : '🌙'}
    </button>
  );

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: isDarkMode ? '#1a202c' : '#f7fafc',
      backgroundImage: isDarkMode 
        ? 'radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)'
        : 'radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)',
    }}>
      <nav style={{
        position: 'fixed',
        top: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '1rem',
        zIndex: 1000,
        backgroundColor: isDarkMode ? 'rgba(26, 32, 44, 0.8)' : 'rgba(247, 250, 252, 0.8)',
        padding: '0.5rem',
        borderRadius: '1rem',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: activeTab === tab.id
                ? (isDarkMode ? 'rgba(66, 153, 225, 0.5)' : 'rgba(66, 153, 225, 0.1)')
                : 'transparent',
              color: isDarkMode ? '#e2e8f0' : '#2d3748',
              border: 'none',
              borderRadius: '0.75rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontSize: '1rem',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </nav>

      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '6rem 2rem 2rem 2rem',
        position: 'relative'
      }}>
        {renderContent()}
      </main>

      {darkModeToggle}
      <HealthAssistant />

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
