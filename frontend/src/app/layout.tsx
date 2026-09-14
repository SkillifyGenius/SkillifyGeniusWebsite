import type { Metadata } from "next";
import "@/index.css";
import { ClientShell } from "@/components/layout/ClientShell";
import { SITE_URL } from "@/lib/site-metadata";
import { contact } from "@/lib/contact";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Skillify Genius | Customized 1:1 Technology Mentorship", template: "%s | Skillify Genius" },
  description: "Elite 1:1 technology and coding mentorship focused on problem solving, self-learning, and digital safety.",
  icons: { icon: "/favicon.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EducationalOrganization",
        "@id": `${SITE_URL}/#organization`,
        name: "Skillify Genius",
        url: SITE_URL,
        description: "Personalized 1:1 technology and coding education.",
        email: contact.email,
        telephone: contact.phoneHref.slice(4),
      },
      { "@type": "WebSite", "@id": `${SITE_URL}/#website`, name: "Skillify Genius", url: SITE_URL, publisher: { "@id": `${SITE_URL}/#organization` }, inLanguage: "en" },
    ],
  };

  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#0a6b4b" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800;900&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      </head>
      <body><ClientShell>{children}</ClientShell></body>
    </html>
  );
}
