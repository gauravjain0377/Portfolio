"use client";
import Image from "next/image";
import Link from "next/link";
import Style from "./heroStyle.module.scss";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Subtle parallax effect without fade/blur
  const yTransform = useTransform(scrollYProgress, [0, 1], [0, -50]);
  // Keep opacity at 1 - no fade effect
  const opacityTransform = useTransform(scrollYProgress, [0, 1], [1, 1]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9, x: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.3
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.section
      ref={containerRef}
      className={Style.heroSection}
      initial="hidden"
      animate={isMounted ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* Animated Background Shapes */}
      <div className={Style.backgroundShapes}>
        <motion.div
          className={Style.shape1}
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className={Style.shape2}
          animate={{
            x: [0, -80, 0],
            y: [0, -60, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className={Style.shape3}
          animate={{
            x: [0, 60, 0],
            y: [0, -40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Gradient Overlay */}
      <div className={Style.gradientOverlay} />

      {/* Main Content Container */}
      <div className={Style.contentContainer}>
        {/* Left Side - Text Content */}
        <motion.div
          className={Style.textContent}
          variants={itemVariants}
        >
          {/* Greeting */}
          <motion.div
            className={Style.greeting}
            variants={itemVariants}
          >
            <span className={Style.greetingText}>Hello, I'm</span>
          </motion.div>

          {/* Name */}
          <motion.h1
            className={Style.name}
            variants={itemVariants}
          >
            <span className={Style.nameFirst}>Gaurav</span>
            <span className={Style.nameLast}>Jain</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className={Style.tagline}
            variants={itemVariants}
          >
            Software Engineer
          </motion.p>

          {/* Description */}
          <motion.p
            className={Style.description}
            variants={itemVariants}
          >
            Crafting digital experiences with code, creativity, and passion.
            Building the future, one line at a time.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            className={Style.ctaContainer}
            variants={itemVariants}
          >
            <Link
              href="https://drive.google.com/drive/folders/1jIlbyyBJrInaqRJocRYvEdubgNcZYn42?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open resume in a new tab"
              className={Style.resumeButton}
            >
              <span>View Resume</span>
              <motion.svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={Style.buttonIcon}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.3 }}
              >
                <path
                  d="M7.5 15L12.5 10L7.5 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Side - Image */}
        <motion.div
          className={Style.imageWrapper}
          variants={imageVariants}
          style={{ y: yTransform }}
        >
          <motion.div
            className={Style.imageContainer}
            variants={floatingVariants}
            animate="animate"
          >
            <div className={Style.imageGlow} />
            <Image
              src="/images/Gaurav_Hero.png"
              alt="Gaurav Jain - Software Engineer"
              priority
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
              className={Style.heroImage}
              quality={90}
              loading="eager"
              onError={(e) => {
                console.error('Failed to load hero image on gauravjain.tech');
                // Don't hide, show placeholder or retry
                const img = e.target;
                if (img && img.src) {
                  // Retry loading with a different approach
                  setTimeout(() => {
                    img.src = img.src.split('?')[0] + '?t=' + Date.now();
                  }, 100);
                }
              }}
              onLoad={() => {
                console.log('Hero image loaded successfully on gauravjain.tech');
              }}
            />
            <div className={Style.imageBorder} />
          </motion.div>

          {/* Decorative Elements around Image */}
          <div className={Style.decorativeElements}>
            <motion.div
              className={Style.decorativeDot1}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className={Style.decorativeDot2}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            />
            <motion.div
              className={Style.decorativeDot3}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className={Style.scrollIndicator}
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className={Style.scrollLine} />
      </motion.div>
    </motion.section>
  );
};

export default Hero;
