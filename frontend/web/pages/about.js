import { useTheme } from '../context/ThemeContext';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function About() {
  const { isDarkMode } = useTheme();

  return (
    <Layout title="About ABDOS | Skin Cancer Detection">
      <section className="about-hero">
        <div className="container">
          <h1 className="about-title">About ABDOS</h1>
          <p className="about-subtitle">
            Advanced Biomedical Dermatological Observation System
          </p>
        </div>
      </section>

      <section className="about-content">
        <div className="container">
          <div className="about-grid">
            <div className="about-section">
              <h2>Our Mission</h2>
              <p>
                At ABDOS, our mission is to improve early detection of skin cancer through accessible AI-powered technology. 
                We aim to empower individuals with tools that can help identify potential skin concerns before they progress, 
                potentially saving lives through early intervention.
              </p>
            </div>

            <div className="about-section">
              <h2>The Technology</h2>
              <p>
                ABDOS utilizes advanced deep learning algorithms trained on thousands of dermatological images to identify 
                patterns associated with various skin conditions. Our AI model has been developed in collaboration with 
                healthcare professionals to ensure accuracy and reliability.
              </p>
              <p>
                The system is built on TensorFlow using EfficientNet architecture, which provides excellent performance 
                while maintaining efficiency, allowing our analysis to run quickly even on standard consumer devices.
              </p>
            </div>
          </div>

          <div className="about-section full-width">
            <h2>How It Works</h2>
            <div className="about-process">
              <div className="process-step">
                <div className="step-number">1</div>
                <h3>Image Upload</h3>
                <p>Upload a photo of the skin condition you're concerned about through our secure platform.</p>
              </div>
              <div className="process-step">
                <div className="step-number">2</div>
                <h3>AI Analysis</h3>
                <p>Our advanced AI model processes the image, identifying patterns and comparing them to thousands of known cases.</p>
              </div>
              <div className="process-step">
                <div className="step-number">3</div>
                <h3>Results &amp; Recommendations</h3>
                <p>Receive an immediate assessment with risk level and recommended next steps based on the analysis.</p>
              </div>
            </div>
          </div>

          <div className="about-section full-width">
            <h2>Accuracy &amp; Limitations</h2>
            <p>
              While our system achieves a high degree of accuracy in preliminary skin condition identification, 
              it's important to understand that ABDOS is designed as a screening tool, not a replacement for 
              professional medical diagnosis. The technology has certain limitations:
            </p>
            <ul className="accuracy-list">
              <li>Results are preliminary and should be confirmed by a healthcare professional</li>
              <li>Image quality significantly impacts analysis accuracy</li>
              <li>Certain rare conditions may not be accurately identified</li>
              <li>The system is continually improving through machine learning</li>
            </ul>
            <p>
              We recommend using ABDOS as an initial screening tool and always following up with a dermatologist 
              or healthcare provider for proper diagnosis and treatment, especially for concerning lesions.
            </p>
          </div>

          <div className="about-team">
            <h2>Our Team</h2>
            <p className="team-intro">
              ABDOS was developed by a multidisciplinary team of AI specialists, dermatologists, 
              and healthcare professionals committed to improving skin cancer detection through technology.
            </p>
            <div className="team-grid">
              <div className="team-member">
                <div className="member-photo" style={{ backgroundImage: `url('/images/team/developer.jpg')` }}></div>
                <h3>Dr. Sarah Johnson</h3>
                <p className="member-title">Lead AI Researcher</p>
                <p>Specializes in machine learning applications in healthcare with 10+ years of experience.</p>
              </div>
              <div className="team-member">
                <div className="member-photo" style={{ backgroundImage: `url('/images/team/dermatologist.jpg')` }}></div>
                <h3>Dr. Michael Chen</h3>
                <p className="member-title">Consulting Dermatologist</p>
                <p>Board-certified dermatologist with specialty training in skin cancer detection and treatment.</p>
              </div>
              <div className="team-member">
                <div className="member-photo" style={{ backgroundImage: `url('/images/team/healthtech.jpg')` }}></div>
                <h3>Emma Rodriguez</h3>
                <p className="member-title">Health Technology Director</p>
                <p>Expert in bringing medical technology to market with a focus on accessibility and user experience.</p>
              </div>
            </div>
          </div>

          <div className="cta-container">
            <h2>Ready to try ABDOS?</h2>
            <p>Use our AI-powered skin analysis tool to get a preliminary assessment.</p>
            <Link href="/#analysis" className="cta-button">
              Start Your Analysis
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        .about-hero {
          background-color: ${isDarkMode ? 'var(--dark-bg-secondary)' : 'var(--light-bg-secondary)'};
          padding: 8rem 0 4rem;
          text-align: center;
        }

        .about-title {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 1rem;
          background: linear-gradient(to right, var(--primary), var(--primary-light));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .about-subtitle {
          font-size: 1.25rem;
          color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
          max-width: 700px;
          margin: 0 auto;
        }

        .about-content {
          padding: 5rem 0;
          background-color: ${isDarkMode ? 'var(--dark-bg)' : 'var(--light-bg)'};
        }

        .about-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 3rem;
          margin-bottom: 4rem;
        }

        .about-section {
          margin-bottom: 3rem;
        }

        .about-section h2 {
          font-size: 1.75rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
        }

        .about-section p {
          font-size: 1.125rem;
          line-height: 1.7;
          color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
          margin-bottom: 1.5rem;
        }

        .full-width {
          grid-column: 1 / -1;
        }

        .about-process {
          display: flex;
          flex-wrap: wrap;
          gap: 2rem;
          margin-top: 2rem;
        }

        .process-step {
          flex: 1;
          min-width: 250px;
          background-color: ${isDarkMode ? 'var(--dark-card)' : 'var(--light-card)'};
          padding: 2rem;
          border-radius: 1rem;
          box-shadow: var(--shadow);
          border: 1px solid ${isDarkMode ? 'var(--dark-border)' : 'var(--light-border)'};
        }

        .step-number {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 3rem;
          height: 3rem;
          background: linear-gradient(135deg, var(--primary), var(--primary-light));
          color: white;
          font-size: 1.5rem;
          font-weight: 700;
          border-radius: 50%;
          margin-bottom: 1.5rem;
        }

        .process-step h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
        }

        .process-step p {
          font-size: 1rem;
          line-height: 1.6;
          color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
        }

        .accuracy-list {
          margin: 1.5rem 0 2rem;
          padding-left: 1.5rem;
        }

        .accuracy-list li {
          margin-bottom: 0.75rem;
          font-size: 1.125rem;
          line-height: 1.6;
          color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
        }

        .about-team {
          margin-top: 4rem;
        }

        .team-intro {
          text-align: center;
          max-width: 800px;
          margin: 0 auto 3rem;
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 2.5rem;
        }

        .team-member {
          background-color: ${isDarkMode ? 'var(--dark-card)' : 'var(--light-card)'};
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: var(--shadow);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: 1px solid ${isDarkMode ? 'var(--dark-border)' : 'var(--light-border)'};
        }

        .team-member:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-md);
        }

        .member-photo {
          height: 240px;
          background-size: cover;
          background-position: center;
        }

        .team-member h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 1.5rem 1.5rem 0.5rem;
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
        }

        .member-title {
          font-size: 0.875rem;
          color: var(--primary);
          font-weight: 600;
          margin: 0 1.5rem 1rem;
        }

        .team-member p {
          font-size: 1rem;
          line-height: 1.6;
          color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
          margin: 0 1.5rem 1.5rem;
        }

        .cta-container {
          margin-top: 5rem;
          text-align: center;
          padding: 3rem;
          background: linear-gradient(135deg, var(--primary), var(--accent));
          border-radius: 1rem;
          color: white;
        }

        .cta-container h2 {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .cta-container p {
          font-size: 1.25rem;
          margin-bottom: 2rem;
          opacity: 0.9;
        }

        .cta-button {
          display: inline-block;
          background-color: white;
          color: var(--primary);
          font-weight: 600;
          padding: 1rem 2.5rem;
          border-radius: 0.5rem;
          font-size: 1.125rem;
          transition: all 0.3s ease;
        }

        .cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }

        @media (max-width: 1024px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        @media (max-width: 768px) {
          .about-title {
            font-size: 2.5rem;
          }
          
          .about-process {
            flex-direction: column;
          }
          
          .about-hero {
            padding: 6rem 0 3rem;
          }
          
          .about-content {
            padding: 3rem 0;
          }
        }
      `}</style>
    </Layout>
  );
} 