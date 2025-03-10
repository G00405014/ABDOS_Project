import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useTheme } from '../../context/ThemeContext';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { isDarkMode } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result.error) {
        setError(result.error);
      } else {
        router.push('/dashboard');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <Layout title="Sign In | ABDOS">
      <div className="auth-container">
        <div className="auth-card">
          <h1 className="auth-title">Sign In</h1>
          
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="submit-button">
              Sign In
            </button>
          </form>

          <div className="divider">
            <span>or</span>
          </div>

          <button
            onClick={() => signIn('github')}
            className="github-button"
          >
            <svg viewBox="0 0 24 24" className="github-icon">
              <path fill="currentColor" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Continue with GitHub
          </button>

          <p className="auth-links">
            Don't have an account?{' '}
            <a href="/auth/signup" className="auth-link">
              Sign Up
            </a>
          </p>
        </div>
      </div>

      <style jsx>{`
        .auth-container {
          min-height: calc(100vh - 160px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .auth-card {
          background: ${isDarkMode ? 'var(--dark-card)' : 'var(--light-card)'};
          border-radius: 24px;
          padding: 2.5rem;
          width: 100%;
          max-width: 420px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          border: 1px solid ${isDarkMode ? 'var(--dark-border)' : 'var(--light-border)'};
        }

        .auth-title {
          font-size: 2rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 2rem;
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
        }

        .error-message {
          background: ${isDarkMode ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.1)'};
          border: 1px solid var(--error);
          color: var(--error);
          padding: 1rem;
          border-radius: 12px;
          margin-bottom: 1.5rem;
          text-align: center;
          font-size: 0.875rem;
        }

        .auth-form {
          margin-bottom: 1.5rem;
        }

        .form-group {
          margin-bottom: 1.25rem;
        }

        .form-group label {
          display: block;
          font-size: 0.875rem;
          font-weight: 500;
          margin-bottom: 0.5rem;
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
        }

        .form-group input {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 12px;
          border: 1px solid ${isDarkMode ? 'var(--dark-border)' : 'var(--light-border)'};
          background: ${isDarkMode ? 'var(--dark-bg)' : 'var(--light-bg)'};
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .form-group input:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px ${isDarkMode ? 'rgba(56, 189, 248, 0.1)' : 'rgba(2, 132, 199, 0.1)'};
        }

        .submit-button {
          width: 100%;
          padding: 0.875rem;
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .submit-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(0, 118, 255, 0.3);
        }

        .divider {
          display: flex;
          align-items: center;
          text-align: center;
          margin: 1.5rem 0;
        }

        .divider::before,
        .divider::after {
          content: '';
          flex: 1;
          border-bottom: 1px solid ${isDarkMode ? 'var(--dark-border)' : 'var(--light-border)'};
        }

        .divider span {
          padding: 0 1rem;
          color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
          font-size: 0.875rem;
        }

        .github-button {
          width: 100%;
          padding: 0.875rem;
          background: ${isDarkMode ? 'var(--dark-bg)' : 'var(--light-bg)'};
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
          border: 1px solid ${isDarkMode ? 'var(--dark-border)' : 'var(--light-border)'};
          border-radius: 12px;
          font-weight: 500;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
        }

        .github-button:hover {
          background: ${isDarkMode ? 'var(--dark-bg-secondary)' : 'var(--light-bg-secondary)'};
        }

        .github-icon {
          width: 20px;
          height: 20px;
        }

        .auth-links {
          margin-top: 1.5rem;
          text-align: center;
          font-size: 0.875rem;
          color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
        }

        .auth-link {
          color: var(--primary);
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s ease;
        }

        .auth-link:hover {
          color: var(--primary-light);
        }

        @media (max-width: 640px) {
          .auth-card {
            padding: 1.5rem;
          }

          .auth-title {
            font-size: 1.75rem;
          }
        }
      `}</style>
    </Layout>
  );
} 