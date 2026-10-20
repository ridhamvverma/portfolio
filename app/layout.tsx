import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans, Schibsted_Grotesk } from "next/font/google";
import { CreativeProvider } from "@/lib/creative-context";
import { SITE_URL } from "@/lib/config";
import { LanguageProvider, SkipLink } from "@/lib/i18n/language-context";
import { appearanceInitScript } from "@/lib/appearance/config";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plus-jakarta",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const schibsted = Schibsted_Grotesk({
  subsets: ["latin"], display: "swap",
  variable: "--font-schibsted", weight: ["400", "500", "600", "700", "800"],
});
const inter = Inter({
  subsets: ["latin"], display: "swap",
  variable: "--font-inter", weight: ["300", "400", "500", "600", "700", "800"],
});

const title = "Ridham Verma";
const description = "Ridham Verma is a B.Tech CSE student who builds things with code. See Astra and say hello.";

export const metadata: Metadata = {
  title,
  description,
  metadataBase: SITE_URL,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: title,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/opengraph-image"],
  },
};

export const viewport: Viewport = { themeColor: "#ffffff" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${schibsted.variable} ${inter.variable}`} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: appearanceInitScript }} /></head>
      <body className="bg-surface font-sans text-body text-muted antialiased">
          <LanguageProvider>
            <SkipLink />
            <CreativeProvider>{children}</CreativeProvider>
          </LanguageProvider>
      </body>
    </html>
  );
}
