import type { Metadata } from "next";
import { LegalPage } from "@/app/legal/LegalPage";

export const metadata: Metadata = {
  title: "Cookie Policy | FG Design Partners",
  description: "How FG Design Partners uses cookies and similar technologies.",
};

export default function CookiesPage() {
  return (
    <LegalPage
      eyebrow="Legal."
      title="Cookie Policy"
      updated="To be confirmed"
      sections={[
        {
          heading: "What cookies we use",
          body: [
            "This site currently sets no tracking or advertising cookies. The only value stored in your browser is your cookie preference itself, so we do not ask you again on future visits.",
            "If analytics are added later, they will only load after you accept — declining will prevent them from running.",
          ],
        },
        {
          heading: "Managing your choice",
          body: [
            "You can change your mind at any time by clearing this site's data in your browser settings, which will bring the consent banner back.",
          ],
        },
        {
          heading: "Third-party services",
          body: [
            "Fonts are served by Fontshare. Any additional third-party services should be listed here before launch.",
          ],
        },
      ]}
    />
  );
}
