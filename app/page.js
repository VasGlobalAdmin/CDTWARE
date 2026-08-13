import Logo from "@/components/Logo";
import SideRail from "@/components/SideRail";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Categories from "@/components/Categories";
import BestSellers from "@/components/BestSellers";
import WhyCDT from "@/components/WhyCDT";
import Faq from "@/components/Faq";
import { FAQS } from "@/lib/faqs";
import Reviews from "@/components/Reviews";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import HScroll from "@/components/HScroll";
import Glow from "@/components/Glow";

const SITE_URL = "https://cdtwarehouse.com";

// FAQPage schema built from the same data the visible accordion renders, so
// the two can never drift apart.
const faqText = (a) =>
  [a.intro, ...(a.steps || []), a.outro].filter(Boolean).join(" ");

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: faqText(f.a) },
  })),
};

// Local-business NAP schema — matches the visible contact info exactly.
const BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WholesaleStore",
  name: "CDT Distribution",
  url: SITE_URL,
  telephone: "+1-864-343-1512",
  email: "cdt.orders@gmail.com",
  image: `${SITE_URL}/images/cdt-logo.svg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "3801 Calhoun Memorial Hwy",
    addressLocality: "Easley",
    addressRegion: "SC",
    postalCode: "29640",
    addressCountry: "US",
  },
  areaServed: [
    "Easley", "Powdersville", "Pickens", "Liberty", "Central", "Greenville",
    "Simpsonville", "Mauldin", "Clemson", "Anderson", "Spartanburg",
    "Upstate South Carolina", "South Carolina",
  ].map((name) => ({ "@type": "Place", name })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BUSINESS_SCHEMA) }}
      />
      {/* No navbar — only the CDT logo, fixed top-left (per Figma placement) */}
      <Logo className="fixed left-5 top-4 z-50 animate-slideInLeft sm:left-9 sm:top-5" />
      <SideRail />
      <main>
        {/* ── Zig-zag scroll: the page alternates vertical ↕ and horizontal ↔.
            Hero ↕ → About (↕→↔→↕) → Categories+BestSellers ↔ →
            WhyCDT+FAQ ↔ (one shared background, content slides) → Contact ↕ ── */}
        <Hero />

        {/* About: vertical → horizontal → vertical (self-contained pin) */}
        <About />

        {/* Arrive on Categories vertically, then sweep across to Best Sellers
            over ONE static background (colour + glow pinned), so only the
            content slides between them. */}
        <HScroll
          label="Categories and Best Sellers"
          bgClass="bg-ink"
          background={<Glow side="center" rotate={0} />}
        >
          <Categories panel />
          <BestSellers panel />
        </HScroll>

        {/* Why CDT → FAQ over ONE static background (colour + glow pinned),
            so only the content slides horizontally between them. */}
        <HScroll
          label="Why CDT and FAQ"
          bgClass="bg-ink-3"
          background={<Glow side="center" rotate={0} />}
        >
          <WhyCDT panel />
          <Faq panel />
        </HScroll>

        {/* Get In Touch (reviews + form) and the Contact "Get it Now" section
            both scroll vertically — straight down, no horizontal sweep. */}
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
