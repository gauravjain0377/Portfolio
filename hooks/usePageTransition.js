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
    console.log('🔄 PageTransition useEffect triggered');
    console.log('Current Pathname:', pathname);
    console.log('Previous Path Ref:', previousPathRef.current);
    console.log('Is Initial Load Ref:', isInitialLoadRef.current);
    console.log('Current State:', { showTransition, pageName, isTransitioning });

    // Handle the very first load of the application
    if (isInitialLoadRef.current) {
      console.log('📝 Initial load detected. Setting previousPathRef and isInitialLoadRef to false.');
      previousPathRef.current = pathname;
      isInitialLoadRef.current = false;
      return;
    }

    // Only show transition if navigating to a different path
    if (pathname && previousPathRef.current !== pathname) {
      console.log('✅ Navigation detected! Showing transition for:', getPageName(pathname));
      console.log('Transition details:', {
        from: previousPathRef.current,
        to: pathname,
        pageName: getPageName(pathname)
      });

      console.log('🚀 Setting transition states...');
      // Immediately block content and show transition
      setShouldBlockContent(true);
      setIsTransitioning(true);
      setShowTransition(true);
      setPageName(getPageName(pathname));
      console.log('✅ Transition states set:', { isTransitioning: true, showTransition: true, pageName: getPageName(pathname), shouldBlockContent: true });

      // Enhanced timing for Home page
      const isHomePage = getPageName(pathname) === "Home";
      const transitionDuration = isHomePage ? 1200 : 800; // Longer duration for Home
      console.log('⏱️ Transition duration:', transitionDuration, 'ms');
      
      // Wait for transition to complete before showing new page content
      const timer = setTimeout(() => {
        console.log('⏱️ Transition timer finished. Hiding transition and showing new page content.');
        setShowTransition(false);
        console.log('🔄 showTransition set to false');
        
        // Keep isTransitioning true for a bit longer to ensure smooth transition
        setTimeout(() => {
          console.log('🔄 Setting isTransitioning to false and unblocking content');
          setIsTransitioning(false);
          setShouldBlockContent(false);
        }, 100); // Small delay to ensure transition exit animation completes
      }, transitionDuration);

      // Update previous path after the transition has been initiated
      previousPathRef.current = pathname; 
      console.log('📝 Updated previousPathRef to:', pathname);

      return () => {
        console.log('🧹 Cleaning up transition timer.');
        clearTimeout(timer);
      };
    } else {
      console.log('❌ No navigation detected or same path. Not showing transition.');
      console.log('Details:', {
        pathname,
        previousPath: previousPathRef.current,
        isSamePath: pathname === previousPathRef.current
      });
    }
  }, [pathname]);

  return { showTransition, pageName, isTransitioning, shouldBlockContent };
}; 