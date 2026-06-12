"use client";
import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

/**
 * 02 — About.
 *
 * Landscape desktop (min-width:768px + landscape): a pinned viewport translates
 * a wide two-panel track sideways as you scroll — Panel 1 the full-bleed VIDEO
 * with "Your Local Wholesale Partner", Panel 2 the "Loved by Thousands"
 * composition (headline + product shots + RawLeaf collage, fit to the viewport
 * at Figma proportions, revealed as it scrolls in).
 *
 * Portrait / mobile: the pin is disabled and the two panels stack vertically,
 * with Panel 2 reflowed into a centred column so nothing is squashed.
 */

const W2 = 1671; // scene-2 design width
const H2 = 900; //  scene-2 design height
const fs = (px) => `min(${((px / W2) * 100).toFixed(4)}vw, ${((px / H2) * 100).toFixed(4)}vh)`;
const pctX = (px) => `${((px / W2) * 100).toFixed(4)}%`;
const pctY = (px) => `${((px / H2) * 100).toFixed(4)}%`;

const IDLE_MS = 2500; // hide the video copy after this much cursor stillness

const PRODUCTS = [
  { src: "/images/about-cable.png", alt: "Boost Plus LED dynamic display data cable" },
  { src: "/images/about-scales.png", alt: "Boost Plus digital pocket scales" },
  { src: "/images/about-buds.png", alt: "Boost Plus wireless earbuds" },
];

export default function About() {
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const barRef = useRef(null);
  const [copyVisible, setCopyVisible] = useState(true);

  // Pinned vertical → horizontal sweep (landscape desktop only) + reveal
  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const horizMQ = window.matchMedia("(min-width: 768px) and (orientation: landscape)");
    const isHoriz = () => horizMQ.matches && !reduce;
    let raf = 0;
    const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);

    const setReveal = (reveal) => {
      track.querySelectorAll("[data-reveal]").forEach((el) => {
        const order = parseFloat(el.dataset.reveal) || 0;
        const stagger = order * 0.12;
        const r = clamp((reveal - stagger) / (1 - stagger || 1), 0, 1);
        const e = 1 - Math.pow(1 - r, 3); // easeOutCubic
        el.style.opacity = e.toFixed(3);
        if (el.dataset.mask !== undefined) {
          el.style.transform = `translateY(${((1 - e) * 118).toFixed(1)}%)`;
        } else {
          el.style.transform = `translateY(${((1 - e) * 46).toFixed(1)}px) scale(${(
            0.9 + e * 0.1
          ).toFixed(3)})`;
        }
      });
    };

    const layout = () => {
      const vh = window.innerHeight;
      const maxX = Math.max(0, track.scrollWidth - window.innerWidth);
      wrap.style.height = `${vh + maxX}px`;
    };

    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const total = wrap.offsetHeight - vh;
      const top = wrap.getBoundingClientRect().top;
      const progress = total > 0 ? clamp(-top / total, 0, 1) : 0;
      const maxX = track.scrollWidth - window.innerWidth;
      track.style.transform = `translate3d(${(-maxX * progress).toFixed(2)}px,0,0)`;
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress.toFixed(4)})`;
      setReveal(clamp((progress - 0.2) / 0.6, 0, 1)); // hidden on video → in on scroll
    };

    const stack = () => {
      // portrait / reduced-motion: no pin, everything shown
      wrap.style.height = "";
      track.style.transform = "none";
      if (barRef.current) barRef.current.style.transform = "scaleX(0)";
      setReveal(1);
    };

    const apply = () => (isHoriz() ? (layout(), update()) : stack());
    const onScroll = () => {
      if (isHoriz() && !raf) raf = requestAnimationFrame(update);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", apply);
    horizMQ.addEventListener?.("change", apply);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", apply);
      horizMQ.removeEventListener?.("change", apply);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Auto-hide the video copy when the cursor goes still
  useEffect(() => {
    let timer = 0;
    const wake = () => {
      setCopyVisible(true);
      clearTimeout(timer);
      timer = setTimeout(() => setCopyVisible(false), IDLE_MS);
    };
    wake();
    window.addEventListener("mousemove", wake, { passive: true });
    window.addEventListener("scroll", wake, { passive: true });
    window.addEventListener("touchstart", wake, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", wake);
      window.removeEventListener("scroll", wake);
      window.removeEventListener("touchstart", wake);
    };
  }, []);

  const hiddenRise = { opacity: 0, transform: "translateY(46px) scale(0.9)" };
  const hiddenMask = { opacity: 0, transform: "translateY(118%)" };
  const headPos = {
    left: pctX(0),
    top: pctY(283),
    width: pctX(818),
    fontSize: fs(150),
    lineHeight: fs(170),
    letterSpacing: "-0.02em",
  };
  const stroke = { color: "transparent", WebkitTextStroke: "max(1.5px, 0.18vw) #FAF8F2" };

  return (
    <section ref={wrapRef} id="about" aria-label="About CDT" className="relative bg-ink-2">
      <div className="relative md:landscape:sticky md:landscape:top-0 md:landscape:h-screen md:landscape:overflow-hidden">
        {/* progress bar (horizontal mode only) */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-40 hidden h-[3px] bg-white/5 md:landscape:block">
          <div ref={barRef} className="h-full w-full origin-left bg-brand" style={{ transform: "scaleX(0)" }} />
        </div>

        {/* Track — stacks vertically in portrait, runs sideways in landscape */}
        <div className="flex w-full flex-col will-change-transform md:landscape:h-full md:landscape:w-max md:landscape:flex-row" ref={trackRef}>
          {/* ───────── Panel 1 — full-width video ───────── */}
          <article className="relative h-[100svh] w-full shrink-0 overflow-hidden bg-black md:landscape:h-full md:landscape:w-screen">
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src="/videos/about.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster="/images/about-bg.png"
            />
            <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to bottom, #0A0A08 0%, rgba(10,10,8,0.5) 9%, transparent 26%)" }} />
            <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to top, rgba(16,15,10,0.6) 0%, rgba(16,15,10,0.1) 38%, transparent 60%)" }} />
            <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to right, rgba(16,15,10,0.3) 0%, transparent 32%)" }} />
            <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(150% 130% at 45% 42%, transparent 62%, rgba(16,15,10,0.45) 88%, rgba(16,15,10,0.85) 100%)" }} />
            {/* right edge merges into panel-2 colour (landscape only) */}
            <div className="pointer-events-none absolute inset-0 hidden md:landscape:block" style={{ background: "linear-gradient(to right, transparent 50%, rgba(16,15,10,0.55) 80%, #100F0A 100%)" }} />

            {/* Copy — bottom-left, animates in, auto-hides on idle */}
            <div
              className="absolute bottom-[9%] left-5 z-10 max-w-[min(90vw,840px)] sm:left-8 lg:left-[99px] lg:bottom-[12%] xl:left-[150px]"
              style={{
                transition: "opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1), filter 0.7s ease",
                opacity: copyVisible ? 1 : 0,
                transform: copyVisible ? "translateY(0)" : "translateY(14px)",
                filter: copyVisible ? "blur(0px)" : "blur(4px)",
              }}
            >
              <span className="mb-3 flex items-center gap-3 opacity-0 animate-fadeUp [animation-delay:80ms] sm:mb-4">
                <span className="h-px w-8 bg-brand" />
                <span className="font-dm text-[clamp(10px,2.6vw,11px)] font-bold uppercase tracking-[0.35em] text-white/75">About CDT</span>
              </span>
              <h2 className="font-gotham font-bold leading-[1.04] tracking-tight text-cream [text-shadow:0_2px_12px_rgba(0,0,0,0.85),0_1px_3px_rgba(0,0,0,0.9)]">
                <span className="block overflow-hidden">
                  <span className="block animate-textReveal [animation-delay:160ms] text-[clamp(30px,7vw,72px)]">One warehouse.</span>
                </span>
                <span className="block overflow-hidden">
                  <span className="block animate-textReveal [animation-delay:300ms] text-[clamp(26px,6vw,60px)]">Everything your store needs.</span>
                </span>
              </h2>
              <p className="mt-4 max-w-[600px] font-poppins text-[clamp(13px,3.4vw,17px)] font-light leading-relaxed text-muted opacity-0 animate-fadeUp [text-shadow:0_1px_8px_rgba(0,0,0,0.9)] [animation-delay:460ms] sm:mt-5">
                We&apos;ve been stocking South Carolina before it was cool. Massive range, exclusive
                deals, zero fluff — your go-to wholesale supplier for smoke essentials, disposables &amp;
                groceries across South Carolina for 10+ years and counting.
              </p>
            </div>
          </article>

          {/* ───────── Panel 2 — Loved by Thousands ───────── */}
          <article className="relative w-full shrink-0 bg-ink-2 md:landscape:h-full md:landscape:w-screen">
            {/* Landscape composition — whole scene fit into the viewport */}
            <div className="hidden h-full w-full items-center justify-center md:landscape:flex">
              <div className="relative" style={{ width: "min(100vw, 185.6667vh)", aspectRatio: `${W2} / ${H2}` }}>
                <img data-reveal="1" src="/images/about-collage.png" alt="RawLeaf natural tobacco leaf wrap range" className="absolute object-cover" style={{ left: pctX(906), top: 0, width: pctX(765), height: "100%", zIndex: 1, ...hiddenRise }} />

                {/* solid headline (behind shots) */}
                <h2 className="absolute font-gotham font-bold text-cream" style={{ ...headPos, zIndex: 10, textShadow: "0 2px 24px rgba(0,0,0,0.45)" }}>
                  <span className="block overflow-hidden"><span data-reveal="0" data-mask className="block" style={hiddenMask}>Loved by</span></span>
                  <span className="block overflow-hidden"><span data-reveal="0.5" data-mask className="block" style={hiddenMask}>Thousands</span></span>
                </h2>
                {/* outline headline (above shots → knockout over images) */}
                <h2 aria-hidden="true" className="absolute font-gotham font-bold" style={{ ...headPos, zIndex: 25 }}>
                  <span className="block overflow-hidden"><span data-reveal="0" data-mask className="block" style={{ ...hiddenMask, ...stroke }}>Loved by</span></span>
                  <span className="block overflow-hidden"><span data-reveal="0.5" data-mask className="block" style={{ ...hiddenMask, ...stroke }}>Thousands</span></span>
                </h2>

                <img data-reveal="2" src={PRODUCTS[0].src} alt={PRODUCTS[0].alt} className="absolute rounded-2xl object-cover shadow-2xl shadow-black/60" style={{ left: pctX(53), top: pctY(401), width: pctX(323), height: pctY(381), zIndex: 20, ...hiddenRise }} />
                <img data-reveal="2.6" src={PRODUCTS[1].src} alt={PRODUCTS[1].alt} className="absolute rounded-2xl object-cover shadow-2xl shadow-black/60" style={{ left: pctX(715), top: pctY(148), width: pctX(290), height: pctY(290), zIndex: 20, ...hiddenRise }} />
                <img data-reveal="3.2" src={PRODUCTS[2].src} alt={PRODUCTS[2].alt} className="absolute rounded-2xl object-cover shadow-2xl shadow-black/60" style={{ left: pctX(567), top: pctY(618), width: pctX(192), height: pctY(181), zIndex: 20, ...hiddenRise }} />
              </div>
            </div>

            {/* Portrait / mobile — stacked column */}
            <div className="flex min-h-[100svh] flex-col items-center justify-center gap-7 px-5 py-16 text-center sm:px-6 md:landscape:hidden">
              <Reveal from="up">
                <h2 className="font-gotham font-bold uppercase leading-[0.95] tracking-tight text-cream [text-wrap:balance] text-[clamp(30px,9vw,96px)]">
                  Loved by <span className="text-brand">Thousands</span>
                </h2>
              </Reveal>
              <Reveal from="up" delay={120} className="w-full">
                <div className="mx-auto grid w-full max-w-md grid-cols-3 gap-3">
                  {PRODUCTS.map((p) => (
                    <img key={p.src} src={p.src} alt={p.alt} className="aspect-[3/4] w-full rounded-xl object-cover shadow-xl shadow-black/50" />
                  ))}
                </div>
              </Reveal>
              <Reveal from="up" delay={220} className="w-full">
                <img src="/images/about-collage.png" alt="RawLeaf natural tobacco leaf wrap range" className="mx-auto w-full max-w-md rounded-2xl shadow-xl shadow-black/50" />
              </Reveal>
            </div>
          </article>
        </div>

        {/* scroll hint (horizontal mode only) */}
        <div className="pointer-events-none absolute bottom-7 left-1/2 z-40 hidden -translate-x-1/2 items-center gap-3 text-white/55 md:landscape:flex">
          <span className="font-dm text-[11px] font-bold uppercase tracking-[0.4em]">Scroll</span>
          <span className="block h-px w-12 bg-white/40" />
        </div>
      </div>
    </section>
  );
}
