import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact | FG Design Partners",
  description: "Start a conversation with FG Design Partners about your next project.",
};

export default function ContactPage() {
  return (
    <>
      <Nav variant="solid" />

      <section className="mx-auto max-w-5xl px-6 py-20 md:px-10 md:py-28">
        <Reveal>
          <Eyebrow>Get in Touch.</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-8 max-w-2xl text-4xl leading-tight tracking-[-0.035em] md:text-6xl">
            Start a <span className="font-display italic tracking-[-0.02em]">project.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/75 md:text-lg">
            Tell us a little about your home and what you have in mind. We&apos;ll come
            back to you to arrange an initial conversation.
          </p>
        </Reveal>

        <Reveal delay={0.2} className="mt-16">
          <ContactForm />
        </Reveal>

        <Reveal delay={0.24} className="mt-12 border-t border-ink/12 pt-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
            <p className="text-sm text-ink/52">For a more immediate conversation, email us directly.</p>
            <a
              href="mailto:info@fgdpartners.com"
              className="w-fit border-b border-ink/30 pb-1 text-lg transition-colors hover:border-ink md:text-xl"
            >
              info@fgdpartners.com
            </a>
          </div>
        </Reveal>
      </section>

      <Footer showCta={false} />
    </>
  );
}
