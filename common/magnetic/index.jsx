import React, { useRef, useCallback, useEffect } from "react";

const Magnetic = ({ children, strength = 0.15 }) => {
  const magneticRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!magneticRef.current) return;
    
    const { clientX, clientY } = e;
    const { height, width, top, left } = magneticRef.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * strength;
    const y = (clientY - (top + height / 2)) * strength;
    
    // Use CSS transform instead of GSAP for better performance
    magneticRef.current.style.transform = `translate(${x}px, ${y}px)`;
  }, [strength]);

  const handleMouseLeave = useCallback(() => {
    if (!magneticRef.current) return;
    magneticRef.current.style.transform = 'translate(0px, 0px)';
  }, []);

  useEffect(() => {
    const element = magneticRef.current;
    if (!element) return;

    // Add event listeners
    element.addEventListener('mousemove', handleMouseMove, { passive: true });
    element.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    // Cleanup
    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return React.cloneElement(children, { 
    ref: magneticRef,
    style: {
      ...children.props.style,
      transition: 'transform 0.1s ease-out',
      willChange: 'transform'
    }
  });
};

export default Magnetic;
