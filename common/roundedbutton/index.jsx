import styles from "./styleroundedbutton.module.scss";
import Magnetic from "../magnetic";
import { useRef, useCallback } from "react";

const RoundedButton = ({ children, backgroundColor = "var(--accent-color)", ...attributes }) => {
  const circleRef = useRef(null);

  const handleMouseEnter = useCallback(() => {
    if (!circleRef.current) return;
    circleRef.current.style.top = "-25%";
    circleRef.current.style.width = "150%";
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!circleRef.current) return;
    circleRef.current.style.top = "-150%";
    circleRef.current.style.width = "125%";
  }, []);

  return (
    <Magnetic strength={0.1}>
      <div
        className={styles.roundedButton}
        style={{ overflow: "hidden" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...attributes}
      >
        {children}
        <div
          ref={circleRef}
          style={{ backgroundColor }}
          className={styles.circle}
        ></div>
      </div>
    </Magnetic>
  );
};

export default RoundedButton;
