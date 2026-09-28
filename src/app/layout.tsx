import type { Metadata } from "next";
import { business } from "@/config/business";
import "./globals.css";

export const metadata: Metadata = {
  title: `${business.name} | Premium Car Detailing in ${business.locality}`,
  description:
    "A premium automotive detailing studio demo in Petaling Jaya. Explore exterior and interior detailing, paint correction and ceramic coating packages.",
  robots: { index: false, follow: false }, // Demo business; remove when real details are supplied.
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
