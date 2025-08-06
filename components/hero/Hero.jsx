"use client";
import Image from "next/image";
import Style from "./heroStyle.module.scss";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Hero = () => {
  const firstText = useRef(null);
  const secondText = useRef(null);
  const thirdText = useRef(null);
  const fourthText = useRef(null);
  const fifthText = useRef(null);
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

    // Only run animations if elements exist
    if (!firstText.current || !secondText.current || !thirdText.current || !fourthText.current || !fifthText.current || !slider.current) {
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
    if (!firstText.current || !secondText.current || !thirdText.current || !fourthText.current || !fifthText.current) {
      return;
    }

    // Reset position when reaching the end to create seamless loop
    if (xPercent <= -100) {
      xPercent = 0;
    }
    if (xPercent > 0) {
      xPercent = -100;
    }
    
    // Set all text elements to the same position for seamless loop
    gsap.set(firstText.current, { xPercent: xPercent });
    gsap.set(secondText.current, { xPercent: xPercent });
    gsap.set(thirdText.current, { xPercent: xPercent });
    gsap.set(fourthText.current, { xPercent: xPercent });
    gsap.set(fifthText.current, { xPercent: xPercent });
    
    xPercent += 0.15 * direction; // Increased speed from 0.1 to 0.15
    animationId = requestAnimationFrame(animtion);
  };

  return (
    <main className={Style.mainHero}>
      <Image src={"/images/Gaurav_Jain.png"} fill={true} alt="heroBackground" priority sizes="100vw" />
      <div className={Style.slideContainer}>
        <div ref={slider} className={Style.slider}>
          <p ref={firstText}>Gaurav Jain -</p>
          <p ref={secondText}>Gaurav Jain -</p>
          <p ref={thirdText}>Gaurav Jain -</p>
          <p ref={fourthText}>Gaurav Jain -</p>
          <p ref={fifthText}>Gaurav Jain -</p>
        </div>
      </div>

      <div data-scroll data-scroll-speed={0.1} className={`${Style.description}`}>
        <p>Software Engineer</p>
      </div>
    </main>
  );
};

export default Hero;
