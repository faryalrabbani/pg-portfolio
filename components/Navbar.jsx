"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { navLinks } from "@/lib/data";

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function Navbar() {
  const { scrollY } = useScroll();

  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [drawerOpen, setDrawerOpen] = useState(false);

  // -------------------------------------------------------------------------
  // 1) Detect scroll threshold → toggle "scrolled" state
  // -------------------------------------------------------------------------
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40);
  });

  // -------------------------------------------------------------------------
  // 2) Track which section is currently in view
  // -------------------------------------------------------------------------
  // Uses IntersectionObserver. Each section that has an `id` matching a nav
  // href is observed. Whichever is most visible wins.
  useEffect(() => {
    const sectionIds = navLinks
      .map((l) => l.href.replace("#", ""))
      .filter(Boolean);

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Among visible sections, pick the one with highest intersection ratio.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        // Fire when sections cross the middle of the viewport.
        rootMargin: "-40% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // -------------------------------------------------------------------------
  // 3) Lock body scroll when the mobile drawer is open
  // -------------------------------------------------------------------------
  useEffect(() => {
    if (drawerOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [drawerOpen]);

  // -------------------------------------------------------------------------
  // 4) Close drawer on link click (mobile UX — otherwise it stays open)
  // -------------------------------------------------------------------------
  const handleLinkClick = () => setDrawerOpen(false);

  return (
    <>
      {/* ===================================================================
          Top bar
          =================================================================== */}
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        className={[
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-white/10 bg-black/60 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        ].join(" ")}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10 md:py-5 lg:px-16">
          {/* Logo */}
          <a
            href="#home"
            className="font-display text-lg tracking-tight text-white transition-colors duration-500 hover:text-[var(--accent)] sm:text-xl"
          >
            Aperture
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = activeSection === id;

              return (
                <li key={link.href} className="relative">
                  <a
                    href={link.href}
                    className={[
                      "relative block py-2 text-[11px] uppercase tracking-[0.3em] transition-colors duration-500",
                      isActive
                        ? "text-[var(--accent)]"
                        : "text-white/70 hover:text-white",
                    ].join(" ")}
                  >
                    {link.label}

                    {/* Active underline */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-0.5 left-0 right-0 h-px bg-[var(--accent)]"
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setDrawerOpen(true)}
            className="flex flex-col items-end gap-1.5 md:hidden"
          >
            <span className="block h-px w-6 bg-white transition-all duration-500" />
            <span className="block h-px w-4 bg-white transition-all duration-500" />
          </button>
        </nav>
      </motion.header>

      {/* ===================================================================
          Mobile drawer
          =================================================================== */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm md:hidden"
            />

            {/* Drawer panel */}
            <motion.aside
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 right-0 z-[70] flex w-[82%] max-w-sm flex-col justify-between border-l border-white/10 bg-[var(--bg)] px-8 py-8 md:hidden"
            >
              {/* Close button */}
              <div className="flex items-center justify-between">
                <span className="font-display text-lg text-white">Aperture</span>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setDrawerOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors duration-500 hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  ✕
                </button>
              </div>

              {/* Links */}
              <ul className="mt-16 flex flex-col gap-2">
                {navLinks.map((link, i) => {
                  const id = link.href.replace("#", "");
                  const isActive = activeSection === id;

                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.15 + i * 0.06,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <a
                        href={link.href}
                        onClick={handleLinkClick}
                        className={[
                          "font-display block py-3 text-3xl transition-colors duration-500",
                          isActive
                            ? "italic text-[var(--accent)]"
                            : "text-white hover:text-[var(--accent)]",
                        ].join(" ")}
                      >
                        {link.label}
                      </a>
                    </motion.li>
                  );
                })}
              </ul>

              {/* Footer info in drawer */}
              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                  Milan · Worldwide
                </p>
                <a
                  href="mailto:hello@aperture.co"
                  className="mt-2 block text-xs text-white/70 transition-colors duration-500 hover:text-[var(--accent)]"
                >
                  hello@aperture.co
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}