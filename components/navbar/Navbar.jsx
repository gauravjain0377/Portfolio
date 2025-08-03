import styles from "./stylenavbar.module.scss";
import Links from "./link";
import { motion } from "framer-motion";
import { menuSlider } from "./anima";
import Curve from "./curve/Curve";
import { usePathname } from "next/navigation";

const Navbar = ({ toggleMenu }) => {
  const pathname = usePathname();
  const isWorkPage = pathname === "/work";
  const isAboutPage = pathname === "/about";
  const isContactPage = pathname === "/contact";
  const isHomePage = pathname === "/";
  const isDarkPage = isWorkPage || isAboutPage || isContactPage || isHomePage;
  
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
  return (
    <motion.div
      variants={menuSlider}
      animate="enter"
      exit="exit"
      initial="initial"
      className={styles.menu}
    >
      <div className={styles.body}>
        <div className={styles.nav}>
          <div className={styles.header}>
            <p>Navigation Menu</p>
            <button onClick={toggleMenu} className={styles.closeButton}>
              ×
            </button>
          </div>

          {navItems.map((item, index) => {
            return <Links key={index} data={{ ...item, index }} onLinkClick={toggleMenu} />;
          })}
        </div>
        <div className={styles.footer}>
          <a href="https://www.linkedin.com/in/this-is-gaurav-jain/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com/gauravjain0377" target="_blank" rel="noopener noreferrer">Github</a>
          <a href="https://x.com/gauravjain0377" target="_blank" rel="noopener noreferrer">X</a>
          <a href="https://www.instagram.com/gauravjain0377/" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </div>
      <Curve />
    </motion.div>
  );
};

export default Navbar;
