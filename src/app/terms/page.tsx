import type { Metadata } from "next";
import { LegalPage } from "@/app/legal/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Use | FG Design Partners",
  description: "Terms governing the use of the FG Design Partners website.",
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal."
      title="Terms of Use"
      updated="To be confirmed"
      sections={[
        {
          heading: "Using this site",
          body: [
            "By accessing this website you agree to these terms. If you do not agree, please do not use the site.",
          ],
        },
        {
          heading: "Intellectual property",
          body: [
            "All photography, project imagery, text, and branding on this site belong to FG Design Partners Ltd or its photographers, and may not be reproduced without written permission.",
            "Photography credits to be confirmed before launch.",
          ],
        },
        {
          heading: "Accuracy of content",
          body: [
            "Project descriptions and imagery are provided for illustration. They do not form part of any contract or quotation.",
          ],
        },
        {
          heading: "Liability",
          body: ["Limitation of liability wording to be confirmed by legal adviser."],
        },
        {
          heading: "Governing law",
          body: ["These terms are governed by the laws of England and Wales."],
        },
      ]}
    />
  );
}
