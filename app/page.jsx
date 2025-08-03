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
import { usePathname } from "next/navigation";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  useEffect( () => {
    // Check if this is a fresh page load (not navigation from another page)
    // Only show preloader if there's no referrer (direct page load)
    const isDirectLoad = !document.referrer;
    
    if (isDirectLoad) {
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
      // The page transition will handle the navigation effect
      document.body.style.cursor = 'default'
      setIsLoading(false);
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
