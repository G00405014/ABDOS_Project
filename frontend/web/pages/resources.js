import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import Link from 'next/link';
import { useState } from 'react';

export default function Resources() {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('education');

  return (
    <Layout title="Resources | ABDOS Skin Cancer Detection">
      {/* Hero Section */}
      <section className="resources-hero">
        <div className="container">
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="overline">Educational Resources</span>
            <h1 className="hero-title">
              Understanding Skin Cancer
              <span className="gradient-text"> Prevention & Detection</span>
            </h1>
            <p className="hero-subtitle">
              Comprehensive information and resources to help you understand skin cancer, its prevention, and early detection.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="resources-content">
        <div className="container">
          <motion.div 
            className="tabs-container"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="tabs-header">
              <button 
                className={`tab-button ${activeTab === 'education' ? 'active' : ''}`}
                onClick={() => setActiveTab('education')}
              >
                Education
              </button>
              <button 
                className={`tab-button ${activeTab === 'prevention' ? 'active' : ''}`}
                onClick={() => setActiveTab('prevention')}
              >
                Prevention
              </button>
              <button 
                className={`tab-button ${activeTab === 'links' ? 'active' : ''}`}
                onClick={() => setActiveTab('links')}
              >
                External Resources
              </button>
            </div>

            <div className="tab-content">
              {activeTab === 'education' && (
                <motion.div 
                  className="education-content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="content-grid">
                    <motion.div 
                      className="content-card"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                    >
                      <h2>Understanding Skin Cancer</h2>
                      <p>
                        Skin cancer is the abnormal growth of skin cells, most often triggered by exposure to ultraviolet (UV) 
                        radiation from the sun or tanning beds. It's the most common form of cancer globally, with millions 
                        of cases diagnosed each year.
                      </p>
                    </motion.div>

                    <motion.div 
                      className="content-card"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <h3>Key Facts About Skin Cancer</h3>
                      <ul>
                        <li>Skin cancer is the most common cancer in the United States and worldwide</li>
                        <li>One in five Americans will develop skin cancer by the age of 70</li>
                        <li>Early detection has been linked to a 98% five-year survival rate for melanoma</li>
                        <li>Regular skin checks can help identify concerning changes that require medical attention</li>
                        <li>Many skin cancers are preventable with proper sun protection and avoiding tanning beds</li>
                      </ul>
                    </motion.div>

                    <motion.div 
                      className="content-card"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <h3>The ABCDE Rule for Skin Checks</h3>
                      <div className="abcde-grid">
                        <div className="abcde-item">
                          <span className="letter">A</span>
                          <h4>Asymmetry</h4>
                          <p>One half unlike the other half</p>
                        </div>
                        <div className="abcde-item">
                          <span className="letter">B</span>
                          <h4>Border</h4>
                          <p>Irregular, scalloped or poorly defined border</p>
                        </div>
                        <div className="abcde-item">
                          <span className="letter">C</span>
                          <h4>Color</h4>
                          <p>Varied from one area to another</p>
                        </div>
                        <div className="abcde-item">
                          <span className="letter">D</span>
                          <h4>Diameter</h4>
                          <p>Larger than 6mm (about 1/4 inch)</p>
                        </div>
                        <div className="abcde-item">
                          <span className="letter">E</span>
                          <h4>Evolving</h4>
                          <p>Changing in size, shape, or color</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'prevention' && (
                <motion.div 
                  className="prevention-content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="content-grid">
                    <motion.div 
                      className="content-card"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                    >
                      <h2>Prevention Guidelines</h2>
                      <div className="prevention-grid">
                        <div className="prevention-item">
                          <div className="prevention-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          </div>
                          <h3>Sun Protection</h3>
                          <p>Use broad-spectrum sunscreen (SPF 30+) and reapply every 2 hours</p>
                        </div>
                        <div className="prevention-item">
                          <div className="prevention-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                            </svg>
                          </div>
                          <h3>Protective Clothing</h3>
                          <p>Wear long sleeves, pants, and wide-brimmed hats when outdoors</p>
                        </div>
                        <div className="prevention-item">
                          <div className="prevention-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <h3>Timing</h3>
                          <p>Avoid sun exposure between 10 AM and 4 PM when UV rays are strongest</p>
                        </div>
                        <div className="prevention-item">
                          <div className="prevention-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <h3>Regular Checks</h3>
                          <p>Perform monthly self-examinations and annual professional skin checks</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'links' && (
                <motion.div 
                  className="links-content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="content-grid">
                    <motion.div 
                      className="content-card"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                    >
                      <h2>External Resources</h2>
                      <p>
                        These trusted organizations provide additional information, support, and resources for skin cancer awareness, 
                        prevention, and treatment.
                      </p>

                      <div className="resources-grid">
                        {externalResources.map((resource, index) => (
                          <motion.a
                            key={resource.title}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="resource-link"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                          >
                            <div className="resource-card">
                              <h3>{resource.title}</h3>
                              <p>{resource.description}</p>
                              <div className="resource-arrow">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                              </div>
                            </div>
                          </motion.a>
                        ))}
                      </div>

                      <div className="contact-section">
                        <h3>Need More Information?</h3>
                        <p>
                          If you have specific questions about skin cancer or need assistance interpreting your analysis results, 
                          please reach out to our team or consult with a healthcare professional.
                        </p>
                        <Link href="/contact" className="primary-button">
                          Contact Our Team
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </Link>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
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
        .resources-hero {
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

        /* Content Section */
        .resources-content {
          background: ${isDarkMode ? 'var(--dark-bg)' : 'var(--light-bg)'};
        }

        .tabs-container {
          max-width: 1000px;
          margin: 0 auto;
        }

        .tabs-header {
          display: flex;
          justify-content: center;
          gap: 16px;
          margin-bottom: 48px;
          flex-wrap: wrap;
        }

        .tab-button {
          padding: 12px 24px;
          border-radius: 12px;
          font-weight: 500;
          font-size: 1rem;
          background: ${isDarkMode ? 'var(--dark-card)' : 'var(--light-card)'};
          color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
          border: 1px solid ${isDarkMode ? 'var(--dark-border)' : 'var(--light-border)'};
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .tab-button:hover {
          background: ${isDarkMode ? 'var(--dark-bg-secondary)' : 'var(--light-bg-secondary)'};
        }

        .tab-button.active {
          background: var(--primary);
          color: white;
          border-color: var(--primary);
        }

        .content-grid {
          display: grid;
          gap: 32px;
        }

        .content-card {
          background: ${isDarkMode ? 'var(--dark-card)' : 'var(--light-card)'};
          border-radius: 24px;
          padding: 32px;
          border: 1px solid ${isDarkMode ? 'var(--dark-border)' : 'var(--light-border)'};
        }

        .content-card h2 {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 24px;
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
        }

        .content-card h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 16px;
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
        }

        .content-card p {
          font-size: 1.125rem;
          line-height: 1.6;
          color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
          margin-bottom: 24px;
        }

        .content-card ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .content-card ul li {
          font-size: 1.125rem;
          line-height: 1.6;
          color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
          margin-bottom: 12px;
          padding-left: 28px;
          position: relative;
        }

        .content-card ul li:before {
          content: "•";
          color: var(--primary);
          position: absolute;
          left: 0;
        }

        /* ABCDE Grid */
        .abcde-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 24px;
          margin-top: 32px;
        }

        .abcde-item {
          text-align: center;
          padding: 24px;
          background: ${isDarkMode ? 'var(--dark-bg)' : 'var(--light-bg)'};
          border-radius: 16px;
          border: 1px solid ${isDarkMode ? 'var(--dark-border)' : 'var(--light-border)'};
        }

        .letter {
          display: inline-block;
          width: 40px;
          height: 40px;
          background: var(--primary);
          color: white;
          border-radius: 50%;
          font-weight: 700;
          font-size: 1.25rem;
          line-height: 40px;
          margin-bottom: 16px;
        }

        .abcde-item h4 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 8px;
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
        }

        .abcde-item p {
          font-size: 0.875rem;
          margin-bottom: 0;
        }

        /* Prevention Grid */
        .prevention-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 24px;
          margin-top: 32px;
        }

        .prevention-item {
          text-align: center;
          padding: 24px;
          background: ${isDarkMode ? 'var(--dark-bg)' : 'var(--light-bg)'};
          border-radius: 16px;
          border: 1px solid ${isDarkMode ? 'var(--dark-border)' : 'var(--light-border)'};
        }

        .prevention-icon {
          width: 48px;
          height: 48px;
          margin: 0 auto 16px;
          color: var(--primary);
        }

        .prevention-icon svg {
          width: 100%;
          height: 100%;
        }

        .prevention-item h3 {
          font-size: 1.25rem;
          margin-bottom: 12px;
        }

        .prevention-item p {
          font-size: 0.875rem;
          margin-bottom: 0;
        }

        /* Resources Grid */
        .resources-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
          margin-top: 32px;
        }

        .resource-link {
          text-decoration: none;
        }

        .resource-card {
          background: ${isDarkMode ? 'var(--dark-bg)' : 'var(--light-bg)'};
          border-radius: 16px;
          padding: 24px;
          border: 1px solid ${isDarkMode ? 'var(--dark-border)' : 'var(--light-border)'};
          transition: transform 0.3s ease;
          position: relative;
        }

        .resource-card:hover {
          transform: translateY(-4px);
        }

        .resource-card h3 {
          font-size: 1.25rem;
          margin-bottom: 12px;
        }

        .resource-card p {
          font-size: 0.875rem;
          margin-bottom: 0;
        }

        .resource-arrow {
          position: absolute;
          top: 24px;
          right: 24px;
          color: var(--primary);
          transition: transform 0.3s ease;
        }

        .resource-card:hover .resource-arrow {
          transform: translateX(4px);
        }

        /* Contact Section */
        .contact-section {
          text-align: center;
          margin-top: 48px;
          padding-top: 48px;
          border-top: 1px solid ${isDarkMode ? 'var(--dark-border)' : 'var(--light-border)'};
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
        @media (max-width: 768px) {
          section {
            padding: 80px 0;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .tabs-header {
            flex-direction: column;
          }

          .tab-button {
            width: 100%;
          }

          .content-card {
            padding: 24px;
          }

          .abcde-grid,
          .prevention-grid,
          .resources-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </Layout>
  );
}

const externalResources = [
  {
    title: "American Cancer Society",
    description: "Comprehensive information about skin cancer types, prevention, treatment, and resources for patients.",
    url: "https://www.cancer.org/cancer/skin-cancer.html"
  },
  {
    title: "Skin Cancer Foundation",
    description: "Education, prevention, and early detection resources, including a comprehensive self-examination guide.",
    url: "https://www.skincancer.org/"
  },
  {
    title: "American Academy of Dermatology",
    description: "Educational resources, skin cancer screening information, and a find-a-dermatologist tool.",
    url: "https://www.aad.org/public/diseases/skin-cancer"
  },
  {
    title: "Melanoma Research Foundation",
    description: "Research, education, advocacy, and support for patients with melanoma, the most serious form of skin cancer.",
    url: "https://www.melanoma.org/"
  },
  {
    title: "National Cancer Institute",
    description: "Government resources for skin cancer research, treatment options, clinical trials, and statistics.",
    url: "https://www.cancer.gov/types/skin"
  },
  {
    title: "Centers for Disease Control and Prevention",
    description: "Public health information on skin cancer prevention, risk factors, and national statistics.",
    url: "https://www.cdc.gov/cancer/skin/"
  }
]; 