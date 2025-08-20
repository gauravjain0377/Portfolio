"use client";
import { motion } from "framer-motion";
import styles from "./PageTransition.module.scss";

const PageTransitionUltra = ({ pageName }) => {
  const initialPath = `M0 0 L0 ${window.innerHeight} Q0 ${window.innerHeight / 2} 0 0`;
  const targetPath = `M0 0 L0 ${window.innerHeight} Q${window.innerWidth} ${window.innerHeight / 2} 0 0`;

  // Ultra-fast path animation with minimal performance impact
  const pathAnimation = {
    initial: {
      d: initialPath,
    },
    enter: {
      d: targetPath,
      transition: { 
        duration: 0.3, // Even faster
        ease: [0.25, 0.46, 0.45, 0.94]
      },
    },
    exit: {
      d: initialPath,
      transition: { 
        duration: 0.3, // Even faster
        ease: [0.25, 0.46, 0.45, 0.94]
      },
    },
  };

  // Instant content animation for immediate visibility
  const contentAnimation = {
    initial: { 
      opacity: 0, 
      scale: 0.98,
      y: 2
    },
    animate: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        duration: 0.1, // Ultra-fast content appearance
        delay: 0.005, // Minimal delay for immediate feedback
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.98,
      y: -2,
      transition: {
        duration: 0.08, // Instant exit
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
        duration: 0.3, // Ultra-fast slide animation
        ease: [0.25, 0.46, 0.45, 0.94]
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
            scale: [1, 1.02, 1], // Very subtle animation
            rotate: [0, 0.3, -0.3, 0] // Minimal rotation
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        ></motion.div>
        <motion.h1 
          className={styles.pageTitle}
          animate={{
            textShadow: [
              "0 0 0px rgba(255,255,255,0)",
              "0 0 4px rgba(255,255,255,0.2)", // Minimal glow for readability
              "0 0 0px rgba(255,255,255,0)"
            ]
          }}
          transition={{
            duration: 0.6,
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
