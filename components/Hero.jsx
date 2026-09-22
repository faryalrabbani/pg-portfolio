"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// Animation variants — reused across hero elements
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  const ref = useRef(null);

  // Mobile-only crossfade between the two hero images.
  // (Desktop shows the diptych — no slider needed there.)
  const [mobileSlide, setMobileSlide] = useState(0);

  useEffect(() => {
    // Only run the interval when the viewport is below md (768px).
    const isMobile = () =>
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 767px)").matches;

    const id = setInterval(() => {
      if (isMobile()) {
        setMobileSlide((prev) => (prev === 0 ? 1 : 0));
      }
    }, 5000); // crossfade every 5s

    return () => clearInterval(id);
  }, []);

  // Parallax: image moves 30% slower than the scroll
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  return (
    <section
      ref={ref}
      id="home"
      className="relative h-screen w-full overflow-hidden"
    >
      {/* ---------- Background image with parallax ---------- */}
           {/* ---------- Diptych background with parallax ---------- */}
                {/* ---------- Background: diptych on desktop, crossfade slider on mobile ---------- */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 -z-10 will-change-transform"
      >
        {/* ============================================================
            DESKTOP DI PTYCH (md and up)
            Two side-by-side images with a hairline seam. No animation.
            ============================================================ */}
        <div className="absolute inset-0 hidden md:flex">
          {/* Left panel */}
          <div className="relative h-full w-1/2 overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1600&q=90"
              alt="Cinematic landscape with solitary figure in golden light"
              fill
              priority
              sizes="50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>

          {/* Right panel */}
          <div className="relative h-full w-1/2 overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&q=90"
              alt="Architectural detail in warm light"
              fill
              priority
              sizes="50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>

          {/* Center seam */}
          <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/10" />
        </div>

        {/* ============================================================
            MOBILE CROSSFADE SLIDER (below md)
            Two full-screen images stacked. Opacity toggles every 5s.
            ============================================================ */}
        <div className="absolute inset-0 md:hidden">
          {/* Image A */}
          <motion.div
            animate={{ opacity: mobileSlide === 0 ? 1 : 0 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=2000&q=90"
              alt="Cinematic landscape with solitary figure in golden light"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>

          {/* Image B */}
          <motion.div
            animate={{ opacity: mobileSlide === 1 ? 1 : 0 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=2000&q=90"
              alt="Architectural detail in warm light"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>

          {/* Soft dark overlay for text legibility (mobile only) */}
          <div className="pointer-events-none absolute inset-0 bg-black/40" />
        </div>

                {/* ---------- Global gradient overlay (both breakpoints) ---------- */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/80" />
      </motion.div>

      {/* ---------- Content ---------- */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{ opacity }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        {/* Eyebrow */}
        <motion.p
          variants={item}
          className="mb-6 text-xs uppercase tracking-[0.4em] text-white/70"
        >
          Fine Art Photography · Est. 2015
        </motion.p>

        {/* Headline */}
        <motion.h1
          variants={item}
          className="font-display text-[15vw] leading-[0.9] text-white sm:text-[10vw] md:text-[7.5vw] lg:text-[6.5vw]"
        >
          Moments
          <br />
          <span className="italic text-[var(--accent)]">framed</span> forever.
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={item}
          className="mt-8 max-w-xl text-sm text-white/70 sm:text-base"
        >
          Cinematic wedding, portrait, and event photography
          <br className="hidden sm:block" />
          for people who care about the details.
        </motion.p>

        {/* CTA */}
        <motion.div variants={item} className="mt-12">
          <a
            href="#gallery"
            className="group inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/5 px-8 py-4 text-xs uppercase tracking-[0.25em] text-white backdrop-blur-sm transition-all duration-500 hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-black"
          >
            View Portfolio
            <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          </a>
        </motion.div>
      </motion.div>

     
    </section>
  );
}