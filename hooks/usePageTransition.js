"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export const usePageTransition = () => {
  const [showTransition, setShowTransition] = useState(false);
  const [pageName, setPageName] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const pathname = usePathname();
  const [hasNavigated, setHasNavigated] = useState(false);

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
    // Check if this is a fresh page load (no referrer)
    const isFreshLoad = !document.referrer;
    
    // Only show transition if we've navigated AND it's not a fresh load
    if (pathname && hasNavigated && !isFreshLoad) {
      // Set transitioning to true immediately to hide page content
      setIsTransitioning(true);
      setShowTransition(true);
      setPageName(getPageName(pathname));
      
      // Hide transition after 0.8 seconds and allow page content to show
      const timer = setTimeout(() => {
        setShowTransition(false);
        // Wait for exit animation to complete before showing page content
        setTimeout(() => {
          setIsTransitioning(false);
        }, 800); // Wait for full exit animation
      }, 800);

      return () => clearTimeout(timer);
    } else if (pathname) {
      // On initial load or fresh load, just set the pathname but don't show transition
      setHasNavigated(true);
    }
  }, [pathname, hasNavigated]);

  // Remove the second useEffect that was causing issues
  // The first useEffect handles all page transitions including home

  return { showTransition, pageName, isTransitioning };
}; 