"use client";
import { usePageTransition } from "../../hooks/usePageTransition";
import PageTransitionWave from "./PageTransitionWave"; // Use the new wave transition component
import { AnimatePresence } from "framer-motion";

const PageTransitionWrapper = () => {
  const { showTransition, pageName } = usePageTransition();

  return (
    <AnimatePresence mode="wait">
      {showTransition && (
        <PageTransitionWave key={pageName} pageName={pageName} />
      )}
    </AnimatePresence>
  );
};

export default PageTransitionWrapper; 