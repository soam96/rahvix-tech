import type { Metadata } from "next";
import "./globals.css";
import FloatingSocials from "@/components/FloatingSocials";

export const metadata: Metadata = {
  title: "Rahvix Technologies - Premium IT Solutions, Digital Marketing & AI Automation Agency",
  description: "Dominating digital growth. Rahvix Technologies delivers next-gen AI automation pipelines, elite custom software development, and hyper-targeted performance digital marketing for scale.",
  keywords: [
    "AI Automation Agency",
    "Custom CRM Development",
    "Enterprise IT Solutions",
    "Web Development",
    "App Development",
    "Google Maps SEO",
    "Social Media Marketing",
    "Performance Digital Marketing",
    "UGC Ads Production",
    "Cinematic Video Shooting",
    "Video Editing",
    "Premium Branding Agency",
    "Rahvix Technologies",
    "Rahvix"
  ],
  authors: [{ name: "Rahvix Technologies" }],
  creator: "Rahvix Technologies",
  publisher: "Rahvix Technologies",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://rahvix.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Rahvix Technologies - Premium IT Solutions & AI Automation",
    description: "Next-gen AI automation, elite web development, and performance digital marketing engineered to scale enterprise operations.",
    url: "https://rahvix.com",
    siteName: "Rahvix Technologies",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://rahvix.com/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Rahvix Technologies — AI & Digital Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rahvix Technologies - End-to-End Digital & AI Solutions",
    description: "Transforming businesses with next-gen AI automation, elite web development, and hyper-targeted performance marketing.",
    creator: "@rahvix_tech",
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
};

// JSON-LD Organization schema for SEO rich results
const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Rahvix Technologies",
  url: "https://rahvix.com",
  logo: "https://rahvix.com/logo.jpg",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-913913-8170",
    contactType: "customer service",
    areaServed: "IN",
    availableLanguage: ["English", "Hindi"],
  },
  sameAs: [
    "https://www.linkedin.com/company/rahvix-technologies",
    "https://twitter.com/rahvix_tech",
    "https://www.instagram.com/rahvix.tech",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased scroll-smooth"
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect to Google Fonts CDN to eliminate render-blocking */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Preload logo — appears in both LoadingScreen + Navbar, critical for FCP */}
        <link rel="preload" href="/logo.jpg" as="image" type="image/jpeg" />
        {/* Mobile browser chrome tinting */}
        <meta name="theme-color" content="#06152d" />
        {/* JSON-LD Organization schema for SEO rich results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)] selection:bg-brand-orange/10 selection:text-brand-orange">
        {/* Global tactile noise texture (display:none — kept for potential future use) */}
        <div className="noise-bg" />
        {children}
        <FloatingSocials />
      </body>
    </html>
  );
}
