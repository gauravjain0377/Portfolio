"use client";
import { usePageTransition } from "../../hooks/usePageTransition";
import PageTransition from "./PageTransitionRounded";
import { AnimatePresence } from "framer-motion";

const PageTransitionWrapper = () => {
  const { showTransition, pageName } = usePageTransition();

  return (
    <AnimatePresence mode="wait">
      {showTransition && (
        <PageTransition key={pageName} pageName={pageName} />
      )}
    </AnimatePresence>
  );
};

export default PageTransitionWrapper; 