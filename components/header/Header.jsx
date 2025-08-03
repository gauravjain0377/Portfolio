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
  
  // Check if we're on the work, about, contact, or home page
  const isWorkPage = pathname === "/work";
  const isAboutPage = pathname === "/about";
  const isContactPage = pathname === "/contact";
  const isHomePage = pathname === "/";
  const isDarkPage = isWorkPage || isAboutPage || isContactPage || isHomePage;

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(targertBurger.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        start: 0,
        end: window.innerHeight,
        onLeave: () => {
          gsap.to(targertBurger.current, {
            scale: 1,
            duration: 0.25,
            ease: "power1.out",
          });
        },
        onEnterBack: () => {
          gsap.to(targertBurger.current, {
            scale: 0,
            duration: 0.25,
            ease: "power1.out",
          });
        },
      },
    });
  }, []);

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

        <AnimatePresence mode="exit">{isActive && <Navbar />}</AnimatePresence>
      </div>
    </>
  );
};

export default Header;
