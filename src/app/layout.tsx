import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProductFeedbackWidget } from "@/components/shared/ProductFeedbackWidget";
import { FloatingContactWidget } from "@/components/shared/FloatingContactWidget";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.skillifygenius.com"),
  title: {
    default: "Skillify Genius - Future Skills Academy for Ages 6-18",
    template: "%s | Skillify Genius",
  },
  description:
    "Founder-led future skills academy where young minds learn to think, build, automate, and solve real-world problems using technology.",
  keywords: [
    "coding for kids",
    "python logic for teens",
    "ai literacy for students",
    "stem coding classes online",
    "computational thinking",
    "problem solver framework",
    "ethical hacking for teens"
  ],
  authors: [{ name: "Skillify Genius Founder" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.skillifygenius.com",
    siteName: "Skillify Genius",
    title: "Skillify Genius - Where Young Minds Learn to Think & Build",
    description: "Developing problem solving, self-learning, engineering habits, and AI literacy for ages 6-18 across USA, UK, Canada, and Europe.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=80",
        width: 1200,
        height: 630,
        alt: "Skillify Genius Future Skills Academy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Skillify Genius - Future Skills Academy",
    description: "Cultivating independent thinkers, creators, and AI innovators aged 6-18.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLdOrg = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Skillify Genius",
    "url": "https://www.skillifygenius.com",
    "logo": "https://www.skillifygenius.com/logo.png",
    "description": "Founder-led future skills academy where children aged 6-18 learn to think, create, automate, and solve real-world problems using technology.",
    "founder": {
      "@type": "Person",
      "name": "Founder - Skillify Genius",
      "jobTitle": "Technology Educator, Software Development Practitioner & Personalized Learning Architect",
      "description": "Teaching coding since 2013 with students across 20+ countries, active software engineering collaborator, and recipient of national Android development recognition."
    },
    "areaServed": [
      { "@type": "Country", "name": "United States" },
      { "@type": "Country", "name": "United Kingdom" },
      { "@type": "Country", "name": "Canada" },
      { "@type": "Country", "name": "Germany" }
    ]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] font-sans antialiased">
        <AuthProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <ProductFeedbackWidget />
          <FloatingContactWidget />
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
