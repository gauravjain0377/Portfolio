"use client";
import Works from "@/components/works/Works";
import Contact from "@/components/contact/Contact";
import styles from "./page.module.scss";

const WorkPage = () => {
  return (
    <main className={styles.main}>
      <Works />
      <div style={{ height: '200px' }}></div> {/* Spacer to ensure separation */}
      <Contact />
    </main>
  );
};

export default WorkPage; 