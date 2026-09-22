"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { aboutContent, aboutStats } from "@/lib/data";

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------
// The text column orchestrates the stagger — eyebrow, heading, paragraphs,
// signature, then the stats row.
// ---------------------------------------------------------------------------
const textContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const textItem = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function About() {
  const sectionRef = useRef(null);

  // Scroll-linked parallax on the photo — moves 15% slower than the page.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full overflow-hidden bg-[var(--bg)] px-6 py-24 sm:px-10 md:py-32 lg:px-16"
    >
      {/* Very subtle top divider — a thin gradient line */}
      <div className="mx-auto mb-20 h-px max-w-7xl bg-gradient-to-r from-transparent via-white/10 to-transparent md:mb-28" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-16 lg:gap-20">
        {/* ---------------- Text column (left on md+) ---------------- */}
        <motion.div
          variants={textContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="order-2 md:order-1 md:col-span-6 lg:col-span-6"
        >
          {/* Eyebrow */}
          <motion.p
            variants={textItem}
            className="mb-5 text-xs uppercase tracking-[0.4em] text-white/50"
          >
            {aboutContent.eyebrow}
          </motion.p>

          {/* Heading */}
          <motion.h2
            variants={textItem}
            className="font-display text-4xl leading-[1.05] text-white sm:text-5xl md:text-5xl lg:text-6xl"
          >
            {aboutContent.heading}
            <br />
            <span className="italic text-[var(--accent)]">
              {aboutContent.headingAccent}
            </span>
          </motion.h2>

          {/* Paragraphs */}
          <div className="mt-8 space-y-5 md:mt-10">
            {aboutContent.paragraphs.map((para, i) => (
              <motion.p
                key={i}
                variants={textItem}
                className="max-w-xl text-sm leading-relaxed text-white/70 sm:text-base"
              >
                {para}
              </motion.p>
            ))}
          </div>

          {/* Signature */}
          <motion.p
            variants={textItem}
            className="font-display mt-8 text-lg italic text-white/60 md:mt-10"
          >
            {aboutContent.signature}
          </motion.p>

          {/* Stats row */}
          <motion.div
            variants={textItem}
            className="mt-10 flex flex-wrap gap-8 border-t border-white/10 pt-8 md:mt-12 md:gap-12"
          >
            {aboutStats.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="font-display text-3xl text-white md:text-4xl">
                  {stat.value}
                </span>
                <span className="mt-1 text-[10px] uppercase tracking-[0.25em] text-white/50">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ---------------- Photo column (right on md+) ---------------- */}
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="order-1 md:order-2 md:col-span-6 lg:col-span-6"
        >
          <div className="relative mx-auto w-full max-w-md md:max-w-none">
            {/* Photo frame with overflow-hidden to clip the parallax */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-neutral-900">
              <motion.div
                style={{ y: photoY }}
                className="absolute inset-[-6%] will-change-transform"
              >
                <Image
                  src={aboutContent.photo.src}
                  alt={aboutContent.photo.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </motion.div>
            </div>

            {/* Small accent square — a design flourish */}
            <div className="pointer-events-none absolute -bottom-3 -right-3 h-16 w-16 border border-[var(--accent)]/40 md:h-20 md:w-20" />

            {/* Caption under photo */}
            <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-white/40">
              {aboutContent.photo.caption}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}