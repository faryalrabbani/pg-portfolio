"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// ---------------------------------------------------------------------------
// SmoothScroll
// ---------------------------------------------------------------------------
// Initializes Lenis — a lightweight smooth-scroll library — and drives it
// with requestAnimationFrame.
//
// Why this component exists:
//   - Lenis must run on the client (needs `window`, `requestAnimationFrame`)
//   - We only want ONE instance running for the whole page
//   - It should NOT render anything visible — it's purely behavioral
//
// Handles:
//   - Wheel scrolling (desktop)
//   - Touch scrolling (mobile)
//   - Anchor links (#gallery, #contact, etc.) — Lenis intercepts and animates
//   - Coexists with Framer Motion's useScroll (Lenis updates window.scrollY,
//     so Framer's scroll listeners stay in sync)
// ---------------------------------------------------------------------------

export default function SmoothScroll() {
  useEffect(() => {
    // ---------------------------------------------------------------------
    // 1) Create the Lenis instance
    // ---------------------------------------------------------------------
    const lenis = new Lenis({
      // How long the scroll animation takes for a wheel "notch".
      // 1.2s feels premium — snappier values (<1s) feel rushed,
      // slower values (>1.5s) feel laggy.
      duration: 1.2,

      // Easing function for the scroll animation.
      // This is the same cubic-bezier curve we've used everywhere else
      // on the site — it keeps the motion language consistent.
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),

      // Smoothly handles wheel input on desktop.
      smoothWheel: true,

      // Smoothly handles touch input on mobile/tablet.
      // Set to true — this is one of Lenis's strongest features.
      smoothTouch: true,

      // Disable Lenis entirely if the user prefers reduced motion.
      // Accessibility: respect the OS-level setting.
      // (Lenis reads this internally but we set it explicitly for clarity.)
      gestureOrientation: "vertical",
    });

    // ---------------------------------------------------------------------
    // 2) Drive Lenis with requestAnimationFrame
    // ---------------------------------------------------------------------
    // Lenis doesn't animate on its own — it needs a "tick" each frame.
    // We use requestAnimationFrame to call lenis.raf(time) on every frame.
    let animationFrameId;

    function raf(time) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    // ---------------------------------------------------------------------
    // 3) Expose lenis globally so other components can use it if needed
    // ---------------------------------------------------------------------
    // (Optional, but useful later — e.g. if a nav link wants to
    // programmatically call lenis.scrollTo('#gallery'))
    if (typeof window !== "undefined") {
      window.__lenis = lenis;
    }

    // ---------------------------------------------------------------------
    // 4) Cleanup on unmount
    // ---------------------------------------------------------------------
    // Cancel the animation frame and destroy the Lenis instance.
    // Without this, hot-reload in dev would leave zombie scroll handlers.
    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
      if (typeof window !== "undefined") {
        delete window.__lenis;
      }
    };
  }, []);

  // This component renders nothing. It's purely behavioral.
  return null;
}