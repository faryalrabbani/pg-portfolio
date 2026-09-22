"use client";

import { motion } from "framer-motion";
import { services } from "@/lib/data";

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

const cardsContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const cardItem = {
  hidden: { opacity: 0, y: 50, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Services() {
  return (
    <section
      id="services"
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
          Services
        </motion.p>

        <motion.h2
          variants={headerItem}
          className="font-display max-w-3xl text-4xl leading-[1.05] text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Packages built for
          <br />
          <span className="italic text-[var(--accent)]">real moments.</span>
        </motion.h2>

        <motion.p
          variants={headerItem}
          className="mt-6 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base"
        >
          Every package is fully customizable. Add hours, add a second
          shooter, add an album — tell me what matters and we'll shape it
          together.
        </motion.p>
      </motion.div>

      {/* ---------- Cards grid ---------- */}
      <motion.div
        variants={cardsContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-3 md:gap-6 lg:gap-8"
      >
        {services.map((service) => (
          <motion.article
            key={service.id}
            variants={cardItem}
            className={[
              "group relative flex flex-col rounded-sm border p-8 transition-all duration-500 lg:p-10",
              service.highlighted
                ? // Elevated card: amber border, slight offset upward on desktop
                  "border-[var(--accent)]/40 bg-white/[0.03] md:-mt-6 md:mb-6 lg:-mt-8 lg:mb-8"
                : // Standard cards
                  "border-white/10 bg-white/[0.015] hover:border-white/25",
              "hover:-translate-y-1.5",
            ].join(" ")}
          >
            {/* Badge (only on highlighted card) */}
            {service.badge && (
              <span className="absolute -top-3 left-8 rounded-full border border-[var(--accent)]/50 bg-[var(--bg)] px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-[var(--accent)]">
                {service.badge}
              </span>
            )}

            {/* Title */}
            <h3 className="font-display text-2xl text-white lg:text-3xl">
              {service.title}
            </h3>

            {/* Tagline */}
            <p className="mt-2 text-sm text-white/55">{service.tagline}</p>

            {/* Price */}
            <div className="mt-8 flex items-baseline gap-2">
              <span className="font-display text-4xl text-white lg:text-5xl">
                {service.price}
              </span>
            </div>

            {/* Divider */}
            <div className="mt-8 h-px w-full bg-white/10" />

            {/* Feature list */}
            <ul className="mt-8 flex-1 space-y-4">
              {service.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 text-sm text-white/70"
                >
                  {/* Amber dot */}
                  <span className="mt-2 inline-block h-1 w-1 flex-shrink-0 rounded-full bg-[var(--accent)]" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA button */}
            <a
              href="#contact"
              data-package={service.title}
              onClick={() => {
                // Hand off the package context to the Contact form via a
                // custom event. Contact listens for this and pre-fills
                // the message field.
                window.dispatchEvent(
                  new CustomEvent("package-selected", {
                    detail: {
                      title: service.title,
                      price: service.price,
                    },
                  })
                );
              }}
              className={[
                "group/btn mt-10 inline-flex items-center justify-between rounded-full border px-6 py-3 text-xs uppercase tracking-[0.25em] transition-all duration-500",
                service.highlighted
                  ? "border-[var(--accent)] bg-[var(--accent)] text-black hover:bg-transparent hover:text-[var(--accent)]"
                  : "border-white/25 text-white hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-black",
              ].join(" ")}
            >
              <span>Book {service.title}</span>
              <span className="inline-block transition-transform duration-500 group-hover/btn:translate-x-1">
                →
              </span>
            </a>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}