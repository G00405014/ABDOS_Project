import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Initialize theme based on system preference or saved preference
  useEffect(() => {
    // Only run on client-side
    if (typeof window !== 'undefined') {
      // Check if there's a saved theme preference in localStorage
      const savedTheme = localStorage.getItem('theme');
      
      if (savedTheme) {
        // Use the saved theme preference
        setIsDarkMode(savedTheme === 'dark');
      } else {
        // Check if user's system prefers dark mode
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDarkMode(prefersDark);
      }
      
      setMounted(true);
    }
  }, []);

  // Update the document attributes and localStorage when theme changes
  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;
    
    // Save theme preference to localStorage
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    
    // Apply theme to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.setAttribute('data-theme', 'light');
    }
  }, [isDarkMode, mounted]);

  // Toggle between light and dark mode
  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  // If not mounted yet, return null to prevent hydration issues
  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 