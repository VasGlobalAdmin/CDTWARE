"use client";
import { Children, useEffect, useRef } from "react";

/**
 * HScroll — a pinned vertical→horizontal→vertical sweep (the "zig-zag" scroll).
 *
 * Drop two (or more) full-screen panels inside it. On landscape desktop the
 * section PINS to the viewport and the panel track slides sideways as you scroll
 * — so you arrive vertically on panel 1, sweep horizontally to the next panel,
 * then continue vertically into whatever follows. This is the exact mechanism
 * the About section uses, factored out so the rest of the page can zig-zag too.
 *
 * Portrait / mobile / reduced-motion: the pin is disabled and the panels simply
 * stack vertically, so nothing is ever trapped off-screen.
 *
 *   <HScroll>                         // panels carry their own background
 *     <Categories /> <BestSellers />
 *   </HScroll>
 *
 *   <HScroll bgClass="bg-ink-3" background={<Glow .../>}>   // ONE static
 *     <WhyCDT panel /> <Faq panel />                        // background, only
 *   </HScroll>                                              // the content slides
 *
 * - `bgClass`     : colour for a single static background shared by all panels
 *                   (use with transparent `panel` children).
 * - `background`  : a decorative node (e.g. <Glow/>) pinned behind the track.
 * - `hint`        : show the little "Scroll" cue (default true).
 */
export default function HScroll({
  children,
  bgClass = "",
  background = null,
  label,
  hint = true,
}) {
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const horizMQ = window.matchMedia("(min-width: 768px) and (orientation: landscape)");
    const isHoriz = () => horizMQ.matches && !reduce;
    let raf = 0;
    const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);

    // Drive a subtle depth parallax per panel: the incoming panel's content
    // lags slightly behind the slide, then settles as it centres. `tx` is how
    // far (px) the track has been pushed left.
    const setParallax = (tx) => {
      const vw = window.innerWidth;
      Array.from(track.children).forEach((panel, i) => {
        const inner = panel.firstElementChild;
        if (!inner) return;
        const off = clamp((i * vw - tx) / vw, -1, 1); // 0 when this panel is centred
        inner.style.transform = `translate3d(${(off * 7).toFixed(2)}%,0,0)`;
        inner.style.opacity = (1 - Math.min(Math.abs(off), 1) * 0.25).toFixed(3);
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
      const tx = maxX * progress;
      track.style.transform = `translate3d(${(-tx).toFixed(2)}px,0,0)`;
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress.toFixed(4)})`;
      setParallax(tx);
    };

    const stack = () => {
      wrap.style.height = "";
      track.style.transform = "none";
      if (barRef.current) barRef.current.style.transform = "scaleX(0)";
      Array.from(track.children).forEach((panel) => {
        const inner = panel.firstElementChild;
        if (inner) {
          inner.style.transform = "none";
          inner.style.opacity = "1";
        }
      });
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

  const panels = Children.toArray(children);

  return (
    <section
      ref={wrapRef}
      aria-label={label}
      className="relative"
      data-hscroll={panels.length}
    >
      <div
        className={`relative md:landscape:sticky md:landscape:top-0 md:landscape:h-screen md:landscape:overflow-hidden ${bgClass}`}
      >
        {/* shared static background (colour lives on the wrapper above) */}
        {background}

        {/* horizontal-progress bar (landscape only) */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-40 hidden h-[3px] bg-white/5 md:landscape:block">
          <div
            ref={barRef}
            className="h-full w-full origin-left bg-brand"
            style={{ transform: "scaleX(0)" }}
          />
        </div>

        {/* panel track — stacks vertically in portrait, runs sideways in landscape */}
        <div
          ref={trackRef}
          className="relative flex w-full flex-col will-change-transform md:landscape:h-full md:landscape:w-max md:landscape:flex-row"
        >
          {panels.map((p, i) => (
            <div
              key={i}
              data-hpanel={i}
              className="relative w-full shrink-0 md:landscape:h-full md:landscape:w-screen"
            >
              {/* inner wrapper is what the parallax transform is applied to */}
              <div className="h-full w-full will-change-transform">{p}</div>
            </div>
          ))}
        </div>

        {/* scroll cue (landscape only) */}
        {hint && (
          <div className="pointer-events-none absolute bottom-7 left-1/2 z-40 hidden -translate-x-1/2 items-center gap-3 text-white/55 md:landscape:flex">
            <span className="font-dm text-[11px] font-bold uppercase tracking-[0.4em]">Scroll</span>
            <span className="block h-px w-12 bg-white/40" />
          </div>
        )}
      </div>
    </section>
  );
}
