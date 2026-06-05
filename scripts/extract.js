// Slice the 2x2 Gemini grid into single products, strip the white studio
// background (edge-connected flood fill), downscale, and save as the thumbs.
const fs = require("fs");
const path = require("path");
const { PNG } = require("pngjs");
const IMG = path.join(__dirname, "..", "public", "images");
const SRC = "Gemini_Generated_Image_yb44v3yb44v3yb44.png";

const src = PNG.sync.read(fs.readFileSync(path.join(IMG, SRC)));

function crop(x0, y0, w, h) {
  const out = new PNG({ width: w, height: h });
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      const s = ((y0 + y) * src.width + (x0 + x)) * 4;
      const d = (y * w + x) * 4;
      out.data[d] = src.data[s];
      out.data[d + 1] = src.data[s + 1];
      out.data[d + 2] = src.data[s + 2];
      out.data[d + 3] = src.data[s + 3];
    }
  return out;
}

function cut(png, bright = 150, sat = 0.13) {
  const { width: w, height: h, data } = png;
  const at = (x, y) => (y * w + x) * 4;
  const isBg = (x, y) => {
    const i = at(x, y);
    if (data[i + 3] < 10) return true;
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const s = max === 0 ? 0 : (max - min) / max;
    return max > bright && s < sat;
  };
  const visited = new Uint8Array(w * h);
  const mask = new Uint8Array(w * h);
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
    if (!isBg(x, y)) continue;
    mask[y * w + x] = 1;
    add(x + 1, y); add(x - 1, y); add(x, y + 1); add(x, y - 1);
  }
  for (let p = 0; p < w * h; p++) if (mask[p]) data[p * 4 + 3] = 0;
  // soften the white halo on kept edge pixels
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      const p = y * w + x;
      if (mask[p] || data[p * 4 + 3] === 0) continue;
      const t = (x + 1 < w && mask[p + 1]) || (x - 1 >= 0 && mask[p - 1]) ||
        (y + 1 < h && mask[p + w]) || (y - 1 >= 0 && mask[p - w]);
      if (t && Math.max(data[p * 4], data[p * 4 + 1], data[p * 4 + 2]) > bright - 26)
        data[p * 4 + 3] = Math.min(data[p * 4 + 3], 130);
    }
  let rem = 0; for (let p = 0; p < w * h; p++) rem += mask[p];
  return rem / (w * h);
}

// trim fully-transparent margins so the product fills the frame, then downscale
function tightDownscale(png, maxW) {
  const { width: w, height: h, data } = png;
  let minX = w, minY = h, maxX = -1, maxY = -1;
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++)
      if (data[(y * w + x) * 4 + 3] > 12) {
        if (x < minX) minX = x; if (x > maxX) maxX = x;
        if (y < minY) minY = y; if (y > maxY) maxY = y;
      }
  const pad = Math.round(Math.max(maxX - minX, maxY - minY) * 0.04);
  minX = Math.max(0, minX - pad); minY = Math.max(0, minY - pad);
  maxX = Math.min(w - 1, maxX + pad); maxY = Math.min(h - 1, maxY + pad);
  const cw = maxX - minX + 1, ch = maxY - minY + 1;
  const scale = Math.min(1, maxW / cw);
  const tw = Math.max(1, Math.round(cw * scale)), th = Math.max(1, Math.round(ch * scale));
  const out = new PNG({ width: tw, height: th });
  const sx = cw / tw, sy = ch / th;
  for (let y = 0; y < th; y++)
    for (let x = 0; x < tw; x++) {
      const x0 = minX + Math.floor(x * sx), x1 = minX + Math.max(Math.floor(x * sx) + 1, Math.floor((x + 1) * sx));
      const y0 = minY + Math.floor(y * sy), y1 = minY + Math.max(Math.floor(y * sy) + 1, Math.floor((y + 1) * sy));
      let r = 0, g = 0, b = 0, a = 0, n = 0;
      for (let yy = y0; yy < y1; yy++)
        for (let xx = x0; xx < x1; xx++) {
          const i = (yy * w + xx) * 4, al = data[i + 3] / 255;
          r += data[i] * al; g += data[i + 1] * al; b += data[i + 2] * al; a += data[i + 3]; n++;
        }
      const o = (y * tw + x) * 4, aSum = a / 255;
      out.data[o] = aSum ? Math.round(r / aSum) : 0;
      out.data[o + 1] = aSum ? Math.round(g / aSum) : 0;
      out.data[o + 2] = aSum ? Math.round(b / aSum) : 0;
      out.data[o + 3] = Math.round(a / n);
    }
  return out;
}

const jobs = [
  { name: "thumb-scale.png", x: 0, y: 0 },
  { name: "thumb-earbuds.png", x: 1024, y: 0 },
  { name: "thumb-rawleaf.png", x: 1024, y: 1024 },
];
for (const j of jobs) {
  const c = crop(j.x, j.y, 1024, 1024);
  const pct = cut(c);
  const small = tightDownscale(c, 720);
  fs.writeFileSync(path.join(IMG, j.name), PNG.sync.write(small));
  console.log(`${j.name}  ${small.width}x${small.height}  bg ${(pct * 100).toFixed(1)}%`);
}
