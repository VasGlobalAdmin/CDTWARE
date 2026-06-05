"use client";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icons";

const ITEMS = [
  { icon: Icon.home, href: "#hero", id: "hero", label: "Home" },
  { icon: Icon.warehouse, href: "#about", id: "about", label: "About" },
  { icon: Icon.grid, href: "#categories", id: "categories", label: "Categories" },
  { icon: Icon.tag, href: "#best-sellers", id: "best-sellers", label: "Best Sellers" },
  { icon: Icon.list, href: "#why-cdt", id: "why-cdt", label: "Why CDT" },
  { icon: Icon.help, href: "#faq", id: "faq", label: "FAQ" },
  { icon: Icon.phone, href: "#contact", id: "contact", label: "Contact" },
];

const horizMQ = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(min-width: 768px) and (orientation: landscape)").matches;

const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Controlled, eased scroll to an absolute Y. We briefly disable the page's CSS
// `scroll-behavior: smooth` so OUR tween owns the motion — that keeps even the
// long trip from the bottom back to Home one smooth, consistent glide instead
// of the browser's variable-speed jump.
function smoothScrollTo(toY) {
  const html = document.documentElement;
  const startY = window.scrollY || window.pageYOffset;
  const dist = toY - startY;
  if (Math.abs(dist) < 2) return;
  const dur = Math.min(1600, Math.max(650, Math.abs(dist) * 0.42));
  const prev = html.style.scrollBehavior;
  html.style.scrollBehavior = "auto";
  // easeInOutCubic
  const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  let startT = null;
  const step = (ts) => {
    if (startT === null) startT = ts;
    const p = Math.min((ts - startT) / dur, 1);
    window.scrollTo(0, startY + dist * ease(p));
    if (p < 1) requestAnimationFrame(step);
    else html.style.scrollBehavior = prev;
  };
  requestAnimationFrame(step);
}

export default function SideRail() {
  const [active, setActive] = useState("hero");
  const rafRef = useRef(0);

  // Active-section detection that works for BOTH normal vertical sections and
  // the horizontally-pinned panels: highlight whichever section currently
  // covers the viewport CENTRE point (nearest one wins if there's a gap).
  // getBoundingClientRect reflects the live CSS transform, so a panel that has
  // been slid into the centre is correctly detected — fixing the icon that
  // used to stay stuck during the sideways sweeps.
  useEffect(() => {
    const pick = () => {
      rafRef.current = 0;
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      let best = null;
      let bestDist = Infinity;
      for (const it of ITEMS) {
        const el = document.getElementById(it.id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue;
        const dx = r.left > cx ? r.left - cx : r.right < cx ? cx - r.right : 0;
        const dy = r.top > cy ? r.top - cy : r.bottom < cy ? cy - r.bottom : 0;
        const dist = Math.hypot(dx, dy); // 0 when the section covers the centre
        if (dist < bestDist) {
          bestDist = dist;
          best = it.id;
        }
      }
      if (best) setActive(best);
    };
    const onScroll = () => {
      if (!rafRef.current) rafRef.current = requestAnimationFrame(pick);
    };
    pick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const go = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;

    let targetY;
    // If the target lives inside a pinned horizontal block, scroll to the exact
    // point where THAT panel is the centred one (panel 0 = block start, the
    // last panel = block end), instead of just the block's top.
    const panel = el.closest("[data-hpanel]");
    const wrap = panel && panel.closest("[data-hscroll]");
    if (horizMQ() && !reduced() && panel && wrap) {
      const i = parseInt(panel.dataset.hpanel, 10) || 0;
      const n = parseInt(wrap.dataset.hscroll, 10) || 1;
      const wrapTop = wrap.getBoundingClientRect().top + window.scrollY;
      const span = Math.max(0, wrap.offsetHeight - window.innerHeight);
      targetY = wrapTop + (n > 1 ? (span * i) / (n - 1) : 0);
    } else {
      targetY = el.getBoundingClientRect().top + window.scrollY;
    }
    targetY = Math.max(0, Math.round(targetY));

    if (typeof history !== "undefined") history.replaceState(null, "", `#${id}`);
    if (reduced()) window.scrollTo(0, targetY);
    else smoothScrollTo(targetY);
  };

  return (
    // Figma: rail at x=36, vertically centered; 40×40 items, 6px gap.
    <div className="fixed left-9 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-1.5 xl:flex">
      {ITEMS.map(({ icon: I, href, id, label }) => {
        const isActive = active === id;
        return (
          <a
            key={href}
            href={href}
            onClick={(e) => go(e, id)}
            aria-label={label}
            aria-current={isActive ? "true" : undefined}
            className={`group relative flex h-10 w-10 items-center justify-center rounded-md transition-colors ${
              isActive
                ? "border border-[#615E5E] bg-[rgba(71,71,71,0.40)] text-white shadow-[0_14px_15px_6px_rgba(0,0,0,0.30)] backdrop-blur-[25px]"
                : "text-white/60 hover:bg-white/5"
            }`}
          >
            <I className="h-5 w-5" />
            <span className="pointer-events-none absolute left-12 whitespace-nowrap rounded-md bg-ink px-2.5 py-1 font-poppins text-xs text-cream opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
              {label}
            </span>
          </a>
        );
      })}
    </div>
  );
}
