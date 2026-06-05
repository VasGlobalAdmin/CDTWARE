import Reveal from "./Reveal";
import Glow from "./Glow";
import SectionHeading from "./SectionHeading";
import { Icon } from "./Icons";

const CATS = [
  { label: "Tobacco Products", img: "/images/categories/cat-tobacco.png", icon: Icon.leaf },
  { label: "Cigarettes", img: "/images/categories/cat-cigarettes.png", icon: Icon.cigarette },
  { label: "General Grocery", img: "/images/categories/cat-grocery.png", icon: Icon.cart },
  { label: "Beverage", img: "/images/categories/cat-beverage.png", icon: Icon.cup },
  { label: "Disposable", img: "/images/categories/cat-disposable.png", icon: Icon.vape },
  { label: "Automotive", img: "/images/categories/cat-automotive.png", icon: Icon.car },
  { label: "Health Care", img: "/images/categories/cat-healthcare.png", icon: Icon.heart },
  { label: "Kratom", img: "/images/categories/cat-kratom.png", icon: Icon.sprout },
];

export default function Categories({ panel = false }) {
  return (
    <section
      id="categories"
      className={`relative flex min-h-screen flex-col justify-center overflow-hidden py-12 md:py-16 ${
        panel ? "bg-transparent" : "bg-ink"
      }`}
    >
      {/* ── Figma "Group 10" glow — biased right. Shared/static when pinned. ── */}
      {!panel && <Glow side="right" rotate={0} />}

      <div className="container-site relative flex w-full flex-col">
        <Reveal from="left" className="shrink-0">
          <p className="eyebrow">What We Carry</p>
          <SectionHeading top="Product" bottom="Categories" />
        </Reveal>

        {/* ── 4 × 2 grid of 3D flip cards. Fixed 279×236 cards (Figma), grid
            LEFT-aligned with the heading (no mx-auto), fixed-width columns so it
            hugs its content. Each card carries its OWN perspective (on the <a>,
            the rotating element's direct parent) so the 3D flip context is
            independent of the pinned panel's composited layer — otherwise the
            backface flattens after a scroll and the card shows its name by
            default. ── */}
        <div className="mt-8 grid w-full grid-cols-2 gap-4 sm:gap-5 md:mt-16 md:max-w-[1176px] md:grid-cols-4">
          {CATS.map((c, i) => (
            <Reveal key={i} from="zoom" delay={i * 70}>
              <a
                href="#contact"
                aria-label={c.label}
                className="group block aspect-[279/236] w-full outline-none [perspective:800px]"
              >
                <div className="relative h-full w-full transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus-visible:[transform:rotateY(180deg)]">
                  {/* Front (default) — a blurred version of THIS category's image
                      as the background, with the category icon, name, divider and
                      "Explore Now" each floating forward on its own translateZ
                      layer so they pop in 3D depth as the card turns (Codepen ref:
                      .inner { translateZ(60px) }). No overflow on this face —
                      overflow!=visible flattens the 3D context. */}
                  <div className="absolute inset-0 rounded-[11px] border border-white/12 shadow-xl shadow-black/40 [backface-visibility:hidden] [transform-style:preserve-3d]">
                    {/* blurred image background, clipped in its own (flat) box */}
                    <div className="absolute inset-0 overflow-hidden rounded-[11px]">
                      <img
                        src={c.img}
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 h-full w-full scale-[1.35] object-cover blur-2xl saturate-[1.5]"
                      />
                      <div className="absolute inset-0 bg-black/55" />
                      <div
                        className="pointer-events-none absolute inset-0"
                        style={{ boxShadow: "inset 0 0 55px 14px rgba(9,9,7,0.55)" }}
                      />
                    </div>
                    {/* 3D-lifted content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4 text-center [transform-style:preserve-3d]">
                      <div style={{ transform: "translateZ(70px)" }}>
                        <c.icon className="h-9 w-9 text-brand drop-shadow-[0_6px_18px_rgba(0,0,0,0.6)] sm:h-10 sm:w-10" />
                      </div>
                      <div style={{ transform: "translateZ(55px)" }}>
                        <h3 className="font-playfair text-xl font-bold leading-tight tracking-wide text-cream [text-shadow:0_6px_24px_rgba(0,0,0,0.7)] sm:text-2xl">
                          {c.label}
                        </h3>
                      </div>
                      <div style={{ transform: "translateZ(45px)" }}>
                        <span className="block h-px w-12 bg-cream/80" />
                      </div>
                      <div style={{ transform: "translateZ(35px)" }}>
                        <p className="font-poppins text-[11px] font-light uppercase tracking-[0.26em] text-white/70">
                          Explore Now
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Back — the flip reveals the sharp product image. */}
                  <div className="absolute inset-0 overflow-hidden rounded-[11px] border border-white/10 shadow-xl shadow-black/40 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <img
                      src={c.img}
                      alt={c.label}
                      className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.06]"
                    />
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{ boxShadow: "inset 0 0 55px 14px rgba(9,9,7,0.65)" }}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
