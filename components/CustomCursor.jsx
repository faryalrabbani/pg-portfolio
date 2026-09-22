"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// ---------------------------------------------------------------------------
// CustomCursor
// ---------------------------------------------------------------------------
// A small dot that follows the mouse with a spring lag, and grows on hover
// over interactive elements (a, button, or [data-cursor="hover"]).
//
// Automatically disabled on touch devices via `matchMedia("(pointer: fine)")`.
// ---------------------------------------------------------------------------

export default function CustomCursor() {
  // -------------------------------------------------------------------------
  // State
  // -------------------------------------------------------------------------
  // isFinePointer — true only on devices with a mouse/trackpad. Defaults to
  // false so nothing renders on mobile / touch devices.
  const [isFinePointer, setIsFinePointer] = useState(false);

  // isHovering — true when the pointer is over an interactive element.
  // Drives the size/shape change.
  const [isHovering, setIsHovering] = useState(false);

  // -------------------------------------------------------------------------
  // Motion values — the actual cursor position
  // -------------------------------------------------------------------------
  // useMotionValue tracks the raw mouse position.
  // useSpring wraps it so we get a smooth "lag behind" effect.
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = {
    stiffness: 400,
    damping: 40,
    mass: 0.6,
  };

  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  // -------------------------------------------------------------------------
  // Effect 1 — detect fine pointer (mouse) vs coarse pointer (touch)
  // -------------------------------------------------------------------------
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia("(pointer: fine)");
    setIsFinePointer(mq.matches);

    const handleChange = (e) => setIsFinePointer(e.matches);
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  // -------------------------------------------------------------------------
  // Effect 2 — track mouse position + hover state
  // -------------------------------------------------------------------------
  useEffect(() => {
    if (!isFinePointer) return;

    // -- Track position
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    // -- Track hover over interactive elements
    // We use `mouseover` on document with a closest() check, because
    // individual buttons/links can be added/removed dynamically (e.g. form
    // reset, drawer open/close). One document listener catches everything.
    const handleMouseOver = (e) => {
      const target = e.target.closest(
        'a, button, [data-cursor="hover"], input, textarea, [role="button"]'
      );
      setIsHovering(Boolean(target));
    };

    // -- Optional: hide when the mouse leaves the window
    const handleMouseLeave = () => {
      mouseX.set(-100);
      mouseY.set(-100);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isFinePointer, mouseX, mouseY]);

  // -------------------------------------------------------------------------
  // Bail out on non-fine-pointer devices (mobile, tablet with touch only)
  // -------------------------------------------------------------------------
  if (!isFinePointer) return null;

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------
  return (
    <motion.div
      aria-hidden="true"
      style={{
        x,
        y,
        // translateX/Y at -50% so the cursor is centered on the point,
        // not offset down-right like a default CSS cursor.
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        width: isHovering ? 72 : 20,
        height: isHovering ? 72 : 20,
        backgroundColor: isHovering
        ? "rgba(232, 176, 75, 0)"
        : "rgba(232, 176, 75, 0.9)",
        borderColor: isHovering
          ? "rgba(232, 176, 75, 0.6)"
          : "rgba(232, 176, 75, 0)",
      }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full border"
    />
  );
}