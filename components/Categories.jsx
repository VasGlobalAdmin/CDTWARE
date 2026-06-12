import Reveal from "./Reveal";
import Glow from "./Glow";
import SectionHeading from "./SectionHeading";
import { Icon } from "./Icons";

// Clicking any category / product card sends the visitor to the online store.
const STORE_URL = "https://cdtweb.woopsa.app/";

const CATS = [
  { label: "Smoke Essential", img: "/images/categories/cat-tobacco.png", icon: Icon.leaf },
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
      className={`relative flex min-h-screen flex-col justify-center overflow-hidden py-12 ${
        panel ? "bg-transparent" : "bg-ink"
      }`}
    >
      {/* ── Figma "Group 10" glow — biased right. Shared/static when pinned. ── */}
      {!panel && <Glow side="right" rotate={0} />}

      {/* Categories uses a slightly roomier gutter than the shared container-wide
          (more breathing space on all sides) — same max-widths, larger px. */}
      <div className="relative mx-auto flex w-full max-w-site flex-col px-6 sm:px-10 lg:px-[120px] 2xl:max-w-[1760px] 2xl:px-[140px] 3xl:max-w-[2400px] 3xl:px-[160px]">
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
        <div className="mt-8 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-6 2xl:gap-8 3xl:gap-10 md:mt-8 md:grid-cols-4">
          {CATS.map((c, i) => (
            <Reveal key={i} from="zoom" delay={i * 70}>
              <a
                href={STORE_URL}
                target="_blank"
                rel="noreferrer"
                aria-label={`${c.label} — shop online`}
                className="group block aspect-[1.18/1] w-full outline-none [perspective:800px]"
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
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 px-3 text-center [transform-style:preserve-3d] sm:gap-3 sm:px-4">
                      <div style={{ transform: "translateZ(70px)" }}>
                        <c.icon className="h-8 w-8 text-brand drop-shadow-[0_6px_18px_rgba(0,0,0,0.6)] sm:h-9 sm:w-9 lg:h-10 lg:w-10 3xl:h-12 3xl:w-12" />
                      </div>
                      <div style={{ transform: "translateZ(55px)" }}>
                        <h3 className="font-playfair text-lg font-bold leading-tight tracking-wide text-cream [text-shadow:0_6px_24px_rgba(0,0,0,0.7)] sm:text-xl lg:text-2xl 3xl:text-[2rem]">
                          {c.label}
                        </h3>
                      </div>
                      <div style={{ transform: "translateZ(45px)" }} className="md:hidden xl:block">
                        <span className="block h-px w-12 bg-cream/80 3xl:w-16" />
                      </div>
                      {/* "Explore Now" is hidden in the cramped 4-col range
                          (md–lg, where short 1.18 cards can't fit a 2-line title
                          + this line); shown on the roomier 2-col phone/tablet
                          and on xl+ desktop where the cards are tall enough. */}
                      <div style={{ transform: "translateZ(35px)" }} className="md:hidden xl:block">
                        <p className="font-poppins text-[11px] font-light uppercase tracking-[0.26em] text-white/70 3xl:text-sm">
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
