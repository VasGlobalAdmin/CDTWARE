// Shared two-line section heading so every section title is visually IDENTICAL.
// Figma spec: Gotham, top line Light/300, bottom line Black/900, uppercase,
// 5% letter-spacing (0.05em), 100% line-height (leading-none). Size is fluid
// via clamp() — ~32px on phones, scaling up to the 60px Figma size on large
// screens — so it stays responsive without per-section breakpoints drifting.
const LINE =
  "block font-gotham uppercase leading-none tracking-[0.05em] text-[clamp(2rem,6vw,3.75rem)] short:!text-[clamp(1.75rem,4vw,2.75rem)] shorter:!text-[2rem] 3xl:text-[4.5rem]";

export default function SectionHeading({ top, bottom, className = "" }) {
  return (
    <h2 className={`mt-4 ${className}`}>
      <span className={`${LINE} font-light text-cream`}>{top}</span>
      <span className={`${LINE} font-black text-cream`}>{bottom}</span>
    </h2>
  );
}
