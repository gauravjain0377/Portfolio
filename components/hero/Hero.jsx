"use client";
import Image from "next/image";
import Style from "./heroStyle.module.scss";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Hero = () => {
  const firstText = useRef(null);
  const seconfText = useRef(null);
  const slider = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  let xPercent = 0;
  let direction = 1;
  let animationId = null;

  useEffect(() => {
    // Check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Only run animations if elements exist and we're not on mobile
    if (!firstText.current || !seconfText.current || !slider.current || isMobile) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    animationId = requestAnimationFrame(animtion);

    // scrolling adjusment for the slider
    const scrollTrigger = gsap.to(slider.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        start: 0,
        end: window.innerHeight,
        scrub: 0.25,
        onUpdate: (e) => {
          direction = e.direction * -1;
        },
      },
      x: "-300px",
    });

    // Cleanup function
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      if (scrollTrigger && scrollTrigger.scrollTrigger) {
        scrollTrigger.scrollTrigger.kill();
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  const animtion = () => {
    // Check if elements exist before animating
    if (!firstText.current || !seconfText.current || isMobile) {
      return;
    }

    if (xPercent <= -100) {
      xPercent = 0;
    }
    if (xPercent > 0) {
      xPercent = -100;
    }
    gsap.set(firstText.current, { xPercent: xPercent });
    gsap.set(seconfText.current, { xPercent: xPercent });
    xPercent += 0.15 * direction; // Increased speed from 0.1 to 0.15
    animationId = requestAnimationFrame(animtion);
  };

  return (
    <main className={Style.mainHero}>
      <Image src={"/images/Gaurav_Jain.png"} fill={true} alt="heroBackground" priority sizes="100vw" />
      <div className={Style.slideContainer}>
        <div ref={slider} className={Style.slider}>
          <p ref={firstText}>Gaurav Jain -</p>
          <p ref={seconfText}>Gaurav Jain -</p>
        </div>
      </div>

      <div data-scroll data-scroll-speed={0.1} className={`${Style.description}`}>
        <svg
          width="9"
          height="9"
          viewBox="0 0 9 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z"
          />
        </svg>
        <p>Software Engineer</p>
      </div>
    </main>
  );
};

export default Hero;
