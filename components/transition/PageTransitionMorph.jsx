"use client";
import { motion } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";
import styles from "./PageTransition.module.scss";

const PageTransitionMorph = ({ pageName }) => {
  const { theme } = useTheme();
  
  // Create smooth curved paths with multiple control points
  const createCurvedPath = (isEnter) => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    if (isEnter) {
      // Smooth curve from left to right with multiple control points
      return `M0 0 
              C0 ${height * 0.2} ${width * 0.3} ${height * 0.3} ${width * 0.5} ${height * 0.5}
              C${width * 0.7} ${height * 0.7} ${width} ${height * 0.8} ${width} ${height}
              L0 ${height} Z`;
    } else {
      // Reverse curve for exit
      return `M0 0 
              C${width * 0.2} ${height * 0.2} ${width * 0.4} ${height * 0.4} ${width * 0.6} ${height * 0.5}
              C${width * 0.8} ${height * 0.6} ${width} ${height * 0.7} ${width} ${height}
              L0 ${height} Z`;
    }
  };

  const initialPath = `M0 0 L0 ${window.innerHeight} Q0 ${window.innerHeight / 2} 0 0`;
  const enterPath = createCurvedPath(true);
  const exitPath = createCurvedPath(false);

  // Morphing path animation with smooth curved easing
  const pathAnimation = {
    initial: {
      d: initialPath,
      opacity: 0.9,
    },
    enter: {
      d: enterPath,
      opacity: 1,
      transition: { 
        duration: 1.0, // Smooth morphing duration
        ease: [0.68, -0.55, 0.265, 1.55] // Smooth morphing easing
      },
    },
    exit: {
      d: exitPath,
      opacity: 0.8,
      transition: { 
        duration: 0.7, // Smooth exit
        ease: [0.25, 0.46, 0.45, 0.94] // Elegant exit easing
      },
    },
  };

  // Morphing content animation with improved text visibility
  const contentAnimation = {
    initial: { 
      opacity: 0, 
      scale: 0.8,
      y: 30,
      rotateX: -20,
      filter: "blur(0px)" // No blur for perfect readability
    },
    animate: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      rotateX: 0,
      filter: "blur(0px)", // Maintain perfect clarity
      transition: {
        duration: 0.7, // Reduced duration for better text visibility
        delay: 0.15, // Reduced delay for immediate text readability
        ease: [0.68, -0.55, 0.265, 1.55] // Smooth morphing easing
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.85,
      y: -20,
      rotateX: 15,
      filter: "blur(0px)", // No blur during exit for text clarity
      transition: {
        duration: 0.4, // Faster exit to maintain text visibility
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  // Morphing bullet animation with smooth scaling and rotation
  const bulletAnimation = {
    initial: { 
      scale: 0, 
      rotate: -180,
      opacity: 0
    },
    animate: { 
      scale: 1, 
      rotate: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        delay: 0.25, // Reduced delay for better text visibility
        ease: [0.68, -0.55, 0.265, 1.55] // Smooth morphing easing
      }
    },
    exit: { 
      scale: 0, 
      rotate: 180,
      opacity: 0,
      transition: {
        duration: 0.3, // Faster exit
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  // Morphing title animation with perfect text clarity and no blur
  const titleAnimation = {
    initial: { 
      opacity: 0, 
      y: 40,
      filter: "blur(0px)", // No blur for perfect readability
      scale: 0.9,
      letterSpacing: "0.15em"
    },
    animate: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)", // Maintain perfect clarity
      scale: 1,
      letterSpacing: "0.05em",
      transition: {
        duration: 0.8,
        delay: 0.35, // Reduced delay for better text visibility during transition
        ease: [0.68, -0.55, 0.265, 1.55] // Smooth morphing easing
      }
    },
    exit: { 
      opacity: 0,
      y: -25,
      filter: "blur(0px)", // No blur during exit for text clarity
      scale: 0.95,
      letterSpacing: "0.1em",
      transition: {
        duration: 0.4, // Faster exit to maintain text visibility
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  // Enhanced morphing background with subtle effects
  const backgroundAnimation = {
    initial: { 
      scale: 1.05, 
      opacity: 0.95,
      filter: "brightness(0.9) saturate(0.9)"
    },
    animate: { 
      scale: 1, 
      opacity: 1,
      filter: "brightness(1) saturate(1)",
      transition: {
        duration: 1.2,
        ease: [0.68, -0.55, 0.265, 1.55] // Smooth morphing easing
      }
    },
    exit: { 
      scale: 0.98, 
      opacity: 0.9,
      filter: "brightness(0.95) saturate(0.95)",
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <motion.div
      className={`${styles.pageTransition} ${theme === 'dark' ? styles.pageTransitionDark : ''}`}
      initial={{ y: "100vh", scale: 0.95, opacity: 0, rotateX: -10 }}
      animate={{ y: 0, scale: 1, opacity: 1, rotateX: 0 }}
      exit={{ y: "-100vh", scale: 1.02, opacity: 0, rotateX: 8 }}
      transition={{ 
        duration: 1.0, // Smooth morphing slide animation
        ease: [0.68, -0.55, 0.265, 1.55] // Smooth morphing easing
      }}
    >
      <motion.div
        className={styles.backgroundOverlay}
        variants={backgroundAnimation}
        initial="initial"
        animate="animate"
        exit="exit"
      />
      
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
          variants={bulletAnimation}
          initial="initial"
          animate="animate"
          exit="exit"
        ></motion.div>
        
        <motion.h1 
          className={styles.pageTitle}
          variants={titleAnimation}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {pageName}
        </motion.h1>
      </motion.div>
    </motion.div>
  );
};

export default PageTransitionMorph;
