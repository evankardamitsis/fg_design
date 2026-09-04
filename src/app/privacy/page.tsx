import type { Metadata } from "next";
import { LegalPage } from "@/app/legal/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | FG Design Partners",
  description: "How FG Design Partners collects, uses, and protects personal data.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal."
      title="Privacy Policy"
      updated="To be confirmed"
      sections={[
        {
          heading: "Who we are",
          body: [
            "FG Design Partners Ltd, a company registered in England and Wales. Registered office address, company number, and ICO registration number to be confirmed.",
          ],
        },
        {
          heading: "What we collect",
          body: [
            "When you submit an enquiry through this site we collect the name, email address, telephone number, property location, and project details you provide.",
            "We also collect limited technical data such as your IP address and browser type, and analytics data where you have consented to it.",
          ],
        },
        {
          heading: "How we use it",
          body: [
            "To respond to your enquiry and discuss a potential project. We rely on legitimate interest for responding to enquiries, and on your consent for any analytics or marketing.",
          ],
        },
        {
          heading: "How long we keep it",
          body: ["Retention period to be confirmed by FG Design Partners."],
        },
        {
          heading: "Who we share it with",
          body: [
            "Service providers used to operate this site and handle enquiries. A list of processors should be confirmed before launch.",
          ],
        },
        {
          heading: "Your rights",
          body: [
            "Under UK GDPR you have the right to access, correct, or erase your personal data, to restrict or object to processing, and to data portability. You may also withdraw consent at any time and lodge a complaint with the Information Commissioner's Office.",
          ],
        },
        {
          heading: "Contact",
          body: ["Contact address for data protection enquiries to be confirmed."],
        },
      ]}
    />
  );
}
