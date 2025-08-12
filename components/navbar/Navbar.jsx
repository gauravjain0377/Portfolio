import styles from "./stylenavbar.module.scss";
import Links from "./link";
import { motion } from "framer-motion";
import { menuSlider } from "./anima";
import Curve from "./curve/Curve";
import { usePathname } from "next/navigation";
import ThemeToggle from "../themeToggle/ThemeToggle";
import { useEffect, useRef } from "react";

const Navbar = ({ toggleMenu }) => {
  const pathname = usePathname();
  const isWorkPage = pathname === "/work";
  const isAboutPage = pathname === "/about";
  const isContactPage = pathname === "/contact";
  const isHomePage = pathname === "/";
  const isDarkPage = isWorkPage || isAboutPage || isContactPage || isHomePage;
  const menuRef = useRef(null);
  
  const navItems = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Work",
      href: "/work",
    },
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Contact",
      href: "/contact",
    },
  ];

  const socialLinks = [
    {
      title: "LinkedIn",
      href: "https://www.linkedin.com/in/this-is-gaurav-jain/",
    },
    {
      title: "Github",
      href: "https://github.com/gauravjain0377",
    },
    {
      title: "X",
      href: "https://x.com/gauravjain0377",
    },
    {
      title: "Instagram",
      href: "https://www.instagram.com/gauravjain0377/",
    },
  ];

  const handleClose = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (toggleMenu) {
      toggleMenu();
    }
  };

  // Handle escape key only
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        handleClose(event);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [toggleMenu]);

  return (
    <>
      {/* Backdrop overlay for desktop */}
      <div 
        className={styles.backdrop} 
        onClick={handleClose} 
      />
      
      <motion.div
        ref={menuRef}
        variants={menuSlider}
        animate="enter"
        exit="exit"
        initial="initial"
        className={styles.menu}
      >
        <div className={styles.body}>
          <div className={styles.nav}>
            <div className={styles.header}>
              <div className={styles.headerControls}>
                <ThemeToggle />
                <button 
                  onClick={handleClose}
                  className={styles.closeButton}
                  aria-label="Close navigation menu"
                  type="button"
                >
                  <span className={styles.closeIcon}>×</span>
                </button>
              </div>
            </div>

            <div className={styles.navigationSection}>
              <h3 className={styles.sectionTitle}>NAVIGATION</h3>
              <div className={styles.sectionDivider}></div>
              <div className={styles.navLinks}>
                {navItems.map((item, index) => {
                  return <Links key={index} data={{ ...item, index }} onLinkClick={handleClose} />;
                })}
              </div>
            </div>

            <div className={styles.socialsSection}>
              <h3 className={styles.sectionTitle}>SOCIALS</h3>
              <div className={styles.sectionDivider}></div>
              <div className={styles.socialLinks}>
                {socialLinks.map((item, index) => (
                  <a 
                    key={index}
                    href={item.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                  >
                    {item.title}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Curve />
      </motion.div>
    </>
  );
};

export default Navbar;
