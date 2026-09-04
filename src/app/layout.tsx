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
    // suppressHydrationWarning: the script below adds a class to <html> before
    // React hydrates, so the server and client markup differ by design. This is
    // the same pattern theme scripts use, and it is scoped to this element only.
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        {/* Runs before first paint. Scroll reveals ship their hidden state in the
            SSR HTML (opacity:0 / blur / clip-path), so if JS never runs that
            content would be stranded invisible. Everything stays visible until
            this flag confirms JS is alive to animate it — see globals.css. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
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
