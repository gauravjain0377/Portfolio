"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import style from "./styleheader.module.scss";
import Navbar from "../navbar/Navbar";
import { AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Megnatic from "../../common/magnetic";
import Buttonx from "../../common/roundedbutton";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "../themeToggle/ThemeToggle";
import { useTheme } from "../../hooks/useTheme";
import { usePageTransition } from "../../hooks/usePageTransition";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const targertBurger = useRef(null);
  const headerRef = useRef(null);
  const pathname = usePathname();
  const scrollTriggerRef = useRef(null);
  const { theme } = useTheme();
  const { navigateWithPreloader } = usePageTransition();
  
  // Check if we're on the work, about, contact, or home page
  const isWorkPage = pathname === "/work";
  const isAboutPage = pathname === "/about";
  const isContactPage = pathname === "/contact";
  const isHomePage = pathname === "/";
  const isDarkPage = isWorkPage || isAboutPage || isContactPage || isHomePage;

  // Check if screen is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!targertBurger.current) {
      return;
    }

    // Reset the burger button to initial state - hidden by default
    gsap.set(targertBurger.current, { opacity: 0, visibility: 'hidden' });
    
    // Create a simple scroll-based approach
    let isMenuVisible = false;
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Show burger button and hide main nav when scrolled down on desktop
      if (scrollY > 30 && !isMobile) {
        if (!isMenuVisible) {
          isMenuVisible = true;
          gsap.to(targertBurger.current, {
            opacity: 1,
            visibility: 'visible',
            duration: 0.25,
            ease: "power1.out",
          });
        }
        setIsHeaderHidden(true);
      } else {
        if (isMenuVisible) {
          isMenuVisible = false;
          gsap.to(targertBurger.current, {
            opacity: 0,
            visibility: 'hidden',
            duration: 0.25,
            ease: "power1.out",
          });
        }
        setIsHeaderHidden(false);
      }
    };

    // Add scroll listener
    window.addEventListener('scroll', handleScroll);

    // Check initial scroll position
    handleScroll();

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile]); // Re-run when mobile state changes

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      // Lock body scroll
      const originalStyle = window.getComputedStyle(document.body);
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollBarWidth}px`;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${window.scrollY}px`;
      document.body.style.width = '100%';
      
    } else {
      // Restore body scroll
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      
      // Restore scroll position
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
      
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [isMenuOpen]);

  // Close menu when pressing Escape only
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMenuOpen]);

  return (
    <>
      <div ref={headerRef} className={`${style.header} ${isDarkPage ? style.workHeader : ''} ${isHeaderHidden ? style.hidden : ''}`}>
        <Megnatic>
          <div className={style.logo} onClick={() => navigateWithPreloader("/")}>
            <p className={style.copyright}>©</p>
            <div className={style.name}>
              <p className={style.codeby}>Code by</p>
              <p className={style.gaurav}>Gaurav</p>
              <p className={style.jain}>Jain</p>
            </div>
          </div>
        </Megnatic>

        <div className={style.navContainer}>
          {/* Menu button - only show on mobile */}
          {isMobile && (
            <Megnatic>
              <div className={`${style.menuName}`} onClick={toggleMenu}>
                <p>Menu</p>
                <div className={style.MenuEndicator}></div>
              </div>
            </Megnatic>
          )}
          
          {/* Desktop navigation - hide on mobile */}
          <div className={`${style.nav} ${isMenuOpen ? style.shownav : ""}`}>
            {(isWorkPage || isAboutPage || isContactPage) && (
              <Megnatic>
                <div className={style.el} onClick={() => navigateWithPreloader("/")}>
                  <p>Home</p>
                  <div className={style.endicator}></div>
                </div>
              </Megnatic>
            )}
            <Megnatic>
              <div className={style.el} onClick={() => navigateWithPreloader("/work")}>
                <p>Work</p>
                <div className={style.endicator}></div>
              </div>
            </Megnatic>
            <Megnatic>
              <div className={style.el} onClick={() => navigateWithPreloader("/about")}>
                <p>About</p>
                <div className={style.endicator}></div>
              </div>
            </Megnatic>
            <Megnatic>
              <div className={style.el} onClick={() => navigateWithPreloader("/contact")}>
                <p>Contact</p>
                <div className={style.endicator}></div>
              </div>
            </Megnatic>
            <Megnatic>
              <div className={style.el}>
                <p>
                  <ThemeToggle />
                </p>
              </div>
            </Megnatic>
          </div>
        </div>

        {/* Burger button - only show when scrolling on desktop */}
        <div ref={targertBurger} className={style.headerButtonContainer}>
          <Buttonx
            onClick={toggleMenu}
            className={style.button}
            // Remove backgroundColor prop to prevent interference with accent color hover
            // backgroundColor={theme === 'dark' ? '#ffffff' : '#000000'}
          >
            <div
              className={`${style.burger} ${
                isMenuOpen ? style.burgerActive : ""
              }`}
            ></div>
          </Buttonx>
        </div>

        <AnimatePresence mode="wait">
          {isMenuOpen && <Navbar key="navbar" toggleMenu={toggleMenu} />}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Header;