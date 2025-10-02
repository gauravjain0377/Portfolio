import Hero from "@/components/hero/Hero";
import Project from "@/components/project";
import styles from "./page.module.scss";
import Decs from "@/components/descripction/Decs";
import SliderImages from "@/components/sliderImages/SliderImages";
import Contact from "@/components/contact/Contact";

export const metadata = {
  title: "Gaurav Jain – Full-Stack Developer",
  description: "Full-stack developer specializing in MERN stack, and Next.js. View my portfolio of innovative projects and cutting-edge web applications.",
  keywords: "MERN, Next.js, React, Full-Stack Developer, Portfolio, Gaurav Jain, Software Engineer, Web Development",
  author: "Gaurav Jain",
  openGraph: {
    title: "Gaurav Jain – Full-Stack Developer",
    description: "Full-stack developer specializing in MERN stack, and Next.js. View my portfolio of innovative projects and cutting-edge web applications.",
    url: "/",
    siteName: "Gaurav Jain Portfolio",
    images: [
      {
        url: "/images/gauravj.png",
        width: 400,
        height: 400,
        alt: "Gaurav Jain - Full-Stack Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gaurav Jain – Full-Stack Developer",
    description: "Full-stack developer specializing in MERN stack, and Next.js. View my portfolio of innovative projects and cutting-edge web applications.",
    images: ["/images/gauravj.png"],
    creator: "@gauravjain0377",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <Hero />
        <Decs/>
        <Project />
        <SliderImages/>
        <Contact/>
      </main>
    </>
  );
}
