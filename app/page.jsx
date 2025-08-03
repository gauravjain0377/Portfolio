'use client'
import Hero from "@/components/hero/Hero";
import Project from "@/components/project";
import styles from "./page.module.scss";
import Decs from "@/components/descripction/Decs";
import SliderImages from "@/components/sliderImages/SliderImages";
import Contact from "@/components/contact/Contact";

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <Hero />
        <Decs/>
        <Project />
        <SliderImages/>
        <Contact/>
      </main>
    </>
  );
}
