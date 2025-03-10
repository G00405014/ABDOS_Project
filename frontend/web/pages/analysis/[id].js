import { useSession, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { useTheme } from '../../context/ThemeContext';
import Image from 'next/image';

export default function AnalysisDetails() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const { isDarkMode } = useTheme();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/auth/signin');
    } else if (status === 'authenticated' && id) {
      fetchAnalysis();
    }
  }, [status, id, router]);

  const fetchAnalysis = async () => {
    try {
      const response = await fetch(`/api/analyses/${id}`);
      const data = await response.json();

      if (response.ok) {
        setAnalysis(data);
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError('Error fetching analysis details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout title="Analysis Details | ABDOS">
        <div className="loading-container">
          <div className="loading-spinner" />
          <p>Loading analysis...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title="Error | ABDOS">
        <div className="error-container">
          <div className="error-content">
            <svg xmlns="http://www.w3.org/2000/svg" className="error-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2>Error</h2>
            <p>{error}</p>
            <button
              onClick={() => router.push('/dashboard')}
              className="back-button"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  if (!analysis) {
    return (
      <Layout title="Not Found | ABDOS">
        <div className="error-container">
          <div className="error-content">
            <svg xmlns="http://www.w3.org/2000/svg" className="error-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <h2>Analysis Not Found</h2>
            <p>The requested analysis could not be found.</p>
            <button
              onClick={() => router.push('/dashboard')}
              className="back-button"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`Analysis Details | ABDOS`}>
      <div className="analysis-container">
        <div className="analysis-header">
          <button
            onClick={() => router.push('/dashboard')}
            className="back-button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </button>
          <div className="analysis-meta">
            <p className="analysis-date">
              Analyzed on {new Date(analysis.createdAt).toLocaleDateString()}
            </p>
            <div className="confidence-badge">
              {Math.round(analysis.confidence * 100)}% Confidence
            </div>
          </div>
        </div>

        <div className="analysis-content">
          <div className="image-section">
            <div className="image-container">
              <Image
                src={analysis.imageUrl}
                alt="Analyzed skin area"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>

          <div className="results-section">
            <div className="result-card diagnosis">
              <h2>Diagnosis</h2>
              <p className="diagnosis-text">{analysis.diagnosis}</p>
              <div className="risk-level" data-risk={analysis.result.riskLevel.toLowerCase()}>
                {analysis.result.riskLevel} Risk
              </div>
            </div>

            <div className="result-card characteristics">
              <h2>Characteristics</h2>
              <ul className="characteristics-list">
                {analysis.result.characteristics.map((char, index) => (
                  <li key={index}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {char}
                  </li>
                ))}
              </ul>
            </div>

            {analysis.notes && (
              <div className="result-card notes">
                <h2>Notes</h2>
                <p>{analysis.notes}</p>
              </div>
            )}

            <div className="result-card recommendations">
              <h2>Recommendations</h2>
              <ul className="recommendations-list">
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Schedule an appointment with a dermatologist for professional evaluation
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Monitor the area for any changes in size, shape, or color
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  </svg>
                  Take photos regularly for comparison
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .analysis-container {
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .analysis-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .back-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: ${isDarkMode ? 'var(--dark-bg)' : 'var(--light-bg)'};
          border: 1px solid ${isDarkMode ? 'var(--dark-border)' : 'var(--light-border)'};
          border-radius: 12px;
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .back-button:hover {
          background: ${isDarkMode ? 'var(--dark-bg-secondary)' : 'var(--light-bg-secondary)'};
        }

        .back-button svg {
          width: 20px;
          height: 20px;
        }

        .analysis-meta {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .analysis-date {
          color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
          font-size: 0.875rem;
        }

        .confidence-badge {
          background: ${isDarkMode ? 'rgba(56, 189, 248, 0.1)' : 'rgba(2, 132, 199, 0.1)'};
          color: var(--primary);
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .analysis-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        .image-section {
          background: ${isDarkMode ? 'var(--dark-card)' : 'var(--light-card)'};
          border-radius: 24px;
          padding: 1rem;
          border: 1px solid ${isDarkMode ? 'var(--dark-border)' : 'var(--light-border)'};
        }

        .image-container {
          position: relative;
          width: 100%;
          padding-bottom: 100%;
          border-radius: 16px;
          overflow: hidden;
        }

        .results-section {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .result-card {
          background: ${isDarkMode ? 'var(--dark-card)' : 'var(--light-card)'};
          border-radius: 24px;
          padding: 1.5rem;
          border: 1px solid ${isDarkMode ? 'var(--dark-border)' : 'var(--light-border)'};
        }

        .result-card h2 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
        }

        .diagnosis-text {
          font-size: 2rem;
          font-weight: 700;
          color: var(--primary);
          margin-bottom: 1rem;
        }

        .risk-level {
          display: inline-block;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-weight: 500;
          font-size: 0.875rem;
        }

        .risk-level[data-risk="high"] {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
        }

        .risk-level[data-risk="medium"] {
          background: rgba(245, 158, 11, 0.1);
          color: #f59e0b;
        }

        .risk-level[data-risk="low"] {
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
        }

        .characteristics-list,
        .recommendations-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .characteristics-list li,
        .recommendations-list li {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
          margin-bottom: 0.75rem;
          line-height: 1.5;
        }

        .characteristics-list li:last-child,
        .recommendations-list li:last-child {
          margin-bottom: 0;
        }

        .characteristics-list svg,
        .recommendations-list svg {
          width: 20px;
          height: 20px;
          color: var(--primary);
          flex-shrink: 0;
        }

        .notes p {
          color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
          line-height: 1.6;
        }

        /* Loading State */
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 60vh;
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid ${isDarkMode ? 'var(--dark-border)' : 'var(--light-border)'};
          border-top-color: var(--primary);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        /* Error State */
        .error-container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 60vh;
          padding: 2rem;
        }

        .error-content {
          text-align: center;
          max-width: 400px;
        }

        .error-icon {
          width: 64px;
          height: 64px;
          color: var(--error);
          margin-bottom: 1.5rem;
        }

        .error-content h2 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
        }

        .error-content p {
          color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
          margin-bottom: 1.5rem;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .analysis-content {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .analysis-container {
            padding: 1rem;
          }

          .analysis-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .analysis-meta {
            width: 100%;
            justify-content: space-between;
          }

          .diagnosis-text {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
} 