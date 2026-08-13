import Logo from "./Logo";

const LINKS = [
  { label: "Home", href: "/#hero" },
  { label: "About", href: "/#about" },
  { label: "Categories", href: "/#categories" },
  { label: "Best Sellers", href: "/#best-sellers" },
  { label: "Why CDT", href: "/#why-cdt" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/8 bg-ink-3">
      <div className="container-site flex flex-col items-center gap-6 py-10 md:flex-row md:justify-between">
        <Logo />
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="font-poppins text-sm text-muted-2 transition-colors hover:text-cream">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="font-poppins text-xs text-muted-2">
          © {new Date().getFullYear()} CDT Distribution. All rights reserved.
        </p>
      </div>
      <p className="container-site -mt-4 pb-8 text-center font-poppins text-xs leading-relaxed text-muted-2">
        Wholesale distributor serving Easley, Powdersville, Pickens, Liberty, Central, Greenville,
        Simpsonville, Mauldin, Clemson, Anderson, Spartanburg, and all of Upstate South Carolina.
      </p>
    </footer>
  );
}
