"use client";
import { motion } from "framer-motion";
import styles from "./PageTransition.module.scss";

const PageTransition = ({ pageName }) => {
  // Create perfect 50% round curves on top and bottom
  const radius = 50; // 50% round curve
  const width = window.innerWidth;
  const height = window.innerHeight;
  
  const initialPath = `M0 0 L0 ${height} Q0 ${height / 2} 0 0`;
  const targetPath = `M0 0 L0 ${height} Q${width} ${height / 2} 0 0`;

  // Enhanced animations for Home page
  const isHomePage = pageName === "Home";
  
  const pathAnimation = {
    initial: {
      d: initialPath,
    },
    enter: {
      d: targetPath,
      transition: { 
        duration: isHomePage ? 0.8 : 0.5, 
        ease: isHomePage ? [0.25, 0.46, 0.45, 0.94] : [0.76, 0, 0.24, 1] 
      },
    },
    exit: {
      d: initialPath,
      transition: { 
        duration: isHomePage ? 0.8 : 0.5, 
        ease: isHomePage ? [0.25, 0.46, 0.45, 0.94] : [0.76, 0, 0.24, 1] 
      },
    },
  };

  // Enhanced content animation for Home page
  const contentAnimation = {
    initial: { 
      opacity: 0, 
      scale: isHomePage ? 0.8 : 1,
      y: isHomePage ? 20 : 0
    },
    animate: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        duration: isHomePage ? 0.6 : 0.3,
        delay: isHomePage ? 0.2 : 0.1,
        ease: isHomePage ? [0.25, 0.46, 0.45, 0.94] : [0.76, 0, 0.24, 1]
      }
    },
    exit: { 
      opacity: 0,
      scale: isHomePage ? 0.9 : 1,
      y: isHomePage ? -20 : 0,
      transition: {
        duration: isHomePage ? 0.4 : 0.2,
        ease: isHomePage ? [0.25, 0.46, 0.45, 0.94] : [0.76, 0, 0.24, 1]
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
        duration: isHomePage ? 0.8 : 0.5,
        ease: isHomePage ? [0.25, 0.46, 0.45, 0.94] : [0.76, 0, 0.24, 1]
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
          } : {}}
          transition={isHomePage ? {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          } : {}}
        ></motion.div>
        <motion.h1 
          className={styles.pageTitle}
          animate={isHomePage ? {
            textShadow: [
              "0 0 0px rgba(255,255,255,0)",
              "0 0 20px rgba(255,255,255,0.8)",
              "0 0 0px rgba(255,255,255,0)"
            ]
          } : {}}
          transition={isHomePage ? {
            duration: 2,
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