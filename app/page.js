import Logo from "@/components/Logo";
import SideRail from "@/components/SideRail";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Categories from "@/components/Categories";
import BestSellers from "@/components/BestSellers";
import WhyCDT from "@/components/WhyCDT";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import HScroll from "@/components/HScroll";
import Glow from "@/components/Glow";

export default function Home() {
  return (
    <>
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

        {/* Contact returns to a normal vertical scroll. */}
        <Contact />
      </main>
      <Footer />
    </>
  );
}
