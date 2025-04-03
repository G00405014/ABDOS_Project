import Link from 'next/link';
import { useTheme } from '../context/ThemeContext';
import { useState, useEffect } from 'react';

const Footer = () => {
  const { isDarkMode } = useTheme();
  const [year, setYear] = useState(2023);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setYear(new Date().getFullYear());
  }, []);

  // Return a simplified footer during server-side rendering
  if (!isMounted) {
    return (
      <footer className="site-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <span className="footer-logo">ABDOS</span>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <Link href="/" className="footer-logo">
              ABDOS
            </Link>
            <p className="footer-tagline">
              Advanced skin cancer detection powered by AI
            </p>
          </div>
          
          <div className="footer-nav-container">
            <div className="footer-nav">
              <h3 className="footer-heading">Navigation</h3>
              <ul className="footer-links">
                <li><Link href="/" className="footer-link">Home</Link></li>
                <li><Link href="#analysis" className="footer-link">Analysis</Link></li>
                <li><Link href="/about" className="footer-link">About</Link></li>
                <li><Link href="/resources" className="footer-link">Resources</Link></li>
              </ul>
            </div>
            
            <div className="footer-nav">
              <h3 className="footer-heading">Resources</h3>
              <ul className="footer-links">
                <li><Link href="/faq" className="footer-link">FAQ</Link></li>
                <li><Link href="/privacy" className="footer-link">Privacy Policy</Link></li>
                <li><Link href="/terms" className="footer-link">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">
            &copy; {year} ABDOS. All rights reserved.
          </p>
          <div className="social-links">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Twitter">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .site-footer {
          background-color: ${isDarkMode ? 'var(--dark-card)' : 'var(--light-card)'};
          padding: 4rem 0 2rem;
          margin-top: 4rem;
        }

        .footer-content {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 3rem;
          margin-bottom: 3rem;
        }

        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .footer-logo {
          font-size: 1.5rem;
          font-weight: 700;
          text-decoration: none;
          background: linear-gradient(to right, var(--primary), var(--primary-light));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .footer-tagline {
          color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
          line-height: 1.5;
          margin: 0;
        }

        .footer-nav-container {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }

        .footer-heading {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 1.25rem;
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
        }

        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .footer-link {
          color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .footer-link:hover {
          color: var(--primary);
        }

        .footer-bottom {
          padding-top: 2rem;
          border-top: 1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .copyright {
          font-size: 0.875rem;
          color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
          margin: 0;
        }

        .social-links {
          display: flex;
          gap: 1rem;
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
          transition: all 0.2s ease;
        }

        .social-link:hover {
          background-color: var(--primary);
          color: white;
          transform: translateY(-2px);
        }

        .icon {
          width: 1.25rem;
          height: 1.25rem;
        }

        @media (max-width: 768px) {
          .footer-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .footer-bottom {
            flex-direction: column;
            gap: 1.5rem;
            text-align: center;
          }
        }

        @media (max-width: 576px) {
          .footer-nav-container {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer; 