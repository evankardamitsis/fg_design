import type { Metadata } from "next";
import "./globals.css";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { PageTransition } from "@/components/motion/PageTransition";
import { CookieConsent } from "@/components/CookieConsent";

export const metadata: Metadata = {
  title: "FG Design Partners | Turnkey Design & Build, London",
  description:
    "FG Design Partners deliver turnkey design and build for London's most distinguished homes — one in-house team, from concept through completion.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://cdn.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=boska@500,501&f[]=general-sans@400,500,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-cream text-ink font-sans antialiased">
        <SmoothScroll />
        <PageTransition>{children}</PageTransition>
        <CookieConsent />
      </body>
    </html>
  );
}
