"use client";
import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export const usePageTransition = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(false);
  const [showPageNamePreloader, setShowPageNamePreloader] = useState(false);
  const [targetPageName, setTargetPageName] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const previousPathRef = useRef("");
  const isInitialLoadRef = useRef(true);

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

  // Handle page transitions
  useEffect(() => {
    // Handle the very first load of the application
    if (isInitialLoadRef.current) {
      previousPathRef.current = pathname;
      isInitialLoadRef.current = false;
      return;
    }

    // Only show page name preloader if navigating to a different path
    if (pathname && previousPathRef.current !== pathname) {
      setTargetPageName(getPageName(pathname));
      setShowPageNamePreloader(true);
      setIsLoading(true);
      
      // Hide page name preloader after animation completes
      const timer = setTimeout(() => {
        setShowPageNamePreloader(false);
        setIsLoading(false);
      }, 1200); // Match page transition animation duration
      
      // Update previous path
      previousPathRef.current = pathname;
      
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  const navigateWithPreloader = (href) => {
    const pageName = getPageName(href);
    setTargetPageName(pageName);
    setShowPageNamePreloader(true);
    setIsLoading(true);
    
    // Small delay to show preloader before navigation
    setTimeout(() => {
      router.push(href);
    }, 100);
  };

  return {
    isLoading,
    isPreloaderVisible,
    showPageNamePreloader,
    targetPageName,
    navigateWithPreloader
  };
}; 