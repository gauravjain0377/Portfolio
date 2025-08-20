"use client";
import { motion } from "framer-motion";
import styles from "./PageTransition.module.scss";

const PageTransitionPremium = ({ pageName }) => {
  const initialPath = `M0 0 L0 ${window.innerHeight} Q0 ${window.innerHeight / 2} 0 0`;
  const targetPath = `M0 0 L0 ${window.innerHeight} Q${window.innerWidth} ${window.innerHeight / 2} 0 0`;

  // Premium path animation with sophisticated curved easing
  const pathAnimation = {
    initial: {
      d: initialPath,
      opacity: 0.8,
    },
    enter: {
      d: targetPath,
      opacity: 1,
      transition: { 
        duration: 1.2, // Premium duration for smooth curve animation
        ease: [0.83, 0, 0.17, 1] // Premium cubic-bezier easing
      },
    },
    exit: {
      d: initialPath,
      opacity: 0.6,
      transition: { 
        duration: 0.8, // Smooth exit
        ease: [0.25, 0.46, 0.45, 0.94] // Elegant exit easing
      },
    },
  };

  // Premium content animation with 3D effects and improved text visibility
  const contentAnimation = {
    initial: { 
      opacity: 0, 
      scale: 0.7,
      y: 40,
      rotateX: -25,
      rotateY: -10,
      filter: "blur(0px)" // No blur for perfect readability
    },
    animate: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      filter: "blur(0px)", // Maintain perfect clarity
      transition: {
        duration: 0.8, // Reduced duration for better text visibility
        delay: 0.2, // Reduced delay for immediate text readability
        ease: [0.25, 0.46, 0.45, 0.94] // Smooth easing
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.8,
      y: -25,
      rotateX: 20,
      rotateY: 8,
      filter: "blur(0px)", // No blur during exit for text clarity
      transition: {
        duration: 0.5, // Faster exit to maintain text visibility
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  // Premium bullet animation with elastic entrance and smooth scaling
  const bulletAnimation = {
    initial: { 
      scale: 0, 
      rotate: -360,
      opacity: 0
    },
    animate: { 
      scale: 1, 
      rotate: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        delay: 0.3, // Reduced delay for better text visibility
        ease: [0.34, 1.56, 0.64, 1] // Elastic entrance
      }
    },
    exit: { 
      scale: 0, 
      rotate: 360,
      opacity: 0,
      transition: {
        duration: 0.3, // Faster exit
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  // Premium title animation with perfect text clarity and no blur
  const titleAnimation = {
    initial: { 
      opacity: 0, 
      y: 50,
      filter: "blur(0px)", // No blur for perfect readability
      scale: 0.9,
      letterSpacing: "0.2em"
    },
    animate: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)", // Maintain perfect clarity
      scale: 1,
      letterSpacing: "0.05em",
      transition: {
        duration: 0.9,
        delay: 0.4, // Reduced delay for better text visibility during transition
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: { 
      opacity: 0,
      y: -30,
      filter: "blur(0px)", // No blur during exit for text clarity
      scale: 0.95,
      letterSpacing: "0.1em",
      transition: {
        duration: 0.4, // Faster exit to maintain text visibility
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  // Enhanced background animation with subtle scaling and opacity
  const backgroundAnimation = {
    initial: { 
      scale: 1.1, 
      opacity: 0.9,
      filter: "brightness(0.8)"
    },
    animate: { 
      scale: 1, 
      opacity: 1,
      filter: "brightness(1)",
      transition: {
        duration: 1.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: { 
      scale: 0.95, 
      opacity: 0.8,
      filter: "brightness(0.9)",
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <motion.div
      className={styles.pageTransition}
      initial={{ y: "100vh", scale: 0.9, opacity: 0, rotateX: -15 }}
      animate={{ y: 0, scale: 1, opacity: 1, rotateX: 0 }}
      exit={{ y: "-100vh", scale: 1.05, opacity: 0, rotateX: 10 }}
      transition={{ 
        duration: 1.2, // Premium slide animation
        ease: [0.83, 0, 0.17, 1] // Premium cubic-bezier easing
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

export default PageTransitionPremium;
