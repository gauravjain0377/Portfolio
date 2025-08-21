"use client";
import { motion } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";
import styles from "./PageTransition.module.scss";

const PageTransition = ({ pageName }) => {
  const { theme } = useTheme();
  
  // Create perfect 50% round curves on top and bottom
  const radius = 50; // 50% round curve
  const width = window.innerWidth;
  const height = window.innerHeight;
  
  const initialPath = `M0 0 L0 ${height} Q0 ${height / 2} 0 0`;
  const targetPath = `M0 0 L0 ${height} Q${width} ${height / 2} 0 0`;

  // Enhanced animations with faster, smoother timing
  const isHomePage = pageName === "Home";
  
  const pathAnimation = {
    initial: {
      d: initialPath,
    },
    enter: {
      d: targetPath,
      transition: { 
        duration: isHomePage ? 0.6 : 0.4, // Faster animations
        ease: [0.25, 0.46, 0.45, 0.94] // Smooth easing
      },
    },
    exit: {
      d: initialPath,
      transition: { 
        duration: isHomePage ? 0.6 : 0.4, // Faster animations
        ease: [0.25, 0.46, 0.45, 0.94] // Smooth easing
      },
    },
  };

  // Enhanced content animation with improved text visibility
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
        duration: 0.25, // Faster content appearance for better text visibility
        delay: 0.05, // Minimal delay for immediate text readability
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
        duration: isHomePage ? 0.6 : 0.4, // Faster slide animation
        ease: [0.25, 0.46, 0.45, 0.94] // Smooth easing
      }}
    >
      <svg className={styles.svgCurve} viewBox={`0 0 ${width} ${height}`}>
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
          animate={isHomePage ? {
            scale: [1, 1.2, 1],
            rotate: [0, 5, -5, 0]
          } : {
            scale: [1, 1.1, 1] // Subtle animation for other pages
          }}
          transition={isHomePage ? {
            duration: 1.5, // Faster animation
            repeat: Infinity,
            ease: "easeInOut"
          } : {
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        ></motion.div>
        <motion.h1 
          className={styles.pageTitle}
          animate={isHomePage ? {
            textShadow: [
              "var(--transition-text-shadow)",
              "var(--transition-text-shadow-hover)",
              "var(--transition-text-shadow)"
            ]
          } : {}}
          transition={isHomePage ? {
            duration: 1.5, // Faster animation
            repeat: Infinity,
            ease: "easeInOut"
          } : {}}
        >
          {pageName}
        </motion.h1>
      </motion.div>
    </motion.div>
  );
};

export default PageTransition; 