"use client";
import { useRef } from "react";
import Reveal from "./Reveal";
import { Icon } from "./Icons";
import Glow from "./Glow";
import SectionHeading from "./SectionHeading";

const STATS = [
  { val: "Daily", label: "Fresh Drops & Updates" },
  { val: "App-Easy", label: "Order Anytime" },
  { val: "Always", label: "We Stay In Touch" },
  { val: "Beyond", label: "With You Past The Order" },
];

// Accent colours taken verbatim from the Figma cards.
const FEATURES = [
  {
    icon: Icon.pin,
    accent: "#02AD1C",
    tint: "#CCF3CA",
    title: "We Know SC Like the Back of Our Warehouse",
    desc: "From the Upstate to the Lowcountry, we've put in the miles. We know the roads, the regions, and the stores — so when you need us, we already know how to get to you.",
  },
  {
    icon: Icon.wallet,
    accent: "#E9AF10",
    tint: "#F1F3CA",
    title: "Your Wallet Will Thank You",
    desc: "We keep our prices fair because we're in this for the long haul, not just the first order. Good value shouldn't be something you have to hunt for.",
  },
  {
    icon: Icon.people,
    accent: "#E91010",
    tint: "#FFE0E0",
    title: "Not Just a Vendor. Your People.",
    desc: "We're not going to disappear after the delivery. We check in, we listen, and when something's off, we make it right. That's just how we do business.",
  },
  {
    icon: Icon.spark,
    accent: "#10C1E9",
    tint: "#DCF8FF",
    title: "Carry What Nobody Else Does",
    desc: "We work hard to bring in products you won't find everywhere else. It's a small thing that can make a real difference when customers are choosing where to shop.",
  },
];

function FeatureCard({ f, i }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `rotateX(${(-py * 6).toFixed(2)}deg) rotateY(${(px * 8).toFixed(
      2
    )}deg) translateY(-5px)`;
    const glare = el.querySelector("[data-glare]");
    if (glare)
      glare.style.background = `radial-gradient(circle at ${((px + 0.5) * 100).toFixed(0)}% ${(
        (py + 0.5) *
        100
      ).toFixed(0)}%, ${f.accent}26, transparent 60%)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "rotateX(0deg) rotateY(0deg) translateY(0)";
    const glare = el.querySelector("[data-glare]");
    if (glare) glare.style.background = "transparent";
  };

  return (
    <Reveal from="right" delay={i * 100} className="[perspective:1100px]">
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="group relative flex items-start gap-4 overflow-hidden rounded-xl border border-white/5 bg-[#181818] p-5 transition-[transform,box-shadow] duration-300 ease-out [transform-style:preserve-3d] will-change-transform hover:shadow-[0_26px_55px_-22px_rgba(0,0,0,0.85)] lg:p-6 3xl:gap-5 3xl:p-8 short:!p-4 short:!gap-3.5"
        style={{ borderLeft: `3px solid ${f.accent}`, transform: "rotateX(0deg) rotateY(0deg)" }}
      >
        <span
          className="mt-0.5 flex h-10 w-10 flex-none items-center justify-center rounded-full 3xl:h-12 3xl:w-12"
          style={{ backgroundColor: f.tint, color: f.accent, transform: "translateZ(34px)" }}
        >
          <f.icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110 3xl:h-6 3xl:w-6" />
        </span>
        <div style={{ transform: "translateZ(18px)" }}>
          <h3 className="font-poppins text-base font-medium leading-snug text-cream 3xl:text-xl short:!text-[15px]">{f.title}</h3>
          <p className="mt-1.5 font-poppins text-[15px] font-normal leading-snug text-muted-2 3xl:text-lg short:!mt-1 short:!text-[13px] shorter:!text-xs">
            {f.desc}
          </p>
        </div>
        {/* accent-tinted sheen that follows the cursor */}
        <div data-glare className="pointer-events-none absolute inset-0 z-10 rounded-xl" />
      </div>
    </Reveal>
  );
}

export default function WhyCDT({ panel = false }) {
  return (
    <section
      id="why-cdt"
      className={`relative flex min-h-screen flex-col justify-center overflow-hidden py-12 md:py-16 short:!py-8 shorter:!py-6 ${
        panel ? "bg-transparent" : "bg-ink-3"
      }`}
    >
      {/* ── Figma "Group 10" glow — biased left (amber→blue, per Figma).
          As a pinned panel the glow is supplied once by HScroll (shared, static
          background), so we drop the per-section one to avoid a double glow. ── */}
      {!panel && <Glow side="left" rotate={0} />}

      <div className="container-wide relative grid items-start gap-12 lg:grid-cols-2 lg:gap-16 2xl:gap-24">
        {/* LEFT */}
        <div>
          <Reveal from="left">
            <p className="eyebrow">Why CDT Just Hits Different</p>
            <SectionHeading top="The CDT" bottom="Advantage" />
            <p className="mt-5 max-w-md font-poppins text-sm font-light leading-6 text-muted 3xl:max-w-lg 3xl:text-base 3xl:leading-7">
              Great wholesale prices, delivery that doesn&apos;t ghost you, and a team that picks
              up on the first ring. Sounds too good? Come find out.
            </p>
          </Reveal>

          <div className="mt-10 grid max-w-md grid-cols-2 gap-x-6 gap-y-7 3xl:max-w-lg 3xl:gap-y-9 short:!mt-6 short:!gap-y-5 shorter:!mt-4 shorter:!gap-y-4">
            {STATS.map((s, i) => (
              <Reveal key={i} from="up" delay={200 + i * 90}>
                <div className="font-bebas text-[clamp(1.5rem,4.5vw,1.875rem)] uppercase leading-none tracking-wide text-white 3xl:text-[2.25rem] short:!text-[1.625rem]">
                  {s.val}
                </div>
                <div className="mt-1.5 font-poppins text-[10px] uppercase tracking-[0.22em] text-muted">
                  {s.label}
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* RIGHT — feature cards with 3D tilt */}
        <div className="flex flex-col gap-4 lg:gap-[31px] 3xl:gap-9 short:!gap-3 shorter:!gap-2.5">
          {FEATURES.map((f, i) => (
            <FeatureCard key={i} f={f} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
