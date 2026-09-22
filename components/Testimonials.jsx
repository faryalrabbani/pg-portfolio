"use client";

import { motion } from "framer-motion";
import { testimonials } from "@/lib/data";

// ---------------------------------------------------------------------------
// Split the data into featured (1) and supporting (rest).
// This keeps the component layout code clean — it doesn't care how many
// items exist, it always renders 1 featured + N supporting.
// ---------------------------------------------------------------------------
const featured = testimonials.find((t) => t.featured);
const supporting = testimonials.filter((t) => !t.featured);

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------
const headerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const headerItem = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const featuredItem = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
  },
};

const supportingContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const supportingItem = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative w-full bg-[var(--bg)] px-6 py-24 sm:px-10 md:py-32 lg:px-16"
    >
      {/* Thin top divider */}
      <div className="mx-auto mb-20 h-px max-w-7xl bg-gradient-to-r from-transparent via-white/10 to-transparent md:mb-28" />

      {/* ---------- Section header ---------- */}
      <motion.div
        variants={headerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        className="mx-auto mb-16 max-w-7xl md:mb-24"
      >
        <motion.p
          variants={headerItem}
          className="mb-4 text-xs uppercase tracking-[0.4em] text-white/50"
        >
          Testimonials
        </motion.p>

        <motion.h2
          variants={headerItem}
          className="font-display max-w-3xl text-4xl leading-[1.05] text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Words from
          <br />
          <span className="italic text-[var(--accent)]">
            the other side.
          </span>
        </motion.h2>
      </motion.div>

      {/* ---------- Featured quote ---------- */}
      {featured && (
        <motion.figure
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.15 } },
          }}
          className="relative mx-auto mb-12 max-w-7xl overflow-hidden rounded-sm border border-white/10 bg-white/[0.02] p-8 sm:p-12 md:mb-14 md:p-16 lg:p-20"        >
          {/* Decorative quotation mark — top-left, amber, low opacity */}
          <span
            aria-hidden="true"
            className="font-display pointer-events-none absolute -top-4 left-6 select-none text-[8rem] leading-none text-[var(--accent)]/20 sm:text-[10rem] md:left-10 md:-top-6 md:text-[12rem] lg:text-[14rem]"          >
            &ldquo;
          </span>

          {/* Quote */}
          <motion.blockquote
            variants={featuredItem}
            className="relative mt-16 font-display text-2xl leading-snug text-white sm:mt-20 sm:text-3xl md:mt-24 md:text-4xl lg:mt-28 lg:text-5xl"
          >
            {featured.quote}
          </motion.blockquote>

          {/* Attribution */}
          <motion.figcaption
            variants={featuredItem}
            className="relative mt-8 flex flex-col gap-1 md:mt-12"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-white">
              — {featured.name}
            </span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-white/45">
              {featured.meta}
            </span>
          </motion.figcaption>
        </motion.figure>
      )}

      {/* ---------- Supporting quotes ---------- */}
      <motion.div
        variants={supportingContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto grid max-w-7xl grid-cols-1 gap-10 md:grid-cols-2 md:gap-8"
      >
        {supporting.map((testimonial) => (
          <motion.figure
            key={testimonial.id}
            variants={supportingItem}
            className="flex flex-col justify-between rounded-sm border border-white/10 bg-white/[0.015] p-8 transition-colors duration-500 hover:border-white/25 sm:p-10 md:p-10"          >
            <blockquote className="text-sm leading-relaxed text-white/75 sm:text-base">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>

            <figcaption className="mt-8 flex flex-col gap-1">
              <span className="text-[11px] uppercase tracking-[0.3em] text-white">
                — {testimonial.name}
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-white/45">
                {testimonial.meta}
              </span>
            </figcaption>
          </motion.figure>
        ))}
      </motion.div>
    </section>
  );
}