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
  
  console.log('🎬 Header component rendered');
  console.log('📍 Pathname:', pathname);
  console.log('🎯 Burger ref:', targertBurger.current);
  console.log('📊 Component state:', { isActive, isMenu });
  
  // Check if we're on the work, about, contact, or home page
  const isWorkPage = pathname === "/work";
  const isAboutPage = pathname === "/about";
  const isContactPage = pathname === "/contact";
  const isHomePage = pathname === "/";
  const isDarkPage = isWorkPage || isAboutPage || isContactPage || isHomePage;

  useLayoutEffect(() => {
    console.log('🔍 Header useLayoutEffect triggered');
    console.log('📍 Current pathname:', pathname);
    console.log('🎯 Burger ref exists:', !!targertBurger.current);
    
    if (!targertBurger.current) {
      console.error('❌ Burger ref is null!');
      return;
    }

    // Only create ScrollTrigger if it doesn't exist or pathname changed
    if (scrollTriggerRef.current && scrollTriggerRef.current.pathname === pathname) {
      console.log('🔄 ScrollTrigger already exists for this pathname, skipping');
      return;
    }

    try {
      gsap.registerPlugin(ScrollTrigger);
      
      // Kill existing ScrollTrigger if it exists
      if (scrollTriggerRef.current?.trigger) {
        console.log('🗑️ Killing existing ScrollTrigger');
        scrollTriggerRef.current.trigger.kill();
      }
      
      // Reset the burger button to initial state
      gsap.set(targertBurger.current, { scale: 0 });
      console.log('🔄 Reset burger scale to 0');
      
      const scrollTrigger = gsap.to(targertBurger.current, {
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top -100px", // Show menu when scrolled 100px down
          end: "bottom top",
          onEnter: () => {
            console.log('⬇️ ScrollTrigger onEnter - Showing menu');
            gsap.to(targertBurger.current, {
              scale: 1,
              duration: 0.25,
              ease: "power1.out",
            });
          },
          onLeaveBack: () => {
            console.log('⬆️ ScrollTrigger onLeaveBack - Hiding menu');
            gsap.to(targertBurger.current, {
              scale: 0, // Hide menu when back at top
              duration: 0.25,
              ease: "power1.out",
            });
          },
          onRefresh: () => {
            console.log('🔄 ScrollTrigger refreshed');
          }
        },
      });

      // Store reference to prevent recreation
      scrollTriggerRef.current = {
        trigger: scrollTrigger.scrollTrigger,
        pathname: pathname
      };

      console.log('✅ ScrollTrigger created successfully');
      console.log('📊 Current scroll position:', window.scrollY);

      // Cleanup function
      return () => {
        console.log('🧹 Cleaning up ScrollTrigger');
        if (scrollTriggerRef.current?.trigger) {
          scrollTriggerRef.current.trigger.kill();
          scrollTriggerRef.current = null;
        }
      };
    } catch (error) {
      console.error('❌ Error in ScrollTrigger setup:', error);
    }
  }, [pathname]); // Reinitialize when pathname changes

  // Monitor scroll events for debugging (reduced frequency)
  useEffect(() => {
    let scrollTimeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        console.log('📜 Scroll position:', window.scrollY);
      }, 100); // Only log every 100ms to reduce noise
    };

    window.addEventListener('scroll', handleScroll);
    console.log('👂 Added scroll listener');

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
      console.log('👂 Removed scroll listener');
    };
  }, []);

  const toggleMenu = () => {
    console.log('🔄 toggleMenu called');
    setMenu((prev) => {
      console.log('📊 Menu state changing from', prev, 'to', !prev);
      return !prev;
    });
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

        <AnimatePresence mode="exit">{isActive && <Navbar />}</AnimatePresence>
      </div>
    </>
  );
};

export default Header;
