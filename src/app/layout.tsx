import type { Metadata } from "next";
import { business } from "@/config/business";
import "./globals.css";

const title = `${business.name} | Premium Car Detailing in ${business.locality}`;

// Netlify sets these at build time. Link previews need a full image URL,
// and deploy previews should point at their own copy of the image.
const siteUrl =
  (process.env.CONTEXT === "production"
    ? process.env.URL
    : process.env.DEPLOY_PRIME_URL) ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description: business.description,
  robots: { index: false, follow: false }, // Demo business; remove when real details are supplied.
  // The preview card shown when the link is shared on WhatsApp and social apps.
  // The image is src/app/opengraph-image.jpg.
  openGraph: {
    type: "website",
    url: "/",
    siteName: business.name,
    title,
    description: business.description,
    locale: "en_MY",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-MY">
      <body>{children}</body>
    </html>
  );
}
