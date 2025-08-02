"use client";
import About from "@/components/about/About";
import Contact from "@/components/contact/Contact";
import styles from "./page.module.scss";

const AboutPage = () => {
  return (
    <main className={styles.main}>
      <About />
      <div style={{ height: '200px' }}></div> {/* Spacer to ensure separation */}
      <Contact />
    </main>
  );
};

export default AboutPage; 