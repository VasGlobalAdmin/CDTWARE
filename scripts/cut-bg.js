// One-off: strip the baked-in checkerboard / white background from the Gemini
// product images so the thumbnails read as true transparent cutouts.
//
// Strategy: flood-fill inward from the image borders, removing only pixels that
// are (a) already transparent, or (b) light + low-saturation (white or the grey
// checkerboard) AND reachable from the edge through other background pixels.
// Because it's edge-connected, light areas INSIDE the product (LCD glints, white
// label text) are preserved — the fill stops at the product's darker outline.
const fs = require("fs");
const path = require("path");
const { PNG } = require("pngjs");

const IMG_DIR = path.join(__dirname, "..", "public", "images");

function cut(inFile, outFile, opts = {}) {
  const bright = opts.bright ?? 158; // min channel-max to count as "light"
  const sat = opts.sat ?? 0.12; //     max saturation to count as "greyish"
  const png = PNG.sync.read(fs.readFileSync(path.join(IMG_DIR, inFile)));
  const { width: w, height: h, data } = png;
  const at = (x, y) => (y * w + x) * 4;

  const isBg = (x, y) => {
    const i = at(x, y);
    if (data[i + 3] < 10) return true; // already transparent
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const s = max === 0 ? 0 : (max - min) / max;
    return max > bright && s < sat;
  };

  const visited = new Uint8Array(w * h);
  const mask = new Uint8Array(w * h); // 1 = strip
  const stack = [];
  const add = (x, y) => {
    if (x < 0 || y < 0 || x >= w || y >= h) return;
    const p = y * w + x;
    if (visited[p]) return;
    visited[p] = 1;
    stack.push(x, y);
  };
  for (let x = 0; x < w; x++) { add(x, 0); add(x, h - 1); }
  for (let y = 0; y < h; y++) { add(0, y); add(w - 1, y); }
  while (stack.length) {
    const y = stack.pop(), x = stack.pop();
    if (!isBg(x, y)) continue; // product edge → stop here
    mask[y * w + x] = 1;
    add(x + 1, y); add(x - 1, y); add(x, y + 1); add(x, y - 1);
  }

  // Strip, plus a 1px feather: any kept-but-light pixel touching a stripped one
  // gets partial alpha so the product edge doesn't keep a hard white halo.
  let removed = 0;
  for (let p = 0; p < w * h; p++) if (mask[p]) { data[p * 4 + 3] = 0; removed++; }
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const p = y * w + x;
      if (mask[p] || data[p * 4 + 3] === 0) continue;
      const touches =
        (x + 1 < w && mask[p + 1]) || (x - 1 >= 0 && mask[p - 1]) ||
        (y + 1 < h && mask[p + w]) || (y - 1 >= 0 && mask[p - w]);
      if (!touches) continue;
      const i = p * 4;
      const max = Math.max(data[i], data[i + 1], data[i + 2]);
      if (max > bright - 24) data[i + 3] = Math.min(data[i + 3], 120);
    }
  }

  const small = downscale(png, 760);
  fs.writeFileSync(path.join(IMG_DIR, outFile), PNG.sync.write(small));
  console.log(
    `${inFile} -> ${outFile}  ${w}x${h} -> ${small.width}x${small.height}  stripped ${(100 * removed / (w * h)).toFixed(1)}%`
  );
}

// Area-average downscale with premultiplied alpha (no dark fringe on the edges).
function downscale(src, maxW) {
  if (src.width <= maxW) return src;
  const tw = maxW;
  const th = Math.max(1, Math.round((src.height * maxW) / src.width));
  const out = new PNG({ width: tw, height: th });
  const sx = src.width / tw, sy = src.height / th;
  for (let y = 0; y < th; y++) {
    for (let x = 0; x < tw; x++) {
      const x0 = Math.floor(x * sx), x1 = Math.max(x0 + 1, Math.floor((x + 1) * sx));
      const y0 = Math.floor(y * sy), y1 = Math.max(y0 + 1, Math.floor((y + 1) * sy));
      let r = 0, g = 0, b = 0, a = 0, n = 0;
      for (let yy = y0; yy < y1; yy++) {
        for (let xx = x0; xx < x1; xx++) {
          const i = (yy * src.width + xx) * 4;
          const al = src.data[i + 3] / 255;
          r += src.data[i] * al; g += src.data[i + 1] * al; b += src.data[i + 2] * al;
          a += src.data[i + 3]; n++;
        }
      }
      const o = (y * tw + x) * 4;
      const aSum = a / 255;
      out.data[o] = aSum ? Math.round(r / aSum) : 0;
      out.data[o + 1] = aSum ? Math.round(g / aSum) : 0;
      out.data[o + 2] = aSum ? Math.round(b / aSum) : 0;
      out.data[o + 3] = Math.round(a / n);
    }
  }
  return out;
}

cut("Gemini_Generated_Image_5rfbs05rfbs05rfb.png", "thumb-scale.png");
cut("Gemini_Generated_Image_6aiodm6aiodm6aio.png", "thumb-earbuds.png");
cut("Gemini_Generated_Image_80swz680swz680sw.png", "thumb-rawleaf.png");
