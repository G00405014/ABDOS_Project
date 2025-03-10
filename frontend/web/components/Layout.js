import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import ChatBot from './ChatBot';
import { useTheme } from '../context/ThemeContext';
import TypewriterText from './TypewriterText';

export default function Layout({ children, title = 'Skin Cancer Detection | ABDOS' }) {
  const { isDarkMode } = useTheme();

  return (
    <div className={`app-layout ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Analyze skin lesions for early detection of skin cancer." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      
      {/* AI Skin Detection Tool Title Overlay */}
      <div className="ai-tool-title-overlay">
        <h2 className="ai-tool-title">
          <span className="ai-tool-prefix">ABDOS</span>
          <TypewriterText 
            text="AI SKIN DETECTION TOOL" 
            speed={50} 
            startDelay={1500}
            className="ai-tool-typewriter"
          />
        </h2>
      </div>
      
      <main className="main-content">
        {children}
      </main>
      
      <Footer />
      
      <ChatBot />

      <style jsx>{`
        .app-layout {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background-color: ${isDarkMode ? 'var(--dark-bg)' : 'var(--light-bg)'};
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
        }

        .main-content {
          flex: 1;
          padding-top: 80px;
          width: 100%;
          max-width: 100%;
          overflow-x: hidden;
        }
        
        .ai-tool-title-overlay {
          position: fixed;
          top: 100px;
          right: 30px;
          z-index: 1001;
          background-color: rgba(13, 24, 41, 0.95);
          border-radius: 8px;
          padding: 1.25rem 1.75rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3), 0 0 15px rgba(59, 130, 246, 0.5);
          border-left: 4px solid #3b82f6;
          transform: translateY(0);
          transition: all 0.3s ease;
          animation: pulseGlow 3s infinite alternate;
          max-width: 350px;
          display: block;
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
        }
        
        .ai-tool-title-overlay:hover {
          transform: translateY(-5px) scale(1.03);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4), 0 0 20px rgba(59, 130, 246, 0.6);
        }
        
        @keyframes pulseGlow {
          0% {
            box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3);
          }
          100% {
            box-shadow: 0 4px 25px rgba(59, 130, 246, 0.7);
          }
        }
        
        .ai-tool-title {
          margin: 0;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        
        .ai-tool-prefix {
          font-size: 1.1rem;
          font-weight: 700;
          letter-spacing: 2px;
          margin-bottom: 0.25rem;
          color: #3b82f6;
          text-transform: uppercase;
        }
        
        .ai-tool-typewriter {
          font-size: 1.5rem;
          font-weight: 800;
          letter-spacing: 1px;
          background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-transform: uppercase;
        }
        
        @media (max-width: 768px) {
          .main-content {
            padding-top: 70px;
          }
          
          .ai-tool-title-overlay {
            top: 80px;
            right: 20px;
            padding: 1rem 1.25rem;
          }
          
          .ai-tool-prefix {
            font-size: 0.9rem;
          }
          
          .ai-tool-typewriter {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </div>
  );
} 