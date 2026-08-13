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
    // Pin + sweep only when the window is wide AND tall enough (landscape). On
    // short windows this is false, so apply() falls back to stack() and the
    // panels scroll vertically instead of being clipped. Keep this string in
    // sync with the `hpin` screen in tailwind.config.js.
    const horizMQ = window.matchMedia(
      "(min-width: 768px) and (min-height: 700px) and (orientation: landscape)"
    );
    const isHoriz = () => horizMQ.matches && !reduce;
    let raf = 0;
    const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);

    // Per-panel VERTICAL overflow (px): how much taller a panel's content is
    // than the locked 100vh pane. On laptop-height screens where a panel
    // doesn't fit, the zig-zag first scrolls that panel's content up (so all
    // of it is shown), THEN sweeps horizontally to the next panel — nothing
    // is ever clipped. Measured in layout(), consumed in update().
    let ovs = [];
    const measure = () => {
      const vh = window.innerHeight;
      ovs = Array.from(track.children).map((panel) => {
        const inner = panel.firstElementChild;
        const h = inner ? inner.scrollHeight : panel.scrollHeight;
        const ov = h - vh;
        return ov > 8 ? ov : 0; // ignore sub-pixel/rounding noise
      });
    };

    // Depth parallax + vertical reveal per panel. `tx` is how far (px) the
    // track has been pushed left; `tys[i]` how far panel i's content has been
    // scrolled up through its overflow.
    const setPanelTransforms = (tx, tys) => {
      const vw = window.innerWidth;
      Array.from(track.children).forEach((panel, i) => {
        const inner = panel.firstElementChild;
        if (!inner) return;
        const off = clamp((i * vw - tx) / vw, -1, 1); // 0 when this panel is centred
        const ty = tys ? tys[i] || 0 : 0;
        inner.style.transform = `translate3d(${(off * 7).toFixed(2)}%,${(-ty).toFixed(1)}px,0)`;
        inner.style.opacity = (1 - Math.min(Math.abs(off), 1) * 0.25).toFixed(3);
      });
    };

    const layout = () => {
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      measure();
      const maxX = Math.max(0, track.scrollWidth - vw);
      const sumOv = ovs.reduce((a, b) => a + b, 0);
      // The pinned span now covers the horizontal sweep PLUS every panel's
      // vertical reveal, so the page keeps scrolling until everything showed.
      wrap.style.height = `${vh + maxX + sumOv}px`;
      // Publish each panel's exact offset (px from the wrap top at which that
      // panel arrives centred, before its own vertical reveal) so the side
      // rail / anchor navigation can jump to the right scroll position.
      let acc = 0;
      Array.from(track.children).forEach((panel, i) => {
        if (i) acc += vw;
        panel.dataset.hoffset = Math.round(acc);
        acc += ovs[i] || 0;
      });
    };

    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const total = wrap.offsetHeight - vh;
      const top = wrap.getBoundingClientRect().top;
      const p = clamp(-top, 0, Math.max(0, total));
      // Walk the zig-zag segments in order: reveal panel 0's overflow ↓,
      // sweep → into panel 1, reveal its overflow ↓, sweep →, and so on.
      const n = track.children.length;
      let rem = p;
      let tx = 0;
      const tys = new Array(n).fill(0);
      for (let i = 0; i < n; i++) {
        const dv = Math.min(rem, ovs[i] || 0);
        tys[i] = dv;
        rem -= dv;
        if (i < n - 1) {
          const dh = Math.min(rem, vw);
          tx += dh;
          rem -= dh;
        }
      }
      track.style.transform = `translate3d(${(-tx).toFixed(2)}px,0,0)`;
      if (barRef.current)
        barRef.current.style.transform = `scaleX(${(total > 0 ? p / total : 0).toFixed(4)})`;
      setPanelTransforms(tx, tys);
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
    // Panel content can change height while pinned (e.g. an FAQ answer opening)
    // — re-measure so the reveal span always matches the real content height.
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(apply) : null;
    if (ro)
      Array.from(track.children).forEach((panel) => {
        // Observe the SECTION inside the 100vh inner wrapper — the wrapper's
        // own box never changes size, the section's content-driven height does.
        const inner = panel.firstElementChild;
        const target = inner?.firstElementChild || inner;
        if (target) ro.observe(target);
      });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", apply);
      horizMQ.removeEventListener?.("change", apply);
      ro?.disconnect();
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
        className={`relative hpin:sticky hpin:top-0 hpin:h-screen hpin:overflow-hidden ${bgClass}`}
      >
        {/* shared static background (colour lives on the wrapper above) */}
        {background}

        {/* horizontal-progress bar (landscape only) */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-40 hidden h-[3px] bg-white/5 hpin:block">
          <div
            ref={barRef}
            className="h-full w-full origin-left bg-brand"
            style={{ transform: "scaleX(0)" }}
          />
        </div>

        {/* panel track — stacks vertically in portrait, runs sideways in landscape */}
        <div
          ref={trackRef}
          className="relative flex w-full flex-col will-change-transform hpin:h-full hpin:w-max hpin:flex-row"
        >
          {panels.map((p, i) => (
            <div
              key={i}
              data-hpanel={i}
              className="relative w-full shrink-0 hpin:h-full hpin:w-screen"
            >
              {/* inner wrapper is what the parallax transform is applied to */}
              <div className="h-full w-full will-change-transform">{p}</div>
            </div>
          ))}
        </div>

        {/* scroll cue (landscape only) */}
        {hint && (
          <div className="pointer-events-none absolute bottom-7 left-1/2 z-40 hidden -translate-x-1/2 items-center gap-3 text-white/55 hpin:flex">
            <span className="font-dm text-[11px] font-bold uppercase tracking-[0.4em]">Scroll</span>
            <span className="block h-px w-12 bg-white/40" />
          </div>
        )}
      </div>
    </section>
  );
}
