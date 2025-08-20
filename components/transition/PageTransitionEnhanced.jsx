"use client";
import { motion } from "framer-motion";
import styles from "./PageTransition.module.scss";

const PageTransitionEnhanced = ({ pageName }) => {
  const initialPath = `M0 0 L0 ${window.innerHeight} Q0 ${window.innerHeight / 2} 0 0`;
  const targetPath = `M0 0 L0 ${window.innerHeight} Q${window.innerWidth} ${window.innerHeight / 2} 0 0`;

  // Enhanced path animation with smooth curved easing
  const pathAnimation = {
    initial: {
      d: initialPath,
    },
    enter: {
      d: targetPath,
      transition: { 
        duration: 0.8, // Longer duration for smooth curve animation
        ease: [0.76, 0, 0.24, 1] // Smooth cubic-bezier easing
      },
    },
    exit: {
      d: initialPath,
      transition: { 
        duration: 0.6, // Slightly faster exit
        ease: [0.25, 0.46, 0.45, 0.94] // Smooth exit easing
      },
    },
  };

  // Enhanced content animation with improved text visibility and timing
  const contentAnimation = {
    initial: { 
      opacity: 0, 
      scale: 0.8,
      y: 20,
      rotateX: -15
    },
    animate: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.5, // Faster appearance for better text visibility
        delay: 0.1, // Reduced delay for immediate text readability
        ease: [0.25, 0.46, 0.45, 0.94] // Smooth easing
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.9,
      y: -15,
      rotateX: 15,
      transition: {
        duration: 0.3, // Faster exit to maintain text visibility
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  // Enhanced bullet animation with better timing for text visibility
  const bulletAnimation = {
    initial: { scale: 0, rotate: -180 },
    animate: { 
      scale: 1, 
      rotate: 0,
      transition: {
        duration: 0.4,
        delay: 0.2, // Reduced delay for better text visibility
        ease: [0.34, 1.56, 0.64, 1] // Bouncy entrance
      }
    },
    exit: { 
      scale: 0, 
      rotate: 180,
      transition: {
        duration: 0.25, // Faster exit
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  // Enhanced title animation with perfect text clarity and no blur
  const titleAnimation = {
    initial: { 
      opacity: 0, 
      y: 30,
      filter: "blur(0px)" // No blur for perfect readability
    },
    animate: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)", // Maintain perfect clarity
      transition: {
        duration: 0.6,
        delay: 0.3, // Reduced delay for better text visibility during transition
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: { 
      opacity: 0,
      y: -20,
      filter: "blur(0px)", // No blur during exit for text clarity
      transition: {
        duration: 0.3, // Faster exit to maintain text visibility
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <motion.div
      className={styles.pageTransition}
      initial={{ y: "100vh", scale: 0.8, opacity: 0 }}
      animate={{ y: 0, scale: 1, opacity: 1 }}
      exit={{ y: "-100vh", scale: 1.1, opacity: 0 }}
      transition={{ 
        duration: 0.8, // Smooth slide animation
        ease: [0.76, 0, 0.24, 1] // Smooth cubic-bezier easing
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

export default PageTransitionEnhanced;
