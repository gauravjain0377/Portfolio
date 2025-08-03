"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ContactFooter from "@/components/contact/Contact";
import styles from "./page.module.scss";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    services: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [currentTime, setCurrentTime] = useState("");

  // Update time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Get IST time by adding 5 hours and 30 minutes to UTC
      const istTime = new Date(now.getTime() + (5.5 * 60 * 60 * 1000));
      
      const hours = istTime.getUTCHours();
      const minutes = istTime.getUTCMinutes();
      const seconds = istTime.getUTCSeconds();
      
      // Format time with AM/PM
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours % 12 || 12;
      const displayMinutes = minutes.toString().padStart(2, '0');
      const displaySeconds = seconds.toString().padStart(2, '0');
      
      const timeString = `${displayHours}:${displayMinutes}:${displaySeconds} ${ampm} IST`;
      setCurrentTime(timeString);
    };

    updateTime(); // Set initial time
    const interval = setInterval(updateTime, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: "",
          email: "",
          phone: "",
          organization: "",
          services: "",
          message: ""
        });
      } else {
        setSubmitStatus('error');
        console.error('Submission error:', data.error);
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Network error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      className={styles.contactPage}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Main Content */}
      <div className={styles.mainContent}>
        <motion.div 
          className={styles.leftSection}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={styles.mainHeading}
          >
            Let's start a project together
          </motion.h1>
          
          <motion.div 
            className={styles.contactForm}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>01 What's your name?</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  placeholder="Gaurav Jain *"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>02 What's your email?</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  placeholder="gaurav@jain.com *"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>03 What's your phone number?</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  placeholder="+91 98765 43210"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>04 What's the name of your organization?</label>
                <input
                  type="text"
                  name="organization"
                  value={formData.organization}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  placeholder="Gaurav & Jain ®"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>05 What services are you looking for?</label>
                <input
                  type="text"
                  name="services"
                  value={formData.services}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  placeholder="Web Development, UI/UX Design..."
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>06 Your message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className={styles.formTextarea}
                  placeholder="Hello Gaurav, can you help me with ... *"
                  rows={4}
                  required
                />
              </div>

              <motion.button
                type="submit"
                className={styles.submitButton}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send it!'}
              </motion.button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  className={styles.successMessage}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  ✅ Message sent successfully! I'll get back to you soon.
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  className={styles.errorMessage}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  ❌ Failed to send message. Please try again.
                </motion.div>
              )}
            </form>
          </motion.div>
        </motion.div>

        <motion.div 
          className={styles.rightSection}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Profile Image */}
          <motion.div 
            className={styles.profileImage}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Image
              src="/images/Gaurav_Jain.png"
              alt="Gaurav Jain"
              width={300}
              height={300}
              className={styles.image}
              priority
            />
          </motion.div>

          {/* Arrow Animation */}
          <motion.div 
            className={styles.arrow}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            ↓
          </motion.div>

          {/* Contact Details */}
          <motion.div 
            className={styles.contactDetails}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className={styles.detailsContainer}>
              <div className={styles.detailsSection}>
                <h3 className={styles.detailsTitle}>CONTACT DETAILS</h3>
                <div className={styles.detailsContent}>
                  <div className={styles.detailItem}>
                    <a href="mailto:gauravjain@gmail.com" className={styles.detailValue}>
                      gjain0229@gmail.com
                    </a>
                  </div>
                  <div className={styles.detailItem}>
                    <a href="tel:+91XXXXXXXXXX" className={styles.detailValue}>
                      +91 8949956653
                    </a>
                  </div>
                </div>
              </div>

              <div className={styles.detailsSection}>
                <h3 className={styles.detailsTitle}>BUSINESS DETAILS</h3>
                <div className={styles.detailsContent}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailValue}>Gaurav Jain</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailValue}>Software Engineer</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailValue}>Location: Jaipur, India</span>
                  </div>
                </div>
              </div>

              <div className={styles.detailsSection}>
                <h3 className={styles.detailsTitle}>SOCIALS</h3>
                <div className={styles.detailsContent}>
                  <div className={styles.detailItem}>
                    <a href="https://www.linkedin.com/in/this-is-gaurav-jain/" target="_blank" rel="noopener noreferrer" className={styles.detailValue}>
                      LinkedIn
                    </a>
                  </div>
                  <div className={styles.detailItem}>
                    <a href="https://github.com/gauravjain0377" target="_blank" rel="noopener noreferrer" className={styles.detailValue}>
                      Github
                    </a>
                  </div>
                  <div className={styles.detailItem}>
                    <a href="https://x.com/gauravjain0377" target="_blank" rel="noopener noreferrer" className={styles.detailValue}>
                      X
                    </a>
                  </div>
                  <div className={styles.detailItem}>
                    <a href="https://www.instagram.com/gauravjain0377/" target="_blank" rel="noopener noreferrer" className={styles.detailValue}>
                      Instagram
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Custom Footer */}
      <motion.div 
        className={styles.customFooter}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
      >
        <div className={styles.footerContainer}>
          <div className={styles.footerSection}>
            <h4 className={styles.footerTitle}>VERSION</h4>
            <p className={styles.footerText}>2025 © Edition</p>
          </div>
          
          <div className={styles.footerSection}>
            <h4 className={styles.footerTitle}>LOCAL TIME</h4>
            <p className={styles.footerText}>{currentTime}</p>
          </div>
          
          <div className={styles.footerSection}>
            <h4 className={styles.footerTitle}>SOCIALS</h4>
            <div className={styles.socialLinks}>
              <a href="https://www.linkedin.com/in/this-is-gaurav-jain/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>LinkedIn</a>
              <a href="https://github.com/gauravjain0377" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>Github</a>
              <a href="https://x.com/gauravjain0377" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>X</a>
              <a href="https://www.instagram.com/gauravjain0377/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>Instagram</a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Contact; 