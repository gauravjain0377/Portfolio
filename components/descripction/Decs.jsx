"use client";
import { motion, useInView } from "framer-motion";
import Styles from "./styledesc.module.scss";
import { opacity, sildeUp } from "./anime";
import { useRef } from "react";
import Button from "../../common/roundedbutton";
import Link from "next/link";

const Decs = () => {
  const container = useRef(null);
  const isInView = useInView(container);

  const param =
    "A creative technologist and software engineer. I build sleek, performant, and user-first digital products that stand out. Blending design thinking with full-stack development, I aim to redefine what software can feel like.";
  return (
    <div ref={container} className={Styles.dec}>
      <div className={Styles.body}>
        <p>
          {param.split(" ").map((word, index) => {
            return (
              <span key={index} className={Styles.mask}>
                <motion.span
                  variants={sildeUp}
                  initial="initial"
                  animate={isInView ? "open" : "closed"}
                  custom={index}
                >
                  {word}
                </motion.span>
              </span>
            );
          })}
        </p>
       
        <div data-scroll data-scroll-speed={0.1}>
          <Link href="/about">
            <Button className={Styles.button}>
              <p style={{color:"white"}}>About Me</p>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Decs;
