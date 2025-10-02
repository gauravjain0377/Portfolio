import About from "@/components/about/About";
import Contact from "@/components/contact/Contact";
import styles from "./page.module.scss";

export const metadata = {
  title: "About – Gaurav Jain Portfolio",
  description: "Learn more about Gaurav Jain, a passionate full-stack developer with expertise in Web3, Blockchain, and modern web technologies. Discover my journey, skills, and experience.",
  keywords: "About Gaurav Jain, Web3 Developer, Blockchain Developer, Full-Stack Developer, Software Engineer, Portfolio, Skills, Experience",
  author: "Gaurav Jain",
  openGraph: {
    title: "About – Gaurav Jain Portfolio",
    description: "Learn more about Gaurav Jain, a passionate full-stack developer with expertise in Web3, Blockchain, and modern web technologies. Discover my journey, skills, and experience.",
    url: "/about",
    siteName: "Gaurav Jain Portfolio",
    images: [
      {
        url: "/images/gauravj.png",
        width: 400,
        height: 400,
        alt: "About Gaurav Jain - Full-Stack Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About – Gaurav Jain Portfolio",
    description: "Learn more about Gaurav Jain, a passionate full-stack developer with expertise in Web3, Blockchain, and modern web technologies. Discover my journey, skills, and experience.",
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

const AboutPage = () => {
  return (
    <main className={styles.main}>
      <About />
      <div style={{ height: '200px' }}></div> {/* Spacer to ensure separation */}
      <Contact />
    </main>
  );
};

export default AboutPage; 