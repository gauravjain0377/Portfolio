import Works from "@/components/works/Works";
import Contact from "@/components/contact/Contact";
import styles from "./page.module.scss";

export const metadata = {
  title: "Work – Gaurav Jain Portfolio",
  description: "Explore my portfolio of Web3, Blockchain, and full-stack development projects. View case studies, technologies used, and innovative solutions I've built.",
  keywords: "Gaurav Jain Projects, Web3 Projects, Blockchain Projects, Full-Stack Development, Portfolio Projects, Case Studies, Web Development",
  author: "Gaurav Jain",
  openGraph: {
    title: "Work – Gaurav Jain Portfolio",
    description: "Explore my portfolio of Web3, Blockchain, and full-stack development projects. View case studies, technologies used, and innovative solutions I've built.",
    url: "https://www.gaurav-jain.me/work",
    siteName: "Gaurav Jain Portfolio",
    images: [
      {
        url: "/images/Gaurav_Jain.png",
        width: 400,
        height: 400,
        alt: "Work Portfolio - Gaurav Jain Projects",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Work – Gaurav Jain Portfolio",
    description: "Explore my portfolio of Web3, Blockchain, and full-stack development projects. View case studies, technologies used, and innovative solutions I've built.",
    images: ["/images/Gaurav_Jain.png"],
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

const WorkPage = () => {
  return (
    <main className={styles.main}>
      <Works />
      <div style={{ height: '200px' }}></div> {/* Spacer to ensure separation */}
      <Contact />
    </main>
  );
};

export default WorkPage; 