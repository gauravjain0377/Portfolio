"use client";
import Image from "next/image";
import Link from "next/link";
import Style from "./heroStyle.module.scss";
import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Roles for typewriter effect ──────────────────────────────────────────────
const ROLES = [
  "AI Enthusiast",
  "Full-Stack Engineer",
  "Open Source Builder",
];

// ─── Code snippets that rotate ────────────────────────────────────────────────
const CODE_SNIPPETS = [
  {
    label: "hero.jsx",
    code: `const Hero = () => {
  const [mounted, set] = useState(false);
  useEffect(() => set(true), []);
  
  return (
    <section className="hero">
      <h1>Gaurav Jain</h1>
      <TypeWriter roles={ROLES} />
      <CTAButtons glow={true} />
    </section>
  );
};`,
  },
  {
    label: "api/chat.js",
    code: `export async function POST(req) {
  const { messages, userMessage } = 
    await req.json();

  const completion = await openai
    .chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: KB },
        ...messages,
      ],
      stream: true,
    });

  return new StreamingResponse(completion);
};`,
  },
  {
    label: "useTheme.js",
    code: `export function useTheme() {
  const [theme, setTheme] = useState('dark');

  const toggle = useCallback(() => {
    const next = theme === 'dark' 
      ? 'light' : 'dark';
    setTheme(next);
    document.documentElement
      .setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  }, [theme]);

  return { theme, toggle };
};`,
  },
];

const TECH_TAGS = ["React", "Next.js", "Node.js", "AI", "Gen AI"];

// ─── Typewriter Component ─────────────────────────────────────────────────────
function TypeWriter({ roles }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout;

    if (!isDeleting && charIndex < currentRole.length) {
      timeout = setTimeout(() => setCharIndex((c) => c + 1), 80);
    } else if (!isDeleting && charIndex === currentRole.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((c) => c - 1), 40);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setRoleIndex((r) => (r + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex, roles]);

  return (
    <span className={Style.typewriterText}>
      {roles[roleIndex].substring(0, charIndex)}
      <span className={Style.typewriterCursor}>|</span>
    </span>
  );
}

// ─── Code Panel Component ─────────────────────────────────────────────────────
function CodePanel() {
  const [snippetIndex, setSnippetIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSnippetIndex((i) => (i + 1) % CODE_SNIPPETS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const snippet = CODE_SNIPPETS[snippetIndex];

  return (
    <motion.div className={Style.codePanel}>
      <div className={Style.codePanelHeader}>
        <div className={Style.codeDots}>
          <span /><span /><span />
        </div>
        <AnimatePresence mode="wait">
          <motion.span
            key={snippet.label}
            className={Style.codeFileName}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2 }}
          >
            {snippet.label}
          </motion.span>
        </AnimatePresence>
      </div>
      <div className={Style.codeBody}>
        <AnimatePresence mode="wait">
          <motion.pre
            key={snippetIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <code>{snippet.code}</code>
          </motion.pre>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── Main Hero Component ──────────────────────────────────────────────────────
const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => { setIsMounted(true); }, []);

  // ── Interactive grid: update CSS vars on mouse move ────────────────────────
  const handleMouseMove = useCallback((e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    heroRef.current.style.setProperty("--mouse-x", `${x}%`);
    heroRef.current.style.setProperty("--mouse-y", `${y}%`);
  }, []);

  const containerVar = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.05 },
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
      ref={heroRef}
      className={Style.heroSection}
      initial="hidden"
      animate={isMounted ? "visible" : "hidden"}
      variants={containerVar}
      onMouseMove={handleMouseMove}
    >
      {/* Interactive grid overlay */}
      <div className={Style.gridOverlay} aria-hidden="true" />
      <div className={Style.mouseGlow} aria-hidden="true" />

      {/* Top bar */}
      <motion.div className={Style.topBar} variants={itemVar}>
        <div className={Style.statusBadge}>
          <span className={Style.statusDot} />
          Available for work
        </div>
      </motion.div>

      {/* Main grid */}
      <div className={Style.bentoGrid}>
        {/* ── Left column: text ── */}
        <div className={Style.bentoText}>
          {/* Headline */}
          <motion.h1 className={Style.heroName} variants={itemVar}>
            <span className={Style.nameRow1}>Gaurav</span>
            <span className={Style.nameRow2}>Jain</span>
          </motion.h1>

          {/* Subtitle with gradient */}
          <motion.p className={Style.heroSubtitle} variants={itemVar}>
            Architecting the Future with Code
          </motion.p>

          {/* Typewriter roles */}
          <motion.div className={Style.roleRow} variants={itemVar}>
            <span className={Style.roleLine} />
            {isMounted && <TypeWriter roles={ROLES} />}
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

          {/* Glowing CTAs */}
          <motion.div className={Style.ctaRow} variants={itemVar}>
            <Link
              href="https://drive.google.com/file/d/1-gWVeqZ3QND-XvHS_2yLqmSVS1vZySO_/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className={Style.explorBtn}
            >
              View Resume
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 13L13 3M13 3H6M13 3V10" stroke="currentColor"
                  strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className={Style.btnGlow} aria-hidden="true" />
            </Link>
            <a href="#projects" className={Style.buildBtn}>
              See Projects
            </a>
          </motion.div>
        </div>

        {/* ── Right column: image + code ── */}
        <div className={Style.bentoRight}>
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

              {/* AI Badge — overlay on image, top-left */}
              <motion.button
                className={Style.aiHeroBadge}
                onClick={() => window.__openAiChat?.()}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isMounted ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.7, duration: 0.4, ease: [.22, 1, .36, 1] }}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
              >
                <span className={Style.aiBadgeDot} />
                Ask my AI
              </motion.button>
            </div>
          </motion.div>

          {/* Live Code Snippet — desktop only */}
          <motion.div
            className={Style.codePanelWrapper}
            variants={itemVar}
          >
            {isMounted && <CodePanel />}
          </motion.div>
        </div>
      </div>

      {/* Tech tags */}
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
