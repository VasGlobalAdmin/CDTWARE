"use client";
import { useState } from "react";
import Reveal from "./Reveal";
import { Icon } from "./Icons";
import Glow from "./Glow";
import SectionHeading from "./SectionHeading";

const FAQS = [
  {
    q: "How do I start buying wholesale in South Carolina?",
    a: {
      intro: "Getting started with CDT Warehouse is simple:",
      steps: [
        "Register your Business.",
        "Provide your resale certificate.",
        "Submit any required tobacco or vape licenses.",
        "Open your CDT wholesale account.",
      ],
      outro: "Once approved, you can begin placing bulk orders immediately.",
    },
  },
  {
    q: "Why choose CDT Warehouse as your wholesale distributor in South Carolina?",
    a: {
      intro: "CDT Warehouse is built for retailers and manufacturers who need:",
      steps: [
        "Reliable inventory and consistent supply.",
        "Competitive wholesale pricing.",
        "Fast delivery options.",
        "Full compliance with South Carolina regulations.",
      ],
      outro:
        "We're more than a supplier—we're your wholesale partner for long-term growth.",
    },
  },
  {
    q: "Do I need a license to buy wholesale tobacco in South Carolina?",
    a: {
      intro:
        "Yes. CDT Warehouse requires all retailers purchasing tobacco products to have the proper South Carolina tobacco license. This ensures full compliance with state and federal regulations.",
    },
  },
  {
    q: "Can convenience store owners buy directly from a wholesale distributor?",
    a: {
      intro:
        "Yes—retailers can buy directly from CDT Warehouse. We specialize in serving convenience stores, vape shops, and small businesses by providing direct access to wholesale products without unnecessary middlemen.",
    },
  },
  {
    q: "Do retailers pay tobacco tax when buying wholesale in South Carolina?",
    a: {
      intro:
        "In most cases, tobacco taxes are handled within the supply chain, but retailers are still responsible for compliance with South Carolina tax laws. We help ensure all products are properly sourced and compliant.",
    },
  },
  {
    q: "What is a wholesale distributor and how does it work?",
    a: {
      intro:
        "CDT Warehouse operates as a wholesale distributor by purchasing products in bulk from manufacturers and supplying them to retailers at discounted prices. This allows businesses to streamline purchasing, reduce costs, and maintain consistent inventory without managing multiple suppliers.",
    },
  },
];

// staggered reveal for each answer line, fired when the item opens
const line = (isOpen, i = 0) => ({
  transition: "opacity 0.5s ease, transform 0.5s cubic-bezier(0.22,1,0.36,1)",
  transitionDelay: isOpen ? `${(0.08 + i * 0.06).toFixed(2)}s` : "0s",
  opacity: isOpen ? 1 : 0,
  transform: isOpen ? "translateY(0)" : "translateY(10px)",
});

function Answer({ a, isOpen }) {
  return (
    <div className="px-5 pb-6 pr-6 sm:px-6 3xl:px-8 3xl:pb-8 short:!pb-4">
      {a.intro &&
        (a.steps ? (
          <p className="font-poppins text-[17px] font-semibold text-[#EFEFEB] 3xl:text-xl" style={line(isOpen)}>
            {a.intro}
          </p>
        ) : (
          <p
            className="font-inter text-[15px] font-light leading-relaxed text-[#EFEFEB]/85 sm:text-[17px] 3xl:text-lg"
            style={line(isOpen)}
          >
            {a.intro}
          </p>
        ))}
      {a.steps && (
        <ul className="mt-3 space-y-2.5">
          {a.steps.map((s, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5 font-inter text-[15px] font-light text-[#EFEFEB]/90 sm:text-[17px] 3xl:text-lg"
              style={line(isOpen, i + 1)}
            >
              <Icon.check className="mt-1.5 h-3.5 w-3.5 flex-none text-brand" />
              <span>{s}</span>
            </li>
          ))}
        </ul>
      )}
      {a.outro && (
        <p
          className="mt-3 font-inter text-[15px] font-light leading-relaxed text-[#EFEFEB]/85 sm:text-[17px] 3xl:text-lg"
          style={line(isOpen, (a.steps?.length || 0) + 1)}
        >
          {a.outro}
        </p>
      )}
    </div>
  );
}

export default function Faq({ panel = false }) {
  const [open, setOpen] = useState(0);

  return (
    <section
      id="faq"
      className={`relative flex min-h-screen flex-col justify-center overflow-hidden py-12 md:py-16 short:!py-8 shorter:!py-6 ${
        panel ? "bg-transparent" : "bg-[#080806]"
      }`}
    >
      {/* ── Figma "Group 10" glow — biased right. Shared/static when pinned
          (HScroll supplies one background for the Why-CDT + FAQ pair). ── */}
      {!panel && <Glow side="right" rotate={90} />}

      <div className="container-wide relative grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 2xl:gap-24">
        {/* HEADING — left side on large screens, text aligned left */}
        <Reveal from="left" className="lg:order-1 lg:text-left">
          <p className="eyebrow">The CDT Difference</p>
          <SectionHeading top="FAQ's" bottom="Support" />
          <p className="mt-5 max-w-sm font-poppins text-sm font-light leading-6 text-muted 3xl:max-w-md 3xl:text-base 3xl:leading-7">
            Great wholesale prices, delivery that doesn&apos;t ghost you, and a team that picks up
            on the first ring. Sounds too good? Come find out.
          </p>
        </Reveal>

        {/* ACCORDION (Figma #0F1012) — question/answer list on the RIGHT */}
        <Reveal from="right" delay={120} className="lg:order-2">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0F1012] shadow-2xl shadow-black/40">
            {FAQS.map((item, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={i}
                  className={`border-white/10 transition-colors duration-300 ${
                    i ? "border-t" : ""
                  } ${isOpen ? "bg-white/[0.03]" : "hover:bg-white/[0.02]"}`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5 3xl:px-8 3xl:py-7 short:!py-3.5 shorter:!py-3"
                  >
                    <span
                      className={`font-poppins text-[15px] font-medium transition-colors duration-300 sm:text-base 3xl:text-lg ${
                        isOpen ? "text-cream" : "text-[#EFEFEB]"
                      }`}
                    >
                      {item.q}
                    </span>
                    <span
                      className={`flex h-8 w-8 flex-none items-center justify-center rounded-full border transition-all duration-300 3xl:h-10 3xl:w-10 ${
                        isOpen
                          ? "rotate-45 border-brand bg-brand text-white"
                          : "border-white/15 text-cream"
                      }`}
                    >
                      <Icon.plus className="h-4 w-4 3xl:h-5 3xl:w-5" />
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <Answer a={item.a} isOpen={isOpen} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
