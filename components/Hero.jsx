"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

/**
 * Pixel-exact rebuild of the Figma "01 — Hero" frame (1440×900).
 * Everything is absolutely positioned at its exact Figma coordinate/size and
 * the whole 1440×900 stage is scaled to fit the viewport width, so the layout
 * stays pixel-faithful at any width. Fonts: Gotham→Montserrat, Poppins→Poppins.
 */

// Active item drives the whole hero. Index 0 = TETON (the Figma default).
const PRODUCTS = [
  {
    tag: "Cigarettes", name: "Teton", rank: "#1 Retailers' Go-To Choice",
    titleLight: "EVERYDAY", titleBold: "TETON", rating: "4.9", likes: 46, img: "/images/hero-teton.png", thumb: "/images/hero-teton-thumb.png",
    desc: "South Carolina's exclusive value champion. Big on savings, easy on budgets, and available only through CDT Wholesale.",
  },
  {
    tag: "Scales", name: "Boost Plus", rank: "#2 Trending in Tools & Gadgets",
    titleLight: "PRECISION", titleBold: "BOOST+", rating: "4.8", likes: 61, img: "/images/hero-scale.png", thumb: "/images/hero-scale-thumb.png",
    desc: "Small in size. Big on accuracy. With multiple variants available, there's a Boost Plus Scale for almost every measuring need.",
  },
  {
    tag: "Mobile Accessories", name: "Boost Plus", rank: "#1 Tech Essential Collection",
    titleLight: "ESSENTIAL", titleBold: "BOOST+", rating: "4.9", likes: 38, img: "/images/hero-acc.png", thumb: "/images/hero-acc-thumb.png",
    desc: "Chargers, cables, wireless earbuds, adapters, and more. If it powers, connects, or keeps devices running, chances are we've got it.",
  },
  {
    tag: "Cigarillos", name: "Raw Leaf", rank: "Newest Shelf Addition",
    titleLight: "JUST 89¢", titleBold: "RAW LEAF", rating: "NEW", likes: 92, img: "/images/hero-rawleaf.png", thumb: "/images/hero-rawleaf-thumb.png",
    desc: "Raw Leaf delivers premium quality with an 89¢ pre-priced value customers love. Built for strong sell-through and even stronger margins.",
  },
];
const THUMB_X = [169, 342, 515, 688];
const AUTOPLAY_MS = 3800;
// Origin of the cigarette smoke (stage-px, inside the right cluster). Tune to sit
// exactly on the lit tip near the lion's mouth.
const SMOKE = { x: 988, y: 556 };

const CREAM = "#FAF8F2";
const abs = (x, y, w, h) => ({ position: "absolute", left: x, top: y, width: w, height: h });

// The big ring = Figma "Ellipse 8" @(-271,-528) 1020×1020. It's huge and mostly
// off-canvas (center up-left), so only its lower-right arc shows — exactly the
// "one big ring, display small part" the reference calls for.
const BIG_RING = { cx: 239, cy: -18, r: 505 };
// The circular product window that rides on the ring (Figma "Frame 48" 400×400).
const CIRCLE = { x: 156, y: 116, size: 400 };

// The circle doesn't sit in place — it RIDES the ring. Its centre travels along
// an arc concentric with the big ring, so the slide hugs the ring's curvature.
const RING_C = { x: BIG_RING.cx, y: BIG_RING.cy };
const CIRCLE_C = { x: CIRCLE.x + CIRCLE.size / 2, y: CIRCLE.y + CIRCLE.size / 2 }; // (356,316)
const R_C = Math.hypot(CIRCLE_C.x - RING_C.x, CIRCLE_C.y - RING_C.y); // ≈ 354
const THETA0 = Math.atan2(CIRCLE_C.y - RING_C.y, CIRCLE_C.x - RING_C.x); // resting angle on the arc
const DELTA = (58 * Math.PI) / 180; // a FULL slide along the ring on each change

// Transform offset (relative to the resting spot) for the circle sitting `dθ`
// radians further along the ring arc. Smaller angle = up toward the top, larger
// angle = down toward the left — so −Δ is the "top" slot, +Δ is the "left" slot.
const ringOff = (dTheta) => {
  const t = THETA0 + dTheta;
  return { x: RING_C.x + R_C * Math.cos(t) - CIRCLE_C.x, y: RING_C.y + R_C * Math.sin(t) - CIRCLE_C.y };
};
// Waypoints (as {x,y} transform offsets from the resting spot) tracing the ring
// arc between two angles — fed to GSAP MotionPath so the circle follows a true
// smooth curve over the full sweep.
const arcPathPoints = (fromT, toT, n = 6) => {
  const pts = [];
  for (let i = 0; i <= n; i++) pts.push(ringOff(fromT + ((toT - fromT) * i) / n));
  return pts;
};

// entrance helper
const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 36 },
  animate: { opacity: 1, y: 0 },
  transition: { type: "spring", stiffness: 90, damping: 18, delay },
});

export default function Hero() {
  const wrapRef = useRef(null);
  // The whole 1440×900 stage is CONTAIN-fit into the section (so nothing is ever
  // cropped or pushed below the fold), then laid out so it reads full-bleed:
  //  · scale  — uniform contain scale = min(w/1440, h/900)
  //  · left/top — stage offset; horizontally centered, vertically BOTTOM-anchored
  //    (on tall/tablet screens the scene sits on the floor with wall above, never
  //    floating in a mid-screen band)
  //  · push  — how far (in stage px) to shove the left & right clusters toward the
  //    viewport edges so a wide screen fills edge-to-edge instead of a centered box
  const [view, setView] = useState({ scale: 1, left: 0, top: 0, push: 0, height: undefined });
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(true);
  const tlRef = useRef(null); // the in-flight circle-slide timeline (if any)
  const p = PRODUCTS[active];
  // A non-numeric rating (e.g. "NEW") marks a fresh arrival: we show a stacked
  // "New / Arrival" label instead of a star rating (and hide the stars, since
  // there's no numeric score). The likes pill stays visible.
  const isNew = isNaN(parseFloat(p.rating));

  // Two persistent circle layers cross-flown by GSAP (no remount → no decode
  // hitch). frontRef = which layer currently holds the featured product.
  const layerRefs = [useRef(null), useRef(null)];
  const frontRef = useRef(0);
  const firstSlide = useRef(true);
  // Which product index each circle layer currently displays, so the outgoing
  // (left-sliding) circle keeps showing the PREVIOUS product while the incoming
  // one shows the new active product — never two identical circles mid-slide.
  const [layerProd, setLayerProd] = useState([0, 0]);

  // Register the MotionPath plugin + set the initial layer states once.
  useEffect(() => {
    gsap.registerPlugin(MotionPathPlugin);
    gsap.set(layerRefs[0].current, { opacity: 1, scale: 1, x: 0, y: 0, rotation: 0 });
    gsap.set(layerRefs[1].current, { opacity: 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // On every active change, slide the circle a FULL arc along the ring: the
  // outgoing rides centre → left and fades; the incoming rides top → centre.
  // GPU-friendly transforms only, so it stays smooth.
  useEffect(() => {
    if (firstSlide.current) {
      firstSlide.current = false;
      return;
    }
    // If a previous slide is still mid-flight (autoplay tick or a quick manual
    // click), snap it to its end FIRST so the two circle layers are in a known,
    // consistent state. Without this, a new slide starts on top of a running
    // one and the circles tangle — the "not proper slide" after returning.
    const running = tlRef.current;
    if (running) {
      running.progress(1); // fires its onComplete → flips frontRef cleanly
      running.kill();
      tlRef.current = null;
    }
    const front = layerRefs[frontRef.current].current;
    const back = layerRefs[1 - frontRef.current].current;
    if (!front || !back) return;
    const d = dir;

    // The incoming (back) layer shows the new active product; the outgoing
    // (front) layer keeps the previous product it was already displaying.
    setLayerProd((lp) => {
      const n = [...lp];
      n[1 - frontRef.current] = active;
      return n;
    });

    const start = ringOff(-d * DELTA); // the "top" slot the incoming starts from
    gsap.set(back, { x: start.x, y: start.y, scale: 0.55, rotation: d * 16, opacity: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        frontRef.current = 1 - frontRef.current;
        tlRef.current = null;
      },
    });
    tlRef.current = tl;
    // outgoing: centre → left, shrink + fade off
    tl.to(front, {
      motionPath: { path: arcPathPoints(0, d * DELTA), curviness: 1.25, autoRotate: false },
      scale: 0.55, rotation: -d * 16, opacity: 0, duration: 0.62, ease: "power2.in",
    }, 0);
    // incoming: top → centre, grow + fade in (overlaps the tail so there's no gap)
    tl.to(back, {
      motionPath: { path: arcPathPoints(-d * DELTA, 0), curviness: 1.25, autoRotate: false },
      scale: 1, rotation: 0, opacity: 1, duration: 0.78, ease: "power3.out",
    }, 0.34);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    // CONTAIN-fit the 1440×900 scene, then size the SECTION to the scaled scene
    // height. One rule handles every width:
    //  · wide screens (≥1440-ish): height-constrained → the scene fills the full
    //    100vh; the spare width is taken up by pushing the side clusters out to
    //    the edges, so it reads full-bleed with nothing cropped or below the fold.
    //  · narrow screens (<1440): width-constrained → the section shrinks to the
    //    scene's natural height, a clean full-width banner with NO dead wall above
    //    and the rest of the page flowing right below it.
    // The whole scene is therefore always fully visible and full-width, never
    // letterboxed, cropped, or floating in a mid-screen band.
    const apply = () => {
      const w = el.clientWidth;
      if (w < 1024) {                         // phones & tablets use the stacked layout
        setView((v) => ({ ...v, height: null }));
        return;
      }
      const vh = window.innerHeight;          // viewport height (NOT the section's, which we resize)
      const s = Math.min(w / 1440, vh / 900);
      const stageW = 1440 * s;
      const stageH = 900 * s;
      const left = (w - stageW) / 2;          // horizontal centre
      // Spare horizontal space, expressed in STAGE px, split to each side. Capped
      // so the clusters reach the edges on normal/wide screens without flying off
      // on ultrawide (where a little side margin is fine). Zero on narrow screens.
      const push = Math.min((w - stageW) / 2 / s, 170);
      setView({ scale: s, left, top: 0, push, height: Math.round(stageH) });
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    window.addEventListener("resize", apply);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", apply);
    };
  }, []);

  // Pause autoplay while the hero is scrolled off-screen and resume the moment
  // it returns — so coming back to Home always auto-slides again. Leaving view
  // also clears any stuck hover-pause (a wheel-scroll can swallow mouseleave).
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([e]) => {
        setInView(e.isIntersecting);
        if (!e.isIntersecting) setPaused(false);
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Auto-advance through the products; resets on every change, pauses on hover,
  // and only runs while the hero is actually on screen.
  useEffect(() => {
    if (paused || !inView) return;
    const id = setTimeout(() => {
      setDir(1);
      setActive((a) => (a + 1) % PRODUCTS.length);
    }, AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [active, paused, inView]);

  const select = (i) => {
    if (i === active) return;
    const d = i > active ? 1 : -1;
    setDir(d);
    setActive(i);
  };

  // "Shop Now" glides down to the Reviews section. If it ever sits inside a
  // pinned horizontal block we scroll to the point where THAT panel is centred
  // (matching the side-rail logic); otherwise we scroll to the section top.
  const goToForm = (e) => {
    e.preventDefault();
    if (typeof document === "undefined") return;
    const el = document.getElementById("reviews");
    if (!el) return;
    const horiz = window.matchMedia("(min-width: 768px) and (orientation: landscape)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const panel = el.closest("[data-hpanel]");
    const wrap = panel && panel.closest("[data-hscroll]");
    let targetY;
    if (horiz && !reduced && panel && wrap) {
      const i = parseInt(panel.dataset.hpanel, 10) || 0;
      const n = parseInt(wrap.dataset.hscroll, 10) || 1;
      const wrapTop = wrap.getBoundingClientRect().top + window.scrollY;
      const span = Math.max(0, wrap.offsetHeight - window.innerHeight);
      targetY = wrapTop + (n > 1 ? (span * i) / (n - 1) : 0);
    } else {
      targetY = el.getBoundingClientRect().top + window.scrollY - 20;
    }
    targetY = Math.max(0, Math.round(targetY));
    window.scrollTo({ top: targetY, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <section
      id="hero"
      ref={wrapRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={view.height ? { height: view.height } : undefined}
      className="relative w-full overflow-hidden bg-ink lg:h-[100dvh]"
    >
      {/* ---- Full-bleed background: ONE image spanning the entire viewport
          width behind the stage, so the wall/floor reads as a single seamless
          backdrop with no letterbox strips. ---- */}
      <img
        src="/images/home-bg.svg"
        alt=""
        className="absolute inset-0 hidden h-full w-full object-cover lg:block"
      />
      {/* gentle fade into the next section — full width */}
      <div className="absolute inset-x-0 bottom-0 hidden h-[18%] bg-gradient-to-b from-transparent to-ink lg:block" />

      {/* ---- DESKTOP / TABLET: pixel-exact 1440×900 stage, CONTAIN-fit into the
          100dvh section so the whole balanced design (products, card, lion,
          thumbnails, floor) is always fully visible on one screen — never zoomed,
          clipped, or below the fold. Centred horizontally, bottom-anchored
          vertically; the side clusters get pushed outward (see `push`) so it
          fills the width edge-to-edge instead of sitting in a centred box. ---- */}
      <div
        className="absolute hidden lg:block"
        style={{ left: view.left, top: view.top, width: 1440, height: 900, transform: `scale(${view.scale})`, transformOrigin: "top left" }}
      >
        {/* ---- LEFT CLUSTER (ring + product carousel) — pushed toward the left
            edge so the scene fills the viewport's left side on wide screens. ---- */}
        <div style={{ position: "absolute", inset: 0, transform: `translateX(${-view.push}px)` }}>
        {/* Ellipse 8 ring (Figma export) — the SVG is pre-cropped to its
            on-canvas lower-right arc, so it drops in at the stage origin at its
            native 749×492. */}
        <img src="/images/hero-ring.svg" alt="" style={abs(0, 0, 749, 492)} className="pointer-events-none select-none" />


        {/* ---- RADIAL CAROUSEL: the circular product window rides the ring ----
            Two persistent 400×400 layers (no remount) cross-flown by GSAP along
            the ring arc — one slides centre → left and fades, the other rides
            top → centre. Each is promoted to its own GPU layer (will-change) so
            the drop-shadow rasterises once and the slide stays smooth. */}
        <div style={{ position: "absolute", left: 0, top: 0 }}>
          {[0, 1].map((li) => (
            <div
              key={li}
              ref={layerRefs[li]}
              style={{
                ...abs(CIRCLE.x, CIRCLE.y, CIRCLE.size, CIRCLE.size),
                willChange: "transform, opacity",
                transform: "translateZ(0)",
              }}
            >
              {/* product photo — each layer keeps its OWN product so the
                  outgoing circle shows the previous slide, not a duplicate.
                  Parent has perspective → the photo tilts in 3D (img-3d). */}
              <div
                className="absolute inset-0 overflow-hidden rounded-full shadow-[0_36px_72px_-18px_rgba(0,0,0,0.78)]"
                style={{ perspective: "1000px" }}
              >
                <img
                  src={PRODUCTS[layerProd[li]].img}
                  alt={PRODUCTS[layerProd[li]].name}
                  className="img-3d h-full w-full object-cover"
                  draggable={false}
                />
                <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_32%,transparent_56%,rgba(0,0,0,0.42))]" />
                <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(120%_80%_at_30%_14%,rgba(255,255,255,0.20),transparent_46%)]" />
                <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/10" />
              </div>
            </div>
          ))}
        </div>
        </div>
        {/* ---- end left cluster ---- */}

        {/* ---- Heading (Frame 37) — content swaps with the active item ---- */}
        <Swap kk={active} delay={0.5} pos={abs(600, 171, 460)} style={{ color: CREAM, lineHeight: "18px" }} className="font-gotham text-[18px] font-medium">
          {p.rank}
        </Swap>
        {/* top title line glides in from the RIGHT (right → left) — Figma: Gotham 275/70, #FAF8F2 */}
        <Swap kk={active} delay={0.58} slide="rtl" pos={abs(600, 204, 460)} style={{ color: CREAM, fontWeight: 300, lineHeight: "67px" }} className="whitespace-nowrap font-gotham text-[70px]">
          {p.titleLight}
        </Swap>
        {/* bottom title line glides in from the LEFT (left → right) — Figma: Gotham 700/80, #FAF8F2 */}
        <Swap kk={active} delay={0.66} slide="ltr" pos={abs(600, 273, 460)} style={{ color: CREAM, fontWeight: 700, lineHeight: "80px" }} className="whitespace-nowrap font-gotham text-[80px]">
          {p.titleBold}
        </Swap>
        <motion.a
          {...rise(0.42)}
          href="#reviews"
          onClick={goToForm}
          style={{ ...abs(600, 360, 145, 48), backgroundColor: "#E22423", borderRadius: 29, zIndex: 40 }}
          className="flex cursor-pointer items-center justify-center font-gotham text-[18px] font-normal text-cream transition-transform hover:scale-105"
        >
          Shop Now
        </motion.a>

        {/* ---- RIGHT CLUSTER (lamp · rating card · lion · plant) ----
            Shifted right as a group so it fills the right side of the full-bleed
            background and balances the product on the left. */}
        <div className="pointer-events-none" style={{ position: "absolute", inset: 0, transform: `translateX(${view.push}px)` }}>
        {/* ---- Hanging lamp (Frame 328) @(1270,-106) 74×400 ----
            Real Figma export (Group.svg); LampSvg kept as a 404 fallback. */}
        <div style={{ ...abs(1270, -20, 74, 400), zIndex: 30 }} className="animate-float">
          <ImgFallback src="/images/hero-lamp.svg" imgClass="object-contain">
            <LampSvg />
          </ImgFallback>
        </div>

        {/* ---- Rating card group — gently floats as one unit so it reads as
            hovering "in air" (slower than the products to feel organic) ---- */}
        <div className="animate-float [animation-duration:8s]" style={{ position: "absolute", inset: 0 }}>
        {/* Review card bg (Frame 38) — warm light cast by the hanging bulb */}
        <motion.div
          {...rise(0.28)}
          style={{ ...abs(1101, 162, 303, 416), borderRadius: 10 }}
          className="overflow-hidden border border-white/10 bg-white/[0.10] backdrop-blur-md"
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(115% 62% at 68% 42%, rgba(255,214,138,0.42), rgba(255,198,108,0.13) 40%, transparent 66%)" }}
          />
        </motion.div>
        {/* ---- Rating — clean number + gold stars, no disc/ring ---- */}
        <Swap
          kk={active}
          delay={0.74}
          pos={abs(1129, isNew ? 196 : 194, 220)}
          style={isNew ? undefined : { lineHeight: "52px" }}
          className={`font-gotham text-cream ${
            isNew ? "uppercase tracking-wide" : "whitespace-nowrap text-[52px] font-black"
          }`}
        >
          {isNew ? (
            <>
              <span className="block text-[42px] font-semibold leading-none">New</span>
              <span className="mt-1 block text-[22px] font-medium leading-none">Arrival</span>
            </>
          ) : (
            p.rating
          )}
        </Swap>
        {!isNaN(parseFloat(p.rating)) && (
          <motion.div {...rise(0.4)} style={abs(1131, 250, 220)} className="pointer-events-none">
            <StarRow value={p.rating} size={20} gap={3} />
          </motion.div>
        )}
        <Swap kk={active} delay={0.82} pos={abs(1129, 358, 248)} style={{ lineHeight: "30px" }} className="font-gotham text-[30px] font-medium text-white">
          {p.name}
        </Swap>
        <Swap kk={active} delay={0.9} pos={abs(1129, 400, 248)} style={{ color: "#E9E6E6", lineHeight: "24px" }} className="font-poppins text-[16px] font-light">
          {p.desc}
        </Swap>
        {/* likes pill — sits right under the stars (above the name) @(1129,305) 109×35 */}
        <motion.div
          {...rise(0.46)}
          style={{ ...abs(1129, 288, 109, 35), borderRadius: 110 }}
          className="flex items-center gap-2 bg-white/[0.10] pl-3 font-poppins text-[14px] font-light text-[#E9E6E6]"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 10v11" /><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
          </svg>
          <AnimatePresence mode="wait">
            <motion.span
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {p.likes} Likes
            </motion.span>
          </AnimatePresence>
        </motion.div>
        </div>
        {/* ---- end rating card group ---- */}

        {/* ---- Lion (navy, Frame 351) @(869,496) 412×440 ---- */}
        <motion.img
          {...rise(0.3)}
          src="/images/hero-lion.png"
          alt=""
          style={abs(869, 496, 412, 440)}
          className="object-contain"
        />

        {/* ---- Cigarette smoke — wispy puffs rising from the lit tip ---- */}
        <div className="pointer-events-none absolute" style={{ left: SMOKE.x, top: SMOKE.y, zIndex: 20 }} aria-hidden="true">
          {[0, 0.9, 1.7, 2.5, 3.2].map((delay, i) => {
            const size = 9 + (i % 3) * 4;
            return (
              <span
                key={i}
                className="absolute block rounded-full bg-white/55 animate-smoke"
                style={{
                  width: size,
                  height: size,
                  left: (i % 2 ? 5 : -3),
                  filter: "blur(6px)",
                  animationDelay: `${delay}s`,
                  animationDuration: `${3.6 + (i % 3) * 0.7}s`,
                }}
              />
            );
          })}
        </div>

        {/* ---- Plant (Frame 351:831) @(1250,594) 174×474 ----
            Real Figma export (Group (1).svg); PlantSvg kept as a 404 fallback. */}
        <motion.div {...rise(0.4)} style={abs(1230, 594, 174, 474)}>
          <ImgFallback src="/images/hero-plant.svg" imgClass="object-contain object-top">
            <PlantSvg />
          </ImgFallback>
        </motion.div>
        </div>
        {/* ---- end right cluster ---- */}

        {/* ---- Thumbnails (Frame 47) @ y611, 150×160 each ---- */}
        {PRODUCTS.map((p, i) => (
          <button
            key={i}
            onClick={() => select(i)}
            aria-pressed={active === i}
            style={abs(THUMB_X[i], 611, 150, 168)}
            className="group"
          >
            {/* Only the active thumbnail gets a background — Figma spec:
                #474747 @40% fill, 1px #615E5E border, 25px backdrop blur,
                drop shadow 0/14/15 spread 6 black 30%. It glides via layoutId. */}
            {active === i && (
              <motion.div
                layoutId="thumb-active"
                style={{ borderRadius: 16 }}
                className="absolute inset-0 border border-[#615E5E] bg-[rgba(71,71,71,0.40)] shadow-[0_14px_15px_6px_rgba(0,0,0,0.30)] backdrop-blur-[25px]"
                transition={{ type: "spring", stiffness: 320, damping: 30 }}
              />
            )}
            <img
              src={p.thumb}
              alt={p.name}
              style={abs(8, 12, 134, 96)}
              className="rounded-lg object-contain transition-transform duration-500 group-hover:scale-105"
            />
            {/* Figma: tag = Poppins 400 / 12px / lh20 / #FFFFFF80 */}
            <p
              style={{ ...abs(0, 118, 150), color: "rgba(255,255,255,0.5)", lineHeight: "20px", letterSpacing: 0 }}
              className="text-center font-poppins text-[12px] font-normal"
            >
              {p.tag}
            </p>
            {/* Figma: name = Poppins 600 SemiBold / 18px / line-height 100% / #FFFFFF */}
            <p
              style={{ ...abs(0, 138, 150), lineHeight: "18px", letterSpacing: 0 }}
              className="text-center font-poppins text-[18px] font-semibold text-white"
            >
              {p.name}
            </p>
          </button>
        ))}
      </div>

      {/* ---- PHONE / TABLET (<1024px): stacked, normal-flow layout. The landscape
          stage would be unusably tiny when contain-fit to a narrow screen, so the
          same data & active state are re-laid-out as a clean centred column that
          scales smoothly from small phones up through tablets. ---- */}
      <div className="relative flex min-h-[100dvh] flex-col px-[max(1.25rem,5vw)] pb-[clamp(1.5rem,5vw,2.5rem)] pt-[clamp(4.5rem,15vw,7rem)] lg:hidden">
        {/* soft full-bleed background wash so the dark stage reads here too */}
        <img
          src="/images/home-bg.svg"
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-50"
        />
        {/* warm radial glow centred behind the product, for depth */}
        <div className="pointer-events-none absolute left-1/2 top-[42%] h-[78vw] max-h-[460px] w-[78vw] max-w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(226,36,35,0.16),transparent_62%)]" />

        {/* centred content column — caps the width so it stays a tidy column on
            wide tablets instead of stretching edge-to-edge */}
        <div className="relative mx-auto flex w-full max-w-[34rem] flex-1 flex-col justify-center sm:max-w-[48rem]">
          {/* hero row — stacks on phones, headline + product side-by-side on tablets */}
          <div className="flex flex-col items-center gap-[clamp(1.75rem,6vw,2.5rem)] sm:flex-row sm:gap-8 md:gap-10">
          {/* headline */}
          <div className="relative w-full text-center sm:flex-1 sm:text-left">
            <Mobile kk={active} className="font-gotham text-[clamp(0.72rem,3.2vw,0.95rem)] font-medium tracking-wide text-cream/80">
              {p.rank}
            </Mobile>
            <Mobile kk={active} className="mt-1.5 font-gotham text-[clamp(1.4rem,7vw,2.4rem)] font-light leading-none text-cream">
              {p.titleLight}
            </Mobile>
            <Mobile kk={active} className="mt-0.5 font-gotham text-[clamp(2rem,11vw,3.5rem)] font-bold leading-[1.05] text-cream">
              {p.titleBold}
            </Mobile>
            <a
              href="#reviews"
              onClick={goToForm}
              className="mt-[clamp(1rem,4vw,1.5rem)] inline-flex h-12 items-center justify-center rounded-full bg-[#E22423] px-8 font-gotham text-[clamp(0.9rem,4vw,1.05rem)] text-cream shadow-[0_10px_24px_-6px_rgba(226,36,35,0.6)] transition-transform active:scale-95"
            >
              Shop Now
            </a>
          </div>

          {/* product circle — the cluster is centred in the circle and floats */}
          <div className="relative aspect-square w-[min(68vw,320px)] shrink-0 sm:w-[min(42vw,340px)]">
            <div className="absolute inset-0 overflow-hidden rounded-full ring-1 ring-white/10 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)]">
              <img src="/images/hero-circle.png" alt="" className="h-full w-full object-cover opacity-80" />
              <div className="absolute inset-0 rounded-full bg-black/50" />
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_30%,transparent_55%,rgba(0,0,0,0.55))]" />
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full"
                style={{ perspective: 800 }}
                initial={{ opacity: 0, scale: 0.85, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <img
                  src={p.img}
                  alt={p.name}
                  className="img-3d h-full w-full max-w-none object-cover"
                  draggable={false}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          </div>
          {/* end hero row */}

          {/* rating card — premium glass card with the gold gauge badge */}
          <div className="relative mt-[clamp(1.5rem,6vw,2.25rem)] rounded-2xl border border-white/10 bg-white/[0.07] p-[clamp(1rem,4.5vw,1.4rem)] shadow-[0_20px_40px_-24px_rgba(0,0,0,0.9)] backdrop-blur-md">
            <div className="flex items-center gap-3.5">
              {/* rating — number + gold stars, no disc/ring */}
              <div className="shrink-0 text-center">
                {isNew ? (
                  <span className="block w-[4.5rem] font-gotham uppercase tracking-wide text-cream">
                    <span className="block text-[clamp(1.2rem,5.5vw,1.55rem)] font-semibold leading-none">
                      New
                    </span>
                    <span className="mt-0.5 block text-[clamp(0.78rem,3.4vw,0.95rem)] font-medium leading-none">
                      Arrival
                    </span>
                  </span>
                ) : (
                  <span className="block font-gotham text-[clamp(1.9rem,9vw,2.4rem)] font-black uppercase leading-none text-cream">
                    {p.rating}
                  </span>
                )}
                {!isNew && (
                  <div className="mt-1.5 flex justify-center">
                    <StarRow value={p.rating} size={14} gap={2} />
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <Mobile kk={active} className="font-gotham text-[clamp(1.1rem,5vw,1.45rem)] font-medium leading-tight text-white">
                  {p.name}
                </Mobile>
                <div className="mt-2 flex items-center gap-2.5">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.10] py-1 pl-3 pr-3.5 font-poppins text-[clamp(0.72rem,3vw,0.82rem)] font-light text-white/80">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 10v11" /><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
                    </svg>
                    {p.likes} Likes
                  </span>
                </div>
              </div>
            </div>
            <Mobile kk={active} className="mt-3.5 font-poppins text-[clamp(0.8rem,3.4vw,0.92rem)] font-light leading-relaxed text-[#E9E6E6]">
              {p.desc}
            </Mobile>
          </div>

          {/* thumbnails — horizontal scroll, snapping */}
          <div className="-mx-[max(1.25rem,5vw)] mt-[clamp(1.25rem,5vw,1.75rem)] flex snap-x gap-3 overflow-x-auto px-[max(1.25rem,5vw)] pb-1 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {PRODUCTS.map((prod, i) => (
              <button
                key={i}
                onClick={() => select(i)}
                aria-pressed={active === i}
                className={`flex w-[clamp(6.5rem,28vw,7.5rem)] shrink-0 snap-start flex-col items-center rounded-2xl border p-2.5 transition-all duration-300 ${
                  active === i
                    ? "border-[#615E5E] bg-[rgba(71,71,71,0.40)] shadow-[0_14px_15px_6px_rgba(0,0,0,0.30)] backdrop-blur-[25px]"
                    : "border-transparent opacity-70"
                }`}
              >
                <img src={prod.thumb} alt={prod.name} className="h-[clamp(3.5rem,16vw,4.5rem)] w-full rounded-lg object-contain" />
                <span className="mt-1 text-center font-poppins text-[clamp(0.6rem,2.6vw,0.7rem)] text-white/50">{prod.tag}</span>
                <span className="text-center font-poppins text-[clamp(0.78rem,3.2vw,0.88rem)] font-semibold text-white">{prod.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Gold star rating — 5 stars, gold-filled proportionally to `value` / 5. A
// grey base row sits under a gold row that's clipped to the rating percentage,
// so 4.9 reads as "nearly five full stars" without a disc or ring.
function StarRow({ value, size = 18, gap = 3 }) {
  const v = Math.max(0, Math.min(5, parseFloat(value) || 0));
  const pct = (v / 5) * 100;
  const Row = ({ fill }) => (
    <div className="flex" style={{ gap }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" className="block shrink-0">
          <path
            d="M12 1 14.65 8.36 22.46 8.6 16.28 13.39 18.47 20.9 12 16.5 5.53 20.9 7.72 13.39 1.54 8.6 9.36 8.36Z"
            fill={fill}
          />
        </svg>
      ))}
    </div>
  );
  return (
    <div className="relative inline-block w-fit">
      <Row fill="#4b463b" />
      <div className="absolute left-0 top-0 h-full overflow-hidden" style={{ width: `${pct}%` }}>
        <Row fill="#F6C544" />
      </div>
    </div>
  );
}

// Flow-positioned text swap for the mobile layout (no absolute positioning).
function Mobile({ kk, className, children }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={kk}
        className={className}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.32 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Absolutely-positioned text that does a 3D flip when `kk` changes.
// `delay` staggers the flip-IN so the title cascades after the dish arrives;
// the flip-OUT stays quick so the old text clears first (master-timeline feel).
function Swap({ kk, pos, style, className, children, delay = 0, slide }) {
  // Default: 3D slot-machine flip on the X axis.
  // slide="rtl": the line glides IN from the right (right → left).
  // slide="ltr": the line glides IN from the left  (left → right).
  // Old line continues past in the same direction as it leaves → a clean,
  // continuous opposing-slide when the two title lines use rtl + ltr.
  const EASE_OUT = [0.22, 1, 0.36, 1];
  let variant;
  if (slide) {
    const off = slide === "ltr" ? -120 : 120; // rtl starts off to the right, ltr to the left
    variant = {
      initial: { x: off, opacity: 0 },
      animate: { x: 0, opacity: 1, transition: { duration: 0.62, ease: EASE_OUT, delay } },
      exit: { x: -off, opacity: 0, transition: { duration: 0.4, ease: "easeIn" } },
    };
  } else {
    variant = {
      initial: { rotateX: -90, opacity: 0 },
      animate: { rotateX: 0, opacity: 1, transition: { duration: 0.5, ease: EASE_OUT, delay } },
      exit: { rotateX: 90, opacity: 0, transition: { duration: 0.35, ease: "easeIn" } },
    };
  }
  return (
    <div style={{ ...pos, perspective: slide ? undefined : 800 }} className="pointer-events-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={kk}
          style={{ ...style, transformOrigin: "center", backfaceVisibility: "hidden" }}
          className={className}
          initial={variant.initial}
          animate={variant.animate}
          exit={variant.exit}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// Renders the real PNG if present; falls back to the SVG stand-in on 404.
function ImgFallback({ src, imgClass = "", children }) {
  const [err, setErr] = useState(false);
  if (err) return children;
  return <img src={src} alt="" onError={() => setErr(true)} className={`h-full w-full ${imgClass}`} />;
}

function LampSvg() {
  return (
    <svg viewBox="0 0 74 400" className="h-full w-full" fill="none" aria-hidden="true">
      {/* cord */}
      <path d="M37 0 C37 90 35 180 37 240" stroke="#15140f" strokeWidth="3" />
      {/* shade */}
      <path d="M14 300 C14 268 60 268 60 300 L66 356 C66 372 8 372 8 356 Z" fill="#1c1a14" stroke="#3a372c" strokeWidth="1" />
      <ellipse cx="37" cy="356" rx="29" ry="9" fill="#2a2720" />
      {/* warm bulb glow */}
      <radialGradient id="lampGlow" cx="50%" cy="55%" r="55%">
        <stop offset="0%" stopColor="#ffd27a" stopOpacity="0.95" />
        <stop offset="55%" stopColor="#e8951f" stopOpacity="0.55" />
        <stop offset="100%" stopColor="#e8951f" stopOpacity="0" />
      </radialGradient>
      <ellipse cx="37" cy="356" rx="22" ry="14" fill="url(#lampGlow)" />
      <circle cx="37" cy="350" r="6" fill="#ffe1a0" />
    </svg>
  );
}

function PlantSvg() {
  return (
    <svg viewBox="0 0 174 474" className="h-full w-full" fill="none" aria-hidden="true">
      <g fill="#2f6b3f">
        <path d="M87 250C83 150 60 70 30 30c10 70 22 130 57 220z" />
        <path d="M87 250C91 150 114 70 144 30c-10 70-22 130-57 220z" />
        <path d="M87 262C70 190 28 150 0 138c22 44 50 86 87 124z" />
        <path d="M87 262C104 190 146 150 174 138c-22 44-50 86-87 124z" />
      </g>
      <g fill="#3c854f">
        <path d="M87 276C81 196 64 116 50 80c4 80 12 150 37 196z" />
        <path d="M87 276C93 196 110 116 124 80c-4 80-12 150-37 196z" />
      </g>
      {/* pot (lower part is below the fold) */}
      <path d="M44 300h86l-12 150H56z" fill="#e7e3da" />
      <path d="M38 294h98l-5 18H43z" fill="#f4f1ea" />
    </svg>
  );
}
