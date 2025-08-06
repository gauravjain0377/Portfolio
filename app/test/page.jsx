export const metadata = {
  title: "Test – Gaurav Jain Portfolio",
  description: "Test page for routing verification in Gaurav Jain's portfolio website. This page is used for development and testing purposes.",
  keywords: "Test Page, Portfolio Test, Development Test, Routing Test, Gaurav Jain Portfolio",
  author: "Gaurav Jain",
  openGraph: {
    title: "Test – Gaurav Jain Portfolio",
    description: "Test page for routing verification in Gaurav Jain's portfolio website. This page is used for development and testing purposes.",
    url: "https://www.gaurav-jain.me/test",
    siteName: "Gaurav Jain Portfolio",
    images: [
      {
        url: "/images/Gaurav_Jain.png",
        width: 400,
        height: 400,
        alt: "Test Page - Gaurav Jain Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Test – Gaurav Jain Portfolio",
    description: "Test page for routing verification in Gaurav Jain's portfolio website. This page is used for development and testing purposes.",
    images: ["/images/Gaurav_Jain.png"],
    creator: "@gauravjain0377",
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

const TestPage = () => {
  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>Test Page</h1>
      <p>This is a test page to check if routing works.</p>
    </div>
  );
};

export default TestPage; 