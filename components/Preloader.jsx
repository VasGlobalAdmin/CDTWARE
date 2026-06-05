"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * First-paint preloader. Holds a branded, animated overlay (blurred backdrop +
 * spinning gold ring + pulsing CDT crest + real progress bar) until the Hero's
 * heavy assets are decoded — the two embedded-raster SVGs (lamp ~5MB, plant
 * ~3MB) are the real bottleneck — then fades away so the home section never
 * "pops in" piecemeal. A safety timeout guarantees we never trap the user.
 */

// The above-the-fold assets that cause the visible pop-in. We intentionally do
// NOT gate on the whole page's `load` (that would wait on below-the-fold
// sections too) — only the home section needs to be ready.
const ASSETS = [
  "/images/home-bg.svg",
  "/images/hero-ring.svg",
  "/images/hero-lamp.svg",
  "/images/hero-plant.svg",
  "/images/hero-circle.png",
  "/images/teton-cluster.png",
  "/images/hero-lion.png",
  "/images/cdt-logo.svg",
];

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    // Freeze the page behind the overlay while we load.
    document.documentElement.style.overflow = "hidden";

    const preload = (src) =>
      new Promise((resolve) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = resolve; // never hang on a 404
        img.src = src;
      });

    let loaded = 0;
    const tasks = ASSETS.map((src) =>
      preload(src).then(() => {
        loaded += 1;
        if (!cancelled) setProgress(Math.round((loaded / ASSETS.length) * 100));
      })
    );

    // Also wait for web fonts so headings don't reflow after the reveal.
    const fonts = document.fonts ? document.fonts.ready : Promise.resolve();

    Promise.all([...tasks, fonts]).then(() => {
      if (cancelled) return;
      setProgress(100);
      // let "100%" register for a beat, then reveal
      setTimeout(() => !cancelled && setDone(true), 350);
    });

    // hard backstop — if something stalls, reveal anyway
    const safety = setTimeout(() => !cancelled && setDone(true), 9000);

    return () => {
      cancelled = true;
      clearTimeout(safety);
    };
  }, []);

  // Restore scrolling the moment we hand the page over.
  useEffect(() => {
    if (done) document.documentElement.style.overflow = "";
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-ink"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* blurred brand backdrop */}
          <img
            src="/images/home-bg.svg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full scale-110 object-cover opacity-40 blur-2xl"
          />
          <div className="absolute inset-0 bg-ink/70 backdrop-blur-xl" />

          {/* loader */}
          <div className="relative flex flex-col items-center gap-7">
            <div className="relative flex h-32 w-32 items-center justify-center">
              {/* static track */}
              <span className="absolute inset-0 rounded-full border-2 border-white/5" />
              {/* spinning gold arc */}
              <span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-r-[#D8B48C]/40 border-t-[#D8B48C] [animation-duration:1s]" />
              {/* pulsing crest */}
              <motion.img
                src="/images/cdt-logo.svg"
                alt="CDT Distribution"
                className="h-12 w-auto drop-shadow-[0_4px_16px_rgba(226,30,36,0.55)]"
                animate={{ scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            {/* progress */}
            <div className="flex flex-col items-center gap-2">
              <div className="h-[3px] w-44 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#D8B48C] to-brand"
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut", duration: 0.4 }}
                />
              </div>
              <span className="font-poppins text-xs tracking-[0.3em] text-cream/60">
                {progress}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
