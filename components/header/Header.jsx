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

const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const [isMenu, setMenu] = useState(false);
  const targertBurger = useRef(null);
  const pathname = usePathname();
  const scrollTriggerRef = useRef(null);
  

  
  // Check if we're on the work, about, contact, or home page
  const isWorkPage = pathname === "/work";
  const isAboutPage = pathname === "/about";
  const isContactPage = pathname === "/contact";
  const isHomePage = pathname === "/";
  const isDarkPage = isWorkPage || isAboutPage || isContactPage || isHomePage;

  useLayoutEffect(() => {
    if (!targertBurger.current) {
      return;
    }

    // Only create ScrollTrigger if it doesn't exist or pathname changed
    if (scrollTriggerRef.current && scrollTriggerRef.current.pathname === pathname) {
      return;
    }

    // Small delay to ensure page transition is complete before setting up ScrollTrigger
    const setupDelay = pathname === "/" ? 1000 : 500; // Much longer delay to ensure transition is complete

    try {
      gsap.registerPlugin(ScrollTrigger);
      
      // Kill existing ScrollTrigger if it exists
      if (scrollTriggerRef.current?.trigger) {
        scrollTriggerRef.current.trigger.kill();
      }
      
      // Reset the burger button to initial state
      gsap.set(targertBurger.current, { scale: 0 });
      
      // Create a robust scroll-based approach
      let isMenuVisible = false;
      
      const handleScroll = () => {
        const scrollY = window.scrollY;
        
        if (scrollY > 100 && !isMenuVisible) {
          isMenuVisible = true;
          gsap.to(targertBurger.current, {
            scale: 1,
            duration: 0.25,
            ease: "power1.out",
          });
        } else if (scrollY <= 100 && isMenuVisible) {
          isMenuVisible = false;
          gsap.to(targertBurger.current, {
            scale: 0,
            duration: 0.25,
            ease: "power1.out",
          });
        }
      };

      setTimeout(() => {
        // Add scroll listener
        window.addEventListener('scroll', handleScroll);

        // Check initial scroll position
        setTimeout(() => {
          handleScroll();
        }, 100);

        // Create ScrollTrigger for compatibility
        const scrollTrigger = gsap.to(targertBurger.current, {
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top -100px",
            end: "bottom top",
            onEnter: () => {
              gsap.to(targertBurger.current, {
                scale: 1,
                duration: 0.25,
                ease: "power1.out",
              });
            },
            onLeaveBack: () => {
              gsap.to(targertBurger.current, {
                scale: 0,
                duration: 0.25,
                ease: "power1.out",
              });
            }
          },
        });

        // Store reference to prevent recreation
        scrollTriggerRef.current = {
          trigger: scrollTrigger.scrollTrigger,
          pathname: pathname
        };
      }, setupDelay);

      // Cleanup function
      return () => {
        if (scrollTriggerRef.current?.trigger) {
          scrollTriggerRef.current.trigger.kill();
          scrollTriggerRef.current = null;
        }
        // Remove manual scroll listener
        window.removeEventListener('scroll', handleScroll);
      };
    } catch (error) {
      console.error('❌ Error in ScrollTrigger setup:', error);
    }
  }, [pathname]); // Reinitialize when pathname changes

  

  const toggleMenu = () => {
    setMenu((prev) => !prev);
  };
  
  return (
    <>
      <div className={`${style.header} ${isDarkPage ? style.workHeader : ''}`}>
        <Megnatic>
          <div className={style.logo}>
            <p className={style.copyright}>©</p>
            <div className={style.name}>
              <p className={style.codeby}>Code by</p>
                              <p className={style.gaurav}>Gaurav</p>
                <p className={style.jain}>Jain</p>
            </div>
          </div>
        </Megnatic>

        <div className={style.navContainer}>
          <Megnatic>
            <div className={`${style.menuName}`} onClick={toggleMenu}>
              <p>Menu</p>
              <div className={style.MenuEndicator}></div>
            </div>
          </Megnatic>

          <AnimatePresence mode="exit">
            {isMenu && <Navbar toggleMenu={toggleMenu} />}
          </AnimatePresence>
          
          <div className={`${style.nav} ${isMenu ? style.shownav : ""}`}>
            {(isWorkPage || isAboutPage || isContactPage) && (
              <Megnatic>
                <Link href="/" className={style.el}>
                  <p>Home</p>
                  <div className={style.endicator}></div>
                </Link>
              </Megnatic>
            )}
            <Megnatic>
              <Link href="/work" className={style.el}>
                <p>Work</p>
                <div className={style.endicator}></div>
              </Link>
            </Megnatic>
            <Megnatic>
              <Link href="/about" className={style.el}>
                <p>About</p>
                <div className={style.endicator}></div>
              </Link>
            </Megnatic>
            <Megnatic>
              <Link href="/contact" className={style.el}>
                <p>Contact</p>
                <div className={style.endicator}></div>
              </Link>
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

        <div ref={targertBurger} className={style.headerButtonContainer}>
          <Buttonx
            onClick={() => {
              setIsActive(!isActive);
            }}
            className={style.button}
          >
            <div
              className={`${style.burger} ${
                isActive ? style.burgerActive : ""
              }`}
            ></div>
          </Buttonx>
        </div>

        <AnimatePresence mode="exit">{isActive && <Navbar toggleMenu={() => setIsActive(false)} />}</AnimatePresence>
      </div>
    </>
  );
};

export default Header;
