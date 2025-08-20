"use client";
import { motion } from "framer-motion";
import styles from "./PageTransition.module.scss";

const PageTransitionUltra = ({ pageName }) => {
  const initialPath = `M0 0 L0 ${window.innerHeight} Q0 ${window.innerHeight / 2} 0 0`;
  const targetPath = `M0 0 L0 ${window.innerHeight} Q${window.innerWidth} ${window.innerHeight / 2} 0 0`;

  // Ultra-fast path animation
  const pathAnimation = {
    initial: {
      d: initialPath,
    },
    enter: {
      d: targetPath,
      transition: { 
        duration: 0.35, // Ultra-fast
        ease: [0.25, 0.46, 0.45, 0.94] // Smooth easing
      },
    },
    exit: {
      d: initialPath,
      transition: { 
        duration: 0.35, // Ultra-fast
        ease: [0.25, 0.46, 0.45, 0.94] // Smooth easing
      },
    },
  };

  // Instant content animation for immediate visibility
  const contentAnimation = {
    initial: { 
      opacity: 0, 
      scale: 0.99,
      y: 3
    },
    animate: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        duration: 0.15, // Instant content appearance
        delay: 0.01, // Minimal delay for immediate feedback
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.99,
      y: -3,
      transition: {
        duration: 0.1, // Instant exit
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <motion.div
      className={styles.pageTransition}
      initial={{ y: "100vh" }}
      animate={{ y: 0 }}
      exit={{ y: "-100vh" }}
      transition={{ 
        duration: 0.35, // Ultra-fast slide animation
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
            scale: [1, 1.03, 1], // Very subtle animation
            rotate: [0, 0.5, -0.5, 0] // Minimal rotation
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        ></motion.div>
        <motion.h1 
          className={styles.pageTitle}
          animate={{
            textShadow: [
              "0 0 0px rgba(255,255,255,0)",
              "0 0 6px rgba(255,255,255,0.25)", // Minimal glow for readability
              "0 0 0px rgba(255,255,255,0)"
            ]
          }}
          transition={{
            duration: 0.8,
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

export default PageTransitionUltra;
