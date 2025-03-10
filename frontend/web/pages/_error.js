import { useTheme } from '../context/ThemeContext';
import Layout from '../components/Layout';
import Link from 'next/link';

function Error({ statusCode }) {
  const { isDarkMode } = useTheme();

  return (
    <Layout title={`Error ${statusCode || 'Unknown'} | ABDOS`}>
      <div className="error-page">
        <div className="container">
          <div className="error-content">
            <div className="error-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h1 className="error-title">
              {statusCode
                ? `Error ${statusCode}`
                : 'An Error Occurred'}
            </h1>
            <p className="error-message">
              {statusCode
                ? `A server-side error occurred. Our team has been notified.`
                : 'An error occurred on the client. Please try again.'}
            </p>
            <div className="error-actions">
              <Link href="/" className="error-button">
                Return to Home
              </Link>
              <Link href="/contact" className="error-button secondary">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .error-page {
          min-height: calc(100vh - 70px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 0;
          background-color: ${isDarkMode ? 'var(--dark-bg)' : 'var(--light-bg)'};
        }
        
        .error-content {
          text-align: center;
          max-width: 600px;
          margin: 0 auto;
          padding: 3rem;
          background-color: ${isDarkMode ? 'var(--dark-card)' : 'var(--light-card)'};
          border-radius: 1rem;
          box-shadow: var(--shadow-lg);
          border: 1px solid ${isDarkMode ? 'var(--dark-border)' : 'var(--light-border)'};
        }
        
        .error-icon {
          width: 5rem;
          height: 5rem;
          margin: 0 auto 2rem;
          color: #ef4444;
        }
        
        .error-icon svg {
          width: 100%;
          height: 100%;
        }
        
        .error-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
        }
        
        .error-message {
          font-size: 1.25rem;
          line-height: 1.6;
          color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
          margin-bottom: 2.5rem;
        }
        
        .error-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }
        
        .error-button {
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
        
        .error-button:not(.secondary) {
          background: linear-gradient(90deg, var(--primary) 0%, var(--primary-light) 100%);
          color: white;
          box-shadow: 0 4px 14px rgba(0, 118, 255, 0.39);
        }
        
        .error-button:not(.secondary):hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 118, 255, 0.5);
        }
        
        .error-button.secondary {
          background: transparent;
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
          border: 2px solid ${isDarkMode ? 'var(--dark-border)' : 'var(--light-border)'};
        }
        
        .error-button.secondary:hover {
          background-color: ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
          transform: translateY(-2px);
        }
        
        @media (max-width: 768px) {
          .error-content {
            padding: 2rem 1.5rem;
          }
          
          .error-title {
            font-size: 2rem;
          }
          
          .error-message {
            font-size: 1.125rem;
          }
          
          .error-actions {
            flex-direction: column;
          }
          
          .error-button {
            width: 100%;
          }
        }
      `}</style>
    </Layout>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error; 