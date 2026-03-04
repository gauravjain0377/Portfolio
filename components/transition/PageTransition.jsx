"use client";
import { motion } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";
import styles from "./PageTransition.module.scss";

const PageTransition = ({ pageName }) => {
  const { theme } = useTheme();

  return (
    <motion.div
      className={`${styles.pageTransition} ${theme === "dark" ? styles.pageTransitionDark : ""}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
    >
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      >
        <div className={styles.bullet} />
        <h1 className={styles.pageTitle}>{pageName}</h1>
      </motion.div>
    </motion.div>
  );
};

export default PageTransition;
