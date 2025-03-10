import { useTheme } from '../context/ThemeContext';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function Custom404() {
  const { isDarkMode } = useTheme();

  return (
    <Layout title="Page Not Found | ABDOS">
      <div className="not-found-page">
        <div className="container">
          <div className="not-found-content">
            <div className="not-found-code">404</div>
            <h1 className="not-found-title">Page Not Found</h1>
            <p className="not-found-message">
              The page you are looking for doesn't exist or has been moved.
            </p>
            <div className="not-found-suggestions">
              <h2 className="suggestions-title">You might be looking for:</h2>
              <ul className="suggestions-list">
                <li><Link href="/">Home Page</Link></li>
                <li><Link href="/analysis">Skin Analysis</Link></li>
                <li><Link href="/resources">Educational Resources</Link></li>
                <li><Link href="/about">About ABDOS</Link></li>
                <li><Link href="/contact">Contact Us</Link></li>
              </ul>
            </div>
            <div className="not-found-actions">
              <Link href="/" className="not-found-button">
                Return to Home
              </Link>
              <Link href="/contact" className="not-found-button secondary">
                Report a Problem
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .not-found-page {
          min-height: calc(100vh - 70px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 0;
          background-color: ${isDarkMode ? 'var(--dark-bg)' : 'var(--light-bg)'};
        }
        
        .not-found-content {
          text-align: center;
          max-width: 700px;
          margin: 0 auto;
          padding: 3rem;
          background-color: ${isDarkMode ? 'var(--dark-card)' : 'var(--light-card)'};
          border-radius: 1rem;
          box-shadow: var(--shadow-lg);
          border: 1px solid ${isDarkMode ? 'var(--dark-border)' : 'var(--light-border)'};
        }
        
        .not-found-code {
          font-size: 8rem;
          font-weight: 800;
          line-height: 1;
          margin-bottom: 1rem;
          background: linear-gradient(90deg, var(--primary) 0%, var(--primary-light) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 10px 20px rgba(0, 118, 255, 0.2);
        }
        
        .not-found-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
        }
        
        .not-found-message {
          font-size: 1.25rem;
          line-height: 1.6;
          color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
          margin-bottom: 2.5rem;
        }
        
        .not-found-suggestions {
          margin-bottom: 2.5rem;
          text-align: left;
          background-color: ${isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)'};
          padding: 1.5rem;
          border-radius: 0.5rem;
        }
        
        .suggestions-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
        }
        
        .suggestions-list {
          list-style-type: none;
          padding: 0;
          margin: 0;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 0.75rem;
        }
        
        .suggestions-list li {
          padding: 0.5rem 0;
        }
        
        .suggestions-list a {
          color: var(--primary);
          text-decoration: none;
          transition: color 0.2s ease;
          display: inline-flex;
          align-items: center;
        }
        
        .suggestions-list a:hover {
          color: var(--primary-light);
          text-decoration: underline;
        }
        
        .not-found-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }
        
        .not-found-button {
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
        
        .not-found-button:not(.secondary) {
          background: linear-gradient(90deg, var(--primary) 0%, var(--primary-light) 100%);
          color: white;
          box-shadow: 0 4px 14px rgba(0, 118, 255, 0.39);
        }
        
        .not-found-button:not(.secondary):hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 118, 255, 0.5);
        }
        
        .not-found-button.secondary {
          background: transparent;
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
          border: 2px solid ${isDarkMode ? 'var(--dark-border)' : 'var(--light-border)'};
        }
        
        .not-found-button.secondary:hover {
          background-color: ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
          transform: translateY(-2px);
        }
        
        @media (max-width: 768px) {
          .not-found-content {
            padding: 2rem 1.5rem;
          }
          
          .not-found-code {
            font-size: 6rem;
          }
          
          .not-found-title {
            font-size: 2rem;
          }
          
          .not-found-message {
            font-size: 1.125rem;
          }
          
          .suggestions-list {
            grid-template-columns: 1fr;
          }
          
          .not-found-actions {
            flex-direction: column;
          }
          
          .not-found-button {
            width: 100%;
          }
        }
      `}</style>
    </Layout>
  );
} 