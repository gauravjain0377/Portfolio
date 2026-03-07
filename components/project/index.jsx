"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./style.module.scss";
import Project from "./childProject/Project";
import gsap from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
const index = () => {
  const projects = [
    {
      title: "InboxPilot AI",
      src: "inboxpilotai.png",
      color: "#000000",
      githubUrl: "https://github.com/gauravjain0377/InboxPilot-AI.git",
      liveUrl: "https://inboxpilot-ai.vercel.app/",
      summary: "AI-powered Gmail assistant for smart categorization, summarization, and automated replies.",
      description:
        "It provide an intelligent dashboard that categorizes emails, summarizes lengthy threads, and generates context-aware replies with tone options. Uses Google Gemini API for AI processing and OAuth 2.0 for secure token management.",
      techStack: ["React", "Next.js", "Node.js", "Express", "MongoDB", "Google Gemini"],
      highlights: [
        "Deep Gmail integration: read, compose, reply, archive from dashboard",
        "One-click AI summarization for email threads in under 3 seconds",
        "Smart AI replies with tone selection (formal, friendly, short)",
        "Automated priority categorization (Work, Finance, Meeting, Promotions)",
        "Analytics dashboard for inbox metrics and category breakdowns",
      ],
    },
    {
      title: "StockSathi",
      src: "Stox.png",
      color: "#000000",
      githubUrl: "https://github.com/gauravjain0377/Stox.git",
      liveUrl: "https://stocksathi.vercel.app/",
      summary: "Real-time stock trading and portfolio management platform with live market data.",
      description:
        "Full-stack platform integrating real-time market tracking, portfolio analytics, and simulated trading. Uses batch-quote architecture with Yahoo Finance API to prevent rate limits. WebSocket-based live updates with JWT auth and transactional email verification via Brevo.",
      techStack: ["React", "Node.js", "Express", "MongoDB", "Socket.io", "Tailwind CSS"],
      highlights: [
        "Real-time market tracking with interactive charts",
        "Portfolio management with holdings, performance analytics, and history",
        "Batch API requests with exponential backoff to eliminate 429 errors",
        "Simulated buy/sell order management system",
        "Responsive UI optimized for desktop and mobile",
      ],
    },
    {
      title: "HackZen",
      src: "HackZen.png",
      color: "#8C8C8C",
      githubUrl: "https://github.com/gauravjain0377/HackZen.git",
      liveUrl: "https://hackzen.vercel.app/",
      summary: "Real-time hackathon management platform connecting organizers, judges, and participants.",
      description:
        "Centralized platform streamlining the hackathon lifecycle. Role-based dashboards for participants (team formation, project submission), organizers (phase management, review), and judges (scoring). Socket.IO for live chat and notifications; Cloudinary for file storage.",
      techStack: ["React", "Node.js", "Express", "MongoDB", "Socket.IO", "Cloudinary"],
      highlights: [
        "Role-based portals: Participants, Organizers, Judges, Admins",
        "Auth: Email/Password, GitHub OAuth, Google OAuth, optional 2FA",
        "Team formation and rich-text project submission portal",
        "Real-time chat rooms and notifications via Socket.IO",
        "Judging panels with custom criteria; automated certificate generation",
      ],
    },
    {
      title: "Understanding",
      src: "understanding.png",
      color: "#706D63",
      githubUrl: "https://github.com/gauravjain0377/Understanding.git",
      liveUrl: "https://understandingconcepts.vercel.app/",
      summary: "Minimal thinking space with interactive visual explanations for technical concepts.",
      description:
        "Calm, distraction-free learning platform with progressive reading and custom interactive SVG diagrams. MDX-based content organized by domain (Pixels & Color, 3D & Graphics). Static-first Next.js App Router for fast load times and strong Lighthouse scores.",
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "MDX"],
      highlights: [
        "Focus Mode: scroll-tracking spotlight to minimize distractions",
        "Concept Connections sidebar for related topics",
        "Interactive SVG diagrams that progressively reveal",
        "Domain-based content organization",
        "SSG architecture for near-instant page loads",
      ],
    },
    {
      title: "CodeType Arena",
      src: "codetypearena.png",
      color: "#EFE8D3",
      githubUrl: "https://github.com/gauravjain0377/CodeType-Arena.git",
      liveUrl: "https://codetype-arena.vercel.app/",
      summary: "Developer-focused typing practice with real code snippets and specialized metrics.",
      description:
        "12 themed arenas for typing real-world code across React, Python, SQL, Bash. Tracks Code WPM, Syntax Accuracy, Bracket Balance, Indent Precision, and Flow State. Includes keyboard-based mini-games (Char Catch, Gravity Flip) and a zen-like continuous practice mode.",
      techStack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Zustand", "Framer Motion"],
      highlights: [
        "12 arenas: Syntax Sprint, Bracket Storm, React Flow, Regex Rodeo, etc.",
        "Developer metrics: Code WPM, Syntax Accuracy, Bracket Balance, Indent Precision",
        "Custom metric engine with non-blocking calculations on every keystroke",
        "Canvas-based mini-games at 60 FPS inside React",
        "Zero perceived input latency at 120+ WPM",
      ],
    },
    {
      title: "SvaraGPT",
      src: "SvaraGPT.png",
      color: "#455ce9",
      githubUrl: "https://github.com/gauravjain0377/SvaraGPT.git",
      liveUrl: "https://svaragpt.vercel.app/",
      summary: "Premium AI chat app with organized threads, projects, and robust authentication.",
      description:
        "Polished AI assistant with Projects and Chat Threads for organization. Secure auth: email verification, optional 2FA, session management, device listings, Google OAuth. Mobile-first design with collapsible sidebar and flicker-free dark/light theme switching.",
      techStack: ["React", "Node.js", "Express", "MongoDB", "Google Gemini API"],
      highlights: [
        "Real-time AI chat with edit, regenerate, and feedback on messages",
        "Projects and Chat Threads with full CRUD",
        "Guest and authenticated flows with rate limits for guests",
        "Production-ready CORS and secure cookie policies",
        "Vanilla CSS variables for lightweight, accessible theming",
      ],
    },
  ];

  const scaleAnimation = {
    initial: { scale: 0, x: "-50%", y: "-50%", opacity: 0 },
    enter: {
      scale: 1,
      x: "-50%",
      y: "-50%",
      opacity: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
    closed: {
      scale: 0,
      x: "-50%",
      y: "-50%",
      opacity: 0,
      transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
    },
  };
  const [modal, setModal] = useState({ active: false, index: 0 });
  const [activeProjectIndex, setActiveProjectIndex] = useState(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const { active, index } = modal;
  const modalContainer = useRef(null);

 
  const cursor = useRef(null);
  const cursorLabel = useRef(null);

  let xMoveContainer = useRef(null);
  let yMoveContainer = useRef(null);
  let xMoveCursor = useRef(null);
  let yMoveCursor = useRef(null);
  let xMoveCursorLabel = useRef(null);
  let yMoveCursorLabel = useRef(null);

  useEffect(() => {
    setIsTouchDevice(
      typeof window !== "undefined" &&
        ("ontouchstart" in window || navigator.maxTouchPoints > 0)
    );
  }, []);

  useEffect(() => {
    if (!modalContainer.current || !cursor.current || !cursorLabel.current)
      return;
    //Move Container – smooth follow
    xMoveContainer.current = gsap.quickTo(modalContainer.current, "left", {
      duration: 0.72,
      ease: "power2.out",
    });
    yMoveContainer.current = gsap.quickTo(modalContainer.current, "top", {
      duration: 0.72,
      ease: "power2.out",
    });
    //Move cursor – snappy but smooth
    xMoveCursor.current = gsap.quickTo(cursor.current, "left", {
      duration: 0.4,
      ease: "power2.out",
    });
    yMoveCursor.current = gsap.quickTo(cursor.current, "top", {
      duration: 0.4,
      ease: "power2.out",
    });
    //Move cursor label
    xMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "left", {
      duration: 0.38,
      ease: "power2.out",
    });
    yMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "top", {
      duration: 0.38,
      ease: "power2.out",
    });

  }, []);

  const moveItems = (x, y) => {
    if (
      !modalContainer.current ||
      !cursor.current ||
      !cursorLabel.current
    )
      return;
    xMoveContainer.current?.(x);
    yMoveContainer.current?.(y);
    xMoveCursor.current?.(x);
    yMoveCursor.current?.(y);
    xMoveCursorLabel.current?.(x);
    yMoveCursorLabel.current?.(y);
  };

  const manageModal = (active, index, x, y) => {
    moveItems(x, y);
    setModal({ active, index });
  };

  
  return (
    <motion.main
      id="projects"
      className={styles.projects}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      onMouseMove={(e) => {
        moveItems(e.clientX, e.clientY);
      }}
      onMouseLeave={() => {
      
        if (active) {
          setModal({ active: false, index: 0 });
        }
      }}
    >
      <motion.div 
        className={styles.body}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <h1 className={styles.projectsTitle}>Projects</h1>
        <div className={styles.projectContainer}>
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Project
                index={index}
                title={project.title}
                manageModal={manageModal}
                onOpenDetails={() => setActiveProjectIndex(index)}
                isTouchDevice={isTouchDevice}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {!isTouchDevice ? (
        <>
        <motion.div
          ref={modalContainer}
          variants={scaleAnimation}
          initial="initial"
          animate={active ? "enter" : "closed"}
          className={styles.modalContainer}
        >
          <div
            style={{ top: index * -100 + "%" }}
            className={styles.modalSlider}
          >
            {projects.map((project, i) => {
              const { src, color } = project;
              return (
                <div
                  className={styles.modal}
                  style={{ backgroundColor: color }}
                  key={`modal_${i}`}
                >
                  <div className={styles.modalImageWrap}>
                    <Image
                      src={`/images/${src}`}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 92vw, 44vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className={styles.modalOverlay}>
                    <span className={styles.modalProjectName}>{project.title}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          ref={cursor}
          className={styles.cursor}
          variants={scaleAnimation}
          initial="initial"
          animate={active ? "enter" : "closed"}
        ></motion.div>

        <motion.div
          ref={cursorLabel}
          className={styles.cursorLabel}
          variants={scaleAnimation}
          initial="initial"
          animate={active ? "enter" : "closed"}
        >
          <a
            href={active && projects[index] ? projects[index].liveUrl : "#"}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              if (!active || !projects[index]) e.preventDefault();
            }}
          >
            ↗
          </a>
        </motion.div>
        </>
      ) : null}

      <AnimatePresence>
        {activeProjectIndex !== null && projects[activeProjectIndex] ? (
          <motion.div
            className={styles.detailsOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProjectIndex(null)}
          >
            <motion.div
              className={styles.detailsModal}
              initial={{ opacity: 0, y: 32, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Full-bleed cover image with title overlay */}
              <div
                className={styles.detailsImageWrap}
                style={{ backgroundColor: projects[activeProjectIndex].color }}
              >
                <Image
                  src={`/images/${projects[activeProjectIndex].src}`}
                  alt={`${projects[activeProjectIndex].title} preview`}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  style={{ objectFit: "contain", objectPosition: "center center" }}
                />
                <p className={styles.detailsImageTitle}>
                  {projects[activeProjectIndex].title}
                </p>
              </div>

              {/* Content */}
              <div className={styles.detailsContent}>
                <h3>{projects[activeProjectIndex].title}</h3>
                {projects[activeProjectIndex].summary && (
                  <p className={styles.detailsSummary}>{projects[activeProjectIndex].summary}</p>
                )}
                <p className={styles.detailsDescription}>{projects[activeProjectIndex].description}</p>

                <div className={styles.stackSection}>
                  <div className={styles.sectionHeading}><h4>Tech Stack</h4></div>
                  <div className={styles.stackTags}>
                    {projects[activeProjectIndex].techStack.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>

                <div className={styles.highlightsSection}>
                  <div className={styles.sectionHeading}><h4>Key Features</h4></div>
                  <ul>
                    {projects[activeProjectIndex].highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className={styles.modalActions}>
                  <a
                    href={projects[activeProjectIndex].liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.primaryAction}
                  >
                    Live Project ↗
                  </a>
                  <a
                    href={projects[activeProjectIndex].githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.secondaryAction}
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Close button — outside modal, in overlay, always on top and clickable */}
            <button
              type="button"
              className={styles.modalCloseBtn}
              onClick={(e) => {
                e.stopPropagation();
                setActiveProjectIndex(null);
              }}
              aria-label="Close"
            >
              <span className={styles.modalCloseIcon} aria-hidden>×</span>
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.main>
  );
};

export default index;
