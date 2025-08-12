export const menuSlider = {
  initial: {
    x: "100%",
    opacity: 0,
  },
  enter: {
    x: "0%",
    opacity: 1,
    transition: { 
      duration: 0.5, 
      ease: [0.4, 0, 0.2, 1],
      staggerChildren: 0.1
    },
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: { 
      duration: 0.4, 
      ease: [0.4, 0, 0.2, 1] 
    },
  },
};

export const sldier = {
  initial: {
    x: "30px",
    opacity: 0,
  },
  enter: (i) => ({
    x: "0px",
    opacity: 1,
    transition: { 
      duration: 0.5, 
      ease: [0.4, 0, 0.2, 1], 
      delay: 0.1 * i 
    },
  }),
  exit: (i) => ({
    x: "30px",
    opacity: 0,
    transition: { 
      duration: 0.3, 
      ease: [0.4, 0, 0.2, 1] 
    },
  }),
};
