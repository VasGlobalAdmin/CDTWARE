import Link from "next/link";
import { notFound } from "next/navigation";
import Logo from "@/components/Logo";
import Footer from "@/components/Footer";
import Glow from "@/components/Glow";
import { Icon } from "@/components/Icons";
import { CATEGORIES, STORE_URL, getCategory } from "@/lib/categories";

// All 10 category pages are fully static — one per entry in lib/categories.js.
export const dynamicParams = false;
export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

// Each page gets its own unique title + meta description (never a duplicate of
// the homepage's), per the SEO content package.
export function generateMetadata({ params }) {
  const cat = getCategory(params.slug);
  if (!cat) return {};
  return {
    title: cat.title,
    description: cat.meta,
    alternates: { canonical: `/categories/${cat.slug}` },
  };
}

export default function CategoryPage({ params }) {
  const cat = getCategory(params.slug);
  if (!cat) notFound();

  return (
    <>
      <Logo className="fixed left-5 top-4 z-50 sm:left-9 sm:top-5" />
      <main className="relative min-h-screen overflow-hidden bg-ink-3">
        <Glow side="right" rotate={0} />

        <section className="container-wide relative flex min-h-screen flex-col justify-center py-28 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 2xl:gap-24">
            {/* Copy */}
            <div>
              <p className="eyebrow">Product Category — {cat.name}</p>
              <h1 className="mt-4 font-gotham text-[clamp(1.9rem,5vw,3.25rem)] font-bold uppercase leading-[1.05] tracking-[0.02em] text-cream [text-wrap:balance]">
                {cat.headline}
              </h1>
              <p className="mt-6 max-w-2xl font-poppins text-[15px] font-light leading-7 text-muted sm:text-base 3xl:text-lg">
                {cat.desc}
              </p>

              <ul className="mt-7 space-y-3.5">
                {cat.points.map((pt, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 font-poppins text-[14px] font-light leading-6 text-[#EFEFEB]/90 sm:text-[15px] 3xl:text-base"
                  >
                    <Icon.check className="mt-1 h-4 w-4 flex-none text-brand" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex flex-wrap items-center gap-5">
                <a
                  href={STORE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-[#E22423] px-8 font-gotham text-[15px] text-cream shadow-[0_10px_24px_-6px_rgba(226,36,35,0.6)] transition-transform hover:scale-105 sm:text-base"
                >
                  {cat.cta}
                </a>
                <Link
                  href="/#categories"
                  className="font-poppins text-sm text-muted-2 underline-offset-4 transition-colors hover:text-cream hover:underline"
                >
                  ← All categories
                </Link>
              </div>
            </div>

            {/* Category image */}
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <img
                src={cat.img}
                alt={cat.imgAlt}
                className="aspect-[4/3] w-full rounded-2xl border border-white/10 object-cover shadow-2xl shadow-black/60"
              />
            </div>
          </div>

          {/* Cross-links so every category page is reachable from every other */}
          <nav aria-label="More wholesale categories" className="mt-16 border-t border-white/10 pt-8">
            <p className="font-dm text-[11px] font-bold uppercase tracking-[0.3em] text-white/50">
              More Wholesale Categories
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2.5">
              {CATEGORIES.filter((c) => c.slug !== cat.slug).map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/categories/${c.slug}`}
                    className="font-poppins text-sm text-muted-2 transition-colors hover:text-cream"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </section>
      </main>
      <Footer />
    </>
  );
}
