import localFont from "next/font/local";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import CustomCursor from "../components/customCursor/CustomCursor";

export const metadata = {
  title: "Gaurav Portfolio",
  description: "Software Engineer Portfolio - Gaurav Jain",
  viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover",
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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className={``}>
        <CustomCursor />
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
