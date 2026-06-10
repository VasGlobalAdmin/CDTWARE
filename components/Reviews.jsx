"use client";
import { useState, useRef, useEffect } from "react";
import Reveal from "./Reveal";
import Glow from "./Glow";
import SectionHeading from "./SectionHeading";
import { Icon } from "./Icons";

// Aggregate rating shown next to the Google mark (live CDT Inc listing).
const RATING = "5.0";
const COUNT = "5";

// The original Google listing/reviews page for CDT Inc (Easley, SC). Clicking the
// "Google Reviews" summary opens it in a new tab.
const GOOGLE_URL = "https://www.google.com/search?q=cdt+inc+easley+sc";

// Real Google reviews for the CDT Inc listing (Easley, SC), taken verbatim from
// the live profile. Swap the text / names here when the reviews change — the
// arrows cycle through them.
const REVIEWS = [
  {
    name: "Monica Burrell",
    initial: "M",
    color: "#1A73E8",
    detail: "Local Guide · 44 reviews · 3 photos",
    when: "3 years ago",
    rating: 5,
    text:
      "We pride ourselves on our premium products, competitive pricing, exceptional customer service, and our ability to build true, long-term partnerships with our customers. CDT, Inc. invites you to come and tour our warehouse (bring a copy of your business license for entry).",
  },
  {
    name: "TOMMY Bryant",
    initial: "T",
    color: "#1F9D55",
    detail: "Local Guide · 1,811 reviews · 3,672 photos",
    when: "3 years ago",
    rating: 5,
    text: "Super nice owner really good prices. They have all your convenience store needs.",
  },
  {
    name: "Kristen Gjannestad",
    initial: "K",
    color: "#9334E6",
    detail: "Local Guide · 1 review · 1 photo",
    when: "8 years ago",
    rating: 5,
    text:
      "Lots Of Tobacco Product, Cigarettes, Cigar, Pipe tobacco, Candy, Auto Parts, General Grocery, Candy, Energy Drink, Soft Drink.",
  },
  {
    name: "Chaitanya Trivedi",
    initial: "C",
    color: "#E8710A",
    detail: "",
    when: "2 months ago",
    rating: 5,
    text: "",
  },
  {
    name: "Hemubhai Patel USA",
    initial: "H",
    color: "#E91010",
    detail: "Local Guide · 7 reviews",
    when: "9 years ago",
    rating: 5,
    text: "",
  },
];

const LOOKING_FOR = [
  "Wholesale tobacco & cigarettes",
  "Convenience store supply",
  "Vape & disposables",
  "Grocery & beverage",
  "Become a CDT partner",
  "Something else",
];

// Multicolour Google "G" mark.
function GoogleG({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="#4285F4" d="M23.04 12.26c0-.82-.07-1.6-.21-2.36H12v4.46h6.19a5.3 5.3 0 0 1-2.3 3.48v2.9h3.72c2.18-2 3.43-4.96 3.43-8.48z" />
      <path fill="#34A853" d="M12 24c3.1 0 5.7-1.03 7.6-2.79l-3.72-2.9c-1.03.69-2.35 1.1-3.88 1.1-2.98 0-5.5-2.01-6.4-4.72H1.74v2.99A11.46 11.46 0 0 0 12 24z" />
      <path fill="#FBBC05" d="M5.6 14.69a6.9 6.9 0 0 1 0-4.38V7.32H1.74a11.5 11.5 0 0 0 0 10.36l3.86-2.99z" />
      <path fill="#EA4335" d="M12 4.75c1.68 0 3.2.58 4.39 1.72l3.29-3.29C17.7 1.2 15.1 0 12 0 7.39 0 3.42 2.64 1.74 6.51l3.86 2.99C6.5 6.76 9.02 4.75 12 4.75z" />
    </svg>
  );
}

// Gold star row, gold-filled proportionally to `value` / 5 — a grey base row
// under a gold row clipped to the rating percentage (handles halves like 4.5).
function RatingStars({ value = 5, size = 16, gap = 2 }) {
  const v = Math.max(0, Math.min(5, value));
  const pct = (v / 5) * 100;
  const Row = ({ color }) => (
    <span className="flex" style={{ gap }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Icon.star key={i} className={color} style={{ width: size, height: size }} />
      ))}
    </span>
  );
  return (
    <span className="relative inline-flex w-fit">
      <Row color="text-white/15" />
      <span className="absolute left-0 top-0 overflow-hidden" style={{ width: `${pct}%` }}>
        <Row color="text-[#F6C544]" />
      </span>
    </span>
  );
}

// Styled label + control for the form (labels match the image exactly).
function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-poppins text-[13px] font-medium text-cream">{label}</span>
      {children}
    </label>
  );
}

const inputCls =
  "w-full rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-2.5 font-poppins text-sm text-cream placeholder:text-white/35 outline-none transition-colors focus:border-brand/60 focus:bg-white/[0.06]";

// Custom dark dropdown — replaces the basic native <select> so the option list
// matches the form's theme (rounded pills, hover/selected states, animated open).
function CustomSelect({ options, placeholder = "Select one" }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`${inputCls} flex items-center justify-between gap-2 text-left ${
          open ? "border-brand/60 bg-white/[0.06]" : ""
        }`}
      >
        <span className={value ? "text-cream" : "text-white/35"}>{value || placeholder}</span>
        <Icon.chevD
          className={`h-4 w-4 flex-none text-muted-2 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <div
        role="listbox"
        className={`absolute left-0 right-0 z-30 mt-2 origin-top overflow-hidden rounded-xl border border-white/10 bg-[#141312] p-1.5 shadow-2xl shadow-black/60 backdrop-blur-md transition-all duration-200 ${
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-1 scale-[0.98] opacity-0"
        }`}
      >
        <div className="max-h-60 overflow-y-auto">
          {options.map((o) => {
            const sel = o === value;
            return (
              <button
                key={o}
                type="button"
                role="option"
                aria-selected={sel}
                onClick={() => {
                  setValue(o);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-left font-poppins text-sm transition-colors ${
                  sel ? "bg-brand/15 text-cream" : "text-muted/90 hover:bg-white/[0.06] hover:text-cream"
                }`}
              >
                <span>{o}</span>
                {sel && <Icon.check className="h-4 w-4 flex-none text-brand" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function Reviews({ panel = false }) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const r = REVIEWS[idx];
  const go = (d) => setIdx((i) => (i + d + REVIEWS.length) % REVIEWS.length);

  // Auto-advance the featured testimonial every 5s; hovering the card pauses it
  // so a visitor can finish reading.
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % REVIEWS.length), 5000);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section
      id="reviews"
      className={`relative flex min-h-screen flex-col justify-center overflow-hidden py-12 md:py-16 ${
        panel ? "bg-transparent" : "bg-ink"
      }`}
    >
      {!panel && <Glow side="left" rotate={0} />}
      {/* warm (left) → cool (right) ambient wash, matching the reference */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 95% at 10% 16%, rgba(150,86,38,0.30) 0%, rgba(38,30,78,0.16) 46%, transparent 78%)",
        }}
      />

      <div className="container-wide relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16 2xl:gap-20">
        {/* ── LEFT — heading + featured Google testimonial ── */}
        <Reveal from="left">
          <p className="eyebrow">Loved by store owners</p>
          <SectionHeading top="Let's Build" bottom="Your Store" />
          <p className="mt-4 max-w-sm font-poppins text-[13px] font-light leading-6 text-muted 3xl:max-w-md 3xl:text-sm">
            Tell us what you need, and our team will get back to you with the right solution for your
            store.
          </p>

          {/* ── one compact card: Google rating header + rotating review ── */}
          <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className="relative mt-6 max-w-md overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-5 shadow-2xl shadow-black/40 sm:p-6"
          >
            {/* brand accent glow in the corner */}
            <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-brand/20 blur-3xl" />

            {/* header — Google rating + verified pill */}
            <div className="relative flex items-center justify-between gap-3">
              <a
                href={GOOGLE_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="See CDT Inc reviews on Google"
                className="group flex items-center gap-2.5"
              >
                <GoogleG className="h-7 w-7 flex-none" />
                <div className="leading-none">
                  <div className="flex items-center gap-1.5">
                    <span className="font-gotham text-lg font-black leading-none text-cream">{RATING}</span>
                    <RatingStars value={parseFloat(RATING)} size={13} />
                  </div>
                  <p className="mt-1 font-poppins text-[11px] font-light text-muted-2 underline-offset-2 group-hover:underline">
                    {COUNT} Google reviews
                  </p>
                </div>
              </a>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-1">
                <Icon.check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="font-poppins text-[11px] font-medium text-emerald-300">Verified</span>
              </span>
            </div>

            <div className="relative my-4 h-px bg-white/10" />

            {/* the review — swaps + re-animates on each change */}
            <div key={idx} className="relative animate-[fadeUp_0.4s_ease-out]">
              <div className="flex items-start justify-between gap-3">
                <span aria-hidden className="font-gotham text-4xl leading-[0.5] text-brand/60">&ldquo;</span>
                <RatingStars value={r.rating} size={14} />
              </div>
              {r.text ? (
                <p className="mt-2 min-h-[72px] font-poppins text-[13.5px] font-light leading-relaxed text-cream/90">
                  {r.text}
                </p>
              ) : (
                <p className="mt-2 min-h-[72px] font-poppins text-[13.5px] font-light italic leading-relaxed text-muted-2">
                  Rated us {r.rating} stars — another happy CDT partner.
                </p>
              )}
              <div className="mt-4 flex items-center gap-3">
                <span
                  className="flex h-9 w-9 flex-none items-center justify-center rounded-full font-gotham text-[13px] font-bold text-white"
                  style={{ backgroundColor: r.color }}
                >
                  {r.initial}
                </span>
                <div className="leading-tight">
                  <p className="font-poppins text-[13px] font-semibold text-cream">{r.name}</p>
                  <p className="mt-0.5 font-poppins text-[10.5px] font-light text-muted-2">
                    {r.detail ? `${r.detail} · ${r.when}` : r.when}
                  </p>
                </div>
              </div>
            </div>

            {/* controls: progress dots (active stretches into a brand pill) + arrows */}
            <div className="relative mt-5 flex items-center justify-between border-t border-white/10 pt-4">
              <div className="flex items-center gap-2">
                {REVIEWS.map((rv, i) => (
                  <button
                    key={rv.name}
                    type="button"
                    onClick={() => setIdx(i)}
                    aria-label={`Show review ${i + 1} of ${REVIEWS.length}`}
                    aria-current={i === idx}
                    className={`h-1.5 rounded-full transition-all duration-300 ease-out ${
                      i === idx ? "w-6 bg-brand" : "w-1.5 bg-white/25 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous review"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-cream transition-colors hover:border-white/40 hover:bg-white/5"
                >
                  <Icon.chevL className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next review"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-cream transition-colors hover:border-white/40 hover:bg-white/5"
                >
                  <Icon.chevR className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── RIGHT — Get In Touch form (design only) ── */}
        <Reveal from="right" delay={120}>
          <div
            id="get-in-touch"
            className="scroll-mt-24 rounded-2xl border border-white/10 bg-[#1a1a18]/90 p-6 shadow-2xl shadow-black/50 backdrop-blur-sm sm:p-7 lg:p-8"
          >
            <h3 className="font-gotham text-xl font-bold text-cream sm:text-2xl">Get In Touch</h3>
            <p className="mt-1.5 font-poppins text-[13px] font-light text-muted-2">
              Fill out the form and our team will contact you shortly.
            </p>

            <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full Name">
                  <input type="text" name="fullName" placeholder="Enter your full name" className={inputCls} />
                </Field>
                <Field label="Business Name">
                  <input type="text" name="businessName" placeholder="Enter your business name" className={inputCls} />
                </Field>
                <Field label="Email Address">
                  <input type="email" name="email" placeholder="Enter your email address" className={inputCls} />
                </Field>
                <Field label="Phone Number">
                  <input type="tel" name="phone" placeholder="Enter your phone number" className={inputCls} />
                </Field>
              </div>

              <Field label="What Are You Looking For?">
                <CustomSelect options={LOOKING_FOR} />
              </Field>

              <Field label="Message">
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Tell us about your store or equipment"
                  className={`${inputCls} resize-none`}
                />
              </Field>

              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-brand px-7 py-3 font-gotham text-sm font-medium text-cream shadow-lg shadow-brand/20 transition-transform hover:scale-[1.03]"
              >
                Submit Request
              </button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
