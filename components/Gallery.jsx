"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { getPhotosByCategory, galleryFilters } from "@/lib/data";

// ---------------------------------------------------------------------------
// Layout map — literal Tailwind classes for each tile position.
// Same composition for every category, so switching feels stable.
// ---------------------------------------------------------------------------
const layoutClasses = {
  0: "md:col-span-7 md:row-span-2", // tile 1 — wide + tall
  1: "md:col-span-5 md:row-span-2", // tile 2 — narrower + tall
  2: "md:col-span-5 md:row-span-2", // tile 3
  3: "md:col-span-7 md:row-span-2", // tile 4 — mirrored
  4: "md:col-span-4 md:row-span-2", // tile 5
  5: "md:col-span-4 md:row-span-2", // tile 6
  6: "md:col-span-4 md:row-span-2", // tile 7
  7: "md:col-span-12 md:row-span-1", // tile 8 — wide banner
};

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------
// The parent grid orchestrates the stagger.
// Each child (image tile) fades up.
// ---------------------------------------------------------------------------
const gridContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const gridItem = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState("all");

  const photos = getPhotosByCategory(activeFilter);

  return (
    <section
      id="gallery"
      className="relative w-full bg-[var(--bg)] px-6 py-24 sm:px-10 md:py-32 lg:px-16"
    >
      {/* ---------- Section header ---------- */}
      <div className="mx-auto mb-12 max-w-7xl md:mb-16">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4 text-xs uppercase tracking-[0.4em] text-white/50"
        >
          Selected Work
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-4xl leading-[1.05] text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          A glimpse into
          <br />
          <span className="italic text-[var(--accent)]">the archive.</span>
        </motion.h2>
      </div>

      {/* ---------- Filter tabs ---------- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto mb-12 flex max-w-7xl flex-wrap gap-x-8 gap-y-4 border-b border-white/10 pb-6 md:mb-16 md:gap-x-12"
      >
        {galleryFilters.map((filter) => {
          const isActive = activeFilter === filter.id;
          return (
            <button
              key={filter.id}
              type="button"
              onClick={() => setActiveFilter(filter.id)}
              className={[
                "relative pb-1 text-[11px] uppercase tracking-[0.3em] transition-colors duration-500",
                isActive
                  ? "text-[var(--accent)]"
                  : "text-white/50 hover:text-white",
              ].join(" ")}
            >
              {filter.label}
              {isActive && (
                <motion.span
                  layoutId="gallery-filter-underline"
                  className="absolute -bottom-[6px] left-0 right-0 h-px bg-[var(--accent)]"
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
            </button>
          );
        })}
      </motion.div>

      {/* ---------- Asymmetric grid (filterable) ---------- */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          variants={gridContainer}
          initial="hidden"
          animate="show"
          exit="exit"
          className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:gap-5 md:auto-rows-[220px] md:grid-cols-12 md:gap-5 lg:auto-rows-[260px] lg:gap-6"
        >
          {photos.map((photo, index) => (
            <motion.figure
              key={`${activeFilter}-${photo.id}`}
              variants={gridItem}
              className={`group relative aspect-[4/5] overflow-hidden rounded-sm bg-neutral-900 md:aspect-auto ${
                layoutClasses[index] || ""
              }`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectPosition: photo.objectPosition || "center" }}
                className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <figcaption className="pointer-events-none absolute bottom-0 left-0 right-0 translate-y-3 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:p-5">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--accent)]">
                  {photo.caption}
                </span>
              </figcaption>

              <div className="pointer-events-none absolute inset-0 rounded-sm ring-1 ring-inset ring-white/0 transition-all duration-500 group-hover:ring-white/20" />
            </motion.figure>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}