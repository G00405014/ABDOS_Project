import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function About() {
  const { isDarkMode } = useTheme();

  return (
    <Layout title="About Us | ABDOS Skin Cancer Detection">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="overline">Our Mission</span>
            <h1 className="hero-title">
              Advancing Skin Cancer Detection Through
              <span className="gradient-text"> AI Innovation</span>
            </h1>
            <p className="hero-subtitle">
              We're revolutionizing early detection with cutting-edge artificial intelligence and medical expertise.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-grid">
            <motion.div 
              className="mission-content"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2>Our Mission</h2>
              <p>
                ABDOS is dedicated to making skin cancer detection more accessible and accurate through 
                advanced AI technology. We believe that early detection saves lives, and our platform 
                aims to empower individuals with the tools they need to monitor their skin health.
              </p>
              <div className="mission-stats">
                <div className="stat-item">
                  <div className="stat-value">90%+</div>
                  <div className="stat-label">Detection Accuracy</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">100K+</div>
                  <div className="stat-label">Images Analyzed</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">7</div>
                  <div className="stat-label">Cancer Types Detected</div>
                </div>
              </div>
            </motion.div>
            <motion.div 
              className="mission-image"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="image-container">
                <img src="/images/mission.jpg" alt="Our Mission" />
                <div className="image-overlay"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Developer Credit Section */}
      <section className="developer-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="overline">Developer</span>
            <h2>About the Developer</h2>
            <p className="section-subtitle">
              ABDOS was developed by Emeka Adimora, a 4th year Software and Electronic Engineering student.
            </p>
          </motion.div>

          <motion.div
            className="developer-info"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="developer-content">
              <h3>Emeka Adimora</h3>
              <p className="developer-title">4th Year Software and Electronic Engineering Student</p>
              <p className="developer-bio">
                This project represents my commitment to leveraging technology for healthcare innovation. 
                ABDOS combines my passion for software development with the goal of making healthcare 
                more accessible through AI-powered solutions.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
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
            Start Your Analysis
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

        .container {
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
        .about-hero {
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

        /* Mission Section */
        .mission-section {
          background: ${isDarkMode ? 'var(--dark-bg-secondary)' : 'var(--light-bg-secondary)'};
        }

        .mission-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        .mission-content h2 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 24px;
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
        }

        .mission-content p {
          font-size: 1.125rem;
          line-height: 1.6;
          color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
          margin-bottom: 40px;
        }

        .mission-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .stat-item {
          text-align: center;
          padding: 24px;
          background: ${isDarkMode ? 'var(--dark-card)' : 'var(--light-card)'};
          border-radius: 16px;
          border: 1px solid ${isDarkMode ? 'var(--dark-border)' : 'var(--light-border)'};
        }

        .stat-value {
          font-size: 2rem;
          font-weight: 700;
          color: var(--primary);
          margin-bottom: 8px;
        }

        .stat-label {
          font-size: 0.875rem;
          color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
        }

        .mission-image {
          position: relative;
        }

        .image-container {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: ${isDarkMode ?
            '0 50px 100px -20px rgba(0, 0, 0, 0.5)' :
            '0 50px 100px -20px rgba(0, 0, 0, 0.25)'
          };
        }

        .image-container img {
          width: 100%;
          height: auto;
          display: block;
        }

        .image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.3), transparent);
        }

        /* Developer Section */
        .developer-section {
          background: ${isDarkMode ? 'var(--dark-bg-secondary)' : 'var(--light-bg-secondary)'};
        }

        .developer-info {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
          padding: 40px;
          background: ${isDarkMode ? 'var(--dark-card)' : 'var(--light-card)'};
          border-radius: 16px;
          border: 1px solid ${isDarkMode ? 'var(--dark-border)' : 'var(--light-border)'};
        }

        .developer-content h3 {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 16px;
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
        }

        .developer-title {
          font-size: 1.25rem;
          color: var(--primary);
          margin-bottom: 24px;
        }

        .developer-bio {
          font-size: 1.125rem;
          line-height: 1.6;
          color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
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

        /* Responsive Design */
        @media (max-width: 1024px) {
          .mission-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        @media (max-width: 768px) {
          section {
            padding: 80px 0;
          }

          .hero-title {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </Layout>
  );
} 