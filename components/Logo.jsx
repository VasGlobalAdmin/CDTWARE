export default function Logo({ className = "" }) {
  return (
    <a
      href="#hero"
      className={`group inline-flex items-center ${className}`}
      aria-label="CDT Distribution home"
    >
      {/* Official CDT crest — Figma vector, native 88×48 */}
      <img
        src="/images/cdt-logo.svg"
        alt="CDT Distribution"
        width={88}
        height={48}
        className="h-9 w-auto drop-shadow-[0_4px_12px_rgba(226,30,36,0.45)] transition-transform duration-300 group-hover:scale-105 sm:h-11 md:h-12"
      />
    </a>
  );
}
