import { useTheme } from '../context/ThemeContext';
import Layout from '../components/Layout';
import { useState } from 'react';

export default function Contact() {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        submitted: false,
        error: true,
        message: 'Please fill in all required fields.'
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus({
        submitted: false,
        error: true,
        message: 'Please enter a valid email address.'
      });
      return;
    }

    // In a real implementation, you would send the form data to a backend API
    // For now, we'll simulate a successful submission
    try {
      // Simulate API call delay
      setTimeout(() => {
        setFormStatus({
          submitted: true,
          error: false,
          message: 'Your message has been sent successfully! We will get back to you soon.'
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      }, 1000);
    } catch (error) {
      setFormStatus({
        submitted: false,
        error: true,
        message: 'There was an error sending your message. Please try again later.'
      });
    }
  };

  return (
    <Layout title="Contact Us | ABDOS Skin Cancer Detection">
      <section className="contact-hero">
        <div className="container">
          <h1 className="contact-title">Contact Us</h1>
          <p className="contact-subtitle">
            Have questions about our skin cancer detection technology? Get in touch with our team.
          </p>
        </div>
      </section>

      <section className="contact-content">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <div className="info-card">
                <div className="info-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3>Email Us</h3>
                <p>For general inquiries or support:</p>
                <a href="mailto:support@abdoshealth.com" className="info-link">support@abdoshealth.com</a>
                <p className="mt-2">For partnership opportunities:</p>
                <a href="mailto:partnerships@abdoshealth.com" className="info-link">partnerships@abdoshealth.com</a>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3>Call Us</h3>
                <p>Technical Support:</p>
                <a href="tel:+18005551234" className="info-link">+1 (800) 555-1234</a>
                <p className="mt-2">Office Hours:</p>
                <p>Monday - Friday: 9am - 5pm EST</p>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3>Visit Us</h3>
                <p>ABDOS Health Technologies</p>
                <p>123 Innovation Drive</p>
                <p>Suite 400</p>
                <p>Boston, MA 02110</p>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3>Follow Us</h3>
                <div className="social-links">
                  <a href="https://twitter.com/abdoshealth" target="_blank" rel="noopener noreferrer" className="social-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                  <a href="https://www.linkedin.com/company/abdoshealth" target="_blank" rel="noopener noreferrer" className="social-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a href="https://www.facebook.com/abdoshealth" target="_blank" rel="noopener noreferrer" className="social-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="https://www.instagram.com/abdoshealth" target="_blank" rel="noopener noreferrer" className="social-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="contact-form-container">
              <h2>Send us a message</h2>
              <p className="form-description">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>

              {formStatus.submitted ? (
                <div className="form-success">
                  <div className="success-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3>Message Sent!</h3>
                  <p>{formStatus.message}</p>
                  <button 
                    className="new-message-btn"
                    onClick={() => setFormStatus({submitted: false, error: false, message: ''})}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  {formStatus.error && (
                    <div className="form-error">
                      <p>{formStatus.message}</p>
                    </div>
                  )}
                  
                  <div className="form-group">
                    <label htmlFor="name">Name <span className="required">*</span></label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email <span className="required">*</span></label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Your email address"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="What's this about?"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="message">Message <span className="required">*</span></label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="How can we help you?"
                      rows="5"
                      required
                    ></textarea>
                  </div>
                  
                  <button type="submit" className="submit-button">
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="faq-section">
        <div className="container">
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>How accurate is the skin cancer detection system?</h3>
              <p>
                Our AI-powered detection system has been trained on thousands of clinical images and has achieved 
                an accuracy rate of over 90% in identifying potential skin cancer lesions. However, it's important 
                to note that our tool is designed to be a supportive resource and should not replace professional 
                medical consultation.
              </p>
            </div>
            <div className="faq-item">
              <h3>Is my data secure when I upload images?</h3>
              <p>
                Yes, we take data privacy very seriously. All images uploaded to our platform are encrypted and 
                processed securely. We do not share your personal information or images with third parties without 
                your explicit consent, and you can request deletion of your data at any time.
              </p>
            </div>
            <div className="faq-item">
              <h3>Can I use this system on mobile devices?</h3>
              <p>
                Yes, our platform is fully responsive and works on all modern mobile devices. You can upload images 
                taken with your smartphone camera directly to our system for analysis.
              </p>
            </div>
            <div className="faq-item">
              <h3>How quickly will I receive results after uploading an image?</h3>
              <p>
                The analysis typically takes just a few seconds. Once your image is processed, you'll receive 
                immediate feedback on potential concerns and risk levels.
              </p>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .contact-hero {
          background-color: ${isDarkMode ? 'var(--dark-bg-secondary)' : 'var(--light-bg-secondary)'};
          padding: 8rem 0 4rem;
          text-align: center;
        }

        .contact-title {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 1rem;
          background: linear-gradient(to right, var(--primary), var(--primary-light));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .contact-subtitle {
          font-size: 1.25rem;
          color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
          max-width: 700px;
          margin: 0 auto;
        }

        .contact-content {
          padding: 4rem 0;
          background-color: ${isDarkMode ? 'var(--dark-bg)' : 'var(--light-bg)'};
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 3rem;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .info-card {
          background-color: ${isDarkMode ? 'var(--dark-card)' : 'var(--light-card)'};
          padding: 1.5rem;
          border-radius: 1rem;
          box-shadow: var(--shadow);
          border: 1px solid ${isDarkMode ? 'var(--dark-border)' : 'var(--light-border)'};
        }

        .info-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 3rem;
          height: 3rem;
          margin-bottom: 1rem;
          border-radius: 50%;
          background-color: ${isDarkMode ? 'rgba(56, 189, 248, 0.1)' : 'rgba(2, 132, 199, 0.1)'};
        }

        .info-icon svg {
          width: 1.5rem;
          height: 1.5rem;
          color: var(--primary);
        }

        .info-card h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0 0 1rem;
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
        }

        .info-card p {
          font-size: 1rem;
          line-height: 1.6;
          margin: 0.5rem 0;
          color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
        }

        .info-link {
          display: inline-block;
          color: var(--primary);
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s ease;
        }

        .info-link:hover {
          color: var(--primary-light);
          text-decoration: underline;
        }

        .social-links {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }

        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          background-color: ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
          transition: all 0.3s ease;
        }

        .social-link:hover {
          transform: translateY(-3px);
          background-color: var(--primary);
          color: white;
        }

        .social-link svg {
          width: 1.25rem;
          height: 1.25rem;
        }

        .mt-2 {
          margin-top: 0.5rem;
        }

        .contact-form-container {
          background-color: ${isDarkMode ? 'var(--dark-card)' : 'var(--light-card)'};
          padding: 2.5rem;
          border-radius: 1rem;
          box-shadow: var(--shadow);
          border: 1px solid ${isDarkMode ? 'var(--dark-border)' : 'var(--light-border)'};
        }

        .contact-form-container h2 {
          font-size: 1.75rem;
          font-weight: 700;
          margin: 0 0 1rem;
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
        }

        .form-description {
          font-size: 1.125rem;
          color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
          margin-bottom: 2rem;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group label {
          font-size: 1rem;
          font-weight: 500;
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
        }

        .required {
          color: var(--error);
        }

        .form-control {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid ${isDarkMode ? 'var(--dark-border)' : 'var(--light-border)'};
          border-radius: 0.5rem;
          background-color: ${isDarkMode ? 'var(--dark-bg)' : 'var(--light-bg)'};
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
          font-size: 1rem;
          transition: all 0.2s ease;
        }

        .form-control:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 2px ${isDarkMode ? 'rgba(14, 165, 233, 0.2)' : 'rgba(2, 132, 199, 0.2)'};
        }

        .form-control::placeholder {
          color: ${isDarkMode ? 'var(--dark-text-tertiary)' : 'var(--light-text-tertiary)'};
        }

        .submit-button {
          display: inline-block;
          background: linear-gradient(to right, var(--primary), var(--primary-light));
          color: white;
          font-weight: 600;
          font-size: 1rem;
          padding: 1rem 2rem;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 1rem;
        }

        .submit-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(14, 165, 233, 0.4);
        }

        .form-error {
          background-color: ${isDarkMode ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.1)'};
          border-left: 4px solid var(--error);
          padding: 1rem;
          border-radius: 0.25rem;
          margin-bottom: 1rem;
        }

        .form-error p {
          color: var(--error);
          margin: 0;
          font-size: 0.875rem;
        }

        .form-success {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 2rem 0;
        }

        .success-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 4rem;
          height: 4rem;
          border-radius: 50%;
          background-color: var(--success);
          margin-bottom: 1.5rem;
        }

        .success-icon svg {
          width: 2rem;
          height: 2rem;
          color: white;
        }

        .form-success h3 {
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0 0 1rem;
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
        }

        .form-success p {
          font-size: 1.125rem;
          color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
          margin-bottom: 2rem;
          max-width: 80%;
        }

        .new-message-btn {
          display: inline-block;
          background-color: ${isDarkMode ? 'rgba(14, 165, 233, 0.1)' : 'rgba(2, 132, 199, 0.1)'};
          color: var(--primary);
          font-weight: 600;
          padding: 0.75rem 1.5rem;
          border: 1px solid var(--primary);
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .new-message-btn:hover {
          background-color: var(--primary);
          color: white;
        }

        .faq-section {
          padding: 5rem 0;
          background-color: ${isDarkMode ? 'var(--dark-bg-secondary)' : 'var(--light-bg-secondary)'};
        }

        .faq-title {
          text-align: center;
          font-size: 2.25rem;
          font-weight: 700;
          margin-bottom: 3rem;
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
        }

        .faq-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
          gap: 2rem;
        }

        .faq-item {
          background-color: ${isDarkMode ? 'var(--dark-card)' : 'var(--light-card)'};
          padding: 2rem;
          border-radius: 1rem;
          box-shadow: var(--shadow);
          border: 1px solid ${isDarkMode ? 'var(--dark-border)' : 'var(--light-border)'};
          transition: transform 0.3s ease;
        }

        .faq-item:hover {
          transform: translateY(-5px);
        }

        .faq-item h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0 0 1rem;
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
        }

        .faq-item p {
          font-size: 1rem;
          line-height: 1.7;
          color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
          margin: 0;
        }

        @media (max-width: 1024px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          
          .contact-info {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .contact-title {
            font-size: 2.5rem;
          }
          
          .contact-hero {
            padding: 6rem 0 3rem;
          }
          
          .contact-content {
            padding: 3rem 0;
          }
          
          .contact-info {
            grid-template-columns: 1fr;
          }
          
          .faq-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </Layout>
  );
} 