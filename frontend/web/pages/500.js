import { useTheme } from '../context/ThemeContext';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function Custom500() {
  const { isDarkMode } = useTheme();

  return (
    <Layout title="Server Error | ABDOS">
      <div className="server-error-page">
        <div className="container">
          <div className="server-error-content">
            <div className="server-error-code">500</div>
            <h1 className="server-error-title">Server Error</h1>
            <p className="server-error-message">
              We're sorry, but something went wrong on our server. Our team has been notified and is working to fix the issue.
            </p>
            <div className="server-error-actions">
              <Link href="/" className="server-error-button">
                Return to Home
              </Link>
              <button 
                onClick={() => window.location.reload()} 
                className="server-error-button secondary"
              >
                Try Again
              </button>
            </div>
            <div className="server-error-help">
              <p>If the problem persists, please <Link href="/contact">contact our support team</Link>.</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .server-error-page {
          min-height: calc(100vh - 70px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 0;
          background-color: ${isDarkMode ? 'var(--dark-bg)' : 'var(--light-bg)'};
        }
        
        .server-error-content {
          text-align: center;
          max-width: 600px;
          margin: 0 auto;
          padding: 3rem;
          background-color: ${isDarkMode ? 'var(--dark-card)' : 'var(--light-card)'};
          border-radius: 1rem;
          box-shadow: var(--shadow-lg);
          border: 1px solid ${isDarkMode ? 'var(--dark-border)' : 'var(--light-border)'};
        }
        
        .server-error-code {
          font-size: 8rem;
          font-weight: 800;
          line-height: 1;
          margin-bottom: 1rem;
          background: linear-gradient(90deg, #ef4444, #f97316);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 10px 20px rgba(239, 68, 68, 0.2);
        }
        
        .server-error-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
        }
        
        .server-error-message {
          font-size: 1.25rem;
          line-height: 1.6;
          color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
          margin-bottom: 2.5rem;
        }
        
        .server-error-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-bottom: 2rem;
        }
        
        .server-error-button {
          padding: 0.875rem 2rem;
          border-radius: 0.5rem;
          font-weight: 600;
          font-size: 1.125rem;
          text-decoration: none;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border: none;
        }
        
        .server-error-button:not(.secondary) {
          background: linear-gradient(90deg, var(--primary) 0%, var(--primary-light) 100%);
          color: white;
          box-shadow: 0 4px 14px rgba(0, 118, 255, 0.39);
        }
        
        .server-error-button:not(.secondary):hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 118, 255, 0.5);
        }
        
        .server-error-button.secondary {
          background: transparent;
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
          border: 2px solid ${isDarkMode ? 'var(--dark-border)' : 'var(--light-border)'};
        }
        
        .server-error-button.secondary:hover {
          background-color: ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
          transform: translateY(-2px);
        }
        
        .server-error-help {
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid ${isDarkMode ? 'var(--dark-border)' : 'var(--light-border)'};
        }
        
        .server-error-help p {
          color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
          font-size: 0.875rem;
        }
        
        .server-error-help a {
          color: var(--primary);
          text-decoration: none;
          transition: color 0.2s ease;
        }
        
        .server-error-help a:hover {
          color: var(--primary-light);
          text-decoration: underline;
        }
        
        @media (max-width: 768px) {
          .server-error-content {
            padding: 2rem 1.5rem;
          }
          
          .server-error-code {
            font-size: 6rem;
          }
          
          .server-error-title {
            font-size: 2rem;
          }
          
          .server-error-message {
            font-size: 1.125rem;
          }
          
          .server-error-actions {
            flex-direction: column;
          }
          
          .server-error-button {
            width: 100%;
          }
        }
      `}</style>
    </Layout>
  );
} 