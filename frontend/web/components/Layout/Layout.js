import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import Header from '../Header';
import Footer from '../Footer';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

// Dynamic import to avoid SSR issues
const HealthChatBot = dynamic(() => import('../ChatBot'), { ssr: false });

const Layout = ({ children }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('home');
  const router = useRouter();

  // Navigation tabs
  const tabs = [
    { id: 'home', label: 'Home', icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>, href: '/' },
    { id: 'analysis', label: 'Image Analysis', icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H9a1 1 0 0 0-1 1v2c0 .6.4 1 1 1h6c.6 0 1-.4 1-1V3c0-.6-.4-1-1-1Z"></path><path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2"></path><path d="M12 11h4"></path><path d="M12 16h4"></path><path d="M8 11h.01"></path><path d="M8 16h.01"></path></svg>, href: '/analysis' },
    { id: 'about', label: 'About', icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>, href: '/about' },
    { id: 'profile', label: 'Profile', icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>, href: '/profile' },
  ];

  // Set active tab based on URL on initial load and when URL changes
  useEffect(() => {
    const path = router.pathname;
    const tab = tabs.find(t => t.href === path);
    if (tab) {
      setActiveTab(tab.id);
    }
  }, [router.pathname, tabs]);

  const handleTabClick = (tab) => {
    setActiveTab(tab.id);
    router.push(tab.href);
    
    // Scroll to the section based on the tab
    const section = document.getElementById(tab.id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`layout ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} activeTab={activeTab} onTabClick={handleTabClick} />
      
      <main className="main-content">
        <div 
          className="container animate-fade-in"
        >
          {children}
        </div>
      </main>
      
      <nav className="mobile-nav">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => handleTabClick(tab)}
          >
            <span className="nav-icon">{tab.icon}</span>
            <span className="nav-label">{tab.label}</span>
          </button>
        ))}
      </nav>
      
      <Footer isDarkMode={isDarkMode} />
      
      {/* Add ChatBot Component */}
      <HealthChatBot />
      
      <style jsx>{`
        .layout {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background-color: ${isDarkMode ? 'var(--dark-bg)' : 'var(--light-bg)'};
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
          transition: background-color 0.3s ease, color 0.3s ease;
        }
        
        .main-content {
          flex: 1;
          padding: 2rem 0;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .dark-mode {
          --heading-color: #E2E8F0;
        }
        
        .light-mode {
          --heading-color: #0F172A;
        }
        
        .mobile-nav {
          display: none;
        }
        
        @media (max-width: 768px) {
          .main-content {
            padding: 1rem 0 5rem;
          }
          
          .mobile-nav {
            display: flex;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: ${isDarkMode ? '#0F172A' : '#F8FAFC'};
            border-top: 1px solid ${isDarkMode ? '#334155' : '#E2E8F0'};
            padding: 0.5rem;
            z-index: 50;
          }
          
          .nav-item {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 0.5rem;
            color: ${isDarkMode ? '#94A3B8' : '#64748B'};
            background: transparent;
            border: none;
            cursor: pointer;
            transition: color 0.2s ease;
          }
          
          .nav-item.active {
            color: ${isDarkMode ? '#38BDF8' : '#0284C7'};
          }
          
          .nav-icon {
            margin-bottom: 0.25rem;
          }
          
          .nav-label {
            font-size: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Layout; 