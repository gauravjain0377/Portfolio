"use client";
import { usePageTransition } from "../../hooks/usePageTransition";
import { motion, AnimatePresence } from "framer-motion";

const PageContentWrapper = ({ children }) => {
  const { isTransitioning, showTransition, shouldBlockContent } = usePageTransition();

  console.log('📄 PageContentWrapper render - state:', { isTransitioning, showTransition, shouldBlockContent });

  // Hide content during both transitioning and showing transition to prevent flash
  if (isTransitioning || showTransition || shouldBlockContent) {
    console.log('🚫 Hiding page content during transition');
    console.log('   - isTransitioning:', isTransitioning);
    console.log('   - showTransition:', showTransition);
    console.log('   - shouldBlockContent:', shouldBlockContent);
    return null;
  }

  console.log('✅ Showing page content');
  console.log('   - isTransitioning:', isTransitioning);
  console.log('   - showTransition:', showTransition);
  console.log('   - shouldBlockContent:', shouldBlockContent);

  return (
    <motion.div
      key="page-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ 
        duration: 0.3,
        ease: [0.76, 0, 0.24, 1]
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageContentWrapper; 