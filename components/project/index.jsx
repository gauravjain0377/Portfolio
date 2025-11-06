"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./style.module.scss";
import Project from "./childProject/Project";
import gsap from "gsap";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Button from "../../common/roundedbutton";
const index = () => {
  const projects = [
    {
      title: "StockSathi",
      src: "Stox.png",
      color: "#000000",
      githubUrl: "https://github.com/gauravjain0377/Stox.git",
      liveUrl: "https://stocksathi.vercel.app/",

    },
    {
      title: "HackZen",
      src: "HackZen.png",
      color: "#8C8C8C",
      githubUrl: "https://github.com/Nitinjainn/STPI-Project.git",
      liveUrl: "https://devora-dev.vercel.app/",
    },
    {
      title: "SvaraGPT",
      src: "SvaraGPT.png",
      color: "#455ce9",
      githubUrl: "https://github.com/gauravjain0377/SvaraGPT.git",
      liveUrl: "https://svaragpt.vercel.app/",
    },
    {
      title: "Simon Game",
      src: "SG.png",
      color: "#EFE8D3",
      githubUrl: "https://github.com/gauravjain0377/Simon-Game.git",
      liveUrl: "https://simonplay.vercel.app/",
    },
    {
      title: "Virtual Herbal Garden",
      src: "VHG.png",
      color: "#706D63",
      githubUrl: "https://github.com/Shaurya01836/AyurHerb.git",
      liveUrl: "https://herb-sphere.vercel.app/",
    },
    {
      title: "BookStore",
      src: "BS.png",
      color: "#706D63",
      githubUrl: "https://github.com/gauravjain0377/BookStore.git",
      liveUrl: "https://books-company.vercel.app/",
    },
  ];

  const scaleAnimation = {
    initial: { scale: 0, x: "-50%", y: "-50%" },
    enter: {
      scale: 1,
      x: "-50%",
      y: "-50%",
      transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
    },
    closed: {
      scale: 0,
      x: "-50%",
      y: "-50%",
      transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] },
    },
  };
  const [modal, setModal] = useState({ active: false, index: 0 });
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
    //Move Container
    xMoveContainer.current = gsap.quickTo(modalContainer.current, "left", {
      duration: 0.8,
      ease: "power3",
    });
    yMoveContainer.current = gsap.quickTo(modalContainer.current, "top", {
      duration: 0.8,
      ease: "power3",
    });
    //Move cursor
    xMoveCursor.current = gsap.quickTo(cursor.current, "left", {
      duration: 0.5,
      ease: "power3",
    });
    yMoveCursor.current = gsap.quickTo(cursor.current, "top", {
      duration: 0.5,
      ease: "power3",
    });
    //Move cursor label
    xMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "left", {
      duration: 0.45,
      ease: "power3",
    });
    yMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "top", {
      duration: 0.45,
      ease: "power3",
    });
  }, []);

  const moveItems = (x, y) => {
    xMoveContainer.current(x);
    yMoveContainer.current(y);
    xMoveCursor.current(x);
    yMoveCursor.current(y);
    xMoveCursorLabel.current(x);
    yMoveCursorLabel.current(y);
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
      onMouseLeave={(e) => {
        // Close modal when leaving the entire projects section
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
        {projects.map((project, index) => {
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Project
                index={index}
                title={project.title}
                manageModal={manageModal}
                githubUrl={project.githubUrl}
                key={index}
              />
            </motion.div>
          );
        })}
      </motion.div>
      
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
            {projects.map((project, index) => {
              const { src, color } = project;
              return (
                <div
                  className={styles.modal}
                  style={{ backgroundColor: color }}
                  key={`modal_${index}`}
                >
                  <Image
                    src={`/images/${src}`}
                    width={300}
                    height={0}
                    alt="image"
                    onError={(e) => {
                      console.error(`Failed to load modal image: ${src}`);
                      e.target.style.display = 'none';
                    }}
                    onLoad={() => {
                      console.log(`Successfully loaded modal image: ${src}`);
                    }}
                  />
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
            style={{ 
              textDecoration: 'none', 
              color: 'inherit',
              pointerEvents: 'auto',
              cursor: 'pointer',
              padding: '15px',
              display: 'block',
              width: '100%',
              height: '100%',
              textAlign: 'center'
            }}
          >
            View
          </a>
        </motion.div>
      </>
    </motion.main>
  );
};

export default index;
