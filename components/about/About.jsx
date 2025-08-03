"use client";
import React from "react";
import styles from "./About.module.scss";
import Image from "next/image";

const About = () => {
  const skillsData = {
    "Programming Languages": {
      description: "Core programming languages I work with",
      icon: "💻",
      skills: [
        { name: "HTML", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
        { name: "CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
        { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
        { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
        { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" }
      ]
    },
    "Frameworks & Tools": {
      description: "Frameworks and development tools",
      icon: "⚙️",
      skills: [
        { name: "ReactJS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
        { name: "NodeJS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
        { name: "ExpressJS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
        { name: "NextJS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
        { name: "MUI", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg" },
        { name: "Tailwind", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" },
        { name: "Bootstrap", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
        { name: "Jest", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" }
      ]
    },
    "Cloud & Databases": {
      description: "Cloud platforms and database technologies",
      icon: "☁️",
      skills: [
        { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
        { name: "AWS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg" },
        { name: "Firebase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
      ]
    },
    "Coursework & Others": {
      description: "Academic and additional technologies",
      icon: "📚",
      skills: [
        { name: "DSA", logo: "https://img.icons8.com/color/96/000000/data-structures.png" },
        { name: "OS", logo: "https://img.icons8.com/color/96/000000/operating-system.png" },
        { name: "Networking", logo: "https://img.icons8.com/color/96/000000/network.png" },
        { name: "GitHub", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
        { name: "OOPS", logo: "https://img.icons8.com/color/96/000000/object-oriented-programming.png" },
        { name: "JSON", logo: "https://img.icons8.com/color/96/000000/json.png" }
      ]
    }
  };

  return (
    <div className={styles.aboutContainer}>
      <div className={styles.content}>
        <div className={styles.leftSection}>
          <div className={styles.heading}>
            <h1>Helping brands thrive in the digital world</h1>
            <div className={styles.globeButton}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" fill="none"/>
                <path d="M2 12h20" stroke="white" strokeWidth="2"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="white" strokeWidth="2" fill="none"/>
                <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="2" fill="none"/>
              </svg>
            </div>
          </div>
          
          <div className={styles.divider}></div>
          
          <div className={styles.description}>
            <p>
              I help companies from all over the world with tailor-made solutions. 
              With each project, I push my work to new horizons, always putting 
              quality first.
            </p>
            <p className={styles.exploring}>Always exploring...</p>
          </div>
        </div>
        
        <div className={styles.rightSection}>
          <div className={styles.imageContainer}>
            <Image
              src="/images/Gaurav_Jain.png"
              alt="Gaurav Jain - Professional headshot"
              width={400}
              height={500}
              className={styles.profileImage}
            />
          </div>
        </div>
      </div>

      {/* Technical Skills Section */}
      <div className={styles.skillsSection}>
        <div className={styles.skillsHeader}>
          <h2>Technical Skills</h2>
          <p>Technologies and tools I use to bring ideas to life</p>
        </div>

        <div className={styles.skillsContainer}>
          {Object.entries(skillsData).map(([category, data], index) => (
            <div key={category} className={styles.skillCategory}>
              <div className={styles.categoryHeader}>
                <div className={styles.categoryIcon}>
                  <span>{data.icon}</span>
                </div>
                <div className={styles.categoryInfo}>
                  <h3>{category}</h3>
                  <p>{data.description}</p>
                </div>
              </div>
              <div className={styles.skillsRow}>
                {data.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className={styles.skillItem}>
                    <div className={styles.skillLogo}>
                      <img 
                        src={skill.logo} 
                        alt={`${skill.name} logo`}
                        width="20"
                        height="20"
                      />
                    </div>
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.skillsStats}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>27+</span>
            <span className={styles.statLabel}>TECHNOLOGIES</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>4</span>
            <span className={styles.statLabel}>SPECIALIZATIONS</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>2+</span>
            <span className={styles.statLabel}>YEARS EXPERIENCE</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 