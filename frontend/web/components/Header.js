import { useTheme } from '../context/ThemeContext';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          <div className="logo-container">
            <Link href="/" className="logo">
              ABDOS
            </Link>
          </div>

          <nav className={`main-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            <ul className="nav-links">
              <li>
                <Link href="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/analysis" className="nav-link">
                  Analysis
                </Link>
              </li>
              <li>
                <Link href="/about" className="nav-link">
                  About
                </Link>
              </li>
              <li>
                <Link href="/resources" className="nav-link">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/contact" className="nav-link">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <div className="header-actions">
            <button 
              className="theme-toggle" 
              onClick={toggleTheme} 
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              )}
            </button>

            <Link href="/analysis" className="btn btn-primary">
              Try Analysis
            </Link>
            
            <button 
              className="mobile-menu-toggle" 
              onClick={toggleMobileMenu} 
              aria-label="Toggle menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
                {isMobileMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </>
                ) : (
                  <>
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .site-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 1.25rem 0;
          transition: all 0.3s ease;
          background-color: ${isDarkMode ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)'};
          backdrop-filter: blur(8px);
        }

        .site-header.scrolled {
          padding: 0.75rem 0;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          background-color: ${isDarkMode ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)'};
        }

        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo-container {
          flex-shrink: 0;
        }

        .logo {
          font-size: 1.5rem;
          font-weight: 700;
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
          text-decoration: none;
          background: linear-gradient(to right, var(--primary), var(--primary-light));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .main-nav {
          margin-left: 2rem;
        }

        .nav-links {
          display: flex;
          gap: 2rem;
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .nav-link {
          color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
          font-weight: 500;
          text-decoration: none;
          transition: color 0.2s ease;
          position: relative;
          padding: 0.5rem 0;
        }

        .nav-link:hover {
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background-color: var(--primary);
          transition: width 0.2s ease;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .theme-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          border: none;
          background-color: transparent;
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .theme-toggle:hover {
          background-color: ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
        }

        .icon {
          width: 1.25rem;
          height: 1.25rem;
        }

        .mobile-menu-toggle {
          display: none;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          border: none;
          background-color: transparent;
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .mobile-menu-toggle:hover {
          background-color: ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
        }

        @media (max-width: 1024px) {
          .main-nav {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background-color: ${isDarkMode ? 'var(--dark-bg)' : 'var(--light-bg)'};
            padding: 1rem 0;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            margin-left: 0;
          }

          .main-nav.mobile-open {
            display: block;
          }

          .nav-links {
            flex-direction: column;
            align-items: center;
            gap: 1rem;
          }

          .nav-link {
            padding: 0.75rem 0;
          }

          .mobile-menu-toggle {
            display: flex;
          }
        }

        @media (max-width: 640px) {
          .btn {
            display: none;
          }
        }
      `}</style>
    </header>
  );
};

export default Header; 