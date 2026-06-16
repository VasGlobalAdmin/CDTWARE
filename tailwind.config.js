/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // Extra breakpoint for large monitors (1920px, 2560px QHD/4K) so the wide
      // content sections can scale up and fill the screen instead of sitting
      // boxed in the middle with huge side margins.
      screens: {
        "3xl": "1920px",
        // "hpin" = the condition under which the HScroll panels PIN and sweep
        // horizontally. Requires a landscape window that is both wide AND tall
        // enough; on short windows this fails so the panels fall back to normal
        // vertical stacking (HScroll's stack() path) instead of clipping content
        // inside a locked 100vh pane. Keep this raw query in sync with the
        // matchMedia() string in components/HScroll.jsx.
        hpin: { raw: "(min-width: 768px) and (min-height: 700px) and (orientation: landscape)" },
        // Landscape height breakpoints — used to COMPACT the pinned HScroll
        // panels (Categories, Why CDT, FAQ) on laptop-height screens so their
        // content fits inside the locked 100vh pane instead of being clipped at
        // the bottom. Scoped to landscape so mobile portrait (which stacks and
        // scrolls normally) keeps its full-size design.
        // `short` is intentionally generous (≤1080px): a maximized browser on a
        // 1920×1080 desktop only has ~920–960px of viewport height, and at that
        // WIDTH the 3xl (≥1920px) styles scale everything UP — so 1080p screens
        // were the worst offenders for clipping. Anything taller (1440p/4K) has
        // the vertical room and keeps the full-size design.
        short: { raw: "(max-height: 1080px) and (orientation: landscape)" },
        shorter: { raw: "(max-height: 760px) and (orientation: landscape)" },
        // Row-scoped variants: same short heights, but ONLY below the width where
        // a grid collapses to a single row (1280px). Used by Best Sellers, whose
        // cards shrink only when they wrap to TWO rows (768–1279px) — at ≥1280px
        // it's one full-size row, so the cards must keep their natural proportions.
        shortrow: { raw: "(max-width: 1279px) and (max-height: 1080px) and (orientation: landscape)" },
        shorterrow: { raw: "(max-width: 1279px) and (max-height: 760px) and (orientation: landscape)" },
      },
      colors: {
        cream: "#FAF8F2",
        ink: "#0A0A08",
        "ink-2": "#100F0A",
        "ink-3": "#090907",
        "muted": "#E9E6E6",
        "muted-2": "#AEADAD",
        brand: "#E5332A",
        "brand-dark": "#C1271F",
      },
      fontFamily: {
        // Real Gotham everywhere. Every token resolves to the same Gotham
        // variable so no component (font-poppins, font-dm, font-playfair, …)
        // can render a different typeface.
        gotham: ["var(--font-gotham)", "sans-serif"],
        poppins: ["var(--font-gotham)", "sans-serif"],
        playfair: ["var(--font-gotham)", "sans-serif"],
        bebas: ["var(--font-gotham)", "sans-serif"],
        dm: ["var(--font-gotham)", "sans-serif"],
        inter: ["var(--font-gotham)", "sans-serif"],
      },
      maxWidth: {
        site: "1440px",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        // Page-load entrance: slide horizontally into place
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-64px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(64px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        riseIn: {
          "0%": { opacity: "0", transform: "translateY(36px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        zoomIn: {
          "0%": { opacity: "0", transform: "scale(0.86)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        // Header text: each line rises out from behind a clip mask
        textReveal: {
          "0%": { opacity: "0", transform: "translateY(110%)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        // Slow continuous rotation for the circular backdrop ring
        spinSlow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        spinReverse: {
          "0%": { transform: "rotate(360deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        // Wispy cigarette smoke: a puff rises and drifts LEFT (into the dark
        // background, away from the lion's face), growing and fading.
        smoke: {
          "0%": { transform: "translateY(0) translateX(0) scale(0.35)", opacity: "0" },
          "6%": { opacity: "0.5" },
          "45%": { transform: "translateY(-44px) translateX(-16px) scale(0.95)", opacity: "0.35" },
          "75%": { transform: "translateY(-86px) translateX(-30px) scale(1.5)", opacity: "0.15" },
          "100%": { transform: "translateY(-126px) translateX(-42px) scale(2.1)", opacity: "0" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.7s ease-out both",
        float: "float 6s ease-in-out infinite",
        slideInLeft: "slideInLeft 0.9s cubic-bezier(0.22,1,0.36,1) both",
        slideInRight: "slideInRight 0.9s cubic-bezier(0.22,1,0.36,1) both",
        riseIn: "riseIn 0.8s cubic-bezier(0.22,1,0.36,1) both",
        zoomIn: "zoomIn 0.9s cubic-bezier(0.22,1,0.36,1) both",
        textReveal: "textReveal 0.9s cubic-bezier(0.22,1,0.36,1) both",
        spinSlow: "spinSlow 32s linear infinite",
        spinReverse: "spinReverse 26s linear infinite",
        smoke: "smoke 3.8s ease-out infinite",
      },
    },
  },
  plugins: [],
};
