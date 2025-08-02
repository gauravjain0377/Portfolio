"use client";
import React, { useState } from "react";
import styles from "./Works.module.scss";
import { motion, AnimatePresence } from "framer-motion";

const Works = () => {
  const [expandedItem, setExpandedItem] = useState(null);

  const workExperience = [
    {
      id: 1,
      company: "STPI",
      logo: "STPI",
      logoBg: "#00FF88",
      position: "Software Engineer",
      duration: "July 2025 – August 2025",
      description: "Working on developing and maintaining software solutions. Collaborating with cross-functional teams to deliver high-quality products.",
      technologies: ["React", "Node.js", "TypeScript", "AWS"],
      achievements: [
        "Led development of key features improving user experience",
        "Reduced application load time by 40%",
        "Mentored junior developers and conducted code reviews"
      ]
    },
    {
      id: 2,
      company: "Bussibees Internship",
      logo: "Bussibees",
      logoBg: "#FFFFFF",
      logoColor: "#000000",
      position: "Full Stack Developer",
      duration: "Jan 2023 – Oct 2024 • 1 years 10 months",
      description: "Developed scalable web applications and microservices. Worked on both frontend and backend technologies.",
      technologies: ["JavaScript", "Python", "Docker", "MongoDB"],
      achievements: [
        "Built and deployed 5+ microservices",
        "Improved system performance by 60%",
        "Implemented CI/CD pipelines reducing deployment time"
      ]
    },
    {
      id: 3,
      company: "Edunet Foundation",
      logo: "Edunet Foundation",
      logoBg: "#8B5CF6",
      position: "Frontend Developer Intern",
      duration: "Jul 2022 – Dec 2022 • 6 months",
      description: "Developed responsive user interfaces and interactive components. Collaborated with design team to implement pixel-perfect designs.",
      technologies: ["React", "CSS3", "JavaScript", "Figma"],
      achievements: [
        "Built 10+ reusable UI components",
        "Improved page load speed by 30%",
        "Received recognition for best intern performance"
      ]
    },
    
  ];

  const toggleExpanded = (id) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  return (
    <div className={styles.worksContainer}>
      <div className={styles.timeline}>
        <div className={styles.timelineLine}></div>
        
        {workExperience.map((work, index) => (
          <motion.div
            key={work.id}
            className={styles.workCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className={styles.timelineDot}></div>
            
            <div className={styles.cardContent}>
              <div className={styles.cardHeader}>
                <div className={styles.companyInfo}>
                  <div 
                    className={styles.logo}
                    style={{ 
                      backgroundColor: work.logoBg,
                      color: work.logoColor || "#FFFFFF"
                    }}
                  >
                    {work.logo}
                  </div>
                  <div className={styles.companyDetails}>
                    <h3 className={styles.companyName}>{work.company}</h3>
                    <p className={styles.position}>{work.position}</p>
                    <p className={styles.duration}>{work.duration}</p>
                  </div>
                </div>
                
                <button
                  className={styles.expandButton}
                  onClick={() => toggleExpanded(work.id)}
                >
                  <motion.div
                    animate={{ rotate: expandedItem === work.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    ▼
                  </motion.div>
                </button>
              </div>

              <AnimatePresence>
                {expandedItem === work.id && (
                  <motion.div
                    className={styles.expandedContent}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={styles.description}>
                      <h4>Description</h4>
                      <p>{work.description}</p>
                    </div>
                    
                    <div className={styles.technologies}>
                      <h4>Technologies</h4>
                      <div className={styles.techTags}>
                        {work.technologies.map((tech, techIndex) => (
                          <span key={techIndex} className={styles.techTag}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className={styles.achievements}>
                      <h4>Key Achievements</h4>
                      <ul>
                        {work.achievements.map((achievement, achievementIndex) => (
                          <li key={achievementIndex}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Works; 