import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import TypewriterText from './TypewriterText';

const TypingAnimation = () => (
  <style jsx global>{`
    @keyframes typingAnimation {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-5px); }
    }
  `}</style>
);

const HealthAssistant = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const { isDarkMode } = useTheme();
  const messagesEndRef = useRef(null);
  const [showEmojis, setShowEmojis] = useState(false);

  // Add more emojis as needed
  const quickEmojis = ['👋', '👍', '❤️', '😊', '🤔', '👨‍⚕️', '🏥', '💊'];

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        { 
          text: "Hello! I'm your ABDOS Health Assistant 👋", 
          sender: 'assistant',
          timestamp: new Date()
        },
        {
          text: 'I can help you with:',
          sender: 'assistant',
          timestamp: new Date(),
          options: [
            'Skin Analysis Help 🔍',
            'Common Skin Conditions 📋',
            'Privacy & Security 🔒',
            'Emergency Help 🚨',
            'General Questions ❓'
          ]
        }
      ]);
    }
  }, [isOpen]);

  const handleOptionClick = (option) => {
    // Remove emojis for the switch case
    const cleanOption = option.replace(/[\u{1F300}-\u{1F6FF}\u{2600}-\u{26FF}]/gu, '').trim();
    
    setMessages(prev => [...prev, { 
      text: option, 
      sender: 'user',
      timestamp: new Date()
    }]);
    
    let response = '';
    switch (cleanOption) {
      case 'Skin Analysis Help':
        response = {
          text: 'Our AI-powered skin analysis works in 3 simple steps:\n1. Upload a clear photo of your skin concern\n2. Wait for our AI to analyze the image\n3. Receive detailed results and recommendations',
          followUp: ['How accurate is it? 📊', 'What photos work best? 📸', 'Start analysis now ▶️']
        };
        break;
      case 'Common Skin Conditions':
        response = {
          text: 'We can detect various skin conditions including:\n• Melanoma\n• Basal Cell Carcinoma\n• Melanocytic Nevi\n• Benign Keratosis\n• Actinic Keratoses\n• Vascular Lesions\n• Dermatofibroma',
          followUp: ['Learn more about melanoma 🔬', 'Prevention tips 🛡️', 'Risk factors ⚠️']
        };
        break;
      case 'Privacy & Security':
        response = {
          text: '🔒 Your privacy is our top priority:\n• All images are encrypted\n• Data is processed securely\n• Automatic deletion after analysis\n• No personal data storage\n• HIPAA compliant',
          followUp: ['View privacy policy', 'Data handling', 'Delete my data']
        };
        break;
      case 'Emergency Help':
        response = {
          text: '🚨 For immediate medical attention:\n• Call emergency services: 911\n• Contact your dermatologist\n• Find nearest skin clinic',
          followUp: ['Find nearest clinic', 'Book appointment', 'View symptoms guide']
        };
        break;
      default:
        response = {
          text: "I'll do my best to help. What would you like to know?",
          followUp: ['Common questions', 'Technical support', 'Contact human']
        };
    }
    
    setMessages(prev => [...prev, { 
      ...response,
      sender: 'assistant',
      timestamp: new Date()
    }]);
  };

  // Add emoji to input
  const handleEmojiClick = (emoji) => {
    setInput(prev => prev + emoji);
    setShowEmojis(false);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const searchWeb = async (query) => {
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query })
      });
      const data = await response.json();
      return data.answer;
    } catch (error) {
      console.error('Search error:', error);
      return "I'm sorry, I couldn't search for that information right now.";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user', timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsSearching(true);

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: input })
      });

      const data = await response.json();
      
      setMessages(prev => [...prev, {
        text: data.answer,
        sender: 'assistant',
        timestamp: new Date(),
        suggestions: data.suggestions
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        text: "I'm sorry, I couldn't process that request. Please try again.",
        sender: 'assistant',
        timestamp: new Date()
      }]);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <>
      <TypingAnimation />
      <div style={styles.container(isDarkMode)}>
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          style={styles.toggleButton(isDarkMode)}
        >
          {isOpen ? '✕' : '💬'}
        </button>

        {isOpen && (
          <div style={styles.chatWindow(isDarkMode)}>
            <div style={styles.header(isDarkMode)}>
              Health Assistant
              {isSearching && <span style={styles.searchingIndicator}>Searching...</span>}
            </div>
            <div style={styles.messageContainer}>
              {messages.map((msg, idx) => (
                <div key={idx} style={styles.messageWrapper}>
                  <div style={{
                    ...styles.avatar,
                    ...(msg.sender === 'user' 
                      ? styles.userAvatar(isDarkMode) 
                      : styles.botAvatar(isDarkMode))
                  }}>
                    {msg.sender === 'user' ? '👤' : '🤖'}
                  </div>
                  <div style={styles.messageContent}>
                    <div style={{
                      ...styles.message(isDarkMode),
                      ...(msg.sender === 'user' ? styles.userMessage : styles.assistantMessage)
                    }}>
                      <TypewriterText 
                        text={msg.text} 
                        speed={msg.sender === 'assistant' ? 30 : 0} 
                      />
                    </div>
                    {msg.timestamp && (
                      <div style={styles.timestamp}>
                        {new Date(msg.timestamp).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    )}
                    {msg.options && (
                      <div style={styles.optionsGrid}>
                        {msg.options.map((option, optIdx) => (
                          <button
                            key={optIdx}
                            onClick={() => handleOptionClick(option)}
                            style={styles.optionButton(isDarkMode)}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                    {msg.followUp && (
                      <div style={styles.followUpContainer}>
                        {msg.followUp.map((option, optIdx) => (
                          <button
                            key={optIdx}
                            onClick={() => handleOptionClick(option)}
                            style={styles.followUpButton(isDarkMode)}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isSearching && (
                <div style={styles.messageWrapper}>
                  <div style={{
                    ...styles.avatar,
                    ...styles.botAvatar(isDarkMode)
                  }}>
                    🤖
                  </div>
                  <div style={styles.typingIndicator}>
                    <span style={styles.typingDot(isDarkMode)} />
                    <span style={{...styles.typingDot(isDarkMode), animationDelay: '0.2s'}} />
                    <span style={{...styles.typingDot(isDarkMode), animationDelay: '0.4s'}} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSubmit} style={styles.inputContainer}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question..."
                style={styles.input(isDarkMode)}
              />
              <button type="submit" style={styles.sendButton}>
                Send
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

const styles = {
  container: (isDarkMode) => ({
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: 1000
  }),
  toggleButton: (isDarkMode) => ({
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: isDarkMode ? '#4299e1' : '#3182ce',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
    fontSize: '1.5rem'
  }),
  chatWindow: (isDarkMode) => ({
    position: 'fixed',
    bottom: '100px',
    right: '20px',
    width: '350px',
    height: '500px',
    backgroundColor: isDarkMode ? '#2d3748' : 'white',
    borderRadius: '1rem',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column'
  }),
  header: (isDarkMode) => ({
    padding: '1rem',
    backgroundColor: isDarkMode ? '#4299e1' : '#3182ce',
    color: 'white',
    borderTopLeftRadius: '1rem',
    borderTopRightRadius: '1rem',
    fontWeight: '600'
  }),
  messageContainer: {
    flex: 1,
    overflowY: 'auto',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  message: (isDarkMode) => ({
    padding: '0.75rem',
    borderRadius: '0.5rem',
    maxWidth: '80%',
    wordBreak: 'break-word'
  }),
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#4299e1',
    color: 'white'
  },
  assistantMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#e2e8f0',
    color: '#2d3748'
  },
  inputContainer: {
    padding: '1rem',
    borderTop: '1px solid #e2e8f0',
    display: 'flex',
    gap: '0.5rem'
  },
  input: (isDarkMode) => ({
    flex: 1,
    padding: '0.5rem',
    borderRadius: '0.25rem',
    border: '1px solid #e2e8f0',
    backgroundColor: isDarkMode ? '#2d3748' : 'white',
    color: isDarkMode ? 'white' : 'black'
  }),
  sendButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#4299e1',
    color: 'white',
    border: 'none',
    borderRadius: '0.25rem',
    cursor: 'pointer'
  },
  searchingIndicator: {
    fontSize: '0.8rem',
    marginLeft: '0.5rem'
  },
  optionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    padding: '0.5rem',
  },
  optionButton: (isDarkMode) => ({
    padding: '0.75rem',
    backgroundColor: isDarkMode ? '#374151' : '#F3F4F6',
    color: isDarkMode ? '#F3F4F6' : '#1F2937',
    border: 'none',
    borderRadius: '0.75rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'transform 0.2s ease',
    ':hover': {
      transform: 'scale(1.02)'
    }
  }),
  followUpButton: (isDarkMode) => ({
    padding: '0.5rem 1rem',
    backgroundColor: 'transparent',
    color: isDarkMode ? '#3B82F6' : '#2563EB',
    border: `1px solid ${isDarkMode ? '#3B82F6' : '#2563EB'}`,
    borderRadius: '1rem',
    cursor: 'pointer',
    fontSize: '0.9rem',
    transition: 'all 0.2s ease',
    ':hover': {
      backgroundColor: isDarkMode ? '#3B82F6' : '#2563EB',
      color: 'white'
    }
  }),
  messageWrapper: {
    display: 'flex',
    gap: '8px',
    marginBottom: '1rem',
    alignItems: 'flex-start'
  },
  avatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    fontSize: '14px'
  },
  userAvatar: (isDarkMode) => ({
    backgroundColor: isDarkMode ? '#4299e1' : '#3182ce',
    color: 'white'
  }),
  botAvatar: (isDarkMode) => ({
    backgroundColor: isDarkMode ? '#374151' : '#E5E7EB',
    color: isDarkMode ? '#E5E7EB' : '#374151'
  }),
  messageContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  typingIndicator: {
    display: 'flex',
    gap: '4px',
    padding: '8px',
    alignItems: 'center'
  },
  typingDot: (isDarkMode) => ({
    width: '8px',
    height: '8px',
    backgroundColor: isDarkMode ? '#4299e1' : '#3182ce',
    borderRadius: '50%',
    animation: 'typingAnimation 1.4s infinite ease-in-out',
  })
};

export default HealthAssistant; 