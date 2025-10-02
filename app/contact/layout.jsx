export const metadata = {
  title: "Contact – Gaurav Jain Portfolio",
  description: "Get in touch with Gaurav Jain for collaboration opportunities, project inquiries, or professional discussions. Available for Web3, Blockchain, and full-stack development projects.",
  keywords: "Contact Gaurav Jain, Web3 Developer Contact, Blockchain Developer, Full-Stack Developer, Project Collaboration, Hire Developer",
  author: "Gaurav Jain",
  openGraph: {
    title: "Contact – Gaurav Jain Portfolio",
    description: "Get in touch with Gaurav Jain for collaboration opportunities, project inquiries, or professional discussions. Available for Web3, Blockchain, and full-stack development projects.",
    url: "/contact",
    siteName: "Gaurav Jain Portfolio",
    images: [
      {
        url: "/images/gauravj.png",
        width: 400,
        height: 400,
        alt: "Contact Gaurav Jain - Full-Stack Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact – Gaurav Jain Portfolio",
    description: "Get in touch with Gaurav Jain for collaboration opportunities, project inquiries, or professional discussions. Available for Web3, Blockchain, and full-stack development projects.",
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

export default function ContactLayout({ children }) {
  return children;
} 