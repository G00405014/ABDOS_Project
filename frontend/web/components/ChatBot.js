import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from '../context/ThemeContext';

// Dynamically import all external components to prevent SSR issues
const ChatBot = dynamic(() => import('react-simple-chatbot'), { ssr: false });
const ThemeProvider = dynamic(
  () => import('styled-components').then((mod) => mod.ThemeProvider),
  { ssr: false }
);
const Motion = dynamic(() => 
  import('framer-motion').then((mod) => ({
    div: mod.motion.div,
    button: mod.motion.button
  })),
  { ssr: false }
);

const HealthChatBot = () => {
  const { isDarkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Reset unread count when chat is opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setUnreadCount(0);
    }
  }, [isOpen, isMinimized]);

  // Chat bot theme based on dark/light mode
  const theme = {
    background: isDarkMode ? '#1E293B' : '#F8FAFC',
    fontFamily: 'Inter, Arial, Helvetica, sans-serif',
    headerBgColor: isDarkMode ? '#0F172A' : '#0369A1',
    headerFontColor: '#ffffff',
    headerFontSize: '16px',
    botBubbleColor: isDarkMode ? '#334155' : '#0EA5E9',
    botFontColor: isDarkMode ? '#E2E8F0' : '#ffffff',
    userBubbleColor: isDarkMode ? '#475569' : '#0284C7',
    userFontColor: '#ffffff',
  };

  // Custom message handler to track unread messages
  const handleNewMessage = () => {
    if (!isOpen || isMinimized) {
      setUnreadCount(prev => prev + 1);
    }
  };

  // Chat bot steps
  const steps = [
    {
      id: '1',
      message: 'Hello! I am ABDOS Health Assistant. How can I help you today?',
      trigger: '2',
    },
    {
      id: '2',
      options: [
        { value: 1, label: 'How does image analysis work?', trigger: '3' },
        { value: 2, label: 'What skin conditions can be detected?', trigger: '4' },
        { value: 3, label: 'Is my data secure?', trigger: '5' },
        { value: 4, label: 'I have other questions', trigger: '6' },
      ],
    },
    {
      id: '3',
      message: 'Our image analysis feature uses advanced AI to analyze images of skin conditions. Simply upload an image, and our system will process it to identify potential skin conditions and provide a preliminary assessment.',
      trigger: '7',
    },
    {
      id: '4',
      message: 'Our system can currently detect various common skin conditions including eczema, psoriasis, acne, rosacea, and potential signs of skin cancer like melanoma. Please note that our analysis is not a replacement for professional medical diagnosis.',
      trigger: '7',
    },
    {
      id: '5',
      message: 'Yes, your data security is our priority. All images are encrypted during transmission and storage. We comply with healthcare privacy standards, and you can request deletion of your data at any time.',
      trigger: '7',
    },
    {
      id: '6',
      component: (
        <div>
          For more detailed questions, please contact our support team at{' '}
          <a 
            href="mailto:support@abdos-health.com" 
            style={{ color: '#0EA5E9' }}
            rel="noopener noreferrer"
          >
            support@abdos-health.com
          </a>
        </div>
      ),
      trigger: '7',
    },
    {
      id: '7',
      message: 'Is there anything else you would like to know?',
      trigger: '8',
    },
    {
      id: '8',
      options: [
        { value: 1, label: 'Yes, I have more questions', trigger: '2' },
        { value: 2, label: 'No, thank you for your help', trigger: '9' },
      ],
    },
    {
      id: '9',
      message: "You're welcome! If you need assistance in the future, I'll be here. Feel free to try our image analysis feature.",
      end: true,
    },
  ];

  const toggleMinimize = (e) => {
    e.stopPropagation();
    setIsMinimized(!isMinimized);
    if (!isMinimized) {
      // If minimizing, don't close the chat completely
      setIsOpen(true);
    }
  };

  const closeChat = (e) => {
    e.stopPropagation();
    setIsOpen(false);
    setIsMinimized(false);
  };

  return (
    <div className="chatbot-container">
      {!isOpen ? (
        <button
          className="chat-button"
          onClick={() => setIsOpen(true)}
          aria-label="Open chat"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="chat-icon">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
          </svg>
          <span className="chat-button-text">Chat with Health Assistant</span>
        </button>
      ) : isMinimized ? (
        <div className="minimized-chat" onClick={() => setIsMinimized(false)}>
          <div className="minimized-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="chat-icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
            </svg>
            {unreadCount > 0 && <span className="unread-badge">{unreadCount}</span>}
          </div>
          <span className="minimized-text">Chat with Assistant</span>
        </div>
      ) : (
        <div className="chatbot-wrapper">
          <div className="chatbot-dialog">
            <div className="chatbot-header">
              <div className="chatbot-title">ABDOS Health Assistant</div>
              <div className="chatbot-controls">
                <button 
                  className="control-button minimize-button" 
                  onClick={toggleMinimize}
                  aria-label="Minimize chat"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="control-icon">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                  </svg>
                </button>
                <button 
                  className="control-button close-button" 
                  onClick={closeChat}
                  aria-label="Close chat"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="control-icon">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="chatbot-content">
              <ThemeProvider theme={theme}>
                <ChatBot
                  steps={steps}
                  headerTitle="ABDOS Health Assistant"
                  botAvatar="/images/bot-avatar.svg"
                  userAvatar="/images/user-avatar.svg"
                  floating={false}
                  hideUserAvatar={false}
                  hideHeader={true}
                  width="100%"
                  height="400px"
                  handleEnd={handleNewMessage}
                />
              </ThemeProvider>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .chatbot-container {
          position: fixed;
          bottom: 30px;
          right: 30px;
          z-index: 1000;
          font-family: 'Inter', sans-serif;
        }
        
        .chat-button {
          display: flex;
          align-items: center;
          gap: 12px;
          background-color: var(--primary);
          color: white;
          border: none;
          border-radius: 12px;
          padding: 14px 20px;
          cursor: pointer;
          box-shadow: 0 8px 16px rgba(2, 132, 199, 0.25);
          transition: all 0.3s ease;
          font-weight: 600;
          font-size: 15px;
        }
        
        .chat-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 20px rgba(2, 132, 199, 0.3);
        }
        
        .chat-button:active {
          transform: translateY(-1px);
        }
        
        .chat-icon {
          width: 20px;
          height: 20px;
        }
        
        .minimized-chat {
          display: flex;
          align-items: center;
          gap: 10px;
          background-color: ${isDarkMode ? 'var(--dark-card)' : 'var(--light-card)'};
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
          border: 1px solid ${isDarkMode ? 'var(--dark-border)' : 'var(--light-border)'};
          border-radius: 12px;
          padding: 10px 16px;
          cursor: pointer;
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.12);
          transition: all 0.3s ease;
          font-size: 14px;
          font-weight: 600;
        }
        
        .minimized-chat:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.16);
        }
        
        .minimized-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--primary);
          color: white;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          position: relative;
        }
        
        .unread-badge {
          position: absolute;
          top: -6px;
          right: -6px;
          background-color: var(--error);
          color: white;
          border-radius: 50%;
          min-width: 20px;
          height: 20px;
          font-size: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2px;
          font-weight: 700;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        .chatbot-wrapper {
          position: relative;
        }
        
        .chatbot-dialog {
          position: absolute;
          bottom: 10px;
          right: 0;
          width: 380px;
          background: ${isDarkMode ? 'var(--dark-card)' : 'var(--light-card)'};
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.25);
          animation: fadeIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          border: 1px solid ${isDarkMode ? 'var(--dark-border)' : 'var(--light-border)'};
        }
        
        .chatbot-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          background-color: var(--primary);
          color: white;
          z-index: 10;
        }
        
        .chatbot-title {
          font-weight: 600;
          font-size: 16px;
        }
        
        .chatbot-controls {
          display: flex;
          gap: 10px;
        }
        
        .control-button {
          background: transparent;
          border: none;
          color: white;
          cursor: pointer;
          padding: 6px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        
        .control-button:hover {
          background-color: rgba(255, 255, 255, 0.2);
          transform: scale(1.05);
        }
        
        .control-icon {
          width: 18px;
          height: 18px;
        }
        
        .chatbot-content {
          max-height: 500px;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        @media (max-width: 640px) {
          .chatbot-container {
            bottom: 20px;
            right: 20px;
          }
          
          .chatbot-dialog {
            width: calc(100vw - 40px);
            max-width: 380px;
          }
          
          .chat-button-text {
            display: none;
          }
          
          .chat-button {
            padding: 14px;
            border-radius: 50%;
          }
          
          .minimized-text {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default HealthChatBot; 