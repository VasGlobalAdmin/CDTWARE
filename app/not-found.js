import Link from "next/link";
import Logo from "@/components/Logo";
import Glow from "@/components/Glow";

export const metadata = {
  title: "Page Not Found | CDT Distribution",
  // A 404 must never be indexed or treated as a copy of another page.
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <Logo className="fixed left-5 top-4 z-50 sm:left-9 sm:top-5" />
      <main className="relative min-h-screen overflow-hidden bg-ink-3">
        <Glow side="center" rotate={45} />

        <section className="container-wide relative flex min-h-screen flex-col items-center justify-center py-28 text-center">
          <p className="eyebrow">Error 404</p>
          <h1 className="mt-4 font-gotham text-[clamp(2.2rem,6vw,4rem)] font-bold uppercase leading-[1.05] tracking-[0.02em] text-cream [text-wrap:balance]">
            Page Not Found
          </h1>
          <p className="mt-6 max-w-xl font-poppins text-[15px] font-light leading-7 text-muted sm:text-base">
            The page you&apos;re looking for doesn&apos;t exist or may have been
            moved. Head back to the homepage to browse our wholesale categories.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-5">
            <Link
              href="/"
              className="inline-flex h-12 items-center justify-center rounded-full bg-[#E22423] px-8 font-gotham text-[15px] text-cream shadow-[0_10px_24px_-6px_rgba(226,36,35,0.6)] transition-transform hover:scale-105 sm:text-base"
            >
              Back to Homepage
            </Link>
            <Link
              href="/#categories"
              className="font-poppins text-sm text-muted-2 underline-offset-4 transition-colors hover:text-cream hover:underline"
            >
              Browse categories →
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
