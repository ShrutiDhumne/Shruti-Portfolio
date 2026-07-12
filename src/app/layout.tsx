import type { Metadata } from "next";
import { display, sans, mono } from "./fonts";
import { profile } from "@/content/resume";
import "./globals.css";

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.role}`,
  description: profile.summary,
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description: profile.summary,
    type: "profile",
  },
  robots: { index: true, follow: true },
};

/**
 * The `js` class is set here, before first paint, and it is what arms the scroll
 * reveals in globals.css. Doing it inline rather than in an effect means there is
 * no frame where the content is visible and then hides itself — and no JavaScript
 * means no class, which means no hidden content.
 */
const ARM_REVEALS = `document.documentElement.classList.add('js')`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    /* suppressHydrationWarning: the script below deliberately adds a class to <html>
       before React hydrates, so the server and client markup differ by design. */
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: ARM_REVEALS }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
