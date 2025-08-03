'use client'
import Header from "@/components/header/Header";
import PageTransitionWrapper from "@/components/transition/PageTransitionWrapper";
import PageContentWrapper from "@/components/transition/PageContentWrapper";
import { ThemeProvider } from "@/hooks/useTheme";
import { useEffect, useState } from "react";
import Preloader from "@/components/preloader/Preloader";
import { AnimatePresence } from "framer-motion";

export default function ClientLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Show preloader for 2 seconds on initial load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>
      <PageTransitionWrapper />
      <Header/>
      <PageContentWrapper>
        {children}
      </PageContentWrapper>
    </ThemeProvider>
  );
} 