import localFont from "next/font/local";
import "./globals.css";
import ClientLayout from "./ClientLayout";

export const metadata = {
  title: "Gaurav Portfolio",
  description: "Software Engineer Portfolio - Gaurav Jain",
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: "Gaurav Portfolio",
    description: "Software Engineer Portfolio - Gaurav Jain",
    type: "website",
    images: [
      {
        url: "/images/Gaurav_Jain.png",
        width: 400,
        height: 400,
        alt: "Gaurav Jain",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gaurav Portfolio",
    description: "Software Engineer Portfolio - Gaurav Jain",
    images: ["/images/Gaurav_Jain.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={``}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
