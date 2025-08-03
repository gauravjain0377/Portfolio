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