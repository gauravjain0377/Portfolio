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

  const pathAnimation = {
    initial: {
      d: initialPath,
    },
    enter: {
      d: targetPath,
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: initialPath,
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
    },
  };

  return (
    <motion.div
      className={styles.pageTransition}
      initial={{ y: "100vh" }}
      animate={{ y: 0 }}
      exit={{ y: "-100vh" }}
      transition={{ 
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1] // Same smooth curve as navigation
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
      <div className={styles.content}>
        <div className={styles.bullet}></div>
        <h1 className={styles.pageTitle}>{pageName}</h1>
      </div>
    </motion.div>
  );
};

export default PageTransition; 