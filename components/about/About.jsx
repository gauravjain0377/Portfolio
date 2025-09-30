"use client";
import React, { useState, useEffect } from "react";
import styles from "./About.module.scss";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const About = () => {
  const [activeSkill, setActiveSkill] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const skillsData = {
    "Programming Languages": {
      description: "Core programming languages I work with",
      icon: "💻",
      skills: [
        { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", proficiency: 100 },
        { name: "C", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg", proficiency: 100 },
        { name: "HTML", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", proficiency: 100 },
        { name: "CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", proficiency: 100 },
        { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", proficiency: 100 },
        { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", proficiency: 100 },
        
      ]
    },
    "Frameworks & Tools": {
      description: "Frameworks and development tools",
      icon: "⚙️",
      skills: [
        { name: "ReactJS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", proficiency: 100 },
        { name: "NodeJS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", proficiency: 100 },
        { name: "ExpressJS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", proficiency: 100 },
        { name: "NextJS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", proficiency: 100 },
        { name: "Tailwind", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", proficiency: 100 },
        { name: "Bootstrap", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg", proficiency: 100 },
      ]
    },
    "Cloud & Databases": {
      description: "Cloud platforms and database technologies",
      icon: "☁️",
      skills: [
        { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", proficiency: 100 },
        { name: "AWS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", proficiency: 100 },
        { name: "Firebase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg", proficiency: 100 },
      ]
    },
    "Coursework & Others": {
      description: "Academic and additional technologies",
      icon: "📚",
      skills: [
        { name: "DSA", logo: "/images/DSA.png", proficiency: 100 },
        { name: "OS", logo: "https://img.icons8.com/color/96/000000/operating-system.png", proficiency: 100 },
        { name: "Networking", logo: "https://img.icons8.com/color/96/000000/network.png", proficiency: 100 },
        { name: "GitHub", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", proficiency: 100 },
        { name: "OOPS", logo: "/images/oops.png", proficiency: 100 },
       
      ]
    }
  };



  return (
    <motion.div 
      className={styles.aboutContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Hero Section */}
      <motion.div 
        className={styles.content}
        style={{ y }}
      >
        <motion.div 
          className={styles.leftSection}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className={styles.heading}>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Fueling the web with logic, design, and purpose.
            </motion.h1>
            <motion.div 
              className={styles.globeButton}
              whileHover={{ scale: 1.1, rotate: 360 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" fill="none"/>
                <path d="M2 12h20" stroke="white" strokeWidth="2"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="white" strokeWidth="2" fill="none"/>
                <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="2" fill="none"/>
              </svg>
            </motion.div>
          </div>
          
          <motion.div 
            className={styles.divider}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          ></motion.div>
          
          <motion.div 
            className={styles.description}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <p>
              I'm <strong>Gaurav Jain</strong>, a final-year B.Tech student in Information Technology with a strong focus on full-stack web development.
            </p>
            <p>
              I've contributed to real-world platforms during my internships — including <strong>STPI (MeitY, Govt. of India)</strong> and <strong>Edunet Foundation (AICTE)</strong> — where I worked on scalable backend systems, REST APIs, real-time communication, and modern frontends using React and Next.js.
            </p>
            <p>
              I'm constantly learning and exploring new technologies, with interests in building developer tools, collaborative platforms, and clean UI experiences.
            </p>
            <motion.p 
              className={styles.exploring}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Always exploring...
            </motion.p>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className={styles.rightSection}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.div 
            className={styles.imageContainer}
            whileHover={{ scale: 1.05, rotateY: 5 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src="/images/Gauravjjj.png"
              alt="Gaurav Jain"
              width={400}
              height={100}
              className={styles.profileImage}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      

      {/* Technical Skills Section */}
      <motion.div 
        className={styles.skillsSection}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.6 }}
      >
        <motion.div 
          className={styles.skillsHeader}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          <h2>Technical Skills</h2>
          <p>Technologies and tools I use to bring ideas to life</p>
        </motion.div>

        <div className={styles.skillsContainer}>
          {Object.entries(skillsData).map(([category, data], index) => (
            <motion.div 
              key={category} 
              className={styles.skillCategory}
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className={styles.categoryHeader}>
                <motion.div 
                  className={styles.categoryIcon}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <span>{data.icon}</span>
                </motion.div>
                <div className={styles.categoryInfo}>
                  <h3>{category}</h3>
                  <p>{data.description}</p>
                </div>
              </div>
              <div className={styles.skillsRow}>
                {data.skills.map((skill, skillIndex) => (
                  <motion.div 
                    key={skillIndex} 
                    className={`${styles.skillItem} ${activeSkill === skill.name ? styles.active : ''}`}
                    whileHover={{ scale: 1.06, y: -6, transition: { type: 'tween', duration: 0.35, ease: 'easeOut' } }}
                    whileTap={{ scale: 0.95 }}
                    onHoverStart={() => setActiveSkill(skill.name)}
                    onHoverEnd={() => setActiveSkill(null)}
                    initial={{ opacity: 1, scale: 1 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className={styles.skillLogo}>
                      <img 
                        src={skill.logo} 
                        alt={`${skill.name} logo`}
                        width="20"
                        height="20"
                      />
                    </div>
                    <span>{skill.name}</span>
                    <div className={styles.proficiencyBar}>
                      <div 
                        className={styles.proficiencyFill}
                        style={{ 
                          '--proficiency-width': `${skill.proficiency}%`,
                          width: `${skill.proficiency}%` 
                        }}
                      ></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>


      </motion.div>

      {/* Achievements Section */}
      <motion.div 
        className={styles.achievementsSection}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.8 }}
      >
        <motion.div 
          className={styles.achievementsHeader}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.0 }}
        >
          <h2>Achievements</h2>
          <p>Milestones and accomplishments in my journey</p>
        </motion.div>

        <div className={styles.achievementsContainer}>
          <motion.div 
            className={styles.achievementCard}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 2.2 }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className={styles.achievementIcon}>
              <span>🥇</span>
            </div>
            <div className={styles.achievementContent}>
              <h3>EDU Chain Hackathon – Winner</h3>
              <p>Declared Winner in the EDU Chain Hackathon (Semester 3 – Earn Category). Awarded $4,000 for developing a blockchain-based educational rewards platform demonstrating transparency and innovation.</p>
              <div className={styles.achievementBadge}>
                <span>Winner</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className={styles.achievementCard}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 2.4 }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className={styles.achievementIcon}>
              <span>🥈</span>
            </div>
            <div className={styles.achievementContent}>
              <h3>TEK Connect 2024 – 2nd Place</h3>
              <p>Secured 2nd place at TEK-Connect 2024, hosted by Poornima College of Engineering, Jaipur. Presented an innovative software model titled "Virtual Herbal Garden" — organized in collaboration with Vigyan Bharati Rajasthan, CSIR-CEERI Pilani, REPC, and Rajasthan Technical University.</p>
              <div className={styles.achievementBadge}>
                <span>2nd Place</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className={styles.achievementCard}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 2.6 }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className={styles.achievementIcon}>
              <span>🥇</span>
            </div>
            <div className={styles.achievementContent}>
              <h3>Hack & Build – 12-Hour Hackathon Winner</h3>
              <p>Won the Hack & Build 12-Hour Hackathon at the Aadhar 13 Tech-Fest, Poornima College of Engineering (Feb 2025). Built a complete full-stack solution under time constraints, earning accolades for creativity and execution.</p>
              <div className={styles.achievementBadge}>
                <span>Winner</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default About; 