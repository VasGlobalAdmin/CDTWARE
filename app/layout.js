import "./globals.css";
import Preloader from "@/components/Preloader";
import localFont from "next/font/local";

// Real Gotham (licensed .otf files in app/fonts). One variable drives every
// text token in tailwind.config.js, so the whole site renders in Gotham.
const gotham = localFont({
  src: [
    { path: "./fonts/Gotham-Light.otf", weight: "300", style: "normal" },
    { path: "./fonts/Gotham-LightItalic.otf", weight: "300", style: "italic" },
    { path: "./fonts/Gotham-Book.otf", weight: "400", style: "normal" },
    { path: "./fonts/Gotham-BookItalic.otf", weight: "400", style: "italic" },
    { path: "./fonts/Gotham-Medium.otf", weight: "500", style: "normal" },
    { path: "./fonts/Gotham-MediumItalic.otf", weight: "500", style: "italic" },
    { path: "./fonts/Gotham-Bold.otf", weight: "700", style: "normal" },
    { path: "./fonts/Gotham-BoldItalic.otf", weight: "700", style: "italic" },
    { path: "./fonts/Gotham-Black.otf", weight: "900", style: "normal" },
    { path: "./fonts/Gotham-BlackItalic.otf", weight: "900", style: "italic" },
  ],
  variable: "--font-gotham",
  display: "swap",
});

export const metadata = {
  title: "CDT Distribution — Your Local Wholesale Partner",
  description:
    "CDT Distribution is built for C-store owners who need the right products at the right price — delivered the next business day across South Carolina.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body
        className={`${gotham.variable} bg-ink-3 text-cream antialiased`}
      >
        <Preloader />
        {children}
      </body>
    </html>
  );
}
