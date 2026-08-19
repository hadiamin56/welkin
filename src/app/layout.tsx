import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/site/site-chrome";
import { getSiteSettings } from "@/lib/queries";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: `${settings.school_name} — ${settings.tagline}`,
    description: `${settings.school_name} ${settings.tagline} — academic excellence, strong values and holistic growth.`,
    manifest: "/manifest.webmanifest",
    themeColor: "#0a1631",
    icons: { icon: "/favicon.ico", apple: "/icons/icon-192.png" },
    appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: settings.school_name },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const settings = await getSiteSettings();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: settings.school_name,
    alternateName: "SRM Welkin Higher Secondary School",
    description: `${settings.tagline} — academic excellence, strong values and holistic growth.`,
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://srmwelkin.com",
    logo: settings.logo_url,
    telephone: settings.phone,
    email: settings.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address,
      addressLocality: "Sopore",
      addressRegion: "Jammu and Kashmir",
      addressCountry: "IN",
    },
    sameAs: [settings.facebook_url, settings.linkedin_url, settings.twitter_url].filter(
      (u) => u && u !== "#"
    ),
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[var(--background)]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SiteChrome settings={settings}>{children}</SiteChrome>
      </body>
    </html>
  );
}
