import { useSession, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useTheme } from '../context/ThemeContext';
import Image from 'next/image';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/auth/signin');
    } else if (status === 'authenticated') {
      fetchAnalyses();
    }
  }, [status, router]);

  const fetchAnalyses = async () => {
    try {
      const response = await fetch('/api/analyses');
      const data = await response.json();
      setAnalyses(data);
    } catch (error) {
      console.error('Error fetching analyses:', error);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <Layout title="Dashboard | ABDOS">
        <div className="loading-container">
          <div className="loading-spinner" />
          <p>Loading...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Dashboard | ABDOS">
      <div className="dashboard-container">
        {/* User Profile Section */}
        <section className="profile-section">
          <div className="profile-header">
            <div className="profile-avatar">
              {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user.name}
                  width={80}
                  height={80}
                  className="avatar-image"
                />
              ) : (
                <div className="avatar-placeholder">
                  {session?.user?.name?.charAt(0)}
                </div>
              )}
            </div>
            <div className="profile-info">
              <h1 className="profile-name">{session?.user?.name}</h1>
              <p className="profile-email">{session?.user?.email}</p>
            </div>
          </div>

          <div className="profile-stats">
            <div className="stat-card">
              <h3>Total Analyses</h3>
              <p className="stat-value">{analyses.length}</p>
            </div>
            <div className="stat-card">
              <h3>Last Analysis</h3>
              <p className="stat-value">
                {analyses[0]?.createdAt
                  ? new Date(analyses[0].createdAt).toLocaleDateString()
                  : 'N/A'}
              </p>
            </div>
          </div>
        </section>

        {/* Analysis History Section */}
        <section className="analysis-section">
          <h2 className="section-title">Analysis History</h2>
          
          {analyses.length === 0 ? (
            <div className="empty-state">
              <svg xmlns="http://www.w3.org/2000/svg" className="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3>No analyses yet</h3>
              <p>Upload an image to get started with skin analysis</p>
              <button
                onClick={() => router.push('/analysis')}
                className="start-analysis-button"
              >
                Start Analysis
              </button>
            </div>
          ) : (
            <div className="analysis-grid">
              {analyses.map((analysis) => (
                <div key={analysis.id} className="analysis-card">
                  <div className="analysis-image">
                    <Image
                      src={analysis.imageUrl}
                      alt="Analysis"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="analysis-content">
                    <div className="analysis-header">
                      <h3>{analysis.diagnosis}</h3>
                      <span className="confidence-badge">
                        {Math.round(analysis.confidence * 100)}%
                      </span>
                    </div>
                    <p className="analysis-date">
                      {new Date(analysis.createdAt).toLocaleDateString()}
                    </p>
                    {analysis.notes && (
                      <p className="analysis-notes">{analysis.notes}</p>
                    )}
                    <button
                      onClick={() => router.push(`/analysis/${analysis.id}`)}
                      className="view-details-button"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <style jsx>{`
        .dashboard-container {
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        /* Profile Section */
        .profile-section {
          background: ${isDarkMode ? 'var(--dark-card)' : 'var(--light-card)'};
          border-radius: 24px;
          padding: 2rem;
          margin-bottom: 2rem;
          border: 1px solid ${isDarkMode ? 'var(--dark-border)' : 'var(--light-border)'};
        }

        .profile-header {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .profile-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          overflow: hidden;
          background: ${isDarkMode ? 'var(--dark-bg)' : 'var(--light-bg)'};
        }

        .avatar-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: 600;
          color: var(--primary);
          background: ${isDarkMode ? 'var(--dark-bg)' : 'var(--light-bg)'};
        }

        .profile-info {
          flex: 1;
        }

        .profile-name {
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
        }

        .profile-email {
          font-size: 1rem;
          color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
        }

        .profile-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }

        .stat-card {
          background: ${isDarkMode ? 'var(--dark-bg)' : 'var(--light-bg)'};
          padding: 1.5rem;
          border-radius: 16px;
          text-align: center;
        }

        .stat-card h3 {
          font-size: 0.875rem;
          font-weight: 500;
          margin-bottom: 0.5rem;
          color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
        }

        .stat-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--primary);
        }

        /* Analysis Section */
        .analysis-section {
          background: ${isDarkMode ? 'var(--dark-card)' : 'var(--light-card)'};
          border-radius: 24px;
          padding: 2rem;
          border: 1px solid ${isDarkMode ? 'var(--dark-border)' : 'var(--light-border)'};
        }

        .section-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 2rem;
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
        }

        .empty-state {
          text-align: center;
          padding: 4rem 2rem;
        }

        .empty-icon {
          width: 64px;
          height: 64px;
          color: var(--primary);
          margin-bottom: 1.5rem;
        }

        .empty-state h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
        }

        .empty-state p {
          color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
          margin-bottom: 2rem;
        }

        .start-analysis-button {
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
          color: white;
          padding: 0.875rem 2rem;
          border-radius: 12px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .start-analysis-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(0, 118, 255, 0.3);
        }

        .analysis-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .analysis-card {
          background: ${isDarkMode ? 'var(--dark-bg)' : 'var(--light-bg)'};
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid ${isDarkMode ? 'var(--dark-border)' : 'var(--light-border)'};
          transition: transform 0.3s ease;
        }

        .analysis-card:hover {
          transform: translateY(-4px);
        }

        .analysis-image {
          position: relative;
          width: 100%;
          height: 200px;
        }

        .analysis-content {
          padding: 1.5rem;
        }

        .analysis-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .analysis-header h3 {
          font-size: 1.125rem;
          font-weight: 600;
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
        }

        .confidence-badge {
          background: ${isDarkMode ? 'rgba(56, 189, 248, 0.1)' : 'rgba(2, 132, 199, 0.1)'};
          color: var(--primary);
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .analysis-date {
          font-size: 0.875rem;
          color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
          margin-bottom: 1rem;
        }

        .analysis-notes {
          font-size: 0.875rem;
          color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
          margin-bottom: 1rem;
          line-height: 1.5;
        }

        .view-details-button {
          width: 100%;
          padding: 0.75rem;
          background: transparent;
          color: var(--primary);
          border: 1px solid var(--primary);
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .view-details-button:hover {
          background: var(--primary);
          color: white;
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

        /* Responsive Design */
        @media (max-width: 768px) {
          .dashboard-container {
            padding: 1rem;
          }

          .profile-section,
          .analysis-section {
            padding: 1.5rem;
          }

          .profile-header {
            flex-direction: column;
            text-align: center;
          }

          .profile-stats {
            grid-template-columns: 1fr;
          }

          .analysis-grid {
            grid-template-columns: 1fr;
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