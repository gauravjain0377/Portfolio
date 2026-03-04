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
      description:
        "InboxPilot AI is an AI-driven email productivity platform built to reduce manual drafting time and improve communication quality. It helps users generate contextual replies, rewrite message tone, and prioritize high-impact conversations so inbox management becomes faster and more strategic.",
      techStack: ["Next.js", "React", "OpenAI API", "Node.js", "Tailwind CSS"],
      highlights: [
        "Context-aware drafting and rewriting",
        "Priority-focused inbox workflow",
        "Clean responsive product experience",
      ],
    },
    {
      title: "StockSathi",
      src: "Stox.png",
      color: "#000000",
      githubUrl: "https://github.com/gauravjain0377/Stox.git",
      liveUrl: "https://stocksathi.vercel.app/",
      description:
        "StockSathi is a stock analysis and tracking application focused on making investment decisions easier through visual data. It provides a streamlined dashboard for following market movement, understanding trends quickly, and monitoring relevant stock insights from one place.",
      techStack: ["React", "Node.js", "Express", "MongoDB", "Chart.js"],
      highlights: [
        "Interactive stock analytics dashboard",
        "Simple insights for faster decision-making",
        "Mobile-friendly market tracking experience",
      ],
    },
    {
      title: "HackZen",
      src: "HackZen.png",
      color: "#8C8C8C",
      githubUrl: "https://github.com/Nitinjainn/STPI-Project.git",
      liveUrl: "https://devora-dev.vercel.app/",
      description:
        "HackZen is a full-stack hackathon management platform created to simplify event operations for organizers, judges, and participants. It centralizes registration, team workflows, project submissions, and score-based judging into one reliable workflow.",
      techStack: ["React", "Node.js", "Express", "MongoDB", "Socket.io"],
      highlights: [
        "Role-based portals for event stakeholders",
        "Submission and judging lifecycle management",
        "Real-time updates for smoother event execution",
      ],
    },
    {
      title: "Understanding",
      src: "understanding.png",
      color: "#706D63",
      githubUrl: "https://github.com/gauravjain0377/Understanding.git",
      liveUrl: "https://understandingconcepts.vercel.app/",
      description:
        "Understanding is an educational web platform designed to make technical concepts easier to grasp through structured, beginner-friendly explanations. It focuses on concept clarity first, then supports learning with practical examples and readable UI organization.",
      techStack: ["React", "Next.js", "JavaScript", "SCSS"],
      highlights: [
        "Concept-first learning experience",
        "Clear content hierarchy for readability",
        "Responsive design for study on any device",
      ],
    },
    {
      title: "CodeType Arena",
      src: "codetypearena.png",
      color: "#EFE8D3",
      githubUrl: "https://github.com/gauravjain0377/CodeType-Arena.git",
      liveUrl: "https://codetype-arena.vercel.app/",
      description:
        "CodeType Arena is a gamified typing and coding challenge platform built for developers who want to improve speed and precision. It introduces a competitive practice environment with immediate feedback loops that make skill-building measurable and engaging.",
      techStack: ["Next.js", "React", "Framer Motion", "JavaScript"],
      highlights: [
        "Game-like coding and typing practice",
        "Instant performance feedback loops",
        "Focused UI built around challenge flow",
      ],
    },
    {
      title: "SvaraGPT",
      src: "SvaraGPT.png",
      color: "#455ce9",
      githubUrl: "https://github.com/gauravjain0377/SvaraGPT.git",
      liveUrl: "https://svaragpt.vercel.app/",
      description:
        "SvaraGPT is a voice-first AI interaction project that prioritizes natural conversational flow. It explores how voice interfaces can make AI usage feel faster, more accessible, and more intuitive compared with traditional text-only interfaces.",
      techStack: ["Next.js", "React", "Speech APIs", "OpenAI API", "SCSS"],
      highlights: [
        "Voice-centric conversational interaction",
        "AI-assisted response experience",
        "Polished UI for cross-device usability",
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
              <button
                type="button"
                className={styles.closeDetails}
                onClick={() => setActiveProjectIndex(null)}
                aria-label="Close project details"
              >
                Close
              </button>

              <div
                className={styles.detailsImageWrap}
                style={{ backgroundColor: projects[activeProjectIndex].color }}
              >
                <Image
                  src={`/images/${projects[activeProjectIndex].src}`}
                  width={520}
                  height={320}
                  alt={`${projects[activeProjectIndex].title} preview`}
                />
              </div>

              <div className={styles.detailsContent}>
                <h3>{projects[activeProjectIndex].title}</h3>
                <p>{projects[activeProjectIndex].description}</p>

                <div className={styles.stackSection}>
                  <h4>Tech Stack</h4>
                  <div className={styles.stackTags}>
                    {projects[activeProjectIndex].techStack.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>

                <div className={styles.highlightsSection}>
                  <h4>Project Highlights</h4>
                  <ul>
                    {projects[activeProjectIndex].highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className={styles.tags}>
                  <span>Recruiter Ready</span>
                  <span>Production Deployed</span>
                </div>

                <div className={styles.modalActions}>
                  <a
                    href={projects[activeProjectIndex].liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.primaryAction}
                  >
                    Live Project
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
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.main>
  );
};

export default index;
