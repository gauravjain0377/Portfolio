"use client";
import styles from './stylefooter.module.scss';
import Image from 'next/image';
import RoundedButton from '../../common/roundedbutton';
import { useRef, useState, useEffect } from 'react';
import { useScroll, motion, useTransform, useSpring } from 'framer-motion';
import Magnetic from '../../common/magnetic';
import { useRouter } from 'next/navigation';

export default function Contact() {
    const container = useRef(null);
    const router = useRouter();
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const istTime = new Date(now.getTime() + (5.5 * 60 * 60 * 1000));
            const hours = istTime.getUTCHours();
            const minutes = istTime.getUTCMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const displayHours = hours % 12 || 12;
            setCurrentTime(`${displayHours}:${minutes.toString().padStart(2, '0')} ${ampm} IST`);
        };
        updateTime();
        const interval = setInterval(updateTime, 60000);
        return () => clearInterval(interval);
    }, []);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end end"]
    })
    const x = useTransform(scrollYProgress, [0, 1], [0, 100])
    const y = useTransform(scrollYProgress, [0, 1], [-300, 0])
    const rotate = useTransform(scrollYProgress, [0, 1], [120, 90])

    const handleGetInTouch = () => {
        router.push('/contact');
    };
    
    return (
        <motion.div style={{y}} ref={container} className={styles.contact}>
            <div className={styles.body}>
                <div className={styles.title}>
                    <span>
                        <div className={styles.imageContainer}>
                            <Image 
                            fill={true}
                            alt={"image"}
                            src={`/images/gauravj.png`}
                            />
                        </div>
                        <h2>Let's work together</h2>
                    </span>
                    <motion.div style={{x}} className={styles.buttonContainer}>
                        <RoundedButton backgroundColor={"#334BD3"} className={styles.button} onClick={handleGetInTouch}>
                            <p>Get in touch</p>
                        </RoundedButton>
                    </motion.div>
                    <motion.svg style={{rotate, scale: 2}} width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z" fill="white"/>
                    </motion.svg>
                </div>
                <div className={styles.nav}>
                        <RoundedButton>
                            <p>gjain0229@gmail.com</p>
                        </RoundedButton>
                </div>
                <div className={styles.info}>
                    <div className={styles.infoLeft}>
                        <span>
                            <h3>Version</h3>
                            <p>2026 © Edition</p>
                        </span>
                        {currentTime && (
                            <span>
                                <h3>Local Time</h3>
                                <p>{currentTime}</p>
                            </span>
                        )}
                    </div>
                    <div className={styles.infoRight}>
                        <span>
                            <h3>Socials</h3>
                            <div className={styles.socialRow}>
                                <Magnetic>
                                    <a href="https://www.linkedin.com/in/this-is-gaurav-jain/" target="_blank" rel="noopener noreferrer">
                                        <p>LinkedIn</p>
                                    </a>
                                </Magnetic>
                                <Magnetic>
                                    <a href="https://github.com/gauravjain0377" target="_blank" rel="noopener noreferrer">
                                        <p>Github</p>
                                    </a>
                                </Magnetic>
                                <Magnetic>
                                    <a href="https://x.com/gauravjain0377" target="_blank" rel="noopener noreferrer">
                                        <p>X</p>
                                    </a>
                                </Magnetic>
                                <Magnetic>
                                    <a href="https://www.instagram.com/gauravjain0377/" target="_blank" rel="noopener noreferrer">
                                        <p>Instagram</p>
                                    </a>
                                </Magnetic>
                            </div>
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}