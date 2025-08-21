"use client";
import { motion } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";
import styles from "./PageTransition.module.scss";

const PageTransition = ({ pageName }) => {
  const { theme } = useTheme();
  
  const initialPath = `M0 0 L0 ${window.innerHeight} Q0 ${window.innerHeight / 2} 0 0`;
  const targetPath = `M0 0 L0 ${window.innerHeight} Q${window.innerWidth} ${window.innerHeight / 2} 0 0`;

  const pathAnimation = {
    initial: {
      d: initialPath,
    },
    enter: {
      d: targetPath,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }, // Faster, smoother
    },
    exit: {
      d: initialPath,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }, // Faster, smoother
    },
  };

  // Enhanced content animation for improved text visibility
  const contentAnimation = {
    initial: { 
      opacity: 0, 
      scale: 0.95,
      y: 10
    },
    animate: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        duration: 0.2, // Very fast content appearance for better text visibility
        delay: 0.02, // Minimal delay for immediate text readability
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.95,
      y: -10,
      transition: {
        duration: 0.15, // Very fast exit to maintain text visibility
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <motion.div
      className={`${styles.pageTransition} ${theme === 'dark' ? styles.pageTransitionDark : ''}`}
      initial={{ y: "100vh" }}
      animate={{ y: 0 }}
      exit={{ y: "-100vh" }}
      transition={{ 
        duration: 0.5, // Faster slide animation
        ease: [0.25, 0.46, 0.45, 0.94] // Smooth easing
      }}
    >
      <svg className={styles.svgCurve} viewBox={`0 0 ${window.innerWidth} ${window.innerHeight}`}>
        <motion.path
          variants={pathAnimation}
          initial="initial"
          animate="enter"
          exit="exit"
        />
      </svg>
      <motion.div 
        className={styles.content}
        variants={contentAnimation}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <motion.div 
          className={styles.bullet}
          animate={{
            scale: [1, 1.1, 1], // Subtle animation
            rotate: [0, 2, -2, 0] // Gentle rotation
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        ></motion.div>
        <motion.h1 
          className={styles.pageTitle}
          animate={{
            textShadow: [
              "var(--transition-text-shadow)",
              "var(--transition-text-shadow-hover)",
              "var(--transition-text-shadow)"
            ]
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {pageName}
        </motion.h1>
      </motion.div>
    </motion.div>
  );
};

export default PageTransition; 