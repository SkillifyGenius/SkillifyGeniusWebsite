import type { Metadata } from "next";

export const SITE_URL = "https://www.skillifygenius.com";

export function pageMetadata(path: string, title: string, description: string): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: "Skillify Genius", type: "website", images: [{ url: `${SITE_URL}/og_preview.png` }] },
    twitter: { card: "summary_large_image", title, description, images: [`${SITE_URL}/og_preview.png`] },
  };
}
