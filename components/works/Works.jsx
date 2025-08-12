"use client";
import React, { useState } from "react";
import styles from "./Works.module.scss";
import { motion, AnimatePresence } from "framer-motion";

const Works = () => {
  const [expandedItem, setExpandedItem] = useState(null);

const workExperience = [
  {
    id: 1,
    company: "Software Technology Parks of India",
    logo: "STPI",
    logoBg: "#00FF88",
    position: "Software Developer Intern",
    duration: "July 2025 – August 2025",
    description:
      "Worked on HackZen, a full-stack hackathon management platform that simplifies organizing and managing virtual/in-person hackathons. Focused on backend architecture, API development, and secure user roles.",
    technologies: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "Passport.js",
      "Socket.io",
      "React.js",
      "Render",
      "Vercel",
      "Git",
      "Github"
    ],
    achievements: [
      "Developed REST APIs for authentication, project submission, team creation, and judge scoring.",
      "Implemented role-based access control (Admin, Organizer, Judge, Participant).",
      "Used Mongoose for efficient MongoDB operations and data consistency.",
      "Integrated backend APIs seamlessly with the React frontend.",
      "Implemented real-time messaging and status updates using Socket.io.",
      "Deployed backend services on Render and frontend on Vercel.",
       "Followed Agile methodology and used Git/GitHub for version control."
    ]
  },
  {
    id: 2,
    company: "Edunet Foundation (AICTE Collaboration)",
    logo: "Edunet Foundation",
    logoBg: "#8B5CF6",
    position: "Frontend Developer Intern",
    duration: "June 24 – July 31, 2024",
    description:
      "Completed the Front-End Development (FED) program under the AICTE–Edunet Foundation initiative. Built hands-on projects and received mentorship in HTML, CSS, JS, and React.",
    technologies: ["HTML", "CSS", "JavaScript", "Node.js", "React.js", "Git", "Github"],
    achievements: [
      "Built multiple frontend projects and interactive UIs.",
      "Practiced component-based architecture using React.",
      "Received mentorship and evaluation from industry experts.",
      "Demonstrated understanding of responsive design and web accessibility."
    ]
  },
  {
    id: 3,
    company: "Bussibees Ed-tech Pvt. Ltd.",
    logo: "Bussibees",
    logoBg: "#FFFFFF",
    logoColor: "#000000",
    position: "Frontend Developer Intern",
    duration: "July 11 – July 26, 2024",
    description:
      "Worked on improving the frontend of the official Bussibees website during the Summer Internship Program. Focused on UI enhancement, responsiveness, and performance optimization.",
    technologies: ["HTML", "CSS", "JavaScript", "Git", "Github"],
    achievements: [
      "Enhanced website responsiveness across devices.",
      "Collaborated with designers to improve UI consistency.",
      "Optimized page structure and load time.",
      "Implemented modular, clean, and reusable code."
    ]
  }
];



  const toggleExpanded = (id) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  return (
    <motion.div 
      className={styles.worksContainer}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Header Section */}
      <motion.div 
        className={styles.worksHeader}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        <h1>Work Experience</h1>
        <p>My professional journey and contributions</p>
      </motion.div>

      {/* Visual Separator */}
      <motion.div 
        className={styles.headerSeparator}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
      />

      <motion.div 
        className={styles.timeline}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
      >
        <motion.div 
          className={styles.timelineLine}
          initial={{ scaleX: 0, transformOrigin: "left" }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.0, delay: 0.6, ease: "easeOut" }}
        ></motion.div>
        
        {workExperience.map((work, index) => (
          <motion.div
            key={work.id}
            className={styles.workCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.6, 
              delay: 0.8 + index * 0.1,
              ease: "easeOut"
            }}
            whileHover={{ 
              y: -3, 
              transition: { duration: 0.3, ease: "easeOut" } 
            }}
          >
            <motion.div 
              className={styles.timelineDot}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 0.4, 
                delay: 0.9 + index * 0.1,
                ease: "easeOut"
              }}
            ></motion.div>
            
            <div className={styles.cardContent}>
              <div className={styles.cardHeader}>
                <div className={styles.companyInfo}>
                                     <div 
                     className={styles.logo}
                     style={{ 
                       backgroundColor: work.logoBg,
                       color: work.logoColor || "#FFFFFF",
                       display: 'flex',
                       alignItems: 'center',
                       justifyContent: 'center',
                       fontSize: '14px',
                       fontWeight: 'bold',
                       textTransform: 'uppercase'
                     }}
                   >
                     {work.logo === "STPI" && "STPI"}
                     {work.logo === "Edunet Foundation" && "EF"}
                     {work.logo === "Bussibees" && "BB"}
                     {!["STPI", "Edunet Foundation", "Bussibees"].includes(work.logo) && work.logo}
                   </div>
                  <div className={styles.companyDetails}>
                    <h3 className={styles.companyName}>
                      {work.company}
                      {work.company === "Software Technology Parks of India" && (
                        <span style={{ fontSize: '0.8em', fontWeight: 'normal', display: 'block', marginTop: '2px' }}>
                          (Ministry of Electronics and Information Technology, Government of India)
                        </span>
                      )}
                    </h3>
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
                    transition={{ 
                      duration: 0.6, 
                      ease: [0.25, 0.46, 0.45, 0.94] 
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      transition: { duration: 0.2 }
                    }}
                  >
                    ▼
                  </motion.div>
                </button>
              </div>

              <AnimatePresence mode="wait">
                {expandedItem === work.id && (
                  <motion.div
                    className={styles.expandedContent}
                    initial={{ opacity: 0, height: 0, scale: 0.95 }}
                    animate={{ opacity: 1, height: "auto", scale: 1 }}
                    exit={{ opacity: 0, height: 0, scale: 0.95 }}
                    transition={{ 
                      duration: 0.8, 
                      ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for smooth feel
                      opacity: { duration: 0.6 },
                      height: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
                      scale: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
                    }}
                    style={{ overflow: "hidden" }}
                  >
                    {/* Description Section */}
                    <motion.div 
                      className={styles.description}
                      initial={{ opacity: 0, y: 20, x: -10 }}
                      animate={{ opacity: 1, y: 0, x: 0 }}
                      exit={{ opacity: 0, y: 10, x: -5 }}
                      transition={{ 
                        duration: 0.7, 
                        delay: 0.2, 
                        ease: [0.25, 0.46, 0.45, 0.94] 
                      }}
                    >
                      <motion.h4
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        Description
                      </motion.h4>
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                      >
                        {work.description}
                      </motion.p>
                    </motion.div>
                    
                    {/* Technologies Section */}
                    <motion.div 
                      className={styles.technologies}
                      initial={{ opacity: 0, y: 20, x: -10 }}
                      animate={{ opacity: 1, y: 0, x: 0 }}
                      exit={{ opacity: 0, y: 10, x: -5 }}
                      transition={{ 
                        duration: 0.7, 
                        delay: 0.4, 
                        ease: [0.25, 0.46, 0.45, 0.94] 
                      }}
                    >
                      <motion.h4
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                      >
                        Technologies
                      </motion.h4>
                      <motion.div 
                        className={styles.techTags}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                      >
                        {work.technologies.map((tech, techIndex) => (
                          <motion.span 
                            key={techIndex} 
                            className={styles.techTag}
                            initial={{ opacity: 0, scale: 0.7, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 8 }}
                            transition={{ 
                              duration: 0.6, 
                              delay: 0.7 + techIndex * 0.08, 
                              ease: [0.25, 0.46, 0.45, 0.94] 
                            }}
                            whileHover={{ 
                              scale: 1.05, 
                              y: -2,
                              transition: { duration: 0.2 }
                            }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </motion.div>
                    </motion.div>
                    
                    {/* Achievements Section */}
                    <motion.div 
                      className={styles.achievements}
                      initial={{ opacity: 0, y: 20, x: -10 }}
                      animate={{ opacity: 1, y: 0, x: 0 }}
                      exit={{ opacity: 0, y: 10, x: -5 }}
                      transition={{ 
                        duration: 0.7, 
                        delay: 0.6, 
                        ease: [0.25, 0.46, 0.45, 0.94] 
                      }}
                    >
                      <motion.h4
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                      >
                        Key Achievements
                      </motion.h4>
                      <motion.ul
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                      >
                        {work.achievements.map((achievement, achievementIndex) => (
                          <motion.li 
                            key={achievementIndex}
                            initial={{ opacity: 0, x: -20, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: -10, scale: 0.95 }}
                            transition={{ 
                              duration: 0.6, 
                              delay: 0.9 + achievementIndex * 0.1, 
                              ease: [0.25, 0.46, 0.45, 0.94] 
                            }}
                            whileHover={{ 
                              x: 5,
                              transition: { duration: 0.2 }
                            }}
                          >
                            {achievement}
                          </motion.li>
                        ))}
                      </motion.ul>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Works; 