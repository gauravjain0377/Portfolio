"use client";
import { motion } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";
import styles from "./PageTransition.module.scss";

const PageTransitionOcean = ({ pageName }) => {
  const { theme } = useTheme();
  
  // Create dynamic ocean wave paths with multiple wave layers
  const createOceanWavePath = (progress, isEnter) => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    if (isEnter) {
      // Ocean wave animation from bottom to top with multiple wave layers
      const waveHeight = height * (1 - progress);
      const wave1 = Math.sin(progress * Math.PI * 2) * 60;
      const wave2 = Math.sin(progress * Math.PI * 3 + progress * Math.PI) * 40;
      const wave3 = Math.sin(progress * Math.PI * 4 + progress * Math.PI * 2) * 25;
      
      return `M0 ${height} 
              C${width * 0.15} ${height - wave1} ${width * 0.3} ${height - wave2} ${width * 0.45} ${waveHeight}
              C${width * 0.55} ${waveHeight + wave3} ${width * 0.7} ${waveHeight + wave2} ${width * 0.85} ${waveHeight + wave1}
              C${width * 0.95} ${waveHeight + wave2} ${width} ${waveHeight + wave3} ${width} ${waveHeight}
              L${width} ${height} Z`;
    } else {
      // Exit ocean wave animation
      const waveHeight = height * progress;
      const wave1 = Math.sin((1 - progress) * Math.PI * 2) * 50;
      const wave2 = Math.sin((1 - progress) * Math.PI * 3 + (1 - progress) * Math.PI) * 35;
      const wave3 = Math.sin((1 - progress) * Math.PI * 4 + (1 - progress) * Math.PI * 2) * 20;
      
      return `M0 0 
              C${width * 0.15} ${wave1} ${width * 0.3} ${wave2} ${width * 0.45} ${waveHeight}
              C${width * 0.55} ${waveHeight - wave3} ${width * 0.7} ${waveHeight - wave2} ${width * 0.85} ${waveHeight - wave1}
              C${width * 0.95} ${waveHeight - wave2} ${width} ${waveHeight - wave3} ${width} ${waveHeight}
              L${width} 0 Z`;
    }
  };

  const initialPath = `M0 ${window.innerHeight} L${window.innerWidth} ${window.innerHeight} L${window.innerWidth} ${window.innerHeight} L0 ${window.innerHeight} Z`;
  const targetPath = `M0 0 L${window.innerWidth} 0 L${window.innerWidth} 0 L0 0 Z`;

  // Ocean wave path animation with smooth curved easing
  const oceanWaveAnimation = {
    initial: {
      d: initialPath,
      opacity: 0.9,
    },
    enter: {
      d: targetPath,
      opacity: 1,
      transition: { 
        duration: 1.4, // Smooth ocean wave animation
        ease: [0.76, 0, 0.24, 1] // Smooth cubic-bezier easing
      },
    },
    exit: {
      d: initialPath,
      opacity: 0.8,
      transition: { 
        duration: 1.0, // Smooth exit
        ease: [0.25, 0.46, 0.45, 0.94] // Elegant exit easing
      },
    },
  };

  // Enhanced content animation with improved text visibility and timing
  const contentAnimation = {
    initial: { 
      opacity: 0, 
      scale: 0.9,
      y: 25,
      filter: "blur(0px)", // No blur for perfect readability
      rotateX: -5
    },
    animate: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      filter: "blur(0px)", // Maintain perfect clarity
      rotateX: 0,
      transition: {
        duration: 0.6, // Faster appearance for immediate readability
        delay: 0.2, // Reduced delay so text appears sooner
        ease: [0.25, 0.46, 0.45, 0.94] // Smooth easing
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.95,
      y: -20,
      filter: "blur(0px)", // No blur during exit
      rotateX: 5,
      transition: {
        duration: 0.4, // Faster exit to maintain text visibility
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  // Enhanced bullet animation with better timing for text visibility
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
        duration: 0.5,
        delay: 0.3, // Reduced delay for better text visibility
        ease: [0.34, 1.56, 0.64, 1] // Elastic entrance
      }
    },
    exit: { 
      scale: 0, 
      rotate: 180,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  // Enhanced title animation with perfect text clarity and improved timing
  const titleAnimation = {
    initial: { 
      opacity: 0, 
      y: 30,
      filter: "blur(0px)", // No blur for perfect readability
      scale: 0.95,
      letterSpacing: "0.12em"
    },
    animate: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)", // Maintain perfect clarity
      scale: 1,
      letterSpacing: "0.05em",
      transition: {
        duration: 0.7,
        delay: 0.4, // Reduced delay for better text visibility during transition
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: { 
      opacity: 0,
      y: -25,
      filter: "blur(0px)", // No blur during exit
      scale: 0.98,
      letterSpacing: "0.1em",
      transition: {
        duration: 0.4, // Faster exit to maintain text visibility
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  // Ocean background animation with wave effects
  const oceanBackgroundAnimation = {
    initial: { 
      scale: 1.08, 
      opacity: 0.92,
      filter: "brightness(0.85) saturate(0.9)"
    },
    animate: { 
      scale: 1, 
      opacity: 1,
      filter: "brightness(1) saturate(1)",
      transition: {
        duration: 1.6,
        ease: [0.76, 0, 0.24, 1] // Smooth ocean wave easing
      }
    },
    exit: { 
      scale: 0.97, 
      opacity: 0.88,
      filter: "brightness(0.9) saturate(0.95)",
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  // Additional wave layer for enhanced ocean effect
  const waveLayerAnimation = {
    initial: { 
      opacity: 0,
      scale: 0.8,
      y: 50
    },
    animate: { 
      opacity: 0.3,
      scale: 1,
      y: 0,
      transition: {
        duration: 1.8,
        delay: 0.2,
        ease: [0.76, 0, 0.24, 1]
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.9,
      y: -30,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <motion.div
      className={`${styles.pageTransition} ${theme === 'dark' ? styles.pageTransitionDark : ''}`}
      initial={{ y: "100vh", scale: 0.95, opacity: 0 }}
      animate={{ y: 0, scale: 1, opacity: 1 }}
      exit={{ y: "-100vh", scale: 1.03, opacity: 0 }}
      transition={{ 
        duration: 1.4, // Smooth ocean wave slide animation
        ease: [0.76, 0, 0.24, 1] // Smooth cubic-bezier easing
      }}
      data-ocean="true"
    >
      {/* Ocean background overlay */}
      <motion.div
        className={styles.backgroundOverlay}
        variants={oceanBackgroundAnimation}
        initial="initial"
        animate="animate"
        exit="exit"
      />
      
      {/* Additional wave layer for ocean depth */}
      <motion.div
        className={styles.waveLayer}
        variants={waveLayerAnimation}
        initial="initial"
        animate="animate"
        exit="exit"
      />
      
      {/* Ocean wave SVG path */}
      <svg className={styles.svgCurve} viewBox={`0 0 ${window.innerWidth} ${window.innerHeight}`}>
        <motion.path
          variants={oceanWaveAnimation}
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

export default PageTransitionOcean;
