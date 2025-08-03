"use client";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export const usePageTransition = () => {
  const [showTransition, setShowTransition] = useState(false);
  const [pageName, setPageName] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const pathname = usePathname();
  const previousPathRef = useRef("");
  const isInitialLoadRef = useRef(true);
  const [shouldBlockContent, setShouldBlockContent] = useState(false);

  // Map pathnames to display names
  const getPageName = (path) => {
    switch (path) {
      case "/":
        return "Home";
      case "/about":
        return "About";
      case "/work":
        return "Work";
      case "/contact":
        return "Contact";
      default:
        return "Page";
    }
  };

  useEffect(() => {
    // Handle the very first load of the application
    if (isInitialLoadRef.current) {
      previousPathRef.current = pathname;
      isInitialLoadRef.current = false;
      return;
    }

    // Only show transition if navigating to a different path
    if (pathname && previousPathRef.current !== pathname) {
      // Immediately block content and show transition
      setShouldBlockContent(true);
      setIsTransitioning(true);
      setShowTransition(true);
      setPageName(getPageName(pathname));

      // Enhanced timing for Home page
      const isHomePage = getPageName(pathname) === "Home";
      const transitionDuration = isHomePage ? 1000 : 800; // Slightly longer for Home, but not too long
      
      // Wait for transition to complete before showing new page content
      const timer = setTimeout(() => {
        setShowTransition(false);
        
        // Keep isTransitioning true for a bit longer to ensure smooth transition
        setTimeout(() => {
          setIsTransitioning(false);
          setShouldBlockContent(false);
        }, 100); // Small delay to ensure transition exit animation completes
      }, transitionDuration);

      // Update previous path after the transition has been initiated
      previousPathRef.current = pathname; 

      return () => {
        clearTimeout(timer);
      };
    }
  }, [pathname]);

  return { showTransition, pageName, isTransitioning, shouldBlockContent };
}; 