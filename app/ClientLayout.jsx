'use client'
import Header from "../components/header/Header";
import { ThemeProvider } from "../hooks/useTheme";
import { usePageTransition } from "../hooks/usePageTransition";
import Preloader from "../components/preloader/Preloader";
import PageTransition from "../components/transition/PageTransition";
import { AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function ClientLayout({ children }) {
  const { showPageNamePreloader, targetPageName } = usePageTransition();
  const [showInitialPreloader, setShowInitialPreloader] = useState(true);

  // Show initial preloader on first load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInitialPreloader(false);
    }, 2000); // Show for 2 seconds on initial load

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <div style={{ 
        minHeight: '100vh',
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-primary)',
        transition: 'background-color 0.3s ease, color 0.3s ease'
      }}>
        {/* Full Page Refresh Preloader */}
        <AnimatePresence mode="wait">
          {showInitialPreloader && <Preloader key="initial-preloader" />}
        </AnimatePresence>

        {/* Main Content */}
        {!showInitialPreloader && (
          <>
            <Header />
            <div style={{ paddingTop: '80px' }}>
              {children}
            </div>
          </>
        )}
        
        {/* Page Name Preloader for internal navigation */}
        <AnimatePresence mode="wait">
          {showPageNamePreloader && (
            <PageTransition 
              key="page-transition" 
              pageName={targetPageName} 
            />
          )}
        </AnimatePresence>
      </div>
    </ThemeProvider>
  );
}