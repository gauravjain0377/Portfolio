import localFont from "next/font/local";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";

export const metadata = {
  title: {
    default: "Gaurav Jain – Full-Stack Developer",
    template: "%s – Gaurav Jain Portfolio"
  },
  description: "Full-stack developer specializing in MERN stack, and Next.js. View my portfolio of innovative projects and cutting-edge web applications.",
  keywords: "MERN, Next.js, React, Full-Stack Developer, Portfolio, Gaurav Jain, Software Engineer, Web Development, JavaScript, TypeScript",
  authors: [{ name: "Gaurav Jain" }],
  creator: "Gaurav Jain",
  publisher: "Gaurav Jain",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.gaurav-jain.me"),
  alternates: {
    canonical: "/",
  },
  viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover",
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.gaurav-jain.me",
    siteName: "Gaurav Jain Portfolio",
    title: "Gaurav Jain - Full-Stack Developer",
    description: "Full-stack developer specializing in MERN stack, and Next.js. View my portfolio of innovative projects and cutting-edge web applications.",
    images: [
      {
        url: "/images/Gaurav_Jain.png",
        width: 400,
        height: 400,
        alt: "Gaurav Jain - Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gaurav Jain – Full-Stack Developer",
    description: "Full-stack developer specializing in MERN stack, and Next.js. View my portfolio of innovative projects and cutting-edge web applications.",
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
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
};

const displayFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const heroFont = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-hero",
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body className={`${displayFont.variable} ${heroFont.variable}`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
