"use client";

import { useState } from "react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="border border-ink/15 bg-ink/[0.02] p-10 text-center">
        <p className="font-display italic text-2xl">Thank you.</p>
        <p className="mt-3 text-ink/70">
          We&apos;ve received your enquiry and will be in touch shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="grid grid-cols-1 gap-6 sm:grid-cols-2"
    >
      <label className="flex flex-col gap-2 text-sm">
        Name
        <input
          required
          name="name"
          type="text"
          className="border border-ink/20 bg-transparent px-4 py-3 outline-none focus:border-ink"
        />
      </label>
      <label className="flex flex-col gap-2 text-sm">
        Email
        <input
          required
          name="email"
          type="email"
          className="border border-ink/20 bg-transparent px-4 py-3 outline-none focus:border-ink"
        />
      </label>
      <label className="flex flex-col gap-2 text-sm">
        Phone
        <input
          name="phone"
          type="tel"
          className="border border-ink/20 bg-transparent px-4 py-3 outline-none focus:border-ink"
        />
      </label>
      <label className="flex flex-col gap-2 text-sm">
        Property Location
        <input
          name="location"
          type="text"
          className="border border-ink/20 bg-transparent px-4 py-3 outline-none focus:border-ink"
        />
      </label>
      <label className="flex flex-col gap-2 text-sm sm:col-span-2">
        Tell us about your project
        <textarea
          name="message"
          rows={5}
          className="border border-ink/20 bg-transparent px-4 py-3 outline-none focus:border-ink"
        />
      </label>
      <button
        type="submit"
        className="inline-flex w-fit items-center justify-center bg-ink px-8 py-3 text-sm font-medium text-cream transition-colors hover:bg-ink/85 sm:col-span-2"
      >
        Send enquiry.
      </button>
    </form>
  );
}
