export const menuSlider = {
  initial: {
    x: "100%",
  },
  enter: {
    x: "0%",
    transition: {
      duration: 0.28,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: {
    x: "100%",
    transition: {
      duration: 0.22,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const sldier = {
  initial: {
    x: "20px",
    opacity: 0,
  },
  enter: (i) => ({
    x: "0px",
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
      delay: 0.06 * i,
    },
  }),
  exit: (i) => ({
    x: "20px",
    opacity: 0,
    transition: {
      duration: 0.18,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};
