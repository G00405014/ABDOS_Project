import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const TypewriterText = ({ 
  text, 
  speed = 100, 
  startDelay = 1000, 
  className = '', 
  cursorBlinkSpeed = 530,
  onComplete = () => {}
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    // Reset state when text changes
    setDisplayedText('');
    setCurrentIndex(0);
    setIsComplete(false);
    
    // Wait a bit before starting to type
    const startTimeout = setTimeout(() => {
      // Initialize typing if text exists
      if (text && text.length > 0) {
        const typingInterval = setInterval(() => {
          setCurrentIndex((prevIndex) => {
            if (prevIndex >= text.length) {
              clearInterval(typingInterval);
              setIsComplete(true);
              onComplete();
              return prevIndex;
            }
            return prevIndex + 1;
          });
        }, speed);

        return () => clearInterval(typingInterval);
      }
    }, startDelay);

    return () => clearTimeout(startTimeout);
  }, [text, speed, startDelay, onComplete]);

  // Update displayed text when currentIndex changes
  useEffect(() => {
    setDisplayedText(text.substring(0, currentIndex));
  }, [currentIndex, text]);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      if (isComplete) {
        setCursorVisible((prev) => !prev);
      } else {
        setCursorVisible(true);
      }
    }, cursorBlinkSpeed);

    return () => clearInterval(cursorInterval);
  }, [isComplete, cursorBlinkSpeed]);

  return (
    <div className={`typewriter-container ${className}`}>
      <span className="typewriter-text">{displayedText}</span>
      <span 
        className={`typewriter-cursor ${cursorVisible ? 'visible' : 'hidden'}`}
        style={{ 
          backgroundColor: isDarkMode ? '#38BDF8' : '#0284C7'
        }}
      />
      
      <style jsx>{`
        .typewriter-container {
          display: inline-flex;
          align-items: center;
          position: relative;
          min-height: 1.5em;
        }
        
        .typewriter-text {
          display: inline-block;
          white-space: nowrap;
          overflow: visible;
        }
        
        .typewriter-cursor {
          display: inline-block;
          width: 3px;
          height: 1.2em;
          margin-left: 2px;
          animation: blink 0.7s infinite;
          vertical-align: middle;
          transition: opacity 0.2s;
        }
        
        .typewriter-cursor.hidden {
          opacity: 0;
        }
        
        .typewriter-cursor.visible {
          opacity: 1;
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default TypewriterText; 