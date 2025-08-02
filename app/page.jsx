'use client'
import Hero from "@/components/hero/Hero";
import Project from "@/components/project";
import styles from "./page.module.scss";
import { useEffect, useState } from "react";
import Decs from "@/components/descripction/Decs";
import SliderImages from "@/components/sliderImages/SliderImages";
import Contact from "@/components/contact/Contact";
import Preloader from "@/components/preloader/Preloader";
import { AnimatePresence } from "framer-motion";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect( () => {
    // Check if this is a fresh page load (not navigation from another page)
    const isFreshLoad = !document.referrer || document.referrer.includes(window.location.origin);
    
    if (isFreshLoad) {
      setIsLoading(true);
      
      (
        async () => {
            const LocomotiveScroll = (await import('locomotive-scroll')).default
            const locomotiveScroll = new LocomotiveScroll();

            setTimeout( () => {
              setIsLoading(false);
              document.body.style.cursor = 'default'
              window.scrollTo(0,0);
            }, 2000)
        }
      )()
    } else {
      // If user navigated from another page, don't show preloader
      document.body.style.cursor = 'default'
    }
  }, [])

  return (
    <>
      <main className={styles.main}>
        <AnimatePresence mode="wait">
        {
          isLoading && <Preloader/>
        }
        </AnimatePresence>
        <Hero />
        <Decs/>
        <Project />
        <SliderImages/>
        <Contact/>
      </main>
    </>
  );
}
