import localFont from "next/font/local";
import { headers } from "next/headers";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ClientLayout from "./ClientLayout";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: "no",
  viewportFit: "cover",
};

export async function generateMetadata() {
  const headersList = await headers();
  const protocol = (headersList.get("x-forwarded-proto") ?? "https").split(",")[0].trim();
  const rawHost =
    headersList.get("x-forwarded-host") ??
    headersList.get("host") ??
    "localhost:3000";
  const host = rawHost.split(",")[0].trim();
  const baseUrl = `${protocol}://${host}`;

  return {
    title: {
      default: "Gaurav Jain – Full-Stack Developer",
      template: "%s – Gaurav Jain Portfolio",
    },
    description:
      "Full-stack developer specializing in MERN stack, and Next.js. View my portfolio of innovative projects and cutting-edge web applications.",
    keywords:
      "MERN, Next.js, React, Full-Stack Developer, Portfolio, Gaurav Jain, Software Engineer, Web Development, JavaScript, TypeScript",
    authors: [{ name: "Gaurav Jain" }],
    creator: "Gaurav Jain",
    publisher: "Gaurav Jain",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: "/",
    },
    icons: {
      icon: [
        { url: "/images/gauravj.png", type: "image/png", sizes: "32x32" },
        { url: "/favicon.svg", type: "image/svg+xml" },
      ],
      apple: "/images/gauravj.png",
      shortcut: "/images/gauravj.png",
    },
    metadataBase: new URL(baseUrl),
    openGraph: {
      type: "website",
      locale: "en_US",
      url: baseUrl,
      siteName: "Gaurav Jain Portfolio",
      title: "Gaurav Jain - Full-Stack Developer",
      description:
        "Full-stack developer specializing in MERN stack, and Next.js. View my portfolio of innovative projects and cutting-edge web applications.",
      images: [
        {
          url: "/images/og-image.png?v=1",
          width: 1200,
          height: 630,
          alt: "Gaurav Jain - Full-Stack Developer",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Gaurav Jain – Full-Stack Developer",
      description:
        "Full-stack developer specializing in MERN stack, and Next.js. View my portfolio of innovative projects and cutting-edge web applications.",
      images: ["/images/og-image.png?v=1"],
      creator: "@gauravjain0377",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "your-google-verification-code",
      yandex: "your-yandex-verification-code",
      yahoo: "your-yahoo-verification-code",
    },
  };
}

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
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en" data-theme="light">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/images/gauravj.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/gauravj.png" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body className={`${displayFont.variable} ${heroFont.variable}`}>
        {gaMeasurementId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-config" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaMeasurementId}');
              `}
            </Script>
          </>
        )}
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
