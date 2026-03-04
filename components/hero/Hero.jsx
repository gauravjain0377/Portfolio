"use client";
import Image from "next/image";
import Link from "next/link";
import Style from "./heroStyle.module.scss";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const TECH_TAGS = ["React", "Next.js", "Node.js", "AI", "Gen AI"];

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => { setIsMounted(true); }, []);

  const containerVar = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.03 },
    },
  };

  const itemVar = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1, y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const imageVar = {
    hidden: { opacity: 0, scale: 0.96 },
    visible: {
      opacity: 1, scale: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 },
    },
  };

  return (
    <motion.section
      className={Style.heroSection}
      initial="hidden"
      animate={isMounted ? "visible" : "hidden"}
      variants={containerVar}
    >
      {/* Top bar */}
      <motion.div className={Style.topBar} variants={itemVar}>
        <div className={Style.statusBadge}>
          <span className={Style.statusDot} />
          Available for work
        </div>
        <div className={Style.topBarRight}>
          <span className={Style.topPill}>MERN Stack</span>
          <span className={Style.yearLabel}>© 2026</span>
        </div>
      </motion.div>

      {/* Bento grid layout */}
      <div className={Style.bentoGrid}>
        {/* ── Left column: text ── */}
        <div className={Style.bentoText}>
          <motion.h1 className={Style.heroName} variants={itemVar}>
            <span className={Style.nameRow1}>Gaurav</span>
            <span className={Style.nameRow2}>Jain</span>
          </motion.h1>

          <motion.div className={Style.roleRow} variants={itemVar}>
            <span className={Style.roleLine} />
            <span className={Style.roleText}>Full–Stack Developer</span>
          </motion.div>

          <motion.p className={Style.heroDesc} variants={itemVar}>
            Building modern web experiences that bridge design and
            engineering — React, Next.js, AI integrations.
          </motion.p>

          <motion.div className={Style.statsRow} variants={itemVar}>
            <div className={Style.statCard}>
              <span className={Style.statNum}>6+</span>
              <span className={Style.statLabel}>Projects</span>
            </div>
            <span className={Style.statDivider} />
            <div className={Style.statCard}>
              <span className={Style.statNum}>∞</span>
              <span className={Style.statLabel}>Commits</span>
            </div>
          </motion.div>

          <motion.div className={Style.ctaRow} variants={itemVar}>
            <Link
              href="https://drive.google.com/file/d/1-gWVeqZ3QND-XvHS_2yLqmSVS1vZySO_/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className={Style.resumeBtn}
            >
              View Resume
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 13L13 3M13 3H6M13 3V10" stroke="currentColor"
                  strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <a href="#projects" className={Style.seeWorkBtn}>
              See Projects
            </a>
          </motion.div>
        </div>

        {/* ── Right column: image ── */}
        <motion.div className={Style.bentoImage} variants={imageVar}>
          <div className={Style.imageGlow} aria-hidden="true" />
          <div className={Style.imageFrame}>
            <Image
              src="/images/Gaurav_Hero.png"
              alt="Gaurav Jain — Full-Stack Developer"
              fill
              priority
              quality={90}
              sizes="(max-width: 768px) 72vw, 38vw"
              className={Style.heroImage}
            />
            <div className={Style.imageOverlay} aria-hidden="true" />
            <span className={Style.bracketTL} aria-hidden="true" />
            <span className={Style.bracketBR} aria-hidden="true" />
          </div>
        </motion.div>
      </div>

      {/* Tech tags — inline row, never clipped on mobile */}
      <motion.div className={Style.techStrip} variants={itemVar}>
        {TECH_TAGS.map((label, i) => (
          <motion.span
            key={label}
            className={Style.techPill}
            initial={{ opacity: 0 }}
            animate={isMounted ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.06 }}
          >
            {label}
          </motion.span>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default Hero;
