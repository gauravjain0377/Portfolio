'use client'
import { useState, useEffect, createContext, useContext } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark'); // Default to dark mode
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Get theme from localStorage or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      // Update localStorage and document class
      localStorage.setItem('theme', theme);
      document.documentElement.setAttribute('data-theme', theme);
      
      // Update body class for global styling
      if (theme === 'dark') {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
      }
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  const value = {
    theme,
    toggleTheme,
    isDark: theme === 'dark',
    isLight: theme === 'light',
    mounted
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}; 