"use client";

import { useEffect, useRef } from 'react';
import styles from './CustomCursor.module.scss';

const CustomCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    
    // Check if device supports touch
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Hide cursor on touch devices
    if (isTouchDevice) {
      if (cursor) {
        cursor.style.display = 'none';
      }
      return; // Don't set up mouse events on touch devices
    }
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const updateCursor = () => {
      const dx = mouseX - cursorX;
      const dy = mouseY - cursorY;
      
      cursorX += dx * 0.1;
      cursorY += dy * 0.1;
      
      if (cursor) {
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
      }
      
      requestAnimationFrame(updateCursor);
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseEnter = () => {
      if (cursor) {
        cursor.style.opacity = '1';
      }
    };

    const handleMouseLeave = () => {
      if (cursor) {
        cursor.style.opacity = '0';
      }
    };

    // Add hover effects for interactive elements
    const handleElementHover = () => {
      if (cursor) {
        cursor.classList.add(styles.hover);
      }
    };

    const handleElementLeave = () => {
      if (cursor) {
        cursor.classList.remove(styles.hover);
      }
    };

    // Handle click events
    const handleMouseDown = () => {
      if (cursor) {
        cursor.classList.add(styles.click);
      }
    };

    const handleMouseUp = () => {
      if (cursor) {
        cursor.classList.remove(styles.click);
      }
    };

    // Add event listeners only for non-touch devices
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, [role="button"], .interactive');
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleElementHover);
      element.addEventListener('mouseleave', handleElementLeave);
    });

    // Start the animation loop
    updateCursor();

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleElementHover);
        element.removeEventListener('mouseleave', handleElementLeave);
      });
    };
  }, []);

  return (
    <div 
      ref={cursorRef}
      className={styles.customCursor}
    />
  );
};

export default CustomCursor; 