import { useTheme } from '../context/ThemeContext';

export default function Loading({ size = 'medium', fullPage = false, message = 'Loading...' }) {
  const { isDarkMode } = useTheme();
  
  // Determine spinner size based on prop
  const spinnerSizes = {
    small: { width: '1.5rem', height: '1.5rem', borderWidth: '2px' },
    medium: { width: '3rem', height: '3rem', borderWidth: '3px' },
    large: { width: '5rem', height: '5rem', borderWidth: '4px' }
  };
  
  const spinnerSize = spinnerSizes[size] || spinnerSizes.medium;
  
  return (
    <div className={`loading-container ${fullPage ? 'full-page' : ''}`}>
      <div className="spinner-container">
        <div className="spinner"></div>
        {message && <p className="loading-message">{message}</p>}
      </div>
      
      <style jsx>{`
        .loading-container {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }
        
        .loading-container.full-page {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: ${isDarkMode ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.8)'};
          z-index: 1000;
          padding: 0;
        }
        
        .spinner-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        
        .spinner {
          width: ${spinnerSize.width};
          height: ${spinnerSize.height};
          border: ${spinnerSize.borderWidth} solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
          border-radius: 50%;
          border-top-color: var(--primary);
          animation: spin 1s ease-in-out infinite;
        }
        
        .loading-message {
          margin-top: 1rem;
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
          font-size: ${size === 'small' ? '0.875rem' : size === 'large' ? '1.25rem' : '1rem'};
          text-align: center;
        }
        
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
} 