// ---------------------------------------------------------------------------
// CDT Wholesales — Node.js + Express server (contact form via nodemailer).
//
// It always owns port 3000 and always handles POST /api/contact. What it does
// with every OTHER request depends on the mode:
//
//   DEV  (npm run dev)   -> proxies the site to the Next dev server (hot reload)
//   PROD (npm run serve) -> serves the statically-exported site from ./out
//
// Because Express owns /api/contact on the same port as the site, the form's
// fetch("/api/contact") works in BOTH modes — no CORS, no extra config.
//
//   npm run dev            # live site + working form  -> http://localhost:3000
//   npm run build          # generate ./out for production
//   npm run serve          # production server         -> http://localhost:3000
// ---------------------------------------------------------------------------

require("dotenv").config();

const path = require("path");
const express = require("express");
const { isEmail, sendContactEmail } = require("./mailer");

const app = express();
const PORT = process.env.PORT || 3000;
const PROD = process.argv.includes("--prod") || process.env.NODE_ENV === "production";
const OUT_DIR = path.join(__dirname, "..", "out");
const NEXT_DEV_URL = process.env.NEXT_DEV_URL || "http://localhost:3001";

// ---- Contact form endpoint --------------------------------------------------
// JSON body-parsing is scoped to this route so it never touches proxied traffic.
app.post("/api/contact", express.json({ limit: "100kb" }), async (req, res) => {
  const body = req.body || {};

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const phone = (body.phone || "").trim();
  const company = (body.company || "").trim();
  const lookingFor = (body.lookingFor || "").trim();
  const message = (body.message || "").trim();

  // Honeypot — bots fill hidden fields; humans leave them empty.
  if ((body.company_website || "").trim()) {
    return res.json({ ok: true }); // silently accept & drop
  }

  if (!name || !message || !isEmail(email)) {
    return res.status(400).json({
      ok: false,
      error: "Please provide your name, a valid email, and a message.",
    });
  }

  try {
    await sendContactEmail({ name, email, phone, company, lookingFor, message });
    return res.json({ ok: true });
  } catch (err) {
    console.error("contact: sendMail failed:", err);
    return res.status(502).json({
      ok: false,
      error: "We couldn't send your message right now. Please try again later.",
    });
  }
});

if (PROD) {
  // ---- Production: serve the built static site ------------------------------
  // `trailingSlash: true` exports each route as a folder/index.html, which
  // express.static resolves automatically.
  app.use(express.static(OUT_DIR, { extensions: ["html"] }));
  app.get("*", (req, res) => res.sendFile(path.join(OUT_DIR, "index.html")));
} else {
  // ---- Development: proxy everything else to the Next dev server ------------
  const { createProxyMiddleware } = require("http-proxy-middleware");
  app.use(
    createProxyMiddleware({
      target: NEXT_DEV_URL,
      changeOrigin: true,
      ws: true, // proxy Next's hot-reload websocket too
      logLevel: "silent",
    })
  );
}

app.listen(PORT, () => {
  const mode = PROD ? "serving ./out" : `proxying ${NEXT_DEV_URL}`;
  console.log(`CDT site + contact API on http://localhost:${PORT}  (${mode})`);
});
