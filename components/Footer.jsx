"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { footer } from "@/lib/data";

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------
const ctaContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const ctaItem = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
};

const columnsContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const columnItem = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Footer() {
  return (
    <footer className="relative w-full bg-[var(--bg)]">
      {/* ===================================================================
          BAND 1 — Big closing CTA
          =================================================================== */}
           {/* ===================================================================
          BAND 1 — Big closing CTA (with full-bleed background image)
          =================================================================== */}
      <motion.div
        variants={ctaContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="relative overflow-hidden border-t border-white/10"
      >
               {/* Background image */}
               <div className="absolute inset-0 z-0">
          <Image
            src="https://images.pexels.com/photos/6128943/pexels-photo-6128943.jpeg?w=2000"
            alt="Misty green highlands at sunrise"
            fill
            sizes="100vw"
            className="object-cover"
          />
                    {/* Dark gradient overlay for text legibility */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/70" />
        </div>

        {/* Content */}
        <div className="relative z-10 px-6 py-24 sm:px-10 md:py-32 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <motion.p
              variants={ctaItem}
              className="mb-6 text-xs uppercase tracking-[0.4em] text-white/60"
            >
              {footer.cta.eyebrow}
            </motion.p>

            <motion.h2
              variants={ctaItem}
              className="font-display max-w-4xl text-5xl leading-[0.95] text-white sm:text-6xl md:text-7xl lg:text-8xl"
            >
              {footer.cta.heading}
              <br />
              <span className="italic text-[var(--accent)]">
                {footer.cta.headingAccent}
              </span>
            </motion.h2>

            <motion.div variants={ctaItem} className="mt-12 md:mt-16">
              <a
                href={footer.cta.buttonHref}
                className="group inline-flex items-center gap-4 rounded-full border border-white/30 bg-white/5 px-8 py-4 text-xs uppercase tracking-[0.3em] text-white backdrop-blur-sm transition-all duration-500 hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-black sm:px-10 sm:py-5"
              >
                {footer.cta.buttonLabel}
                <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* ===================================================================
          BAND 2 — Brand + Nav + Social
          =================================================================== */}
      <motion.div
        variants={columnsContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="border-t border-white/10 px-6 py-16 sm:px-10 md:py-20 lg:px-16"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
          {/* Brand column */}
          <motion.div
            variants={columnItem}
            className="md:col-span-6 lg:col-span-6"
          >
            <h3 className="font-display text-2xl text-white md:text-3xl">
              {footer.brand.name}
            </h3>
            <p className="mt-2 text-xs uppercase tracking-[0.3em] text-white/50">
              {footer.brand.tagline}
            </p>
            <p className="mt-6 text-sm text-white/60">
              {footer.brand.location}
            </p>
          </motion.div>

          {/* Link columns */}
          {footer.columns.map((column) => (
            <motion.div
              key={column.title}
              variants={columnItem}
              className="md:col-span-3 lg:col-span-3"
            >
              <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                {column.title}
              </h4>
              <ul className="mt-6 space-y-3">
                {column.links.map((link) => {
                  const isExternal = link.href.startsWith("http");
                  return (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        className="text-sm text-white/70 transition-colors duration-500 hover:text-[var(--accent)]"
                      >
                        {link.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ===================================================================
          BAND 3 — Bottom meta line
          =================================================================== */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="border-t border-white/10 px-6 py-8 sm:px-10 lg:px-16"
      >
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 text-[10px] uppercase tracking-[0.25em] text-white/40 md:flex-row md:items-center">
          <p>{footer.meta.copyright}</p>
          <p>{footer.meta.credit}</p>
        </div>
      </motion.div>
    </footer>
  );
}