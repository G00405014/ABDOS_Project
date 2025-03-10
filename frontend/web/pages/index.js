import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';

export default function Home() {
  const { isDarkMode } = useTheme();
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-section" id="hero">
        <div className="hero-content">
          <motion.div 
            className="hero-text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="hero-title">
              Advanced AI for
              <span className="gradient-text"> Early Detection</span>
            </h1>
            <p className="hero-subtitle">
              Revolutionizing skin cancer detection with medical-grade artificial intelligence.
            </p>
            <div className="hero-cta">
              <Link href="/analysis" className="primary-button">
                Try Analysis
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <Link href="/about" className="secondary-button">
                Learn More
              </Link>
            </div>
          </motion.div>

          <motion.div 
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          >
            <div className="visual-container">
              <div className="floating-elements">
                <div className="stat-card accuracy">
                  <span className="stat-value">90%+</span>
                  <span className="stat-label">Accuracy</span>
                </div>
                <div className="stat-card time">
                  <span className="stat-value">10s</span>
                  <span className="stat-label">Analysis Time</span>
                </div>
                <div className="stat-card types">
                  <span className="stat-value">7</span>
                  <span className="stat-label">Cancer Types</span>
                </div>
              </div>
              <div className="main-image">
                <img src="/images/hero-device.png" alt="AI Analysis Interface" />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="scroll-indicator">
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" id="features">
        <div className="section-content">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="overline">Revolutionary Technology</span>
            <h2 className="section-title">
              Precision in Every <span className="gradient-text">Analysis</span>
            </h2>
          </motion.div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="feature-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section" id="process">
        <div className="section-content">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="overline">How It Works</span>
            <h2 className="section-title">
              Simple. <span className="gradient-text">Powerful.</span> Accurate.
            </h2>
          </motion.div>

          <div className="process-steps">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                className="process-step"
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <div className="step-number">{index + 1}</div>
                <div className="step-content">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" id="cta">
        <motion.div 
          className="cta-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2>Ready to Experience the Future of Skin Health?</h2>
          <p>Join thousands of users who trust our AI-powered analysis for early detection.</p>
          <Link href="/analysis" className="primary-button">
            Start Free Analysis
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </motion.div>
      </section>

      <style jsx>{`
        /* Base Styles */
        section {
          padding: 120px 0;
          position: relative;
          overflow: hidden;
        }

        .section-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .gradient-text {
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          display: inline-block;
        }

        /* Hero Section */
        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 0;
          background: ${isDarkMode ? 
            'radial-gradient(circle at 50% -20%, rgba(56, 189, 248, 0.1), transparent 800px)' :
            'radial-gradient(circle at 50% -20%, rgba(2, 132, 199, 0.1), transparent 800px)'
          };
        }

        .hero-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 24px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        .hero-title {
          font-size: 4.5rem;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 24px;
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
        }

        .hero-subtitle {
          font-size: 1.25rem;
          line-height: 1.6;
          color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
          margin-bottom: 40px;
          max-width: 500px;
        }

        .hero-cta {
          display: flex;
          gap: 16px;
        }

        .primary-button {
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
          text-decoration: none;
        }

        .primary-button svg {
          width: 20px;
          height: 20px;
          transition: transform 0.3s ease;
        }

        .primary-button:hover svg {
          transform: translateX(4px);
        }

        .primary-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(0, 118, 255, 0.3);
        }

        .secondary-button {
          background: ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
          padding: 16px 32px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 1.125rem;
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .secondary-button:hover {
          background: ${isDarkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)'};
          transform: translateY(-2px);
        }

        .visual-container {
          position: relative;
          padding-top: 40px;
        }

        .main-image {
          position: relative;
          z-index: 1;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: ${isDarkMode ?
            '0 50px 100px -20px rgba(0, 0, 0, 0.5)' :
            '0 50px 100px -20px rgba(0, 0, 0, 0.25)'
          };
        }

        .main-image img {
          width: 100%;
          height: auto;
          display: block;
        }

        .floating-elements {
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
        }

        .stat-card {
          position: absolute;
          background: ${isDarkMode ? 
            'rgba(255, 255, 255, 0.1)' : 
            'rgba(255, 255, 255, 0.9)'
          };
          backdrop-filter: blur(10px);
          padding: 16px 24px;
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          box-shadow: ${isDarkMode ?
            '0 8px 32px rgba(0, 0, 0, 0.4)' :
            '0 8px 32px rgba(0, 0, 0, 0.1)'
          };
          border: 1px solid ${isDarkMode ?
            'rgba(255, 255, 255, 0.1)' :
            'rgba(0, 0, 0, 0.05)'
          };
        }

        .accuracy {
          top: 0;
          left: -40px;
          animation: float 6s ease-in-out infinite;
        }

        .time {
          top: 40%;
          right: -60px;
          animation: float 8s ease-in-out infinite;
        }

        .types {
          bottom: 60px;
          left: -20px;
          animation: float 7s ease-in-out infinite;
        }

        .stat-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--primary);
          line-height: 1;
        }

        .stat-label {
          font-size: 0.875rem;
          color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
          margin-top: 4px;
        }

        @keyframes float {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(0, -20px);
          }
        }

        .scroll-indicator {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
        }

        .scroll-indicator svg {
          width: 24px;
          height: 24px;
        }

        /* Features Section */
        .features-section {
          background: ${isDarkMode ? 'var(--dark-bg-secondary)' : 'var(--light-bg-secondary)'};
        }

        .section-header {
          text-align: center;
          margin-bottom: 80px;
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

        .section-title {
          font-size: 3rem;
          font-weight: 800;
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
          line-height: 1.2;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          margin-top: 60px;
        }

        .feature-card {
          background: ${isDarkMode ? 'var(--dark-card)' : 'var(--light-card)'};
          padding: 32px;
          border-radius: 24px;
          text-align: center;
          transition: transform 0.3s ease;
          border: 1px solid ${isDarkMode ? 'var(--dark-border)' : 'var(--light-border)'};
        }

        .feature-card:hover {
          transform: translateY(-8px);
        }

        .feature-icon {
          width: 48px;
          height: 48px;
          margin: 0 auto 24px;
          color: var(--primary);
        }

        .feature-card h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 16px;
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
        }

        .feature-card p {
          color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
          line-height: 1.6;
        }

        /* Process Section */
        .process-section {
          background: ${isDarkMode ? 'var(--dark-bg)' : 'var(--light-bg)'};
        }

        .process-steps {
          max-width: 800px;
          margin: 60px auto 0;
        }

        .process-step {
          display: flex;
          gap: 24px;
          margin-bottom: 48px;
        }

        .step-number {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          color: white;
          flex-shrink: 0;
        }

        .step-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 12px;
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
        }

        .step-content p {
          color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
          line-height: 1.6;
        }

        /* CTA Section */
        .cta-section {
          background: linear-gradient(135deg,
            ${isDarkMode ? 'var(--dark-bg)' : 'var(--light-bg)'} 0%,
            ${isDarkMode ? 'var(--dark-bg-secondary)' : 'var(--light-bg-secondary)'} 100%
          );
          text-align: center;
          padding: 120px 0;
        }

        .cta-content {
          max-width: 600px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .cta-content h2 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 24px;
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
        }

        .cta-content p {
          font-size: 1.25rem;
          color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
          margin-bottom: 40px;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .hero-content {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 40px;
          }

          .hero-title {
            font-size: 3.5rem;
          }

          .hero-subtitle {
            margin: 0 auto 40px;
          }

          .hero-cta {
            justify-content: center;
          }

          .features-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          section {
            padding: 80px 0;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }

          .process-step {
            flex-direction: column;
            text-align: center;
            align-items: center;
          }

          .cta-content h2 {
            font-size: 2rem;
          }
        }
      `}</style>
    </Layout>
  );
}

const features = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "90%+ Accuracy",
    description: "Industry-leading detection rates powered by advanced deep learning algorithms."
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Instant Results",
    description: "Get comprehensive analysis results in under 10 seconds."
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: "HIPAA Compliant",
    description: "Your data is protected with medical-grade security protocols."
  }
];

const steps = [
  {
    title: "Upload Your Image",
    description: "Take a photo or upload an existing image of the skin lesion you want to analyze."
  },
  {
    title: "AI Analysis",
    description: "Our advanced AI model processes the image using deep learning technology trained on over 100,000 clinical cases."
  },
  {
    title: "Get Your Results",
    description: "Receive a detailed report with risk assessment and recommended next steps in seconds."
  }
];
