"use client";
import Image from "next/image";
import Styles from "./styleSliderImages.module.scss";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ALL_IMAGES = [
  { src: "portfolio_projects.png",            label: "Projects"           },
  { src: "Stox.png",           label: "StockSathi"    },
  { src: "HackZen.png",        label: "HackZen"       },
  { src: "understanding.png",  label: "Understanding" },
  { src: "StoxPricing.png",    label: "StoxPricing"   },
  { src: "inboxpilotai.png",   label: "InboxPilot AI" },
  { src: "StoxDashboard.png",  label: "Stox Dashboard"},
  { src: "Hackzenhackathon.png", label: "HackZen Hack"},
];

const slider1 = ALL_IMAGES.slice(0, 4);
const slider2 = ALL_IMAGES.slice(4, 8);

const SliderImages = () => {
  const container = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const height = useTransform(scrollYProgress, [0, 1], [120, 0]);

  /* ── Mobile: a simple 2×4 grid ── */
  if (isMobile) {
    return (
      <div ref={container} className={Styles.mobileGrid}>
        {ALL_IMAGES.map((img, i) => (
          <motion.div
            key={img.src}
            className={Styles.mobileCard}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={Styles.mobileCardInner}>
              <Image
                alt={img.label}
                fill
                src={`/images/${img.src}`}
                sizes="45vw"
                quality={80}
                className={Styles.mobileCardImage}
              />
              <div className={Styles.mobileCardOverlay}>
                <span className={Styles.mobileCardLabel}>{img.label}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  /* ── Desktop: original two-row parallax sliders ── */
  return (
    <div ref={container} className={Styles.slidingImages}>
      <motion.div style={{ x: x1 }} className={Styles.slider}>
        {slider1.map((pro, index) => (
          <motion.div
            className={Styles.project}
            key={`s1_${index}`}
            style={{ backgroundColor: "#d6d7dc" }}
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
          >
            <div className={Styles.imageContainer}>
              <Image
                alt={pro.label}
                fill
                src={`/images/${pro.src}`}
                sizes="25vw"
                quality={85}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div style={{ x: x2 }} className={Styles.slider}>
        {slider2.map((pro, index) => (
          <motion.div
            className={Styles.project}
            key={`s2_${index}`}
            style={{ backgroundColor: "#d6d7dc" }}
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
            whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
          >
            <div className={Styles.imageContainer}>
              <Image
                alt={pro.label}
                fill
                src={`/images/${pro.src}`}
                sizes="25vw"
                quality={85}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div style={{ height }} className={Styles.circleContainer}>
        <div className={Styles.circle} />
      </motion.div>
    </div>
  );
};

export default SliderImages;
