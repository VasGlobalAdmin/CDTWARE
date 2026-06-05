import "./globals.css";
import Preloader from "@/components/Preloader";
import {
  Montserrat,
  Poppins,
  Playfair_Display,
  Bebas_Neue,
  DM_Sans,
  Inter,
} from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "800", "900"],
  variable: "--font-playfair",
  display: "swap",
});
const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
  display: "swap",
});
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dmsans",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
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
        className={`${montserrat.variable} ${poppins.variable} ${playfair.variable} ${bebas.variable} ${dmSans.variable} ${inter.variable} bg-ink-3 text-cream antialiased`}
      >
        <Preloader />
        {children}
      </body>
    </html>
  );
}
