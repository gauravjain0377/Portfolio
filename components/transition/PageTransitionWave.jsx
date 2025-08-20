"use client";
import { motion } from "framer-motion";
import styles from "./PageTransition.module.scss";

const PageTransitionWave = ({ pageName }) => {
  // Create wave-like paths with smooth curves
  const createWavePath = (progress, isEnter) => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    if (isEnter) {
      // Wave animation from bottom to top with curves
      const waveHeight = height * (1 - progress);
      const curve1 = Math.sin(progress * Math.PI * 2) * 50;
      const curve2 = Math.sin(progress * Math.PI * 3) * 30;
      
      return `M0 ${height} 
              C${width * 0.2} ${height - curve1} ${width * 0.4} ${height - curve2} ${width * 0.5} ${waveHeight}
              C${width * 0.6} ${waveHeight + curve2} ${width * 0.8} ${waveHeight + curve1} ${width} ${waveHeight}
              L${width} ${height} Z`;
    } else {
      // Exit wave animation
      const waveHeight = height * progress;
      const curve1 = Math.sin((1 - progress) * Math.PI * 2) * 40;
      const curve2 = Math.sin((1 - progress) * Math.PI * 3) * 25;
      
      return `M0 0 
              C${width * 0.2} ${curve1} ${width * 0.4} ${curve2} ${width * 0.5} ${waveHeight}
              C${width * 0.6} ${waveHeight - curve2} ${width * 0.8} ${waveHeight - curve1} ${width} ${waveHeight}
              L${width} 0 Z`;
    }
  };

  const initialPath = `M0 ${window.innerHeight} L${window.innerWidth} ${window.innerHeight} L${window.innerWidth} ${window.innerHeight} L0 ${window.innerHeight} Z`;
  const targetPath = `M0 0 L${window.innerWidth} 0 L${window.innerWidth} 0 L0 0 Z`;

  // Wave path animation with smooth curved easing
  const wavePathAnimation = {
    initial: {
      d: initialPath,
    },
    enter: {
      d: targetPath,
      transition: { 
        duration: 1.2, // Smooth wave animation
        ease: [0.76, 0, 0.24, 1] // Smooth cubic-bezier easing
      },
    },
    exit: {
      d: initialPath,
      transition: { 
        duration: 0.8, // Smooth exit
        ease: [0.25, 0.46, 0.45, 0.94] // Elegant exit easing
      },
    },
  };

  // Enhanced content animation with improved text visibility and timing
  const contentAnimation = {
    initial: { 
      opacity: 0, 
      scale: 0.9,
      y: 20,
      filter: "blur(0px)" // No blur for perfect readability
    },
    animate: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      filter: "blur(0px)", // Maintain perfect clarity
      transition: {
        duration: 0.5, // Faster appearance for better text visibility
        delay: 0.2, // Reduced delay for immediate text readability
        ease: [0.25, 0.46, 0.45, 0.94] // Smooth easing
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.95,
      y: -15,
      filter: "blur(0px)", // No blur during exit
      transition: {
        duration: 0.3, // Faster exit to maintain text visibility
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  // Enhanced bullet animation with better timing for text visibility
  const bulletAnimation = {
    initial: { 
      scale: 0, 
      rotate: -90,
      opacity: 0
    },
    animate: { 
      scale: 1, 
      rotate: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        delay: 0.3, // Reduced delay for better text visibility
        ease: [0.34, 1.56, 0.64, 1] // Elastic entrance
      }
    },
    exit: { 
      scale: 0, 
      rotate: 90,
      opacity: 0,
      transition: {
        duration: 0.25, // Faster exit
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  // Enhanced title animation with perfect text clarity and improved timing
  const titleAnimation = {
    initial: { 
      opacity: 0, 
      y: 25,
      filter: "blur(0px)", // No blur for perfect readability
      scale: 0.95,
      letterSpacing: "0.1em"
    },
    animate: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)", // Maintain perfect clarity
      scale: 1,
      letterSpacing: "0.05em",
      transition: {
        duration: 0.6,
        delay: 0.4, // Reduced delay for better text visibility during transition
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: { 
      opacity: 0,
      y: -20,
      filter: "blur(0px)", // No blur during exit
      scale: 0.98,
      letterSpacing: "0.08em",
      transition: {
        duration: 0.3, // Faster exit to maintain text visibility
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  // Background wave animation
  const backgroundAnimation = {
    initial: { 
      scale: 1.05, 
      opacity: 0.95,
      filter: "brightness(0.9)"
    },
    animate: { 
      scale: 1, 
      opacity: 1,
      filter: "brightness(1)",
      transition: {
        duration: 1.4,
        ease: [0.76, 0, 0.24, 1] // Smooth wave easing
      }
    },
    exit: { 
      scale: 0.98, 
      opacity: 0.9,
      filter: "brightness(0.95)",
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <motion.div
      className={styles.pageTransition}
      initial={{ y: "100vh", scale: 0.95, opacity: 0 }}
      animate={{ y: 0, scale: 1, opacity: 1 }}
      exit={{ y: "-100vh", scale: 1.02, opacity: 0 }}
      transition={{ 
        duration: 1.2, // Smooth wave slide animation
        ease: [0.76, 0, 0.24, 1] // Smooth cubic-bezier easing
      }}
      data-wave="true"
    >
      {/* Background wave overlay */}
      <motion.div
        className={styles.backgroundOverlay}
        variants={backgroundAnimation}
        initial="initial"
        animate="animate"
        exit="exit"
      />
      
      {/* Wave SVG path */}
      <svg className={styles.svgCurve} viewBox={`0 0 ${window.innerWidth} ${window.innerHeight}`}>
        <motion.path
          variants={wavePathAnimation}
          initial="initial"
          animate="enter"
          exit="exit"
        />
      </svg>
      
      {/* Enhanced content container with improved text visibility */}
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

export default PageTransitionWave;
