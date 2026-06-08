"use client";
import { useRef } from "react";
import Reveal from "./Reveal";
import Glow from "./Glow";
import SectionHeading from "./SectionHeading";

// Same four products as the hero slides.
const SELLERS = [
  {
    tag: "Ciggrate",
    name: "Teton",
    desc: "America's favorite natural leaf cigar. All popular varieties.",
    img: "/images/seller-teton.png",
    badge: "Top Seller",
  },
  {
    tag: "Scale",
    name: "Boost Plus",
    desc: "High-demand brand with consistent quality across all SKUs.",
    img: "/images/seller-boost1.jpg",
    badge: "Popular",
  },
  {
    tag: "Mobile Accessories",
    name: "Boost Plus",
    desc: "Strong retail velocity at C-stores nationwide.",
    img: "/images/seller-boost2.jpg",
    badge: "Hot",
  },
  {
    tag: "Cigarillos",
    name: "Raw Leaf",
    desc: "Premium cigarillo with smooth flavor. Perennial favorite.",
    img: "/images/seller-rawleaf.jpg",
    badge: null,
  },
];

function TiltCard({ s, i }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5; // -0.5 … 0.5
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `rotateX(${(-py * 9).toFixed(2)}deg) rotateY(${(px * 12).toFixed(
      2
    )}deg) translateY(-10px) scale(1.03)`;
    const glare = el.querySelector("[data-glare]");
    if (glare)
      glare.style.background = `radial-gradient(circle at ${((px + 0.5) * 100).toFixed(
        0
      )}% ${((py + 0.5) * 100).toFixed(0)}%, rgba(255,255,255,0.22), transparent 55%)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "rotateX(0deg) rotateY(0deg) translateY(0) scale(1)";
    const glare = el.querySelector("[data-glare]");
    if (glare) glare.style.background = "transparent";
  };

  return (
    <Reveal from="up" delay={i * 90} className="h-full [perspective:1100px]">
      <article
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] transition-[transform,box-shadow,border-color] duration-300 ease-out [transform-style:preserve-3d] will-change-transform hover:border-white/25 hover:shadow-[0_34px_70px_-24px_rgba(0,0,0,0.85)]"
        style={{ transform: "rotateX(0deg) rotateY(0deg)" }}
      >
        {/* Image — lifted toward the viewer for parallax depth */}
        <div className="relative h-52 overflow-hidden sm:h-56 lg:h-64 2xl:h-72 3xl:h-80" style={{ transform: "translateZ(45px)" }}>
          <img
            src={s.img}
            alt={s.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          {s.badge && (
            <span className="absolute right-3 top-3 rounded-full bg-cream/95 px-3 py-1 font-dm text-[10px] font-semibold uppercase tracking-wide text-ink shadow-lg shadow-black/30">
              {s.badge}
            </span>
          )}
        </div>

        {/* Copy — slightly lifted too */}
        <div className="p-5 3xl:p-7" style={{ transform: "translateZ(28px)" }}>
          <p className="font-dm text-[11px] font-bold uppercase tracking-[0.25em] text-white/55 3xl:text-xs">
            {s.tag}
          </p>
          <h3 className="mt-1.5 font-gotham text-xl font-bold uppercase tracking-tight text-cream sm:text-2xl 3xl:text-[1.75rem]">
            {s.name}
          </h3>
          <p className="mt-2 font-poppins text-sm font-light leading-relaxed text-muted/80 3xl:text-base">
            {s.desc}
          </p>
        </div>

        {/* cursor-following sheen */}
        <div data-glare className="pointer-events-none absolute inset-0 z-10 rounded-2xl" />
      </article>
    </Reveal>
  );
}

export default function BestSellers({ panel = false }) {
  return (
    <section
      id="best-sellers"
      className={`relative flex min-h-screen flex-col justify-center overflow-hidden py-12 md:py-16 ${
        panel ? "bg-transparent" : "bg-ink-2"
      }`}
    >
      {/* ── Figma "Group 10" glow — biased left. Shared/static when pinned. ── */}
      {!panel && <Glow side="left" rotate={180} />}

      <div className="container-wide relative">
        <Reveal from="left">
          <p className="eyebrow">Top Products</p>
          <SectionHeading top="Best" bottom="Sellers" />
        </Reveal>

        <div className="mt-12 grid gap-6 2xl:gap-8 3xl:gap-10 sm:grid-cols-2 xl:grid-cols-4">
          {SELLERS.map((s, i) => (
            <TiltCard key={i} s={s} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
