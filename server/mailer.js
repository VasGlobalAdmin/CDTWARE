// ---------------------------------------------------------------------------
// CDT Wholesales — contact-form mailer (nodemailer / SMTP)
//
// Reusable email logic for the Node server. Credentials come from environment
// variables (see .env.example). They're DUMMY placeholders until the real CDT
// mailbox details are dropped in — no code changes needed when you swap them.
//
//   SMTP_HOST     e.g. smtp.gmail.com  /  smtp.office365.com
//   SMTP_PORT     465 (SSL) or 587 (STARTTLS)   — defaults to 587
//   SMTP_USER     the mailbox login (full email address)
//   SMTP_PASS     the mailbox password / app-password
//   MAIL_TO       where enquiries land   — defaults to cdt.orders@gmail.com
//   MAIL_FROM     the visible "from" address — defaults to SMTP_USER
// ---------------------------------------------------------------------------

const path = require("path");
const nodemailer = require("nodemailer");

const BRAND = "#E5332A";
const SITE = "CDT Wholesales";

// PNG logo embedded inline via CID (Gmail won't render SVG). Placed on a white
// badge in the header so the red wordmark stays visible on the red background.
const LOGO_PATH = path.join(__dirname, "..", "public", "images", "cdt-logo-email.png");
const LOGO_CID = "cdtlogo";

// Escape user input before dropping it into the HTML email.
const esc = (s = "") =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const isEmail = (s = "") => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(s).trim());

// ---- The HTML email template -------------------------------------------------
function buildHtml({ name, email, phone, company, lookingFor, message, when }) {
  const row = (label, value) =>
    value
      ? `<tr>
           <td style="padding:10px 0;border-bottom:1px solid #efece4;font:600 12px/1.4 Arial,Helvetica,sans-serif;color:#8a857c;text-transform:uppercase;letter-spacing:.5px;width:130px;vertical-align:top;">${label}</td>
           <td style="padding:10px 0;border-bottom:1px solid #efece4;font:400 15px/1.5 Arial,Helvetica,sans-serif;color:#1a1a1a;">${value}</td>
         </tr>`
      : "";

  return `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:0;background:#f4f2ec;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f2ec;padding:28px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,.07);">

            <!-- header -->
            <tr>
              <td style="background:${BRAND};padding:22px 32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td>
                      <span style="display:inline-block;background:#ffffff;border-radius:8px;padding:9px 14px;line-height:0;">
                        <img src="cid:${LOGO_CID}" alt="${SITE}" width="120" style="display:block;width:120px;height:auto;border:0;" />
                      </span>
                    </td>
                    <td align="right" style="font:600 12px/1 Arial,Helvetica,sans-serif;color:#ffe2e0;text-transform:uppercase;letter-spacing:1px;vertical-align:middle;">New Enquiry</td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- intro -->
            <tr>
              <td style="padding:30px 32px 6px;">
                <h1 style="margin:0;font:700 21px/1.3 Arial,Helvetica,sans-serif;color:#141414;">You've got a new message</h1>
                <p style="margin:8px 0 0;font:400 14px/1.6 Arial,Helvetica,sans-serif;color:#6f6a62;">
                  Submitted through the contact form on the <strong>${SITE}</strong> website.
                </p>
              </td>
            </tr>

            <!-- details -->
            <tr>
              <td style="padding:14px 32px 6px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${row("Name", esc(name))}
                  ${row("Email", `<a href="mailto:${esc(email)}" style="color:${BRAND};text-decoration:none;">${esc(email)}</a>`)}
                  ${row("Phone", esc(phone))}
                  ${row("Business", esc(company))}
                  ${row("Looking for", esc(lookingFor))}
                </table>
              </td>
            </tr>

            <!-- message -->
            <tr>
              <td style="padding:18px 32px 8px;">
                <div style="font:600 12px/1.4 Arial,Helvetica,sans-serif;color:#8a857c;text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px;">Message</div>
                <div style="background:#faf8f2;border:1px solid #efece4;border-radius:10px;padding:16px 18px;font:400 15px/1.65 Arial,Helvetica,sans-serif;color:#1a1a1a;white-space:pre-wrap;">${esc(message)}</div>
              </td>
            </tr>

            <!-- CTA -->
            <tr>
              <td style="padding:18px 32px 30px;">
                <a href="mailto:${esc(email)}" style="display:inline-block;background:${BRAND};color:#ffffff;font:700 14px/1 Arial,Helvetica,sans-serif;text-decoration:none;padding:13px 24px;border-radius:8px;">Reply to ${esc(name) || "sender"}</a>
              </td>
            </tr>

            <!-- footer -->
            <tr>
              <td style="background:#0a0a08;padding:18px 32px;">
                <p style="margin:0;font:400 12px/1.6 Arial,Helvetica,sans-serif;color:#9a958c;">
                  Sent automatically from the ${SITE} website${when ? ` · ${esc(when)}` : ""}.<br/>
                  Reply directly to this email to respond to the customer.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

// Plain-text fallback for clients that don't render HTML.
function buildText({ name, email, phone, company, lookingFor, message, when }) {
  return [
    `New enquiry from the ${SITE} website`,
    when ? `Received: ${when}` : "",
    "",
    `Name:        ${name}`,
    `Email:       ${email}`,
    phone ? `Phone:       ${phone}` : "",
    company ? `Business:    ${company}` : "",
    lookingFor ? `Looking for: ${lookingFor}` : "",
    "",
    "Message:",
    message,
  ]
    .filter(Boolean)
    .join("\n");
}

// Lazily create one reusable transporter.
let _transporter;
function transporter() {
  if (!_transporter) {
    const port = Number(process.env.SMTP_PORT) || 465;
    _transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465, // true for 465 (implicit SSL), false for 587 (STARTTLS)
      requireTLS: port === 587, // force STARTTLS when on 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      // Fail fast instead of hanging if the network/firewall drops the socket.
      connectionTimeout: 15000,
      greetingTimeout: 10000,
      socketTimeout: 20000,
    });
  }
  return _transporter;
}

// These are transient connection hiccups (firewall/AV resets, brief network
// blips) — worth one automatic retry before giving up.
const TRANSIENT = new Set(["ECONNRESET", "ETIMEDOUT", "ESOCKET", "ECONNECTION"]);

async function sendContactEmail({ name, email, phone, company, lookingFor, message }) {
  const when = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const payload = { name, email, phone, company, lookingFor, message, when };

  const mail = {
    from: `"${SITE} Website" <${process.env.MAIL_FROM || process.env.SMTP_USER}>`,
    to: process.env.MAIL_TO || "cdt.orders@gmail.com",
    replyTo: `"${name}" <${email}>`,
    subject: `New enquiry from ${name}${company ? ` · ${company}` : ""} — ${SITE}`,
    text: buildText(payload),
    html: buildHtml(payload),
    attachments: [
      { filename: "cdt-wholesales.png", path: LOGO_PATH, cid: LOGO_CID },
    ],
  };

  try {
    await transporter().sendMail(mail);
  } catch (err) {
    if (!TRANSIENT.has(err.code)) throw err;
    console.warn(`contact: transient SMTP error (${err.code}); retrying once…`);
    _transporter = null; // drop the poisoned connection and rebuild
    await transporter().sendMail(mail);
  }
}

module.exports = { isEmail, sendContactEmail };
