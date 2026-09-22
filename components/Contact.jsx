"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { contactContent } from "@/lib/data";

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------
const leftContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const leftItem = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const formContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const formItem = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  // Tracks whether the section has animated in once.
  // After that, the form should appear instantly on remount (no re-animation).
  const [hasAnimated, setHasAnimated] = useState(false);

  // -------------------------------------------------------------------------
  // Listen for "package-selected" events fired by the Services section.
  // When one arrives, pre-fill the message and focus the field.
  // -------------------------------------------------------------------------
  useEffect(() => {
    const handlePackageSelected = (e) => {
      const { title, price } = e.detail || {};
      if (!title) return;

      const prefilled = `I'm interested in the ${title} package (${price}).\n\nHere are a few details about my project:\n`;

      setForm((prev) => ({
        ...prev,
        message: prefilled,
      }));

      // Focus the message field after a short delay so the smooth scroll
      // has time to bring the form into view.
      setTimeout(() => {
        const el = document.getElementById("message");
        if (el) el.focus();
      }, 800);
    };

    window.addEventListener("package-selected", handlePackageSelected);
    return () =>
      window.removeEventListener("package-selected", handlePackageSelected);
  }, []);
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Build a mailto: link with the form contents pre-filled.
    // This is a real submission — it opens the user's email client
    // with everything ready to send. No backend required.
    const to = "hello@aperture.co";
    const subject = `New inquiry from ${form.name}`;
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      "",
      "Message:",
      form.message,
    ].join("\n");

    const mailtoHref = `mailto:${to}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    // Open the user's mail client (new tab avoids losing the current page
    // on some browsers).
    window.location.href = mailtoHref;

    // Still show the thank-you card so the user gets visual confirmation.
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="relative w-full bg-[var(--bg)] px-6 py-24 sm:px-10 md:py-32 lg:px-16"
    >
      {/* Thin top divider */}
      <div className="mx-auto mb-20 h-px max-w-7xl bg-gradient-to-r from-transparent via-white/10 to-transparent md:mb-28" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 md:grid-cols-12 md:gap-12 lg:gap-20">
        {/* ------------------ Left column: info ------------------ */}
        <motion.div
  variants={leftContainer}
  initial={hasAnimated ? "show" : "hidden"}
  whileInView="show"
  viewport={{ once: true, amount: 0.25 }}
  onViewportEnter={() => setHasAnimated(true)}
  className="md:col-span-5 lg:col-span-5"
>
          {/* Eyebrow */}
          <motion.p
            variants={leftItem}
            className="mb-5 text-xs uppercase tracking-[0.4em] text-white/50"
          >
            {contactContent.eyebrow}
          </motion.p>

          {/* Heading */}
          <motion.h2
            variants={leftItem}
            className="font-display text-4xl leading-[1.05] text-white sm:text-5xl md:text-5xl lg:text-6xl"
          >
            {contactContent.heading}
            <br />
            <span className="italic text-[var(--accent)]">
              {contactContent.headingAccent}
            </span>
          </motion.h2>

          {/* Paragraph */}
          <motion.p
            variants={leftItem}
            className="mt-8 max-w-md text-sm leading-relaxed text-white/60 sm:text-base"
          >
            {contactContent.paragraph}
          </motion.p>

          {/* Details list */}
          <motion.dl
            variants={leftItem}
            className="mt-12 space-y-6 md:mt-16"
          >
            {contactContent.details.map((detail) => (
              <div key={detail.label} className="flex flex-col gap-1">
                <dt className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                  {detail.label}
                </dt>
                <dd className="text-sm text-white/85">
                  {detail.href ? (
                    <a
                      href={detail.href}
                      target={detail.href.startsWith("http") ? "_blank" : undefined}
                      rel={detail.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="transition-colors duration-500 hover:text-[var(--accent)]"
                    >
                      {detail.value}
                    </a>
                  ) : (
                    detail.value
                  )}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* ------------------ Right column: form ------------------ */}
        <motion.div
  variants={formContainer}
  initial={hasAnimated ? "show" : "hidden"}
  whileInView="show"
  viewport={{ once: true, amount: 0.25 }}
  onViewportEnter={() => setHasAnimated(true)}
  className="md:col-span-7 lg:col-span-7"
>
          {submitted ? (
            // ---------- Success state ----------
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="flex h-full flex-col items-start justify-center rounded-sm border border-[var(--accent)]/30 bg-white/[0.02] p-10 md:p-16"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent)]">
                Message Sent
              </p>
              <h3 className="font-display mt-6 text-3xl leading-tight text-white md:text-4xl">
                Thank you.
                <br />
                <span className="italic text-[var(--accent)]">
                  I'll be in touch soon.
                </span>
              </h3>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-white/60">
                I read every inquiry personally and reply within 48 hours.
                Keep an eye on your inbox — and check spam, just in case.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setForm({ name: "", email: "", message: "" });
                }}
                className="mt-10 text-xs uppercase tracking-[0.3em] text-white/50 transition-colors duration-500 hover:text-[var(--accent)]"
              >
                Send another →
              </button>
            </motion.div>
          ) : (
            // ---------- Form state ----------
            <form onSubmit={handleSubmit} className="flex flex-col gap-10">
              {/* Name */}
              <motion.div variants={formItem}>
                <label
                  htmlFor="name"
                  className="block text-[10px] uppercase tracking-[0.3em] text-white/40"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="mt-3 w-full border-b border-white/20 bg-transparent pb-3 text-base text-white outline-none transition-colors duration-500 placeholder:text-white/25 focus:border-[var(--accent)]"
                />
              </motion.div>

              {/* Email */}
              <motion.div variants={formItem}>
                <label
                  htmlFor="email"
                  className="block text-[10px] uppercase tracking-[0.3em] text-white/40"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="mt-3 w-full border-b border-white/20 bg-transparent pb-3 text-base text-white outline-none transition-colors duration-500 placeholder:text-white/25 focus:border-[var(--accent)]"
                />
              </motion.div>

              {/* Message */}
              <motion.div variants={formItem}>
                <label
                  htmlFor="message"
                  className="block text-[10px] uppercase tracking-[0.3em] text-white/40"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project — date, location, the feeling you want to remember."
                  className="mt-3 w-full resize-none border-b border-white/20 bg-transparent pb-3 text-base text-white outline-none transition-colors duration-500 placeholder:text-white/25 focus:border-[var(--accent)]"
                />
              </motion.div>

              {/* Submit */}
              <motion.div variants={formItem} className="pt-2">
                <button
                  type="submit"
                  className="group inline-flex items-center gap-3 rounded-full border border-white/25 px-8 py-4 text-xs uppercase tracking-[0.25em] text-white transition-all duration-500 hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-black"
                >
                  Send Message
                  <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </motion.div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}