import Link from "next/link";
import stylesLINK from "./stylelink.module.scss";
import { menuSlider, sldier } from "../anima";
import { motion } from "framer-motion";

const index = ({ data, onLinkClick }) => {
  const handleClick = () => {
    if (onLinkClick) {
      onLinkClick();
    }
  };

  return (
    <motion.div
      custom={data.index}
      variants={sldier}
      animate="enter"
      exit="exit"
      initial="initial"
      className={stylesLINK.link}
    >
      <Link href={data.href} onClick={handleClick}>
        {data.title}
      </Link>
    </motion.div>
  );
};

export default index;
