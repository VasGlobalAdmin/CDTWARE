/**
 * Glow — the Figma "Group 10" ambient light (red blob + amber→blue gradient blob,
 * blur baked into the SVG). ONE svg per section. It renders its own background layer
 * plus a "frame" of black on top so the glow is CONTAINED to roughly the middle ~70%
 * of the section (dark margins on every side). The top/bottom fade to #080806 — the
 * sections' own near-black — so neighbouring sections always meet in black and there
 * is no visible seam between them. Always decorative.
 *
 *   <Glow side="left"  rotate={0} />   // glow biased left, faded top/bottom
 *   <Glow side="right" rotate={90} />
 *   <Glow side="center" />
 *
 * - `side`   : horizontal bias — "left" | "center" | "right". Vertical stays centred
 *              so the top/bottom fade can keep section edges black (seamless).
 * - `rotate` / `scale` / `flip` : vary the colour spread per section.
 * - `opacity`: glow strength.
 * - `place`  : escape hatch to fully override position + size if you need something
 *              custom; when set it wins over `side`.
 */
const SIDES = {
  left: "left-[30%] top-1/2 -translate-x-1/2 -translate-y-1/2",
  center: "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
  right: "left-[70%] top-1/2 -translate-x-1/2 -translate-y-1/2",
};

export default function Glow({
  side = "center",
  place,
  rotate = 0,
  scale = 1,
  flip = false,
  opacity = 0.9,
  vignette = true,
}) {
  const pos = place ?? `${SIDES[side] ?? SIDES.center} w-[clamp(720px,72vw,1500px)]`;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className={`absolute ${pos}`} style={{ opacity }}>
        <img
          src="/images/glow.svg"
          alt=""
          draggable={false}
          className="block w-full max-w-none select-none"
          style={{ transform: `rotate(${rotate}deg) scale(${flip ? -scale : scale}, ${scale})` }}
        />
      </div>
      {vignette && (
        <>
          {/* sides + corners → fade the left/right margins into the dark */}
          <div className="absolute inset-0 bg-[radial-gradient(115%_115%_at_50%_50%,transparent_42%,rgba(8,8,6,0.85)_100%)]" />
          {/* top + bottom → fade to the section's near-black so sections meet seamlessly */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#080806_0%,transparent_18%,transparent_82%,#080806_100%)]" />
        </>
      )}
    </div>
  );
}
