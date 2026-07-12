import { Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google";

/**
 * An editorial pairing: an expressive serif for the things worth saying loudly,
 * a quiet grotesque for everything you actually have to read, and a monospace
 * reserved for metadata — dates, indices, stack labels.
 *
 * All three are self-hosted at build by next/font. Zero external requests.
 */
export const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-display",
});

export const sans = Inter({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: true,
  variable: "--font-sans",
});

export const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});
