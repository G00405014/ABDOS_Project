import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
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
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="overline">Get in Touch</span>
            <h1 className="hero-title">
              We're Here to Help
              <span className="gradient-text"> Your Health Journey</span>
            </h1>
            <p className="hero-subtitle">
              Have questions about skin cancer detection or need assistance with your analysis? 
              Our team of experts is ready to support you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Information */}
            <motion.div 
              className="contact-info"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="info-card">
                <h2>Contact Information</h2>
                <p>Get in touch with us through any of these channels:</p>
                
                <div className="contact-methods">
                  <div className="contact-method">
                    <div className="method-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="method-content">
                      <h3>Email</h3>
                      <p>support@abdos.ai</p>
                    </div>
                  </div>

                  <div className="contact-method">
                    <div className="method-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="method-content">
                      <h3>Phone</h3>
                      <p>+1 (555) 123-4567</p>
                    </div>
                  </div>

                  <div className="contact-method">
                    <div className="method-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="method-content">
                      <h3>Location</h3>
                      <p>123 Healthcare Ave, Medical District<br />New York, NY 10001</p>
                    </div>
                  </div>
                </div>

                <div className="business-hours">
                  <h3>Business Hours</h3>
                  <ul>
                    <li><span>Monday - Friday:</span> 9:00 AM - 6:00 PM</li>
                    <li><span>Saturday:</span> 10:00 AM - 4:00 PM</li>
                    <li><span>Sunday:</span> Closed</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              className="contact-form"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="form-card">
                <h2>Send us a Message</h2>
                <p>Fill out the form below and we'll get back to you as soon as possible.</p>

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
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="name">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="subject">Subject</label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="analysis">Analysis Support</option>
                        <option value="technical">Technical Support</option>
                        <option value="partnership">Partnership</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="message">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="5"
                      ></textarea>
                    </div>

                    <button type="submit" className="submit-button">
                      Send Message
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="overline">Frequently Asked Questions</span>
            <h2>Common Questions</h2>
            <p className="section-subtitle">
              Find answers to frequently asked questions about our skin cancer detection service.
            </p>
          </motion.div>

          <div className="faq-grid">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                className="faq-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </motion.div>
            ))}
          </div>
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
        .contact-hero {
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

        /* Contact Section */
        .contact-section {
          background: ${isDarkMode ? 'var(--dark-bg)' : 'var(--light-bg)'};
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 48px;
        }

        .info-card, .form-card {
          background: ${isDarkMode ? 'var(--dark-card)' : 'var(--light-card)'};
          border-radius: 24px;
          padding: 32px;
          border: 1px solid ${isDarkMode ? 'var(--dark-border)' : 'var(--light-border)'};
        }

        .info-card h2, .form-card h2 {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 16px;
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
        }

        .info-card p, .form-card p {
          font-size: 1.125rem;
          line-height: 1.6;
          color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
          margin-bottom: 32px;
        }

        /* Contact Methods */
        .contact-methods {
          display: grid;
          gap: 24px;
          margin-bottom: 32px;
        }

        .contact-method {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }

        .method-icon {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: ${isDarkMode ? 'var(--dark-bg)' : 'var(--light-bg)'};
          border-radius: 12px;
          color: var(--primary);
        }

        .method-icon svg {
          width: 24px;
          height: 24px;
        }

        .method-content h3 {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 4px;
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
        }

        .method-content p {
          font-size: 1rem;
          margin-bottom: 0;
          color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
        }

        /* Business Hours */
        .business-hours {
          margin-top: 32px;
          padding-top: 32px;
          border-top: 1px solid ${isDarkMode ? 'var(--dark-border)' : 'var(--light-border)'};
        }

        .business-hours h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 16px;
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
        }

        .business-hours ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .business-hours li {
          display: flex;
          justify-content: space-between;
          font-size: 1rem;
          color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
          margin-bottom: 8px;
        }

        .business-hours li span {
          font-weight: 500;
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
        }

        /* Contact Form */
        .form-group {
          margin-bottom: 24px;
        }

        .form-group label {
          display: block;
          font-size: 0.875rem;
          font-weight: 500;
          margin-bottom: 8px;
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 12px 16px;
          border-radius: 12px;
          border: 1px solid ${isDarkMode ? 'var(--dark-border)' : 'var(--light-border)'};
          background: ${isDarkMode ? 'var(--dark-bg)' : 'var(--light-bg)'};
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px ${isDarkMode ? 'rgba(56, 189, 248, 0.1)' : 'rgba(2, 132, 199, 0.1)'};
        }

        .form-group textarea {
          resize: vertical;
          min-height: 120px;
        }

        .submit-button {
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
        }

        .submit-button svg {
          width: 20px;
          height: 20px;
          transition: transform 0.3s ease;
        }

        .submit-button:hover svg {
          transform: translateX(4px);
        }

        .submit-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(0, 118, 255, 0.3);
        }

        /* FAQ Section */
        .faq-section {
          background: ${isDarkMode ? 'var(--dark-bg-secondary)' : 'var(--light-bg-secondary)'};
        }

        .section-header {
          text-align: center;
          max-width: 800px;
          margin: 0 auto 48px;
        }

        .section-header h2 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 16px;
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
        }

        .section-subtitle {
          font-size: 1.125rem;
          line-height: 1.6;
          color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
        }

        .faq-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
        }

        .faq-card {
          background: ${isDarkMode ? 'var(--dark-card)' : 'var(--light-card)'};
          border-radius: 16px;
          padding: 24px;
          border: 1px solid ${isDarkMode ? 'var(--dark-border)' : 'var(--light-border)'};
        }

        .faq-card h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 12px;
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
        }

        .faq-card p {
          font-size: 1rem;
          line-height: 1.6;
          color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
          margin-bottom: 0;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .contact-grid {
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

          .info-card, .form-card {
            padding: 24px;
          }

          .faq-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </Layout>
  );
}

const faqs = [
  {
    question: "How accurate is the AI detection?",
    answer: "Our AI system has been trained on millions of skin images and achieves an accuracy rate of over 90% in detecting various types of skin cancer. However, it's important to note that this is a screening tool and should be used in conjunction with professional medical advice."
  },
  {
    question: "What types of images can I upload?",
    answer: "We accept high-quality images in JPG, PNG, and JPEG formats. For best results, ensure good lighting and clear focus on the area of concern."
  },
  {
    question: "How long does the analysis take?",
    answer: "The AI analysis typically takes less than 30 seconds to complete. You'll receive detailed results including the type of condition detected and recommended next steps."
  },
  {
    question: "Is my data secure?",
    answer: "Yes, we take data security seriously. All images and personal information are encrypted and stored securely. We never share your data with third parties without your consent."
  },
  {
    question: "Do you provide medical advice?",
    answer: "While our AI can detect potential skin conditions, we always recommend consulting with a healthcare professional for diagnosis and treatment. Our service is meant to be a screening tool, not a replacement for medical expertise."
  },
  {
    question: "Can I use this service internationally?",
    answer: "Yes, our service is available worldwide. However, please note that our recommendations and resources are primarily based on US healthcare guidelines."
  }
]; 